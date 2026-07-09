use async_trait::async_trait;
use std::sync::Arc;

use axum::body::Body;
use axum::http::{Request, StatusCode, header};
use chrono::Duration as ChronoDuration;
use http_body_util::BodyExt;
use ironclaw_host_api::{TenantId, UserId};
use ironclaw_reborn_webui_ingress::{
    OAuthProviderName, OAuthRouterConfig, OAuthUserProfile, SessionRecord, SessionStore,
    SessionStoreError, UserDirectory, UserDirectoryError, YunoHostPortalConfig,
    webui_v2_auth_router,
};
use secrecy::SecretString;
use serde::Deserialize;
use tower::ServiceExt;

fn tenant() -> TenantId {
    TenantId::new("tenant-a").expect("tenant")
}

struct TestUserDirectory;

#[async_trait]
impl UserDirectory for TestUserDirectory {
    async fn resolve(
        &self,
        _provider: &OAuthProviderName,
        _profile: &OAuthUserProfile,
    ) -> Result<UserId, UserDirectoryError> {
        UserId::new("marten@example.com")
            .map_err(|err| UserDirectoryError::Backend(err.to_string()))
    }
}

struct TestSessionStore;

#[async_trait]
impl SessionStore for TestSessionStore {
    async fn create_session(
        &self,
        _tenant_id: TenantId,
        _user_id: UserId,
        _lifetime: ChronoDuration,
    ) -> Result<SecretString, SessionStoreError> {
        Ok(SecretString::from("session-token".to_string()))
    }

    async fn lookup(&self, _candidate: &str) -> Result<Option<SessionRecord>, SessionStoreError> {
        Ok(None)
    }

    async fn revoke(&self, _candidate: &str) -> Result<(), SessionStoreError> {
        Ok(())
    }
}

fn build_router() -> axum::Router {
    let store: Arc<dyn SessionStore> = Arc::new(TestSessionStore);
    let config = OAuthRouterConfig::new(
        tenant(),
        store,
        Arc::new(TestUserDirectory),
        Vec::new(),
        "https://gateway.example",
    )
    .with_yunohost_portal(YunoHostPortalConfig);
    webui_v2_auth_router(config).router
}

async fn body_string(body: Body) -> String {
    let bytes = body.collect().await.expect("collect body").to_bytes();
    String::from_utf8(bytes.to_vec()).expect("utf-8")
}

#[derive(Deserialize)]
struct ProvidersResponse {
    providers: Vec<String>,
}

#[derive(Deserialize)]
struct SessionExchangeResponse {
    token: String,
}

fn ticket_from_landing(landing: &str) -> String {
    let query = landing.split_once('?').expect("query").1;
    for pair in query.split('&') {
        if let Some(value) = pair.strip_prefix("login_ticket=") {
            return urlencoding::decode(value).expect("decode").into_owned();
        }
    }
    panic!("no login_ticket in {landing}");
}

#[tokio::test]
async fn providers_list_includes_yunohost() {
    let router = build_router();
    let resp = router
        .oneshot(
            Request::builder()
                .method("GET")
                .uri("/auth/providers")
                .body(Body::empty())
                .expect("request"),
        )
        .await
        .expect("oneshot");
    assert_eq!(resp.status(), StatusCode::OK);
    let payload: ProvidersResponse =
        serde_json::from_str(&body_string(resp.into_body()).await).expect("json");
    assert_eq!(payload.providers, vec!["yunohost".to_string()]);
}

#[tokio::test]
async fn login_redirects_through_yunohost_sso_when_cookie_is_missing() {
    let router = build_router();
    let resp = router
        .oneshot(
            Request::builder()
                .method("GET")
                .uri("/auth/login/yunohost?redirect_after=%2Fv2")
                .body(Body::empty())
                .expect("request"),
        )
        .await
        .expect("oneshot");
    assert_eq!(resp.status(), StatusCode::TEMPORARY_REDIRECT);
    let location = resp
        .headers()
        .get(header::LOCATION)
        .expect("location")
        .to_str()
        .expect("utf-8");
    assert!(location.starts_with("/yunohost/sso/?r="));
    let return_to = urlencoding::decode(location.split_once("?r=").expect("query").1)
        .expect("decode")
        .into_owned();
    assert_eq!(
        return_to,
        "https://gateway.example/auth/login/yunohost?redirect_after=%2Fv2"
    );
}

#[tokio::test]
async fn login_with_trusted_headers_mints_session_ticket() {
    let router = build_router();
    let login = router
        .clone()
        .oneshot(
            Request::builder()
                .method("GET")
                .uri("/auth/login/yunohost?redirect_after=%2Fv2")
                .header("YNH_USER", "marten")
                .header("YNH_USER_EMAIL", "marten@example.com")
                .header("YNH_USER_FULLNAME", "Marten Lucas")
                .body(Body::empty())
                .expect("request"),
        )
        .await
        .expect("oneshot");
    assert_eq!(login.status(), StatusCode::SEE_OTHER);
    let landing = login
        .headers()
        .get(header::LOCATION)
        .expect("location")
        .to_str()
        .expect("utf-8")
        .to_string();
    assert!(landing.starts_with("/v2?login_ticket="));

    let ticket = ticket_from_landing(&landing);
    let exchange = router
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/auth/session/exchange")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(
                    serde_json::json!({ "ticket": ticket }).to_string(),
                ))
                .expect("request"),
        )
        .await
        .expect("oneshot");
    assert_eq!(exchange.status(), StatusCode::OK);
    let payload: SessionExchangeResponse =
        serde_json::from_str(&body_string(exchange.into_body()).await).expect("json");
    assert!(!payload.token.is_empty());
}
