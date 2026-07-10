import{a as Sn,b as Ie,c as Ge,d as h,e as l,f as Mh,g as Oh,h as al,i as k,j as nl}from"./chunks/chunk-DPL5VF57.js";var Wh=Sn(ml=>{"use strict";var XR=Symbol.for("react.transitional.element"),ZR=Symbol.for("react.fragment");function Zh(e,t,a){var n=null;if(a!==void 0&&(n=""+a),t.key!==void 0&&(n=""+t.key),"key"in t){a={};for(var r in t)r!=="key"&&(a[r]=t[r])}else a=t;return t=a.ref,{$$typeof:XR,type:e,key:n,ref:t!==void 0?t:null,props:a}}ml.Fragment=ZR;ml.jsx=Zh;ml.jsxs=Zh});var vd=Sn((oL,ev)=>{"use strict";ev.exports=Wh()});var pv=Sn(Ue=>{"use strict";function Sd(e,t){var a=e.length;e.push(t);e:for(;0<a;){var n=a-1>>>1,r=e[n];if(0<$l(r,t))e[n]=t,e[a]=r,a=n;else break e}}function Oa(e){return e.length===0?null:e[0]}function Sl(e){if(e.length===0)return null;var t=e[0],a=e.pop();if(a!==t){e[0]=a;e:for(var n=0,r=e.length,s=r>>>1;n<s;){var i=2*(n+1)-1,o=e[i],u=i+1,c=e[u];if(0>$l(o,a))u<r&&0>$l(c,o)?(e[n]=c,e[u]=a,n=u):(e[n]=o,e[i]=a,n=i);else if(u<r&&0>$l(c,a))e[n]=c,e[u]=a,n=u;else break e}}return t}function $l(e,t){var a=e.sortIndex-t.sortIndex;return a!==0?a:e.id-t.id}Ue.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(sv=performance,Ue.unstable_now=function(){return sv.now()}):(xd=Date,iv=xd.now(),Ue.unstable_now=function(){return xd.now()-iv});var sv,xd,iv,Za=[],Rn=[],ak=1,ca=null,wt=3,Nd=!1,Ci=!1,Ei=!1,_d=!1,uv=typeof setTimeout=="function"?setTimeout:null,cv=typeof clearTimeout=="function"?clearTimeout:null,ov=typeof setImmediate<"u"?setImmediate:null;function wl(e){for(var t=Oa(Rn);t!==null;){if(t.callback===null)Sl(Rn);else if(t.startTime<=e)Sl(Rn),t.sortIndex=t.expirationTime,Sd(Za,t);else break;t=Oa(Rn)}}function Rd(e){if(Ei=!1,wl(e),!Ci)if(Oa(Za)!==null)Ci=!0,Zr||(Zr=!0,Xr());else{var t=Oa(Rn);t!==null&&kd(Rd,t.startTime-e)}}var Zr=!1,Ti=-1,dv=5,mv=-1;function fv(){return _d?!0:!(Ue.unstable_now()-mv<dv)}function $d(){if(_d=!1,Zr){var e=Ue.unstable_now();mv=e;var t=!0;try{e:{Ci=!1,Ei&&(Ei=!1,cv(Ti),Ti=-1),Nd=!0;var a=wt;try{t:{for(wl(e),ca=Oa(Za);ca!==null&&!(ca.expirationTime>e&&fv());){var n=ca.callback;if(typeof n=="function"){ca.callback=null,wt=ca.priorityLevel;var r=n(ca.expirationTime<=e);if(e=Ue.unstable_now(),typeof r=="function"){ca.callback=r,wl(e),t=!0;break t}ca===Oa(Za)&&Sl(Za),wl(e)}else Sl(Za);ca=Oa(Za)}if(ca!==null)t=!0;else{var s=Oa(Rn);s!==null&&kd(Rd,s.startTime-e),t=!1}}break e}finally{ca=null,wt=a,Nd=!1}t=void 0}}finally{t?Xr():Zr=!1}}}var Xr;typeof ov=="function"?Xr=function(){ov($d)}:typeof MessageChannel<"u"?(wd=new MessageChannel,lv=wd.port2,wd.port1.onmessage=$d,Xr=function(){lv.postMessage(null)}):Xr=function(){uv($d,0)};var wd,lv;function kd(e,t){Ti=uv(function(){e(Ue.unstable_now())},t)}Ue.unstable_IdlePriority=5;Ue.unstable_ImmediatePriority=1;Ue.unstable_LowPriority=4;Ue.unstable_NormalPriority=3;Ue.unstable_Profiling=null;Ue.unstable_UserBlockingPriority=2;Ue.unstable_cancelCallback=function(e){e.callback=null};Ue.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):dv=0<e?Math.floor(1e3/e):5};Ue.unstable_getCurrentPriorityLevel=function(){return wt};Ue.unstable_next=function(e){switch(wt){case 1:case 2:case 3:var t=3;break;default:t=wt}var a=wt;wt=t;try{return e()}finally{wt=a}};Ue.unstable_requestPaint=function(){_d=!0};Ue.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var a=wt;wt=e;try{return t()}finally{wt=a}};Ue.unstable_scheduleCallback=function(e,t,a){var n=Ue.unstable_now();switch(typeof a=="object"&&a!==null?(a=a.delay,a=typeof a=="number"&&0<a?n+a:n):a=n,e){case 1:var r=-1;break;case 2:r=250;break;case 5:r=1073741823;break;case 4:r=1e4;break;default:r=5e3}return r=a+r,e={id:ak++,callback:t,priorityLevel:e,startTime:a,expirationTime:r,sortIndex:-1},a>n?(e.sortIndex=a,Sd(Rn,e),Oa(Za)===null&&e===Oa(Rn)&&(Ei?(cv(Ti),Ti=-1):Ei=!0,kd(Rd,a-n))):(e.sortIndex=r,Sd(Za,e),Ci||Nd||(Ci=!0,Zr||(Zr=!0,Xr()))),e};Ue.unstable_shouldYield=fv;Ue.unstable_wrapCallback=function(e){var t=wt;return function(){var a=wt;wt=t;try{return e.apply(this,arguments)}finally{wt=a}}}});var vv=Sn((IL,hv)=>{"use strict";hv.exports=pv()});var yv=Sn(Et=>{"use strict";var nk=Ge();function gv(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function kn(){}var Ct={d:{f:kn,r:function(){throw Error(gv(522))},D:kn,C:kn,L:kn,m:kn,X:kn,S:kn,M:kn},p:0,findDOMNode:null},rk=Symbol.for("react.portal");function sk(e,t,a){var n=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:rk,key:n==null?null:""+n,children:e,containerInfo:t,implementation:a}}var Ai=nk.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Nl(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}Et.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Ct;Et.createPortal=function(e,t){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(gv(299));return sk(e,t,null,a)};Et.flushSync=function(e){var t=Ai.T,a=Ct.p;try{if(Ai.T=null,Ct.p=2,e)return e()}finally{Ai.T=t,Ct.p=a,Ct.d.f()}};Et.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,Ct.d.C(e,t))};Et.prefetchDNS=function(e){typeof e=="string"&&Ct.d.D(e)};Et.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var a=t.as,n=Nl(a,t.crossOrigin),r=typeof t.integrity=="string"?t.integrity:void 0,s=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;a==="style"?Ct.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:n,integrity:r,fetchPriority:s}):a==="script"&&Ct.d.X(e,{crossOrigin:n,integrity:r,fetchPriority:s,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};Et.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var a=Nl(t.as,t.crossOrigin);Ct.d.M(e,{crossOrigin:a,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&Ct.d.M(e)};Et.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var a=t.as,n=Nl(a,t.crossOrigin);Ct.d.L(e,a,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};Et.preloadModule=function(e,t){if(typeof e=="string")if(t){var a=Nl(t.as,t.crossOrigin);Ct.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:a,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else Ct.d.m(e)};Et.requestFormReset=function(e){Ct.d.r(e)};Et.unstable_batchedUpdates=function(e,t){return e(t)};Et.useFormState=function(e,t,a){return Ai.H.useFormState(e,t,a)};Et.useFormStatus=function(){return Ai.H.useHostTransitionStatus()};Et.version="19.1.0"});var $v=Sn((KL,xv)=>{"use strict";function bv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(bv)}catch(e){console.error(e)}}bv(),xv.exports=yv()});var S0=Sn(Qu=>{"use strict";var it=vv(),Ig=Ge(),ik=$v();function L(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Hg(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function bo(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function Kg(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function wv(e){if(bo(e)!==e)throw Error(L(188))}function ok(e){var t=e.alternate;if(!t){if(t=bo(e),t===null)throw Error(L(188));return t!==e?null:e}for(var a=e,n=t;;){var r=a.return;if(r===null)break;var s=r.alternate;if(s===null){if(n=r.return,n!==null){a=n;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===a)return wv(r),e;if(s===n)return wv(r),t;s=s.sibling}throw Error(L(188))}if(a.return!==n.return)a=r,n=s;else{for(var i=!1,o=r.child;o;){if(o===a){i=!0,a=r,n=s;break}if(o===n){i=!0,n=r,a=s;break}o=o.sibling}if(!i){for(o=s.child;o;){if(o===a){i=!0,a=s,n=r;break}if(o===n){i=!0,n=s,a=r;break}o=o.sibling}if(!i)throw Error(L(189))}}if(a.alternate!==n)throw Error(L(190))}if(a.tag!==3)throw Error(L(188));return a.stateNode.current===a?e:t}function Qg(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=Qg(e),t!==null)return t;e=e.sibling}return null}var Le=Object.assign,lk=Symbol.for("react.element"),_l=Symbol.for("react.transitional.element"),zi=Symbol.for("react.portal"),ss=Symbol.for("react.fragment"),Vg=Symbol.for("react.strict_mode"),sm=Symbol.for("react.profiler"),uk=Symbol.for("react.provider"),Gg=Symbol.for("react.consumer"),nn=Symbol.for("react.context"),ef=Symbol.for("react.forward_ref"),im=Symbol.for("react.suspense"),om=Symbol.for("react.suspense_list"),tf=Symbol.for("react.memo"),Tn=Symbol.for("react.lazy");Symbol.for("react.scope");var lm=Symbol.for("react.activity");Symbol.for("react.legacy_hidden");Symbol.for("react.tracing_marker");var ck=Symbol.for("react.memo_cache_sentinel");Symbol.for("react.view_transition");var Sv=Symbol.iterator;function Di(e){return e===null||typeof e!="object"?null:(e=Sv&&e[Sv]||e["@@iterator"],typeof e=="function"?e:null)}var dk=Symbol.for("react.client.reference");function um(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===dk?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ss:return"Fragment";case sm:return"Profiler";case Vg:return"StrictMode";case im:return"Suspense";case om:return"SuspenseList";case lm:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case zi:return"Portal";case nn:return(e.displayName||"Context")+".Provider";case Gg:return(e._context.displayName||"Context")+".Consumer";case ef:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case tf:return t=e.displayName||null,t!==null?t:um(e.type)||"Memo";case Tn:t=e._payload,e=e._init;try{return um(e(t))}catch{}}return null}var Bi=Array.isArray,ne=Ig.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ge=ik.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,gr={pending:!1,data:null,method:null,action:null},cm=[],is=-1;function Ba(e){return{current:e}}function pt(e){0>is||(e.current=cm[is],cm[is]=null,is--)}function ze(e,t){is++,cm[is]=e.current,e.current=t}var Ua=Ba(null),ro=Ba(null),zn=Ba(null),tu=Ba(null);function au(e,t){switch(ze(zn,t),ze(ro,e),ze(Ua,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Eg(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Eg(t),e=d0(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}pt(Ua),ze(Ua,e)}function _s(){pt(Ua),pt(ro),pt(zn)}function dm(e){e.memoizedState!==null&&ze(tu,e);var t=Ua.current,a=d0(t,e.type);t!==a&&(ze(ro,e),ze(Ua,a))}function nu(e){ro.current===e&&(pt(Ua),pt(ro)),tu.current===e&&(pt(tu),ho._currentValue=gr)}var mm=Object.prototype.hasOwnProperty,af=it.unstable_scheduleCallback,Cd=it.unstable_cancelCallback,mk=it.unstable_shouldYield,fk=it.unstable_requestPaint,Fa=it.unstable_now,pk=it.unstable_getCurrentPriorityLevel,Yg=it.unstable_ImmediatePriority,Jg=it.unstable_UserBlockingPriority,ru=it.unstable_NormalPriority,hk=it.unstable_LowPriority,Xg=it.unstable_IdlePriority,vk=it.log,gk=it.unstable_setDisableYieldValue,xo=null,ea=null;function Pn(e){if(typeof vk=="function"&&gk(e),ea&&typeof ea.setStrictMode=="function")try{ea.setStrictMode(xo,e)}catch{}}var ta=Math.clz32?Math.clz32:xk,yk=Math.log,bk=Math.LN2;function xk(e){return e>>>=0,e===0?32:31-(yk(e)/bk|0)|0}var Rl=256,kl=4194304;function pr(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194048;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Au(e,t,a){var n=e.pendingLanes;if(n===0)return 0;var r=0,s=e.suspendedLanes,i=e.pingedLanes;e=e.warmLanes;var o=n&134217727;return o!==0?(n=o&~s,n!==0?r=pr(n):(i&=o,i!==0?r=pr(i):a||(a=o&~e,a!==0&&(r=pr(a))))):(o=n&~s,o!==0?r=pr(o):i!==0?r=pr(i):a||(a=n&~e,a!==0&&(r=pr(a)))),r===0?0:t!==0&&t!==r&&(t&s)===0&&(s=r&-r,a=t&-t,s>=a||s===32&&(a&4194048)!==0)?t:r}function $o(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function $k(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Zg(){var e=Rl;return Rl<<=1,(Rl&4194048)===0&&(Rl=256),e}function Wg(){var e=kl;return kl<<=1,(kl&62914560)===0&&(kl=4194304),e}function Ed(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function wo(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function wk(e,t,a,n,r,s){var i=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var o=e.entanglements,u=e.expirationTimes,c=e.hiddenUpdates;for(a=i&~a;0<a;){var d=31-ta(a),m=1<<d;o[d]=0,u[d]=-1;var f=c[d];if(f!==null)for(c[d]=null,d=0;d<f.length;d++){var p=f[d];p!==null&&(p.lane&=-536870913)}a&=~m}n!==0&&ey(e,n,0),s!==0&&r===0&&e.tag!==0&&(e.suspendedLanes|=s&~(i&~t))}function ey(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var n=31-ta(t);e.entangledLanes|=t,e.entanglements[n]=e.entanglements[n]|1073741824|a&4194090}function ty(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var n=31-ta(a),r=1<<n;r&t|e[n]&t&&(e[n]|=t),a&=~r}}function nf(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function rf(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function ay(){var e=ge.p;return e!==0?e:(e=window.event,e===void 0?32:$0(e.type))}function Sk(e,t){var a=ge.p;try{return ge.p=e,t()}finally{ge.p=a}}var Xn=Math.random().toString(36).slice(2),St="__reactFiber$"+Xn,Kt="__reactProps$"+Xn,Ps="__reactContainer$"+Xn,fm="__reactEvents$"+Xn,Nk="__reactListeners$"+Xn,_k="__reactHandles$"+Xn,Nv="__reactResources$"+Xn,So="__reactMarker$"+Xn;function sf(e){delete e[St],delete e[Kt],delete e[fm],delete e[Nk],delete e[_k]}function os(e){var t=e[St];if(t)return t;for(var a=e.parentNode;a;){if(t=a[Ps]||a[St]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=Dg(e);e!==null;){if(a=e[St])return a;e=Dg(e)}return t}e=a,a=e.parentNode}return null}function js(e){if(e=e[St]||e[Ps]){var t=e.tag;if(t===5||t===6||t===13||t===26||t===27||t===3)return e}return null}function qi(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(L(33))}function gs(e){var t=e[Nv];return t||(t=e[Nv]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function mt(e){e[So]=!0}var ny=new Set,ry={};function Cr(e,t){Rs(e,t),Rs(e+"Capture",t)}function Rs(e,t){for(ry[e]=t,e=0;e<t.length;e++)ny.add(t[e])}var Rk=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),_v={},Rv={};function kk(e){return mm.call(Rv,e)?!0:mm.call(_v,e)?!1:Rk.test(e)?Rv[e]=!0:(_v[e]=!0,!1)}function ql(e,t,a){if(kk(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var n=t.toLowerCase().slice(0,5);if(n!=="data-"&&n!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+a)}}function Cl(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+a)}}function Wa(e,t,a,n){if(n===null)e.removeAttribute(a);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,""+n)}}var Td,kv;function as(e){if(Td===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);Td=t&&t[1]||"",kv=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Td+e+kv}var Ad=!1;function Dd(e,t){if(!e||Ad)return"";Ad=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var n={DetermineComponentFrameRoot:function(){try{if(t){var m=function(){throw Error()};if(Object.defineProperty(m.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(m,[])}catch(p){var f=p}Reflect.construct(e,[],m)}else{try{m.call()}catch(p){f=p}e.call(m.prototype)}}else{try{throw Error()}catch(p){f=p}(m=e())&&typeof m.catch=="function"&&m.catch(function(){})}}catch(p){if(p&&f&&typeof p.stack=="string")return[p.stack,f.stack]}return[null,null]}};n.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var r=Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot,"name");r&&r.configurable&&Object.defineProperty(n.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=n.DetermineComponentFrameRoot(),i=s[0],o=s[1];if(i&&o){var u=i.split(`
`),c=o.split(`
`);for(r=n=0;n<u.length&&!u[n].includes("DetermineComponentFrameRoot");)n++;for(;r<c.length&&!c[r].includes("DetermineComponentFrameRoot");)r++;if(n===u.length||r===c.length)for(n=u.length-1,r=c.length-1;1<=n&&0<=r&&u[n]!==c[r];)r--;for(;1<=n&&0<=r;n--,r--)if(u[n]!==c[r]){if(n!==1||r!==1)do if(n--,r--,0>r||u[n]!==c[r]){var d=`
`+u[n].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}while(1<=n&&0<=r);break}}}finally{Ad=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?as(a):""}function Ck(e){switch(e.tag){case 26:case 27:case 5:return as(e.type);case 16:return as("Lazy");case 13:return as("Suspense");case 19:return as("SuspenseList");case 0:case 15:return Dd(e.type,!1);case 11:return Dd(e.type.render,!1);case 1:return Dd(e.type,!0);case 31:return as("Activity");default:return""}}function Cv(e){try{var t="";do t+=Ck(e),e=e.return;while(e);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}function ma(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function sy(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Ek(e){var t=sy(e)?"checked":"value",a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),n=""+e[t];if(!e.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var r=a.get,s=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return r.call(this)},set:function(i){n=""+i,s.call(this,i)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(i){n=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function su(e){e._valueTracker||(e._valueTracker=Ek(e))}function iy(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),n="";return e&&(n=sy(e)?e.checked?"true":"false":e.value),e=n,e!==a?(t.setValue(e),!0):!1}function iu(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Tk=/[\n"\\]/g;function ha(e){return e.replace(Tk,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function pm(e,t,a,n,r,s,i,o){e.name="",i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"?e.type=i:e.removeAttribute("type"),t!=null?i==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+ma(t)):e.value!==""+ma(t)&&(e.value=""+ma(t)):i!=="submit"&&i!=="reset"||e.removeAttribute("value"),t!=null?hm(e,i,ma(t)):a!=null?hm(e,i,ma(a)):n!=null&&e.removeAttribute("value"),r==null&&s!=null&&(e.defaultChecked=!!s),r!=null&&(e.checked=r&&typeof r!="function"&&typeof r!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+ma(o):e.removeAttribute("name")}function oy(e,t,a,n,r,s,i,o){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(e.type=s),t!=null||a!=null){if(!(s!=="submit"&&s!=="reset"||t!=null))return;a=a!=null?""+ma(a):"",t=t!=null?""+ma(t):a,o||t===e.value||(e.value=t),e.defaultValue=t}n=n??r,n=typeof n!="function"&&typeof n!="symbol"&&!!n,e.checked=o?e.checked:!!n,e.defaultChecked=!!n,i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(e.name=i)}function hm(e,t,a){t==="number"&&iu(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function ys(e,t,a,n){if(e=e.options,t){t={};for(var r=0;r<a.length;r++)t["$"+a[r]]=!0;for(a=0;a<e.length;a++)r=t.hasOwnProperty("$"+e[a].value),e[a].selected!==r&&(e[a].selected=r),r&&n&&(e[a].defaultSelected=!0)}else{for(a=""+ma(a),t=null,r=0;r<e.length;r++){if(e[r].value===a){e[r].selected=!0,n&&(e[r].defaultSelected=!0);return}t!==null||e[r].disabled||(t=e[r])}t!==null&&(t.selected=!0)}}function ly(e,t,a){if(t!=null&&(t=""+ma(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+ma(a):""}function uy(e,t,a,n){if(t==null){if(n!=null){if(a!=null)throw Error(L(92));if(Bi(n)){if(1<n.length)throw Error(L(93));n=n[0]}a=n}a==null&&(a=""),t=a}a=ma(t),e.defaultValue=a,n=e.textContent,n===a&&n!==""&&n!==null&&(e.value=n)}function ks(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var Ak=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ev(e,t,a){var n=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?n?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":n?e.setProperty(t,a):typeof a!="number"||a===0||Ak.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function cy(e,t,a){if(t!=null&&typeof t!="object")throw Error(L(62));if(e=e.style,a!=null){for(var n in a)!a.hasOwnProperty(n)||t!=null&&t.hasOwnProperty(n)||(n.indexOf("--")===0?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="");for(var r in t)n=t[r],t.hasOwnProperty(r)&&a[r]!==n&&Ev(e,r,n)}else for(var s in t)t.hasOwnProperty(s)&&Ev(e,s,t[s])}function of(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Dk=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Mk=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Il(e){return Mk.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}var vm=null;function lf(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ls=null,bs=null;function Tv(e){var t=js(e);if(t&&(e=t.stateNode)){var a=e[Kt]||null;e:switch(e=t.stateNode,t.type){case"input":if(pm(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+ha(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var n=a[t];if(n!==e&&n.form===e.form){var r=n[Kt]||null;if(!r)throw Error(L(90));pm(n,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name)}}for(t=0;t<a.length;t++)n=a[t],n.form===e.form&&iy(n)}break e;case"textarea":ly(e,a.value,a.defaultValue);break e;case"select":t=a.value,t!=null&&ys(e,!!a.multiple,t,!1)}}}var Md=!1;function dy(e,t,a){if(Md)return e(t,a);Md=!0;try{var n=e(t);return n}finally{if(Md=!1,(ls!==null||bs!==null)&&(Bu(),ls&&(t=ls,e=bs,bs=ls=null,Tv(t),e)))for(t=0;t<e.length;t++)Tv(e[t])}}function so(e,t){var a=e.stateNode;if(a===null)return null;var n=a[Kt]||null;if(n===null)return null;a=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(L(231,t,typeof a));return a}var dn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),gm=!1;if(dn)try{Wr={},Object.defineProperty(Wr,"passive",{get:function(){gm=!0}}),window.addEventListener("test",Wr,Wr),window.removeEventListener("test",Wr,Wr)}catch{gm=!1}var Wr,jn=null,uf=null,Hl=null;function my(){if(Hl)return Hl;var e,t=uf,a=t.length,n,r="value"in jn?jn.value:jn.textContent,s=r.length;for(e=0;e<a&&t[e]===r[e];e++);var i=a-e;for(n=1;n<=i&&t[a-n]===r[s-n];n++);return Hl=r.slice(e,1<n?1-n:void 0)}function Kl(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function El(){return!0}function Av(){return!1}function Qt(e){function t(a,n,r,s,i){this._reactName=a,this._targetInst=r,this.type=n,this.nativeEvent=s,this.target=i,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(a=e[o],this[o]=a?a(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?El:Av,this.isPropagationStopped=Av,this}return Le(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=El)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=El)},persist:function(){},isPersistent:El}),t}var Er={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Du=Qt(Er),No=Le({},Er,{view:0,detail:0}),Ok=Qt(No),Od,Ld,Mi,Mu=Le({},No,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:cf,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Mi&&(Mi&&e.type==="mousemove"?(Od=e.screenX-Mi.screenX,Ld=e.screenY-Mi.screenY):Ld=Od=0,Mi=e),Od)},movementY:function(e){return"movementY"in e?e.movementY:Ld}}),Dv=Qt(Mu),Lk=Le({},Mu,{dataTransfer:0}),Pk=Qt(Lk),jk=Le({},No,{relatedTarget:0}),Pd=Qt(jk),Uk=Le({},Er,{animationName:0,elapsedTime:0,pseudoElement:0}),Fk=Qt(Uk),zk=Le({},Er,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Bk=Qt(zk),qk=Le({},Er,{data:0}),Mv=Qt(qk),Ik={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Hk={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Kk={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Qk(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Kk[e])?!!t[e]:!1}function cf(){return Qk}var Vk=Le({},No,{key:function(e){if(e.key){var t=Ik[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Kl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Hk[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:cf,charCode:function(e){return e.type==="keypress"?Kl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Kl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Gk=Qt(Vk),Yk=Le({},Mu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ov=Qt(Yk),Jk=Le({},No,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:cf}),Xk=Qt(Jk),Zk=Le({},Er,{propertyName:0,elapsedTime:0,pseudoElement:0}),Wk=Qt(Zk),eC=Le({},Mu,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),tC=Qt(eC),aC=Le({},Er,{newState:0,oldState:0}),nC=Qt(aC),rC=[9,13,27,32],df=dn&&"CompositionEvent"in window,Hi=null;dn&&"documentMode"in document&&(Hi=document.documentMode);var sC=dn&&"TextEvent"in window&&!Hi,fy=dn&&(!df||Hi&&8<Hi&&11>=Hi),Lv=" ",Pv=!1;function py(e,t){switch(e){case"keyup":return rC.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function hy(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var us=!1;function iC(e,t){switch(e){case"compositionend":return hy(t);case"keypress":return t.which!==32?null:(Pv=!0,Lv);case"textInput":return e=t.data,e===Lv&&Pv?null:e;default:return null}}function oC(e,t){if(us)return e==="compositionend"||!df&&py(e,t)?(e=my(),Hl=uf=jn=null,us=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return fy&&t.locale!=="ko"?null:t.data;default:return null}}var lC={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function jv(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!lC[e.type]:t==="textarea"}function vy(e,t,a,n){ls?bs?bs.push(n):bs=[n]:ls=n,t=Nu(t,"onChange"),0<t.length&&(a=new Du("onChange","change",null,a,n),e.push({event:a,listeners:t}))}var Ki=null,io=null;function uC(e){l0(e,0)}function Ou(e){var t=qi(e);if(iy(t))return e}function Uv(e,t){if(e==="change")return t}var gy=!1;dn&&(dn?(Al="oninput"in document,Al||(jd=document.createElement("div"),jd.setAttribute("oninput","return;"),Al=typeof jd.oninput=="function"),Tl=Al):Tl=!1,gy=Tl&&(!document.documentMode||9<document.documentMode));var Tl,Al,jd;function Fv(){Ki&&(Ki.detachEvent("onpropertychange",yy),io=Ki=null)}function yy(e){if(e.propertyName==="value"&&Ou(io)){var t=[];vy(t,io,e,lf(e)),dy(uC,t)}}function cC(e,t,a){e==="focusin"?(Fv(),Ki=t,io=a,Ki.attachEvent("onpropertychange",yy)):e==="focusout"&&Fv()}function dC(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ou(io)}function mC(e,t){if(e==="click")return Ou(t)}function fC(e,t){if(e==="input"||e==="change")return Ou(t)}function pC(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ra=typeof Object.is=="function"?Object.is:pC;function oo(e,t){if(ra(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),n=Object.keys(t);if(a.length!==n.length)return!1;for(n=0;n<a.length;n++){var r=a[n];if(!mm.call(t,r)||!ra(e[r],t[r]))return!1}return!0}function zv(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Bv(e,t){var a=zv(e);e=0;for(var n;a;){if(a.nodeType===3){if(n=e+a.textContent.length,e<=t&&n>=t)return{node:a,offset:t-e};e=n}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=zv(a)}}function by(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?by(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function xy(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=iu(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=iu(e.document)}return t}function mf(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var hC=dn&&"documentMode"in document&&11>=document.documentMode,cs=null,ym=null,Qi=null,bm=!1;function qv(e,t,a){var n=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;bm||cs==null||cs!==iu(n)||(n=cs,"selectionStart"in n&&mf(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),Qi&&oo(Qi,n)||(Qi=n,n=Nu(ym,"onSelect"),0<n.length&&(t=new Du("onSelect","select",null,t,a),e.push({event:t,listeners:n}),t.target=cs)))}function fr(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var ds={animationend:fr("Animation","AnimationEnd"),animationiteration:fr("Animation","AnimationIteration"),animationstart:fr("Animation","AnimationStart"),transitionrun:fr("Transition","TransitionRun"),transitionstart:fr("Transition","TransitionStart"),transitioncancel:fr("Transition","TransitionCancel"),transitionend:fr("Transition","TransitionEnd")},Ud={},$y={};dn&&($y=document.createElement("div").style,"AnimationEvent"in window||(delete ds.animationend.animation,delete ds.animationiteration.animation,delete ds.animationstart.animation),"TransitionEvent"in window||delete ds.transitionend.transition);function Tr(e){if(Ud[e])return Ud[e];if(!ds[e])return e;var t=ds[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in $y)return Ud[e]=t[a];return e}var wy=Tr("animationend"),Sy=Tr("animationiteration"),Ny=Tr("animationstart"),vC=Tr("transitionrun"),gC=Tr("transitionstart"),yC=Tr("transitioncancel"),_y=Tr("transitionend"),Ry=new Map,xm="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");xm.push("scrollEnd");function _a(e,t){Ry.set(e,t),Cr(t,[e])}var Iv=new WeakMap;function va(e,t){if(typeof e=="object"&&e!==null){var a=Iv.get(e);return a!==void 0?a:(t={value:e,source:t,stack:Cv(t)},Iv.set(e,t),t)}return{value:e,source:t,stack:Cv(t)}}var da=[],ms=0,ff=0;function Lu(){for(var e=ms,t=ff=ms=0;t<e;){var a=da[t];da[t++]=null;var n=da[t];da[t++]=null;var r=da[t];da[t++]=null;var s=da[t];if(da[t++]=null,n!==null&&r!==null){var i=n.pending;i===null?r.next=r:(r.next=i.next,i.next=r),n.pending=r}s!==0&&ky(a,r,s)}}function Pu(e,t,a,n){da[ms++]=e,da[ms++]=t,da[ms++]=a,da[ms++]=n,ff|=n,e.lanes|=n,e=e.alternate,e!==null&&(e.lanes|=n)}function pf(e,t,a,n){return Pu(e,t,a,n),ou(e)}function Us(e,t){return Pu(e,null,null,t),ou(e)}function ky(e,t,a){e.lanes|=a;var n=e.alternate;n!==null&&(n.lanes|=a);for(var r=!1,s=e.return;s!==null;)s.childLanes|=a,n=s.alternate,n!==null&&(n.childLanes|=a),s.tag===22&&(e=s.stateNode,e===null||e._visibility&1||(r=!0)),e=s,s=s.return;return e.tag===3?(s=e.stateNode,r&&t!==null&&(r=31-ta(a),e=s.hiddenUpdates,n=e[r],n===null?e[r]=[t]:n.push(t),t.lane=a|536870912),s):null}function ou(e){if(50<ao)throw ao=0,Bm=null,Error(L(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var fs={};function bC(e,t,a,n){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Wt(e,t,a,n){return new bC(e,t,a,n)}function hf(e){return e=e.prototype,!(!e||!e.isReactComponent)}function un(e,t){var a=e.alternate;return a===null?(a=Wt(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function Cy(e,t){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Ql(e,t,a,n,r,s){var i=0;if(n=e,typeof e=="function")hf(e)&&(i=1);else if(typeof e=="string")i=bE(e,a,Ua.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case lm:return e=Wt(31,a,t,r),e.elementType=lm,e.lanes=s,e;case ss:return yr(a.children,r,s,t);case Vg:i=8,r|=24;break;case sm:return e=Wt(12,a,t,r|2),e.elementType=sm,e.lanes=s,e;case im:return e=Wt(13,a,t,r),e.elementType=im,e.lanes=s,e;case om:return e=Wt(19,a,t,r),e.elementType=om,e.lanes=s,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case uk:case nn:i=10;break e;case Gg:i=9;break e;case ef:i=11;break e;case tf:i=14;break e;case Tn:i=16,n=null;break e}i=29,a=Error(L(130,e===null?"null":typeof e,"")),n=null}return t=Wt(i,a,t,r),t.elementType=e,t.type=n,t.lanes=s,t}function yr(e,t,a,n){return e=Wt(7,e,n,t),e.lanes=a,e}function Fd(e,t,a){return e=Wt(6,e,null,t),e.lanes=a,e}function zd(e,t,a){return t=Wt(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var ps=[],hs=0,lu=null,uu=0,fa=[],pa=0,br=null,rn=1,sn="";function hr(e,t){ps[hs++]=uu,ps[hs++]=lu,lu=e,uu=t}function Ey(e,t,a){fa[pa++]=rn,fa[pa++]=sn,fa[pa++]=br,br=e;var n=rn;e=sn;var r=32-ta(n)-1;n&=~(1<<r),a+=1;var s=32-ta(t)+r;if(30<s){var i=r-r%5;s=(n&(1<<i)-1).toString(32),n>>=i,r-=i,rn=1<<32-ta(t)+r|a<<r|n,sn=s+e}else rn=1<<s|a<<r|n,sn=e}function vf(e){e.return!==null&&(hr(e,1),Ey(e,1,0))}function gf(e){for(;e===lu;)lu=ps[--hs],ps[hs]=null,uu=ps[--hs],ps[hs]=null;for(;e===br;)br=fa[--pa],fa[pa]=null,sn=fa[--pa],fa[pa]=null,rn=fa[--pa],fa[pa]=null}var Tt=null,He=null,ve=!1,xr=null,Pa=!1,$m=Error(L(519));function Nr(e){var t=Error(L(418,""));throw lo(va(t,e)),$m}function Hv(e){var t=e.stateNode,a=e.type,n=e.memoizedProps;switch(t[St]=e,t[Kt]=n,a){case"dialog":oe("cancel",t),oe("close",t);break;case"iframe":case"object":case"embed":oe("load",t);break;case"video":case"audio":for(a=0;a<mo.length;a++)oe(mo[a],t);break;case"source":oe("error",t);break;case"img":case"image":case"link":oe("error",t),oe("load",t);break;case"details":oe("toggle",t);break;case"input":oe("invalid",t),oy(t,n.value,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name,!0),su(t);break;case"select":oe("invalid",t);break;case"textarea":oe("invalid",t),uy(t,n.value,n.defaultValue,n.children),su(t)}a=n.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||n.suppressHydrationWarning===!0||c0(t.textContent,a)?(n.popover!=null&&(oe("beforetoggle",t),oe("toggle",t)),n.onScroll!=null&&oe("scroll",t),n.onScrollEnd!=null&&oe("scrollend",t),n.onClick!=null&&(t.onclick=Hu),t=!0):t=!1,t||Nr(e)}function Kv(e){for(Tt=e.return;Tt;)switch(Tt.tag){case 5:case 13:Pa=!1;return;case 27:case 3:Pa=!0;return;default:Tt=Tt.return}}function Oi(e){if(e!==Tt)return!1;if(!ve)return Kv(e),ve=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||Vm(e.type,e.memoizedProps)),a=!a),a&&He&&Nr(e),Kv(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(L(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8)if(a=e.data,a==="/$"){if(t===0){He=Na(e.nextSibling);break e}t--}else a!=="$"&&a!=="$!"&&a!=="$?"||t++;e=e.nextSibling}He=null}}else t===27?(t=He,Zn(e.type)?(e=Jm,Jm=null,He=e):He=t):He=Tt?Na(e.stateNode.nextSibling):null;return!0}function _o(){He=Tt=null,ve=!1}function Qv(){var e=xr;return e!==null&&(Ht===null?Ht=e:Ht.push.apply(Ht,e),xr=null),e}function lo(e){xr===null?xr=[e]:xr.push(e)}var wm=Ba(null),Ar=null,on=null;function Dn(e,t,a){ze(wm,t._currentValue),t._currentValue=a}function cn(e){e._currentValue=wm.current,pt(wm)}function Sm(e,t,a){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===a)break;e=e.return}}function Nm(e,t,a,n){var r=e.child;for(r!==null&&(r.return=e);r!==null;){var s=r.dependencies;if(s!==null){var i=r.child;s=s.firstContext;e:for(;s!==null;){var o=s;s=r;for(var u=0;u<t.length;u++)if(o.context===t[u]){s.lanes|=a,o=s.alternate,o!==null&&(o.lanes|=a),Sm(s.return,a,e),n||(i=null);break e}s=o.next}}else if(r.tag===18){if(i=r.return,i===null)throw Error(L(341));i.lanes|=a,s=i.alternate,s!==null&&(s.lanes|=a),Sm(i,a,e),i=null}else i=r.child;if(i!==null)i.return=r;else for(i=r;i!==null;){if(i===e){i=null;break}if(r=i.sibling,r!==null){r.return=i.return,i=r;break}i=i.return}r=i}}function Ro(e,t,a,n){e=null;for(var r=t,s=!1;r!==null;){if(!s){if((r.flags&524288)!==0)s=!0;else if((r.flags&262144)!==0)break}if(r.tag===10){var i=r.alternate;if(i===null)throw Error(L(387));if(i=i.memoizedProps,i!==null){var o=r.type;ra(r.pendingProps.value,i.value)||(e!==null?e.push(o):e=[o])}}else if(r===tu.current){if(i=r.alternate,i===null)throw Error(L(387));i.memoizedState.memoizedState!==r.memoizedState.memoizedState&&(e!==null?e.push(ho):e=[ho])}r=r.return}e!==null&&Nm(t,e,a,n),t.flags|=262144}function cu(e){for(e=e.firstContext;e!==null;){if(!ra(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function _r(e){Ar=e,on=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Nt(e){return Ty(Ar,e)}function Dl(e,t){return Ar===null&&_r(e),Ty(e,t)}function Ty(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},on===null){if(e===null)throw Error(L(308));on=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else on=on.next=t;return a}var xC=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},$C=it.unstable_scheduleCallback,wC=it.unstable_NormalPriority,rt={$$typeof:nn,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function yf(){return{controller:new xC,data:new Map,refCount:0}}function ko(e){e.refCount--,e.refCount===0&&$C(wC,function(){e.controller.abort()})}var Vi=null,_m=0,Cs=0,xs=null;function SC(e,t){if(Vi===null){var a=Vi=[];_m=0,Cs=Bf(),xs={status:"pending",value:void 0,then:function(n){a.push(n)}}}return _m++,t.then(Vv,Vv),t}function Vv(){if(--_m===0&&Vi!==null){xs!==null&&(xs.status="fulfilled");var e=Vi;Vi=null,Cs=0,xs=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function NC(e,t){var a=[],n={status:"pending",value:null,reason:null,then:function(r){a.push(r)}};return e.then(function(){n.status="fulfilled",n.value=t;for(var r=0;r<a.length;r++)(0,a[r])(t)},function(r){for(n.status="rejected",n.reason=r,r=0;r<a.length;r++)(0,a[r])(void 0)}),n}var Gv=ne.S;ne.S=function(e,t){typeof t=="object"&&t!==null&&typeof t.then=="function"&&SC(e,t),Gv!==null&&Gv(e,t)};var $r=Ba(null);function bf(){var e=$r.current;return e!==null?e:Ae.pooledCache}function Vl(e,t){t===null?ze($r,$r.current):ze($r,t.pool)}function Ay(){var e=bf();return e===null?null:{parent:rt._currentValue,pool:e}}var Co=Error(L(460)),Dy=Error(L(474)),ju=Error(L(542)),Rm={then:function(){}};function Yv(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Ml(){}function My(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(Ml,Ml),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Xv(e),e;default:if(typeof t.status=="string")t.then(Ml,Ml);else{if(e=Ae,e!==null&&100<e.shellSuspendCounter)throw Error(L(482));e=t,e.status="pending",e.then(function(n){if(t.status==="pending"){var r=t;r.status="fulfilled",r.value=n}},function(n){if(t.status==="pending"){var r=t;r.status="rejected",r.reason=n}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Xv(e),e}throw Gi=t,Co}}var Gi=null;function Jv(){if(Gi===null)throw Error(L(459));var e=Gi;return Gi=null,e}function Xv(e){if(e===Co||e===ju)throw Error(L(483))}var An=!1;function xf(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function km(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Bn(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function qn(e,t,a){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,(Se&2)!==0){var r=n.pending;return r===null?t.next=t:(t.next=r.next,r.next=t),n.pending=t,t=ou(e),ky(e,null,a),t}return Pu(e,n,t,a),ou(e)}function Yi(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var n=t.lanes;n&=e.pendingLanes,a|=n,t.lanes=a,ty(e,a)}}function Bd(e,t){var a=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,a===n)){var r=null,s=null;if(a=a.firstBaseUpdate,a!==null){do{var i={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};s===null?r=s=i:s=s.next=i,a=a.next}while(a!==null);s===null?r=s=t:s=s.next=t}else r=s=t;a={baseState:n.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:n.shared,callbacks:n.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var Cm=!1;function Ji(){if(Cm){var e=xs;if(e!==null)throw e}}function Xi(e,t,a,n){Cm=!1;var r=e.updateQueue;An=!1;var s=r.firstBaseUpdate,i=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var u=o,c=u.next;u.next=null,i===null?s=c:i.next=c,i=u;var d=e.alternate;d!==null&&(d=d.updateQueue,o=d.lastBaseUpdate,o!==i&&(o===null?d.firstBaseUpdate=c:o.next=c,d.lastBaseUpdate=u))}if(s!==null){var m=r.baseState;i=0,d=c=u=null,o=s;do{var f=o.lane&-536870913,p=f!==o.lane;if(p?(de&f)===f:(n&f)===f){f!==0&&f===Cs&&(Cm=!0),d!==null&&(d=d.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});e:{var b=e,y=o;f=t;var x=a;switch(y.tag){case 1:if(b=y.payload,typeof b=="function"){m=b.call(x,m,f);break e}m=b;break e;case 3:b.flags=b.flags&-65537|128;case 0:if(b=y.payload,f=typeof b=="function"?b.call(x,m,f):b,f==null)break e;m=Le({},m,f);break e;case 2:An=!0}}f=o.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=r.callbacks,p===null?r.callbacks=[f]:p.push(f))}else p={lane:f,tag:o.tag,payload:o.payload,callback:o.callback,next:null},d===null?(c=d=p,u=m):d=d.next=p,i|=f;if(o=o.next,o===null){if(o=r.shared.pending,o===null)break;p=o,o=p.next,p.next=null,r.lastBaseUpdate=p,r.shared.pending=null}}while(!0);d===null&&(u=m),r.baseState=u,r.firstBaseUpdate=c,r.lastBaseUpdate=d,s===null&&(r.shared.lanes=0),Jn|=i,e.lanes=i,e.memoizedState=m}}function Oy(e,t){if(typeof e!="function")throw Error(L(191,e));e.call(t)}function Ly(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)Oy(a[e],t)}var Es=Ba(null),du=Ba(0);function Zv(e,t){e=pn,ze(du,e),ze(Es,t),pn=e|t.baseLanes}function Em(){ze(du,pn),ze(Es,Es.current)}function $f(){pn=du.current,pt(Es),pt(du)}var Gn=0,ie=null,ke=null,Ze=null,mu=!1,$s=!1,Rr=!1,fu=0,uo=0,ws=null,_C=0;function Ye(){throw Error(L(321))}function wf(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!ra(e[a],t[a]))return!1;return!0}function Sf(e,t,a,n,r,s){return Gn=s,ie=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,ne.H=e===null||e.memoizedState===null?mb:fb,Rr=!1,s=a(n,r),Rr=!1,$s&&(s=jy(t,a,n,r)),Py(e),s}function Py(e){ne.H=pu;var t=ke!==null&&ke.next!==null;if(Gn=0,Ze=ke=ie=null,mu=!1,uo=0,ws=null,t)throw Error(L(300));e===null||ft||(e=e.dependencies,e!==null&&cu(e)&&(ft=!0))}function jy(e,t,a,n){ie=e;var r=0;do{if($s&&(ws=null),uo=0,$s=!1,25<=r)throw Error(L(301));if(r+=1,Ze=ke=null,e.updateQueue!=null){var s=e.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}ne.H=DC,s=t(a,n)}while($s);return s}function RC(){var e=ne.H,t=e.useState()[0];return t=typeof t.then=="function"?Eo(t):t,e=e.useState()[0],(ke!==null?ke.memoizedState:null)!==e&&(ie.flags|=1024),t}function Nf(){var e=fu!==0;return fu=0,e}function _f(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function Rf(e){if(mu){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}mu=!1}Gn=0,Ze=ke=ie=null,$s=!1,uo=fu=0,ws=null}function qt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ze===null?ie.memoizedState=Ze=e:Ze=Ze.next=e,Ze}function We(){if(ke===null){var e=ie.alternate;e=e!==null?e.memoizedState:null}else e=ke.next;var t=Ze===null?ie.memoizedState:Ze.next;if(t!==null)Ze=t,ke=e;else{if(e===null)throw ie.alternate===null?Error(L(467)):Error(L(310));ke=e,e={memoizedState:ke.memoizedState,baseState:ke.baseState,baseQueue:ke.baseQueue,queue:ke.queue,next:null},Ze===null?ie.memoizedState=Ze=e:Ze=Ze.next=e}return Ze}function kf(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Eo(e){var t=uo;return uo+=1,ws===null&&(ws=[]),e=My(ws,e,t),t=ie,(Ze===null?t.memoizedState:Ze.next)===null&&(t=t.alternate,ne.H=t===null||t.memoizedState===null?mb:fb),e}function Uu(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Eo(e);if(e.$$typeof===nn)return Nt(e)}throw Error(L(438,String(e)))}function Cf(e){var t=null,a=ie.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var n=ie.alternate;n!==null&&(n=n.updateQueue,n!==null&&(n=n.memoCache,n!=null&&(t={data:n.data.map(function(r){return r.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=kf(),ie.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),n=0;n<e;n++)a[n]=ck;return t.index++,a}function mn(e,t){return typeof t=="function"?t(e):t}function Gl(e){var t=We();return Ef(t,ke,e)}function Ef(e,t,a){var n=e.queue;if(n===null)throw Error(L(311));n.lastRenderedReducer=a;var r=e.baseQueue,s=n.pending;if(s!==null){if(r!==null){var i=r.next;r.next=s.next,s.next=i}t.baseQueue=r=s,n.pending=null}if(s=e.baseState,r===null)e.memoizedState=s;else{t=r.next;var o=i=null,u=null,c=t,d=!1;do{var m=c.lane&-536870913;if(m!==c.lane?(de&m)===m:(Gn&m)===m){var f=c.revertLane;if(f===0)u!==null&&(u=u.next={lane:0,revertLane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),m===Cs&&(d=!0);else if((Gn&f)===f){c=c.next,f===Cs&&(d=!0);continue}else m={lane:0,revertLane:c.revertLane,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},u===null?(o=u=m,i=s):u=u.next=m,ie.lanes|=f,Jn|=f;m=c.action,Rr&&a(s,m),s=c.hasEagerState?c.eagerState:a(s,m)}else f={lane:m,revertLane:c.revertLane,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},u===null?(o=u=f,i=s):u=u.next=f,ie.lanes|=m,Jn|=m;c=c.next}while(c!==null&&c!==t);if(u===null?i=s:u.next=o,!ra(s,e.memoizedState)&&(ft=!0,d&&(a=xs,a!==null)))throw a;e.memoizedState=s,e.baseState=i,e.baseQueue=u,n.lastRenderedState=s}return r===null&&(n.lanes=0),[e.memoizedState,n.dispatch]}function qd(e){var t=We(),a=t.queue;if(a===null)throw Error(L(311));a.lastRenderedReducer=e;var n=a.dispatch,r=a.pending,s=t.memoizedState;if(r!==null){a.pending=null;var i=r=r.next;do s=e(s,i.action),i=i.next;while(i!==r);ra(s,t.memoizedState)||(ft=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),a.lastRenderedState=s}return[s,n]}function Uy(e,t,a){var n=ie,r=We(),s=ve;if(s){if(a===void 0)throw Error(L(407));a=a()}else a=t();var i=!ra((ke||r).memoizedState,a);i&&(r.memoizedState=a,ft=!0),r=r.queue;var o=By.bind(null,n,r,e);if(To(2048,8,o,[e]),r.getSnapshot!==t||i||Ze!==null&&Ze.memoizedState.tag&1){if(n.flags|=2048,Ts(9,Fu(),zy.bind(null,n,r,a,t),null),Ae===null)throw Error(L(349));s||(Gn&124)!==0||Fy(n,t,a)}return a}function Fy(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=ie.updateQueue,t===null?(t=kf(),ie.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function zy(e,t,a,n){t.value=a,t.getSnapshot=n,qy(t)&&Iy(e)}function By(e,t,a){return a(function(){qy(t)&&Iy(e)})}function qy(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!ra(e,a)}catch{return!0}}function Iy(e){var t=Us(e,2);t!==null&&na(t,e,2)}function Tm(e){var t=qt();if(typeof e=="function"){var a=e;if(e=a(),Rr){Pn(!0);try{a()}finally{Pn(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:mn,lastRenderedState:e},t}function Hy(e,t,a,n){return e.baseState=a,Ef(e,ke,typeof n=="function"?n:mn)}function kC(e,t,a,n,r){if(zu(e))throw Error(L(485));if(e=t.action,e!==null){var s={payload:r,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(i){s.listeners.push(i)}};ne.T!==null?a(!0):s.isTransition=!1,n(s),a=t.pending,a===null?(s.next=t.pending=s,Ky(t,s)):(s.next=a.next,t.pending=a.next=s)}}function Ky(e,t){var a=t.action,n=t.payload,r=e.state;if(t.isTransition){var s=ne.T,i={};ne.T=i;try{var o=a(r,n),u=ne.S;u!==null&&u(i,o),Wv(e,t,o)}catch(c){Am(e,t,c)}finally{ne.T=s}}else try{s=a(r,n),Wv(e,t,s)}catch(c){Am(e,t,c)}}function Wv(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(n){eg(e,t,n)},function(n){return Am(e,t,n)}):eg(e,t,a)}function eg(e,t,a){t.status="fulfilled",t.value=a,Qy(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,Ky(e,a)))}function Am(e,t,a){var n=e.pending;if(e.pending=null,n!==null){n=n.next;do t.status="rejected",t.reason=a,Qy(t),t=t.next;while(t!==n)}e.action=null}function Qy(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Vy(e,t){return t}function tg(e,t){if(ve){var a=Ae.formState;if(a!==null){e:{var n=ie;if(ve){if(He){t:{for(var r=He,s=Pa;r.nodeType!==8;){if(!s){r=null;break t}if(r=Na(r.nextSibling),r===null){r=null;break t}}s=r.data,r=s==="F!"||s==="F"?r:null}if(r){He=Na(r.nextSibling),n=r.data==="F!";break e}}Nr(n)}n=!1}n&&(t=a[0])}}return a=qt(),a.memoizedState=a.baseState=t,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Vy,lastRenderedState:t},a.queue=n,a=ub.bind(null,ie,n),n.dispatch=a,n=Tm(!1),s=Mf.bind(null,ie,!1,n.queue),n=qt(),r={state:t,dispatch:null,action:e,pending:null},n.queue=r,a=kC.bind(null,ie,r,s,a),r.dispatch=a,n.memoizedState=e,[t,a,!1]}function ag(e){var t=We();return Gy(t,ke,e)}function Gy(e,t,a){if(t=Ef(e,t,Vy)[0],e=Gl(mn)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var n=Eo(t)}catch(i){throw i===Co?ju:i}else n=t;t=We();var r=t.queue,s=r.dispatch;return a!==t.memoizedState&&(ie.flags|=2048,Ts(9,Fu(),CC.bind(null,r,a),null)),[n,s,e]}function CC(e,t){e.action=t}function ng(e){var t=We(),a=ke;if(a!==null)return Gy(t,a,e);We(),t=t.memoizedState,a=We();var n=a.queue.dispatch;return a.memoizedState=e,[t,n,!1]}function Ts(e,t,a,n){return e={tag:e,create:a,deps:n,inst:t,next:null},t=ie.updateQueue,t===null&&(t=kf(),ie.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(n=a.next,a.next=e,e.next=n,t.lastEffect=e),e}function Fu(){return{destroy:void 0,resource:void 0}}function Yy(){return We().memoizedState}function Yl(e,t,a,n){var r=qt();n=n===void 0?null:n,ie.flags|=e,r.memoizedState=Ts(1|t,Fu(),a,n)}function To(e,t,a,n){var r=We();n=n===void 0?null:n;var s=r.memoizedState.inst;ke!==null&&n!==null&&wf(n,ke.memoizedState.deps)?r.memoizedState=Ts(t,s,a,n):(ie.flags|=e,r.memoizedState=Ts(1|t,s,a,n))}function rg(e,t){Yl(8390656,8,e,t)}function Jy(e,t){To(2048,8,e,t)}function Xy(e,t){return To(4,2,e,t)}function Zy(e,t){return To(4,4,e,t)}function Wy(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function eb(e,t,a){a=a!=null?a.concat([e]):null,To(4,4,Wy.bind(null,t,e),a)}function Tf(){}function tb(e,t){var a=We();t=t===void 0?null:t;var n=a.memoizedState;return t!==null&&wf(t,n[1])?n[0]:(a.memoizedState=[e,t],e)}function ab(e,t){var a=We();t=t===void 0?null:t;var n=a.memoizedState;if(t!==null&&wf(t,n[1]))return n[0];if(n=e(),Rr){Pn(!0);try{e()}finally{Pn(!1)}}return a.memoizedState=[n,t],n}function Af(e,t,a){return a===void 0||(Gn&1073741824)!==0?e.memoizedState=t:(e.memoizedState=a,e=Qb(),ie.lanes|=e,Jn|=e,a)}function nb(e,t,a,n){return ra(a,t)?a:Es.current!==null?(e=Af(e,a,n),ra(e,t)||(ft=!0),e):(Gn&42)===0?(ft=!0,e.memoizedState=a):(e=Qb(),ie.lanes|=e,Jn|=e,t)}function rb(e,t,a,n,r){var s=ge.p;ge.p=s!==0&&8>s?s:8;var i=ne.T,o={};ne.T=o,Mf(e,!1,t,a);try{var u=r(),c=ne.S;if(c!==null&&c(o,u),u!==null&&typeof u=="object"&&typeof u.then=="function"){var d=NC(u,n);Zi(e,t,d,aa(e))}else Zi(e,t,n,aa(e))}catch(m){Zi(e,t,{then:function(){},status:"rejected",reason:m},aa())}finally{ge.p=s,ne.T=i}}function EC(){}function Dm(e,t,a,n){if(e.tag!==5)throw Error(L(476));var r=sb(e).queue;rb(e,r,t,gr,a===null?EC:function(){return ib(e),a(n)})}function sb(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:gr,baseState:gr,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:mn,lastRenderedState:gr},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:mn,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ib(e){var t=sb(e).next.queue;Zi(e,t,{},aa())}function Df(){return Nt(ho)}function ob(){return We().memoizedState}function lb(){return We().memoizedState}function TC(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=aa();e=Bn(a);var n=qn(t,e,a);n!==null&&(na(n,t,a),Yi(n,t,a)),t={cache:yf()},e.payload=t;return}t=t.return}}function AC(e,t,a){var n=aa();a={lane:n,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null},zu(e)?cb(t,a):(a=pf(e,t,a,n),a!==null&&(na(a,e,n),db(a,t,n)))}function ub(e,t,a){var n=aa();Zi(e,t,a,n)}function Zi(e,t,a,n){var r={lane:n,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null};if(zu(e))cb(t,r);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var i=t.lastRenderedState,o=s(i,a);if(r.hasEagerState=!0,r.eagerState=o,ra(o,i))return Pu(e,t,r,0),Ae===null&&Lu(),!1}catch{}finally{}if(a=pf(e,t,r,n),a!==null)return na(a,e,n),db(a,t,n),!0}return!1}function Mf(e,t,a,n){if(n={lane:2,revertLane:Bf(),action:n,hasEagerState:!1,eagerState:null,next:null},zu(e)){if(t)throw Error(L(479))}else t=pf(e,a,n,2),t!==null&&na(t,e,2)}function zu(e){var t=e.alternate;return e===ie||t!==null&&t===ie}function cb(e,t){$s=mu=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function db(e,t,a){if((a&4194048)!==0){var n=t.lanes;n&=e.pendingLanes,a|=n,t.lanes=a,ty(e,a)}}var pu={readContext:Nt,use:Uu,useCallback:Ye,useContext:Ye,useEffect:Ye,useImperativeHandle:Ye,useLayoutEffect:Ye,useInsertionEffect:Ye,useMemo:Ye,useReducer:Ye,useRef:Ye,useState:Ye,useDebugValue:Ye,useDeferredValue:Ye,useTransition:Ye,useSyncExternalStore:Ye,useId:Ye,useHostTransitionStatus:Ye,useFormState:Ye,useActionState:Ye,useOptimistic:Ye,useMemoCache:Ye,useCacheRefresh:Ye},mb={readContext:Nt,use:Uu,useCallback:function(e,t){return qt().memoizedState=[e,t===void 0?null:t],e},useContext:Nt,useEffect:rg,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,Yl(4194308,4,Wy.bind(null,t,e),a)},useLayoutEffect:function(e,t){return Yl(4194308,4,e,t)},useInsertionEffect:function(e,t){Yl(4,2,e,t)},useMemo:function(e,t){var a=qt();t=t===void 0?null:t;var n=e();if(Rr){Pn(!0);try{e()}finally{Pn(!1)}}return a.memoizedState=[n,t],n},useReducer:function(e,t,a){var n=qt();if(a!==void 0){var r=a(t);if(Rr){Pn(!0);try{a(t)}finally{Pn(!1)}}}else r=t;return n.memoizedState=n.baseState=r,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:r},n.queue=e,e=e.dispatch=AC.bind(null,ie,e),[n.memoizedState,e]},useRef:function(e){var t=qt();return e={current:e},t.memoizedState=e},useState:function(e){e=Tm(e);var t=e.queue,a=ub.bind(null,ie,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:Tf,useDeferredValue:function(e,t){var a=qt();return Af(a,e,t)},useTransition:function(){var e=Tm(!1);return e=rb.bind(null,ie,e.queue,!0,!1),qt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var n=ie,r=qt();if(ve){if(a===void 0)throw Error(L(407));a=a()}else{if(a=t(),Ae===null)throw Error(L(349));(de&124)!==0||Fy(n,t,a)}r.memoizedState=a;var s={value:a,getSnapshot:t};return r.queue=s,rg(By.bind(null,n,s,e),[e]),n.flags|=2048,Ts(9,Fu(),zy.bind(null,n,s,a,t),null),a},useId:function(){var e=qt(),t=Ae.identifierPrefix;if(ve){var a=sn,n=rn;a=(n&~(1<<32-ta(n)-1)).toString(32)+a,t="\xAB"+t+"R"+a,a=fu++,0<a&&(t+="H"+a.toString(32)),t+="\xBB"}else a=_C++,t="\xAB"+t+"r"+a.toString(32)+"\xBB";return e.memoizedState=t},useHostTransitionStatus:Df,useFormState:tg,useActionState:tg,useOptimistic:function(e){var t=qt();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=Mf.bind(null,ie,!0,a),a.dispatch=t,[e,t]},useMemoCache:Cf,useCacheRefresh:function(){return qt().memoizedState=TC.bind(null,ie)}},fb={readContext:Nt,use:Uu,useCallback:tb,useContext:Nt,useEffect:Jy,useImperativeHandle:eb,useInsertionEffect:Xy,useLayoutEffect:Zy,useMemo:ab,useReducer:Gl,useRef:Yy,useState:function(){return Gl(mn)},useDebugValue:Tf,useDeferredValue:function(e,t){var a=We();return nb(a,ke.memoizedState,e,t)},useTransition:function(){var e=Gl(mn)[0],t=We().memoizedState;return[typeof e=="boolean"?e:Eo(e),t]},useSyncExternalStore:Uy,useId:ob,useHostTransitionStatus:Df,useFormState:ag,useActionState:ag,useOptimistic:function(e,t){var a=We();return Hy(a,ke,e,t)},useMemoCache:Cf,useCacheRefresh:lb},DC={readContext:Nt,use:Uu,useCallback:tb,useContext:Nt,useEffect:Jy,useImperativeHandle:eb,useInsertionEffect:Xy,useLayoutEffect:Zy,useMemo:ab,useReducer:qd,useRef:Yy,useState:function(){return qd(mn)},useDebugValue:Tf,useDeferredValue:function(e,t){var a=We();return ke===null?Af(a,e,t):nb(a,ke.memoizedState,e,t)},useTransition:function(){var e=qd(mn)[0],t=We().memoizedState;return[typeof e=="boolean"?e:Eo(e),t]},useSyncExternalStore:Uy,useId:ob,useHostTransitionStatus:Df,useFormState:ng,useActionState:ng,useOptimistic:function(e,t){var a=We();return ke!==null?Hy(a,ke,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:Cf,useCacheRefresh:lb},Ss=null,co=0;function Ol(e){var t=co;return co+=1,Ss===null&&(Ss=[]),My(Ss,e,t)}function Li(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Ll(e,t){throw t.$$typeof===lk?Error(L(525)):(e=Object.prototype.toString.call(t),Error(L(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function sg(e){var t=e._init;return t(e._payload)}function pb(e){function t(g,v){if(e){var $=g.deletions;$===null?(g.deletions=[v],g.flags|=16):$.push(v)}}function a(g,v){if(!e)return null;for(;v!==null;)t(g,v),v=v.sibling;return null}function n(g){for(var v=new Map;g!==null;)g.key!==null?v.set(g.key,g):v.set(g.index,g),g=g.sibling;return v}function r(g,v){return g=un(g,v),g.index=0,g.sibling=null,g}function s(g,v,$){return g.index=$,e?($=g.alternate,$!==null?($=$.index,$<v?(g.flags|=67108866,v):$):(g.flags|=67108866,v)):(g.flags|=1048576,v)}function i(g){return e&&g.alternate===null&&(g.flags|=67108866),g}function o(g,v,$,w){return v===null||v.tag!==6?(v=Fd($,g.mode,w),v.return=g,v):(v=r(v,$),v.return=g,v)}function u(g,v,$,w){var S=$.type;return S===ss?d(g,v,$.props.children,w,$.key):v!==null&&(v.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===Tn&&sg(S)===v.type)?(v=r(v,$.props),Li(v,$),v.return=g,v):(v=Ql($.type,$.key,$.props,null,g.mode,w),Li(v,$),v.return=g,v)}function c(g,v,$,w){return v===null||v.tag!==4||v.stateNode.containerInfo!==$.containerInfo||v.stateNode.implementation!==$.implementation?(v=zd($,g.mode,w),v.return=g,v):(v=r(v,$.children||[]),v.return=g,v)}function d(g,v,$,w,S){return v===null||v.tag!==7?(v=yr($,g.mode,w,S),v.return=g,v):(v=r(v,$),v.return=g,v)}function m(g,v,$){if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return v=Fd(""+v,g.mode,$),v.return=g,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case _l:return $=Ql(v.type,v.key,v.props,null,g.mode,$),Li($,v),$.return=g,$;case zi:return v=zd(v,g.mode,$),v.return=g,v;case Tn:var w=v._init;return v=w(v._payload),m(g,v,$)}if(Bi(v)||Di(v))return v=yr(v,g.mode,$,null),v.return=g,v;if(typeof v.then=="function")return m(g,Ol(v),$);if(v.$$typeof===nn)return m(g,Dl(g,v),$);Ll(g,v)}return null}function f(g,v,$,w){var S=v!==null?v.key:null;if(typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint")return S!==null?null:o(g,v,""+$,w);if(typeof $=="object"&&$!==null){switch($.$$typeof){case _l:return $.key===S?u(g,v,$,w):null;case zi:return $.key===S?c(g,v,$,w):null;case Tn:return S=$._init,$=S($._payload),f(g,v,$,w)}if(Bi($)||Di($))return S!==null?null:d(g,v,$,w,null);if(typeof $.then=="function")return f(g,v,Ol($),w);if($.$$typeof===nn)return f(g,v,Dl(g,$),w);Ll(g,$)}return null}function p(g,v,$,w,S){if(typeof w=="string"&&w!==""||typeof w=="number"||typeof w=="bigint")return g=g.get($)||null,o(v,g,""+w,S);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case _l:return g=g.get(w.key===null?$:w.key)||null,u(v,g,w,S);case zi:return g=g.get(w.key===null?$:w.key)||null,c(v,g,w,S);case Tn:var R=w._init;return w=R(w._payload),p(g,v,$,w,S)}if(Bi(w)||Di(w))return g=g.get($)||null,d(v,g,w,S,null);if(typeof w.then=="function")return p(g,v,$,Ol(w),S);if(w.$$typeof===nn)return p(g,v,$,Dl(v,w),S);Ll(v,w)}return null}function b(g,v,$,w){for(var S=null,R=null,C=v,E=v=0,O=null;C!==null&&E<$.length;E++){C.index>E?(O=C,C=null):O=C.sibling;var j=f(g,C,$[E],w);if(j===null){C===null&&(C=O);break}e&&C&&j.alternate===null&&t(g,C),v=s(j,v,E),R===null?S=j:R.sibling=j,R=j,C=O}if(E===$.length)return a(g,C),ve&&hr(g,E),S;if(C===null){for(;E<$.length;E++)C=m(g,$[E],w),C!==null&&(v=s(C,v,E),R===null?S=C:R.sibling=C,R=C);return ve&&hr(g,E),S}for(C=n(C);E<$.length;E++)O=p(C,g,E,$[E],w),O!==null&&(e&&O.alternate!==null&&C.delete(O.key===null?E:O.key),v=s(O,v,E),R===null?S=O:R.sibling=O,R=O);return e&&C.forEach(function(J){return t(g,J)}),ve&&hr(g,E),S}function y(g,v,$,w){if($==null)throw Error(L(151));for(var S=null,R=null,C=v,E=v=0,O=null,j=$.next();C!==null&&!j.done;E++,j=$.next()){C.index>E?(O=C,C=null):O=C.sibling;var J=f(g,C,j.value,w);if(J===null){C===null&&(C=O);break}e&&C&&J.alternate===null&&t(g,C),v=s(J,v,E),R===null?S=J:R.sibling=J,R=J,C=O}if(j.done)return a(g,C),ve&&hr(g,E),S;if(C===null){for(;!j.done;E++,j=$.next())j=m(g,j.value,w),j!==null&&(v=s(j,v,E),R===null?S=j:R.sibling=j,R=j);return ve&&hr(g,E),S}for(C=n(C);!j.done;E++,j=$.next())j=p(C,g,E,j.value,w),j!==null&&(e&&j.alternate!==null&&C.delete(j.key===null?E:j.key),v=s(j,v,E),R===null?S=j:R.sibling=j,R=j);return e&&C.forEach(function(D){return t(g,D)}),ve&&hr(g,E),S}function x(g,v,$,w){if(typeof $=="object"&&$!==null&&$.type===ss&&$.key===null&&($=$.props.children),typeof $=="object"&&$!==null){switch($.$$typeof){case _l:e:{for(var S=$.key;v!==null;){if(v.key===S){if(S=$.type,S===ss){if(v.tag===7){a(g,v.sibling),w=r(v,$.props.children),w.return=g,g=w;break e}}else if(v.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===Tn&&sg(S)===v.type){a(g,v.sibling),w=r(v,$.props),Li(w,$),w.return=g,g=w;break e}a(g,v);break}else t(g,v);v=v.sibling}$.type===ss?(w=yr($.props.children,g.mode,w,$.key),w.return=g,g=w):(w=Ql($.type,$.key,$.props,null,g.mode,w),Li(w,$),w.return=g,g=w)}return i(g);case zi:e:{for(S=$.key;v!==null;){if(v.key===S)if(v.tag===4&&v.stateNode.containerInfo===$.containerInfo&&v.stateNode.implementation===$.implementation){a(g,v.sibling),w=r(v,$.children||[]),w.return=g,g=w;break e}else{a(g,v);break}else t(g,v);v=v.sibling}w=zd($,g.mode,w),w.return=g,g=w}return i(g);case Tn:return S=$._init,$=S($._payload),x(g,v,$,w)}if(Bi($))return b(g,v,$,w);if(Di($)){if(S=Di($),typeof S!="function")throw Error(L(150));return $=S.call($),y(g,v,$,w)}if(typeof $.then=="function")return x(g,v,Ol($),w);if($.$$typeof===nn)return x(g,v,Dl(g,$),w);Ll(g,$)}return typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint"?($=""+$,v!==null&&v.tag===6?(a(g,v.sibling),w=r(v,$),w.return=g,g=w):(a(g,v),w=Fd($,g.mode,w),w.return=g,g=w),i(g)):a(g,v)}return function(g,v,$,w){try{co=0;var S=x(g,v,$,w);return Ss=null,S}catch(C){if(C===Co||C===ju)throw C;var R=Wt(29,C,null,g.mode);return R.lanes=w,R.return=g,R}finally{}}}var As=pb(!0),hb=pb(!1),ya=Ba(null),za=null;function Mn(e){var t=e.alternate;ze(st,st.current&1),ze(ya,e),za===null&&(t===null||Es.current!==null||t.memoizedState!==null)&&(za=e)}function vb(e){if(e.tag===22){if(ze(st,st.current),ze(ya,e),za===null){var t=e.alternate;t!==null&&t.memoizedState!==null&&(za=e)}}else On(e)}function On(){ze(st,st.current),ze(ya,ya.current)}function ln(e){pt(ya),za===e&&(za=null),pt(st)}var st=Ba(0);function hu(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||Ym(a)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}function Id(e,t,a,n){t=e.memoizedState,a=a(n,t),a=a==null?t:Le({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var Mm={enqueueSetState:function(e,t,a){e=e._reactInternals;var n=aa(),r=Bn(n);r.payload=t,a!=null&&(r.callback=a),t=qn(e,r,n),t!==null&&(na(t,e,n),Yi(t,e,n))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var n=aa(),r=Bn(n);r.tag=1,r.payload=t,a!=null&&(r.callback=a),t=qn(e,r,n),t!==null&&(na(t,e,n),Yi(t,e,n))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=aa(),n=Bn(a);n.tag=2,t!=null&&(n.callback=t),t=qn(e,n,a),t!==null&&(na(t,e,a),Yi(t,e,a))}};function ig(e,t,a,n,r,s,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,s,i):t.prototype&&t.prototype.isPureReactComponent?!oo(a,n)||!oo(r,s):!0}function og(e,t,a,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,n),t.state!==e&&Mm.enqueueReplaceState(t,t.state,null)}function kr(e,t){var a=t;if("ref"in t){a={};for(var n in t)n!=="ref"&&(a[n]=t[n])}if(e=e.defaultProps){a===t&&(a=Le({},a));for(var r in e)a[r]===void 0&&(a[r]=e[r])}return a}var vu=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function gb(e){vu(e)}function yb(e){console.error(e)}function bb(e){vu(e)}function gu(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(n){setTimeout(function(){throw n})}}function lg(e,t,a){try{var n=e.onCaughtError;n(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(r){setTimeout(function(){throw r})}}function Om(e,t,a){return a=Bn(a),a.tag=3,a.payload={element:null},a.callback=function(){gu(e,t)},a}function xb(e){return e=Bn(e),e.tag=3,e}function $b(e,t,a,n){var r=a.type.getDerivedStateFromError;if(typeof r=="function"){var s=n.value;e.payload=function(){return r(s)},e.callback=function(){lg(t,a,n)}}var i=a.stateNode;i!==null&&typeof i.componentDidCatch=="function"&&(e.callback=function(){lg(t,a,n),typeof r!="function"&&(In===null?In=new Set([this]):In.add(this));var o=n.stack;this.componentDidCatch(n.value,{componentStack:o!==null?o:""})})}function MC(e,t,a,n,r){if(a.flags|=32768,n!==null&&typeof n=="object"&&typeof n.then=="function"){if(t=a.alternate,t!==null&&Ro(t,a,r,!0),a=ya.current,a!==null){switch(a.tag){case 13:return za===null?qm():a.alternate===null&&Ke===0&&(Ke=3),a.flags&=-257,a.flags|=65536,a.lanes=r,n===Rm?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([n]):t.add(n),em(e,n,r)),!1;case 22:return a.flags|=65536,n===Rm?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([n])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([n]):a.add(n)),em(e,n,r)),!1}throw Error(L(435,a.tag))}return em(e,n,r),qm(),!1}if(ve)return t=ya.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=r,n!==$m&&(e=Error(L(422),{cause:n}),lo(va(e,a)))):(n!==$m&&(t=Error(L(423),{cause:n}),lo(va(t,a))),e=e.current.alternate,e.flags|=65536,r&=-r,e.lanes|=r,n=va(n,a),r=Om(e.stateNode,n,r),Bd(e,r),Ke!==4&&(Ke=2)),!1;var s=Error(L(520),{cause:n});if(s=va(s,a),to===null?to=[s]:to.push(s),Ke!==4&&(Ke=2),t===null)return!0;n=va(n,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=r&-r,a.lanes|=e,e=Om(a.stateNode,n,e),Bd(a,e),!1;case 1:if(t=a.type,s=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(In===null||!In.has(s))))return a.flags|=65536,r&=-r,a.lanes|=r,r=xb(r),$b(r,e,a,n),Bd(a,r),!1}a=a.return}while(a!==null);return!1}var wb=Error(L(461)),ft=!1;function gt(e,t,a,n){t.child=e===null?hb(t,null,a,n):As(t,e.child,a,n)}function ug(e,t,a,n,r){a=a.render;var s=t.ref;if("ref"in n){var i={};for(var o in n)o!=="ref"&&(i[o]=n[o])}else i=n;return _r(t),n=Sf(e,t,a,i,s,r),o=Nf(),e!==null&&!ft?(_f(e,t,r),fn(e,t,r)):(ve&&o&&vf(t),t.flags|=1,gt(e,t,n,r),t.child)}function cg(e,t,a,n,r){if(e===null){var s=a.type;return typeof s=="function"&&!hf(s)&&s.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=s,Sb(e,t,s,n,r)):(e=Ql(a.type,null,n,t,t.mode,r),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!Of(e,r)){var i=s.memoizedProps;if(a=a.compare,a=a!==null?a:oo,a(i,n)&&e.ref===t.ref)return fn(e,t,r)}return t.flags|=1,e=un(s,n),e.ref=t.ref,e.return=t,t.child=e}function Sb(e,t,a,n,r){if(e!==null){var s=e.memoizedProps;if(oo(s,n)&&e.ref===t.ref)if(ft=!1,t.pendingProps=n=s,Of(e,r))(e.flags&131072)!==0&&(ft=!0);else return t.lanes=e.lanes,fn(e,t,r)}return Lm(e,t,a,n,r)}function Nb(e,t,a){var n=t.pendingProps,r=n.children,s=e!==null?e.memoizedState:null;if(n.mode==="hidden"){if((t.flags&128)!==0){if(n=s!==null?s.baseLanes|a:a,e!==null){for(r=t.child=e.child,s=0;r!==null;)s=s|r.lanes|r.childLanes,r=r.sibling;t.childLanes=s&~n}else t.childLanes=0,t.child=null;return dg(e,t,n,a)}if((a&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Vl(t,s!==null?s.cachePool:null),s!==null?Zv(t,s):Em(),vb(t);else return t.lanes=t.childLanes=536870912,dg(e,t,s!==null?s.baseLanes|a:a,a)}else s!==null?(Vl(t,s.cachePool),Zv(t,s),On(t),t.memoizedState=null):(e!==null&&Vl(t,null),Em(),On(t));return gt(e,t,r,a),t.child}function dg(e,t,a,n){var r=bf();return r=r===null?null:{parent:rt._currentValue,pool:r},t.memoizedState={baseLanes:a,cachePool:r},e!==null&&Vl(t,null),Em(),vb(t),e!==null&&Ro(e,t,n,!0),null}function Jl(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(L(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function Lm(e,t,a,n,r){return _r(t),a=Sf(e,t,a,n,void 0,r),n=Nf(),e!==null&&!ft?(_f(e,t,r),fn(e,t,r)):(ve&&n&&vf(t),t.flags|=1,gt(e,t,a,r),t.child)}function mg(e,t,a,n,r,s){return _r(t),t.updateQueue=null,a=jy(t,n,a,r),Py(e),n=Nf(),e!==null&&!ft?(_f(e,t,s),fn(e,t,s)):(ve&&n&&vf(t),t.flags|=1,gt(e,t,a,s),t.child)}function fg(e,t,a,n,r){if(_r(t),t.stateNode===null){var s=fs,i=a.contextType;typeof i=="object"&&i!==null&&(s=Nt(i)),s=new a(n,s),t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=Mm,t.stateNode=s,s._reactInternals=t,s=t.stateNode,s.props=n,s.state=t.memoizedState,s.refs={},xf(t),i=a.contextType,s.context=typeof i=="object"&&i!==null?Nt(i):fs,s.state=t.memoizedState,i=a.getDerivedStateFromProps,typeof i=="function"&&(Id(t,a,i,n),s.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(i=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),i!==s.state&&Mm.enqueueReplaceState(s,s.state,null),Xi(t,n,s,r),Ji(),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308),n=!0}else if(e===null){s=t.stateNode;var o=t.memoizedProps,u=kr(a,o);s.props=u;var c=s.context,d=a.contextType;i=fs,typeof d=="object"&&d!==null&&(i=Nt(d));var m=a.getDerivedStateFromProps;d=typeof m=="function"||typeof s.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,d||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o||c!==i)&&og(t,s,n,i),An=!1;var f=t.memoizedState;s.state=f,Xi(t,n,s,r),Ji(),c=t.memoizedState,o||f!==c||An?(typeof m=="function"&&(Id(t,a,m,n),c=t.memoizedState),(u=An||ig(t,a,u,n,f,c,i))?(d||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=c),s.props=n,s.state=c,s.context=i,n=u):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),n=!1)}else{s=t.stateNode,km(e,t),i=t.memoizedProps,d=kr(a,i),s.props=d,m=t.pendingProps,f=s.context,c=a.contextType,u=fs,typeof c=="object"&&c!==null&&(u=Nt(c)),o=a.getDerivedStateFromProps,(c=typeof o=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(i!==m||f!==u)&&og(t,s,n,u),An=!1,f=t.memoizedState,s.state=f,Xi(t,n,s,r),Ji();var p=t.memoizedState;i!==m||f!==p||An||e!==null&&e.dependencies!==null&&cu(e.dependencies)?(typeof o=="function"&&(Id(t,a,o,n),p=t.memoizedState),(d=An||ig(t,a,d,n,f,p,u)||e!==null&&e.dependencies!==null&&cu(e.dependencies))?(c||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(n,p,u),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(n,p,u)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||i===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=p),s.props=n,s.state=p,s.context=u,n=d):(typeof s.componentDidUpdate!="function"||i===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),n=!1)}return s=n,Jl(e,t),n=(t.flags&128)!==0,s||n?(s=t.stateNode,a=n&&typeof a.getDerivedStateFromError!="function"?null:s.render(),t.flags|=1,e!==null&&n?(t.child=As(t,e.child,null,r),t.child=As(t,null,a,r)):gt(e,t,a,r),t.memoizedState=s.state,e=t.child):e=fn(e,t,r),e}function pg(e,t,a,n){return _o(),t.flags|=256,gt(e,t,a,n),t.child}var Hd={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Kd(e){return{baseLanes:e,cachePool:Ay()}}function Qd(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=ga),e}function _b(e,t,a){var n=t.pendingProps,r=!1,s=(t.flags&128)!==0,i;if((i=s)||(i=e!==null&&e.memoizedState===null?!1:(st.current&2)!==0),i&&(r=!0,t.flags&=-129),i=(t.flags&32)!==0,t.flags&=-33,e===null){if(ve){if(r?Mn(t):On(t),ve){var o=He,u;if(u=o){e:{for(u=o,o=Pa;u.nodeType!==8;){if(!o){o=null;break e}if(u=Na(u.nextSibling),u===null){o=null;break e}}o=u}o!==null?(t.memoizedState={dehydrated:o,treeContext:br!==null?{id:rn,overflow:sn}:null,retryLane:536870912,hydrationErrors:null},u=Wt(18,null,null,0),u.stateNode=o,u.return=t,t.child=u,Tt=t,He=null,u=!0):u=!1}u||Nr(t)}if(o=t.memoizedState,o!==null&&(o=o.dehydrated,o!==null))return Ym(o)?t.lanes=32:t.lanes=536870912,null;ln(t)}return o=n.children,n=n.fallback,r?(On(t),r=t.mode,o=yu({mode:"hidden",children:o},r),n=yr(n,r,a,null),o.return=t,n.return=t,o.sibling=n,t.child=o,r=t.child,r.memoizedState=Kd(a),r.childLanes=Qd(e,i,a),t.memoizedState=Hd,n):(Mn(t),Pm(t,o))}if(u=e.memoizedState,u!==null&&(o=u.dehydrated,o!==null)){if(s)t.flags&256?(Mn(t),t.flags&=-257,t=Vd(e,t,a)):t.memoizedState!==null?(On(t),t.child=e.child,t.flags|=128,t=null):(On(t),r=n.fallback,o=t.mode,n=yu({mode:"visible",children:n.children},o),r=yr(r,o,a,null),r.flags|=2,n.return=t,r.return=t,n.sibling=r,t.child=n,As(t,e.child,null,a),n=t.child,n.memoizedState=Kd(a),n.childLanes=Qd(e,i,a),t.memoizedState=Hd,t=r);else if(Mn(t),Ym(o)){if(i=o.nextSibling&&o.nextSibling.dataset,i)var c=i.dgst;i=c,n=Error(L(419)),n.stack="",n.digest=i,lo({value:n,source:null,stack:null}),t=Vd(e,t,a)}else if(ft||Ro(e,t,a,!1),i=(a&e.childLanes)!==0,ft||i){if(i=Ae,i!==null&&(n=a&-a,n=(n&42)!==0?1:nf(n),n=(n&(i.suspendedLanes|a))!==0?0:n,n!==0&&n!==u.retryLane))throw u.retryLane=n,Us(e,n),na(i,e,n),wb;o.data==="$?"||qm(),t=Vd(e,t,a)}else o.data==="$?"?(t.flags|=192,t.child=e.child,t=null):(e=u.treeContext,He=Na(o.nextSibling),Tt=t,ve=!0,xr=null,Pa=!1,e!==null&&(fa[pa++]=rn,fa[pa++]=sn,fa[pa++]=br,rn=e.id,sn=e.overflow,br=t),t=Pm(t,n.children),t.flags|=4096);return t}return r?(On(t),r=n.fallback,o=t.mode,u=e.child,c=u.sibling,n=un(u,{mode:"hidden",children:n.children}),n.subtreeFlags=u.subtreeFlags&65011712,c!==null?r=un(c,r):(r=yr(r,o,a,null),r.flags|=2),r.return=t,n.return=t,n.sibling=r,t.child=n,n=r,r=t.child,o=e.child.memoizedState,o===null?o=Kd(a):(u=o.cachePool,u!==null?(c=rt._currentValue,u=u.parent!==c?{parent:c,pool:c}:u):u=Ay(),o={baseLanes:o.baseLanes|a,cachePool:u}),r.memoizedState=o,r.childLanes=Qd(e,i,a),t.memoizedState=Hd,n):(Mn(t),a=e.child,e=a.sibling,a=un(a,{mode:"visible",children:n.children}),a.return=t,a.sibling=null,e!==null&&(i=t.deletions,i===null?(t.deletions=[e],t.flags|=16):i.push(e)),t.child=a,t.memoizedState=null,a)}function Pm(e,t){return t=yu({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function yu(e,t){return e=Wt(22,e,null,t),e.lanes=0,e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null},e}function Vd(e,t,a){return As(t,e.child,null,a),e=Pm(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function hg(e,t,a){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),Sm(e.return,t,a)}function Gd(e,t,a,n,r){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:a,tailMode:r}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=n,s.tail=a,s.tailMode=r)}function Rb(e,t,a){var n=t.pendingProps,r=n.revealOrder,s=n.tail;if(gt(e,t,n.children,a),n=st.current,(n&2)!==0)n=n&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&hg(e,a,t);else if(e.tag===19)hg(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}n&=1}switch(ze(st,n),r){case"forwards":for(a=t.child,r=null;a!==null;)e=a.alternate,e!==null&&hu(e)===null&&(r=a),a=a.sibling;a=r,a===null?(r=t.child,t.child=null):(r=a.sibling,a.sibling=null),Gd(t,!1,r,a,s);break;case"backwards":for(a=null,r=t.child,t.child=null;r!==null;){if(e=r.alternate,e!==null&&hu(e)===null){t.child=r;break}e=r.sibling,r.sibling=a,a=r,r=e}Gd(t,!0,a,null,s);break;case"together":Gd(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function fn(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),Jn|=t.lanes,(a&t.childLanes)===0)if(e!==null){if(Ro(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(L(153));if(t.child!==null){for(e=t.child,a=un(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=un(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function Of(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&cu(e)))}function OC(e,t,a){switch(t.tag){case 3:au(t,t.stateNode.containerInfo),Dn(t,rt,e.memoizedState.cache),_o();break;case 27:case 5:dm(t);break;case 4:au(t,t.stateNode.containerInfo);break;case 10:Dn(t,t.type,t.memoizedProps.value);break;case 13:var n=t.memoizedState;if(n!==null)return n.dehydrated!==null?(Mn(t),t.flags|=128,null):(a&t.child.childLanes)!==0?_b(e,t,a):(Mn(t),e=fn(e,t,a),e!==null?e.sibling:null);Mn(t);break;case 19:var r=(e.flags&128)!==0;if(n=(a&t.childLanes)!==0,n||(Ro(e,t,a,!1),n=(a&t.childLanes)!==0),r){if(n)return Rb(e,t,a);t.flags|=128}if(r=t.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),ze(st,st.current),n)break;return null;case 22:case 23:return t.lanes=0,Nb(e,t,a);case 24:Dn(t,rt,e.memoizedState.cache)}return fn(e,t,a)}function kb(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)ft=!0;else{if(!Of(e,a)&&(t.flags&128)===0)return ft=!1,OC(e,t,a);ft=(e.flags&131072)!==0}else ft=!1,ve&&(t.flags&1048576)!==0&&Ey(t,uu,t.index);switch(t.lanes=0,t.tag){case 16:e:{e=t.pendingProps;var n=t.elementType,r=n._init;if(n=r(n._payload),t.type=n,typeof n=="function")hf(n)?(e=kr(n,e),t.tag=1,t=fg(null,t,n,e,a)):(t.tag=0,t=Lm(null,t,n,e,a));else{if(n!=null){if(r=n.$$typeof,r===ef){t.tag=11,t=ug(null,t,n,e,a);break e}else if(r===tf){t.tag=14,t=cg(null,t,n,e,a);break e}}throw t=um(n)||n,Error(L(306,t,""))}}return t;case 0:return Lm(e,t,t.type,t.pendingProps,a);case 1:return n=t.type,r=kr(n,t.pendingProps),fg(e,t,n,r,a);case 3:e:{if(au(t,t.stateNode.containerInfo),e===null)throw Error(L(387));n=t.pendingProps;var s=t.memoizedState;r=s.element,km(e,t),Xi(t,n,null,a);var i=t.memoizedState;if(n=i.cache,Dn(t,rt,n),n!==s.cache&&Nm(t,[rt],a,!0),Ji(),n=i.element,s.isDehydrated)if(s={element:n,isDehydrated:!1,cache:i.cache},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){t=pg(e,t,n,a);break e}else if(n!==r){r=va(Error(L(424)),t),lo(r),t=pg(e,t,n,a);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(He=Na(e.firstChild),Tt=t,ve=!0,xr=null,Pa=!0,a=hb(t,null,n,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(_o(),n===r){t=fn(e,t,a);break e}gt(e,t,n,a)}t=t.child}return t;case 26:return Jl(e,t),e===null?(a=Og(t.type,null,t.pendingProps,null))?t.memoizedState=a:ve||(a=t.type,e=t.pendingProps,n=_u(zn.current).createElement(a),n[St]=t,n[Kt]=e,bt(n,a,e),mt(n),t.stateNode=n):t.memoizedState=Og(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return dm(t),e===null&&ve&&(n=t.stateNode=f0(t.type,t.pendingProps,zn.current),Tt=t,Pa=!0,r=He,Zn(t.type)?(Jm=r,He=Na(n.firstChild)):He=r),gt(e,t,t.pendingProps.children,a),Jl(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&ve&&((r=n=He)&&(n=iE(n,t.type,t.pendingProps,Pa),n!==null?(t.stateNode=n,Tt=t,He=Na(n.firstChild),Pa=!1,r=!0):r=!1),r||Nr(t)),dm(t),r=t.type,s=t.pendingProps,i=e!==null?e.memoizedProps:null,n=s.children,Vm(r,s)?n=null:i!==null&&Vm(r,i)&&(t.flags|=32),t.memoizedState!==null&&(r=Sf(e,t,RC,null,null,a),ho._currentValue=r),Jl(e,t),gt(e,t,n,a),t.child;case 6:return e===null&&ve&&((e=a=He)&&(a=oE(a,t.pendingProps,Pa),a!==null?(t.stateNode=a,Tt=t,He=null,e=!0):e=!1),e||Nr(t)),null;case 13:return _b(e,t,a);case 4:return au(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=As(t,null,n,a):gt(e,t,n,a),t.child;case 11:return ug(e,t,t.type,t.pendingProps,a);case 7:return gt(e,t,t.pendingProps,a),t.child;case 8:return gt(e,t,t.pendingProps.children,a),t.child;case 12:return gt(e,t,t.pendingProps.children,a),t.child;case 10:return n=t.pendingProps,Dn(t,t.type,n.value),gt(e,t,n.children,a),t.child;case 9:return r=t.type._context,n=t.pendingProps.children,_r(t),r=Nt(r),n=n(r),t.flags|=1,gt(e,t,n,a),t.child;case 14:return cg(e,t,t.type,t.pendingProps,a);case 15:return Sb(e,t,t.type,t.pendingProps,a);case 19:return Rb(e,t,a);case 31:return n=t.pendingProps,a=t.mode,n={mode:n.mode,children:n.children},e===null?(a=yu(n,a),a.ref=t.ref,t.child=a,a.return=t,t=a):(a=un(e.child,n),a.ref=t.ref,t.child=a,a.return=t,t=a),t;case 22:return Nb(e,t,a);case 24:return _r(t),n=Nt(rt),e===null?(r=bf(),r===null&&(r=Ae,s=yf(),r.pooledCache=s,s.refCount++,s!==null&&(r.pooledCacheLanes|=a),r=s),t.memoizedState={parent:n,cache:r},xf(t),Dn(t,rt,r)):((e.lanes&a)!==0&&(km(e,t),Xi(t,null,null,a),Ji()),r=e.memoizedState,s=t.memoizedState,r.parent!==n?(r={parent:n,cache:n},t.memoizedState=r,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=r),Dn(t,rt,n)):(n=s.cache,Dn(t,rt,n),n!==r.cache&&Nm(t,[rt],a,!0))),gt(e,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(L(156,t.tag))}function en(e){e.flags|=4}function vg(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!v0(t)){if(t=ya.current,t!==null&&((de&4194048)===de?za!==null:(de&62914560)!==de&&(de&536870912)===0||t!==za))throw Gi=Rm,Dy;e.flags|=8192}}function Pl(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Wg():536870912,e.lanes|=t,Ds|=t)}function Pi(e,t){if(!ve)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var n=null;a!==null;)a.alternate!==null&&(n=a),a=a.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function qe(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,n=0;if(t)for(var r=e.child;r!==null;)a|=r.lanes|r.childLanes,n|=r.subtreeFlags&65011712,n|=r.flags&65011712,r.return=e,r=r.sibling;else for(r=e.child;r!==null;)a|=r.lanes|r.childLanes,n|=r.subtreeFlags,n|=r.flags,r.return=e,r=r.sibling;return e.subtreeFlags|=n,e.childLanes=a,t}function LC(e,t,a){var n=t.pendingProps;switch(gf(t),t.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return qe(t),null;case 1:return qe(t),null;case 3:return a=t.stateNode,n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),cn(rt),_s(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Oi(t)?en(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Qv())),qe(t),null;case 26:return a=t.memoizedState,e===null?(en(t),a!==null?(qe(t),vg(t,a)):(qe(t),t.flags&=-16777217)):a?a!==e.memoizedState?(en(t),qe(t),vg(t,a)):(qe(t),t.flags&=-16777217):(e.memoizedProps!==n&&en(t),qe(t),t.flags&=-16777217),null;case 27:nu(t),a=zn.current;var r=t.type;if(e!==null&&t.stateNode!=null)e.memoizedProps!==n&&en(t);else{if(!n){if(t.stateNode===null)throw Error(L(166));return qe(t),null}e=Ua.current,Oi(t)?Hv(t,e):(e=f0(r,n,a),t.stateNode=e,en(t))}return qe(t),null;case 5:if(nu(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==n&&en(t);else{if(!n){if(t.stateNode===null)throw Error(L(166));return qe(t),null}if(e=Ua.current,Oi(t))Hv(t,e);else{switch(r=_u(zn.current),e){case 1:e=r.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:e=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":e=r.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":e=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":e=r.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild);break;case"select":e=typeof n.is=="string"?r.createElement("select",{is:n.is}):r.createElement("select"),n.multiple?e.multiple=!0:n.size&&(e.size=n.size);break;default:e=typeof n.is=="string"?r.createElement(a,{is:n.is}):r.createElement(a)}}e[St]=t,e[Kt]=n;e:for(r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break e;for(;r.sibling===null;){if(r.return===null||r.return===t)break e;r=r.return}r.sibling.return=r.return,r=r.sibling}t.stateNode=e;e:switch(bt(e,a,n),a){case"button":case"input":case"select":case"textarea":e=!!n.autoFocus;break e;case"img":e=!0;break e;default:e=!1}e&&en(t)}}return qe(t),t.flags&=-16777217,null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==n&&en(t);else{if(typeof n!="string"&&t.stateNode===null)throw Error(L(166));if(e=zn.current,Oi(t)){if(e=t.stateNode,a=t.memoizedProps,n=null,r=Tt,r!==null)switch(r.tag){case 27:case 5:n=r.memoizedProps}e[St]=t,e=!!(e.nodeValue===a||n!==null&&n.suppressHydrationWarning===!0||c0(e.nodeValue,a)),e||Nr(t)}else e=_u(e).createTextNode(n),e[St]=t,t.stateNode=e}return qe(t),null;case 13:if(n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(r=Oi(t),n!==null&&n.dehydrated!==null){if(e===null){if(!r)throw Error(L(318));if(r=t.memoizedState,r=r!==null?r.dehydrated:null,!r)throw Error(L(317));r[St]=t}else _o(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;qe(t),r=!1}else r=Qv(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=r),r=!0;if(!r)return t.flags&256?(ln(t),t):(ln(t),null)}if(ln(t),(t.flags&128)!==0)return t.lanes=a,t;if(a=n!==null,e=e!==null&&e.memoizedState!==null,a){n=t.child,r=null,n.alternate!==null&&n.alternate.memoizedState!==null&&n.alternate.memoizedState.cachePool!==null&&(r=n.alternate.memoizedState.cachePool.pool);var s=null;n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(s=n.memoizedState.cachePool.pool),s!==r&&(n.flags|=2048)}return a!==e&&a&&(t.child.flags|=8192),Pl(t,t.updateQueue),qe(t),null;case 4:return _s(),e===null&&qf(t.stateNode.containerInfo),qe(t),null;case 10:return cn(t.type),qe(t),null;case 19:if(pt(st),r=t.memoizedState,r===null)return qe(t),null;if(n=(t.flags&128)!==0,s=r.rendering,s===null)if(n)Pi(r,!1);else{if(Ke!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(s=hu(e),s!==null){for(t.flags|=128,Pi(r,!1),e=s.updateQueue,t.updateQueue=e,Pl(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)Cy(a,e),a=a.sibling;return ze(st,st.current&1|2),t.child}e=e.sibling}r.tail!==null&&Fa()>xu&&(t.flags|=128,n=!0,Pi(r,!1),t.lanes=4194304)}else{if(!n)if(e=hu(s),e!==null){if(t.flags|=128,n=!0,e=e.updateQueue,t.updateQueue=e,Pl(t,e),Pi(r,!0),r.tail===null&&r.tailMode==="hidden"&&!s.alternate&&!ve)return qe(t),null}else 2*Fa()-r.renderingStartTime>xu&&a!==536870912&&(t.flags|=128,n=!0,Pi(r,!1),t.lanes=4194304);r.isBackwards?(s.sibling=t.child,t.child=s):(e=r.last,e!==null?e.sibling=s:t.child=s,r.last=s)}return r.tail!==null?(t=r.tail,r.rendering=t,r.tail=t.sibling,r.renderingStartTime=Fa(),t.sibling=null,e=st.current,ze(st,n?e&1|2:e&1),t):(qe(t),null);case 22:case 23:return ln(t),$f(),n=t.memoizedState!==null,e!==null?e.memoizedState!==null!==n&&(t.flags|=8192):n&&(t.flags|=8192),n?(a&536870912)!==0&&(t.flags&128)===0&&(qe(t),t.subtreeFlags&6&&(t.flags|=8192)):qe(t),a=t.updateQueue,a!==null&&Pl(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),n=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),n!==a&&(t.flags|=2048),e!==null&&pt($r),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),cn(rt),qe(t),null;case 25:return null;case 30:return null}throw Error(L(156,t.tag))}function PC(e,t){switch(gf(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return cn(rt),_s(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return nu(t),null;case 13:if(ln(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(L(340));_o()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return pt(st),null;case 4:return _s(),null;case 10:return cn(t.type),null;case 22:case 23:return ln(t),$f(),e!==null&&pt($r),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return cn(rt),null;case 25:return null;default:return null}}function Cb(e,t){switch(gf(t),t.tag){case 3:cn(rt),_s();break;case 26:case 27:case 5:nu(t);break;case 4:_s();break;case 13:ln(t);break;case 19:pt(st);break;case 10:cn(t.type);break;case 22:case 23:ln(t),$f(),e!==null&&pt($r);break;case 24:cn(rt)}}function Ao(e,t){try{var a=t.updateQueue,n=a!==null?a.lastEffect:null;if(n!==null){var r=n.next;a=r;do{if((a.tag&e)===e){n=void 0;var s=a.create,i=a.inst;n=s(),i.destroy=n}a=a.next}while(a!==r)}}catch(o){Ce(t,t.return,o)}}function Yn(e,t,a){try{var n=t.updateQueue,r=n!==null?n.lastEffect:null;if(r!==null){var s=r.next;n=s;do{if((n.tag&e)===e){var i=n.inst,o=i.destroy;if(o!==void 0){i.destroy=void 0,r=t;var u=a,c=o;try{c()}catch(d){Ce(r,u,d)}}}n=n.next}while(n!==s)}}catch(d){Ce(t,t.return,d)}}function Eb(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{Ly(t,a)}catch(n){Ce(e,e.return,n)}}}function Tb(e,t,a){a.props=kr(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(n){Ce(e,t,n)}}function Wi(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var n=e.stateNode;break;case 30:n=e.stateNode;break;default:n=e.stateNode}typeof a=="function"?e.refCleanup=a(n):a.current=n}}catch(r){Ce(e,t,r)}}function ja(e,t){var a=e.ref,n=e.refCleanup;if(a!==null)if(typeof n=="function")try{n()}catch(r){Ce(e,t,r)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(r){Ce(e,t,r)}else a.current=null}function Ab(e){var t=e.type,a=e.memoizedProps,n=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break e;case"img":a.src?n.src=a.src:a.srcSet&&(n.srcset=a.srcSet)}}catch(r){Ce(e,e.return,r)}}function Yd(e,t,a){try{var n=e.stateNode;tE(n,e.type,a,t),n[Kt]=t}catch(r){Ce(e,e.return,r)}}function Db(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zn(e.type)||e.tag===4}function Jd(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Db(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zn(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function jm(e,t,a){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(e),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=Hu));else if(n!==4&&(n===27&&Zn(e.type)&&(a=e.stateNode,t=null),e=e.child,e!==null))for(jm(e,t,a),e=e.sibling;e!==null;)jm(e,t,a),e=e.sibling}function bu(e,t,a){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(n!==4&&(n===27&&Zn(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(bu(e,t,a),e=e.sibling;e!==null;)bu(e,t,a),e=e.sibling}function Mb(e){var t=e.stateNode,a=e.memoizedProps;try{for(var n=e.type,r=t.attributes;r.length;)t.removeAttributeNode(r[0]);bt(t,n,a),t[St]=e,t[Kt]=a}catch(s){Ce(e,e.return,s)}}var an=!1,Je=!1,Xd=!1,gg=typeof WeakSet=="function"?WeakSet:Set,dt=null;function jC(e,t){if(e=e.containerInfo,Km=Eu,e=xy(e),mf(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var n=a.getSelection&&a.getSelection();if(n&&n.rangeCount!==0){a=n.anchorNode;var r=n.anchorOffset,s=n.focusNode;n=n.focusOffset;try{a.nodeType,s.nodeType}catch{a=null;break e}var i=0,o=-1,u=-1,c=0,d=0,m=e,f=null;t:for(;;){for(var p;m!==a||r!==0&&m.nodeType!==3||(o=i+r),m!==s||n!==0&&m.nodeType!==3||(u=i+n),m.nodeType===3&&(i+=m.nodeValue.length),(p=m.firstChild)!==null;)f=m,m=p;for(;;){if(m===e)break t;if(f===a&&++c===r&&(o=i),f===s&&++d===n&&(u=i),(p=m.nextSibling)!==null)break;m=f,f=m.parentNode}m=p}a=o===-1||u===-1?null:{start:o,end:u}}else a=null}a=a||{start:0,end:0}}else a=null;for(Qm={focusedElem:e,selectionRange:a},Eu=!1,dt=t;dt!==null;)if(t=dt,e=t.child,(t.subtreeFlags&1024)!==0&&e!==null)e.return=t,dt=e;else for(;dt!==null;){switch(t=dt,s=t.alternate,e=t.flags,t.tag){case 0:break;case 11:case 15:break;case 1:if((e&1024)!==0&&s!==null){e=void 0,a=t,r=s.memoizedProps,s=s.memoizedState,n=a.stateNode;try{var b=kr(a.type,r,a.elementType===a.type);e=n.getSnapshotBeforeUpdate(b,s),n.__reactInternalSnapshotBeforeUpdate=e}catch(y){Ce(a,a.return,y)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,a=e.nodeType,a===9)Gm(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Gm(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(L(163))}if(e=t.sibling,e!==null){e.return=t.return,dt=e;break}dt=t.return}}function Ob(e,t,a){var n=a.flags;switch(a.tag){case 0:case 11:case 15:Cn(e,a),n&4&&Ao(5,a);break;case 1:if(Cn(e,a),n&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(i){Ce(a,a.return,i)}else{var r=kr(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(r,t,e.__reactInternalSnapshotBeforeUpdate)}catch(i){Ce(a,a.return,i)}}n&64&&Eb(a),n&512&&Wi(a,a.return);break;case 3:if(Cn(e,a),n&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{Ly(e,t)}catch(i){Ce(a,a.return,i)}}break;case 27:t===null&&n&4&&Mb(a);case 26:case 5:Cn(e,a),t===null&&n&4&&Ab(a),n&512&&Wi(a,a.return);break;case 12:Cn(e,a);break;case 13:Cn(e,a),n&4&&jb(e,a),n&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=QC.bind(null,a),lE(e,a))));break;case 22:if(n=a.memoizedState!==null||an,!n){t=t!==null&&t.memoizedState!==null||Je,r=an;var s=Je;an=n,(Je=t)&&!s?En(e,a,(a.subtreeFlags&8772)!==0):Cn(e,a),an=r,Je=s}break;case 30:break;default:Cn(e,a)}}function Lb(e){var t=e.alternate;t!==null&&(e.alternate=null,Lb(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&sf(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Fe=null,It=!1;function tn(e,t,a){for(a=a.child;a!==null;)Pb(e,t,a),a=a.sibling}function Pb(e,t,a){if(ea&&typeof ea.onCommitFiberUnmount=="function")try{ea.onCommitFiberUnmount(xo,a)}catch{}switch(a.tag){case 26:Je||ja(a,t),tn(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Je||ja(a,t);var n=Fe,r=It;Zn(a.type)&&(Fe=a.stateNode,It=!1),tn(e,t,a),no(a.stateNode),Fe=n,It=r;break;case 5:Je||ja(a,t);case 6:if(n=Fe,r=It,Fe=null,tn(e,t,a),Fe=n,It=r,Fe!==null)if(It)try{(Fe.nodeType===9?Fe.body:Fe.nodeName==="HTML"?Fe.ownerDocument.body:Fe).removeChild(a.stateNode)}catch(s){Ce(a,t,s)}else try{Fe.removeChild(a.stateNode)}catch(s){Ce(a,t,s)}break;case 18:Fe!==null&&(It?(e=Fe,Ag(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),yo(e)):Ag(Fe,a.stateNode));break;case 4:n=Fe,r=It,Fe=a.stateNode.containerInfo,It=!0,tn(e,t,a),Fe=n,It=r;break;case 0:case 11:case 14:case 15:Je||Yn(2,a,t),Je||Yn(4,a,t),tn(e,t,a);break;case 1:Je||(ja(a,t),n=a.stateNode,typeof n.componentWillUnmount=="function"&&Tb(a,t,n)),tn(e,t,a);break;case 21:tn(e,t,a);break;case 22:Je=(n=Je)||a.memoizedState!==null,tn(e,t,a),Je=n;break;default:tn(e,t,a)}}function jb(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{yo(e)}catch(a){Ce(t,t.return,a)}}function UC(e){switch(e.tag){case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new gg),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new gg),t;default:throw Error(L(435,e.tag))}}function Zd(e,t){var a=UC(e);t.forEach(function(n){var r=VC.bind(null,e,n);a.has(n)||(a.add(n),n.then(r,r))})}function Jt(e,t){var a=t.deletions;if(a!==null)for(var n=0;n<a.length;n++){var r=a[n],s=e,i=t,o=i;e:for(;o!==null;){switch(o.tag){case 27:if(Zn(o.type)){Fe=o.stateNode,It=!1;break e}break;case 5:Fe=o.stateNode,It=!1;break e;case 3:case 4:Fe=o.stateNode.containerInfo,It=!0;break e}o=o.return}if(Fe===null)throw Error(L(160));Pb(s,i,r),Fe=null,It=!1,s=r.alternate,s!==null&&(s.return=null),r.return=null}if(t.subtreeFlags&13878)for(t=t.child;t!==null;)Ub(t,e),t=t.sibling}var Sa=null;function Ub(e,t){var a=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Jt(t,e),Xt(e),n&4&&(Yn(3,e,e.return),Ao(3,e),Yn(5,e,e.return));break;case 1:Jt(t,e),Xt(e),n&512&&(Je||a===null||ja(a,a.return)),n&64&&an&&(e=e.updateQueue,e!==null&&(n=e.callbacks,n!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?n:a.concat(n))));break;case 26:var r=Sa;if(Jt(t,e),Xt(e),n&512&&(Je||a===null||ja(a,a.return)),n&4){var s=a!==null?a.memoizedState:null;if(n=e.memoizedState,a===null)if(n===null)if(e.stateNode===null){e:{n=e.type,a=e.memoizedProps,r=r.ownerDocument||r;t:switch(n){case"title":s=r.getElementsByTagName("title")[0],(!s||s[So]||s[St]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=r.createElement(n),r.head.insertBefore(s,r.querySelector("head > title"))),bt(s,n,a),s[St]=e,mt(s),n=s;break e;case"link":var i=Pg("link","href",r).get(n+(a.href||""));if(i){for(var o=0;o<i.length;o++)if(s=i[o],s.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&s.getAttribute("rel")===(a.rel==null?null:a.rel)&&s.getAttribute("title")===(a.title==null?null:a.title)&&s.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){i.splice(o,1);break t}}s=r.createElement(n),bt(s,n,a),r.head.appendChild(s);break;case"meta":if(i=Pg("meta","content",r).get(n+(a.content||""))){for(o=0;o<i.length;o++)if(s=i[o],s.getAttribute("content")===(a.content==null?null:""+a.content)&&s.getAttribute("name")===(a.name==null?null:a.name)&&s.getAttribute("property")===(a.property==null?null:a.property)&&s.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&s.getAttribute("charset")===(a.charSet==null?null:a.charSet)){i.splice(o,1);break t}}s=r.createElement(n),bt(s,n,a),r.head.appendChild(s);break;default:throw Error(L(468,n))}s[St]=e,mt(s),n=s}e.stateNode=n}else jg(r,e.type,e.stateNode);else e.stateNode=Lg(r,n,e.memoizedProps);else s!==n?(s===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):s.count--,n===null?jg(r,e.type,e.stateNode):Lg(r,n,e.memoizedProps)):n===null&&e.stateNode!==null&&Yd(e,e.memoizedProps,a.memoizedProps)}break;case 27:Jt(t,e),Xt(e),n&512&&(Je||a===null||ja(a,a.return)),a!==null&&n&4&&Yd(e,e.memoizedProps,a.memoizedProps);break;case 5:if(Jt(t,e),Xt(e),n&512&&(Je||a===null||ja(a,a.return)),e.flags&32){r=e.stateNode;try{ks(r,"")}catch(p){Ce(e,e.return,p)}}n&4&&e.stateNode!=null&&(r=e.memoizedProps,Yd(e,r,a!==null?a.memoizedProps:r)),n&1024&&(Xd=!0);break;case 6:if(Jt(t,e),Xt(e),n&4){if(e.stateNode===null)throw Error(L(162));n=e.memoizedProps,a=e.stateNode;try{a.nodeValue=n}catch(p){Ce(e,e.return,p)}}break;case 3:if(Wl=null,r=Sa,Sa=Ru(t.containerInfo),Jt(t,e),Sa=r,Xt(e),n&4&&a!==null&&a.memoizedState.isDehydrated)try{yo(t.containerInfo)}catch(p){Ce(e,e.return,p)}Xd&&(Xd=!1,Fb(e));break;case 4:n=Sa,Sa=Ru(e.stateNode.containerInfo),Jt(t,e),Xt(e),Sa=n;break;case 12:Jt(t,e),Xt(e);break;case 13:Jt(t,e),Xt(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Ff=Fa()),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,Zd(e,n)));break;case 22:r=e.memoizedState!==null;var u=a!==null&&a.memoizedState!==null,c=an,d=Je;if(an=c||r,Je=d||u,Jt(t,e),Je=d,an=c,Xt(e),n&8192)e:for(t=e.stateNode,t._visibility=r?t._visibility&-2:t._visibility|1,r&&(a===null||u||an||Je||vr(e)),a=null,t=e;;){if(t.tag===5||t.tag===26){if(a===null){u=a=t;try{if(s=u.stateNode,r)i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none";else{o=u.stateNode;var m=u.memoizedProps.style,f=m!=null&&m.hasOwnProperty("display")?m.display:null;o.style.display=f==null||typeof f=="boolean"?"":(""+f).trim()}}catch(p){Ce(u,u.return,p)}}}else if(t.tag===6){if(a===null){u=t;try{u.stateNode.nodeValue=r?"":u.memoizedProps}catch(p){Ce(u,u.return,p)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}n&4&&(n=e.updateQueue,n!==null&&(a=n.retryQueue,a!==null&&(n.retryQueue=null,Zd(e,a))));break;case 19:Jt(t,e),Xt(e),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,Zd(e,n)));break;case 30:break;case 21:break;default:Jt(t,e),Xt(e)}}function Xt(e){var t=e.flags;if(t&2){try{for(var a,n=e.return;n!==null;){if(Db(n)){a=n;break}n=n.return}if(a==null)throw Error(L(160));switch(a.tag){case 27:var r=a.stateNode,s=Jd(e);bu(e,s,r);break;case 5:var i=a.stateNode;a.flags&32&&(ks(i,""),a.flags&=-33);var o=Jd(e);bu(e,o,i);break;case 3:case 4:var u=a.stateNode.containerInfo,c=Jd(e);jm(e,c,u);break;default:throw Error(L(161))}}catch(d){Ce(e,e.return,d)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Fb(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Fb(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Cn(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Ob(e,t.alternate,t),t=t.sibling}function vr(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Yn(4,t,t.return),vr(t);break;case 1:ja(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&Tb(t,t.return,a),vr(t);break;case 27:no(t.stateNode);case 26:case 5:ja(t,t.return),vr(t);break;case 22:t.memoizedState===null&&vr(t);break;case 30:vr(t);break;default:vr(t)}e=e.sibling}}function En(e,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var n=t.alternate,r=e,s=t,i=s.flags;switch(s.tag){case 0:case 11:case 15:En(r,s,a),Ao(4,s);break;case 1:if(En(r,s,a),n=s,r=n.stateNode,typeof r.componentDidMount=="function")try{r.componentDidMount()}catch(c){Ce(n,n.return,c)}if(n=s,r=n.updateQueue,r!==null){var o=n.stateNode;try{var u=r.shared.hiddenCallbacks;if(u!==null)for(r.shared.hiddenCallbacks=null,r=0;r<u.length;r++)Oy(u[r],o)}catch(c){Ce(n,n.return,c)}}a&&i&64&&Eb(s),Wi(s,s.return);break;case 27:Mb(s);case 26:case 5:En(r,s,a),a&&n===null&&i&4&&Ab(s),Wi(s,s.return);break;case 12:En(r,s,a);break;case 13:En(r,s,a),a&&i&4&&jb(r,s);break;case 22:s.memoizedState===null&&En(r,s,a),Wi(s,s.return);break;case 30:break;default:En(r,s,a)}t=t.sibling}}function Lf(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&ko(a))}function Pf(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ko(e))}function La(e,t,a,n){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)zb(e,t,a,n),t=t.sibling}function zb(e,t,a,n){var r=t.flags;switch(t.tag){case 0:case 11:case 15:La(e,t,a,n),r&2048&&Ao(9,t);break;case 1:La(e,t,a,n);break;case 3:La(e,t,a,n),r&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ko(e)));break;case 12:if(r&2048){La(e,t,a,n),e=t.stateNode;try{var s=t.memoizedProps,i=s.id,o=s.onPostCommit;typeof o=="function"&&o(i,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(u){Ce(t,t.return,u)}}else La(e,t,a,n);break;case 13:La(e,t,a,n);break;case 23:break;case 22:s=t.stateNode,i=t.alternate,t.memoizedState!==null?s._visibility&2?La(e,t,a,n):eo(e,t):s._visibility&2?La(e,t,a,n):(s._visibility|=2,ns(e,t,a,n,(t.subtreeFlags&10256)!==0)),r&2048&&Lf(i,t);break;case 24:La(e,t,a,n),r&2048&&Pf(t.alternate,t);break;default:La(e,t,a,n)}}function ns(e,t,a,n,r){for(r=r&&(t.subtreeFlags&10256)!==0,t=t.child;t!==null;){var s=e,i=t,o=a,u=n,c=i.flags;switch(i.tag){case 0:case 11:case 15:ns(s,i,o,u,r),Ao(8,i);break;case 23:break;case 22:var d=i.stateNode;i.memoizedState!==null?d._visibility&2?ns(s,i,o,u,r):eo(s,i):(d._visibility|=2,ns(s,i,o,u,r)),r&&c&2048&&Lf(i.alternate,i);break;case 24:ns(s,i,o,u,r),r&&c&2048&&Pf(i.alternate,i);break;default:ns(s,i,o,u,r)}t=t.sibling}}function eo(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,n=t,r=n.flags;switch(n.tag){case 22:eo(a,n),r&2048&&Lf(n.alternate,n);break;case 24:eo(a,n),r&2048&&Pf(n.alternate,n);break;default:eo(a,n)}t=t.sibling}}var Ii=8192;function es(e){if(e.subtreeFlags&Ii)for(e=e.child;e!==null;)Bb(e),e=e.sibling}function Bb(e){switch(e.tag){case 26:es(e),e.flags&Ii&&e.memoizedState!==null&&$E(Sa,e.memoizedState,e.memoizedProps);break;case 5:es(e);break;case 3:case 4:var t=Sa;Sa=Ru(e.stateNode.containerInfo),es(e),Sa=t;break;case 22:e.memoizedState===null&&(t=e.alternate,t!==null&&t.memoizedState!==null?(t=Ii,Ii=16777216,es(e),Ii=t):es(e));break;default:es(e)}}function qb(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function ji(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var n=t[a];dt=n,Hb(n,e)}qb(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Ib(e),e=e.sibling}function Ib(e){switch(e.tag){case 0:case 11:case 15:ji(e),e.flags&2048&&Yn(9,e,e.return);break;case 3:ji(e);break;case 12:ji(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Xl(e)):ji(e);break;default:ji(e)}}function Xl(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var n=t[a];dt=n,Hb(n,e)}qb(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Yn(8,t,t.return),Xl(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,Xl(t));break;default:Xl(t)}e=e.sibling}}function Hb(e,t){for(;dt!==null;){var a=dt;switch(a.tag){case 0:case 11:case 15:Yn(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var n=a.memoizedState.cachePool.pool;n!=null&&n.refCount++}break;case 24:ko(a.memoizedState.cache)}if(n=a.child,n!==null)n.return=a,dt=n;else e:for(a=e;dt!==null;){n=dt;var r=n.sibling,s=n.return;if(Lb(n),n===a){dt=null;break e}if(r!==null){r.return=s,dt=r;break e}dt=s}}}var FC={getCacheForType:function(e){var t=Nt(rt),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a}},zC=typeof WeakMap=="function"?WeakMap:Map,Se=0,Ae=null,le=null,de=0,we=0,Zt=null,Un=!1,Fs=!1,jf=!1,pn=0,Ke=0,Jn=0,wr=0,Uf=0,ga=0,Ds=0,to=null,Ht=null,Um=!1,Ff=0,xu=1/0,$u=null,In=null,yt=0,Hn=null,Ms=null,Ns=0,Fm=0,zm=null,Kb=null,ao=0,Bm=null;function aa(){if((Se&2)!==0&&de!==0)return de&-de;if(ne.T!==null){var e=Cs;return e!==0?e:Bf()}return ay()}function Qb(){ga===0&&(ga=(de&536870912)===0||ve?Zg():536870912);var e=ya.current;return e!==null&&(e.flags|=32),ga}function na(e,t,a){(e===Ae&&(we===2||we===9)||e.cancelPendingCommit!==null)&&(Os(e,0),Fn(e,de,ga,!1)),wo(e,a),((Se&2)===0||e!==Ae)&&(e===Ae&&((Se&2)===0&&(wr|=a),Ke===4&&Fn(e,de,ga,!1)),qa(e))}function Vb(e,t,a){if((Se&6)!==0)throw Error(L(327));var n=!a&&(t&124)===0&&(t&e.expiredLanes)===0||$o(e,t),r=n?IC(e,t):Wd(e,t,!0),s=n;do{if(r===0){Fs&&!n&&Fn(e,t,0,!1);break}else{if(a=e.current.alternate,s&&!BC(a)){r=Wd(e,t,!1),s=!1;continue}if(r===2){if(s=t,e.errorRecoveryDisabledLanes&s)var i=0;else i=e.pendingLanes&-536870913,i=i!==0?i:i&536870912?536870912:0;if(i!==0){t=i;e:{var o=e;r=to;var u=o.current.memoizedState.isDehydrated;if(u&&(Os(o,i).flags|=256),i=Wd(o,i,!1),i!==2){if(jf&&!u){o.errorRecoveryDisabledLanes|=s,wr|=s,r=4;break e}s=Ht,Ht=r,s!==null&&(Ht===null?Ht=s:Ht.push.apply(Ht,s))}r=i}if(s=!1,r!==2)continue}}if(r===1){Os(e,0),Fn(e,t,0,!0);break}e:{switch(n=e,s=r,s){case 0:case 1:throw Error(L(345));case 4:if((t&4194048)!==t)break;case 6:Fn(n,t,ga,!Un);break e;case 2:Ht=null;break;case 3:case 5:break;default:throw Error(L(329))}if((t&62914560)===t&&(r=Ff+300-Fa(),10<r)){if(Fn(n,t,ga,!Un),Au(n,0,!0)!==0)break e;n.timeoutHandle=m0(yg.bind(null,n,a,Ht,$u,Um,t,ga,wr,Ds,Un,s,2,-0,0),r);break e}yg(n,a,Ht,$u,Um,t,ga,wr,Ds,Un,s,0,-0,0)}}break}while(!0);qa(e)}function yg(e,t,a,n,r,s,i,o,u,c,d,m,f,p){if(e.timeoutHandle=-1,m=t.subtreeFlags,(m&8192||(m&16785408)===16785408)&&(po={stylesheets:null,count:0,unsuspend:xE},Bb(t),m=wE(),m!==null)){e.cancelPendingCommit=m(xg.bind(null,e,t,s,a,n,r,i,o,u,d,1,f,p)),Fn(e,s,i,!c);return}xg(e,t,s,a,n,r,i,o,u)}function BC(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var n=0;n<a.length;n++){var r=a[n],s=r.getSnapshot;r=r.value;try{if(!ra(s(),r))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Fn(e,t,a,n){t&=~Uf,t&=~wr,e.suspendedLanes|=t,e.pingedLanes&=~t,n&&(e.warmLanes|=t),n=e.expirationTimes;for(var r=t;0<r;){var s=31-ta(r),i=1<<s;n[s]=-1,r&=~i}a!==0&&ey(e,a,t)}function Bu(){return(Se&6)===0?(Do(0,!1),!1):!0}function zf(){if(le!==null){if(we===0)var e=le.return;else e=le,on=Ar=null,Rf(e),Ss=null,co=0,e=le;for(;e!==null;)Cb(e.alternate,e),e=e.return;le=null}}function Os(e,t){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,nE(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),zf(),Ae=e,le=a=un(e.current,null),de=t,we=0,Zt=null,Un=!1,Fs=$o(e,t),jf=!1,Ds=ga=Uf=wr=Jn=Ke=0,Ht=to=null,Um=!1,(t&8)!==0&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-ta(n),s=1<<r;t|=e[r],n&=~s}return pn=t,Lu(),a}function Gb(e,t){ie=null,ne.H=pu,t===Co||t===ju?(t=Jv(),we=3):t===Dy?(t=Jv(),we=4):we=t===wb?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Zt=t,le===null&&(Ke=1,gu(e,va(t,e.current)))}function Yb(){var e=ne.H;return ne.H=pu,e===null?pu:e}function Jb(){var e=ne.A;return ne.A=FC,e}function qm(){Ke=4,Un||(de&4194048)!==de&&ya.current!==null||(Fs=!0),(Jn&134217727)===0&&(wr&134217727)===0||Ae===null||Fn(Ae,de,ga,!1)}function Wd(e,t,a){var n=Se;Se|=2;var r=Yb(),s=Jb();(Ae!==e||de!==t)&&($u=null,Os(e,t)),t=!1;var i=Ke;e:do try{if(we!==0&&le!==null){var o=le,u=Zt;switch(we){case 8:zf(),i=6;break e;case 3:case 2:case 9:case 6:ya.current===null&&(t=!0);var c=we;if(we=0,Zt=null,vs(e,o,u,c),a&&Fs){i=0;break e}break;default:c=we,we=0,Zt=null,vs(e,o,u,c)}}qC(),i=Ke;break}catch(d){Gb(e,d)}while(!0);return t&&e.shellSuspendCounter++,on=Ar=null,Se=n,ne.H=r,ne.A=s,le===null&&(Ae=null,de=0,Lu()),i}function qC(){for(;le!==null;)Xb(le)}function IC(e,t){var a=Se;Se|=2;var n=Yb(),r=Jb();Ae!==e||de!==t?($u=null,xu=Fa()+500,Os(e,t)):Fs=$o(e,t);e:do try{if(we!==0&&le!==null){t=le;var s=Zt;t:switch(we){case 1:we=0,Zt=null,vs(e,t,s,1);break;case 2:case 9:if(Yv(s)){we=0,Zt=null,bg(t);break}t=function(){we!==2&&we!==9||Ae!==e||(we=7),qa(e)},s.then(t,t);break e;case 3:we=7;break e;case 4:we=5;break e;case 7:Yv(s)?(we=0,Zt=null,bg(t)):(we=0,Zt=null,vs(e,t,s,7));break;case 5:var i=null;switch(le.tag){case 26:i=le.memoizedState;case 5:case 27:var o=le;if(!i||v0(i)){we=0,Zt=null;var u=o.sibling;if(u!==null)le=u;else{var c=o.return;c!==null?(le=c,qu(c)):le=null}break t}}we=0,Zt=null,vs(e,t,s,5);break;case 6:we=0,Zt=null,vs(e,t,s,6);break;case 8:zf(),Ke=6;break e;default:throw Error(L(462))}}HC();break}catch(d){Gb(e,d)}while(!0);return on=Ar=null,ne.H=n,ne.A=r,Se=a,le!==null?0:(Ae=null,de=0,Lu(),Ke)}function HC(){for(;le!==null&&!mk();)Xb(le)}function Xb(e){var t=kb(e.alternate,e,pn);e.memoizedProps=e.pendingProps,t===null?qu(e):le=t}function bg(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=mg(a,t,t.pendingProps,t.type,void 0,de);break;case 11:t=mg(a,t,t.pendingProps,t.type.render,t.ref,de);break;case 5:Rf(t);default:Cb(a,t),t=le=Cy(t,pn),t=kb(a,t,pn)}e.memoizedProps=e.pendingProps,t===null?qu(e):le=t}function vs(e,t,a,n){on=Ar=null,Rf(t),Ss=null,co=0;var r=t.return;try{if(MC(e,r,t,a,de)){Ke=1,gu(e,va(a,e.current)),le=null;return}}catch(s){if(r!==null)throw le=r,s;Ke=1,gu(e,va(a,e.current)),le=null;return}t.flags&32768?(ve||n===1?e=!0:Fs||(de&536870912)!==0?e=!1:(Un=e=!0,(n===2||n===9||n===3||n===6)&&(n=ya.current,n!==null&&n.tag===13&&(n.flags|=16384))),Zb(t,e)):qu(t)}function qu(e){var t=e;do{if((t.flags&32768)!==0){Zb(t,Un);return}e=t.return;var a=LC(t.alternate,t,pn);if(a!==null){le=a;return}if(t=t.sibling,t!==null){le=t;return}le=t=e}while(t!==null);Ke===0&&(Ke=5)}function Zb(e,t){do{var a=PC(e.alternate,e);if(a!==null){a.flags&=32767,le=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){le=e;return}le=e=a}while(e!==null);Ke=6,le=null}function xg(e,t,a,n,r,s,i,o,u){e.cancelPendingCommit=null;do Iu();while(yt!==0);if((Se&6)!==0)throw Error(L(327));if(t!==null){if(t===e.current)throw Error(L(177));if(s=t.lanes|t.childLanes,s|=ff,wk(e,a,s,i,o,u),e===Ae&&(le=Ae=null,de=0),Ms=t,Hn=e,Ns=a,Fm=s,zm=r,Kb=n,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,GC(ru,function(){return n0(!0),null})):(e.callbackNode=null,e.callbackPriority=0),n=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||n){n=ne.T,ne.T=null,r=ge.p,ge.p=2,i=Se,Se|=4;try{jC(e,t,a)}finally{Se=i,ge.p=r,ne.T=n}}yt=1,Wb(),e0(),t0()}}function Wb(){if(yt===1){yt=0;var e=Hn,t=Ms,a=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||a){a=ne.T,ne.T=null;var n=ge.p;ge.p=2;var r=Se;Se|=4;try{Ub(t,e);var s=Qm,i=xy(e.containerInfo),o=s.focusedElem,u=s.selectionRange;if(i!==o&&o&&o.ownerDocument&&by(o.ownerDocument.documentElement,o)){if(u!==null&&mf(o)){var c=u.start,d=u.end;if(d===void 0&&(d=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(d,o.value.length);else{var m=o.ownerDocument||document,f=m&&m.defaultView||window;if(f.getSelection){var p=f.getSelection(),b=o.textContent.length,y=Math.min(u.start,b),x=u.end===void 0?y:Math.min(u.end,b);!p.extend&&y>x&&(i=x,x=y,y=i);var g=Bv(o,y),v=Bv(o,x);if(g&&v&&(p.rangeCount!==1||p.anchorNode!==g.node||p.anchorOffset!==g.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var $=m.createRange();$.setStart(g.node,g.offset),p.removeAllRanges(),y>x?(p.addRange($),p.extend(v.node,v.offset)):($.setEnd(v.node,v.offset),p.addRange($))}}}}for(m=[],p=o;p=p.parentNode;)p.nodeType===1&&m.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<m.length;o++){var w=m[o];w.element.scrollLeft=w.left,w.element.scrollTop=w.top}}Eu=!!Km,Qm=Km=null}finally{Se=r,ge.p=n,ne.T=a}}e.current=t,yt=2}}function e0(){if(yt===2){yt=0;var e=Hn,t=Ms,a=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||a){a=ne.T,ne.T=null;var n=ge.p;ge.p=2;var r=Se;Se|=4;try{Ob(e,t.alternate,t)}finally{Se=r,ge.p=n,ne.T=a}}yt=3}}function t0(){if(yt===4||yt===3){yt=0,fk();var e=Hn,t=Ms,a=Ns,n=Kb;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?yt=5:(yt=0,Ms=Hn=null,a0(e,e.pendingLanes));var r=e.pendingLanes;if(r===0&&(In=null),rf(a),t=t.stateNode,ea&&typeof ea.onCommitFiberRoot=="function")try{ea.onCommitFiberRoot(xo,t,void 0,(t.current.flags&128)===128)}catch{}if(n!==null){t=ne.T,r=ge.p,ge.p=2,ne.T=null;try{for(var s=e.onRecoverableError,i=0;i<n.length;i++){var o=n[i];s(o.value,{componentStack:o.stack})}}finally{ne.T=t,ge.p=r}}(Ns&3)!==0&&Iu(),qa(e),r=e.pendingLanes,(a&4194090)!==0&&(r&42)!==0?e===Bm?ao++:(ao=0,Bm=e):ao=0,Do(0,!1)}}function a0(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ko(t)))}function Iu(e){return Wb(),e0(),t0(),n0(e)}function n0(){if(yt!==5)return!1;var e=Hn,t=Fm;Fm=0;var a=rf(Ns),n=ne.T,r=ge.p;try{ge.p=32>a?32:a,ne.T=null,a=zm,zm=null;var s=Hn,i=Ns;if(yt=0,Ms=Hn=null,Ns=0,(Se&6)!==0)throw Error(L(331));var o=Se;if(Se|=4,Ib(s.current),zb(s,s.current,i,a),Se=o,Do(0,!1),ea&&typeof ea.onPostCommitFiberRoot=="function")try{ea.onPostCommitFiberRoot(xo,s)}catch{}return!0}finally{ge.p=r,ne.T=n,a0(e,t)}}function $g(e,t,a){t=va(a,t),t=Om(e.stateNode,t,2),e=qn(e,t,2),e!==null&&(wo(e,2),qa(e))}function Ce(e,t,a){if(e.tag===3)$g(e,e,a);else for(;t!==null;){if(t.tag===3){$g(t,e,a);break}else if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(In===null||!In.has(n))){e=va(a,e),a=xb(2),n=qn(t,a,2),n!==null&&($b(a,n,t,e),wo(n,2),qa(n));break}}t=t.return}}function em(e,t,a){var n=e.pingCache;if(n===null){n=e.pingCache=new zC;var r=new Set;n.set(t,r)}else r=n.get(t),r===void 0&&(r=new Set,n.set(t,r));r.has(a)||(jf=!0,r.add(a),e=KC.bind(null,e,t,a),t.then(e,e))}function KC(e,t,a){var n=e.pingCache;n!==null&&n.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,Ae===e&&(de&a)===a&&(Ke===4||Ke===3&&(de&62914560)===de&&300>Fa()-Ff?(Se&2)===0&&Os(e,0):Uf|=a,Ds===de&&(Ds=0)),qa(e)}function r0(e,t){t===0&&(t=Wg()),e=Us(e,t),e!==null&&(wo(e,t),qa(e))}function QC(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),r0(e,a)}function VC(e,t){var a=0;switch(e.tag){case 13:var n=e.stateNode,r=e.memoizedState;r!==null&&(a=r.retryLane);break;case 19:n=e.stateNode;break;case 22:n=e.stateNode._retryCache;break;default:throw Error(L(314))}n!==null&&n.delete(t),r0(e,a)}function GC(e,t){return af(e,t)}var wu=null,rs=null,Im=!1,Su=!1,tm=!1,Sr=0;function qa(e){e!==rs&&e.next===null&&(rs===null?wu=rs=e:rs=rs.next=e),Su=!0,Im||(Im=!0,JC())}function Do(e,t){if(!tm&&Su){tm=!0;do for(var a=!1,n=wu;n!==null;){if(!t)if(e!==0){var r=n.pendingLanes;if(r===0)var s=0;else{var i=n.suspendedLanes,o=n.pingedLanes;s=(1<<31-ta(42|e)+1)-1,s&=r&~(i&~o),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(a=!0,wg(n,s))}else s=de,s=Au(n,n===Ae?s:0,n.cancelPendingCommit!==null||n.timeoutHandle!==-1),(s&3)===0||$o(n,s)||(a=!0,wg(n,s));n=n.next}while(a);tm=!1}}function YC(){s0()}function s0(){Su=Im=!1;var e=0;Sr!==0&&(aE()&&(e=Sr),Sr=0);for(var t=Fa(),a=null,n=wu;n!==null;){var r=n.next,s=i0(n,t);s===0?(n.next=null,a===null?wu=r:a.next=r,r===null&&(rs=a)):(a=n,(e!==0||(s&3)!==0)&&(Su=!0)),n=r}Do(e,!1)}function i0(e,t){for(var a=e.suspendedLanes,n=e.pingedLanes,r=e.expirationTimes,s=e.pendingLanes&-62914561;0<s;){var i=31-ta(s),o=1<<i,u=r[i];u===-1?((o&a)===0||(o&n)!==0)&&(r[i]=$k(o,t)):u<=t&&(e.expiredLanes|=o),s&=~o}if(t=Ae,a=de,a=Au(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),n=e.callbackNode,a===0||e===t&&(we===2||we===9)||e.cancelPendingCommit!==null)return n!==null&&n!==null&&Cd(n),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||$o(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(n!==null&&Cd(n),rf(a)){case 2:case 8:a=Jg;break;case 32:a=ru;break;case 268435456:a=Xg;break;default:a=ru}return n=o0.bind(null,e),a=af(a,n),e.callbackPriority=t,e.callbackNode=a,t}return n!==null&&n!==null&&Cd(n),e.callbackPriority=2,e.callbackNode=null,2}function o0(e,t){if(yt!==0&&yt!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Iu(!0)&&e.callbackNode!==a)return null;var n=de;return n=Au(e,e===Ae?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),n===0?null:(Vb(e,n,t),i0(e,Fa()),e.callbackNode!=null&&e.callbackNode===a?o0.bind(null,e):null)}function wg(e,t){if(Iu())return null;Vb(e,t,!0)}function JC(){rE(function(){(Se&6)!==0?af(Yg,YC):s0()})}function Bf(){return Sr===0&&(Sr=Zg()),Sr}function Sg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Il(""+e)}function Ng(e,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,e.id&&a.setAttribute("form",e.id),t.parentNode.insertBefore(a,t),e=new FormData(e),a.parentNode.removeChild(a),e}function XC(e,t,a,n,r){if(t==="submit"&&a&&a.stateNode===r){var s=Sg((r[Kt]||null).action),i=n.submitter;i&&(t=(t=i[Kt]||null)?Sg(t.formAction):i.getAttribute("formAction"),t!==null&&(s=t,i=null));var o=new Du("action","action",null,n,r);e.push({event:o,listeners:[{instance:null,listener:function(){if(n.defaultPrevented){if(Sr!==0){var u=i?Ng(r,i):new FormData(r);Dm(a,{pending:!0,data:u,method:r.method,action:s},null,u)}}else typeof s=="function"&&(o.preventDefault(),u=i?Ng(r,i):new FormData(r),Dm(a,{pending:!0,data:u,method:r.method,action:s},s,u))},currentTarget:r}]})}}for(jl=0;jl<xm.length;jl++)Ul=xm[jl],_g=Ul.toLowerCase(),Rg=Ul[0].toUpperCase()+Ul.slice(1),_a(_g,"on"+Rg);var Ul,_g,Rg,jl;_a(wy,"onAnimationEnd");_a(Sy,"onAnimationIteration");_a(Ny,"onAnimationStart");_a("dblclick","onDoubleClick");_a("focusin","onFocus");_a("focusout","onBlur");_a(vC,"onTransitionRun");_a(gC,"onTransitionStart");_a(yC,"onTransitionCancel");_a(_y,"onTransitionEnd");Rs("onMouseEnter",["mouseout","mouseover"]);Rs("onMouseLeave",["mouseout","mouseover"]);Rs("onPointerEnter",["pointerout","pointerover"]);Rs("onPointerLeave",["pointerout","pointerover"]);Cr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Cr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Cr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Cr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Cr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Cr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var mo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ZC=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mo));function l0(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var n=e[a],r=n.event;n=n.listeners;e:{var s=void 0;if(t)for(var i=n.length-1;0<=i;i--){var o=n[i],u=o.instance,c=o.currentTarget;if(o=o.listener,u!==s&&r.isPropagationStopped())break e;s=o,r.currentTarget=c;try{s(r)}catch(d){vu(d)}r.currentTarget=null,s=u}else for(i=0;i<n.length;i++){if(o=n[i],u=o.instance,c=o.currentTarget,o=o.listener,u!==s&&r.isPropagationStopped())break e;s=o,r.currentTarget=c;try{s(r)}catch(d){vu(d)}r.currentTarget=null,s=u}}}}function oe(e,t){var a=t[fm];a===void 0&&(a=t[fm]=new Set);var n=e+"__bubble";a.has(n)||(u0(t,e,2,!1),a.add(n))}function am(e,t,a){var n=0;t&&(n|=4),u0(a,e,n,t)}var Fl="_reactListening"+Math.random().toString(36).slice(2);function qf(e){if(!e[Fl]){e[Fl]=!0,ny.forEach(function(a){a!=="selectionchange"&&(ZC.has(a)||am(a,!1,e),am(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Fl]||(t[Fl]=!0,am("selectionchange",!1,t))}}function u0(e,t,a,n){switch($0(t)){case 2:var r=_E;break;case 8:r=RE;break;default:r=Qf}a=r.bind(null,t,a,e),r=void 0,!gm||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(r=!0),n?r!==void 0?e.addEventListener(t,a,{capture:!0,passive:r}):e.addEventListener(t,a,!0):r!==void 0?e.addEventListener(t,a,{passive:r}):e.addEventListener(t,a,!1)}function nm(e,t,a,n,r){var s=n;if((t&1)===0&&(t&2)===0&&n!==null)e:for(;;){if(n===null)return;var i=n.tag;if(i===3||i===4){var o=n.stateNode.containerInfo;if(o===r)break;if(i===4)for(i=n.return;i!==null;){var u=i.tag;if((u===3||u===4)&&i.stateNode.containerInfo===r)return;i=i.return}for(;o!==null;){if(i=os(o),i===null)return;if(u=i.tag,u===5||u===6||u===26||u===27){n=s=i;continue e}o=o.parentNode}}n=n.return}dy(function(){var c=s,d=lf(a),m=[];e:{var f=Ry.get(e);if(f!==void 0){var p=Du,b=e;switch(e){case"keypress":if(Kl(a)===0)break e;case"keydown":case"keyup":p=Gk;break;case"focusin":b="focus",p=Pd;break;case"focusout":b="blur",p=Pd;break;case"beforeblur":case"afterblur":p=Pd;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Dv;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=Pk;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=Xk;break;case wy:case Sy:case Ny:p=Fk;break;case _y:p=Wk;break;case"scroll":case"scrollend":p=Ok;break;case"wheel":p=tC;break;case"copy":case"cut":case"paste":p=Bk;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Ov;break;case"toggle":case"beforetoggle":p=nC}var y=(t&4)!==0,x=!y&&(e==="scroll"||e==="scrollend"),g=y?f!==null?f+"Capture":null:f;y=[];for(var v=c,$;v!==null;){var w=v;if($=w.stateNode,w=w.tag,w!==5&&w!==26&&w!==27||$===null||g===null||(w=so(v,g),w!=null&&y.push(fo(v,w,$))),x)break;v=v.return}0<y.length&&(f=new p(f,b,null,a,d),m.push({event:f,listeners:y}))}}if((t&7)===0){e:{if(f=e==="mouseover"||e==="pointerover",p=e==="mouseout"||e==="pointerout",f&&a!==vm&&(b=a.relatedTarget||a.fromElement)&&(os(b)||b[Ps]))break e;if((p||f)&&(f=d.window===d?d:(f=d.ownerDocument)?f.defaultView||f.parentWindow:window,p?(b=a.relatedTarget||a.toElement,p=c,b=b?os(b):null,b!==null&&(x=bo(b),y=b.tag,b!==x||y!==5&&y!==27&&y!==6)&&(b=null)):(p=null,b=c),p!==b)){if(y=Dv,w="onMouseLeave",g="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(y=Ov,w="onPointerLeave",g="onPointerEnter",v="pointer"),x=p==null?f:qi(p),$=b==null?f:qi(b),f=new y(w,v+"leave",p,a,d),f.target=x,f.relatedTarget=$,w=null,os(d)===c&&(y=new y(g,v+"enter",b,a,d),y.target=$,y.relatedTarget=x,w=y),x=w,p&&b)t:{for(y=p,g=b,v=0,$=y;$;$=ts($))v++;for($=0,w=g;w;w=ts(w))$++;for(;0<v-$;)y=ts(y),v--;for(;0<$-v;)g=ts(g),$--;for(;v--;){if(y===g||g!==null&&y===g.alternate)break t;y=ts(y),g=ts(g)}y=null}else y=null;p!==null&&kg(m,f,p,y,!1),b!==null&&x!==null&&kg(m,x,b,y,!0)}}e:{if(f=c?qi(c):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var S=Uv;else if(jv(f))if(gy)S=fC;else{S=dC;var R=cC}else p=f.nodeName,!p||p.toLowerCase()!=="input"||f.type!=="checkbox"&&f.type!=="radio"?c&&of(c.elementType)&&(S=Uv):S=mC;if(S&&(S=S(e,c))){vy(m,S,a,d);break e}R&&R(e,f,c),e==="focusout"&&c&&f.type==="number"&&c.memoizedProps.value!=null&&hm(f,"number",f.value)}switch(R=c?qi(c):window,e){case"focusin":(jv(R)||R.contentEditable==="true")&&(cs=R,ym=c,Qi=null);break;case"focusout":Qi=ym=cs=null;break;case"mousedown":bm=!0;break;case"contextmenu":case"mouseup":case"dragend":bm=!1,qv(m,a,d);break;case"selectionchange":if(hC)break;case"keydown":case"keyup":qv(m,a,d)}var C;if(df)e:{switch(e){case"compositionstart":var E="onCompositionStart";break e;case"compositionend":E="onCompositionEnd";break e;case"compositionupdate":E="onCompositionUpdate";break e}E=void 0}else us?py(e,a)&&(E="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(E="onCompositionStart");E&&(fy&&a.locale!=="ko"&&(us||E!=="onCompositionStart"?E==="onCompositionEnd"&&us&&(C=my()):(jn=d,uf="value"in jn?jn.value:jn.textContent,us=!0)),R=Nu(c,E),0<R.length&&(E=new Mv(E,e,null,a,d),m.push({event:E,listeners:R}),C?E.data=C:(C=hy(a),C!==null&&(E.data=C)))),(C=sC?iC(e,a):oC(e,a))&&(E=Nu(c,"onBeforeInput"),0<E.length&&(R=new Mv("onBeforeInput","beforeinput",null,a,d),m.push({event:R,listeners:E}),R.data=C)),XC(m,e,c,a,d)}l0(m,t)})}function fo(e,t,a){return{instance:e,listener:t,currentTarget:a}}function Nu(e,t){for(var a=t+"Capture",n=[];e!==null;){var r=e,s=r.stateNode;if(r=r.tag,r!==5&&r!==26&&r!==27||s===null||(r=so(e,a),r!=null&&n.unshift(fo(e,r,s)),r=so(e,t),r!=null&&n.push(fo(e,r,s))),e.tag===3)return n;e=e.return}return[]}function ts(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function kg(e,t,a,n,r){for(var s=t._reactName,i=[];a!==null&&a!==n;){var o=a,u=o.alternate,c=o.stateNode;if(o=o.tag,u!==null&&u===n)break;o!==5&&o!==26&&o!==27||c===null||(u=c,r?(c=so(a,s),c!=null&&i.unshift(fo(a,c,u))):r||(c=so(a,s),c!=null&&i.push(fo(a,c,u)))),a=a.return}i.length!==0&&e.push({event:t,listeners:i})}var WC=/\r\n?/g,eE=/\u0000|\uFFFD/g;function Cg(e){return(typeof e=="string"?e:""+e).replace(WC,`
`).replace(eE,"")}function c0(e,t){return t=Cg(t),Cg(e)===t}function Hu(){}function Re(e,t,a,n,r,s){switch(a){case"children":typeof n=="string"?t==="body"||t==="textarea"&&n===""||ks(e,n):(typeof n=="number"||typeof n=="bigint")&&t!=="body"&&ks(e,""+n);break;case"className":Cl(e,"class",n);break;case"tabIndex":Cl(e,"tabindex",n);break;case"dir":case"role":case"viewBox":case"width":case"height":Cl(e,a,n);break;case"style":cy(e,n,s);break;case"data":if(t!=="object"){Cl(e,"data",n);break}case"src":case"href":if(n===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(n==null||typeof n=="function"||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(a);break}n=Il(""+n),e.setAttribute(a,n);break;case"action":case"formAction":if(typeof n=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(a==="formAction"?(t!=="input"&&Re(e,t,"name",r.name,r,null),Re(e,t,"formEncType",r.formEncType,r,null),Re(e,t,"formMethod",r.formMethod,r,null),Re(e,t,"formTarget",r.formTarget,r,null)):(Re(e,t,"encType",r.encType,r,null),Re(e,t,"method",r.method,r,null),Re(e,t,"target",r.target,r,null)));if(n==null||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(a);break}n=Il(""+n),e.setAttribute(a,n);break;case"onClick":n!=null&&(e.onclick=Hu);break;case"onScroll":n!=null&&oe("scroll",e);break;case"onScrollEnd":n!=null&&oe("scrollend",e);break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(L(61));if(a=n.__html,a!=null){if(r.children!=null)throw Error(L(60));e.innerHTML=a}}break;case"multiple":e.multiple=n&&typeof n!="function"&&typeof n!="symbol";break;case"muted":e.muted=n&&typeof n!="function"&&typeof n!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(n==null||typeof n=="function"||typeof n=="boolean"||typeof n=="symbol"){e.removeAttribute("xlink:href");break}a=Il(""+n),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":n!=null&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,""+n):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":n&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":n===!0?e.setAttribute(a,""):n!==!1&&n!=null&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,n):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":n!=null&&typeof n!="function"&&typeof n!="symbol"&&!isNaN(n)&&1<=n?e.setAttribute(a,n):e.removeAttribute(a);break;case"rowSpan":case"start":n==null||typeof n=="function"||typeof n=="symbol"||isNaN(n)?e.removeAttribute(a):e.setAttribute(a,n);break;case"popover":oe("beforetoggle",e),oe("toggle",e),ql(e,"popover",n);break;case"xlinkActuate":Wa(e,"http://www.w3.org/1999/xlink","xlink:actuate",n);break;case"xlinkArcrole":Wa(e,"http://www.w3.org/1999/xlink","xlink:arcrole",n);break;case"xlinkRole":Wa(e,"http://www.w3.org/1999/xlink","xlink:role",n);break;case"xlinkShow":Wa(e,"http://www.w3.org/1999/xlink","xlink:show",n);break;case"xlinkTitle":Wa(e,"http://www.w3.org/1999/xlink","xlink:title",n);break;case"xlinkType":Wa(e,"http://www.w3.org/1999/xlink","xlink:type",n);break;case"xmlBase":Wa(e,"http://www.w3.org/XML/1998/namespace","xml:base",n);break;case"xmlLang":Wa(e,"http://www.w3.org/XML/1998/namespace","xml:lang",n);break;case"xmlSpace":Wa(e,"http://www.w3.org/XML/1998/namespace","xml:space",n);break;case"is":ql(e,"is",n);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Dk.get(a)||a,ql(e,a,n))}}function Hm(e,t,a,n,r,s){switch(a){case"style":cy(e,n,s);break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(L(61));if(a=n.__html,a!=null){if(r.children!=null)throw Error(L(60));e.innerHTML=a}}break;case"children":typeof n=="string"?ks(e,n):(typeof n=="number"||typeof n=="bigint")&&ks(e,""+n);break;case"onScroll":n!=null&&oe("scroll",e);break;case"onScrollEnd":n!=null&&oe("scrollend",e);break;case"onClick":n!=null&&(e.onclick=Hu);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!ry.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(r=a.endsWith("Capture"),t=a.slice(2,r?a.length-7:void 0),s=e[Kt]||null,s=s!=null?s[a]:null,typeof s=="function"&&e.removeEventListener(t,s,r),typeof n=="function")){typeof s!="function"&&s!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(t,n,r);break e}a in e?e[a]=n:n===!0?e.setAttribute(a,""):ql(e,a,n)}}}function bt(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":oe("error",e),oe("load",e);var n=!1,r=!1,s;for(s in a)if(a.hasOwnProperty(s)){var i=a[s];if(i!=null)switch(s){case"src":n=!0;break;case"srcSet":r=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(L(137,t));default:Re(e,t,s,i,a,null)}}r&&Re(e,t,"srcSet",a.srcSet,a,null),n&&Re(e,t,"src",a.src,a,null);return;case"input":oe("invalid",e);var o=s=i=r=null,u=null,c=null;for(n in a)if(a.hasOwnProperty(n)){var d=a[n];if(d!=null)switch(n){case"name":r=d;break;case"type":i=d;break;case"checked":u=d;break;case"defaultChecked":c=d;break;case"value":s=d;break;case"defaultValue":o=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(L(137,t));break;default:Re(e,t,n,d,a,null)}}oy(e,s,o,u,c,i,r,!1),su(e);return;case"select":oe("invalid",e),n=i=s=null;for(r in a)if(a.hasOwnProperty(r)&&(o=a[r],o!=null))switch(r){case"value":s=o;break;case"defaultValue":i=o;break;case"multiple":n=o;default:Re(e,t,r,o,a,null)}t=s,a=i,e.multiple=!!n,t!=null?ys(e,!!n,t,!1):a!=null&&ys(e,!!n,a,!0);return;case"textarea":oe("invalid",e),s=r=n=null;for(i in a)if(a.hasOwnProperty(i)&&(o=a[i],o!=null))switch(i){case"value":n=o;break;case"defaultValue":r=o;break;case"children":s=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(L(91));break;default:Re(e,t,i,o,a,null)}uy(e,n,r,s),su(e);return;case"option":for(u in a)if(a.hasOwnProperty(u)&&(n=a[u],n!=null))switch(u){case"selected":e.selected=n&&typeof n!="function"&&typeof n!="symbol";break;default:Re(e,t,u,n,a,null)}return;case"dialog":oe("beforetoggle",e),oe("toggle",e),oe("cancel",e),oe("close",e);break;case"iframe":case"object":oe("load",e);break;case"video":case"audio":for(n=0;n<mo.length;n++)oe(mo[n],e);break;case"image":oe("error",e),oe("load",e);break;case"details":oe("toggle",e);break;case"embed":case"source":case"link":oe("error",e),oe("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in a)if(a.hasOwnProperty(c)&&(n=a[c],n!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(L(137,t));default:Re(e,t,c,n,a,null)}return;default:if(of(t)){for(d in a)a.hasOwnProperty(d)&&(n=a[d],n!==void 0&&Hm(e,t,d,n,a,void 0));return}}for(o in a)a.hasOwnProperty(o)&&(n=a[o],n!=null&&Re(e,t,o,n,a,null))}function tE(e,t,a,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var r=null,s=null,i=null,o=null,u=null,c=null,d=null;for(p in a){var m=a[p];if(a.hasOwnProperty(p)&&m!=null)switch(p){case"checked":break;case"value":break;case"defaultValue":u=m;default:n.hasOwnProperty(p)||Re(e,t,p,null,n,m)}}for(var f in n){var p=n[f];if(m=a[f],n.hasOwnProperty(f)&&(p!=null||m!=null))switch(f){case"type":s=p;break;case"name":r=p;break;case"checked":c=p;break;case"defaultChecked":d=p;break;case"value":i=p;break;case"defaultValue":o=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(L(137,t));break;default:p!==m&&Re(e,t,f,p,n,m)}}pm(e,i,o,u,c,d,s,r);return;case"select":p=i=o=f=null;for(s in a)if(u=a[s],a.hasOwnProperty(s)&&u!=null)switch(s){case"value":break;case"multiple":p=u;default:n.hasOwnProperty(s)||Re(e,t,s,null,n,u)}for(r in n)if(s=n[r],u=a[r],n.hasOwnProperty(r)&&(s!=null||u!=null))switch(r){case"value":f=s;break;case"defaultValue":o=s;break;case"multiple":i=s;default:s!==u&&Re(e,t,r,s,n,u)}t=o,a=i,n=p,f!=null?ys(e,!!a,f,!1):!!n!=!!a&&(t!=null?ys(e,!!a,t,!0):ys(e,!!a,a?[]:"",!1));return;case"textarea":p=f=null;for(o in a)if(r=a[o],a.hasOwnProperty(o)&&r!=null&&!n.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:Re(e,t,o,null,n,r)}for(i in n)if(r=n[i],s=a[i],n.hasOwnProperty(i)&&(r!=null||s!=null))switch(i){case"value":f=r;break;case"defaultValue":p=r;break;case"children":break;case"dangerouslySetInnerHTML":if(r!=null)throw Error(L(91));break;default:r!==s&&Re(e,t,i,r,n,s)}ly(e,f,p);return;case"option":for(var b in a)if(f=a[b],a.hasOwnProperty(b)&&f!=null&&!n.hasOwnProperty(b))switch(b){case"selected":e.selected=!1;break;default:Re(e,t,b,null,n,f)}for(u in n)if(f=n[u],p=a[u],n.hasOwnProperty(u)&&f!==p&&(f!=null||p!=null))switch(u){case"selected":e.selected=f&&typeof f!="function"&&typeof f!="symbol";break;default:Re(e,t,u,f,n,p)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var y in a)f=a[y],a.hasOwnProperty(y)&&f!=null&&!n.hasOwnProperty(y)&&Re(e,t,y,null,n,f);for(c in n)if(f=n[c],p=a[c],n.hasOwnProperty(c)&&f!==p&&(f!=null||p!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(L(137,t));break;default:Re(e,t,c,f,n,p)}return;default:if(of(t)){for(var x in a)f=a[x],a.hasOwnProperty(x)&&f!==void 0&&!n.hasOwnProperty(x)&&Hm(e,t,x,void 0,n,f);for(d in n)f=n[d],p=a[d],!n.hasOwnProperty(d)||f===p||f===void 0&&p===void 0||Hm(e,t,d,f,n,p);return}}for(var g in a)f=a[g],a.hasOwnProperty(g)&&f!=null&&!n.hasOwnProperty(g)&&Re(e,t,g,null,n,f);for(m in n)f=n[m],p=a[m],!n.hasOwnProperty(m)||f===p||f==null&&p==null||Re(e,t,m,f,n,p)}var Km=null,Qm=null;function _u(e){return e.nodeType===9?e:e.ownerDocument}function Eg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function d0(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Vm(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var rm=null;function aE(){var e=window.event;return e&&e.type==="popstate"?e===rm?!1:(rm=e,!0):(rm=null,!1)}var m0=typeof setTimeout=="function"?setTimeout:void 0,nE=typeof clearTimeout=="function"?clearTimeout:void 0,Tg=typeof Promise=="function"?Promise:void 0,rE=typeof queueMicrotask=="function"?queueMicrotask:typeof Tg<"u"?function(e){return Tg.resolve(null).then(e).catch(sE)}:m0;function sE(e){setTimeout(function(){throw e})}function Zn(e){return e==="head"}function Ag(e,t){var a=t,n=0,r=0;do{var s=a.nextSibling;if(e.removeChild(a),s&&s.nodeType===8)if(a=s.data,a==="/$"){if(0<n&&8>n){a=n;var i=e.ownerDocument;if(a&1&&no(i.documentElement),a&2&&no(i.body),a&4)for(a=i.head,no(a),i=a.firstChild;i;){var o=i.nextSibling,u=i.nodeName;i[So]||u==="SCRIPT"||u==="STYLE"||u==="LINK"&&i.rel.toLowerCase()==="stylesheet"||a.removeChild(i),i=o}}if(r===0){e.removeChild(s),yo(t);return}r--}else a==="$"||a==="$?"||a==="$!"?r++:n=a.charCodeAt(0)-48;else n=0;a=s}while(a);yo(t)}function Gm(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Gm(a),sf(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function iE(e,t,a,n){for(;e.nodeType===1;){var r=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!n&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(n){if(!e[So])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(s=e.getAttribute("rel"),s==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(s!==r.rel||e.getAttribute("href")!==(r.href==null||r.href===""?null:r.href)||e.getAttribute("crossorigin")!==(r.crossOrigin==null?null:r.crossOrigin)||e.getAttribute("title")!==(r.title==null?null:r.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(s=e.getAttribute("src"),(s!==(r.src==null?null:r.src)||e.getAttribute("type")!==(r.type==null?null:r.type)||e.getAttribute("crossorigin")!==(r.crossOrigin==null?null:r.crossOrigin))&&s&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var s=r.name==null?null:""+r.name;if(r.type==="hidden"&&e.getAttribute("name")===s)return e}else return e;if(e=Na(e.nextSibling),e===null)break}return null}function oE(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Na(e.nextSibling),e===null))return null;return e}function Ym(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState==="complete"}function lE(e,t){var a=e.ownerDocument;if(e.data!=="$?"||a.readyState==="complete")t();else{var n=function(){t(),a.removeEventListener("DOMContentLoaded",n)};a.addEventListener("DOMContentLoaded",n),e._reactRetry=n}}function Na(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="F!"||t==="F")break;if(t==="/$")return null}}return e}var Jm=null;function Dg(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"){if(t===0)return e;t--}else a==="/$"&&t++}e=e.previousSibling}return null}function f0(e,t,a){switch(t=_u(a),e){case"html":if(e=t.documentElement,!e)throw Error(L(452));return e;case"head":if(e=t.head,!e)throw Error(L(453));return e;case"body":if(e=t.body,!e)throw Error(L(454));return e;default:throw Error(L(451))}}function no(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);sf(e)}var ba=new Map,Mg=new Set;function Ru(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var hn=ge.d;ge.d={f:uE,r:cE,D:dE,C:mE,L:fE,m:pE,X:vE,S:hE,M:gE};function uE(){var e=hn.f(),t=Bu();return e||t}function cE(e){var t=js(e);t!==null&&t.tag===5&&t.type==="form"?ib(t):hn.r(e)}var zs=typeof document>"u"?null:document;function p0(e,t,a){var n=zs;if(n&&typeof t=="string"&&t){var r=ha(t);r='link[rel="'+e+'"][href="'+r+'"]',typeof a=="string"&&(r+='[crossorigin="'+a+'"]'),Mg.has(r)||(Mg.add(r),e={rel:e,crossOrigin:a,href:t},n.querySelector(r)===null&&(t=n.createElement("link"),bt(t,"link",e),mt(t),n.head.appendChild(t)))}}function dE(e){hn.D(e),p0("dns-prefetch",e,null)}function mE(e,t){hn.C(e,t),p0("preconnect",e,t)}function fE(e,t,a){hn.L(e,t,a);var n=zs;if(n&&e&&t){var r='link[rel="preload"][as="'+ha(t)+'"]';t==="image"&&a&&a.imageSrcSet?(r+='[imagesrcset="'+ha(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(r+='[imagesizes="'+ha(a.imageSizes)+'"]')):r+='[href="'+ha(e)+'"]';var s=r;switch(t){case"style":s=Ls(e);break;case"script":s=Bs(e)}ba.has(s)||(e=Le({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),ba.set(s,e),n.querySelector(r)!==null||t==="style"&&n.querySelector(Mo(s))||t==="script"&&n.querySelector(Oo(s))||(t=n.createElement("link"),bt(t,"link",e),mt(t),n.head.appendChild(t)))}}function pE(e,t){hn.m(e,t);var a=zs;if(a&&e){var n=t&&typeof t.as=="string"?t.as:"script",r='link[rel="modulepreload"][as="'+ha(n)+'"][href="'+ha(e)+'"]',s=r;switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=Bs(e)}if(!ba.has(s)&&(e=Le({rel:"modulepreload",href:e},t),ba.set(s,e),a.querySelector(r)===null)){switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Oo(s)))return}n=a.createElement("link"),bt(n,"link",e),mt(n),a.head.appendChild(n)}}}function hE(e,t,a){hn.S(e,t,a);var n=zs;if(n&&e){var r=gs(n).hoistableStyles,s=Ls(e);t=t||"default";var i=r.get(s);if(!i){var o={loading:0,preload:null};if(i=n.querySelector(Mo(s)))o.loading=5;else{e=Le({rel:"stylesheet",href:e,"data-precedence":t},a),(a=ba.get(s))&&If(e,a);var u=i=n.createElement("link");mt(u),bt(u,"link",e),u._p=new Promise(function(c,d){u.onload=c,u.onerror=d}),u.addEventListener("load",function(){o.loading|=1}),u.addEventListener("error",function(){o.loading|=2}),o.loading|=4,Zl(i,t,n)}i={type:"stylesheet",instance:i,count:1,state:o},r.set(s,i)}}}function vE(e,t){hn.X(e,t);var a=zs;if(a&&e){var n=gs(a).hoistableScripts,r=Bs(e),s=n.get(r);s||(s=a.querySelector(Oo(r)),s||(e=Le({src:e,async:!0},t),(t=ba.get(r))&&Hf(e,t),s=a.createElement("script"),mt(s),bt(s,"link",e),a.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},n.set(r,s))}}function gE(e,t){hn.M(e,t);var a=zs;if(a&&e){var n=gs(a).hoistableScripts,r=Bs(e),s=n.get(r);s||(s=a.querySelector(Oo(r)),s||(e=Le({src:e,async:!0,type:"module"},t),(t=ba.get(r))&&Hf(e,t),s=a.createElement("script"),mt(s),bt(s,"link",e),a.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},n.set(r,s))}}function Og(e,t,a,n){var r=(r=zn.current)?Ru(r):null;if(!r)throw Error(L(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=Ls(a.href),a=gs(r).hoistableStyles,n=a.get(t),n||(n={type:"style",instance:null,count:0,state:null},a.set(t,n)),n):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=Ls(a.href);var s=gs(r).hoistableStyles,i=s.get(e);if(i||(r=r.ownerDocument||r,i={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(e,i),(s=r.querySelector(Mo(e)))&&!s._p&&(i.instance=s,i.state.loading=5),ba.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},ba.set(e,a),s||yE(r,e,a,i.state))),t&&n===null)throw Error(L(528,""));return i}if(t&&n!==null)throw Error(L(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Bs(a),a=gs(r).hoistableScripts,n=a.get(t),n||(n={type:"script",instance:null,count:0,state:null},a.set(t,n)),n):{type:"void",instance:null,count:0,state:null};default:throw Error(L(444,e))}}function Ls(e){return'href="'+ha(e)+'"'}function Mo(e){return'link[rel="stylesheet"]['+e+"]"}function h0(e){return Le({},e,{"data-precedence":e.precedence,precedence:null})}function yE(e,t,a,n){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?n.loading=1:(t=e.createElement("link"),n.preload=t,t.addEventListener("load",function(){return n.loading|=1}),t.addEventListener("error",function(){return n.loading|=2}),bt(t,"link",a),mt(t),e.head.appendChild(t))}function Bs(e){return'[src="'+ha(e)+'"]'}function Oo(e){return"script[async]"+e}function Lg(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var n=e.querySelector('style[data-href~="'+ha(a.href)+'"]');if(n)return t.instance=n,mt(n),n;var r=Le({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return n=(e.ownerDocument||e).createElement("style"),mt(n),bt(n,"style",r),Zl(n,a.precedence,e),t.instance=n;case"stylesheet":r=Ls(a.href);var s=e.querySelector(Mo(r));if(s)return t.state.loading|=4,t.instance=s,mt(s),s;n=h0(a),(r=ba.get(r))&&If(n,r),s=(e.ownerDocument||e).createElement("link"),mt(s);var i=s;return i._p=new Promise(function(o,u){i.onload=o,i.onerror=u}),bt(s,"link",n),t.state.loading|=4,Zl(s,a.precedence,e),t.instance=s;case"script":return s=Bs(a.src),(r=e.querySelector(Oo(s)))?(t.instance=r,mt(r),r):(n=a,(r=ba.get(s))&&(n=Le({},a),Hf(n,r)),e=e.ownerDocument||e,r=e.createElement("script"),mt(r),bt(r,"link",n),e.head.appendChild(r),t.instance=r);case"void":return null;default:throw Error(L(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(n=t.instance,t.state.loading|=4,Zl(n,a.precedence,e));return t.instance}function Zl(e,t,a){for(var n=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),r=n.length?n[n.length-1]:null,s=r,i=0;i<n.length;i++){var o=n[i];if(o.dataset.precedence===t)s=o;else if(s!==r)break}s?s.parentNode.insertBefore(e,s.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function If(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Hf(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Wl=null;function Pg(e,t,a){if(Wl===null){var n=new Map,r=Wl=new Map;r.set(a,n)}else r=Wl,n=r.get(a),n||(n=new Map,r.set(a,n));if(n.has(e))return n;for(n.set(e,null),a=a.getElementsByTagName(e),r=0;r<a.length;r++){var s=a[r];if(!(s[So]||s[St]||e==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var i=s.getAttribute(t)||"";i=e+i;var o=n.get(i);o?o.push(s):n.set(i,[s])}}return n}function jg(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function bE(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function v0(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}var po=null;function xE(){}function $E(e,t,a){if(po===null)throw Error(L(475));var n=po;if(t.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(t.state.loading&4)===0){if(t.instance===null){var r=Ls(a.href),s=e.querySelector(Mo(r));if(s){e=s._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(n.count++,n=ku.bind(n),e.then(n,n)),t.state.loading|=4,t.instance=s,mt(s);return}s=e.ownerDocument||e,a=h0(a),(r=ba.get(r))&&If(a,r),s=s.createElement("link"),mt(s);var i=s;i._p=new Promise(function(o,u){i.onload=o,i.onerror=u}),bt(s,"link",a),t.instance=s}n.stylesheets===null&&(n.stylesheets=new Map),n.stylesheets.set(t,e),(e=t.state.preload)&&(t.state.loading&3)===0&&(n.count++,t=ku.bind(n),e.addEventListener("load",t),e.addEventListener("error",t))}}function wE(){if(po===null)throw Error(L(475));var e=po;return e.stylesheets&&e.count===0&&Xm(e,e.stylesheets),0<e.count?function(t){var a=setTimeout(function(){if(e.stylesheets&&Xm(e,e.stylesheets),e.unsuspend){var n=e.unsuspend;e.unsuspend=null,n()}},6e4);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(a)}}:null}function ku(){if(this.count--,this.count===0){if(this.stylesheets)Xm(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Cu=null;function Xm(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Cu=new Map,t.forEach(SE,e),Cu=null,ku.call(e))}function SE(e,t){if(!(t.state.loading&4)){var a=Cu.get(e);if(a)var n=a.get(null);else{a=new Map,Cu.set(e,a);for(var r=e.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<r.length;s++){var i=r[s];(i.nodeName==="LINK"||i.getAttribute("media")!=="not all")&&(a.set(i.dataset.precedence,i),n=i)}n&&a.set(null,n)}r=t.instance,i=r.getAttribute("data-precedence"),s=a.get(i)||n,s===n&&a.set(null,r),a.set(i,r),this.count++,n=ku.bind(this),r.addEventListener("load",n),r.addEventListener("error",n),s?s.parentNode.insertBefore(r,s.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(r,e.firstChild)),t.state.loading|=4}}var ho={$$typeof:nn,Provider:null,Consumer:null,_currentValue:gr,_currentValue2:gr,_threadCount:0};function NE(e,t,a,n,r,s,i,o){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ed(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ed(0),this.hiddenUpdates=Ed(null),this.identifierPrefix=n,this.onUncaughtError=r,this.onCaughtError=s,this.onRecoverableError=i,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=o,this.incompleteTransitions=new Map}function g0(e,t,a,n,r,s,i,o,u,c,d,m){return e=new NE(e,t,a,i,o,u,c,m),t=1,s===!0&&(t|=24),s=Wt(3,null,null,t),e.current=s,s.stateNode=e,t=yf(),t.refCount++,e.pooledCache=t,t.refCount++,s.memoizedState={element:n,isDehydrated:a,cache:t},xf(s),e}function y0(e){return e?(e=fs,e):fs}function b0(e,t,a,n,r,s){r=y0(r),n.context===null?n.context=r:n.pendingContext=r,n=Bn(t),n.payload={element:a},s=s===void 0?null:s,s!==null&&(n.callback=s),a=qn(e,n,t),a!==null&&(na(a,e,t),Yi(a,e,t))}function Ug(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function Kf(e,t){Ug(e,t),(e=e.alternate)&&Ug(e,t)}function x0(e){if(e.tag===13){var t=Us(e,67108864);t!==null&&na(t,e,67108864),Kf(e,67108864)}}var Eu=!0;function _E(e,t,a,n){var r=ne.T;ne.T=null;var s=ge.p;try{ge.p=2,Qf(e,t,a,n)}finally{ge.p=s,ne.T=r}}function RE(e,t,a,n){var r=ne.T;ne.T=null;var s=ge.p;try{ge.p=8,Qf(e,t,a,n)}finally{ge.p=s,ne.T=r}}function Qf(e,t,a,n){if(Eu){var r=Zm(n);if(r===null)nm(e,t,n,Tu,a),Fg(e,n);else if(CE(r,e,t,a,n))n.stopPropagation();else if(Fg(e,n),t&4&&-1<kE.indexOf(e)){for(;r!==null;){var s=js(r);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var i=pr(s.pendingLanes);if(i!==0){var o=s;for(o.pendingLanes|=2,o.entangledLanes|=2;i;){var u=1<<31-ta(i);o.entanglements[1]|=u,i&=~u}qa(s),(Se&6)===0&&(xu=Fa()+500,Do(0,!1))}}break;case 13:o=Us(s,2),o!==null&&na(o,s,2),Bu(),Kf(s,2)}if(s=Zm(n),s===null&&nm(e,t,n,Tu,a),s===r)break;r=s}r!==null&&n.stopPropagation()}else nm(e,t,n,null,a)}}function Zm(e){return e=lf(e),Vf(e)}var Tu=null;function Vf(e){if(Tu=null,e=os(e),e!==null){var t=bo(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=Kg(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Tu=e,null}function $0(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(pk()){case Yg:return 2;case Jg:return 8;case ru:case hk:return 32;case Xg:return 268435456;default:return 32}default:return 32}}var Wm=!1,Kn=null,Qn=null,Vn=null,vo=new Map,go=new Map,Ln=[],kE="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Fg(e,t){switch(e){case"focusin":case"focusout":Kn=null;break;case"dragenter":case"dragleave":Qn=null;break;case"mouseover":case"mouseout":Vn=null;break;case"pointerover":case"pointerout":vo.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":go.delete(t.pointerId)}}function Ui(e,t,a,n,r,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:a,eventSystemFlags:n,nativeEvent:s,targetContainers:[r]},t!==null&&(t=js(t),t!==null&&x0(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,r!==null&&t.indexOf(r)===-1&&t.push(r),e)}function CE(e,t,a,n,r){switch(t){case"focusin":return Kn=Ui(Kn,e,t,a,n,r),!0;case"dragenter":return Qn=Ui(Qn,e,t,a,n,r),!0;case"mouseover":return Vn=Ui(Vn,e,t,a,n,r),!0;case"pointerover":var s=r.pointerId;return vo.set(s,Ui(vo.get(s)||null,e,t,a,n,r)),!0;case"gotpointercapture":return s=r.pointerId,go.set(s,Ui(go.get(s)||null,e,t,a,n,r)),!0}return!1}function w0(e){var t=os(e.target);if(t!==null){var a=bo(t);if(a!==null){if(t=a.tag,t===13){if(t=Kg(a),t!==null){e.blockedOn=t,Sk(e.priority,function(){if(a.tag===13){var n=aa();n=nf(n);var r=Us(a,n);r!==null&&na(r,a,n),Kf(a,n)}});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function eu(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=Zm(e.nativeEvent);if(a===null){a=e.nativeEvent;var n=new a.constructor(a.type,a);vm=n,a.target.dispatchEvent(n),vm=null}else return t=js(a),t!==null&&x0(t),e.blockedOn=a,!1;t.shift()}return!0}function zg(e,t,a){eu(e)&&a.delete(t)}function EE(){Wm=!1,Kn!==null&&eu(Kn)&&(Kn=null),Qn!==null&&eu(Qn)&&(Qn=null),Vn!==null&&eu(Vn)&&(Vn=null),vo.forEach(zg),go.forEach(zg)}function zl(e,t){e.blockedOn===t&&(e.blockedOn=null,Wm||(Wm=!0,it.unstable_scheduleCallback(it.unstable_NormalPriority,EE)))}var Bl=null;function Bg(e){Bl!==e&&(Bl=e,it.unstable_scheduleCallback(it.unstable_NormalPriority,function(){Bl===e&&(Bl=null);for(var t=0;t<e.length;t+=3){var a=e[t],n=e[t+1],r=e[t+2];if(typeof n!="function"){if(Vf(n||a)===null)continue;break}var s=js(a);s!==null&&(e.splice(t,3),t-=3,Dm(s,{pending:!0,data:r,method:a.method,action:n},n,r))}}))}function yo(e){function t(u){return zl(u,e)}Kn!==null&&zl(Kn,e),Qn!==null&&zl(Qn,e),Vn!==null&&zl(Vn,e),vo.forEach(t),go.forEach(t);for(var a=0;a<Ln.length;a++){var n=Ln[a];n.blockedOn===e&&(n.blockedOn=null)}for(;0<Ln.length&&(a=Ln[0],a.blockedOn===null);)w0(a),a.blockedOn===null&&Ln.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(n=0;n<a.length;n+=3){var r=a[n],s=a[n+1],i=r[Kt]||null;if(typeof s=="function")i||Bg(a);else if(i){var o=null;if(s&&s.hasAttribute("formAction")){if(r=s,i=s[Kt]||null)o=i.formAction;else if(Vf(r)!==null)continue}else o=i.action;typeof o=="function"?a[n+1]=o:(a.splice(n,3),n-=3),Bg(a)}}}function Gf(e){this._internalRoot=e}Ku.prototype.render=Gf.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(L(409));var a=t.current,n=aa();b0(a,n,e,t,null,null)};Ku.prototype.unmount=Gf.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;b0(e.current,2,null,e,null,null),Bu(),t[Ps]=null}};function Ku(e){this._internalRoot=e}Ku.prototype.unstable_scheduleHydration=function(e){if(e){var t=ay();e={blockedOn:null,target:e,priority:t};for(var a=0;a<Ln.length&&t!==0&&t<Ln[a].priority;a++);Ln.splice(a,0,e),a===0&&w0(e)}};var qg=Ig.version;if(qg!=="19.1.0")throw Error(L(527,qg,"19.1.0"));ge.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(L(188)):(e=Object.keys(e).join(","),Error(L(268,e)));return e=ok(t),e=e!==null?Qg(e):null,e=e===null?null:e.stateNode,e};var TE={bundleType:0,version:"19.1.0",rendererPackageName:"react-dom",currentDispatcherRef:ne,reconcilerVersion:"19.1.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Fi=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Fi.isDisabled&&Fi.supportsFiber))try{xo=Fi.inject(TE),ea=Fi}catch{}var Fi;Qu.createRoot=function(e,t){if(!Hg(e))throw Error(L(299));var a=!1,n="",r=gb,s=yb,i=bb,o=null;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onUncaughtError!==void 0&&(r=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(i=t.onRecoverableError),t.unstable_transitionCallbacks!==void 0&&(o=t.unstable_transitionCallbacks)),t=g0(e,1,!1,null,null,a,n,r,s,i,o,null),e[Ps]=t.current,qf(e),new Gf(t)};Qu.hydrateRoot=function(e,t,a){if(!Hg(e))throw Error(L(299));var n=!1,r="",s=gb,i=yb,o=bb,u=null,c=null;return a!=null&&(a.unstable_strictMode===!0&&(n=!0),a.identifierPrefix!==void 0&&(r=a.identifierPrefix),a.onUncaughtError!==void 0&&(s=a.onUncaughtError),a.onCaughtError!==void 0&&(i=a.onCaughtError),a.onRecoverableError!==void 0&&(o=a.onRecoverableError),a.unstable_transitionCallbacks!==void 0&&(u=a.unstable_transitionCallbacks),a.formState!==void 0&&(c=a.formState)),t=g0(e,1,!0,t,a??null,n,r,s,i,o,u,c),t.context=y0(null),a=t.current,n=aa(),n=nf(n),r=Bn(n),r.callback=null,qn(a,r,n),a=n,t.current.lanes=a,wo(t,a),qa(t),e[Ps]=t.current,qf(e),new Ku(t)};Qu.version="19.1.0"});var R0=Sn((VL,_0)=>{"use strict";function N0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(N0)}catch(e){console.error(e)}}N0(),_0.exports=S0()});var Ft=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(e){return this.listeners.add(e),this.onSubscribe(),()=>{this.listeners.delete(e),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}};var zR={setTimeout:(e,t)=>setTimeout(e,t),clearTimeout:e=>clearTimeout(e),setInterval:(e,t)=>setInterval(e,t),clearInterval:e=>clearInterval(e)},BR=class{#t=zR;#e=!1;setTimeoutProvider(e){this.#t=e}setTimeout(e,t){return this.#t.setTimeout(e,t)}clearTimeout(e){this.#t.clearTimeout(e)}setInterval(e,t){return this.#t.setInterval(e,t)}clearInterval(e){this.#t.clearInterval(e)}},Aa=new BR;function Lh(e){setTimeout(e,0)}var zt=typeof window>"u"||"Deno"in globalThis;function je(){}function Uh(e,t){return typeof e=="function"?e(t):e}function xi(e){return typeof e=="number"&&e>=0&&e!==1/0}function rl(e,t){return Math.max(e+(t||0)-Date.now(),0)}function wa(e,t){return typeof e=="function"?e(t):e}function Bt(e,t){return typeof e=="function"?e(t):e}function sl(e,t){let{type:a="all",exact:n,fetchStatus:r,predicate:s,queryKey:i,stale:o}=e;if(i){if(n){if(t.queryHash!==$i(i,t.options))return!1}else if(!dr(t.queryKey,i))return!1}if(a!=="all"){let u=t.isActive();if(a==="active"&&!u||a==="inactive"&&u)return!1}return!(typeof o=="boolean"&&t.isStale()!==o||r&&r!==t.state.fetchStatus||s&&!s(t))}function il(e,t){let{exact:a,status:n,predicate:r,mutationKey:s}=e;if(s){if(!t.options.mutationKey)return!1;if(a){if(Da(t.options.mutationKey)!==Da(s))return!1}else if(!dr(t.options.mutationKey,s))return!1}return!(n&&t.state.status!==n||r&&!r(t))}function $i(e,t){return(t?.queryKeyHashFn||Da)(e)}function Da(e){return JSON.stringify(e,(t,a)=>id(a)?Object.keys(a).sort().reduce((n,r)=>(n[r]=a[r],n),{}):a)}function dr(e,t){return e===t?!0:typeof e!=typeof t?!1:e&&t&&typeof e=="object"&&typeof t=="object"?Object.keys(t).every(a=>dr(e[a],t[a])):!1}var qR=Object.prototype.hasOwnProperty;function wi(e,t){if(e===t)return e;let a=Ph(e)&&Ph(t);if(!a&&!(id(e)&&id(t)))return t;let r=(a?e:Object.keys(e)).length,s=a?t:Object.keys(t),i=s.length,o=a?new Array(i):{},u=0;for(let c=0;c<i;c++){let d=a?c:s[c],m=e[d],f=t[d];if(m===f){o[d]=m,(a?c<r:qR.call(e,d))&&u++;continue}if(m===null||f===null||typeof m!="object"||typeof f!="object"){o[d]=f;continue}let p=wi(m,f);o[d]=p,p===m&&u++}return r===i&&u===r?e:o}function Nn(e,t){if(!t||Object.keys(e).length!==Object.keys(t).length)return!1;for(let a in e)if(e[a]!==t[a])return!1;return!0}function Ph(e){return Array.isArray(e)&&e.length===Object.keys(e).length}function id(e){if(!jh(e))return!1;let t=e.constructor;if(t===void 0)return!0;let a=t.prototype;return!(!jh(a)||!a.hasOwnProperty("isPrototypeOf")||Object.getPrototypeOf(e)!==Object.prototype)}function jh(e){return Object.prototype.toString.call(e)==="[object Object]"}function Fh(e){return new Promise(t=>{Aa.setTimeout(t,e)})}function Si(e,t,a){return typeof a.structuralSharing=="function"?a.structuralSharing(e,t):a.structuralSharing!==!1?wi(e,t):t}function zh(e,t,a=0){let n=[...e,t];return a&&n.length>a?n.slice(1):n}function Bh(e,t,a=0){let n=[t,...e];return a&&n.length>a?n.slice(0,-1):n}var Qr=Symbol();function ol(e,t){return!e.queryFn&&t?.initialPromise?()=>t.initialPromise:!e.queryFn||e.queryFn===Qr?()=>Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`)):e.queryFn}function Ni(e,t){return typeof e=="function"?e(...t):!!e}var IR=class extends Ft{#t;#e;#a;constructor(){super(),this.#a=e=>{if(!zt&&window.addEventListener){let t=()=>e();return window.addEventListener("visibilitychange",t,!1),()=>{window.removeEventListener("visibilitychange",t)}}}}onSubscribe(){this.#e||this.setEventListener(this.#a)}onUnsubscribe(){this.hasListeners()||(this.#e?.(),this.#e=void 0)}setEventListener(e){this.#a=e,this.#e?.(),this.#e=e(t=>{typeof t=="boolean"?this.setFocused(t):this.onFocus()})}setFocused(e){this.#t!==e&&(this.#t=e,this.onFocus())}onFocus(){let e=this.isFocused();this.listeners.forEach(t=>{t(e)})}isFocused(){return typeof this.#t=="boolean"?this.#t:globalThis.document?.visibilityState!=="hidden"}},Vr=new IR;function _i(){let e,t,a=new Promise((r,s)=>{e=r,t=s});a.status="pending",a.catch(()=>{});function n(r){Object.assign(a,r),delete a.resolve,delete a.reject}return a.resolve=r=>{n({status:"fulfilled",value:r}),e(r)},a.reject=r=>{n({status:"rejected",reason:r}),t(r)},a}var qh=Lh;function HR(){let e=[],t=0,a=o=>{o()},n=o=>{o()},r=qh,s=o=>{t?e.push(o):r(()=>{a(o)})},i=()=>{let o=e;e=[],o.length&&r(()=>{n(()=>{o.forEach(u=>{a(u)})})})};return{batch:o=>{let u;t++;try{u=o()}finally{t--,t||i()}return u},batchCalls:o=>(...u)=>{s(()=>{o(...u)})},schedule:s,setNotifyFunction:o=>{a=o},setBatchNotifyFunction:o=>{n=o},setScheduler:o=>{r=o}}}var ce=HR();var KR=class extends Ft{#t=!0;#e;#a;constructor(){super(),this.#a=e=>{if(!zt&&window.addEventListener){let t=()=>e(!0),a=()=>e(!1);return window.addEventListener("online",t,!1),window.addEventListener("offline",a,!1),()=>{window.removeEventListener("online",t),window.removeEventListener("offline",a)}}}}onSubscribe(){this.#e||this.setEventListener(this.#a)}onUnsubscribe(){this.hasListeners()||(this.#e?.(),this.#e=void 0)}setEventListener(e){this.#a=e,this.#e?.(),this.#e=e(this.setOnline.bind(this))}setOnline(e){this.#t!==e&&(this.#t=e,this.listeners.forEach(a=>{a(e)}))}isOnline(){return this.#t}},Gr=new KR;function QR(e){return Math.min(1e3*2**e,3e4)}function od(e){return(e??"online")==="online"?Gr.isOnline():!0}var ll=class extends Error{constructor(e){super("CancelledError"),this.revert=e?.revert,this.silent=e?.silent}};function ul(e){let t=!1,a=0,n,r=_i(),s=()=>r.status!=="pending",i=y=>{if(!s()){let x=new ll(y);f(x),e.onCancel?.(x)}},o=()=>{t=!0},u=()=>{t=!1},c=()=>Vr.isFocused()&&(e.networkMode==="always"||Gr.isOnline())&&e.canRun(),d=()=>od(e.networkMode)&&e.canRun(),m=y=>{s()||(n?.(),r.resolve(y))},f=y=>{s()||(n?.(),r.reject(y))},p=()=>new Promise(y=>{n=x=>{(s()||c())&&y(x)},e.onPause?.()}).then(()=>{n=void 0,s()||e.onContinue?.()}),b=()=>{if(s())return;let y,x=a===0?e.initialPromise:void 0;try{y=x??e.fn()}catch(g){y=Promise.reject(g)}Promise.resolve(y).then(m).catch(g=>{if(s())return;let v=e.retry??(zt?0:3),$=e.retryDelay??QR,w=typeof $=="function"?$(a,g):$,S=v===!0||typeof v=="number"&&a<v||typeof v=="function"&&v(a,g);if(t||!S){f(g);return}a++,e.onFail?.(a,g),Fh(w).then(()=>c()?void 0:p()).then(()=>{t?f(g):b()})})};return{promise:r,status:()=>r.status,cancel:i,continue:()=>(n?.(),r),cancelRetry:o,continueRetry:u,canStart:d,start:()=>(d()?b():p().then(b),r)}}var cl=class{#t;destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),xi(this.gcTime)&&(this.#t=Aa.setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(e){this.gcTime=Math.max(this.gcTime||0,e??(zt?1/0:5*60*1e3))}clearGcTimeout(){this.#t&&(Aa.clearTimeout(this.#t),this.#t=void 0)}};var Hh=class extends cl{#t;#e;#a;#n;#r;#s;#o;constructor(e){super(),this.#o=!1,this.#s=e.defaultOptions,this.setOptions(e.options),this.observers=[],this.#n=e.client,this.#a=this.#n.getQueryCache(),this.queryKey=e.queryKey,this.queryHash=e.queryHash,this.#t=Ih(this.options),this.state=e.state??this.#t,this.scheduleGc()}get meta(){return this.options.meta}get promise(){return this.#r?.promise}setOptions(e){if(this.options={...this.#s,...e},this.updateGcTime(this.options.gcTime),this.state&&this.state.data===void 0){let t=Ih(this.options);t.data!==void 0&&(this.setData(t.data,{updatedAt:t.dataUpdatedAt,manual:!0}),this.#t=t)}}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&this.#a.remove(this)}setData(e,t){let a=Si(this.state.data,e,this.options);return this.#i({data:a,type:"success",dataUpdatedAt:t?.updatedAt,manual:t?.manual}),a}setState(e,t){this.#i({type:"setState",state:e,setStateOptions:t})}cancel(e){let t=this.#r?.promise;return this.#r?.cancel(e),t?t.then(je).catch(je):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(this.#t)}isActive(){return this.observers.some(e=>Bt(e.options.enabled,this)!==!1)}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===Qr||this.state.dataUpdateCount+this.state.errorUpdateCount===0}isStatic(){return this.getObserversCount()>0?this.observers.some(e=>wa(e.options.staleTime,this)==="static"):!1}isStale(){return this.getObserversCount()>0?this.observers.some(e=>e.getCurrentResult().isStale):this.state.data===void 0||this.state.isInvalidated}isStaleByTime(e=0){return this.state.data===void 0?!0:e==="static"?!1:this.state.isInvalidated?!0:!rl(this.state.dataUpdatedAt,e)}onFocus(){this.observers.find(t=>t.shouldFetchOnWindowFocus())?.refetch({cancelRefetch:!1}),this.#r?.continue()}onOnline(){this.observers.find(t=>t.shouldFetchOnReconnect())?.refetch({cancelRefetch:!1}),this.#r?.continue()}addObserver(e){this.observers.includes(e)||(this.observers.push(e),this.clearGcTimeout(),this.#a.notify({type:"observerAdded",query:this,observer:e}))}removeObserver(e){this.observers.includes(e)&&(this.observers=this.observers.filter(t=>t!==e),this.observers.length||(this.#r&&(this.#o?this.#r.cancel({revert:!0}):this.#r.cancelRetry()),this.scheduleGc()),this.#a.notify({type:"observerRemoved",query:this,observer:e}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||this.#i({type:"invalidate"})}async fetch(e,t){if(this.state.fetchStatus!=="idle"&&this.#r?.status()!=="rejected"){if(this.state.data!==void 0&&t?.cancelRefetch)this.cancel({silent:!0});else if(this.#r)return this.#r.continueRetry(),this.#r.promise}if(e&&this.setOptions(e),!this.options.queryFn){let o=this.observers.find(u=>u.options.queryFn);o&&this.setOptions(o.options)}let a=new AbortController,n=o=>{Object.defineProperty(o,"signal",{enumerable:!0,get:()=>(this.#o=!0,a.signal)})},r=()=>{let o=ol(this.options,t),c=(()=>{let d={client:this.#n,queryKey:this.queryKey,meta:this.meta};return n(d),d})();return this.#o=!1,this.options.persister?this.options.persister(o,c,this):o(c)},i=(()=>{let o={fetchOptions:t,options:this.options,queryKey:this.queryKey,client:this.#n,state:this.state,fetchFn:r};return n(o),o})();this.options.behavior?.onFetch(i,this),this.#e=this.state,(this.state.fetchStatus==="idle"||this.state.fetchMeta!==i.fetchOptions?.meta)&&this.#i({type:"fetch",meta:i.fetchOptions?.meta}),this.#r=ul({initialPromise:t?.initialPromise,fn:i.fetchFn,onCancel:o=>{o instanceof ll&&o.revert&&this.setState({...this.#e,fetchStatus:"idle"}),a.abort()},onFail:(o,u)=>{this.#i({type:"failed",failureCount:o,error:u})},onPause:()=>{this.#i({type:"pause"})},onContinue:()=>{this.#i({type:"continue"})},retry:i.options.retry,retryDelay:i.options.retryDelay,networkMode:i.options.networkMode,canRun:()=>!0});try{let o=await this.#r.start();if(o===void 0)throw new Error(`${this.queryHash} data is undefined`);return this.setData(o),this.#a.config.onSuccess?.(o,this),this.#a.config.onSettled?.(o,this.state.error,this),o}catch(o){if(o instanceof ll){if(o.silent)return this.#r.promise;if(o.revert){if(this.state.data===void 0)throw o;return this.state.data}}throw this.#i({type:"error",error:o}),this.#a.config.onError?.(o,this),this.#a.config.onSettled?.(this.state.data,o,this),o}finally{this.scheduleGc()}}#i(e){let t=a=>{switch(e.type){case"failed":return{...a,fetchFailureCount:e.failureCount,fetchFailureReason:e.error};case"pause":return{...a,fetchStatus:"paused"};case"continue":return{...a,fetchStatus:"fetching"};case"fetch":return{...a,...ld(a.data,this.options),fetchMeta:e.meta??null};case"success":let n={...a,data:e.data,dataUpdateCount:a.dataUpdateCount+1,dataUpdatedAt:e.dataUpdatedAt??Date.now(),error:null,isInvalidated:!1,status:"success",...!e.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};return this.#e=e.manual?n:void 0,n;case"error":let r=e.error;return{...a,error:r,errorUpdateCount:a.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:a.fetchFailureCount+1,fetchFailureReason:r,fetchStatus:"idle",status:"error"};case"invalidate":return{...a,isInvalidated:!0};case"setState":return{...a,...e.state}}};this.state=t(this.state),ce.batch(()=>{this.observers.forEach(a=>{a.onQueryUpdate()}),this.#a.notify({query:this,type:"updated",action:e})})}};function ld(e,t){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:od(t.networkMode)?"fetching":"paused",...e===void 0&&{error:null,status:"pending"}}}function Ih(e){let t=typeof e.initialData=="function"?e.initialData():e.initialData,a=t!==void 0,n=a?typeof e.initialDataUpdatedAt=="function"?e.initialDataUpdatedAt():e.initialDataUpdatedAt:0;return{data:t,dataUpdateCount:0,dataUpdatedAt:a?n??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:a?"success":"pending",fetchStatus:"idle"}}var mr=class extends Ft{constructor(e,t){super(),this.options=t,this.#t=e,this.#i=null,this.#o=_i(),this.bindMethods(),this.setOptions(t)}#t;#e=void 0;#a=void 0;#n=void 0;#r;#s;#o;#i;#f;#d;#m;#u;#c;#l;#h=new Set;bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(this.#e.addObserver(this),Kh(this.#e,this.options)?this.#p():this.updateResult(),this.#b())}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return ud(this.#e,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return ud(this.#e,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,this.#x(),this.#$(),this.#e.removeObserver(this)}setOptions(e){let t=this.options,a=this.#e;if(this.options=this.#t.defaultQueryOptions(e),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof Bt(this.options.enabled,this.#e)!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");this.#w(),this.#e.setOptions(this.options),t._defaulted&&!Nn(this.options,t)&&this.#t.getQueryCache().notify({type:"observerOptionsUpdated",query:this.#e,observer:this});let n=this.hasListeners();n&&Qh(this.#e,a,this.options,t)&&this.#p(),this.updateResult(),n&&(this.#e!==a||Bt(this.options.enabled,this.#e)!==Bt(t.enabled,this.#e)||wa(this.options.staleTime,this.#e)!==wa(t.staleTime,this.#e))&&this.#v();let r=this.#g();n&&(this.#e!==a||Bt(this.options.enabled,this.#e)!==Bt(t.enabled,this.#e)||r!==this.#l)&&this.#y(r)}getOptimisticResult(e){let t=this.#t.getQueryCache().build(this.#t,e),a=this.createResult(t,e);return GR(this,a)&&(this.#n=a,this.#s=this.options,this.#r=this.#e.state),a}getCurrentResult(){return this.#n}trackResult(e,t){return new Proxy(e,{get:(a,n)=>(this.trackProp(n),t?.(n),n==="promise"&&!this.options.experimental_prefetchInRender&&this.#o.status==="pending"&&this.#o.reject(new Error("experimental_prefetchInRender feature flag is not enabled")),Reflect.get(a,n))})}trackProp(e){this.#h.add(e)}getCurrentQuery(){return this.#e}refetch({...e}={}){return this.fetch({...e})}fetchOptimistic(e){let t=this.#t.defaultQueryOptions(e),a=this.#t.getQueryCache().build(this.#t,t);return a.fetch().then(()=>this.createResult(a,t))}fetch(e){return this.#p({...e,cancelRefetch:e.cancelRefetch??!0}).then(()=>(this.updateResult(),this.#n))}#p(e){this.#w();let t=this.#e.fetch(this.options,e);return e?.throwOnError||(t=t.catch(je)),t}#v(){this.#x();let e=wa(this.options.staleTime,this.#e);if(zt||this.#n.isStale||!xi(e))return;let a=rl(this.#n.dataUpdatedAt,e)+1;this.#u=Aa.setTimeout(()=>{this.#n.isStale||this.updateResult()},a)}#g(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(this.#e):this.options.refetchInterval)??!1}#y(e){this.#$(),this.#l=e,!(zt||Bt(this.options.enabled,this.#e)===!1||!xi(this.#l)||this.#l===0)&&(this.#c=Aa.setInterval(()=>{(this.options.refetchIntervalInBackground||Vr.isFocused())&&this.#p()},this.#l))}#b(){this.#v(),this.#y(this.#g())}#x(){this.#u&&(Aa.clearTimeout(this.#u),this.#u=void 0)}#$(){this.#c&&(Aa.clearInterval(this.#c),this.#c=void 0)}createResult(e,t){let a=this.#e,n=this.options,r=this.#n,s=this.#r,i=this.#s,u=e!==a?e.state:this.#a,{state:c}=e,d={...c},m=!1,f;if(t._optimisticResults){let E=this.hasListeners(),O=!E&&Kh(e,t),j=E&&Qh(e,a,t,n);(O||j)&&(d={...d,...ld(c.data,e.options)}),t._optimisticResults==="isRestoring"&&(d.fetchStatus="idle")}let{error:p,errorUpdatedAt:b,status:y}=d;f=d.data;let x=!1;if(t.placeholderData!==void 0&&f===void 0&&y==="pending"){let E;r?.isPlaceholderData&&t.placeholderData===i?.placeholderData?(E=r.data,x=!0):E=typeof t.placeholderData=="function"?t.placeholderData(this.#m?.state.data,this.#m):t.placeholderData,E!==void 0&&(y="success",f=Si(r?.data,E,t),m=!0)}if(t.select&&f!==void 0&&!x)if(r&&f===s?.data&&t.select===this.#f)f=this.#d;else try{this.#f=t.select,f=t.select(f),f=Si(r?.data,f,t),this.#d=f,this.#i=null}catch(E){this.#i=E}this.#i&&(p=this.#i,f=this.#d,b=Date.now(),y="error");let g=d.fetchStatus==="fetching",v=y==="pending",$=y==="error",w=v&&g,S=f!==void 0,C={status:y,fetchStatus:d.fetchStatus,isPending:v,isSuccess:y==="success",isError:$,isInitialLoading:w,isLoading:w,data:f,dataUpdatedAt:d.dataUpdatedAt,error:p,errorUpdatedAt:b,failureCount:d.fetchFailureCount,failureReason:d.fetchFailureReason,errorUpdateCount:d.errorUpdateCount,isFetched:d.dataUpdateCount>0||d.errorUpdateCount>0,isFetchedAfterMount:d.dataUpdateCount>u.dataUpdateCount||d.errorUpdateCount>u.errorUpdateCount,isFetching:g,isRefetching:g&&!v,isLoadingError:$&&!S,isPaused:d.fetchStatus==="paused",isPlaceholderData:m,isRefetchError:$&&S,isStale:cd(e,t),refetch:this.refetch,promise:this.#o,isEnabled:Bt(t.enabled,e)!==!1};if(this.options.experimental_prefetchInRender){let E=J=>{C.status==="error"?J.reject(C.error):C.data!==void 0&&J.resolve(C.data)},O=()=>{let J=this.#o=C.promise=_i();E(J)},j=this.#o;switch(j.status){case"pending":e.queryHash===a.queryHash&&E(j);break;case"fulfilled":(C.status==="error"||C.data!==j.value)&&O();break;case"rejected":(C.status!=="error"||C.error!==j.reason)&&O();break}}return C}updateResult(){let e=this.#n,t=this.createResult(this.#e,this.options);if(this.#r=this.#e.state,this.#s=this.options,this.#r.data!==void 0&&(this.#m=this.#e),Nn(t,e))return;this.#n=t;let a=()=>{if(!e)return!0;let{notifyOnChangeProps:n}=this.options,r=typeof n=="function"?n():n;if(r==="all"||!r&&!this.#h.size)return!0;let s=new Set(r??this.#h);return this.options.throwOnError&&s.add("error"),Object.keys(this.#n).some(i=>{let o=i;return this.#n[o]!==e[o]&&s.has(o)})};this.#S({listeners:a()})}#w(){let e=this.#t.getQueryCache().build(this.#t,this.options);if(e===this.#e)return;let t=this.#e;this.#e=e,this.#a=e.state,this.hasListeners()&&(t?.removeObserver(this),e.addObserver(this))}onQueryUpdate(){this.updateResult(),this.hasListeners()&&this.#b()}#S(e){ce.batch(()=>{e.listeners&&this.listeners.forEach(t=>{t(this.#n)}),this.#t.getQueryCache().notify({query:this.#e,type:"observerResultsUpdated"})})}};function VR(e,t){return Bt(t.enabled,e)!==!1&&e.state.data===void 0&&!(e.state.status==="error"&&t.retryOnMount===!1)}function Kh(e,t){return VR(e,t)||e.state.data!==void 0&&ud(e,t,t.refetchOnMount)}function ud(e,t,a){if(Bt(t.enabled,e)!==!1&&wa(t.staleTime,e)!=="static"){let n=typeof a=="function"?a(e):a;return n==="always"||n!==!1&&cd(e,t)}return!1}function Qh(e,t,a,n){return(e!==t||Bt(n.enabled,e)===!1)&&(!a.suspense||e.state.status!=="error")&&cd(e,a)}function cd(e,t){return Bt(t.enabled,e)!==!1&&e.isStaleByTime(wa(t.staleTime,e))}function GR(e,t){return!Nn(e.getCurrentResult(),t)}function dd(e){return{onFetch:(t,a)=>{let n=t.options,r=t.fetchOptions?.meta?.fetchMore?.direction,s=t.state.data?.pages||[],i=t.state.data?.pageParams||[],o={pages:[],pageParams:[]},u=0,c=async()=>{let d=!1,m=b=>{Object.defineProperty(b,"signal",{enumerable:!0,get:()=>(t.signal.aborted?d=!0:t.signal.addEventListener("abort",()=>{d=!0}),t.signal)})},f=ol(t.options,t.fetchOptions),p=async(b,y,x)=>{if(d)return Promise.reject();if(y==null&&b.pages.length)return Promise.resolve(b);let v=(()=>{let R={client:t.client,queryKey:t.queryKey,pageParam:y,direction:x?"backward":"forward",meta:t.options.meta};return m(R),R})(),$=await f(v),{maxPages:w}=t.options,S=x?Bh:zh;return{pages:S(b.pages,$,w),pageParams:S(b.pageParams,y,w)}};if(r&&s.length){let b=r==="backward",y=b?YR:Vh,x={pages:s,pageParams:i},g=y(n,x);o=await p(x,g,b)}else{let b=e??s.length;do{let y=u===0?i[0]??n.initialPageParam:Vh(n,o);if(u>0&&y==null)break;o=await p(o,y),u++}while(u<b)}return o};t.options.persister?t.fetchFn=()=>t.options.persister?.(c,{client:t.client,queryKey:t.queryKey,meta:t.options.meta,signal:t.signal},a):t.fetchFn=c}}}function Vh(e,{pages:t,pageParams:a}){let n=t.length-1;return t.length>0?e.getNextPageParam(t[n],t,a[n],a):void 0}function YR(e,{pages:t,pageParams:a}){return t.length>0?e.getPreviousPageParam?.(t[0],t,a[0],a):void 0}var Gh=class extends cl{#t;#e;#a;constructor(e){super(),this.mutationId=e.mutationId,this.#e=e.mutationCache,this.#t=[],this.state=e.state||md(),this.setOptions(e.options),this.scheduleGc()}setOptions(e){this.options=e,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(e){this.#t.includes(e)||(this.#t.push(e),this.clearGcTimeout(),this.#e.notify({type:"observerAdded",mutation:this,observer:e}))}removeObserver(e){this.#t=this.#t.filter(t=>t!==e),this.scheduleGc(),this.#e.notify({type:"observerRemoved",mutation:this,observer:e})}optionalRemove(){this.#t.length||(this.state.status==="pending"?this.scheduleGc():this.#e.remove(this))}continue(){return this.#a?.continue()??this.execute(this.state.variables)}async execute(e){let t=()=>{this.#n({type:"continue"})};this.#a=ul({fn:()=>this.options.mutationFn?this.options.mutationFn(e):Promise.reject(new Error("No mutationFn found")),onFail:(r,s)=>{this.#n({type:"failed",failureCount:r,error:s})},onPause:()=>{this.#n({type:"pause"})},onContinue:t,retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>this.#e.canRun(this)});let a=this.state.status==="pending",n=!this.#a.canStart();try{if(a)t();else{this.#n({type:"pending",variables:e,isPaused:n}),await this.#e.config.onMutate?.(e,this);let s=await this.options.onMutate?.(e);s!==this.state.context&&this.#n({type:"pending",context:s,variables:e,isPaused:n})}let r=await this.#a.start();return await this.#e.config.onSuccess?.(r,e,this.state.context,this),await this.options.onSuccess?.(r,e,this.state.context),await this.#e.config.onSettled?.(r,null,this.state.variables,this.state.context,this),await this.options.onSettled?.(r,null,e,this.state.context),this.#n({type:"success",data:r}),r}catch(r){try{throw await this.#e.config.onError?.(r,e,this.state.context,this),await this.options.onError?.(r,e,this.state.context),await this.#e.config.onSettled?.(void 0,r,this.state.variables,this.state.context,this),await this.options.onSettled?.(void 0,r,e,this.state.context),r}finally{this.#n({type:"error",error:r})}}finally{this.#e.runNext(this)}}#n(e){let t=a=>{switch(e.type){case"failed":return{...a,failureCount:e.failureCount,failureReason:e.error};case"pause":return{...a,isPaused:!0};case"continue":return{...a,isPaused:!1};case"pending":return{...a,context:e.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:e.isPaused,status:"pending",variables:e.variables,submittedAt:Date.now()};case"success":return{...a,data:e.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...a,data:void 0,error:e.error,failureCount:a.failureCount+1,failureReason:e.error,isPaused:!1,status:"error"}}};this.state=t(this.state),ce.batch(()=>{this.#t.forEach(a=>{a.onMutationUpdate(e)}),this.#e.notify({mutation:this,type:"updated",action:e})})}};function md(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}var Yh=class extends Ft{constructor(e={}){super(),this.config=e,this.#t=new Set,this.#e=new Map,this.#a=0}#t;#e;#a;build(e,t,a){let n=new Gh({mutationCache:this,mutationId:++this.#a,options:e.defaultMutationOptions(t),state:a});return this.add(n),n}add(e){this.#t.add(e);let t=dl(e);if(typeof t=="string"){let a=this.#e.get(t);a?a.push(e):this.#e.set(t,[e])}this.notify({type:"added",mutation:e})}remove(e){if(this.#t.delete(e)){let t=dl(e);if(typeof t=="string"){let a=this.#e.get(t);if(a)if(a.length>1){let n=a.indexOf(e);n!==-1&&a.splice(n,1)}else a[0]===e&&this.#e.delete(t)}}this.notify({type:"removed",mutation:e})}canRun(e){let t=dl(e);if(typeof t=="string"){let n=this.#e.get(t)?.find(r=>r.state.status==="pending");return!n||n===e}else return!0}runNext(e){let t=dl(e);return typeof t=="string"?this.#e.get(t)?.find(n=>n!==e&&n.state.isPaused)?.continue()??Promise.resolve():Promise.resolve()}clear(){ce.batch(()=>{this.#t.forEach(e=>{this.notify({type:"removed",mutation:e})}),this.#t.clear(),this.#e.clear()})}getAll(){return Array.from(this.#t)}find(e){let t={exact:!0,...e};return this.getAll().find(a=>il(t,a))}findAll(e={}){return this.getAll().filter(t=>il(e,t))}notify(e){ce.batch(()=>{this.listeners.forEach(t=>{t(e)})})}resumePausedMutations(){let e=this.getAll().filter(t=>t.state.isPaused);return ce.batch(()=>Promise.all(e.map(t=>t.continue().catch(je))))}};function dl(e){return e.options.scope?.id}var fd=class extends Ft{#t;#e=void 0;#a;#n;constructor(e,t){super(),this.#t=e,this.setOptions(t),this.bindMethods(),this.#r()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(e){let t=this.options;this.options=this.#t.defaultMutationOptions(e),Nn(this.options,t)||this.#t.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.#a,observer:this}),t?.mutationKey&&this.options.mutationKey&&Da(t.mutationKey)!==Da(this.options.mutationKey)?this.reset():this.#a?.state.status==="pending"&&this.#a.setOptions(this.options)}onUnsubscribe(){this.hasListeners()||this.#a?.removeObserver(this)}onMutationUpdate(e){this.#r(),this.#s(e)}getCurrentResult(){return this.#e}reset(){this.#a?.removeObserver(this),this.#a=void 0,this.#r(),this.#s()}mutate(e,t){return this.#n=t,this.#a?.removeObserver(this),this.#a=this.#t.getMutationCache().build(this.#t,this.options),this.#a.addObserver(this),this.#a.execute(e)}#r(){let e=this.#a?.state??md();this.#e={...e,isPending:e.status==="pending",isSuccess:e.status==="success",isError:e.status==="error",isIdle:e.status==="idle",mutate:this.mutate,reset:this.reset}}#s(e){ce.batch(()=>{if(this.#n&&this.hasListeners()){let t=this.#e.variables,a=this.#e.context;e?.type==="success"?(this.#n.onSuccess?.(e.data,t,a),this.#n.onSettled?.(e.data,null,t,a)):e?.type==="error"&&(this.#n.onError?.(e.error,t,a),this.#n.onSettled?.(void 0,e.error,t,a))}this.listeners.forEach(t=>{t(this.#e)})})}};function Jh(e,t){let a=new Set(t);return e.filter(n=>!a.has(n))}function JR(e,t,a){let n=e.slice(0);return n[t]=a,n}var pd=class extends Ft{#t;#e;#a;#n;#r;#s;#o;#i;#f=[];constructor(e,t,a){super(),this.#t=e,this.#n=a,this.#a=[],this.#r=[],this.#e=[],this.setQueries(t)}onSubscribe(){this.listeners.size===1&&this.#r.forEach(e=>{e.subscribe(t=>{this.#c(e,t)})})}onUnsubscribe(){this.listeners.size||this.destroy()}destroy(){this.listeners=new Set,this.#r.forEach(e=>{e.destroy()})}setQueries(e,t){this.#a=e,this.#n=t,ce.batch(()=>{let a=this.#r,n=this.#u(this.#a);this.#f=n,n.forEach(d=>d.observer.setOptions(d.defaultedQueryOptions));let r=n.map(d=>d.observer),s=r.map(d=>d.getCurrentResult()),i=a.length!==r.length,o=r.some((d,m)=>d!==a[m]),u=i||o,c=u?!0:s.some((d,m)=>{let f=this.#e[m];return!f||!Nn(d,f)});!u&&!c||(u&&(this.#r=r),this.#e=s,this.hasListeners()&&(u&&(Jh(a,r).forEach(d=>{d.destroy()}),Jh(r,a).forEach(d=>{d.subscribe(m=>{this.#c(d,m)})})),this.#l()))})}getCurrentResult(){return this.#e}getQueries(){return this.#r.map(e=>e.getCurrentQuery())}getObservers(){return this.#r}getOptimisticResult(e,t){let a=this.#u(e),n=a.map(r=>r.observer.getOptimisticResult(r.defaultedQueryOptions));return[n,r=>this.#m(r??n,t),()=>this.#d(n,a)]}#d(e,t){return t.map((a,n)=>{let r=e[n];return a.defaultedQueryOptions.notifyOnChangeProps?r:a.observer.trackResult(r,s=>{t.forEach(i=>{i.observer.trackProp(s)})})})}#m(e,t){return t?((!this.#s||this.#e!==this.#i||t!==this.#o)&&(this.#o=t,this.#i=this.#e,this.#s=wi(this.#s,t(e))),this.#s):e}#u(e){let t=new Map(this.#r.map(n=>[n.options.queryHash,n])),a=[];return e.forEach(n=>{let r=this.#t.defaultQueryOptions(n),s=t.get(r.queryHash);s?a.push({defaultedQueryOptions:r,observer:s}):a.push({defaultedQueryOptions:r,observer:new mr(this.#t,r)})}),a}#c(e,t){let a=this.#r.indexOf(e);a!==-1&&(this.#e=JR(this.#e,a,t),this.#l())}#l(){if(this.hasListeners()){let e=this.#s,t=this.#d(this.#e,this.#f),a=this.#m(t,this.#n?.combine);e!==a&&ce.batch(()=>{this.listeners.forEach(n=>{n(this.#e)})})}}};var Xh=class extends Ft{constructor(e={}){super(),this.config=e,this.#t=new Map}#t;build(e,t,a){let n=t.queryKey,r=t.queryHash??$i(n,t),s=this.get(r);return s||(s=new Hh({client:e,queryKey:n,queryHash:r,options:e.defaultQueryOptions(t),state:a,defaultOptions:e.getQueryDefaults(n)}),this.add(s)),s}add(e){this.#t.has(e.queryHash)||(this.#t.set(e.queryHash,e),this.notify({type:"added",query:e}))}remove(e){let t=this.#t.get(e.queryHash);t&&(e.destroy(),t===e&&this.#t.delete(e.queryHash),this.notify({type:"removed",query:e}))}clear(){ce.batch(()=>{this.getAll().forEach(e=>{this.remove(e)})})}get(e){return this.#t.get(e)}getAll(){return[...this.#t.values()]}find(e){let t={exact:!0,...e};return this.getAll().find(a=>sl(t,a))}findAll(e={}){let t=this.getAll();return Object.keys(e).length>0?t.filter(a=>sl(e,a)):t}notify(e){ce.batch(()=>{this.listeners.forEach(t=>{t(e)})})}onFocus(){ce.batch(()=>{this.getAll().forEach(e=>{e.onFocus()})})}onOnline(){ce.batch(()=>{this.getAll().forEach(e=>{e.onOnline()})})}};var hd=class{#t;#e;#a;#n;#r;#s;#o;#i;constructor(e={}){this.#t=e.queryCache||new Xh,this.#e=e.mutationCache||new Yh,this.#a=e.defaultOptions||{},this.#n=new Map,this.#r=new Map,this.#s=0}mount(){this.#s++,this.#s===1&&(this.#o=Vr.subscribe(async e=>{e&&(await this.resumePausedMutations(),this.#t.onFocus())}),this.#i=Gr.subscribe(async e=>{e&&(await this.resumePausedMutations(),this.#t.onOnline())}))}unmount(){this.#s--,this.#s===0&&(this.#o?.(),this.#o=void 0,this.#i?.(),this.#i=void 0)}isFetching(e){return this.#t.findAll({...e,fetchStatus:"fetching"}).length}isMutating(e){return this.#e.findAll({...e,status:"pending"}).length}getQueryData(e){let t=this.defaultQueryOptions({queryKey:e});return this.#t.get(t.queryHash)?.state.data}ensureQueryData(e){let t=this.defaultQueryOptions(e),a=this.#t.build(this,t),n=a.state.data;return n===void 0?this.fetchQuery(e):(e.revalidateIfStale&&a.isStaleByTime(wa(t.staleTime,a))&&this.prefetchQuery(t),Promise.resolve(n))}getQueriesData(e){return this.#t.findAll(e).map(({queryKey:t,state:a})=>{let n=a.data;return[t,n]})}setQueryData(e,t,a){let n=this.defaultQueryOptions({queryKey:e}),s=this.#t.get(n.queryHash)?.state.data,i=Uh(t,s);if(i!==void 0)return this.#t.build(this,n).setData(i,{...a,manual:!0})}setQueriesData(e,t,a){return ce.batch(()=>this.#t.findAll(e).map(({queryKey:n})=>[n,this.setQueryData(n,t,a)]))}getQueryState(e){let t=this.defaultQueryOptions({queryKey:e});return this.#t.get(t.queryHash)?.state}removeQueries(e){let t=this.#t;ce.batch(()=>{t.findAll(e).forEach(a=>{t.remove(a)})})}resetQueries(e,t){let a=this.#t;return ce.batch(()=>(a.findAll(e).forEach(n=>{n.reset()}),this.refetchQueries({type:"active",...e},t)))}cancelQueries(e,t={}){let a={revert:!0,...t},n=ce.batch(()=>this.#t.findAll(e).map(r=>r.cancel(a)));return Promise.all(n).then(je).catch(je)}invalidateQueries(e,t={}){return ce.batch(()=>(this.#t.findAll(e).forEach(a=>{a.invalidate()}),e?.refetchType==="none"?Promise.resolve():this.refetchQueries({...e,type:e?.refetchType??e?.type??"active"},t)))}refetchQueries(e,t={}){let a={...t,cancelRefetch:t.cancelRefetch??!0},n=ce.batch(()=>this.#t.findAll(e).filter(r=>!r.isDisabled()&&!r.isStatic()).map(r=>{let s=r.fetch(void 0,a);return a.throwOnError||(s=s.catch(je)),r.state.fetchStatus==="paused"?Promise.resolve():s}));return Promise.all(n).then(je)}fetchQuery(e){let t=this.defaultQueryOptions(e);t.retry===void 0&&(t.retry=!1);let a=this.#t.build(this,t);return a.isStaleByTime(wa(t.staleTime,a))?a.fetch(t):Promise.resolve(a.state.data)}prefetchQuery(e){return this.fetchQuery(e).then(je).catch(je)}fetchInfiniteQuery(e){return e.behavior=dd(e.pages),this.fetchQuery(e)}prefetchInfiniteQuery(e){return this.fetchInfiniteQuery(e).then(je).catch(je)}ensureInfiniteQueryData(e){return e.behavior=dd(e.pages),this.ensureQueryData(e)}resumePausedMutations(){return Gr.isOnline()?this.#e.resumePausedMutations():Promise.resolve()}getQueryCache(){return this.#t}getMutationCache(){return this.#e}getDefaultOptions(){return this.#a}setDefaultOptions(e){this.#a=e}setQueryDefaults(e,t){this.#n.set(Da(e),{queryKey:e,defaultOptions:t})}getQueryDefaults(e){let t=[...this.#n.values()],a={};return t.forEach(n=>{dr(e,n.queryKey)&&Object.assign(a,n.defaultOptions)}),a}setMutationDefaults(e,t){this.#r.set(Da(e),{mutationKey:e,defaultOptions:t})}getMutationDefaults(e){let t=[...this.#r.values()],a={};return t.forEach(n=>{dr(e,n.mutationKey)&&Object.assign(a,n.defaultOptions)}),a}defaultQueryOptions(e){if(e._defaulted)return e;let t={...this.#a.queries,...this.getQueryDefaults(e.queryKey),...e,_defaulted:!0};return t.queryHash||(t.queryHash=$i(t.queryKey,t)),t.refetchOnReconnect===void 0&&(t.refetchOnReconnect=t.networkMode!=="always"),t.throwOnError===void 0&&(t.throwOnError=!!t.suspense),!t.networkMode&&t.persister&&(t.networkMode="offlineFirst"),t.queryFn===Qr&&(t.enabled=!1),t}defaultMutationOptions(e){return e?._defaulted?e:{...this.#a.mutations,...e?.mutationKey&&this.getMutationDefaults(e.mutationKey),...e,_defaulted:!0}}clear(){this.#t.clear(),this.#e.clear()}};var Ma=Ie(Ge(),1);var Yr=Ie(Ge(),1),tv=Ie(vd(),1),gd=Yr.createContext(void 0),ee=e=>{let t=Yr.useContext(gd);if(e)return e;if(!t)throw new Error("No QueryClient set, use QueryClientProvider to set one");return t},yd=({client:e,children:t})=>(Yr.useEffect(()=>(e.mount(),()=>{e.unmount()}),[e]),(0,tv.jsx)(gd.Provider,{value:e,children:t}));var fl=Ie(Ge(),1),av=fl.createContext(!1),pl=()=>fl.useContext(av),uL=av.Provider;var Ri=Ie(Ge(),1),WR=Ie(vd(),1);function ek(){let e=!1;return{clearReset:()=>{e=!1},reset:()=>{e=!0},isReset:()=>e}}var tk=Ri.createContext(ek()),hl=()=>Ri.useContext(tk);var nv=Ie(Ge(),1);var vl=(e,t)=>{(e.suspense||e.throwOnError||e.experimental_prefetchInRender)&&(t.isReset()||(e.retryOnMount=!1))},gl=e=>{nv.useEffect(()=>{e.clearReset()},[e])},yl=({result:e,errorResetBoundary:t,throwOnError:a,query:n,suspense:r})=>e.isError&&!t.isReset()&&!e.isFetching&&n&&(r&&e.data===void 0||Ni(a,[e.error,n]));var bl=e=>{if(e.suspense){let a=r=>r==="static"?r:Math.max(r??1e3,1e3),n=e.staleTime;e.staleTime=typeof n=="function"?(...r)=>a(n(...r)):a(n),typeof e.gcTime=="number"&&(e.gcTime=Math.max(e.gcTime,1e3))}},xl=(e,t)=>e.isLoading&&e.isFetching&&!t,ki=(e,t)=>e?.suspense&&t.isPending,Jr=(e,t,a)=>t.fetchOptimistic(e).catch(()=>{a.clearReset()});function bd({queries:e,...t},a){let n=ee(a),r=pl(),s=hl(),i=Ma.useMemo(()=>e.map(y=>{let x=n.defaultQueryOptions(y);return x._optimisticResults=r?"isRestoring":"optimistic",x}),[e,n,r]);i.forEach(y=>{bl(y),vl(y,s)}),gl(s);let[o]=Ma.useState(()=>new pd(n,i,t)),[u,c,d]=o.getOptimisticResult(i,t.combine),m=!r&&t.subscribed!==!1;Ma.useSyncExternalStore(Ma.useCallback(y=>m?o.subscribe(ce.batchCalls(y)):je,[o,m]),()=>o.getCurrentResult(),()=>o.getCurrentResult()),Ma.useEffect(()=>{o.setQueries(i,t)},[i,t,o]);let p=u.some((y,x)=>ki(i[x],y))?u.flatMap((y,x)=>{let g=i[x];if(g){let v=new mr(n,g);if(ki(g,y))return Jr(g,v,s);xl(y,r)&&Jr(g,v,s)}return[]}):[];if(p.length>0)throw Promise.all(p);let b=u.find((y,x)=>{let g=i[x];return g&&yl({result:y,errorResetBoundary:s,throwOnError:g.throwOnError,query:n.getQueryCache().get(g.queryHash),suspense:g.suspense})});if(b?.error)throw b.error;return c(d())}var _n=Ie(Ge(),1);function rv(e,t,a){let n=pl(),r=hl(),s=ee(a),i=s.defaultQueryOptions(e);s.getDefaultOptions().queries?._experimental_beforeQuery?.(i),i._optimisticResults=n?"isRestoring":"optimistic",bl(i),vl(i,r),gl(r);let o=!s.getQueryCache().get(i.queryHash),[u]=_n.useState(()=>new t(s,i)),c=u.getOptimisticResult(i),d=!n&&e.subscribed!==!1;if(_n.useSyncExternalStore(_n.useCallback(m=>{let f=d?u.subscribe(ce.batchCalls(m)):je;return u.updateResult(),f},[u,d]),()=>u.getCurrentResult(),()=>u.getCurrentResult()),_n.useEffect(()=>{u.setOptions(i)},[i,u]),ki(i,c))throw Jr(i,u,r);if(yl({result:c,errorResetBoundary:r,throwOnError:i.throwOnError,query:s.getQueryCache().get(i.queryHash),suspense:i.suspense}))throw c.error;return s.getDefaultOptions().queries?._experimental_afterQuery?.(i,c),i.experimental_prefetchInRender&&!zt&&xl(c,n)&&(o?Jr(i,u,r):s.getQueryCache().get(i.queryHash)?.promise)?.catch(je).finally(()=>{u.updateResult()}),i.notifyOnChangeProps?c:u.trackResult(c)}function H(e,t){return rv(e,mr,t)}var Xa=Ie(Ge(),1);function Y(e,t){let a=ee(t),[n]=Xa.useState(()=>new fd(a,e));Xa.useEffect(()=>{n.setOptions(e)},[n,e]);let r=Xa.useSyncExternalStore(Xa.useCallback(i=>n.subscribe(ce.batchCalls(i)),[n]),()=>n.getCurrentResult(),()=>n.getCurrentResult()),s=Xa.useCallback((i,o)=>{n.mutate(i,o).catch(je)},[n]);if(r.error&&Ni(n.options.throwOnError,[r.error]))throw r.error;return{...r,mutate:s,mutateAsync:r.mutate}}var PR=Ie(R0());var Vt=Ie(Ge(),1),Q=Ie(Ge(),1),Ee=Ie(Ge(),1),pp=Ie(Ge(),1),ux=Ie(Ge(),1),ue=Ie(Ge(),1),K3=Ie(Ge(),1),Q3=Ie(Ge(),1),V3=Ie(Ge(),1),W=Ie(Ge(),1),xx=Ie(Ge(),1);var ap=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,L0=/^[\\/]{2}/;function AE(e,t){return t+e.replace(/\\/g,"/")}var k0="popstate";function C0(e){return typeof e=="object"&&e!=null&&"pathname"in e&&"search"in e&&"hash"in e&&"state"in e&&"key"in e}function P0(e={}){function t(n,r){let s=r.state?.masked,{pathname:i,search:o,hash:u}=s||n.location;return Zf("",{pathname:i,search:o,hash:u},r.state&&r.state.usr||null,r.state&&r.state.key||"default",s?{pathname:n.location.pathname,search:n.location.search,hash:n.location.hash}:void 0)}function a(n,r){return typeof r=="string"?r:qs(r)}return ME(t,a,null,e)}function De(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function sa(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function DE(){return Math.random().toString(36).substring(2,10)}function E0(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function Zf(e,t,a=null,n,r){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?Dr(t):t,state:a,key:t&&t.key||n||DE(),mask:r}}function qs({pathname:e="/",search:t="",hash:a=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),a&&a!=="#"&&(e+=a.charAt(0)==="#"?a:"#"+a),e}function Dr(e){let t={};if(e){let a=e.indexOf("#");a>=0&&(t.hash=e.substring(a),e=e.substring(0,a));let n=e.indexOf("?");n>=0&&(t.search=e.substring(n),e=e.substring(0,n)),e&&(t.pathname=e)}return t}function ME(e,t,a,n={}){let{window:r=document.defaultView,v5Compat:s=!1}=n,i=r.history,o="POP",u=null,c=d();c==null&&(c=0,i.replaceState({...i.state,idx:c},""));function d(){return(i.state||{idx:null}).idx}function m(){o="POP";let x=d(),g=x==null?null:x-c;c=x,u&&u({action:o,location:y.location,delta:g})}function f(x,g){o="PUSH";let v=C0(x)?x:Zf(y.location,x,g);a&&a(v,x),c=d()+1;let $=E0(v,c),w=y.createHref(v.mask||v);try{i.pushState($,"",w)}catch(S){if(S instanceof DOMException&&S.name==="DataCloneError")throw S;r.location.assign(w)}s&&u&&u({action:o,location:y.location,delta:1})}function p(x,g){o="REPLACE";let v=C0(x)?x:Zf(y.location,x,g);a&&a(v,x),c=d();let $=E0(v,c),w=y.createHref(v.mask||v);i.replaceState($,"",w),s&&u&&u({action:o,location:y.location,delta:0})}function b(x){return OE(r,x)}let y={get action(){return o},get location(){return e(r,i)},listen(x){if(u)throw new Error("A history only accepts one active listener");return r.addEventListener(k0,m),u=x,()=>{r.removeEventListener(k0,m),u=null}},createHref(x){return t(r,x)},createURL:b,encodeLocation(x){let g=b(x);return{pathname:g.pathname,search:g.search,hash:g.hash}},push:f,replace:p,go(x){return i.go(x)}};return y}function OE(e,t,a=!1){let n="http://localhost";e&&(n=e.location.origin!=="null"?e.location.origin:e.location.href),De(n,"No window.location.(origin|href) available to create URL");let r=typeof t=="string"?t:qs(t);return r=r.replace(/ $/,"%20"),!a&&L0.test(r)&&(r=n+r),new URL(r,n)}var LE;LE=new WeakMap;function np(e,t,a="/"){return PE(e,t,a,!1)}function PE(e,t,a,n,r){let s=typeof t=="string"?Dr(t):t,i=Ia(s.pathname||"/",a);if(i==null)return null;let o=r??UE(e),u=null,c=YE(i);for(let d=0;u==null&&d<o.length;++d)u=GE(o[d],c,n);return u}function jE(e,t){let{route:a,pathname:n,params:r}=e;return{id:a.id,pathname:n,params:r,data:t[a.id],loaderData:t[a.id],handle:a.handle}}function UE(e){let t=j0(e);return FE(t),t}function j0(e,t=[],a=[],n="",r=!1){let s=(i,o,u=r,c)=>{let d={relativePath:c===void 0?i.path||"":c,caseSensitive:i.caseSensitive===!0,childrenIndex:o,route:i};if(d.relativePath.startsWith("/")){if(!d.relativePath.startsWith(n)&&u)return;De(d.relativePath.startsWith(n),`Absolute route path "${d.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),d.relativePath=d.relativePath.slice(n.length)}let m=Ra([n,d.relativePath]),f=a.concat(d);i.children&&i.children.length>0&&(De(i.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${m}".`),j0(i.children,t,f,m,u)),!(i.path==null&&!i.index)&&t.push({path:m,score:QE(m,i.index),routesMeta:f.map((p,b)=>{let[y,x]=z0(p.relativePath,p.caseSensitive,b===f.length-1);return{...p,matcher:y,compiledParams:x}})})};return e.forEach((i,o)=>{if(i.path===""||!i.path?.includes("?"))s(i,o);else for(let u of U0(i.path))s(i,o,!0,u)}),t}function U0(e){let t=e.split("/");if(t.length===0)return[];let[a,...n]=t,r=a.endsWith("?"),s=a.replace(/\?$/,"");if(n.length===0)return r?[s,""]:[s];let i=U0(n.join("/")),o=[];return o.push(...i.map(u=>u===""?s:[s,u].join("/"))),r&&o.push(...i),o.map(u=>e.startsWith("/")&&u===""?"/":u)}function FE(e){e.sort((t,a)=>t.score!==a.score?a.score-t.score:VE(t.routesMeta.map(n=>n.childrenIndex),a.routesMeta.map(n=>n.childrenIndex)))}var zE=/^:[\w-]+$/,BE=3,qE=2,IE=1,HE=10,KE=-2,T0=e=>e==="*";function QE(e,t){let a=e.split("/"),n=a.length;return a.some(T0)&&(n+=KE),t&&(n+=qE),a.filter(r=>!T0(r)).reduce((r,s)=>r+(zE.test(s)?BE:s===""?IE:HE),n)}function VE(e,t){return e.length===t.length&&e.slice(0,-1).every((n,r)=>n===t[r])?e[e.length-1]-t[t.length-1]:0}function GE(e,t,a=!1){let{routesMeta:n}=e,r={},s="/",i=[];for(let o=0;o<n.length;++o){let u=n[o],c=o===n.length-1,d=s==="/"?t:t.slice(s.length)||"/",m={path:u.relativePath,caseSensitive:u.caseSensitive,end:c},f=u.matcher&&u.compiledParams?F0(m,d,u.matcher,u.compiledParams):Po(m,d),p=u.route;if(!f&&c&&a&&!n[n.length-1].route.index&&(f=Po({path:u.relativePath,caseSensitive:u.caseSensitive,end:!1},d)),!f)return null;Object.assign(r,f.params),i.push({params:r,pathname:Ra([s,f.pathname]),pathnameBase:XE(Ra([s,f.pathnameBase])),route:p}),f.pathnameBase!=="/"&&(s=Ra([s,f.pathnameBase]))}return i}function Po(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[a,n]=z0(e.path,e.caseSensitive,e.end);return F0(e,t,a,n)}function F0(e,t,a,n){let r=t.match(a);if(!r)return null;let s=r[0],i=s.replace(/(.)\/+$/,"$1"),o=r.slice(1);return{params:n.reduce((c,{paramName:d,isOptional:m},f)=>{if(d==="*"){let b=o[f]||"";i=s.slice(0,s.length-b.length).replace(/(.)\/+$/,"$1")}let p=o[f];return m&&!p?c[d]=void 0:c[d]=(p||"").replace(/%2F/g,"/"),c},{}),pathname:s,pathnameBase:i,pattern:e}}function z0(e,t=!1,a=!0){sa(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let n=[],r="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(i,o,u,c,d)=>{if(n.push({paramName:o,isOptional:u!=null}),u){let m=d.charAt(c+i.length);return m&&m!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(n.push({paramName:"*"}),r+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):a?r+="\\/*$":e!==""&&e!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,t?void 0:"i"),n]}function YE(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return sa(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function Ia(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let a=t.endsWith("/")?t.length-1:t.length,n=e.charAt(a);return n&&n!=="/"?null:e.slice(a)||"/"}function B0(e,t="/"){let{pathname:a,search:n="",hash:r=""}=typeof e=="string"?Dr(e):e,s;return a?(a=q0(a),a.startsWith("/")?s=A0(a.substring(1),"/"):s=A0(a,t)):s=t,{pathname:s,search:ZE(n),hash:WE(r)}}function A0(e,t){let a=Xu(t).split("/");return e.split("/").forEach(r=>{r===".."?a.length>1&&a.pop():r!=="."&&a.push(r)}),a.length>1?a.join("/"):"/"}function Yf(e,t,a,n){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(n)}].  Please separate it out to the \`to.${a}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function JE(e){return e.filter((t,a)=>a===0||t.route.path&&t.route.path.length>0)}function rp(e){let t=JE(e);return t.map((a,n)=>n===t.length-1?a.pathname:a.pathnameBase)}function Wu(e,t,a,n=!1){let r;typeof e=="string"?r=Dr(e):(r={...e},De(!r.pathname||!r.pathname.includes("?"),Yf("?","pathname","search",r)),De(!r.pathname||!r.pathname.includes("#"),Yf("#","pathname","hash",r)),De(!r.search||!r.search.includes("#"),Yf("#","search","hash",r)));let s=e===""||r.pathname==="",i=s?"/":r.pathname,o;if(i==null)o=a;else{let m=t.length-1;if(!n&&i.startsWith("..")){let f=i.split("/");for(;f[0]==="..";)f.shift(),m-=1;r.pathname=f.join("/")}o=m>=0?t[m]:"/"}let u=B0(r,o),c=i&&i!=="/"&&i.endsWith("/"),d=(s||i===".")&&a.endsWith("/");return!u.pathname.endsWith("/")&&(c||d)&&(u.pathname+="/"),u}var q0=e=>e.replace(/[\\/]{2,}/g,"/"),Ra=e=>q0(e.join("/")),Xu=e=>e.replace(/\/+$/,""),XE=e=>Xu(e).replace(/^\/*/,"/"),ZE=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,WE=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;var I0=class{constructor(e,t,a,n=!1){this.status=e,this.statusText=t||"",this.internal=n,a instanceof Error?(this.data=a.toString(),this.error=a):this.data=a}};function H0(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}function e3(e){let t=e.map(a=>a.route.path).filter(Boolean);return Ra(t)||"/"}var K0=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function Q0(e,t){let a=e;if(typeof a!="string"||!ap.test(a))return{absoluteURL:void 0,isExternal:!1,to:a};let n=a,r=!1;if(K0)try{let s=new URL(window.location.href),i=L0.test(a)?new URL(AE(a,s.protocol)):new URL(a),o=Ia(i.pathname,t);i.origin===s.origin&&o!=null?a=o+i.search+i.hash:r=!0}catch{sa(!1,`<Link to="${a}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:n,isExternal:r,to:a}}var GL=Symbol("Uninstrumented");var YL=Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var V0=["POST","PUT","PATCH","DELETE"],JL=new Set(V0),t3=["GET",...V0],XL=new Set(t3);var ZL=Symbol("ResetLoaderData"),a3,n3,r3,s3;a3=new WeakMap;n3=new WeakMap;r3=new WeakMap;s3=new WeakMap;var i3=["about:","blob:","chrome:","chrome-untrusted:","content:","data:","devtools:","file:","filesystem:","javascript:"];function o3(e){try{return i3.includes(new URL(e).protocol)}catch{return!1}}var Mr=Vt.createContext(null);Mr.displayName="DataRouter";var Is=Vt.createContext(null);Is.displayName="DataRouterState";var G0=Vt.createContext(!1);function l3(){return Vt.useContext(G0)}var sp=Vt.createContext({isTransitioning:!1});sp.displayName="ViewTransition";var Y0=Vt.createContext(new Map);Y0.displayName="Fetchers";var u3=Vt.createContext(null);u3.displayName="Await";var _t=Vt.createContext(null);_t.displayName="Navigation";var Hs=Vt.createContext(null);Hs.displayName="Location";var ia=Vt.createContext({outlet:null,matches:[],isDataRoute:!1});ia.displayName="Route";var ip=Vt.createContext(null);ip.displayName="RouteError";var Wf=!0,J0="REACT_ROUTER_ERROR",c3="REDIRECT",d3="ROUTE_ERROR_RESPONSE";function m3(e){if(e.startsWith(`${J0}:${c3}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.location=="string"&&typeof t.reloadDocument=="boolean"&&typeof t.replace=="boolean")return t}catch{}}function f3(e){if(e.startsWith(`${J0}:${d3}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string")return new I0(t.status,t.statusText,t.data)}catch{}}function X0(e,{relative:t}={}){De(Or(),"useHref() may be used only in the context of a <Router> component.");let{basename:a,navigator:n}=Q.useContext(_t),{hash:r,pathname:s,search:i}=Ks(e,{relative:t}),o=s;return a!=="/"&&(o=s==="/"?a:Ra([a,s])),n.createHref({pathname:o,search:i,hash:r})}function Or(){return Q.useContext(Hs)!=null}function Me(){return De(Or(),"useLocation() may be used only in the context of a <Router> component."),Q.useContext(Hs).location}var Z0="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function W0(e){Q.useContext(_t).static||Q.useLayoutEffect(e)}function pe(){let{isDataRoute:e}=Q.useContext(ia);return e?S3():p3()}function p3(){De(Or(),"useNavigate() may be used only in the context of a <Router> component.");let e=Q.useContext(Mr),{basename:t,navigator:a}=Q.useContext(_t),{matches:n}=Q.useContext(ia),{pathname:r}=Me(),s=JSON.stringify(rp(n)),i=Q.useRef(!1);return W0(()=>{i.current=!0}),Q.useCallback((u,c={})=>{if(sa(i.current,Z0),!i.current)return;if(typeof u=="number"){a.go(u);return}let d=Wu(u,JSON.parse(s),r,c.relative==="path");e==null&&t!=="/"&&(d.pathname=d.pathname==="/"?t:Ra([t,d.pathname])),(c.replace?a.replace:a.push)(d,c.state,c)},[t,a,s,r,e])}var ex=Q.createContext(null);function Ha(){return Q.useContext(ex)}function tx(e){let t=Q.useContext(ia).outlet;return Q.useMemo(()=>t&&Q.createElement(ex.Provider,{value:e},t),[t,e])}function ot(){let{matches:e}=Q.useContext(ia);return e[e.length-1]?.params??{}}function Ks(e,{relative:t}={}){let{matches:a}=Q.useContext(ia),{pathname:n}=Me(),r=JSON.stringify(rp(a));return Q.useMemo(()=>Wu(e,JSON.parse(r),n,t==="path"),[e,r,n,t])}function ax(e,t){return nx(e,t)}function nx(e,t,a){De(Or(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:n}=Q.useContext(_t),{matches:r}=Q.useContext(ia),s=r[r.length-1],i=s?s.params:{},o=s?s.pathname:"/",u=s?s.pathnameBase:"/",c=s&&s.route;if(Wf){let x=c&&c.path||"";ox(o,!c||x.endsWith("*")||x.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${o}" (under <Route path="${x}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${x}"> to <Route path="${x==="/"?"*":`${x}/*`}">.`)}let d=Me(),m;if(t){let x=typeof t=="string"?Dr(t):t;De(u==="/"||x.pathname?.startsWith(u),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${u}" but pathname "${x.pathname}" was given in the \`location\` prop.`),m=x}else m=d;let f=m.pathname||"/",p=f;if(u!=="/"){let x=u.replace(/^\//,"").split("/");p="/"+f.replace(/^\//,"").split("/").slice(x.length).join("/")}let b=a&&a.state.matches.length?a.state.matches.map(x=>Object.assign(x,{route:a.manifest[x.route.id]||x.route})):np(e,{pathname:p});Wf&&(sa(c||b!=null,`No routes matched location "${m.pathname}${m.search}${m.hash}" `),sa(b==null||b[b.length-1].route.element!==void 0||b[b.length-1].route.Component!==void 0||b[b.length-1].route.lazy!==void 0,`Matched leaf route at location "${m.pathname}${m.search}${m.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`));let y=b3(b&&b.map(x=>Object.assign({},x,{params:Object.assign({},i,x.params),pathname:Ra([u,n.encodeLocation?n.encodeLocation(x.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:x.pathname]),pathnameBase:x.pathnameBase==="/"?u:Ra([u,n.encodeLocation?n.encodeLocation(x.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:x.pathnameBase])})),r,a);return t&&y?Q.createElement(Hs.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",mask:void 0,...m},navigationType:"POP"}},y):y}function h3(){let e=ix(),t=H0(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),a=e instanceof Error?e.stack:null,n="rgba(200,200,200, 0.5)",r={padding:"0.5rem",backgroundColor:n},s={padding:"2px 4px",backgroundColor:n},i=null;return Wf&&(console.error("Error handled by React Router default ErrorBoundary:",e),i=Q.createElement(Q.Fragment,null,Q.createElement("p",null,"\u{1F4BF} Hey developer \u{1F44B}"),Q.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",Q.createElement("code",{style:s},"ErrorBoundary")," or"," ",Q.createElement("code",{style:s},"errorElement")," prop on your route."))),Q.createElement(Q.Fragment,null,Q.createElement("h2",null,"Unexpected Application Error!"),Q.createElement("h3",{style:{fontStyle:"italic"}},t),a?Q.createElement("pre",{style:r},a):null,i)}var v3=Q.createElement(h3,null),rx=class extends Q.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){let a=f3(e.digest);a&&(e=a)}let t=e!==void 0?Q.createElement(ia.Provider,{value:this.props.routeContext},Q.createElement(ip.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?Q.createElement(g3,{error:e},t):t}};rx.contextType=G0;var Jf=new WeakMap;function g3({children:e,error:t}){let{basename:a}=Q.useContext(_t);if(typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){let n=m3(t.digest);if(n){let r=Jf.get(t);if(r)throw r;let s=Q0(n.location,a),i=s.absoluteURL||s.to;if(o3(i))throw new Error("Invalid redirect location");if(K0&&!Jf.get(t))if(s.isExternal||n.reloadDocument)window.location.href=i;else{let o=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(s.to,{replace:n.replace}));throw Jf.set(t,o),o}return Q.createElement("meta",{httpEquiv:"refresh",content:`0;url=${i}`})}}return e}function y3({routeContext:e,match:t,children:a}){let n=Q.useContext(Mr);return n&&n.static&&n.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(n.staticContext._deepestRenderedBoundaryId=t.route.id),Q.createElement(ia.Provider,{value:e},a)}function b3(e,t=[],a){let n=a?.state;if(e==null){if(!n)return null;if(n.errors)e=n.matches;else if(t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let r=e,s=n?.errors;if(s!=null){let d=r.findIndex(m=>m.route.id&&s?.[m.route.id]!==void 0);De(d>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(s).join(",")}`),r=r.slice(0,Math.min(r.length,d+1))}let i=!1,o=-1;if(a&&n){i=n.renderFallback;for(let d=0;d<r.length;d++){let m=r[d];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(o=d),m.route.id){let{loaderData:f,errors:p}=n,b=m.route.loader&&!f.hasOwnProperty(m.route.id)&&(!p||p[m.route.id]===void 0);if(m.route.lazy||b){a.isStatic&&(i=!0),o>=0?r=r.slice(0,o+1):r=[r[0]];break}}}}let u=a?.onError,c=n&&u?(d,m)=>{u(d,{location:n.location,params:n.matches?.[0]?.params??{},pattern:e3(n.matches),errorInfo:m})}:void 0;return r.reduceRight((d,m,f)=>{let p,b=!1,y=null,x=null;n&&(p=s&&m.route.id?s[m.route.id]:void 0,y=m.route.errorElement||v3,i&&(o<0&&f===0?(ox("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),b=!0,x=null):o===f&&(b=!0,x=m.route.hydrateFallbackElement||null)));let g=t.concat(r.slice(0,f+1)),v=()=>{let $;return p?$=y:b?$=x:m.route.Component?$=Q.createElement(m.route.Component,null):m.route.element?$=m.route.element:$=d,Q.createElement(y3,{match:m,routeContext:{outlet:d,matches:g,isDataRoute:n!=null},children:$})};return n&&(m.route.ErrorBoundary||m.route.errorElement||f===0)?Q.createElement(rx,{location:n.location,revalidation:n.revalidation,component:y,error:p,children:v(),routeContext:{outlet:null,matches:g,isDataRoute:!0},onError:c}):v()},null)}function op(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function x3(e){let t=Q.useContext(Mr);return De(t,op(e)),t}function lp(e){let t=Q.useContext(Is);return De(t,op(e)),t}function $3(e){let t=Q.useContext(ia);return De(t,op(e)),t}function up(e){let t=$3(e),a=t.matches[t.matches.length-1];return De(a.route.id,`${e} can only be used on routes that contain a unique "id"`),a.route.id}function w3(){return up("useRouteId")}function sx(){let e=lp("useNavigation");return Q.useMemo(()=>{let{matches:t,historyAction:a,...n}=e.navigation;return n},[e.navigation])}function cp(){let{matches:e,loaderData:t}=lp("useMatches");return Q.useMemo(()=>e.map(a=>jE(a,t)),[e,t])}function ix(){let e=Q.useContext(ip),t=lp("useRouteError"),a=up("useRouteError");return e!==void 0?e:t.errors?.[a]}function S3(){let{router:e}=x3("useNavigate"),t=up("useNavigate"),a=Q.useRef(!1);return W0(()=>{a.current=!0}),Q.useCallback(async(r,s={})=>{sa(a.current,Z0),a.current&&(typeof r=="number"?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...s}))},[e,t])}var D0={};function ox(e,t,a){!t&&!D0[e]&&(D0[e]=!0,sa(!1,a))}var N3="useOptimistic",WL=Ee[N3];var e6=Ee.memo(_3);function _3({routes:e,manifest:t,future:a,state:n,isStatic:r,onError:s}){return nx(e,void 0,{manifest:t,state:n,isStatic:r,onError:s,future:a})}function lt({to:e,replace:t,state:a,relative:n}){De(Or(),"<Navigate> may be used only in the context of a <Router> component.");let{static:r}=Ee.useContext(_t);sa(!r,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:s}=Ee.useContext(ia),{pathname:i}=Me(),o=pe(),u=Wu(e,rp(s),i,n==="path"),c=JSON.stringify(u);return Ee.useEffect(()=>{o(JSON.parse(c),{replace:t,state:a,relative:n})},[o,c,n,t,a]),null}function dp(e){return tx(e.context)}function ye(e){De(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function mp({basename:e="/",children:t=null,location:a,navigationType:n="POP",navigator:r,static:s=!1,useTransitions:i}){De(!Or(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let o=e.replace(/^\/*/,"/"),u=Ee.useMemo(()=>({basename:o,navigator:r,static:s,useTransitions:i,future:{}}),[o,r,s,i]);typeof a=="string"&&(a=Dr(a));let{pathname:c="/",search:d="",hash:m="",state:f=null,key:p="default",mask:b}=a,y=Ee.useMemo(()=>{let x=Ia(c,o);return x==null?null:{location:{pathname:x,search:d,hash:m,state:f,key:p,mask:b},navigationType:n}},[o,c,d,m,f,p,n,b]);return sa(y!=null,`<Router basename="${o}"> is not able to match the URL "${c}${d}${m}" because it does not start with the basename, so the <Router> won't render anything.`),y==null?null:Ee.createElement(_t.Provider,{value:u},Ee.createElement(Hs.Provider,{children:t,value:y}))}function fp({children:e,location:t}){return ax(Zu(e),t)}function Zu(e,t=[]){let a=[];return Ee.Children.forEach(e,(n,r)=>{if(!Ee.isValidElement(n))return;let s=[...t,r];if(n.type===Ee.Fragment){a.push.apply(a,Zu(n.props.children,s));return}De(n.type===ye,`[${typeof n.type=="string"?n.type:n.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),De(!n.props.index||!n.props.children,"An index route cannot have child routes.");let i={id:n.props.id||s.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,middleware:n.props.middleware,loader:n.props.loader,action:n.props.action,hydrateFallbackElement:n.props.hydrateFallbackElement,HydrateFallback:n.props.HydrateFallback,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.hasErrorBoundary===!0||n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(i.children=Zu(n.props.children,s)),a.push(i)}),a}var Yu="get",Ju="application/x-www-form-urlencoded";function ec(e){return typeof HTMLElement<"u"&&e instanceof HTMLElement}function R3(e){return ec(e)&&e.tagName.toLowerCase()==="button"}function k3(e){return ec(e)&&e.tagName.toLowerCase()==="form"}function C3(e){return ec(e)&&e.tagName.toLowerCase()==="input"}function E3(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function T3(e,t){return e.button===0&&(!t||t==="_self")&&!E3(e)}var Vu=null;function A3(){if(Vu===null)try{new FormData(document.createElement("form"),0),Vu=!1}catch{Vu=!0}return Vu}var D3=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Xf(e){return e!=null&&!D3.has(e)?(sa(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ju}"`),null):e}function M3(e,t){let a,n,r,s,i;if(k3(e)){let o=e.getAttribute("action");n=o?Ia(o,t):null,a=e.getAttribute("method")||Yu,r=Xf(e.getAttribute("enctype"))||Ju,s=new FormData(e)}else if(R3(e)||C3(e)&&(e.type==="submit"||e.type==="image")){let o=e.form;if(o==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let u=e.getAttribute("formaction")||o.getAttribute("action");if(n=u?Ia(u,t):null,a=e.getAttribute("formmethod")||o.getAttribute("method")||Yu,r=Xf(e.getAttribute("formenctype"))||Xf(o.getAttribute("enctype"))||Ju,s=new FormData(o,e),!A3()){let{name:c,type:d,value:m}=e;if(d==="image"){let f=c?`${c}.`:"";s.append(`${f}x`,"0"),s.append(`${f}y`,"0")}else c&&s.append(c,m)}}else{if(ec(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');a=Yu,n=null,r=Ju,i=e}return s&&r==="text/plain"&&(i=s,s=void 0),{action:n,method:a.toLowerCase(),encType:r,formData:s,body:i}}var t6=Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var O3={"&":"\\u0026",">":"\\u003e","<":"\\u003c","\u2028":"\\u2028","\u2029":"\\u2029"},L3=/[&><\u2028\u2029]/g;function M0(e){return e.replace(L3,t=>O3[t])}function hp(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}var P3=Symbol("SingleFetchRedirect");function lx(e,t,a,n){let r=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return a?r.pathname.endsWith("/")?r.pathname=`${r.pathname}_.${n}`:r.pathname=`${r.pathname}.${n}`:r.pathname==="/"?r.pathname=`_root.${n}`:t&&Ia(r.pathname,t)==="/"?r.pathname=`${Xu(t)}/_root.${n}`:r.pathname=`${Xu(r.pathname)}.${n}`,r}async function j3(e,t){if(e.id in t)return t[e.id];try{let a=await import(e.module);return t[e.id]=a,a}catch(a){if(console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(a),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode&&import.meta.hot)throw a;return window.location.reload(),new Promise(()=>{})}}function U3(e){return e!=null&&typeof e.page=="string"}function F3(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function z3(e,t,a){let n=await Promise.all(e.map(async r=>{let s=t.routes[r.route.id];if(s){let i=await j3(s,a);return i.links?i.links():[]}return[]}));return H3(n.flat(1).filter(F3).filter(r=>r.rel==="stylesheet"||r.rel==="preload").map(r=>r.rel==="stylesheet"?{...r,rel:"prefetch",as:"style"}:{...r,rel:"prefetch"}))}function O0(e,t,a,n,r,s){let i=(u,c)=>a[c]?u.route.id!==a[c].route.id:!0,o=(u,c)=>a[c].pathname!==u.pathname||a[c].route.path?.endsWith("*")&&a[c].params["*"]!==u.params["*"];return s==="assets"?t.filter((u,c)=>i(u,c)||o(u,c)):s==="data"?t.filter((u,c)=>{let d=n.routes[u.route.id];if(!d||!d.hasLoader)return!1;if(i(u,c)||o(u,c))return!0;if(u.route.shouldRevalidate){let m=u.route.shouldRevalidate({currentUrl:new URL(r.pathname+r.search+r.hash,window.origin),currentParams:a[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:u.params,defaultShouldRevalidate:!0});if(typeof m=="boolean")return m}return!0}):[]}function B3(e,t,{includeHydrateFallback:a}={}){return q3(e.map(n=>{let r=t.routes[n.route.id];if(!r)return[];let s=[r.module];return r.clientActionModule&&(s=s.concat(r.clientActionModule)),r.clientLoaderModule&&(s=s.concat(r.clientLoaderModule)),a&&r.hydrateFallbackModule&&(s=s.concat(r.hydrateFallbackModule)),r.imports&&(s=s.concat(r.imports)),s}).flat(1))}function q3(e){return[...new Set(e)]}function I3(e){let t={},a=Object.keys(e).sort();for(let n of a)t[n]=e[n];return t}function H3(e,t){let a=new Set,n=new Set(t);return e.reduce((r,s)=>{if(t&&!U3(s)&&s.as==="script"&&s.href&&n.has(s.href))return r;let o=JSON.stringify(I3(s));return a.has(o)||(a.add(o),r.push({key:o,link:s})),r},[])}function vp(){let e=ue.useContext(Mr);return hp(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function G3(){let e=ue.useContext(Is);return hp(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var jo=ue.createContext(void 0);jo.displayName="FrameworkContext";function tc(){let e=ue.useContext(jo);return hp(e,"You must render this element inside a <HydratedRouter> element"),e}function Y3(e,t){let a=ue.useContext(jo),[n,r]=ue.useState(!1),[s,i]=ue.useState(!1),{onFocus:o,onBlur:u,onMouseEnter:c,onMouseLeave:d,onTouchStart:m}=t,f=ue.useRef(null);ue.useEffect(()=>{if(e==="render"&&i(!0),e==="viewport"){let y=g=>{g.forEach(v=>{i(v.isIntersecting)})},x=new IntersectionObserver(y,{threshold:.5});return f.current&&x.observe(f.current),()=>{x.disconnect()}}},[e]),ue.useEffect(()=>{if(n){let y=setTimeout(()=>{i(!0)},100);return()=>{clearTimeout(y)}}},[n]);let p=()=>{r(!0)},b=()=>{r(!1),i(!1)};return a?e!=="intent"?[s,f,{}]:[s,f,{onFocus:Lo(o,p),onBlur:Lo(u,b),onMouseEnter:Lo(c,p),onMouseLeave:Lo(d,b),onTouchStart:Lo(m,p)}]:[!1,f,{}]}function Lo(e,t){return a=>{e&&e(a),a.defaultPrevented||t(a)}}function cx({page:e,...t}){let a=l3(),{nonce:n}=tc(),{router:r}=vp(),s=ue.useMemo(()=>np(r.routes,e,r.basename),[r.routes,e,r.basename]);return s?(t.nonce==null&&n&&(t={...t,nonce:n}),a?ue.createElement(X3,{page:e,matches:s,...t}):ue.createElement(Z3,{page:e,matches:s,...t})):null}function J3(e){let{manifest:t,routeModules:a}=tc(),[n,r]=ue.useState([]);return ue.useEffect(()=>{let s=!1;return z3(e,t,a).then(i=>{s||r(i)}),()=>{s=!0}},[e,t,a]),n}function X3({page:e,matches:t,...a}){let n=Me(),{future:r}=tc(),{basename:s}=vp(),i=ue.useMemo(()=>{if(e===n.pathname+n.search+n.hash)return[];let o=lx(e,s,r.v8_trailingSlashAwareDataRequests,"rsc"),u=!1,c=[];for(let d of t)typeof d.route.shouldRevalidate=="function"?u=!0:c.push(d.route.id);return u&&c.length>0&&o.searchParams.set("_routes",c.join(",")),[o.pathname+o.search]},[s,r.v8_trailingSlashAwareDataRequests,e,n,t]);return ue.createElement(ue.Fragment,null,i.map(o=>ue.createElement("link",{key:o,rel:"prefetch",as:"fetch",href:o,...a})))}function Z3({page:e,matches:t,...a}){let n=Me(),{future:r,manifest:s,routeModules:i}=tc(),{basename:o}=vp(),{loaderData:u,matches:c}=G3(),d=ue.useMemo(()=>O0(e,t,c,s,n,"data"),[e,t,c,s,n]),m=ue.useMemo(()=>O0(e,t,c,s,n,"assets"),[e,t,c,s,n]),f=ue.useMemo(()=>{if(e===n.pathname+n.search+n.hash)return[];let y=new Set,x=!1;if(t.forEach(v=>{let $=s.routes[v.route.id];!$||!$.hasLoader||(!d.some(w=>w.route.id===v.route.id)&&v.route.id in u&&i[v.route.id]?.shouldRevalidate||$.hasClientLoader?x=!0:y.add(v.route.id))}),y.size===0)return[];let g=lx(e,o,r.v8_trailingSlashAwareDataRequests,"data");return x&&y.size>0&&g.searchParams.set("_routes",t.filter(v=>y.has(v.route.id)).map(v=>v.route.id).join(",")),[g.pathname+g.search]},[o,r.v8_trailingSlashAwareDataRequests,u,n,s,d,t,e,i]),p=ue.useMemo(()=>B3(m,s),[m,s]),b=J3(m);return ue.createElement(ue.Fragment,null,f.map(y=>ue.createElement("link",{key:y,rel:"prefetch",as:"fetch",href:y,...a})),p.map(y=>ue.createElement("link",{key:y,rel:"modulepreload",href:y,...a})),b.map(({key:y,link:x})=>ue.createElement("link",{key:y,nonce:a.nonce,...x,crossOrigin:x.crossOrigin??a.crossOrigin})))}function W3(...e){return t=>{e.forEach(a=>{typeof a=="function"?a(t):a!=null&&(a.current=t)})}}var eT=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{eT&&(window.__reactRouterVersion="7.18.1")}catch{}function gp({basename:e,children:t,useTransitions:a,window:n}){let r=W.useRef();r.current==null&&(r.current=P0({window:n,v5Compat:!0}));let s=r.current,[i,o]=W.useState({action:s.action,location:s.location}),u=W.useCallback(c=>{a===!1?o(c):W.startTransition(()=>o(c))},[a]);return W.useLayoutEffect(()=>s.listen(u),[s,u]),W.createElement(mp,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:s,useTransitions:a})}function dx({basename:e,children:t,history:a,useTransitions:n}){let[r,s]=W.useState({action:a.action,location:a.location}),i=W.useCallback(o=>{n===!1?s(o):W.startTransition(()=>s(o))},[n]);return W.useLayoutEffect(()=>a.listen(i),[a,i]),W.createElement(mp,{basename:e,children:t,location:r.location,navigationType:r.action,navigator:a,useTransitions:n})}dx.displayName="unstable_HistoryRouter";var Lr=W.forwardRef(function({onClick:t,discover:a="render",prefetch:n="none",relative:r,reloadDocument:s,replace:i,mask:o,state:u,target:c,to:d,preventScrollReset:m,viewTransition:f,defaultShouldRevalidate:p,...b},y){let{basename:x,navigator:g,useTransitions:v}=W.useContext(_t),$=typeof d=="string"&&ap.test(d),w=Q0(d,x);d=w.to;let S=X0(d,{relative:r}),R=Me(),C=null;if(o){let I=Wu(o,[],R.mask?R.mask.pathname:"/",!0);x!=="/"&&(I.pathname=I.pathname==="/"?x:Ra([x,I.pathname])),C=g.createHref(I)}let[E,O,j]=Y3(n,b),J=hx(d,{replace:i,mask:o,state:u,target:c,preventScrollReset:m,relative:r,viewTransition:f,defaultShouldRevalidate:p,useTransitions:v});function D(I){t&&t(I),I.defaultPrevented||J(I)}let B=!(w.isExternal||s),V=W.createElement("a",{...b,...j,href:(B?C:void 0)||w.absoluteURL||S,onClick:B?D:t,ref:W3(y,O),target:c,"data-discover":!$&&a==="render"?"true":void 0});return E&&!$?W.createElement(W.Fragment,null,V,W.createElement(cx,{page:S})):V});Lr.displayName="Link";var Ka=W.forwardRef(function({"aria-current":t="page",caseSensitive:a=!1,className:n="",end:r=!1,style:s,to:i,viewTransition:o,children:u,...c},d){let m=Ks(i,{relative:c.relative}),f=Me(),p=W.useContext(Is),{navigator:b,basename:y}=W.useContext(_t),x=p!=null&&bx(m)&&o===!0,g=b.encodeLocation?b.encodeLocation(m).pathname:m.pathname,v=f.pathname,$=p&&p.navigation&&p.navigation.location?p.navigation.location.pathname:null;a||(v=v.toLowerCase(),$=$?$.toLowerCase():null,g=g.toLowerCase()),$&&y&&($=Ia($,y)||$);let w=g!=="/"&&g.endsWith("/")?g.length-1:g.length,S=v===g||!r&&v.startsWith(g)&&v.charAt(w)==="/",R=$!=null&&($===g||!r&&$.startsWith(g)&&$.charAt(g.length)==="/"),C={isActive:S,isPending:R,isTransitioning:x},E=S?t:void 0,O;typeof n=="function"?O=n(C):O=[n,S?"active":null,R?"pending":null,x?"transitioning":null].filter(Boolean).join(" ");let j=typeof s=="function"?s(C):s;return W.createElement(Lr,{...c,"aria-current":E,className:O,ref:d,style:j,to:i,viewTransition:o},typeof u=="function"?u(C):u)});Ka.displayName="NavLink";var mx=W.forwardRef(({discover:e="render",fetcherKey:t,navigate:a,reloadDocument:n,replace:r,state:s,method:i=Yu,action:o,onSubmit:u,relative:c,preventScrollReset:d,viewTransition:m,defaultShouldRevalidate:f,...p},b)=>{let{useTransitions:y}=W.useContext(_t),x=vx(),g=gx(o,{relative:c}),v=i.toLowerCase()==="get"?"get":"post",$=typeof o=="string"&&ap.test(o);return W.createElement("form",{ref:b,method:v,action:g,onSubmit:n?u:S=>{if(u&&u(S),S.defaultPrevented)return;S.preventDefault();let R=S.nativeEvent.submitter,C=R?.getAttribute("formmethod")||i,E=()=>x(R||S.currentTarget,{fetcherKey:t,method:C,navigate:a,replace:r,state:s,relative:c,preventScrollReset:d,viewTransition:m,defaultShouldRevalidate:f});y&&a!==!1?W.startTransition(()=>E()):E()},...p,"data-discover":!$&&e==="render"?"true":void 0})});mx.displayName="Form";function fx({getKey:e,storageKey:t,...a}){let n=W.useContext(jo),{basename:r}=W.useContext(_t),s=Me(),i=cp();yx({getKey:e,storageKey:t});let o=W.useMemo(()=>{if(!n||!e)return null;let c=tp(s,i,r,e);return c!==s.key?c:null},[]);if(!n||n.isSpaMode)return null;let u=((c,d)=>{if(!window.history.state||!window.history.state.key){let m=Math.random().toString(32).slice(2);window.history.replaceState({key:m},"")}try{let f=JSON.parse(sessionStorage.getItem(c)||"{}")[d||window.history.state.key];typeof f=="number"&&window.scrollTo(0,f)}catch(m){console.error(m),sessionStorage.removeItem(c)}}).toString();return a.nonce==null&&n?.nonce&&(a.nonce=n.nonce),W.createElement("script",{...a,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${u})(${M0(JSON.stringify(t||ep))}, ${M0(JSON.stringify(o))})`}})}fx.displayName="ScrollRestoration";function px(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function yp(e){let t=W.useContext(Mr);return De(t,px(e)),t}function tT(e){let t=W.useContext(Is);return De(t,px(e)),t}function hx(e,{target:t,replace:a,mask:n,state:r,preventScrollReset:s,relative:i,viewTransition:o,defaultShouldRevalidate:u,useTransitions:c}={}){let d=pe(),m=Me(),f=Ks(e,{relative:i});return W.useCallback(p=>{if(T3(p,t)){p.preventDefault();let b=a!==void 0?a:qs(m)===qs(f),y=()=>d(e,{replace:b,mask:n,state:r,preventScrollReset:s,relative:i,viewTransition:o,defaultShouldRevalidate:u});c?W.startTransition(()=>y()):y()}},[m,d,f,a,n,r,t,e,s,i,o,u,c])}var aT=0,nT=()=>`__${String(++aT)}__`;function vx(){let{router:e}=yp("useSubmit"),{basename:t}=W.useContext(_t),a=w3(),n=e.fetch,r=e.navigate;return W.useCallback(async(s,i={})=>{let{action:o,method:u,encType:c,formData:d,body:m}=M3(s,t);if(i.navigate===!1){let f=i.fetcherKey||nT();await n(f,a,i.action||o,{defaultShouldRevalidate:i.defaultShouldRevalidate,preventScrollReset:i.preventScrollReset,formData:d,body:m,formMethod:i.method||u,formEncType:i.encType||c,flushSync:i.flushSync})}else await r(i.action||o,{defaultShouldRevalidate:i.defaultShouldRevalidate,preventScrollReset:i.preventScrollReset,formData:d,body:m,formMethod:i.method||u,formEncType:i.encType||c,replace:i.replace,state:i.state,fromRouteId:a,flushSync:i.flushSync,viewTransition:i.viewTransition})},[n,r,t,a])}function gx(e,{relative:t}={}){let{basename:a}=W.useContext(_t),n=W.useContext(ia);De(n,"useFormAction must be used inside a RouteContext");let[r]=n.matches.slice(-1),s={...Ks(e||".",{relative:t})},i=Me();if(e==null){s.search=i.search;let o=new URLSearchParams(s.search),u=o.getAll("index");if(u.some(d=>d==="")){o.delete("index"),u.filter(m=>m).forEach(m=>o.append("index",m));let d=o.toString();s.search=d?`?${d}`:""}}return(!e||e===".")&&r.route.index&&(s.search=s.search?s.search.replace(/^\?/,"?index&"):"?index"),a!=="/"&&(s.pathname=s.pathname==="/"?a:Ra([a,s.pathname])),qs(s)}var ep="react-router-scroll-positions",Gu={};function tp(e,t,a,n){let r=null;return n&&(a!=="/"?r=n({...e,pathname:Ia(e.pathname,a)||e.pathname},t):r=n(e,t)),r==null&&(r=e.key),r}function yx({getKey:e,storageKey:t}={}){let{router:a}=yp("useScrollRestoration"),{restoreScrollPosition:n,preventScrollReset:r}=tT("useScrollRestoration"),{basename:s}=W.useContext(_t),i=Me(),o=cp(),u=sx();W.useEffect(()=>(window.history.scrollRestoration="manual",()=>{window.history.scrollRestoration="auto"}),[]),rT(W.useCallback(()=>{if(u.state==="idle"){let c=tp(i,o,s,e);Gu[c]=window.scrollY}try{sessionStorage.setItem(t||ep,JSON.stringify(Gu))}catch(c){sa(!1,`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${c}).`)}window.history.scrollRestoration="auto"},[u.state,e,s,i,o,t])),typeof document<"u"&&(W.useLayoutEffect(()=>{try{let c=sessionStorage.getItem(t||ep);c&&(Gu=JSON.parse(c))}catch{}},[t]),W.useLayoutEffect(()=>{let c=a?.enableScrollRestoration(Gu,()=>window.scrollY,e?(d,m)=>tp(d,m,s,e):void 0);return()=>c&&c()},[a,s,e]),W.useLayoutEffect(()=>{if(n!==!1){if(typeof n=="number"){window.scrollTo(0,n);return}try{if(i.hash){let c=document.getElementById(decodeURIComponent(i.hash.slice(1)));if(c){c.scrollIntoView();return}}}catch{sa(!1,`"${i.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`)}r!==!0&&window.scrollTo(0,0)}},[i,n,r]))}function rT(e,t){let{capture:a}=t||{};W.useEffect(()=>{let n=a!=null?{capture:a}:void 0;return window.addEventListener("pagehide",e,n),()=>{window.removeEventListener("pagehide",e,n)}},[e,a])}function bx(e,{relative:t}={}){let a=W.useContext(sp);De(a!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:n}=yp("useViewTransitionState"),r=Ks(e,{relative:t});if(!a.isTransitioning)return!1;let s=Ia(a.currentLocation.pathname,n)||a.currentLocation.pathname,i=Ia(a.nextLocation.pathname,n)||a.nextLocation.pathname;return Po(r.pathname,i)!=null||Po(r.pathname,s)!=null}var At=new hd({defaultOptions:{queries:{refetchOnWindowFocus:!1,retry:1,staleTime:1e4}}});var bp="ironclaw_token",xt="/api/webchat/v2",Pr=class extends Error{constructor(t,{status:a,statusText:n,body:r,headers:s,payload:i}={}){super(t),this.name="ApiError",this.status=a,this.statusText=n,this.body=r,this.headers=s,this.payload=i}};function xa(){return sessionStorage.getItem(bp)||""}function Qs(e){e?sessionStorage.setItem(bp,e):sessionStorage.removeItem(bp)}function ac(){if(typeof crypto<"u"&&typeof crypto.randomUUID=="function")return crypto.randomUUID();let e=new Uint8Array(16);return(crypto?.getRandomValues||(t=>t))(e),Array.from(e,t=>t.toString(16).padStart(2,"0")).join("")}async function wx(e){let t=await e.text().catch(()=>"");if(!t)return{text:"",payload:void 0};if(!(e.headers.get("content-type")||"").includes("application/json"))return{text:t,payload:void 0};try{return{text:t,payload:JSON.parse(t)}}catch{return{text:t,payload:void 0}}}function $x(e){return String(e).replace(/[_-]+/g," ").trim().replace(/^\w/,t=>t.toUpperCase())}function Sx({payload:e,body:t,statusText:a,status:n}={}){if(e&&typeof e=="object"){if(e.validation_code){let i=$x(e.validation_code);return e.field?`${i} (${e.field})`:i}let s=e.kind||e.error;if(s){let i=$x(s);return e.field?`${i} (${e.field})`:i}}let r=(t||"").trim();return r&&r.length<=200&&!r.startsWith("{")&&!r.startsWith("[")?r:a||(typeof n=="number"&&n>0?`Request failed (HTTP ${n})`:"Request failed")}async function Z(e,t={}){let a=xa(),n=new Headers(t.headers||{});n.set("Accept","application/json"),t.body&&!n.has("Content-Type")&&n.set("Content-Type","application/json"),a&&n.set("Authorization",`Bearer ${a}`);let r=await fetch(e,{credentials:"same-origin",...t,headers:n});if(!r.ok){let{text:i,payload:o}=await wx(r);throw new Pr(Sx({payload:o,body:i,statusText:r.statusText,status:r.status}),{status:r.status,statusText:r.statusText,body:i,headers:r.headers,payload:o})}return(r.headers.get("content-type")||"").includes("application/json")?r.json():r.text()}function nc(){return Z(`${xt}/session`)}function rc({clientActionId:e,requestedThreadId:t,projectId:a}={}){let n={client_action_id:e||ac()};return t&&(n.requested_thread_id=t),a&&(n.project_id=a),Z(`${xt}/threads`,{method:"POST",body:JSON.stringify(n)})}function Nx({limit:e,cursor:t}={}){let a=new URL(`${xt}/threads`,window.location.origin);return e!=null&&a.searchParams.set("limit",String(e)),t&&a.searchParams.set("cursor",t),Z(a.pathname+a.search)}function _x({threadId:e}={}){return e?Z(`${xt}/threads/${encodeURIComponent(e)}`,{method:"DELETE"}):Promise.reject(new Error("threadId is required"))}function xp(e){return`${xt}/threads/${encodeURIComponent(e)}/files`}function Rx({threadId:e,path:t}={}){if(!e)return Promise.reject(new Error("threadId is required"));let a=new URL(xp(e),window.location.origin);return t&&a.searchParams.set("path",t),Z(a.pathname+a.search)}function kx({threadId:e,path:t}={}){if(!e||!t)return Promise.reject(new Error("threadId and path are required"));let a=new URL(`${xp(e)}/stat`,window.location.origin);return a.searchParams.set("path",t),Z(a.pathname+a.search)}function sc({threadId:e,path:t}={}){if(!e||!t)throw new Error("projectFileContentUrl requires threadId and path");let a=new URL(`${xp(e)}/content`,window.location.origin);return a.searchParams.set("path",t),a.pathname+a.search}function Cx({limit:e,runLimit:t}={}){let a=new URLSearchParams;e!=null&&a.set("limit",String(e)),t!=null&&a.set("run_limit",String(t));let n=a.toString();return Z(`${xt}/automations${n?`?${n}`:""}`)}var Ex=`${xt}/projects`;function sT(e){return`${Ex}/${encodeURIComponent(e)}`}function Tx({limit:e}={}){let t=new URL(Ex,window.location.origin);return e!=null&&t.searchParams.set("limit",String(e)),Z(t.pathname+t.search)}function Ax({projectId:e}={}){return e?Z(sT(e)):Promise.reject(new Error("projectId is required"))}function Dx(){return Z(`${xt}/outbound/preferences`)}function Mx(){return Z(`${xt}/outbound/targets`)}function Ox({finalReplyTargetId:e}={}){return Z(`${xt}/outbound/preferences`,{method:"POST",body:JSON.stringify({final_reply_target_id:e??null})})}function Lx({limit:e,cursor:t,level:a,target:n,threadId:r,runId:s,turnId:i,toolCallId:o,toolName:u,source:c}={}){let d=new URL(`${xt}/operator/logs`,window.location.origin);return e!=null&&d.searchParams.set("limit",String(e)),t&&d.searchParams.set("cursor",t),a&&d.searchParams.set("level",a),n&&d.searchParams.set("target",n),r&&d.searchParams.set("thread_id",r),s&&d.searchParams.set("run_id",s),i&&d.searchParams.set("turn_id",i),o&&d.searchParams.set("tool_call_id",o),u&&d.searchParams.set("tool_name",u),c&&d.searchParams.set("source",c),Z(d.pathname+d.search)}function Px({threadId:e,content:t,attachments:a=[],clientActionId:n}){let r={client_action_id:n||ac(),content:t};return a.length>0&&(r.attachments=a),Z(`${xt}/threads/${encodeURIComponent(e)}/messages`,{method:"POST",body:JSON.stringify(r)})}function jx({threadId:e,limit:t,cursor:a}={}){let n=new URL(`${xt}/threads/${encodeURIComponent(e)}/timeline`,window.location.origin);return t!=null&&n.searchParams.set("limit",String(t)),a&&n.searchParams.set("cursor",a),Z(n.pathname+n.search)}function Ux({threadId:e,messageId:t,attachmentId:a}={}){if(!e||!t||!a)throw new Error("attachmentUrl requires threadId, messageId, and attachmentId");return`${xt}/threads/${encodeURIComponent(e)}/messages/${encodeURIComponent(t)}/attachments/${encodeURIComponent(a)}`}async function ka(e){let t=new URL(e,window.location.origin);if(t.origin!==window.location.origin)throw new Pr("Invalid attachment URL.",{status:400,statusText:"Bad Request"});let a=xa(),n=new Headers;a&&n.set("Authorization",`Bearer ${a}`);let r=await fetch(t.pathname+t.search,{credentials:"same-origin",headers:n});if(!r.ok){let{text:s,payload:i}=await wx(r);throw new Pr(Sx({payload:i,body:s,statusText:r.statusText}),{status:r.status,statusText:r.statusText,body:s,payload:i})}return await r.blob()}function $p(e){return new Promise((t,a)=>{let n=new FileReader;n.onload=()=>t(n.result),n.onerror=()=>a(n.error||new Error("attachment read failed")),n.readAsDataURL(e)})}async function ic(e){return $p(await ka(e))}function Fx({threadId:e,afterCursor:t}={}){let a=new URL(`${xt}/threads/${encodeURIComponent(e)}/events`,window.location.origin),n=xa();return n&&a.searchParams.set("token",n),t&&a.searchParams.set("after_cursor",t),new EventSource(a.toString())}function zx({threadId:e,runId:t,reason:a,clientActionId:n}={}){let r={client_action_id:n||ac()};return a&&(r.reason=a),Z(`${xt}/threads/${encodeURIComponent(e)}/runs/${encodeURIComponent(t)}/cancel`,{method:"POST",body:JSON.stringify(r)})}function wp({threadId:e,runId:t,gateRef:a,resolution:n,always:r,credentialRef:s,clientActionId:i,signal:o}={}){let u={client_action_id:i||ac(),resolution:n};return r!=null&&(u.always=r),s&&(u.credential_ref=s),Z(`${xt}/threads/${encodeURIComponent(e)}/runs/${encodeURIComponent(t)}/gates/${encodeURIComponent(a)}/resolve`,{method:"POST",signal:o,body:JSON.stringify(u)})}function Bx({provider:e,accountLabel:t,token:a,threadId:n,runId:r,gateRef:s,signal:i}={}){return Z("/api/reborn/product-auth/manual-token/submit",{method:"POST",signal:i,body:JSON.stringify({provider:e,account_label:t,token:a,thread_id:n,run_id:r,gate_ref:s})})}function Vs(){return Promise.resolve({engine_v2_enabled:!1,restart_enabled:!1,total_connections:null,llm_backend:null,llm_model:null,todo:!0})}async function qx(){try{let e=await fetch("/auth/providers",{headers:{Accept:"application/json"},credentials:"same-origin"});if(!e.ok)return{providers:[]};let t=await e.json();return{providers:Array.isArray(t?.providers)?t.providers:[]}}catch{return{providers:[]}}}async function Ix(e){let t=await fetch("/auth/session/exchange",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},credentials:"same-origin",body:JSON.stringify({ticket:e})});if(!t.ok)throw new Pr("Could not complete sign-in.",{status:t.status,statusText:t.statusText,headers:t.headers});let a=await t.json(),n=(a?.token||"").trim();if(!n)throw new Pr("Sign-in response did not include a token.",{status:t.status,statusText:t.statusText,headers:t.headers,payload:a});return n}async function Hx(){let e=xa();if(!e)return;let t=new Headers({Accept:"application/json"});t.set("Authorization",`Bearer ${e}`);try{await fetch("/auth/logout",{method:"POST",headers:t,credentials:"same-origin"})}catch{}}var oc="anon",Kx=oc;function Qx(e){Kx=e&&e.tenant_id&&e.user_id?`${e.tenant_id}:${e.user_id}`:oc}function Rt(){return Kx}var Vx="ironclaw:v2-thread-pins:",Sp=new Set,vn=new Set,Np=null;function _p(){return`${Vx}${Rt()}`}function iT(){try{let e=window.localStorage.getItem(_p());if(!e)return[];let t=JSON.parse(e);return Array.isArray(t)?t.filter(a=>typeof a=="string"):[]}catch{return[]}}function oT(){try{vn.size===0?window.localStorage.removeItem(_p()):window.localStorage.setItem(_p(),JSON.stringify([...vn]))}catch{}}function Gx(){let e=Rt();if(e!==Np){vn.clear();for(let t of iT())vn.add(t);Np=e}}function Yx(){return new Set(vn)}function Jx(){let e=Yx();for(let t of Sp)try{t(e)}catch{}}function Xx(e){e&&(Gx(),vn.has(e)?vn.delete(e):vn.add(e),oT(),Jx())}function Zx(){return Gx(),Yx()}function Wx(e){return Sp.add(e),()=>{Sp.delete(e)}}function e$(){vn.clear(),Np=Rt();try{let e=[];for(let t=0;t<window.localStorage.length;t+=1){let a=window.localStorage.key(t);a&&a.startsWith(Vx)&&e.push(a)}e.forEach(t=>window.localStorage.removeItem(t))}catch{}Jx()}var lT=0,jr={accept:[],maxCount:10,maxFileBytes:5*1024*1024,maxTotalBytes:10*1024*1024};function Rp(e){let t=(e||"").toLowerCase();return t.startsWith("image/")?"image":t.startsWith("audio/")?"audio":"document"}function t$(e){let t=(e||"").toLowerCase();return t.startsWith("image/")?"image":t.startsWith("audio/")?"audio":t.startsWith("video/")?"video":t==="application/pdf"?"pdf":uT(t)?"text":"download"}function uT(e){return e.startsWith("text/")||e==="application/json"||e==="application/xml"||e==="application/csv"||e.endsWith("+json")||e.endsWith("+xml")}function Uo(e){if(!Number.isFinite(e)||e<0)return"";if(e<1024)return`${e} B`;let t=["KB","MB","GB"],a=e/1024,n=0;for(;a>=1024&&n<t.length-1;)a/=1024,n+=1;return`${a>=10||Number.isInteger(a)?Math.round(a):Math.round(a*10)/10} ${t[n]}`}function cT(e,t){if(!t||t.length===0)return!0;let a=(e.type||"").toLowerCase(),n=(e.name||"").toLowerCase();return t.some(r=>{let s=r.trim().toLowerCase();return s?s==="*/*"||s==="*"?!0:s.endsWith("/*")?a.startsWith(s.slice(0,-1)):s.startsWith(".")?n.endsWith(s):a===s:!1})}function dT(e){return new Promise((t,a)=>{let n=new FileReader;n.onload=()=>{typeof n.result=="string"?t(n.result):a(new Error("file read produced no data URL"))},n.onerror=()=>a(n.error||new Error("file read failed")),n.readAsDataURL(e)})}function mT(e,t){let a=e.indexOf(",");if(a<0)return{mime:t||"",base64:""};let n=e.slice(0,a),r=e.slice(a+1),s=n.match(/^data:([^;]*)/);return{mime:s&&s[1]||t||"",base64:r}}async function a$(e,{limits:t,existing:a=[],t:n}){let r=t||jr,s=[],i=[],o=a.length,u=a.reduce((c,d)=>c+(d.sizeBytes||0),0);for(let c of e){if(o>=r.maxCount){i.push(n("chat.attachmentTooMany",{max:r.maxCount}));break}if(!cT(c,r.accept)){i.push(n("chat.attachmentUnsupportedType",{name:c.name||"file"}));continue}if(c.size>r.maxFileBytes){i.push(n("chat.attachmentTooLarge",{name:c.name||"file",max:Uo(r.maxFileBytes)}));continue}if(u+c.size>r.maxTotalBytes){let y=n("chat.attachmentTotalTooLarge",{max:Uo(r.maxTotalBytes)});i.includes(y)||i.push(y);continue}let d;try{d=await dT(c)}catch{i.push(n("chat.attachmentReadFailed",{name:c.name||"file"}));continue}let{mime:m,base64:f}=mT(d,c.type),p=m||"application/octet-stream",b=Rp(p);s.push({id:`staged-${lT++}`,filename:c.name||"attachment",mimeType:p,kind:b,sizeBytes:c.size,sizeLabel:Uo(c.size),dataBase64:f,previewUrl:b==="image"?d:null}),o+=1,u+=c.size}return{staged:s,errors:i}}function n$(e){return{mime_type:e.mimeType,filename:e.filename,data_base64:e.dataBase64}}function r$(e){return{id:e.id,filename:e.filename,mime_type:e.mimeType,kind:e.kind,size_label:e.sizeLabel,preview_url:e.previewUrl}}function fT(e,t){let a=e.attachments;if(!(!Array.isArray(a)||a.length===0))return a.map(n=>{let r=n.kind||Rp(n.mime_type),s=t&&n.storage_key&&e.message_id&&n.id?Ux({threadId:t,messageId:e.message_id,attachmentId:n.id}):null;return{id:n.id,filename:n.filename||"attachment",mime_type:n.mime_type||"",kind:r,size_label:Number.isFinite(n.size_bytes)?Uo(n.size_bytes):"",preview_url:null,fetch_url:s}})}function i$(e,t=[],a=null){let n=new Set,r=[];for(let s of e||[]){if(s.kind==="tool_result_reference")continue;if(s.kind==="capability_display_preview"){let c=gT(s);if(!c)continue;let d=`tool-${c.invocationId}`;if(n.has(d))continue;n.add(d),r.push({id:d,role:"tool_activity",...c,timestamp:s$(s)||c.updatedAt||null,sequence:s.sequence,activityOrder:c.activityOrder,activityOrderSource:c.activityOrderSource,turnRunId:s.turn_run_id||null});continue}let i=`msg-${s.message_id}`;if(n.has(i))continue;n.add(i);let o=vT(s),u=o==="user"&&(s.status==="rejected_busy"||s.status==="deferred_busy");r.push({id:i,role:o,content:s.content||"",attachments:fT(s,a),timestamp:s$(s),kind:s.kind,status:u?"error":s.status,...u&&{error:"This message wasn't sent because Ironclaw was busy. Resend it to try again."},isFinalReply:hT(s),sequence:s.sequence,turnRunId:s.turn_run_id||null})}for(let s of t){if(n.has(s.id))continue;let i=pT(s);i.timelineMessageId&&n.has(`msg-${i.timelineMessageId}`)||r.push(i)}return r}function pT(e){return{...e,role:e.role||"user",isOptimistic:e.isOptimistic!==!1}}function hT(e){return(e.kind==="assistant"||e.kind==="assistant_message")&&e.status==="finalized"}function vT(e){switch(e.kind){case"user":case"user_message":return"user";case"assistant":case"assistant_message":case"tool_result":return"assistant";case"system":return"system";default:return e.actor_id?"user":"assistant"}}function s$(e){return e.received_at||e.created_at||null}function gT(e){if(!e.content)return null;let t;try{t=JSON.parse(e.content)}catch(a){return console.warn("Failed to parse capability_display_preview envelope",a),null}return!t||!t.invocation_id?null:kp(t)}function kp(e){let t=e.status==="failed"||e.status==="killed",a=l$(e.activity_order);return{invocationId:e.invocation_id,callId:e.invocation_id,capabilityId:e.capability_id||null,toolName:Ur(e.title||e.capability_id)||"tool",toolStatus:o$(e.status),toolDetail:e.subtitle||null,toolParameters:e.input_summary||null,toolResultPreview:t?null:e.output_preview||e.output_summary||null,toolError:t&&(e.output_summary||e.output_preview||e.result_ref)||null,toolDurationMs:null,updatedAt:e.updated_at||null,resultRef:e.result_ref||null,truncated:!!e.truncated,outputBytes:e.output_bytes??null,outputKind:e.output_kind||null,turnRunId:e.turn_run_id||null,activityOrder:a,activityOrderSource:Number.isFinite(a)?"projection":null}}function Cp(e){let t=l$(e.activity_order);return{invocationId:e.invocation_id,callId:e.invocation_id,capabilityId:e.capability_id||null,toolName:Ur(e.capability_id)||"tool",toolStatus:o$(e.status),toolDetail:e.subtitle||null,toolParameters:e.input_summary||null,toolResultPreview:null,toolError:e.error_kind||null,toolDurationMs:null,updatedAt:e.updated_at||null,resultRef:null,truncated:!1,outputBytes:e.output_bytes??null,outputKind:null,turnRunId:e.turn_run_id||null,activityOrder:t,activityOrderSource:Number.isFinite(t)?"projection":null}}function Gs(e){return e==="success"||e==="error"}function Ur(e){let t=typeof e=="string"?e.trim():"";if(!t)return"";let a=t.split(".");return a[a.length-1]||t}function o$(e){switch(e){case"completed":return"success";case"failed":case"killed":return"error";case"started":case"running":default:return"running"}}function l$(e){let t=Number(e);return Number.isFinite(t)?t:null}var yT=50,gn=new Map,bT=30;function Ep(e,t){for(gn.delete(e),gn.set(e,t);gn.size>bT;){let a=gn.keys().next().value;gn.delete(a)}}function lc(e){return`${Rt()}:${e}`}function c$(){gn.clear()}function d$(e,t={}){let{getPendingMessages:a,setPendingMessages:n}=t,r=e?gn.get(lc(e)):null,[s,i]=h.default.useState({messages:r?.messages||[],nextCursor:r?.nextCursor||null,isLoading:!1,loadError:null}),o=h.default.useRef(new Set),u=h.default.useRef(e);u.current=e;let c=h.default.useCallback(async(d,m={})=>{let{preserveClientOnly:f=!1}=m;if(!e){i({messages:[],nextCursor:null,isLoading:!1,loadError:null});return}if(o.current.has(e))return;o.current.add(e);let p=Rt(),b=lc(e);i(y=>({...y,isLoading:!0}));try{let y=await jx({threadId:e,limit:yT,cursor:d});if(Rt()!==p)return;let x=d?[]:a?.()||[],g=i$(y.messages||[],x,e),v=y.next_cursor||null;if(d||n?.([]),!d){let $=gn.get(b)?.messages||[],w=u$(g,$,{preserveClientOnly:f});Ep(b,{messages:w,nextCursor:v})}i($=>{if(u.current!==e)return $;let w;return d?w=xT(g,$.messages):w=u$(g,$.messages,{preserveClientOnly:f}),Ep(b,{messages:w,nextCursor:v}),{messages:w,nextCursor:v,isLoading:!1,loadError:null}})}catch(y){if(console.error("Failed to load timeline:",y),Rt()!==p)return;i(x=>u.current===e?{...x,isLoading:!1,loadError:"Failed to load conversation history."}:x)}finally{o.current.delete(e)}},[e,a,n]);return h.default.useEffect(()=>{let d=e?gn.get(lc(e)):null;i({messages:d?.messages||[],nextCursor:d?.nextCursor||null,isLoading:!!e&&!d,loadError:null}),e&&c()},[e,c]),{messages:s.messages,hasMore:!!s.nextCursor,nextCursor:s.nextCursor,isLoading:s.isLoading,loadError:s.loadError,loadHistory:c,setMessages:d=>i(m=>{let f=typeof d=="function"?d(m.messages):d;return e&&Ep(lc(e),{messages:f,nextCursor:m.nextCursor}),{...m,messages:f}})}}function xT(e,t){let a=new Set(t.map(n=>n?.id).filter(Boolean));return[...e.filter(n=>!a.has(n?.id)),...t]}function u$(e,t,a={}){let{preserveClientOnly:n=!1}=a,r=new Set(e.map(i=>i?.id).filter(Boolean)),s=t.filter(i=>!i||typeof i.id!="string"||r.has(i.id)?!1:$T(i)?!0:n&&i.id.startsWith("err-"));return s.length>0?[...e,...s]:e}function $T(e){return e?.role==="tool_activity"||e?.role==="thinking"}var zo="__new__",m$="ironclaw:v2-draft:";function Ys(e){return`${m$}${Rt()}:${e||zo}`}function Tp(e){try{return window.localStorage.getItem(Ys(e))||""}catch{return""}}function Ap(e,t){try{t?window.localStorage.setItem(Ys(e),t):window.localStorage.removeItem(Ys(e))}catch{}}function f$(e){Ap(e,"")}var Fo=new Map;function Dp(e){return Fo.get(Ys(e))||[]}function p$(e,t){let a=Ys(e);t&&t.length>0?Fo.set(a,t):Fo.delete(a)}function h$(e){Fo.delete(Ys(e))}function v$(){Fo.clear();try{let e=[];for(let t=0;t<window.localStorage.length;t+=1){let a=window.localStorage.key(t);a&&a.startsWith(m$)&&e.push(a)}e.forEach(t=>window.localStorage.removeItem(t))}catch{}}function wT(e,t){if(!e)return"";let a=e.startsWith("#")?e.slice(1):e;try{return new URLSearchParams(a).get(t)||""}catch{return""}}function ST(e,t){if(!e)return"";let a=e.startsWith("#")?e.slice(1):e;try{let n=new URLSearchParams(a);n.delete(t);let r=n.toString();return r?`#${r}`:""}catch{return e}}function NT(){let e=new URL(window.location.href),t=(e.searchParams.get("token")||"").trim(),a=wT(e.hash,"token").trim(),n=a||t;if(!n)return"";t&&e.searchParams.delete("token");let r=a?ST(e.hash,"token"):e.hash;return window.history.replaceState({},"",e.pathname+e.search+r),xa()?"":(Qs(n),n)}function _T(){let e=new URL(window.location.href),t=(e.searchParams.get("login_ticket")||"").trim();return t?(e.searchParams.delete("login_ticket"),window.history.replaceState({},"",e.pathname+e.search+e.hash),t):""}var RT={denied:"Sign-in was cancelled.",invalid_state:"Your sign-in session expired. Please try again.",invalid_request:"Sign-in request was malformed. Please try again.",provider_mismatch:"Sign-in provider mismatch. Please try again.",unauthorized:"This account is not authorized.",exchange_failed:"Could not complete sign-in with the provider.",server_error:"Sign-in is temporarily unavailable."};function kT(){let e=new URL(window.location.href),t=(e.searchParams.get("login_error")||"").trim();return t?(e.searchParams.delete("login_error"),window.history.replaceState({},"",e.pathname+e.search+e.hash),RT[t]||"Could not complete sign-in. Please try again."):""}function g$(){let[e,t]=h.default.useState(()=>NT()||xa()),[a,n]=h.default.useState(()=>kT()),[r]=h.default.useState(()=>_T()),[s,i]=h.default.useState(null),[o,u]=h.default.useState(()=>!!(r&&!xa())),[c,d]=h.default.useState(()=>!!xa());h.default.useEffect(()=>{if(!r||xa()){u(!1);return}let b=!1;return Ix(r).then(y=>{b||(Qs(y),d(!0),t(y),i(null),n(""),u(!1),At.clear())}).catch(()=>{b||(n("Could not complete sign-in. Please try again."),u(!1))}),()=>{b=!0}},[r]),h.default.useEffect(()=>{if(!e||o){i(null),d(!1);return}let b=!1;return d(!0),nc().then(y=>{b||(i(y),d(!1))}).catch(y=>{b||(i(null),d(!1),(y?.status===401||y?.status===403)&&(Qs(""),t(""),n("Your session expired. Please sign in again."),At.clear()))}),()=>{b=!0}},[e,o]),Qx(s);let m=h.default.useRef(null);h.default.useEffect(()=>{let b=Rt();m.current&&m.current!==oc&&m.current!==b&&(c$(),v$(),e$()),m.current=b},[s]);let f=h.default.useCallback(b=>{Qs(b),d(!!b),t(b),i(null),n(""),At.clear()},[]),p=h.default.useCallback(()=>{Hx().catch(()=>{}),Qs(""),d(!1),t(""),i(null),n(""),At.clear()},[]);return{token:e,profile:s?{tenant_id:s.tenant_id,user_id:s.user_id}:null,error:a,setError:n,isChecking:o||c,isAuthenticated:!!e,isAdmin:!!s?.capabilities?.operator_webui_config,rebornProjectsEnabled:!!s?.features?.reborn_projects,signIn:f,signOut:p}}var Fr="/chat",Bo=[{id:"chat",path:"/chat",labelKey:"nav.chat"},{id:"workspace",path:"/workspace",labelKey:"nav.workspace"},{id:"projects",path:"/projects",labelKey:"nav.projects",hidden:!0},{id:"jobs",path:"/jobs",labelKey:"nav.jobs",hidden:!0},{id:"routines",path:"/routines",labelKey:"nav.routines",hidden:!0},{id:"automations",path:"/automations",labelKey:"nav.automations"},{id:"missions",path:"/missions",labelKey:"nav.missions",hidden:!0},{id:"extensions",path:"/extensions",labelKey:"nav.extensions"},{id:"settings",path:"/settings",labelKey:"nav.settings",hidden:!1},{id:"admin",path:"/admin",labelKey:"nav.admin",hidden:!0}];var CT=[{id:"inference",labelKey:"settings.inference",icon:"spark"},{id:"skills",labelKey:"settings.skills",icon:"file"},{id:"traces",labelKey:"settings.traceCommons",icon:"layers"},{id:"language",labelKey:"settings.language",icon:"globe"}],ET=[{id:"registry",labelKey:"extensions.registry",icon:"plus"},{id:"channels",labelKey:"extensions.channels",icon:"send"},{id:"mcp",labelKey:"extensions.mcp",icon:"pulse"}],TT=[{id:"dashboard",labelKey:"admin.tab.dashboard",icon:"pulse"},{id:"users",labelKey:"admin.tab.users",icon:"lock"},{id:"usage",labelKey:"admin.tab.usage",icon:"spark"}],uc={settings:CT,extensions:ET,admin:TT};var y$="ironclaw:v2-theme";function AT(){try{if(window.__IRONCLAW_INITIAL_THEME__==="light"||window.__IRONCLAW_INITIAL_THEME__==="dark")return window.__IRONCLAW_INITIAL_THEME__;let e=document.documentElement.dataset.theme;if(e==="light"||e==="dark")return e;let t=window.localStorage.getItem(y$);return t==="light"||t==="dark"?t:window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"light"}}function cc(){let[e,t]=h.default.useState(AT);h.default.useEffect(()=>{document.documentElement.dataset.theme=e;try{window.localStorage.setItem(y$,e)}catch{}},[e]);let a=h.default.useCallback(()=>{t(n=>n==="dark"?"light":"dark")},[]);return{theme:e,toggleTheme:a}}function b$(e){return H({enabled:!!e,queryKey:["gateway-status",e],queryFn:Vs,refetchInterval:3e4})}function x$(){return Promise.resolve({settings:{},todo:!0})}function $$(e,t){return Promise.resolve({success:!1,message:"TODO: requires v2 settings endpoint"})}function w$(e){return Promise.resolve({success:!1,message:"TODO: requires v2 settings endpoint"})}function dc(){return Z("/api/webchat/v2/llm/providers")}function S$(e){return Z("/api/webchat/v2/llm/providers",{method:"POST",body:JSON.stringify(e)})}function N$(e){return Z(`/api/webchat/v2/llm/providers/${encodeURIComponent(e)}/delete`,{method:"POST"})}function Wn(e){return Z("/api/webchat/v2/llm/active",{method:"POST",body:JSON.stringify(e)})}function _$(e){return Z("/api/webchat/v2/llm/test-connection",{method:"POST",body:JSON.stringify(e)})}function R$(e){return Z("/api/webchat/v2/llm/list-models",{method:"POST",body:JSON.stringify(e)})}function k$(e){return Z("/api/webchat/v2/llm/nearai/login",{method:"POST",body:JSON.stringify(e)})}function C$(e){return Z("/api/webchat/v2/llm/nearai/wallet",{method:"POST",body:JSON.stringify(e)})}function E$(){return Z("/api/webchat/v2/llm/codex/login",{method:"POST"})}function T$(){return Promise.resolve({tools:[],todo:!0})}function A$(e,t){return Promise.resolve({success:!1,message:"TODO: requires v2 tools endpoint"})}function D$(){return Z("/api/webchat/v2/extensions")}function M$(){return Z("/api/webchat/v2/extensions/registry")}function O$(){return Z("/api/webchat/v2/skills")}function L$(e){return Z(`/api/webchat/v2/skills/${encodeURIComponent(e)}`)}function P$(e){return Z("/api/webchat/v2/skills/install",{method:"POST",headers:{"X-Confirm-Action":"true"},body:JSON.stringify(e)})}function j$(e,t){return Z(`/api/webchat/v2/skills/${encodeURIComponent(e)}`,{method:"PUT",headers:{"X-Confirm-Action":"true"},body:JSON.stringify(t)})}function U$(e){return Z(`/api/webchat/v2/skills/${encodeURIComponent(e)}`,{method:"DELETE",headers:{"X-Confirm-Action":"true"}})}function F$(){return Z("/api/webchat/v2/traces/credit").catch(e=>{if(e&&e.name==="ApiError"&&DT(e.status))return MT();throw e})}function DT(e){return e===401||e===403||e===502||e===503||e===504}function MT(){return{enrolled:!1,pending_credit:0,final_credit:0,delayed_credit_delta:0,submissions_total:0,submissions_submitted:0,submissions_accepted:0,submissions_revoked:0,submissions_expired:0,credit_events_total:0,last_submission_at:null,last_credit_sync_at:null,recent_explanations:[],manual_review_hold_count:0,holds:[],note:"Trace Commons credits are unavailable right now."}}function z$(e){return Z(`/api/webchat/v2/traces/holds/${encodeURIComponent(e)}/authorize`,{method:"POST"})}function B$(){return Promise.resolve({users:[],todo:!0})}function q$(e){return Promise.resolve({success:!1,message:"TODO: requires v2 users endpoint"})}function I$(e,t){return Promise.resolve({success:!1,message:"TODO: requires v2 users endpoint"})}var Mp="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",Op=[{value:"open_ai_completions",label:"OpenAI Compatible"},{value:"anthropic",label:"Anthropic"},{value:"ollama",label:"Ollama"},{value:"nearai",label:"NEAR AI"}];function qo(e){return Op.find(t=>t.value===e)?.label||e}function er(e,t){return(e.builtin?t[e.id]||{}:{}).base_url||e.env_base_url||e.base_url||""}function H$(e,t,a,n){let r=e.builtin?t[e.id]||{}:{};return e.id===a?n||r.model||e.env_model||e.default_model||"":r.model||e.env_model||e.default_model||""}function zr(e,t){return(e.builtin?t[e.id]||{}:{}).model||e.env_model||e.default_model||""}function K$(e){return e?e.builtin?e.accepts_api_key!==void 0?e.accepts_api_key!==!1:e.api_key_required!==!1:e.adapter!=="ollama":!1}function yn(e,t){let a=e.builtin?t[e.id]||{}:{},n=e.builtin?e.api_key_required!==!1:e.adapter!=="ollama",r=e.builtin?a.api_key:e.api_key,s=r===Mp||typeof r=="string"&&r.length>0;return!n||e.has_api_key===!0||s?(e.builtin?e.base_url_required===!0:!0)?er(e,t).trim().length>0:!0:!1}function OT(e,t,a){return e.id===a?"active":yn(e,t)?"ready":"setup"}function Q$(e,t,a){let n={active:[],ready:[],setup:[]};if(!Array.isArray(e))return n;for(let r of e){let s=OT(r,t,a);n[s]&&n[s].push(r)}return n}function mc(e,t){let a=e.builtin?t[e.id]||{}:{},n=e.builtin?e.api_key_required!==!1:e.adapter!=="ollama",r=e.builtin?a.api_key:e.api_key,s=r===Mp||typeof r=="string"&&r.length>0;return n&&e.has_api_key!==!0&&!s?"api_key":(e.builtin?e.base_url_required===!0:!0)&&!er(e,t).trim()?"base_url":"ok"}function Lp(e,t,a,n){let r=t.baseUrl.trim(),s=t.model.trim(),i={adapter:e?.builtin?e.adapter:t.adapter,base_url:r||e?.base_url||"",provider_id:e?.id||t.id.trim(),provider_type:e?.builtin?"builtin":"custom"};s&&(i.model=s),a.trim()&&(i.api_key=a.trim());let o=e?.builtin?n[e.id]||{}:{};return!i.api_key&&o.api_key===Mp&&(i.api_key=void 0),i}function V$(e){return e.toLowerCase().replace(/[^a-z0-9_]+/g,"-").replace(/^-|-$/g,"")}function G$(e){return/^[a-z0-9_-]+$/.test(e)}function Y$(e,t){if(!Array.isArray(t)||t.length===0)return null;let a=(e||"").trim();return!a||!t.includes(a)?t[0]:null}var LT=Object.freeze({});function tr({settings:e,gatewayStatus:t,enabled:a=!0}){let n=ee(),r=H({queryKey:["llm-providers"],queryFn:dc,enabled:a,staleTime:6e4}),s=a?r.data||{providers:[],active:null}:{providers:[],active:null},i=a&&r.isError,o=LT,u=(s.providers||[]).map(w=>({...w,name:w.description,has_api_key:w.api_key_set===!0})),c=!!(s.active?.provider_id||t?.llm_backend),d=c?s.active?.provider_id||t?.llm_backend:null,m=d||"nearai",f=s.active?.model||t?.llm_model||"",p=u.filter(w=>w.builtin),b=u.filter(w=>!w.builtin),y=[...u].sort((w,S)=>w.id===d?-1:S.id===d?1:(w.name||w.id).localeCompare(S.name||S.id)),x=()=>{n.invalidateQueries({queryKey:["llm-providers"]})},g=Y({mutationFn:async w=>{if(!yn(w,o)){let R=mc(w,o);throw new Error(R==="base_url"?"base_url":"api_key")}let S=zr(w,o);if(!S)throw new Error("model");return await Wn({provider_id:w.id,model:S}),w},onSuccess:x}),v=Y({mutationFn:async({provider:w,form:S,apiKey:R,editingProvider:C})=>{let E=!!w?.builtin,j={id:(E?w.id:S.id.trim()).trim(),name:E?w.name||w.id:S.name.trim(),adapter:E?w.adapter:S.adapter,base_url:S.baseUrl.trim()||w?.base_url||"",default_model:S.model.trim()||void 0};return R.trim()&&(j.api_key=R.trim()),(C||w)?.id===m&&j.default_model&&(j.set_active=!0,j.model=j.default_model),await S$(j),j},onSuccess:x}),$=Y({mutationFn:async w=>(await N$(w.id),w),onSuccess:x});return{providers:y,builtinProviders:p,customProviders:b,builtinOverrides:o,activeProviderId:d,selectedModel:f,hasActiveProvider:c,isError:i,isLoading:r.isLoading,error:r.error,setActiveProvider:w=>g.mutateAsync(w),saveCustomProvider:w=>v.mutateAsync(w),saveBuiltinProvider:w=>v.mutateAsync(w),deleteCustomProvider:w=>$.mutateAsync(w),testConnection:_$,listModels:R$,isBusy:g.isPending||v.isPending||$.isPending}}function J$({isLoading:e,hasActiveProvider:t,isError:a}){return!e&&!t&&!a}function X$({onNewChat:e}={}){let t=pe(),[a,n]=h.default.useState(!1),r=h.default.useCallback(()=>n(!1),[]),s=h.default.useCallback(()=>n(u=>!u),[]),i=h.default.useCallback(async()=>{let u=await e?.(),c=typeof u=="string"&&u.length>0?u:null;t(c?`/chat/${c}`:"/chat"),r()},[t,r,e]),o=h.default.useCallback(u=>{t(`/chat/${u}`),r()},[t,r]);return{open:a,close:r,toggle:s,newChat:i,selectThread:o}}var Pp=new Set,PT=0;function Js(e,t={}){let a={id:++PT,message:e,tone:t.tone||"info",duration:t.duration??2600};return Pp.forEach(n=>n(a)),a.id}function Z$(e){return Pp.add(e),()=>Pp.delete(e)}function jT(e){return e?.status===409&&e?.payload?.kind==="busy"}function W$(e,t){return jT(e)?t("chat.deleteBusy"):e?.message||t("chat.deleteFailed")}var ew="ironclaw:v2-thread-model-bindings";function tw(){return typeof window<"u"&&!!window.localStorage}function jp(){if(!tw())return{};try{let e=window.localStorage.getItem(ew);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function aw(e){if(tw())try{window.localStorage.setItem(ew,JSON.stringify(e))}catch{}}function nw(e){let t=String(e?.providerId||"").trim(),a=String(e?.model||"").trim();return!t||!a?null:{providerId:t,model:a}}function rw(e){let t=String(e||"").trim();return t?nw(jp()[t]):null}function sw(e,t){let a=String(e||"").trim(),n=nw(t);if(!a||!n)return;let r=jp();r[a]=n,aw(r)}function iw(e){let t=String(e||"").trim();if(!t)return;let a=jp();t in a&&(delete a[t],aw(a))}function ow(){let e=H({queryKey:["threads"],queryFn:()=>Nx({})}),[t,a]=h.default.useState(null),[n,r]=h.default.useState(!1),s=h.default.useRef(new Map),i=h.default.useCallback(async c=>{let d=c||"__global__",m=s.current.get(d);if(m)return m;r(!0);let f=(async()=>{try{let p=await rc(c?{projectId:c}:void 0);At.invalidateQueries({queryKey:["threads"]});let b=p?.thread?.thread_id;return b&&a(b),b}finally{s.current.delete(d),r(s.current.size>0)}})();return s.current.set(d,f),f},[]),o=h.default.useCallback(async c=>{await _x({threadId:c}),iw(c),t===c&&a(null),At.invalidateQueries({queryKey:["threads"]})},[t]);return{threads:h.default.useMemo(()=>(e.data?.threads||[]).map(d=>({...d,id:d.thread_id,state:d.state||null,turn_count:d.turn_count||0,updated_at:d.updated_at||null})),[e.data]),nextCursor:e.data?.next_cursor||null,activeThreadId:t,setActiveThreadId:a,isLoading:e.isLoading,isCreating:n,createThread:i,deleteThread:o}}var lw={attach:l`<path
    d="m21.4 11.1-9.2 9.2a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5"
  />`,bolt:l`<path d="M13 2.8 5.8 13h5.1L10 21.2 18.2 10h-5.4L13 2.8Z" />`,calendar:l`<path d="M6.5 4.5v3M17.5 4.5v3" /><path
      d="M4.5 7h15v12.5h-15V7Z"
    /><path d="M4.5 10.5h15" /><path d="M8 14h.1M12 14h.1M16 14h.1M8 17h.1M12 17h.1" />`,check:l`<path d="m5 12.5 4.3 4.3L19.2 6.7" />`,chat:l`<path d="M5 5.5h14v10H9.4L5 19.2V5.5Z" /><path
      d="M8.4 9h7.2M8.4 12.2h4.8"
    />`,close:l`<path d="m6.5 6.5 11 11M17.5 6.5l-11 11" />`,clock:l`<path d="M12 3.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17Z" /><path
      d="M12 7.5v5l3.2 2"
    />`,download:l`<path d="M12 3.8v10" /><path d="m8 10 4 4 4-4" /><path
      d="M5 17.5v2.7h14v-2.7"
    />`,file:l`<path d="M6.5 3.5h7.2L18 7.8v12.7H6.5v-17Z" /><path
      d="M13.7 3.5V8H18"
    />`,flag:l`<path d="M6.5 21V4.5" /><path d="M6.5 5h10.7l-1.4 4 1.4 4H6.5" />`,pin:l`<path d="M9 3.5h6l-1 5 3 3.5H7l3-3.5-1-5Z" /><path d="M12 15.5V21" />`,folder:l`<path
    d="M3.5 7h6.2l1.9 2h8.9v9.2a2.3 2.3 0 0 1-2.3 2.3H5.8a2.3 2.3 0 0 1-2.3-2.3V7Z"
  />`,layers:l`<path d="m12 3.7 8.5 4.2-8.5 4.4-8.5-4.4L12 3.7Z" /><path
      d="m5.2 11.2 6.8 3.5 6.8-3.5"
    /><path d="m5.2 14.8 6.8 3.5 6.8-3.5" />`,list:l`<path d="M8.5 6.5h11M8.5 12h11M8.5 17.5h11" /><path
      d="M4.5 6.5h.1M4.5 12h.1M4.5 17.5h.1"
    />`,lock:l`<path d="M7.5 10V7.2a4.5 4.5 0 0 1 9 0V10" /><path
      d="M5.5 10h13v10.5h-13V10Z"
    /><path d="M12 14.4v2.3" />`,logout:l`<path d="M10 17 15 12l-5-5" /><path d="M15 12H3.5" /><path
      d="M14.5 4.5H19a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-4.5"
    />`,moon:l`<path
    d="M20.2 14.7A7.7 7.7 0 0 1 9.3 3.8 8.4 8.4 0 1 0 20.2 14.7Z"
  />`,plug:l`<path d="M9 3.5v5M15 3.5v5" /><path
      d="M7.5 8.5h9v3.2a4.5 4.5 0 0 1-9 0V8.5Z"
    /><path d="M12 16.2v4.3" />`,plus:l`<path d="M12 5.5v13M5.5 12h13" />`,pulse:l`<path d="M3.5 12h4l2-5.5 4.2 11 2.2-5.5h4.6" />`,send:l`<path d="M4 11.8 20 4l-4.8 16-3.2-6.8L4 11.8Z" /><path
      d="m12 13.2 4.5-4.6"
    />`,search:l`<path d="M10.8 5.2a5.6 5.6 0 1 1 0 11.2 5.6 5.6 0 0 1 0-11.2Z" /><path
      d="m15.1 15.1 4 4"
    />`,settings:l`
    <path
      d="m19.14 12.94 2.06-1.44-1.73-3-2.47 1a7.07 7.07 0 0 0-1.47-.86L15.12 6h-3.46l-.42 2.64a7.07 7.07 0 0 0-1.47.86l-2.47-1-1.73 3 2.06 1.44a7.1 7.1 0 0 0 0 1.72l-2.06 1.44 1.73 3 2.47-1a7.07 7.07 0 0 0 1.47.86l.42 2.64h3.46l.42-2.64a7.07 7.07 0 0 0 1.47-.86l2.47 1 1.73-3-2.06-1.44a7.1 7.1 0 0 0 0-1.72Z"
    />`,spark:l`<path
    d="M12 3.5 14 10l6.5 2-6.5 2-2 6.5-2-6.5-6.5-2 6.5-2 2-6.5Z"
  />`,sun:l`<path d="M12 7.6a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8Z" /><path
      d="M12 2.8v2.2M12 19v2.2M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2.8 12H5M19 12h2.2M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"
    />`,shield:l`<path
      d="M12 3.2 4 7.1v4.5c0 4.7 3.3 8.9 8 10.2 4.7-1.3 8-5.5 8-10.2V7.1l-8-3.9Z"
    /><path d="m9.3 12 2 2 3.8-3.8" />`,tool:l`<path
    d="M15.3 4.4a4.5 4.5 0 0 0-5.7 5.7L4.8 15a2.7 2.7 0 1 0 3.8 3.8l4.9-4.8a4.5 4.5 0 0 0 5.7-5.7l-3.3 3.3-3.2-3.2 2.6-4Z"
  />`,trash:l`<path d="M5.5 7h13" /><path d="M9.5 7V4.5h5V7" /><path
      d="M7.2 7 8 20h8l.8-13"
    /><path d="M10.5 10.5v6M13.5 10.5v6" />`,upload:l`<path d="M12 14.2v-10" /><path d="m8 8.2 4-4 4 4" /><path
      d="M5 17.5v2.7h14v-2.7"
    />`,chevron:l`<path d="m6 9 6 6 6-6" />`,more:l`<path d="M12 5.6h.01M12 12h.01M12 18.4h.01" />`,copy:l`<path d="M9 9h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" /><path
      d="M5 15a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1"
    />`,arrowDown:l`<path d="M12 5v14" /><path d="m6 13 6 6 6-6" />`,retry:l`<path d="M3.5 12a8.5 8.5 0 1 1 2.6 6.1" /><path d="M3.2 18.5v-5h5" />`};function M({name:e,className:t="",strokeWidth:a=1.7}){return l`
    <svg
      aria-hidden="true"
      className=${t}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth=${String(a)}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      ${lw[e]||lw.spark}
    </svg>
  `}function K(...e){let t=[];for(let a of e)if(a){if(typeof a=="string")t.push(a);else if(Array.isArray(a)){let n=K(...a);n&&t.push(n)}else if(typeof a=="object")for(let[n,r]of Object.entries(a))r&&t.push(n)}return t.join(" ")}function uw(e){return e?.display_name||e?.email||e?.id||"IronClaw"}function UT(e){return uw(e).trim().charAt(0).toUpperCase()||"I"}function FT(){let[e,t]=h.default.useState(!1),a=h.default.useCallback(()=>{t(n=>!n)},[]);return{open:e,toggle:a}}function cw({theme:e,toggleTheme:t,profile:a,onSignOut:n}){let r=k(),s=FT(),i=uw(a),o=a?.email||a?.role||r("common.gatewaySession");return l`
    <div
      className="relative flex items-center gap-2 border-t border-[var(--v2-panel-border)] px-3 py-3"
    >
      ${s.open&&l`
        <div
          className=${K("absolute bottom-full left-3 right-3 mb-2 rounded-[10px] border p-3 shadow-lg","border-[var(--v2-panel-border)] bg-[var(--v2-surface)]")}
        >
          <div className="truncate text-sm font-medium text-[var(--v2-text-strong)]">
            ${i}
          </div>
          ${a?.email&&l`<div className="mt-1 truncate text-xs text-[var(--v2-text-muted)]">
            ${a.email}
          </div>`}
          ${a?.role&&l`<div className="mt-2 text-[11px] uppercase text-[var(--v2-text-faint)]">
            ${a.role}
          </div>`}
        </div>
      `}

      <button
        type="button"
        onClick=${s.toggle}
        className="flex min-w-0 flex-1 items-center gap-2 rounded-[8px] text-left"
        title=${i}
      >
        <div
          className="grid h-8 w-8 shrink-0 overflow-hidden rounded-full bg-[var(--v2-accent-soft)] text-[11px] font-bold text-[var(--v2-accent-text)]"
        >
          ${a?.avatar_url?l`<img
              src=${a.avatar_url}
              alt=""
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />`:l`<span className="place-self-center">${UT(a)}</span>`}
        </div>
        <span className="min-w-0">
          <span className="block truncate text-[13px] font-medium text-[var(--v2-text-strong)]">
            ${i}
          </span>
          <span className="block truncate text-[11px] text-[var(--v2-text-faint)]">
            ${o}
          </span>
        </span>
      </button>
      <button
        onClick=${t}
        className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] text-[var(--v2-text-muted)] hover:bg-[var(--v2-surface-muted)] hover:text-[var(--v2-text-strong)]"
        title=${r(e==="dark"?"theme.light":"theme.dark")}
      >
        <${M} name=${e==="dark"?"sun":"moon"} className="h-4 w-4" />
      </button>
      <button
        onClick=${n}
        className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] text-[var(--v2-text-muted)] hover:bg-[var(--v2-surface-muted)] hover:text-[var(--v2-text-strong)]"
        title=${r("header.signOut")}
      >
        <${M} name="logout" className="h-4 w-4" />
      </button>
    </div>
  `}var dw={chat:"chat",workspace:"layers",projects:"folder",jobs:"pulse",routines:"clock",automations:"calendar",missions:"flag",extensions:"plug",settings:"settings",admin:"shield"},zT=Bo.filter(e=>e.id!=="chat"&&!e.hidden);function BT({route:e,label:t,onNavigate:a}){return l`
    <${Ka}
      to=${e.path}
      onClick=${a}
      className=${({isActive:n})=>K("flex items-center gap-3 rounded-[10px] px-3 py-2 text-[13px] font-medium",n?"bg-[var(--v2-accent-soft)] text-[var(--v2-accent-text)]":"text-[var(--v2-text-muted)] hover:bg-[var(--v2-surface-muted)] hover:text-[var(--v2-text-strong)]")}
    >
      <${M} name=${dw[e.id]||"bolt"} className="h-4 w-4 shrink-0" />
      <span className="min-w-0 truncate">${t}</span>
    <//>
  `}function qT({route:e,label:t,subRoutes:a,onNavigate:n}){let r=k(),s=Me(),i=s.pathname===e.path||s.pathname.startsWith(e.path+"/"),o=`${e.path}/${a[0].id}`;return l`
    <div className="flex flex-col">
      <${Ka}
        to=${o}
        onClick=${n}
        className=${()=>K("flex items-center gap-3 rounded-[10px] px-3 py-2 text-[13px] font-medium",i?"bg-[var(--v2-accent-soft)] text-[var(--v2-accent-text)]":"text-[var(--v2-text-muted)] hover:bg-[var(--v2-surface-muted)] hover:text-[var(--v2-text-strong)]")}
      >
        <${M}
          name=${dw[e.id]||"bolt"}
          className="h-4 w-4 shrink-0"
        />
        <span className="min-w-0 flex-1 truncate">${t}</span>
        <${M}
          name="chevron"
          className=${K("h-3.5 w-3.5 shrink-0 transition-transform duration-150",i&&"rotate-180")}
        />
      <//>

      ${i&&l`
        <div className="mt-0.5 flex flex-col gap-0.5 pl-3">
          ${a.map(u=>l`
              <${Ka}
                key=${u.id}
                to=${e.path+"/"+u.id}
                onClick=${n}
                className=${({isActive:c})=>K("flex items-center gap-2.5 rounded-[8px] py-1.5 pl-7 pr-3 text-[12px] font-medium",c?"text-[var(--v2-accent-text)]":"text-[var(--v2-text-muted)] hover:bg-[var(--v2-surface-muted)] hover:text-[var(--v2-text-strong)]")}
              >
                <${M} name=${u.icon} className="h-3 w-3 shrink-0" />
                <span className="min-w-0 truncate">${r(u.labelKey)}</span>
              <//>
            `)}
        </div>
      `}
    </div>
  `}function mw({onNewChat:e,isCreating:t,isAdmin:a=!1,onNavigate:n}){let r=k(),s=h.default.useMemo(()=>zT.filter(i=>a||i.id!=="admin"),[a]);return l`
    <div className="flex flex-col px-3 py-2">
      <button
        onClick=${e}
        disabled=${t}
        className=${K("flex items-center gap-2.5 rounded-[10px] px-3 py-2","border border-[color-mix(in_srgb,var(--v2-accent)_30%,var(--v2-panel-border))]","bg-[var(--v2-accent-soft)] text-[var(--v2-accent-text)]","hover:bg-[color-mix(in_srgb,var(--v2-accent)_18%,transparent)] disabled:opacity-50")}
      >
        <${M} name="plus" className="h-4 w-4 shrink-0" />
        <span className="text-[13px] font-medium">
          ${r(t?"chat.creating":"chat.newThread")}
        </span>
      </button>

      <nav className="mt-2 flex flex-col gap-1">
        ${s.map(i=>{let o=(uc[i.id]||[]).filter(u=>a||!(i.id==="settings"&&["users","inference"].includes(u.id)));return o.length>0?l`
              <${qT}
                key=${i.id}
                route=${i}
                label=${r(i.labelKey)}
                subRoutes=${o}
                onNavigate=${n}
              />
            `:l`
            <${BT}
              key=${i.id}
              route=${i}
              label=${r(i.labelKey)}
              onNavigate=${n}
            />
          `})}
      </nav>
    </div>
  `}var bn=Object.freeze({RUNNING:"running",NEEDS_ATTENTION:"needs_attention",FAILED:"failed"}),Io=new Set([bn.NEEDS_ATTENTION,bn.FAILED]),Up="ironclaw:v2-thread-attention",Fp=new Set,Xs=new Map;function IT(){try{let e=window.localStorage.getItem(Up);if(!e)return[];let t=JSON.parse(e);return Array.isArray(t)?t.filter(a=>Array.isArray(a)&&typeof a[0]=="string"&&Io.has(a[1])):[]}catch{return[]}}function fw(){let e=[];for(let[t,a]of Xs)Io.has(a)&&e.push([t,a]);try{e.length===0?window.localStorage.removeItem(Up):window.localStorage.setItem(Up,JSON.stringify(e))}catch{}}for(let[e,t]of IT())Xs.set(e,t);function hw(){return new Map(Xs)}function pw(){let e=hw();for(let t of Fp)try{t(e)}catch{}}function fc(e,t){if(!e)return;let a=Xs.get(e);if(t==null){if(!Xs.delete(e))return;Io.has(a)&&fw(),pw();return}a!==t&&(Xs.set(e,t),(Io.has(t)||Io.has(a))&&fw(),pw())}function vw(e){fc(e,null)}function HT(){return hw()}function KT(e){return Fp.add(e),()=>{Fp.delete(e)}}function gw(){let[e,t]=h.default.useState(HT);return h.default.useEffect(()=>KT(t),[]),e}function pc(e){return e.updated_at||e.created_at||null}function zp(e,t){let a=pc(e)||"",n=pc(t)||"";return a===n?(e.id||"").localeCompare(t.id||""):n.localeCompare(a)}function yw(e){if(!e)return"";let t=new Date(e),a=new Date;return t.toDateString()===a.toDateString()?t.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):t.toLocaleDateString([],{month:"short",day:"numeric"})}function bw(e){return e?new Date(e).toLocaleString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):""}function QT(){let[e,t]=h.default.useState(Zx);return h.default.useEffect(()=>Wx(t),[]),e}var VT=Object.freeze({[bn.NEEDS_ATTENTION]:{label:"Needs your attention",textClass:"text-[var(--v2-warning-text)]",dotClass:"bg-[var(--v2-warning-text)]",borderClass:"border-transparent"},[bn.RUNNING]:{label:"Running",textClass:"text-[var(--v2-positive-text)]",dotClass:"bg-[var(--v2-positive-text)]",borderClass:"border-[var(--v2-positive-text)]"},[bn.FAILED]:{label:"Failed",textClass:"text-[var(--v2-danger-text)]",dotClass:"bg-[var(--v2-danger-text)]",borderClass:"border-[var(--v2-danger-text)]"}});function GT(e){return e&&VT[e]||null}function YT({thread:e,isActive:t,isPinned:a,presentation:n,onSelect:r,onDelete:s}){let i=k(),o=pc(e),u=yw(o),c=bw(o),d=h.default.useCallback(f=>{f.preventDefault(),f.stopPropagation(),window.confirm("Delete this chat?")&&Promise.resolve(s?.(e.id)).catch(p=>{window.alert(p?.message||"Unable to delete chat")})},[s,e.id]),m=h.default.useCallback(f=>{f.preventDefault(),f.stopPropagation(),Xx(e.id)},[e.id]);return l`
    <div
      className=${K("group flex w-full items-stretch rounded-[8px] border-l-2",n?n.borderClass:t?"border-[var(--v2-accent)]":"border-transparent",t?"bg-[var(--v2-accent-soft)] text-[var(--v2-accent-text)]":"text-[var(--v2-text-muted)] hover:bg-[var(--v2-surface-muted)] hover:text-[var(--v2-text-strong)]")}
    >
      <button
        onClick=${()=>r(e.id)}
        className="min-w-0 flex-1 px-3 py-2 text-left"
        title=${c||void 0}
      >
        <div className="flex w-full items-center gap-1.5">
          <span className="min-w-0 flex-1 truncate text-[13px] font-medium leading-snug">
            ${e.title||`Thread ${e.id.slice(0,8)}`}
          </span>
          ${n&&l`<span
            aria-label=${n.label}
            className=${K("h-1.5 w-1.5 shrink-0 rounded-full",n.dotClass)}
          />`}
        </div>
        ${(n||u)&&l`<span
          className=${K("block truncate text-[11px]",n?n.textClass:"text-[var(--v2-text-faint)]")}
        >
          ${n?n.label:u}
        </span>`}
      </button>
      <button
        type="button"
        onClick=${m}
        title=${i(a?"common.unpin":"common.pin")}
        aria-label=${i(a?"common.unpin":"common.pin")}
        aria-pressed=${a?"true":"false"}
        className=${K("my-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] transition",a?"text-[var(--v2-accent-text)]":"opacity-0 text-[var(--v2-text-faint)] group-hover:opacity-100 focus:opacity-100","hover:bg-[var(--v2-surface-muted)] hover:text-[var(--v2-accent-text)]")}
      >
        <${M} name="pin" className="h-3.5 w-3.5" strokeWidth=${2} />
      </button>
      ${s&&l`<button
        type="button"
        onClick=${d}
        title=${i("common.deleteChat")}
        aria-label=${i("common.deleteChat")}
        className=${K("my-1 mr-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px]","opacity-0 transition group-hover:opacity-100 focus:opacity-100","text-[var(--v2-text-faint)] hover:bg-[var(--v2-danger-soft)] hover:text-[var(--v2-danger-text)]")}
      >
        <${M} name="trash" className="h-3.5 w-3.5" strokeWidth=${2} />
      </button>`}
    </div>
  `}function xw({label:e,items:t,activeThreadId:a,states:n,pinnedIds:r,onSelect:s,onDelete:i}){return t.length===0?null:l`
    <div className="flex flex-col gap-1">
      <span className="px-3 pt-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--v2-text-faint)]">
        ${e}
      </span>
      ${t.map(o=>l`
          <${YT}
            key=${o.id}
            thread=${o}
            isActive=${o.id===a}
            isPinned=${r.has(o.id)}
            presentation=${GT(n.get(o.id))}
            onSelect=${s}
            onDelete=${i}
          />
        `)}
    </div>
  `}function $w({threads:e,activeThreadId:t,rebornProjectsEnabled:a=!1,onSelect:n,onDelete:r,onNavigate:s}){let[i,o]=h.default.useState(!1),[u,c]=h.default.useState(""),d=gw(),m=QT(),f=k(),{pinned:p,recent:b,totalMatches:y}=h.default.useMemo(()=>{let x=u.trim().toLowerCase(),g=x?e.filter(w=>(w.title||w.id||"").toLowerCase().includes(x)):e,v=[],$=[];for(let w of g)m.has(w.id)?v.push(w):$.push(w);return v.sort(zp),$.sort(zp),{pinned:v,recent:$,totalMatches:v.length+$.length}},[e,u,m]);return l`
    <div className="flex min-h-0 flex-1 flex-col px-2">
      <button
        onClick=${()=>o(x=>!x)}
        className="flex w-full items-center gap-1 rounded-[6px] px-2 py-1.5 hover:bg-[var(--v2-surface-muted)]"
      >
        <span
          className="flex-1 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--v2-text-faint)]"
        >
          ${f("chat.conversations")}
        </span>
        <${M}
          name="chevron"
          className=${K("h-3.5 w-3.5 text-[var(--v2-text-faint)]",i?"-rotate-90":"")}
          strokeWidth=${2.2}
        />
      </button>

      ${!i&&l`
        ${e.length>0&&l`<div className="relative mb-1 mt-1 px-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--v2-text-faint)]">
            <${M} name="search" className="h-3.5 w-3.5" />
          </span>
          <input
            type="text"
            value=${u}
            onInput=${x=>c(x.currentTarget.value)}
            placeholder=${f("common.searchChats")}
            className="h-8 w-full rounded-[8px] border border-[var(--v2-panel-border)] bg-[var(--v2-input-bg)] pl-8 pr-2 text-[12px] text-[var(--v2-text-strong)] outline-none placeholder:text-[var(--v2-text-faint)] focus:border-[var(--v2-accent)]"
          />
        </div>`}
        ${a&&l`<div className="mb-1 px-1">
          <${Ka}
            to="/projects"
            onClick=${s}
            className=${({isActive:x})=>K("flex items-center gap-3 rounded-[10px] px-3 py-2 text-[13px] font-medium",x?"bg-[var(--v2-accent-soft)] text-[var(--v2-accent-text)]":"text-[var(--v2-text-muted)] hover:bg-[var(--v2-surface-muted)] hover:text-[var(--v2-text-strong)]")}
          >
            <${M} name="folder" className="h-4 w-4 shrink-0" />
            <span className="min-w-0 truncate">${f("nav.projects")}</span>
          <//>
        </div>`}
        <div
          className="mt-1 flex flex-col gap-2 overflow-y-auto [scrollbar-width:thin]"
        >
          ${e.length===0&&l`<div className="px-3 py-2 text-[12px] text-[var(--v2-text-faint)]">
            ${f("chat.noConversations")}
          </div>`}
          ${e.length>0&&y===0&&l`<div className="px-3 py-2 text-[12px] text-[var(--v2-text-faint)]">
            ${f("common.noChatsMatch").replace("{query}",u)}
          </div>`}

          <${xw}
            label=${f("common.pinned")}
            items=${p}
            activeThreadId=${t}
            states=${d}
            pinnedIds=${m}
            onSelect=${n}
            onDelete=${r}
          />
          <${xw}
            label=${f("common.recent")}
            items=${b}
            activeThreadId=${t}
            states=${d}
            pinnedIds=${m}
            onSelect=${n}
            onDelete=${r}
          />
        </div>
      `}
    </div>
  `}function hc(){let e=ee(),t=H({queryKey:["trace-credits"],queryFn:F$,refetchInterval:3e5,refetchIntervalInBackground:!1,refetchOnWindowFocus:!0,staleTime:6e4}),a=Y({mutationFn:z$,onSuccess:()=>e.invalidateQueries({queryKey:["trace-credits"]})});return{credits:t.data||null,query:t,authorize:a}}function JT(e){let t=Number(e)||0;return`${t>=0?"+":""}${t.toFixed(2)}`}function ww(){let e=k(),{credits:t}=hc();if(!t||!t.enrolled)return null;let a=JT(t.final_credit),n=t.submissions_accepted||0,r=t.submissions_submitted||0,s=t.manual_review_hold_count||0;return l`
    <div className="px-3 pb-1">
      <${Lr}
        to="/settings/traces"
        className="block rounded-[10px] border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] px-3 py-2.5 transition-colors hover:border-[var(--v2-accent-soft)] hover:bg-[var(--v2-surface-muted)]"
      >
        <div className="flex items-center gap-2 text-[var(--v2-accent-text)]">
          <${M} name="layers" className="h-3.5 w-3.5 shrink-0" />
          <span className="min-w-0 truncate font-mono text-[11px] uppercase tracking-[0.14em]">
            ${e("settings.traceCommons")}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-xs text-[var(--v2-text-muted)]">${e("traceCommons.finalCredit")}</span>
          <span className="shrink-0 font-mono text-sm text-[var(--v2-text-strong)]">${a}</span>
        </div>
        <div className="mt-0.5 text-[11px] text-[var(--v2-text-muted)]">
          ${e("traceCommons.cardAccepted",{accepted:n,submitted:r})}
        </div>
        ${s>0&&l`
          <div className="mt-1 text-[11px] font-medium text-[var(--v2-accent-text)]">
            ${e("traceCommons.cardHeld",{count:s})}
          </div>
        `}
      <//>
    </div>
  `}function Sw({threadsState:e,theme:t,toggleTheme:a,profile:n,isAdmin:r,rebornProjectsEnabled:s=!1,onSignOut:i,onClose:o,onNewChat:u,onSelectThread:c,onDeleteThread:d}){return l`
    <aside
      className="flex h-full w-[260px] shrink-0 flex-col border-r border-[var(--v2-panel-border)] bg-[var(--v2-surface)]"
    >
      <div className="flex items-center gap-2.5 px-4 py-5">
        <${Lr}
          to="/chat"
          onClick=${o}
          className="flex items-center gap-2.5 opacity-90 hover:opacity-100"
          aria-label="IronClaw"
        >
          <img src="/v2/assets/logo.jpg" alt="IronClaw" className="h-7 w-auto" />
        <//>
      </div>

      <${mw}
        onNewChat=${u}
        isCreating=${e.isCreating}
        isAdmin=${r}
        onNavigate=${o}
      />

      <${ww} />

      <div className="mt-3 flex min-h-0 flex-1 flex-col">
        <${$w}
          threads=${e.threads}
          activeThreadId=${e.activeThreadId}
          rebornProjectsEnabled=${s}
          onSelect=${c}
          onDelete=${d}
          onNavigate=${o}
        />
      </div>

      <${cw}
        theme=${t}
        toggleTheme=${a}
        profile=${n}
        onSignOut=${i}
      />
    </aside>
  `}var XT="radial-gradient(ellipse 100% 100% at 50% 130%, #4CA7E6 0%, #2882c8 65%)",ZT="radial-gradient(ellipse 200% 220% at 50% 110%, #5BBAF5 0%, #2882c8 60%)",Nw="inline-flex items-center justify-center font-semibold select-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v2-accent)]/50 focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--v2-canvas)]",_w={sm:"h-9 rounded-[10px] px-3 text-xs",md:"min-h-[44px] rounded-[14px] px-3.5 text-[13px] md:min-h-[50px] md:rounded-[16px] md:px-4 md:text-sm",lg:"min-h-[54px] rounded-[18px] px-6 text-base",icon:"h-[44px] w-[44px] rounded-[14px] md:h-[50px] md:w-[50px] md:rounded-[16px]","icon-sm":"h-9 w-9 rounded-[10px]"},Rw={outline:"border border-[rgba(76,167,230,0.7)] bg-transparent text-[#8fc8f2] hover:bg-[rgba(76,167,230,0.1)] hover:border-[#4ca7e6] active:bg-[rgba(76,167,230,0.15)]",secondary:"border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] text-[var(--v2-text-strong)] hover:bg-[var(--v2-surface-muted)] hover:border-[color-mix(in_srgb,var(--v2-accent)_30%,var(--v2-panel-border))]",ghost:"border border-transparent bg-transparent text-[var(--v2-text-muted)] hover:bg-[var(--v2-surface-soft)] hover:text-[var(--v2-text-strong)]",danger:"border border-[rgba(217,101,116,0.6)] bg-transparent text-[#ff6480] hover:bg-[rgba(217,101,116,0.08)] active:bg-[rgba(217,101,116,0.14)]"};function T({children:e,className:t="",variant:a="primary",size:n="md",fullWidth:r=!1,as:s="button",...i}){let o=_w[n]??_w.md,u=r?"w-full":"";if(a==="primary")return l`
      <${s}
        style=${{background:XT,border:"1px solid rgba(76, 167, 230, 0.72)"}}
        className=${K(Nw,o,u,"relative overflow-hidden text-white group","hover:shadow-[0_24px_24px_-20px_rgba(76,167,230,0.55)]",t)}
        ...${i}
      >
        <span
          aria-hidden="true"
          style=${{background:ZT}}
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
        />
        <span className="relative z-10 flex items-center gap-2">
          ${e}
        </span>
      <//>
    `;let c=Rw[a]??Rw.outline;return l`
    <${s}
      className=${K(Nw,o,u,c,t)}
      ...${i}
    >
      ${e}
    <//>
  `}function kw(){let e=h.default.useMemo(()=>WT(window.location),[]),[t,a]=h.default.useState(null),[n,r]=h.default.useState(null),[s,i]=h.default.useState(!1),[o,u]=h.default.useState(""),[c,d]=h.default.useState(!1);h.default.useEffect(()=>{if(!e)return;let p=new AbortController;return fetch(`${e.base}/instances/${encodeURIComponent(e.instance)}/attestation`,{signal:p.signal}).then(b=>{if(!b.ok)throw new Error(String(b.status));return b.json()}).then(a).catch(()=>{p.signal.aborted||a(null)}),()=>p.abort()},[e]);let m=h.default.useCallback(async()=>{if(!e||n||s)return n;i(!0),u("");try{let p=await fetch(`${e.base}/attestation/report`);if(!p.ok)throw new Error(String(p.status));let b=await p.json();return r(b),b}catch(p){return u(p.message||"Could not load attestation report."),null}finally{i(!1)}},[e,n,s]),f=h.default.useCallback(async()=>{let p=n||await m();return!p||!navigator.clipboard?!1:(await navigator.clipboard.writeText(JSON.stringify({...p,instance_attestation:t},null,2)),d(!0),window.setTimeout(()=>d(!1),1800),!0)},[m,n,t]);return{available:!!t,teeInfo:t,report:n,reportError:o,reportLoading:s,copied:c,loadReport:m,copyReport:f}}function WT(e){let t=e.hostname;if(!t||t==="localhost"||e4(t))return null;let a=t.split(".");return a.length<2?null:{base:e.origin,instance:a[0]}}function e4(e){return e.includes(":")||/^(\d{1,3}\.){3}\d{1,3}$/.test(e)}var t4=[["image_digest","tee.imageDigest"],["tls_certificate_fingerprint","tee.tlsFingerprint"],["report_data","tee.reportData"],["vm_config","tee.vmConfig"]];function Cw(){let e=k(),t=kw(),[a,n]=h.default.useState(!1),r=h.default.useCallback(()=>{n(o=>{let u=!o;return u&&t.loadReport(),u})},[t]),s=h.default.useCallback(()=>{t.copyReport().catch(()=>{})},[t]);if(!t.available)return null;let i=a4({teeInfo:t.teeInfo,report:t.report,t:e});return l`
    <div className="relative">
      <button
        type="button"
        onClick=${r}
        aria-expanded=${a}
        title=${e("tee.title")}
        className=${K("grid h-8 w-8 place-items-center rounded-[8px]","border border-[color-mix(in_srgb,var(--v2-positive-text)_28%,transparent)]","bg-[var(--v2-positive-soft)] text-[var(--v2-positive-text)]","hover:border-[color-mix(in_srgb,var(--v2-positive-text)_52%,transparent)]")}
      >
        <${M} name="shield" className="h-4 w-4" />
      </button>

      ${a&&l`
        <div
          className=${K("absolute right-0 top-full z-40 mt-2 w-[min(22rem,calc(100vw-2rem))]","rounded-[14px] border border-[var(--v2-panel-border)]","bg-[var(--v2-surface)] p-3 shadow-[0_18px_48px_rgba(0,0,0,0.35)]")}
        >
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[var(--v2-positive-soft)] text-[var(--v2-positive-text)]">
              <${M} name="shield" className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-[var(--v2-text-strong)]">
                ${e("tee.title")}
              </div>
              <div className="text-xs text-[var(--v2-text-muted)]">
                ${e("tee.verified")}
              </div>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            ${i.map(o=>l`
                <div className="rounded-[10px] bg-[var(--v2-surface-soft)] px-3 py-2">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--v2-text-faint)]">
                    ${o.label}
                  </div>
                  <div className="mt-1 break-all font-mono text-[11px] text-[var(--v2-text)]">
                    ${o.value}
                  </div>
                </div>
              `)}
            ${t.reportLoading&&l`<div className="text-xs text-[var(--v2-text-muted)]">${e("tee.loading")}</div>`}
            ${t.reportError&&l`<div className="text-xs text-[var(--v2-danger-text)]">${e("tee.loadFailed")}</div>`}
          </div>

          <div className="mt-3 flex justify-end">
            <${T}
              type="button"
              variant="secondary"
              size="sm"
              disabled=${t.reportLoading}
              onClick=${s}
            >
              <${M} name="check" className="h-4 w-4" />
              ${t.copied?e("tee.copied"):e("tee.copyReport")}
            <//>
          </div>
        </div>
      `}
    </div>
  `}function a4({teeInfo:e,report:t,t:a}){let n={...t,image_digest:e?.image_digest};return t4.map(([r,s])=>({label:a(s),value:n4(n[r])||a("common.unknown")}))}function n4(e){if(!e)return"";let t=typeof e=="string"?e:JSON.stringify(e);return t.length>72?`${t.slice(0,72)}...`:t}var r4="https://docs.ironclaw.com";function Ew({threadsState:e,onToggleSidebar:t}){let a=k(),n=Me(),r=h.default.useMemo(()=>{for(let i of Bo){let o=uc[i.id];if(!o)continue;let u=i.path+"/";if(n.pathname.startsWith(u)){let c=n.pathname.slice(u.length).split("/")[0],d=o.find(m=>m.id===c);if(d)return{parent:a(i.labelKey),current:a(d.labelKey)}}}return null},[n.pathname,a]),s=h.default.useMemo(()=>{if(r)return null;if(n.pathname.startsWith("/chat"))return e.activeThreadId&&e.threads.find(u=>u.id===e.activeThreadId)?.title||a("nav.chat");let i=Bo.find(o=>n.pathname.startsWith(o.path));return i?a(i.labelKey):""},[n.pathname,e.activeThreadId,e.threads,a,r]);return l`
    <header
      className=${K("flex h-14 shrink-0 items-center gap-3 px-4","border-b border-[var(--v2-panel-border)]","bg-[color-mix(in_srgb,var(--v2-canvas-strong)_88%,transparent)] backdrop-blur-xl")}
    >
      <button
        onClick=${t}
        className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] text-[var(--v2-text-muted)] hover:bg-[var(--v2-surface-muted)] md:hidden"
        aria-label="Toggle sidebar"
      >
        <${M} name="list" className="h-4 w-4" />
      </button>

      ${r?l`
            <div className="flex min-w-0 items-center gap-2 text-[14px] font-semibold">
              <span className="shrink-0 text-[var(--v2-text-muted)]">
                ${r.parent}
              </span>
              <${M}
                name="chevron"
                className="h-3.5 w-3.5 shrink-0 -rotate-90 text-[var(--v2-text-muted)]"
              />
              <span className="truncate text-[var(--v2-text-strong)]">
                ${r.current}
              </span>
            </div>
          `:l`
            <span
              className="truncate text-[14px] font-semibold text-[var(--v2-text-strong)]"
            >
              ${s}
            </span>
          `}

      <div className="ml-auto flex shrink-0 items-center gap-1">
        <${Cw} />
        <${Ka}
          to="/logs"
          className=${({isActive:i})=>K("inline-flex h-8 items-center rounded-[8px] px-2.5 text-xs font-semibold text-[var(--v2-text-muted)] hover:bg-[var(--v2-surface-muted)] hover:text-[var(--v2-text-strong)]",i&&"bg-[var(--v2-accent-soft)] text-[var(--v2-accent-text)]")}
          title=${a("nav.logs")}
        >
          ${a("nav.logs")}
        <//>
        <a
          href=${r4}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-8 items-center rounded-[8px] px-2.5 text-xs font-semibold text-[var(--v2-text-muted)] hover:bg-[var(--v2-surface-muted)] hover:text-[var(--v2-text-strong)]"
          title=${a("nav.docs")}
        >
          ${a("nav.docs")}
        </a>
      </div>
    </header>
  `}function Tw({open:e,onClose:t,threadsState:a,onNewChat:n,onToggleTheme:r}){let s=pe(),i=k(),[o,u]=h.default.useState(""),[c,d]=h.default.useState(0),m=h.default.useRef(null),f=h.default.useMemo(()=>{let g=[{id:"new-chat",label:"New chat",icon:"plus",group:"Actions",run:()=>n?.()},{id:"go-chat",label:"Go to Chat",icon:"chat",group:"Navigate",run:()=>s("/chat")},{id:"go-extensions",label:"Go to Extensions",icon:"plug",group:"Navigate",run:()=>s("/extensions")},{id:"go-settings",label:"Go to Settings",icon:"settings",group:"Navigate",run:()=>s("/settings")},{id:"toggle-theme",label:"Toggle theme",icon:"moon",group:"Actions",run:()=>r?.()}],v=(a?.threads||[]).map($=>({id:`thread-${$.id}`,label:$.title||`Thread ${$.id.slice(0,8)}`,icon:"chat",group:"Threads",run:()=>s(`/chat/${$.id}`)}));return[...g,...v]},[a,s,n,r]),p=h.default.useMemo(()=>{let g=o.trim().toLowerCase();return g?f.filter(v=>v.label.toLowerCase().includes(g)):f},[f,o]);h.default.useEffect(()=>{if(!e)return;u(""),d(0);let g=window.requestAnimationFrame(()=>m.current?.focus());return()=>window.cancelAnimationFrame(g)},[e]),h.default.useEffect(()=>{d(g=>Math.min(g,Math.max(0,p.length-1)))},[p.length]);let b=h.default.useCallback(g=>{g&&(t(),g.run())},[t]),y=h.default.useCallback(g=>{g.key==="ArrowDown"?(g.preventDefault(),d(v=>Math.min(v+1,p.length-1))):g.key==="ArrowUp"?(g.preventDefault(),d(v=>Math.max(v-1,0))):g.key==="Enter"?(g.preventDefault(),b(p[c])):g.key==="Escape"&&(g.preventDefault(),t())},[p,c,b,t]);if(!e)return null;let x=null;return l`
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Command palette">
      <button type="button" aria-label="Close" onClick=${t} className="absolute inset-0 bg-black/50"></button>
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--v2-panel-border)] bg-[var(--v2-surface)] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-2 border-b border-[var(--v2-panel-border)] px-3">
          <${M} name="search" className="h-4 w-4 text-[var(--v2-text-faint)]" />
          <input
            ref=${m}
            value=${o}
            onInput=${g=>u(g.currentTarget.value)}
            onKeyDown=${y}
            placeholder=${i("command.placeholder")}
            className="h-12 w-full border-0 bg-transparent text-sm text-[var(--v2-text-strong)] outline-none placeholder:text-[var(--v2-text-faint)]"
          />
          <kbd className="rounded-md border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--v2-text-faint)]">esc</kbd>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto p-1.5">
          ${p.length===0&&l`<li className="px-3 py-6 text-center text-sm text-[var(--v2-text-faint)]">No matches</li>`}
          ${p.map((g,v)=>{let $=g.group!==x;return x=g.group,l`
              ${$&&l`<li key=${`g-${g.group}`} className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--v2-text-faint)]">${g.group}</li>`}
              <li key=${g.id}>
                <button
                  type="button"
                  onMouseEnter=${()=>d(v)}
                  onClick=${()=>b(g)}
                  className=${["flex w-full items-center gap-2.5 rounded-[9px] px-2.5 py-2 text-left text-sm",v===c?"bg-[var(--v2-accent-soft)] text-[var(--v2-accent-text)]":"text-[var(--v2-text)] hover:bg-[var(--v2-surface-soft)]"].join(" ")}
                >
                  <${M} name=${g.icon} className="h-4 w-4 shrink-0" />
                  <span className="min-w-0 truncate">${g.label}</span>
                </button>
              </li>
            `})}
        </ul>
      </div>
    </div>
  `}var Aw={info:"border-[var(--v2-panel-border)] text-[var(--v2-text)]",success:"border-[color-mix(in_srgb,var(--v2-positive-text)_32%,var(--v2-panel-border))] text-[var(--v2-positive-text)]",error:"border-[color-mix(in_srgb,var(--v2-danger-text)_36%,var(--v2-panel-border))] text-[var(--v2-danger-text)]"},s4={info:"bolt",success:"check",error:"close"};function Dw(){let[e,t]=h.default.useState([]);return h.default.useEffect(()=>Z$(a=>{t(n=>[...n,a]),setTimeout(()=>t(n=>n.filter(r=>r.id!==a.id)),a.duration)}),[]),e.length===0?null:l`
    <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col gap-2">
      ${e.map(a=>l`
          <div
            key=${a.id}
            role="status"
            className=${["pointer-events-auto flex items-center gap-2 rounded-xl border bg-[var(--v2-surface)] px-3.5 py-2.5 text-sm shadow-[0_20px_40px_-20px_rgba(0,0,0,0.7)]",Aw[a.tone]||Aw.info].join(" ")}
          >
            <${M} name=${s4[a.tone]||"bolt"} className="h-4 w-4 shrink-0" />
            <span>${a.message}</span>
          </div>
        `)}
    </div>
  `}function Mw({token:e,profile:t,isChecking:a=!1,isAdmin:n,rebornProjectsEnabled:r=!1,onSignOut:s}){let i=k(),{theme:o,toggleTheme:u}=cc(),c=b$(e),d=ow(),m=X$({onNewChat:()=>d.setActiveThreadId(null)}),f=c.data,p=Me(),b=pe(),y=tr({settings:{},gatewayStatus:f,enabled:n}),x=n&&J$({isLoading:y.isLoading,hasActiveProvider:y.hasActiveProvider,isError:y.isError}),g=p.pathname==="/welcome"||p.pathname.startsWith("/settings"),[v,$]=h.default.useState(!1);h.default.useEffect(()=>{let S=R=>{(R.metaKey||R.ctrlKey)&&R.key.toLowerCase()==="k"&&(R.preventDefault(),$(C=>!C))};return window.addEventListener("keydown",S),()=>window.removeEventListener("keydown",S)},[]);let w=h.default.useCallback(async S=>{let R=d.activeThreadId===S;try{await d.deleteThread(S),R&&b("/chat",{replace:!0})}catch(C){console.error("Failed to delete thread:",C),Js(W$(C,i),{tone:"error"})}},[b,d,i]);return x&&!g?l`<${lt} to="/welcome" replace />`:l`
    <div className="flex h-[100dvh] overflow-hidden bg-[var(--v2-canvas)]">
      ${m.open&&l`<button
        type="button"
        aria-label=${i("nav.close")}
        onClick=${m.close}
        className="fixed inset-0 z-40 bg-black/40 md:hidden"
      />`}

      <div
        className=${K("fixed inset-y-0 left-0 z-50 md:relative md:z-auto",m.open?"flex":"hidden md:flex")}
      >
        <${Sw}
          threadsState=${d}
          theme=${o}
          toggleTheme=${u}
          profile=${t}
          isAdmin=${n}
          rebornProjectsEnabled=${r}
          onSignOut=${s}
          onClose=${m.close}
          onNewChat=${m.newChat}
          onSelectThread=${m.selectThread}
          onDeleteThread=${w}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <${Ew}
          threadsState=${d}
          onToggleSidebar=${m.toggle}
        />
        <main className="min-h-0 min-w-0 flex-1 overflow-hidden">
          ${c.error&&l`
            <div
              className=${K("m-4 rounded-[14px] border px-4 py-3 text-sm","border-[color-mix(in_srgb,var(--v2-danger-text)_36%,var(--v2-panel-border))]","bg-[var(--v2-danger-soft)] text-[var(--v2-danger-text)]")}
            >
              ${c.error.message||i("error.gatewayConnection")}
            </div>
          `}
          <${dp}
            context=${{gatewayStatus:f,gatewayStatusQuery:c,currentUser:t,isChecking:a,isAdmin:n,threadsState:d}}
          />
        </main>
      </div>
      <${Tw}
        open=${v}
        onClose=${()=>$(!1)}
        threadsState=${d}
        onNewChat=${m.newChat}
        onToggleTheme=${u}
      />
      <${Dw} />
    </div>
  `}var Gt=Ie(Ge(),1),Go=e=>e.type==="checkbox",Br=e=>e instanceof Date,Dt=e=>e==null,Qw=e=>typeof e=="object",Xe=e=>!Dt(e)&&!Array.isArray(e)&&Qw(e)&&!Br(e),i4=e=>Xe(e)&&e.target?Go(e.target)?e.target.checked:e.target.value:e,o4=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,l4=(e,t)=>e.has(o4(t)),u4=e=>{let t=e.constructor&&e.constructor.prototype;return Xe(t)&&t.hasOwnProperty("isPrototypeOf")},Ip=typeof window<"u"&&typeof window.HTMLElement<"u"&&typeof document<"u";function ht(e){let t,a=Array.isArray(e),n=typeof FileList<"u"?e instanceof FileList:!1;if(e instanceof Date)t=new Date(e);else if(!(Ip&&(e instanceof Blob||n))&&(a||Xe(e)))if(t=a?[]:Object.create(Object.getPrototypeOf(e)),!a&&!u4(e))t=e;else for(let r in e)e.hasOwnProperty(r)&&(t[r]=ht(e[r]));else return e;return t}var xc=e=>/^\w*$/.test(e),tt=e=>e===void 0,Hp=e=>Array.isArray(e)?e.filter(Boolean):[],Kp=e=>Hp(e.replace(/["|']|\]/g,"").split(/\.|\[/)),X=(e,t,a)=>{if(!t||!Xe(e))return a;let n=(xc(t)?[t]:Kp(t)).reduce((r,s)=>Dt(r)?r:r[s],e);return tt(n)||n===e?tt(e[t])?a:e[t]:n},Qa=e=>typeof e=="boolean",Be=(e,t,a)=>{let n=-1,r=xc(t)?[t]:Kp(t),s=r.length,i=s-1;for(;++n<s;){let o=r[n],u=a;if(n!==i){let c=e[o];u=Xe(c)||Array.isArray(c)?c:isNaN(+r[n+1])?{}:[]}if(o==="__proto__"||o==="constructor"||o==="prototype")return;e[o]=u,e=e[o]}},Ow={BLUR:"blur",FOCUS_OUT:"focusout",CHANGE:"change"},Ca={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},xn={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"},c4=Gt.default.createContext(null);c4.displayName="HookFormContext";var d4=(e,t,a,n=!0)=>{let r={defaultValues:t._defaultValues};for(let s in e)Object.defineProperty(r,s,{get:()=>{let i=s;return t._proxyFormState[i]!==Ca.all&&(t._proxyFormState[i]=!n||Ca.all),a&&(a[i]=!0),e[i]}});return r},m4=typeof window<"u"?Gt.default.useLayoutEffect:Gt.default.useEffect;var Va=e=>typeof e=="string",f4=(e,t,a,n,r)=>Va(e)?(n&&t.watch.add(e),X(a,e,r)):Array.isArray(e)?e.map(s=>(n&&t.watch.add(s),X(a,s))):(n&&(t.watchAll=!0),a),qp=e=>Dt(e)||!Qw(e);function ar(e,t,a=new WeakSet){if(qp(e)||qp(t))return e===t;if(Br(e)&&Br(t))return e.getTime()===t.getTime();let n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;if(a.has(e)||a.has(t))return!0;a.add(e),a.add(t);for(let s of n){let i=e[s];if(!r.includes(s))return!1;if(s!=="ref"){let o=t[s];if(Br(i)&&Br(o)||Xe(i)&&Xe(o)||Array.isArray(i)&&Array.isArray(o)?!ar(i,o,a):i!==o)return!1}}return!0}var p4=(e,t,a,n,r)=>t?{...a[e],types:{...a[e]&&a[e].types?a[e].types:{},[n]:r||!0}}:{},Qo=e=>Array.isArray(e)?e:[e],Lw=()=>{let e=[];return{get observers(){return e},next:r=>{for(let s of e)s.next&&s.next(r)},subscribe:r=>(e.push(r),{unsubscribe:()=>{e=e.filter(s=>s!==r)}}),unsubscribe:()=>{e=[]}}},Yt=e=>Xe(e)&&!Object.keys(e).length,Qp=e=>e.type==="file",Ea=e=>typeof e=="function",gc=e=>{if(!Ip)return!1;let t=e?e.ownerDocument:0;return e instanceof(t&&t.defaultView?t.defaultView.HTMLElement:HTMLElement)},Vw=e=>e.type==="select-multiple",Vp=e=>e.type==="radio",h4=e=>Vp(e)||Go(e),Bp=e=>gc(e)&&e.isConnected;function v4(e,t){let a=t.slice(0,-1).length,n=0;for(;n<a;)e=tt(e)?n++:e[t[n++]];return e}function g4(e){for(let t in e)if(e.hasOwnProperty(t)&&!tt(e[t]))return!1;return!0}function et(e,t){let a=Array.isArray(t)?t:xc(t)?[t]:Kp(t),n=a.length===1?e:v4(e,a),r=a.length-1,s=a[r];return n&&delete n[s],r!==0&&(Xe(n)&&Yt(n)||Array.isArray(n)&&g4(n))&&et(e,a.slice(0,-1)),e}var Gw=e=>{for(let t in e)if(Ea(e[t]))return!0;return!1};function yc(e,t={}){let a=Array.isArray(e);if(Xe(e)||a)for(let n in e)Array.isArray(e[n])||Xe(e[n])&&!Gw(e[n])?(t[n]=Array.isArray(e[n])?[]:{},yc(e[n],t[n])):Dt(e[n])||(t[n]=!0);return t}function Yw(e,t,a){let n=Array.isArray(e);if(Xe(e)||n)for(let r in e)Array.isArray(e[r])||Xe(e[r])&&!Gw(e[r])?tt(t)||qp(a[r])?a[r]=Array.isArray(e[r])?yc(e[r],[]):{...yc(e[r])}:Yw(e[r],Dt(t)?{}:t[r],a[r]):a[r]=!ar(e[r],t[r]);return a}var Ho=(e,t)=>Yw(e,t,yc(t)),Pw={value:!1,isValid:!1},jw={value:!0,isValid:!0},Jw=e=>{if(Array.isArray(e)){if(e.length>1){let t=e.filter(a=>a&&a.checked&&!a.disabled).map(a=>a.value);return{value:t,isValid:!!t.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!tt(e[0].attributes.value)?tt(e[0].value)||e[0].value===""?jw:{value:e[0].value,isValid:!0}:jw:Pw}return Pw},Xw=(e,{valueAsNumber:t,valueAsDate:a,setValueAs:n})=>tt(e)?e:t?e===""?NaN:e&&+e:a&&Va(e)?new Date(e):n?n(e):e,Uw={isValid:!1,value:null},Zw=e=>Array.isArray(e)?e.reduce((t,a)=>a&&a.checked&&!a.disabled?{isValid:!0,value:a.value}:t,Uw):Uw;function Fw(e){let t=e.ref;return Qp(t)?t.files:Vp(t)?Zw(e.refs).value:Vw(t)?[...t.selectedOptions].map(({value:a})=>a):Go(t)?Jw(e.refs).value:Xw(tt(t.value)?e.ref.value:t.value,e)}var y4=(e,t,a,n)=>{let r={};for(let s of e){let i=X(t,s);i&&Be(r,s,i._f)}return{criteriaMode:a,names:[...e],fields:r,shouldUseNativeValidation:n}},bc=e=>e instanceof RegExp,Ko=e=>tt(e)?e:bc(e)?e.source:Xe(e)?bc(e.value)?e.value.source:e.value:e,zw=e=>({isOnSubmit:!e||e===Ca.onSubmit,isOnBlur:e===Ca.onBlur,isOnChange:e===Ca.onChange,isOnAll:e===Ca.all,isOnTouch:e===Ca.onTouched}),Bw="AsyncFunction",b4=e=>!!e&&!!e.validate&&!!(Ea(e.validate)&&e.validate.constructor.name===Bw||Xe(e.validate)&&Object.values(e.validate).find(t=>t.constructor.name===Bw)),x4=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate),qw=(e,t,a)=>!a&&(t.watchAll||t.watch.has(e)||[...t.watch].some(n=>e.startsWith(n)&&/^\.\w+/.test(e.slice(n.length)))),Vo=(e,t,a,n)=>{for(let r of a||Object.keys(e)){let s=X(e,r);if(s){let{_f:i,...o}=s;if(i){if(i.refs&&i.refs[0]&&t(i.refs[0],r)&&!n)return!0;if(i.ref&&t(i.ref,i.name)&&!n)return!0;if(Vo(o,t))break}else if(Xe(o)&&Vo(o,t))break}}};function Iw(e,t,a){let n=X(e,a);if(n||xc(a))return{error:n,name:a};let r=a.split(".");for(;r.length;){let s=r.join("."),i=X(t,s),o=X(e,s);if(i&&!Array.isArray(i)&&a!==s)return{name:a};if(o&&o.type)return{name:s,error:o};if(o&&o.root&&o.root.type)return{name:`${s}.root`,error:o.root};r.pop()}return{name:a}}var $4=(e,t,a,n)=>{a(e);let{name:r,...s}=e;return Yt(s)||Object.keys(s).length>=Object.keys(t).length||Object.keys(s).find(i=>t[i]===(!n||Ca.all))},w4=(e,t,a)=>!e||!t||e===t||Qo(e).some(n=>n&&(a?n===t:n.startsWith(t)||t.startsWith(n))),S4=(e,t,a,n,r)=>r.isOnAll?!1:!a&&r.isOnTouch?!(t||e):(a?n.isOnBlur:r.isOnBlur)?!e:(a?n.isOnChange:r.isOnChange)?e:!0,N4=(e,t)=>!Hp(X(e,t)).length&&et(e,t),_4=(e,t,a)=>{let n=Qo(X(e,a));return Be(n,"root",t[a]),Be(e,a,n),e},vc=e=>Va(e);function Hw(e,t,a="validate"){if(vc(e)||Array.isArray(e)&&e.every(vc)||Qa(e)&&!e)return{type:a,message:vc(e)?e:"",ref:t}}var Zs=e=>Xe(e)&&!bc(e)?e:{value:e,message:""},Kw=async(e,t,a,n,r,s)=>{let{ref:i,refs:o,required:u,maxLength:c,minLength:d,min:m,max:f,pattern:p,validate:b,name:y,valueAsNumber:x,mount:g}=e._f,v=X(a,y);if(!g||t.has(y))return{};let $=o?o[0]:i,w=D=>{r&&$.reportValidity&&($.setCustomValidity(Qa(D)?"":D||""),$.reportValidity())},S={},R=Vp(i),C=Go(i),E=R||C,O=(x||Qp(i))&&tt(i.value)&&tt(v)||gc(i)&&i.value===""||v===""||Array.isArray(v)&&!v.length,j=p4.bind(null,y,n,S),J=(D,B,V,I=xn.maxLength,re=xn.minLength)=>{let xe=D?B:V;S[y]={type:D?I:re,message:xe,ref:i,...j(D?I:re,xe)}};if(s?!Array.isArray(v)||!v.length:u&&(!E&&(O||Dt(v))||Qa(v)&&!v||C&&!Jw(o).isValid||R&&!Zw(o).isValid)){let{value:D,message:B}=vc(u)?{value:!!u,message:u}:Zs(u);if(D&&(S[y]={type:xn.required,message:B,ref:$,...j(xn.required,B)},!n))return w(B),S}if(!O&&(!Dt(m)||!Dt(f))){let D,B,V=Zs(f),I=Zs(m);if(!Dt(v)&&!isNaN(v)){let re=i.valueAsNumber||v&&+v;Dt(V.value)||(D=re>V.value),Dt(I.value)||(B=re<I.value)}else{let re=i.valueAsDate||new Date(v),xe=Ot=>new Date(new Date().toDateString()+" "+Ot),Qe=i.type=="time",ut=i.type=="week";Va(V.value)&&v&&(D=Qe?xe(v)>xe(V.value):ut?v>V.value:re>new Date(V.value)),Va(I.value)&&v&&(B=Qe?xe(v)<xe(I.value):ut?v<I.value:re<new Date(I.value))}if((D||B)&&(J(!!D,V.message,I.message,xn.max,xn.min),!n))return w(S[y].message),S}if((c||d)&&!O&&(Va(v)||s&&Array.isArray(v))){let D=Zs(c),B=Zs(d),V=!Dt(D.value)&&v.length>+D.value,I=!Dt(B.value)&&v.length<+B.value;if((V||I)&&(J(V,D.message,B.message),!n))return w(S[y].message),S}if(p&&!O&&Va(v)){let{value:D,message:B}=Zs(p);if(bc(D)&&!v.match(D)&&(S[y]={type:xn.pattern,message:B,ref:i,...j(xn.pattern,B)},!n))return w(B),S}if(b){if(Ea(b)){let D=await b(v,a),B=Hw(D,$);if(B&&(S[y]={...B,...j(xn.validate,B.message)},!n))return w(B.message),S}else if(Xe(b)){let D={};for(let B in b){if(!Yt(D)&&!n)break;let V=Hw(await b[B](v,a),$,B);V&&(D={...V,...j(B,V.message)},w(V.message),n&&(S[y]=D))}if(!Yt(D)&&(S[y]={ref:$,...D},!n))return S}}return w(!0),S},R4={mode:Ca.onSubmit,reValidateMode:Ca.onChange,shouldFocusError:!0};function k4(e={}){let t={...R4,...e},a={submitCount:0,isDirty:!1,isReady:!1,isLoading:Ea(t.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},validatingFields:{},errors:t.errors||{},disabled:t.disabled||!1},n={},r=Xe(t.defaultValues)||Xe(t.values)?ht(t.defaultValues||t.values)||{}:{},s=t.shouldUnregister?{}:ht(r),i={action:!1,mount:!1,watch:!1},o={mount:new Set,disabled:new Set,unMount:new Set,array:new Set,watch:new Set},u,c=0,d={isDirty:!1,dirtyFields:!1,validatingFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},m={...d},f={array:Lw(),state:Lw()},p=t.criteriaMode===Ca.all,b=N=>_=>{clearTimeout(c),c=setTimeout(N,_)},y=async N=>{if(!t.disabled&&(d.isValid||m.isValid||N)){let _=t.resolver?Yt((await C()).errors):await O(n,!0);_!==a.isValid&&f.state.next({isValid:_})}},x=(N,_)=>{!t.disabled&&(d.isValidating||d.validatingFields||m.isValidating||m.validatingFields)&&((N||Array.from(o.mount)).forEach(A=>{A&&(_?Be(a.validatingFields,A,_):et(a.validatingFields,A))}),f.state.next({validatingFields:a.validatingFields,isValidating:!Yt(a.validatingFields)}))},g=(N,_=[],A,U,F=!0,P=!0)=>{if(U&&A&&!t.disabled){if(i.action=!0,P&&Array.isArray(X(n,N))){let G=A(X(n,N),U.argA,U.argB);F&&Be(n,N,G)}if(P&&Array.isArray(X(a.errors,N))){let G=A(X(a.errors,N),U.argA,U.argB);F&&Be(a.errors,N,G),N4(a.errors,N)}if((d.touchedFields||m.touchedFields)&&P&&Array.isArray(X(a.touchedFields,N))){let G=A(X(a.touchedFields,N),U.argA,U.argB);F&&Be(a.touchedFields,N,G)}(d.dirtyFields||m.dirtyFields)&&(a.dirtyFields=Ho(r,s)),f.state.next({name:N,isDirty:J(N,_),dirtyFields:a.dirtyFields,errors:a.errors,isValid:a.isValid})}else Be(s,N,_)},v=(N,_)=>{Be(a.errors,N,_),f.state.next({errors:a.errors})},$=N=>{a.errors=N,f.state.next({errors:a.errors,isValid:!1})},w=(N,_,A,U)=>{let F=X(n,N);if(F){let P=X(s,N,tt(A)?X(r,N):A);tt(P)||U&&U.defaultChecked||_?Be(s,N,_?P:Fw(F._f)):V(N,P),i.mount&&y()}},S=(N,_,A,U,F)=>{let P=!1,G=!1,fe={name:N};if(!t.disabled){if(!A||U){(d.isDirty||m.isDirty)&&(G=a.isDirty,a.isDirty=fe.isDirty=J(),P=G!==fe.isDirty);let _e=ar(X(r,N),_);G=!!X(a.dirtyFields,N),_e?et(a.dirtyFields,N):Be(a.dirtyFields,N,!0),fe.dirtyFields=a.dirtyFields,P=P||(d.dirtyFields||m.dirtyFields)&&G!==!_e}if(A){let _e=X(a.touchedFields,N);_e||(Be(a.touchedFields,N,A),fe.touchedFields=a.touchedFields,P=P||(d.touchedFields||m.touchedFields)&&_e!==A)}P&&F&&f.state.next(fe)}return P?fe:{}},R=(N,_,A,U)=>{let F=X(a.errors,N),P=(d.isValid||m.isValid)&&Qa(_)&&a.isValid!==_;if(t.delayError&&A?(u=b(()=>v(N,A)),u(t.delayError)):(clearTimeout(c),u=null,A?Be(a.errors,N,A):et(a.errors,N)),(A?!ar(F,A):F)||!Yt(U)||P){let G={...U,...P&&Qa(_)?{isValid:_}:{},errors:a.errors,name:N};a={...a,...G},f.state.next(G)}},C=async N=>{x(N,!0);let _=await t.resolver(s,t.context,y4(N||o.mount,n,t.criteriaMode,t.shouldUseNativeValidation));return x(N),_},E=async N=>{let{errors:_}=await C(N);if(N)for(let A of N){let U=X(_,A);U?Be(a.errors,A,U):et(a.errors,A)}else a.errors=_;return _},O=async(N,_,A={valid:!0})=>{for(let U in N){let F=N[U];if(F){let{_f:P,...G}=F;if(P){let fe=o.array.has(P.name),_e=F._f&&b4(F._f);_e&&d.validatingFields&&x([U],!0);let ua=await Kw(F,o.disabled,s,p,t.shouldUseNativeValidation&&!_,fe);if(_e&&d.validatingFields&&x([U]),ua[P.name]&&(A.valid=!1,_))break;!_&&(X(ua,P.name)?fe?_4(a.errors,ua,P.name):Be(a.errors,P.name,ua[P.name]):et(a.errors,P.name))}!Yt(G)&&await O(G,_,A)}}return A.valid},j=()=>{for(let N of o.unMount){let _=X(n,N);_&&(_._f.refs?_._f.refs.every(A=>!Bp(A)):!Bp(_._f.ref))&&se(N)}o.unMount=new Set},J=(N,_)=>!t.disabled&&(N&&_&&Be(s,N,_),!ar(Ot(),r)),D=(N,_,A)=>f4(N,o,{...i.mount?s:tt(_)?r:Va(N)?{[N]:_}:_},A,_),B=N=>Hp(X(i.mount?s:r,N,t.shouldUnregister?X(r,N,[]):[])),V=(N,_,A={})=>{let U=X(n,N),F=_;if(U){let P=U._f;P&&(!P.disabled&&Be(s,N,Xw(_,P)),F=gc(P.ref)&&Dt(_)?"":_,Vw(P.ref)?[...P.ref.options].forEach(G=>G.selected=F.includes(G.value)):P.refs?Go(P.ref)?P.refs.forEach(G=>{(!G.defaultChecked||!G.disabled)&&(Array.isArray(F)?G.checked=!!F.find(fe=>fe===G.value):G.checked=F===G.value||!!F)}):P.refs.forEach(G=>G.checked=G.value===F):Qp(P.ref)?P.ref.value="":(P.ref.value=F,P.ref.type||f.state.next({name:N,values:ht(s)})))}(A.shouldDirty||A.shouldTouch)&&S(N,F,A.shouldTouch,A.shouldDirty,!0),A.shouldValidate&&ut(N)},I=(N,_,A)=>{for(let U in _){if(!_.hasOwnProperty(U))return;let F=_[U],P=N+"."+U,G=X(n,P);(o.array.has(N)||Xe(F)||G&&!G._f)&&!Br(F)?I(P,F,A):V(P,F,A)}},re=(N,_,A={})=>{let U=X(n,N),F=o.array.has(N),P=ht(_);Be(s,N,P),F?(f.array.next({name:N,values:ht(s)}),(d.isDirty||d.dirtyFields||m.isDirty||m.dirtyFields)&&A.shouldDirty&&f.state.next({name:N,dirtyFields:Ho(r,s),isDirty:J(N,P)})):U&&!U._f&&!Dt(P)?I(N,P,A):V(N,P,A),qw(N,o)&&f.state.next({...a,name:N}),f.state.next({name:i.mount?N:void 0,values:ht(s)})},xe=async N=>{i.mount=!0;let _=N.target,A=_.name,U=!0,F=X(n,A),P=_e=>{U=Number.isNaN(_e)||Br(_e)&&isNaN(_e.getTime())||ar(_e,X(s,A,_e))},G=zw(t.mode),fe=zw(t.reValidateMode);if(F){let _e,ua,tl=_.type?Fw(F._f):i4(N),wn=N.type===Ow.BLUR||N.type===Ow.FOCUS_OUT,jR=!x4(F._f)&&!t.resolver&&!X(a.errors,A)&&!F._f.deps||S4(wn,X(a.touchedFields,A),a.isSubmitted,fe,G),rd=qw(A,o,wn);Be(s,A,tl),wn?(!_||!_.readOnly)&&(F._f.onBlur&&F._f.onBlur(N),u&&u(0)):F._f.onChange&&F._f.onChange(N);let sd=S(A,tl,wn),UR=!Yt(sd)||rd;if(!wn&&f.state.next({name:A,type:N.type,values:ht(s)}),jR)return(d.isValid||m.isValid)&&(t.mode==="onBlur"?wn&&y():wn||y()),UR&&f.state.next({name:A,...rd?{}:sd});if(!wn&&rd&&f.state.next({...a}),t.resolver){let{errors:Ah}=await C([A]);if(P(tl),U){let FR=Iw(a.errors,n,A),Dh=Iw(Ah,n,FR.name||A);_e=Dh.error,A=Dh.name,ua=Yt(Ah)}}else x([A],!0),_e=(await Kw(F,o.disabled,s,p,t.shouldUseNativeValidation))[A],x([A]),P(tl),U&&(_e?ua=!1:(d.isValid||m.isValid)&&(ua=await O(n,!0)));U&&(F._f.deps&&ut(F._f.deps),R(A,ua,_e,sd))}},Qe=(N,_)=>{if(X(a.errors,_)&&N.focus)return N.focus(),1},ut=async(N,_={})=>{let A,U,F=Qo(N);if(t.resolver){let P=await E(tt(N)?N:F);A=Yt(P),U=N?!F.some(G=>X(P,G)):A}else N?(U=(await Promise.all(F.map(async P=>{let G=X(n,P);return await O(G&&G._f?{[P]:G}:G)}))).every(Boolean),!(!U&&!a.isValid)&&y()):U=A=await O(n);return f.state.next({...!Va(N)||(d.isValid||m.isValid)&&A!==a.isValid?{}:{name:N},...t.resolver||!N?{isValid:A}:{},errors:a.errors}),_.shouldFocus&&!U&&Vo(n,Qe,N?F:o.mount),U},Ot=N=>{let _={...i.mount?s:r};return tt(N)?_:Va(N)?X(_,N):N.map(A=>X(_,A))},Lt=(N,_)=>({invalid:!!X((_||a).errors,N),isDirty:!!X((_||a).dirtyFields,N),error:X((_||a).errors,N),isValidating:!!X(a.validatingFields,N),isTouched:!!X((_||a).touchedFields,N)}),Ja=N=>{N&&Qo(N).forEach(_=>et(a.errors,_)),f.state.next({errors:N?a.errors:{}})},$a=(N,_,A)=>{let U=(X(n,N,{_f:{}})._f||{}).ref,F=X(a.errors,N)||{},{ref:P,message:G,type:fe,..._e}=F;Be(a.errors,N,{..._e,..._,ref:U}),f.state.next({name:N,errors:a.errors,isValid:!1}),A&&A.shouldFocus&&U&&U.focus&&U.focus()},$t=(N,_)=>Ea(N)?f.state.subscribe({next:A=>"values"in A&&N(D(void 0,_),A)}):D(N,_,!0),Pt=N=>f.state.subscribe({next:_=>{w4(N.name,_.name,N.exact)&&$4(_,N.formState||d,te,N.reRenderRoot)&&N.callback({values:{...s},...a,..._,defaultValues:r})}}).unsubscribe,me=N=>(i.mount=!0,m={...m,...N.formState},Pt({...N,formState:m})),se=(N,_={})=>{for(let A of N?Qo(N):o.mount)o.mount.delete(A),o.array.delete(A),_.keepValue||(et(n,A),et(s,A)),!_.keepError&&et(a.errors,A),!_.keepDirty&&et(a.dirtyFields,A),!_.keepTouched&&et(a.touchedFields,A),!_.keepIsValidating&&et(a.validatingFields,A),!t.shouldUnregister&&!_.keepDefaultValue&&et(r,A);f.state.next({values:ht(s)}),f.state.next({...a,..._.keepDirty?{isDirty:J()}:{}}),!_.keepIsValid&&y()},Oe=({disabled:N,name:_})=>{(Qa(N)&&i.mount||N||o.disabled.has(_))&&(N?o.disabled.add(_):o.disabled.delete(_))},Ne=(N,_={})=>{let A=X(n,N),U=Qa(_.disabled)||Qa(t.disabled);return Be(n,N,{...A||{},_f:{...A&&A._f?A._f:{ref:{name:N}},name:N,mount:!0,..._}}),o.mount.add(N),A?Oe({disabled:Qa(_.disabled)?_.disabled:t.disabled,name:N}):w(N,!0,_.value),{...U?{disabled:_.disabled||t.disabled}:{},...t.progressive?{required:!!_.required,min:Ko(_.min),max:Ko(_.max),minLength:Ko(_.minLength),maxLength:Ko(_.maxLength),pattern:Ko(_.pattern)}:{},name:N,onChange:xe,onBlur:xe,ref:F=>{if(F){Ne(N,_),A=X(n,N);let P=tt(F.value)&&F.querySelectorAll&&F.querySelectorAll("input,select,textarea")[0]||F,G=h4(P),fe=A._f.refs||[];if(G?fe.find(_e=>_e===P):P===A._f.ref)return;Be(n,N,{_f:{...A._f,...G?{refs:[...fe.filter(Bp),P,...Array.isArray(X(r,N))?[{}]:[]],ref:{type:P.type,name:N}}:{ref:P}}}),w(N,!1,void 0,P)}else A=X(n,N,{}),A._f&&(A._f.mount=!1),(t.shouldUnregister||_.shouldUnregister)&&!(l4(o.array,N)&&i.action)&&o.unMount.add(N)}}},Ve=()=>t.shouldFocusError&&Vo(n,Qe,o.mount),Pe=N=>{Qa(N)&&(f.state.next({disabled:N}),Vo(n,(_,A)=>{let U=X(n,A);U&&(_.disabled=U._f.disabled||N,Array.isArray(U._f.refs)&&U._f.refs.forEach(F=>{F.disabled=U._f.disabled||N}))},0,!1))},Te=(N,_)=>async A=>{let U;A&&(A.preventDefault&&A.preventDefault(),A.persist&&A.persist());let F=ht(s);if(f.state.next({isSubmitting:!0}),t.resolver){let{errors:P,values:G}=await C();a.errors=P,F=ht(G)}else await O(n);if(o.disabled.size)for(let P of o.disabled)et(F,P);if(et(a.errors,"root"),Yt(a.errors)){f.state.next({errors:{}});try{await N(F,A)}catch(P){U=P}}else _&&await _({...a.errors},A),Ve(),setTimeout(Ve);if(f.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:Yt(a.errors)&&!U,submitCount:a.submitCount+1,errors:a.errors}),U)throw U},jt=(N,_={})=>{X(n,N)&&(tt(_.defaultValue)?re(N,ht(X(r,N))):(re(N,_.defaultValue),Be(r,N,ht(_.defaultValue))),_.keepTouched||et(a.touchedFields,N),_.keepDirty||(et(a.dirtyFields,N),a.isDirty=_.defaultValue?J(N,ht(X(r,N))):J()),_.keepError||(et(a.errors,N),d.isValid&&y()),f.state.next({...a}))},vt=(N,_={})=>{let A=N?ht(N):r,U=ht(A),F=Yt(N),P=F?r:U;if(_.keepDefaultValues||(r=A),!_.keepValues){if(_.keepDirtyValues){let G=new Set([...o.mount,...Object.keys(Ho(r,s))]);for(let fe of Array.from(G))X(a.dirtyFields,fe)?Be(P,fe,X(s,fe)):re(fe,X(P,fe))}else{if(Ip&&tt(N))for(let G of o.mount){let fe=X(n,G);if(fe&&fe._f){let _e=Array.isArray(fe._f.refs)?fe._f.refs[0]:fe._f.ref;if(gc(_e)){let ua=_e.closest("form");if(ua){ua.reset();break}}}}if(_.keepFieldsRef)for(let G of o.mount)re(G,X(P,G));else n={}}s=t.shouldUnregister?_.keepDefaultValues?ht(r):{}:ht(P),f.array.next({values:{...P}}),f.state.next({values:{...P}})}o={mount:_.keepDirtyValues?o.mount:new Set,unMount:new Set,array:new Set,disabled:new Set,watch:new Set,watchAll:!1,focus:""},i.mount=!d.isValid||!!_.keepIsValid||!!_.keepDirtyValues,i.watch=!!t.shouldUnregister,f.state.next({submitCount:_.keepSubmitCount?a.submitCount:0,isDirty:F?!1:_.keepDirty?a.isDirty:!!(_.keepDefaultValues&&!ar(N,r)),isSubmitted:_.keepIsSubmitted?a.isSubmitted:!1,dirtyFields:F?{}:_.keepDirtyValues?_.keepDefaultValues&&s?Ho(r,s):a.dirtyFields:_.keepDefaultValues&&N?Ho(r,N):_.keepDirty?a.dirtyFields:{},touchedFields:_.keepTouched?a.touchedFields:{},errors:_.keepErrors?a.errors:{},isSubmitSuccessful:_.keepIsSubmitSuccessful?a.isSubmitSuccessful:!1,isSubmitting:!1,defaultValues:r})},Ut=(N,_)=>vt(Ea(N)?N(s):N,_),he=(N,_={})=>{let A=X(n,N),U=A&&A._f;if(U){let F=U.refs?U.refs[0]:U.ref;F.focus&&(F.focus(),_.shouldSelect&&Ea(F.select)&&F.select())}},te=N=>{a={...a,...N}},ct={control:{register:Ne,unregister:se,getFieldState:Lt,handleSubmit:Te,setError:$a,_subscribe:Pt,_runSchema:C,_focusError:Ve,_getWatch:D,_getDirty:J,_setValid:y,_setFieldArray:g,_setDisabledField:Oe,_setErrors:$,_getFieldArray:B,_reset:vt,_resetDefaultValues:()=>Ea(t.defaultValues)&&t.defaultValues().then(N=>{Ut(N,t.resetOptions),f.state.next({isLoading:!1})}),_removeUnmounted:j,_disableForm:Pe,_subjects:f,_proxyFormState:d,get _fields(){return n},get _formValues(){return s},get _state(){return i},set _state(N){i=N},get _defaultValues(){return r},get _names(){return o},set _names(N){o=N},get _formState(){return a},get _options(){return t},set _options(N){t={...t,...N}}},subscribe:me,trigger:ut,register:Ne,handleSubmit:Te,watch:$t,setValue:re,getValues:Ot,reset:Ut,resetField:jt,clearErrors:Ja,unregister:se,setError:$a,setFocus:he,getFieldState:Lt};return{...ct,formControl:ct}}function Ww(e={}){let t=Gt.default.useRef(void 0),a=Gt.default.useRef(void 0),[n,r]=Gt.default.useState({isDirty:!1,isValidating:!1,isLoading:Ea(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},validatingFields:{},errors:e.errors||{},disabled:e.disabled||!1,isReady:!1,defaultValues:Ea(e.defaultValues)?void 0:e.defaultValues});if(!t.current)if(e.formControl)t.current={...e.formControl,formState:n},e.defaultValues&&!Ea(e.defaultValues)&&e.formControl.reset(e.defaultValues,e.resetOptions);else{let{formControl:i,...o}=k4(e);t.current={...o,formState:n}}let s=t.current.control;return s._options=e,m4(()=>{let i=s._subscribe({formState:s._proxyFormState,callback:()=>r({...s._formState}),reRenderRoot:!0});return r(o=>({...o,isReady:!0})),s._formState.isReady=!0,i},[s]),Gt.default.useEffect(()=>s._disableForm(e.disabled),[s,e.disabled]),Gt.default.useEffect(()=>{e.mode&&(s._options.mode=e.mode),e.reValidateMode&&(s._options.reValidateMode=e.reValidateMode)},[s,e.mode,e.reValidateMode]),Gt.default.useEffect(()=>{e.errors&&(s._setErrors(e.errors),s._focusError())},[s,e.errors]),Gt.default.useEffect(()=>{e.shouldUnregister&&s._subjects.state.next({values:s._getWatch()})},[s,e.shouldUnregister]),Gt.default.useEffect(()=>{if(s._proxyFormState.isDirty){let i=s._getDirty();i!==n.isDirty&&s._subjects.state.next({isDirty:i})}},[s,n.isDirty]),Gt.default.useEffect(()=>{e.values&&!ar(e.values,a.current)?(s._reset(e.values,{keepFieldsRef:!0,...s._options.resetOptions}),a.current=e.values,r(i=>({...i}))):s._resetDefaultValues()},[s,e.values]),Gt.default.useEffect(()=>{s._state.mount||(s._setValid(),s._state.mount=!0),s._state.watch&&(s._state.watch=!1,s._subjects.state.next({...s._formState})),s._removeUnmounted()}),t.current.formState=d4(n,s),t.current}var e1={default:"bg-[var(--v2-card-bg)] border border-[var(--v2-card-border)] shadow-[var(--v2-card-shadow)]",bordered:"bg-[var(--v2-card-bg)] border border-[var(--v2-panel-border)] shadow-[var(--v2-card-shadow)]",subtle:"bg-[var(--v2-surface-soft)] border border-[var(--v2-panel-border)]",inset:"bg-[var(--v2-surface-muted)] border border-[var(--v2-panel-border)]"},t1={sm:"rounded-[14px]",md:"rounded-[1.25rem] md:rounded-[1.5rem]",lg:"rounded-[1.5rem]"},C4={none:"",sm:"p-4",md:"p-5",lg:"p-5 md:p-7"};function ae({children:e,className:t="",variant:a="default",radius:n="md",padding:r="none",as:s="div",...i}){return l`
    <${s}
      className=${K(e1[a]??e1.default,t1[n]??t1.md,C4[r]??"",t)}
      ...${i}
    >
      ${e}
    <//>
  `}var Gp="w-full border bg-[var(--v2-input-bg)] text-[var(--v2-text-strong)] placeholder:text-[var(--v2-text-faint)] border-[var(--v2-panel-border)] outline-none focus:border-[var(--v2-accent)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--v2-accent)_28%,transparent)] disabled:cursor-not-allowed disabled:opacity-50",$c={sm:"h-9 rounded-[10px] px-3 text-[12px]",md:"h-[44px] rounded-[14px] px-3.5 text-[13px] md:h-[50px] md:rounded-[16px] md:px-4 md:text-sm",lg:"h-[54px] rounded-[18px] px-4 text-base"};function Mt({className:e="",size:t="md",error:a=!1,...n}){return l`
    <input
      className=${K(Gp,$c[t]??$c.md,a&&"border-[var(--v2-danger-text)] focus:ring-[color-mix(in_srgb,var(--v2-danger-text)_28%,transparent)]",e)}
      ...${n}
    />
  `}function wc({className:e="",error:t=!1,rows:a=4,...n}){return l`
    <textarea
      rows=${a}
      className=${K(Gp,"rounded-[14px] px-3.5 py-3 text-[13px] md:rounded-[16px] md:px-4 md:text-sm","resize-y min-h-[80px]",t&&"border-[var(--v2-danger-text)] focus:ring-[color-mix(in_srgb,var(--v2-danger-text)_28%,transparent)]",e)}
      ...${n}
    />
  `}function Yp({children:e,className:t="",size:a="md",error:n=!1,...r}){return l`
    <div className="relative w-full">
      <select
        className=${K(Gp,$c[a]??$c.md,"appearance-none pr-9 cursor-pointer",n&&"border-[var(--v2-danger-text)]",t)}
        ...${r}
      >
        ${e}
      </select>
      <!-- Caret arrow -->
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--v2-text-faint)]"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 4.5 6 8l3.5-3.5" />
        </svg>
      </span>
    </div>
  `}function E4({children:e,className:t="",required:a=!1,...n}){return l`
    <label
      className=${K("block text-[13px] font-medium text-[var(--v2-text-strong)] md:text-sm",t)}
      ...${n}
    >
      ${e}
      ${a&&l`<span className="ml-0.5 text-[var(--v2-danger-text)]" aria-hidden="true"> *</span>`}
    </label>
  `}function $n({label:e,children:t,error:a="",hint:n="",required:r=!1,className:s="",htmlFor:i=""}){return l`
    <div className=${K("flex flex-col gap-2",s)}>
      ${e&&l`<${E4} htmlFor=${i} required=${r}>${e}<//>`}
      ${t}
      ${a&&l`<p className="text-xs text-[var(--v2-danger-text)]" role="alert">${a}</p>`}
      ${!a&&n&&l`<p className="text-xs text-[var(--v2-text-faint)]">${n}</p>`}
    </div>
  `}var T4={yunohost:"YunoHost",google:"Google",github:"GitHub",apple:"Apple"};function A4(e,t){return`/auth/login/${encodeURIComponent(e)}?redirect_after=${encodeURIComponent(t)}`}function a1({providers:e,redirectAfter:t}){let a=k();return e.length?l`
    <div className="mt-6 space-y-3">
      <div className="flex items-center gap-3 text-[11px] uppercase text-[var(--v2-text-faint)]">
        <span className="h-px flex-1 bg-[var(--v2-panel-border)]"></span>
        <span>${a("login.oauthDivider")}</span>
        <span className="h-px flex-1 bg-[var(--v2-panel-border)]"></span>
      </div>
      <div className="grid gap-2">
        ${e.map(n=>l`
            <${T}
              key=${n}
              as="a"
              href=${A4(n,t)}
              variant="secondary"
              fullWidth
              className="gap-2"
            >
              <${M} name="shield" className="h-4 w-4" />
              ${a("login.oauthProvider",{provider:T4[n]||n})}
            <//>
          `)}
      </div>
    </div>
  `:null}var D4=["yunohost","google","github","apple"];function n1(){let[e,t]=h.default.useState([]);return h.default.useEffect(()=>{let a=!1;return qx().then(n=>{if(a)return;let r=Array.isArray(n?.providers)?n.providers:[];t(D4.filter(s=>r.includes(s)))}).catch(()=>{a||t([])}),()=>{a=!0}},[]),e}function r1({initialToken:e,error:t,oauthRedirectAfter:a="/v2",onSubmit:n}){let r=k(),{theme:s,toggleTheme:i}=cc(),o=n1(),{formState:{errors:u,isSubmitting:c},handleSubmit:d,register:m}=Ww({defaultValues:{token:e||""}});return l`
    <main
      className="relative flex min-h-[100dvh] items-center justify-center bg-[var(--v2-canvas)] px-4 py-8 sm:px-6 lg:px-12"
    >
      <!-- Theme toggle -->
      <${T}
        variant="secondary"
        size="icon"
        onClick=${i}
        aria-label=${r(s==="dark"?"theme.switchToLight":"theme.switchToDark")}
        title=${r(s==="dark"?"theme.light":"theme.dark")}
        className="absolute right-4 top-4 z-10 sm:right-6 sm:top-6"
      >
        <${M} name=${s==="dark"?"sun":"moon"} className="h-4 w-4" />
      <//>

      <!-- Login form (centered) -->
      <${ae}
        as="section"
        radius="lg"
        padding="md"
        className="w-full max-w-md p-6 shadow-none sm:p-8"
      >
        <div className="mb-8">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--v2-accent-text)]">
            ${r("login.tagline")}
          </p>
          <h1
            className="text-5xl font-semibold leading-none tracking-[-0.04em] text-[var(--v2-text-strong)]"
          >
            ${r("login.console")}
          </h1>
          <p className="mt-4 text-sm leading-6 text-[var(--v2-text-muted)]">
            ${r("login.secureSub")}
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit=${d(({token:f})=>n(f))}
        >
          <${$n}
            label=${r("login.tokenLabel")}
            htmlFor="v2-token"
            error=${u.token?.message??""}
            hint=${r("login.tokenHint")}
          >
            <${Mt}
              id="v2-token"
              type="password"
              error=${!!u.token}
              ...${m("token",{required:r("login.tokenRequired"),setValueAs:f=>f.trim()})}
              placeholder=${r("login.tokenPlaceholder")}
              autocomplete="current-password"
            />
          <//>

          ${t&&l`<p
              className=${K("rounded-[10px] border px-3 py-2 text-sm","border-[color-mix(in_srgb,var(--v2-danger-text)_36%,var(--v2-panel-border))]","bg-[var(--v2-danger-soft)] text-[var(--v2-danger-text)]")}
            >${t}</p>`}

          <${T}
            type="submit"
            variant="primary"
            fullWidth
            disabled=${c}
          >
            ${r("login.connect")}
          <//>
        </form>

        <${a1}
          providers=${o}
          redirectAfter=${a}
        />
      <//>
    </main>
  `}var s1={success:"border-[color-mix(in_srgb,var(--v2-positive-text)_30%,var(--v2-panel-border))] bg-[var(--v2-positive-soft)] text-[var(--v2-positive-text)]",positive:"border-[color-mix(in_srgb,var(--v2-positive-text)_30%,var(--v2-panel-border))] bg-[var(--v2-positive-soft)] text-[var(--v2-positive-text)]",signal:"border-[color-mix(in_srgb,var(--v2-positive-text)_30%,var(--v2-panel-border))] bg-[var(--v2-positive-soft)] text-[var(--v2-positive-text)]",warning:"border-[color-mix(in_srgb,var(--v2-warning-text)_34%,var(--v2-panel-border))] bg-[var(--v2-warning-soft)] text-[var(--v2-warning-text)]",copper:"border-[color-mix(in_srgb,var(--v2-warning-text)_34%,var(--v2-panel-border))] bg-[var(--v2-warning-soft)] text-[var(--v2-warning-text)]",danger:"border-[color-mix(in_srgb,var(--v2-danger-text)_34%,var(--v2-panel-border))] bg-[var(--v2-danger-soft)] text-[var(--v2-danger-text)]",info:"border-[color-mix(in_srgb,var(--v2-info-text)_30%,var(--v2-panel-border))] bg-[var(--v2-info-soft)] text-[var(--v2-info-text)]",accent:"border-[color-mix(in_srgb,var(--v2-accent-text)_30%,var(--v2-panel-border))] bg-[var(--v2-accent-soft)] text-[var(--v2-accent-text)]",muted:"border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] text-[var(--v2-text-muted)]"},i1={sm:"h-6 gap-1.5 rounded-full px-2 text-[0.625rem] tracking-[0.12em]",md:"h-7 gap-2 rounded-full px-2.5 text-[0.6875rem] tracking-[0.12em]"};function z({tone:e="muted",label:t,dot:a=!0,size:n="md",className:r=""}){let s=e==="success"||e==="positive"||e==="signal";return l`
    <span
      className=${K("inline-flex shrink-0 items-center whitespace-nowrap border font-mono uppercase",i1[n]??i1.md,s1[e]??s1.muted,r)}
    >
      ${a&&l`<span
          className=${K("h-1.5 w-1.5 shrink-0 rounded-full bg-current",s&&"animate-[v2-breathe_2s_ease-in-out_infinite]")}
        />`}
      ${t}
    </span>
  `}var M4=/(write|edit|delete|remove|patch|create|move|rename|chmod|rm\b)/,o1=/(bash|shell|exec|run|command|terminal|spawn|process)/,l1=/(curl|http|fetch|web|network|request|api|gh\b|git|download|upload|browse)/;function u1(e,t,a){let n=String(e||"").toLowerCase(),r=[t,a].filter(Boolean).join(" ").toLowerCase();return M4.test(n)?{tone:"danger",key:"tool.riskWrite"}:o1.test(n)?{tone:"warning",key:"tool.riskExec"}:l1.test(n)?{tone:"info",key:"tool.riskNetwork"}:o1.test(r)?{tone:"warning",key:"tool.riskExec"}:l1.test(r)?{tone:"info",key:"tool.riskNetwork"}:{tone:"muted",key:"tool.riskRead"}}var Sc=480;function O4(e,t){return t&&t.length>0?t.some(a=>typeof a?.value=="string"&&a.value.length>Sc):typeof e=="string"&&e.length>Sc}function c1(e,t){return typeof e!="string"||t||e.length<=Sc?e:`${e.slice(0,Sc).trimEnd()}
...`}function d1({gate:e,onApprove:t,onDeny:a,onAlways:n}){let r=k(),{toolName:s,description:i,parameters:o,allowAlways:u,approvalDetails:c=[]}=e,[d,m]=h.default.useState(!1),[f,p]=h.default.useState(!1);h.default.useEffect(()=>{p(!1)},[e]);let b=h.default.useMemo(()=>u1(s,i,o),[s,i,o]),y=s||r("approval.thisTool"),x=O4(o,c),g=f?"max-h-72":"max-h-36",v=h.default.useCallback(()=>{d&&u?n?.():t?.()},[d,u,n,t]);return l`
    <div className="mx-auto max-w-lg rounded-xl border border-copper/30 bg-copper/10 p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-md border border-copper/25 bg-copper/10 text-copper">
          <${M} name="lock" className="h-4 w-4" />
        </span>
        <span className="font-semibold text-white">${r("approval.title")}</span>
        <${z}
          tone=${b.tone}
          label=${r(b.key)}
          dot=${!1}
          size="sm"
          className="ml-auto"
        />
      </div>
      ${s&&l`<div className="mb-1 break-all font-mono text-sm font-medium text-iron-100">${s}</div>`}
      ${i&&l`<div className="mb-3 break-words text-sm text-iron-200">${i}</div>`}
      ${c.length>0?l`
            <dl className=${`mb-2 ${g} overflow-y-auto rounded-md border border-iron-800 bg-iron-950/80 text-xs`}>
              ${c.map($=>l`
                  <div className="grid gap-1 border-b border-iron-800/70 px-3 py-2 last:border-b-0 sm:grid-cols-[7rem_1fr]">
                    <dt className="font-medium text-iron-400">${$.label}</dt>
                    <dd className="min-w-0 whitespace-pre-wrap break-all font-mono text-iron-100">${c1($.value,f)}</dd>
                  </div>
                `)}
            </dl>
          `:o&&l`<pre className=${`mb-2 ${g} overflow-auto whitespace-pre-wrap break-all rounded-md bg-iron-950 p-2 font-mono text-xs text-iron-100`}>${c1(o,f)}</pre>`}

      ${x&&l`
        <${T}
          variant="ghost"
          size="sm"
          className="mb-3 px-0 text-[var(--v2-accent)] hover:bg-transparent"
          onClick=${()=>p($=>!$)}
          type="button"
        >
          ${r(f?"approval.showCommandPreview":"approval.viewFullCommand")}
        <//>
      `}

      ${u&&l`
        <label className="mb-3 flex items-center gap-2 text-xs text-iron-200">
          <input
            type="checkbox"
            checked=${d}
            onChange=${$=>m($.currentTarget.checked)}
            className="h-3.5 w-3.5 accent-[var(--v2-accent)]"
          />
          ${r("approval.alwaysAllowToolLabel",{tool:y})}
        </label>
      `}

      <div className="flex flex-wrap gap-2">
        <${T} variant="primary" onClick=${v}>
          ${r(d&&u?"approval.approveAndAlways":"approval.approve")}
        <//>
        <${T} variant="secondary" onClick=${()=>a?.()}>
          ${r("approval.deny")}
        <//>
      </div>
    </div>
  `}function Ws({icon:e="lock",headline:t,provider:a,accountLabel:n,body:r,expiresAt:s,pillHint:i,defaultExpanded:o=!0,children:u}){let c=k(),[d,m]=h.default.useState(o),f=h.default.useId(),p=n||a||"";return l`
    <div className="mx-auto w-full max-w-lg rounded-xl border border-[rgba(76,167,230,0.34)] bg-[rgba(76,167,230,0.08)]">
      <button
        type="button"
        onClick=${()=>m(b=>!b)}
        aria-expanded=${d?"true":"false"}
        aria-controls=${f}
        className="flex w-full items-center gap-3 rounded-xl border-0 bg-transparent px-4 py-3 text-left"
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-[rgba(76,167,230,0.28)] bg-[rgba(76,167,230,0.1)] text-[#8fc8f2]">
          <${M} name=${e} className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-semibold text-white">
            ${t||c("authGate.title")}
          </span>
          ${p&&l`<span className="block truncate text-xs text-iron-300">${p}</span>`}
        </span>
        <span className="ml-auto flex shrink-0 items-center gap-1.5 text-xs font-medium text-[#8fc8f2]">
          ${i&&l`<span className="hidden sm:inline">${i}</span>`}
          <${M}
            name="chevron"
            className=${["h-4 w-4",d?"rotate-180":""].join(" ")}
          />
        </span>
      </button>

      ${d&&l`
        <div
          id=${f}
          className="border-t border-[rgba(76,167,230,0.2)] px-4 pb-4 pt-3"
        >
          ${r&&l`<div className="mb-3 text-sm text-iron-200">${r}</div>`}
          ${u}
          ${s&&l`
            <p className="mt-2 text-xs text-iron-300">
              ${c("authGate.expiresAt")}: ${new Date(s).toLocaleString()}
            </p>
          `}
        </div>
      `}
    </div>
  `}function m1({gate:e,onCancel:t}){let a=k();return l`
    <${Ws}
      icon="lock"
      headline=${e?.headline||a("authGate.title")}
      body=${e?.body||""}
    >
      <form onSubmit=${n=>n.preventDefault()}>
        <div className="mb-3 text-sm text-iron-200">
          ${a("authGate.unsupportedChallenge")}
        </div>
        <div className="flex flex-wrap gap-2">
          <${T} type="button" variant="secondary" onClick=${()=>t?.()}>
            ${a("authGate.cancel")}
          <//>
        </div>
      </form>
    <//>
  `}function f1({gate:e,onCancel:t}){let a=k(),[n,r]=h.default.useState(!1),[s,i]=h.default.useState(""),o=h.default.useMemo(()=>{if(!e.authorizationUrl)return!1;try{return new URL(e.authorizationUrl).protocol==="https:"}catch{return!1}},[e.authorizationUrl]);h.default.useEffect(()=>{i("")},[e.authorizationUrl,e.gateRef,e.runId]);let u=e.provider?e.provider.charAt(0).toUpperCase()+e.provider.slice(1):a("authGate.oauthProviderFallback"),c=h.default.useCallback(()=>{if(!o){i(a("authGate.serviceUnavailable"));return}i(""),window.open(e.authorizationUrl,"_blank","noopener,noreferrer"),r(!0)},[e.authorizationUrl,o]),d=n?a("authGate.reopenAuthorization",{provider:u}):a("authGate.openAuthorization",{provider:u});return l`
    <${Ws}
      icon="link"
      headline=${e?.headline||a("authGate.oauthTitle")}
      provider=${e?.provider?u:""}
      accountLabel=${e?.accountLabel||""}
      body=${e?.body||""}
      expiresAt=${e?.expiresAt||""}
      pillHint=${a("authGate.pillAuthorize")}
    >
      <div className="flex flex-wrap gap-2">
        <${T}
          as="a"
          href=${o?e.authorizationUrl:void 0}
          target="_blank"
          rel="noopener noreferrer"
          className="auth-oauth"
          variant="primary"
          onClick=${m=>{m.preventDefault(),c()}}
        >
          <${M} name="link" className="h-4 w-4" />
          ${d}
        <//>
        <${T}
          type="button"
          variant="secondary"
          onClick=${()=>t?.()}
        >
          ${a("authGate.cancel")}
        <//>
      </div>

      ${s&&l`
        <div
          className="mt-3 rounded-md border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs text-red-200"
          role="alert"
        >
          ${s}
        </div>
      `}
      ${n&&l`
        <p className="mt-2 text-xs text-iron-300">${a("authGate.oauthWaiting")}</p>
      `}
    <//>
  `}function p1({gate:e,onSubmit:t,onCancel:a}){let n=k(),[r,s]=h.default.useState(""),[i,o]=h.default.useState(""),[u,c]=h.default.useState(!1),d=h.default.useCallback(async m=>{m.preventDefault();let f=r.trim();if(!f){o(n("authGate.tokenRequired"));return}o(""),c(!0);try{await t(f),s("")}catch(p){o(p?.safeAuthGateCode==="credential_stored_gate_resolution_failed"?n("authGate.resolveFailedAfterTokenSaved"):n("authGate.submitFailed"))}finally{c(!1)}},[t,n,r]);return l`
    <${Ws}
      icon="lock"
      headline=${e?.headline||n("authGate.title")}
      provider=${e?.provider||""}
      accountLabel=${e?.accountLabel||""}
      body=${e?.body||""}
      pillHint=${n("authGate.pillEnterToken")}
    >
      <form onSubmit=${d}>
        <div className="mb-3">
          <${Mt}
            type="password"
            autoComplete="off"
            spellCheck=${!1}
            value=${r}
            disabled=${u}
            placeholder=${n("authGate.tokenPlaceholder")}
            aria-label=${n("authGate.tokenLabel")}
            error=${!!i}
            onInput=${m=>s(m.currentTarget.value)}
          />
          ${i&&l`
            <p className="mt-2 text-xs text-[var(--v2-danger-text)]" role="alert">
              ${i}
            </p>
          `}
        </div>
        <div className="flex flex-wrap gap-2">
          <${T} type="submit" variant="primary" disabled=${u}>
            ${n(u?"authGate.submitting":"authGate.submit")}
          <//>
          <${T}
            type="button"
            variant="secondary"
            disabled=${u}
            onClick=${()=>a?.()}
          >
            ${n("authGate.cancel")}
          <//>
        </div>
      </form>
    <//>
  `}var L4="/api/webchat/v2/extensions/pairing/redeem";function h1(e){return Z(L4,{method:"POST",body:JSON.stringify({channel:"slack",code:e})}).then(t=>({success:!0,provider:t.provider,provider_user_id:t.provider_user_id,message:"Slack account connected."}))}function Nc({action:e}){let t=k(),a=ee(),n=Y({mutationFn:({code:u})=>h1(u),onSuccess:()=>{a.invalidateQueries({queryKey:["extensions"]}),a.invalidateQueries({queryKey:["connectable-channels"]}),a.invalidateQueries({queryKey:["pairing","slack"]})}}),[r,s]=h.default.useState(""),i=P4(e,t),o=()=>{let u=r.trim();u&&(n.mutate({code:u}),s(""))};return l`
    <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
      <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">
        ${i.title}
      </h4>
      <p className="mb-4 text-xs leading-5 text-iron-300">
        ${i.instructions}
      </p>

      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="text"
          value=${r}
          onChange=${u=>s(u.target.value)}
          onKeyDown=${u=>u.key==="Enter"&&o()}
          placeholder=${i.codePlaceholder}
          className="h-9 min-w-0 flex-1 rounded-md border border-white/12 bg-white/[0.04] px-3 font-mono text-sm text-iron-100 outline-none placeholder:text-iron-700 focus:border-signal/45"
        />
        <${T}
          variant="secondary"
          className="h-9 shrink-0 px-3 text-xs"
          onClick=${o}
          disabled=${n.isPending||!r.trim()}
        >
          ${i.submitLabel}
        <//>
      </div>

      ${n.isSuccess&&l`<p className="text-xs text-emerald-300">
        ${n.data?.message||i.successMessage}
      </p>`}
      ${n.isError&&l`<p className="text-xs text-red-300">
        ${j4(n.error,i.errorMessage)}
      </p>`}
    </div>
  `}function P4(e,t){return{title:e?.title||t("pairing.slackTitle"),instructions:e?.instructions||t("pairing.slackInstructions"),codePlaceholder:e?.input_placeholder||e?.code_placeholder||t("pairing.slackPlaceholder"),submitLabel:e?.submit_label||t("pairing.connect"),successMessage:e?.success_message||t("pairing.slackSuccess"),errorMessage:e?.error_message||t("pairing.slackError")}}function j4(e,t){return e?.payload?.error||e?.payload?.message||e?.message||t}function U4(e,t){return e?.channel==="slack"&&e.strategy===t}function v1({connectAction:e,onDismiss:t}){if(!e)return null;let a=e.channel;return l`
    <div className="rounded-[16px] border border-white/[0.06] bg-white/[0.02] p-3">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal">
            Connect ${e.display_name||a}
          </div>
        </div>
        ${t&&l`
          <button
            type="button"
            aria-label="Dismiss connect action"
            onClick=${t}
            className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-iron-400 hover:bg-white/[0.04] hover:text-iron-100"
          >
            <${M} name="close" className="h-4 w-4" />
          </button>
        `}
      </div>

      ${U4(e,"inbound_proof_code")?l`<${Nc} action=${e.action} />`:l`
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs leading-5 text-iron-300">
              ${e.action?.instructions||"This channel exposes a connect action, but the WebUI has no renderer for its strategy yet."}
            </div>
          `}
    </div>
  `}function F4(e){let t=e?.attachments;return t?{accept:Array.isArray(t.accept)?t.accept.filter(a=>typeof a=="string"):jr.accept,maxCount:Number.isFinite(t.max_count)?t.max_count:jr.maxCount,maxFileBytes:Number.isFinite(t.max_file_bytes)?t.max_file_bytes:jr.maxFileBytes,maxTotalBytes:Number.isFinite(t.max_total_bytes)?t.max_total_bytes:jr.maxTotalBytes}:jr}function g1(){let e=xa(),t=H({enabled:!!e,queryKey:["session"],queryFn:nc,staleTime:5*6e4});return F4(t.data)}function _c({onSend:e,onCancel:t,disabled:a,canCancel:n=!1,initialText:r="",resetKey:s="",draftKey:i=zo,variant:o="dock",context:u={},statusText:c=""}){let d=k(),m=o==="hero",f=g1(),[p,b]=h.default.useState(()=>Tp(i)),[y,x]=h.default.useState(()=>Dp(i)),[g,v]=h.default.useState(""),[$,w]=h.default.useState(!1),[S,R]=h.default.useState(!1),[C,E]=h.default.useState(!1),O=h.default.useRef(null),j=h.default.useRef(null),J=h.default.useRef([]),D=h.default.useRef(Promise.resolve());h.default.useEffect(()=>{J.current=y},[y]);let B=h.default.useRef(null),V=h.default.useRef(null),I=h.default.useCallback(()=>{V.current&&(window.clearTimeout(V.current),V.current=null);let te=B.current;B.current=null,te&&te.scope===Rt()&&Ap(te.key,te.text)},[]),re=h.default.useCallback(()=>{V.current&&(window.clearTimeout(V.current),V.current=null),B.current=null},[]),xe=h.default.useCallback(()=>{let te=O.current;te&&(te.style.height="auto",te.style.height=`${Math.min(te.scrollHeight,200)}px`)},[]);h.default.useEffect(()=>{xe()},[p,xe]),h.default.useEffect(()=>(b(Tp(i)),()=>I()),[i,I]);let Qe=h.default.useRef(i);h.default.useEffect(()=>{if(Qe.current!==i){Qe.current=i,x(Dp(i)),v("");return}p$(i,y)},[i,y]),h.default.useEffect(()=>{r&&(b(r),window.requestAnimationFrame(()=>{O.current&&(O.current.focus(),O.current.setSelectionRange(r.length,r.length))}))},[r,s]);let ut=h.default.useCallback(te=>{a||!te||te.length===0||(D.current=D.current.then(async()=>{let{staged:$e,errors:ct}=await a$(te,{limits:f,existing:J.current,t:d});$e.length>0&&x(N=>{let _=[...N,...$e];return J.current=_,_}),v(ct.length>0?ct.join(" "):"")}).catch(()=>{v(d("chat.attachmentStagingFailed"))}))},[a,f,d]),Ot=h.default.useCallback(te=>{x($e=>{let ct=$e.filter(N=>N.id!==te);return J.current=ct,ct}),v("")},[]),Lt=h.default.useCallback(()=>{a||j.current?.click()},[a]),Ja=h.default.useCallback(te=>{let $e=Array.from(te.target.files||[]);ut($e),te.target.value=""},[ut]),$a=h.default.useCallback(async()=>{if(!(!p.trim()||a||$)){w(!0);try{await e(p.trim(),{attachments:y}),b(""),x([]),J.current=[],v(""),re(),f$(i),h$(i),O.current&&(O.current.style.height="auto")}catch{}finally{w(!1)}}},[p,y,a,$,e,i,re]),$t=h.default.useCallback(te=>{let $e=te.target.value;b($e),B.current={key:i,text:$e,scope:Rt()},V.current&&window.clearTimeout(V.current),V.current=window.setTimeout(I,300)},[i,I]),Pt=h.default.useCallback(async()=>{if(!(!n||S||!t)){R(!0);try{await t()}finally{R(!1)}}},[n,S,t]),me=h.default.useCallback(te=>{te.key==="Enter"&&!te.shiftKey&&(te.preventDefault(),$a())},[$a]),se=h.default.useCallback(te=>{let $e=Array.from(te.clipboardData?.files||[]);$e.length>0&&(te.preventDefault(),ut($e))},[ut]),Oe=h.default.useCallback(te=>{te.preventDefault(),E(!1);let $e=Array.from(te.dataTransfer?.files||[]);$e.length>0&&ut($e)},[ut]),Ne=h.default.useCallback(te=>{te.preventDefault(),!a&&E(!0)},[a]),Ve=h.default.useCallback(te=>{te.currentTarget.contains(te.relatedTarget)||E(!1)},[]),Pe=p.trim(),Te=d(m?"chat.heroPlaceholder":"chat.followUpPlaceholder"),jt=f.accept.length>0?f.accept.join(","):void 0,vt=m?"w-full":"px-4 py-3 sm:px-5 lg:px-8",Ut=["relative mx-auto w-full max-w-5xl rounded-[20px] border border-[var(--v2-panel-border)] bg-[var(--v2-card-bg)] shadow-[var(--v2-card-shadow)] p-2.5 transition-colors",a?"":"focus-within:border-[var(--v2-accent)] focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--v2-accent)_28%,transparent)]",m?"min-h-[120px]":"",a?"opacity-70":""].join(" "),he=["w-full flex-1 resize-none border-0 !border-transparent !bg-transparent px-2 text-[0.9375rem] leading-6","text-white outline-none placeholder:text-iron-700 focus:!border-transparent focus:!bg-transparent focus:!outline-none focus:!shadow-none disabled:opacity-50",m?"min-h-[72px]":"min-h-[40px]"].join(" ");return l`
    <div className=${vt}>
      <div
        className=${Ut}
        onDrop=${Oe}
        onDragOver=${Ne}
        onDragLeave=${Ve}
      >
        ${C&&l`
          <div className="pointer-events-none absolute inset-1 z-10 flex items-center justify-center rounded-[16px] border border-dashed border-[color-mix(in_srgb,var(--v2-accent)_55%,var(--v2-panel-border))] bg-[color-mix(in_srgb,var(--v2-canvas)_82%,transparent)] text-sm font-medium text-[var(--v2-accent-text)]">
            ${d("chat.attachmentDropHint")}
          </div>
        `}
        ${g&&l`
          <div
            role="alert"
            className="mb-3 flex items-start gap-2 rounded-md border border-[color-mix(in_srgb,var(--v2-danger-text)_36%,var(--v2-panel-border))] bg-[var(--v2-danger-soft)] px-3 py-2 text-xs leading-5 text-[var(--v2-danger-text)]"
          >
            <span className="min-w-0 flex-1">${g}</span>
            <button
              type="button"
              onClick=${()=>v("")}
              aria-label=${d("common.dismiss")}
              title=${d("common.dismiss")}
              className="-mr-1 -mt-0.5 shrink-0 rounded p-0.5 text-[color-mix(in_srgb,var(--v2-danger-text)_80%,transparent)] transition hover:bg-[color-mix(in_srgb,var(--v2-danger-text)_14%,transparent)] hover:text-[var(--v2-danger-text)]"
            >
              <${M} name="close" className="h-3.5 w-3.5" strokeWidth=${2} />
            </button>
          </div>
        `}

        ${y.length>0&&l`
          <div className="mb-2 flex flex-wrap gap-2 px-1">
            ${y.map(te=>l`
                <div
                  key=${te.id}
                  className="group/att relative flex items-center gap-2 rounded-lg border border-iron-700 bg-iron-900/60 py-1.5 pl-1.5 pr-7 text-xs text-iron-100"
                >
                  ${te.previewUrl?l`<img
                        src=${te.previewUrl}
                        alt=${te.filename}
                        className="h-9 w-9 shrink-0 rounded object-cover"
                      />`:l`<span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded bg-iron-800 text-signal"
                      >
                        <${M} name="file" className="h-4 w-4" />
                      </span>`}
                  <span className="flex min-w-0 flex-col">
                    <span className="max-w-[12rem] truncate font-medium">
                      ${te.filename}
                    </span>
                    <span className="text-[10px] text-iron-400">${te.sizeLabel}</span>
                  </span>
                  <button
                    type="button"
                    onClick=${()=>Ot(te.id)}
                    aria-label=${d("chat.attachmentRemove")}
                    title=${d("chat.attachmentRemove")}
                    className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full text-iron-400 hover:bg-iron-700 hover:text-white"
                  >
                    <${M} name="close" className="h-3 w-3" />
                  </button>
                </div>
              `)}
          </div>
        `}

        <textarea
          ref=${O}
          data-testid="chat-composer"
          value=${p}
          onChange=${$t}
          onKeyDown=${me}
          onPaste=${se}
          placeholder=${Te}
          rows=${1}
          disabled=${a}
          className=${he}
        />

        <input
          ref=${j}
          type="file"
          multiple
          accept=${jt}
          className="hidden"
          onChange=${Ja}
        />

        <div className="mt-2 flex items-center gap-2">
          ${a&&l`
            <span className="inline-flex items-center gap-2 text-xs text-[var(--v2-text-muted)]">
              <span className="h-2 w-2 rounded-full bg-[var(--v2-accent)]" />
              ${c||d("chat.statusWorking")}
            </span>
          `}
          <div className="ml-auto flex items-center gap-1.5">
            <button
              type="button"
              onClick=${Lt}
              disabled=${a}
              aria-label=${d("chat.attachFiles")}
              title=${d("chat.attachFiles")}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--v2-text-muted)] hover:bg-[var(--v2-surface-soft)] hover:text-[var(--v2-accent-text)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <${M} name="plus" className="h-5 w-5" />
            </button>
            ${n?l`
                <${T}
                  type="button"
                  variant="danger"
                  size="icon-sm"
                  onClick=${Pt}
                  disabled=${S}
                  aria-label=${d("common.cancel")}
                  title=${d("common.cancel")}
                  className="rounded-full"
                >
                  <${M} name="close" className="h-5 w-5" />
                <//>
              `:l`
                <${T}
                  type="button"
                  variant="primary"
                  size="icon-sm"
                  onClick=${$a}
                  disabled=${a||$||!Pe}
                  aria-label=${d("chat.send")}
                  className="rounded-full"
                >
                  <${M} name="send" className="h-5 w-5" />
                <//>
              `}
          </div>
        </div>
      </div>
    </div>
  `}var y1={connected:"bg-mint/20 text-mint border-mint/30",reconnecting:"bg-copper/20 text-copper border-copper/30",disconnected:"bg-red-500/20 text-red-200 border-red-400/30",connecting:"bg-iron-700/50 text-iron-200 border-iron-700/50",paused:"bg-iron-700/50 text-iron-200 border-iron-700/50",idle:"hidden"};function b1({status:e}){let t=k();if(e==="idle"||e==="connected"||!e)return null;let a="connection."+e,n=t(a);return l`
    <div
      className=${["sticky top-4 z-20 mx-auto mt-4 md:mt-0 mb-2 max-w-md rounded-full border px-4 py-1.5 text-center text-xs font-medium backdrop-blur-xl",y1[e]||y1.connecting].join(" ")}
    >
      ${n!==a?n:e}
    </div>
  `}function x1({onSuggestion:e,onSend:t,disabled:a,initialText:n,resetKey:r,draftKey:s,context:i,statusText:o,canCancel:u,onCancel:c,preComposerContent:d}){let m=k(),f=[{icon:"tool",title:m("chat.suggestion1"),detail:m("chat.suggestion1Desc")},{icon:"shield",title:m("chat.suggestion2"),detail:m("chat.suggestion2Desc")},{icon:"plug",title:m("chat.suggestion3"),detail:m("chat.suggestion3Desc")}];return l`
    <div
      className="v2-page-entrance flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-8 sm:px-8 lg:px-12"
    >
      <div className="w-full max-w-5xl text-center">
        <h2
          className="mx-auto max-w-[16ch] text-4xl font-semibold leading-[1.04] text-white sm:text-5xl lg:text-6xl"
        >
          ${m("chat.heroTitle")}
        </h2>
        <p
          className="mx-auto mt-4 max-w-[64ch] text-base leading-relaxed text-iron-300"
        >
          ${m("chat.heroDesc")}
        </p>
      </div>

      <div className="mt-9 w-full max-w-5xl">
        ${d||null}
        <${_c}
          onSend=${t}
          disabled=${a}
          initialText=${n}
          resetKey=${r}
          draftKey=${s}
          variant="hero"
          context=${i}
          statusText=${o}
          canCancel=${u}
          onCancel=${c}
        />
      </div>

      <div className="mt-8 grid w-full max-w-5xl gap-2">
        ${f.map(p=>l`
            <button
              type="button"
              key=${p.title}
              onClick=${()=>e(p.title)}
              className="v2-button group grid grid-cols-[auto_1fr_auto] items-center gap-3 border-t border-white/10 px-2 py-4 text-left hover:border-signal/35"
            >
              <span
                className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-iron-300 group-hover:border-signal/35 group-hover:text-signal"
              >
                <${M} name=${p.icon} className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-iron-100">
                  ${p.title}
                </span>
                <span className="mt-0.5 block text-sm text-iron-300">
                  ${p.detail}
                </span>
              </span>
            </button>
          `)}
      </div>
    </div>
  `}var z4=[{keys:["Enter"],descKey:"shortcuts.send"},{keys:["Shift","Enter"],descKey:"shortcuts.newline"},{keys:["?"],descKey:"shortcuts.help"},{keys:["Esc"],descKey:"shortcuts.close"}];function $1({open:e,onClose:t}){let a=k();return e?l`
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label=${a("shortcuts.title")}
    >
      <button
        type="button"
        aria-label=${a("shortcuts.close")}
        onClick=${t}
        className="absolute inset-0 bg-black/50"
      ></button>
      <div
        className="relative w-full max-w-md rounded-2xl border border-[var(--v2-panel-border)] bg-[var(--v2-surface)] p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
      >
        <div className="mb-4 flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-md border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] text-[var(--v2-text-muted)]">
            <${M} name="bolt" className="h-4 w-4" />
          </span>
          <h2 className="text-base font-semibold text-[var(--v2-text-strong)]">
            ${a("shortcuts.title")}
          </h2>
          <button
            type="button"
            onClick=${t}
            aria-label=${a("shortcuts.close")}
            className="ml-auto grid h-7 w-7 place-items-center rounded-md text-[var(--v2-text-faint)] hover:bg-[var(--v2-surface-soft)] hover:text-[var(--v2-text-strong)]"
          >
            <${M} name="close" className="h-4 w-4" />
          </button>
        </div>
        <ul className="flex flex-col gap-2">
          ${z4.map((n,r)=>l`
              <li
                key=${r}
                className="flex items-center justify-between gap-3 text-sm text-[var(--v2-text)]"
              >
                <span>${a(n.descKey)}</span>
                <span className="flex items-center gap-1">
                  ${n.keys.map((s,i)=>l`<kbd
                      key=${i}
                      className="rounded-md border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] px-2 py-0.5 font-mono text-[11px] text-[var(--v2-text-muted)]"
                    >${s}</kbd>`)}
                </span>
              </li>
            `)}
        </ul>
      </div>
    </div>
  `:null}function S1(e){let t=0,a=0,n=0,r=0;for(let i of e){if(i.role==="thinking"&&(t+=1),i.role==="tool_activity"){let o=w1([i]);a+=o.tools,n+=o.failed,r+=o.running}if(B4(i)){let o=w1(i.toolCalls);a+=o.tools,n+=o.failed,r+=o.running}}let s=[];return t&&s.push(`${t} reasoning`),a&&s.push(`${a} ${a===1?"tool":"tools"}`),n&&s.push(`${n} failed`),!n&&r&&s.push("running"),{hasError:n>0,label:`Activity${s.length?` - ${s.join(", ")}`:""}`}}function w1(e){let t=0,a=0;for(let n of e)n.toolStatus==="error"&&(t+=1),n.toolStatus==="running"&&(a+=1);return{tools:e.length,failed:t,running:a}}function B4(e){return e.toolCalls&&e.toolCalls.length>0}var N1=!1;function q4(){N1||!window.DOMPurify||(window.DOMPurify.addHook("afterSanitizeAttributes",e=>{e.tagName==="A"&&e.getAttribute("href")&&(e.setAttribute("target","_blank"),e.setAttribute("rel","noopener noreferrer"))}),N1=!0)}function _1(e){if(!e)return"";if(!window.marked||!window.DOMPurify){let a=document.createElement("div");return a.textContent=e,a.innerHTML}q4();let t=window.marked.parse(e,{gfm:!0,breaks:!0});return window.DOMPurify.sanitize(t)}var Jp=360;function I4(e){e&&e.querySelectorAll("pre").forEach(t=>{if(t.dataset.enhanced==="1")return;t.dataset.enhanced="1";let a=t.querySelector("code");if(window.hljs&&a)try{window.hljs.highlightElement(a)}catch{}let n=document.createElement("div");n.className="markdown-code-frame",t.parentNode.insertBefore(n,t),n.appendChild(t);let r=document.createElement("div");r.style.cssText="position:absolute;top:6px;right:6px;display:flex;gap:4px;opacity:0",n.addEventListener("mouseenter",()=>r.style.opacity="1"),n.addEventListener("mouseleave",()=>r.style.opacity="0");let s=c=>{let d=document.createElement("button");return d.type="button",d.textContent=c,d.style.cssText="font-family:var(--font-mono,monospace);font-size:11px;border:1px solid var(--v2-panel-border);background:var(--v2-surface);color:var(--v2-text-muted);border-radius:6px;padding:2px 7px;cursor:pointer",d},i=!1,o=s("Wrap");o.addEventListener("click",()=>{i=!i,t.style.whiteSpace=i?"pre-wrap":"",o.textContent=i?"No wrap":"Wrap"});let u=s("Copy");if(u.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(a?a.innerText:t.innerText),u.textContent="Copied",Js("Code copied",{tone:"success"}),setTimeout(()=>u.textContent="Copy",1400)}catch{}}),r.appendChild(o),r.appendChild(u),n.appendChild(r),t.scrollHeight>Jp){t.style.maxHeight=`${Jp}px`,t.style.overflowX="auto",t.style.overflowY="hidden";let c=!1,d=document.createElement("button");d.type="button",d.textContent="Show more",d.style.cssText="display:block;width:100%;text-align:center;font-family:var(--font-mono,monospace);font-size:11px;color:var(--v2-accent-text);background:var(--v2-surface-soft);border:0;border-top:1px solid var(--v2-panel-border);padding:5px;cursor:pointer",d.addEventListener("click",()=>{c=!c,t.style.maxHeight=c?"none":`${Jp}px`,t.style.overflowY=c?"visible":"hidden",d.textContent=c?"Show less":"Show more"}),n.appendChild(d)}})}function H4({content:e,className:t=""}){let a=h.default.useRef(null),n=h.default.useMemo(()=>_1(e),[e]);return h.default.useEffect(()=>{I4(a.current)},[n]),l`
    <div
      ref=${a}
      className=${["markdown-body",t].join(" ")}
      dangerouslySetInnerHTML=${{__html:n}}
    />
  `}var oa=h.default.memo(H4);var R1={running:"bg-[var(--v2-accent)] animate-[v2-breathe_1.6s_ease-in-out_infinite]",success:"bg-[var(--v2-positive-text)]",error:"bg-[var(--v2-danger-text)]"},K4={success:"ok",error:"err",running:"run"},Q4=2;function ei({activity:e}){return e.toolCalls&&e.toolCalls.length>0?l`<${G4} tools=${e.toolCalls} />`:l`<${Y4} activity=${e} />`}function V4(e,t){let a=0,n=0,r=0,s=0;for(let u of t){let c=String(u.toolName||"").toLowerCase();/(grep|search|find|lookup|query)/.test(c)?n+=1:/(bash|shell|exec|run|command|terminal|spawn|process)/.test(c)?r+=1:/(read|file|content|cat|view|open|glob|list|ls|tree|fetch|get|inspect|diff)/.test(c)?a+=1:s+=1}let i=[];a&&i.push(e(a===1?"tool.runFile":"tool.runFiles",{n:a})),n&&i.push(e(n===1?"tool.runSearch":"tool.runSearches",{n})),r&&i.push(e(r===1?"tool.runCommand":"tool.runCommands",{n:r})),s&&i.push(e(s===1?"tool.runOther":"tool.runOthers",{n:s}));let o=i.join(", ");return o.charAt(0).toUpperCase()+o.slice(1)}function G4({tools:e}){let t=k(),a=e.some(i=>i.toolStatus==="error"),[n,r]=h.default.useState(a);if(h.default.useEffect(()=>{a&&r(!0)},[a]),e.length<=Q4)return l`
      <div className="flex flex-col gap-3">
        ${e.map((i,o)=>l`<${ei}
            key=${i.id||i.callId||`${i.toolName}-${o}`}
            activity=${i}
          />`)}
      </div>
    `;let s=V4(t,e);return l`
    <div className="flex flex-col">
      <button
        type="button"
        onClick=${()=>r(i=>!i)}
        aria-expanded=${n?"true":"false"}
        className=${["v2-button flex w-full items-center gap-2 border-0 bg-transparent px-1 py-1.5 text-left text-sm",a?"text-[var(--v2-danger-text)]":"text-iron-400 hover:text-iron-200"].join(" ")}
      >
        <${M} name="layers" className="h-4 w-4 shrink-0" />
        <span className="truncate">${s}</span>
        <${M}
          name="chevron"
          className=${["ml-auto h-3.5 w-3.5 shrink-0",n?"rotate-180":""].join(" ")}
        />
      </button>

      ${n&&l`
        <div className="mt-2 flex flex-col gap-3">
          ${e.map((i,o)=>l`<${ei}
              key=${i.id||i.callId||`${i.toolName}-${o}`}
              activity=${i}
            />`)}
        </div>
      `}
    </div>
  `}function Y4({activity:e,nested:t=!1}){let{toolName:a,toolStatus:n,toolDetail:r,toolError:s,toolDurationMs:i,toolParameters:o,toolResultPreview:u}=e,[c,d]=h.default.useState(n==="error");h.default.useEffect(()=>{n==="error"&&d(!0)},[n]);let m=R1[n]||R1.running,f=i!=null,p=h.default.useId(),b=l`
    <button
      type="button"
      onClick=${()=>d(y=>!y)}
      aria-expanded=${c?"true":"false"}
      aria-controls=${p}
      className="v2-button flex w-full items-center gap-2.5 border-0 border-b border-iron-700/40 bg-transparent px-1 py-2 text-left text-sm"
    >
      <span className=${["h-2 w-2 shrink-0 rounded-full",m].join(" ")} />
      <span className="shrink-0 font-mono text-[11px] uppercase tracking-wide text-iron-300"
        >${K4[n]||"run"}</span
      >
      <span className="shrink-0 truncate font-mono text-[13px] font-medium text-iron-100"
        >${a}</span
      >
      ${r&&l`<span className="min-w-0 truncate font-mono text-xs text-iron-400"
        >${r}</span
      >`}
      <span className="ml-auto flex shrink-0 items-center gap-2">
        ${f&&l`<span className="font-mono text-[11px] text-iron-300">${i}ms</span>`}
        <${M}
          name="chevron"
          className=${["h-3.5 w-3.5 text-iron-400",c?"rotate-180":""].join(" ")}
        />
      </span>
    </button>
  `;return l`
    <div className=${t?"":"flex gap-3"}>
      ${!t&&l`
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-iron-800 text-iron-100"
        >
          <${M} name="tool" className="h-4 w-4" />
        </div>
      `}
      <div className=${t?"min-w-0 flex-1":"min-w-0 max-w-[85%] flex-1"}>
        ${b}
        ${c&&l`<${J4}
          controlsId=${p}
          toolDetail=${r}
          toolParameters=${o}
          toolResultPreview=${u}
          toolError=${s}
          toolStatus=${n}
          toolDurationMs=${f?i:null}
        />`}
      </div>
    </div>
  `}function J4({controlsId:e,toolDetail:t,toolParameters:a,toolResultPreview:n,toolError:r,toolStatus:s,toolDurationMs:i}){let o=k(),u=h.default.useMemo(()=>{let f=[];return r&&f.push({id:"error",label:o("tool.tabError")}),t&&f.push({id:"details",label:o("tool.tabDetails")}),a&&f.push({id:"params",label:o("tool.tabParameters")}),n&&f.push({id:"result",label:o("tool.tabResult")}),f},[o,r,t,a,n]),[c,d]=h.default.useState(null),m=c&&u.some(f=>f.id===c)?c:u[0]?.id;return h.default.useEffect(()=>{r&&d("error")},[r]),u.length===0?l`
      <div
        id=${e}
        className="rounded-b-lg border-x border-b border-iron-700/40 bg-iron-950 px-3 py-2 font-mono text-xs text-iron-400"
      >
        ${o("tool.noDetail")}
      </div>
    `:l`
    <div
      id=${e}
      className="rounded-b-lg border-x border-b border-iron-700/40 bg-iron-950"
    >
      <div className="flex items-center gap-1 border-b border-iron-700/40 px-2 pt-1.5">
        ${u.map(f=>l`
            <button
              type="button"
              key=${f.id}
              onClick=${()=>d(f.id)}
              className=${["v2-button rounded-t-md px-2.5 py-1 font-mono text-[11px]",m===f.id?"bg-iron-900 text-iron-100":"text-iron-400 hover:text-iron-200"].join(" ")}
            >
              ${f.label}
            </button>
          `)}
        <span className="ml-auto px-1 py-1 font-mono text-[10px] text-iron-500">
          ${o(s==="error"?"tool.exitError":s==="running"?"tool.exitRunning":"tool.exitOk")}${i!==null?` \xB7 ${i}ms`:""}
        </span>
      </div>
      <div className="p-3 text-xs">
        ${m==="details"&&l`<div className="whitespace-pre-wrap text-iron-200">${t}</div>`}
        ${m==="params"&&l`<pre className="overflow-x-auto rounded bg-iron-900 p-2 font-mono text-iron-100">${a}</pre>`}
        ${m==="result"&&l`<${X4} text=${n} />`}
        ${m==="error"&&l`<pre className="overflow-x-auto whitespace-pre-wrap rounded bg-iron-900 p-2 font-mono text-[var(--v2-danger-text)]">${r}</pre>`}
      </div>
    </div>
  `}function X4({text:e}){let t=typeof e=="string"?e.trim():"";if(/^data:image\/(?:png|jpe?g|gif|webp|bmp);/i.test(t))return l`<img
      src=${t}
      alt="Tool result"
      className="max-h-72 rounded-lg border border-iron-700 object-contain"
    />`;let a;if((t.startsWith("{")||t.startsWith("["))&&t.length<2e5)try{a=JSON.parse(t)}catch{a=void 0}if(Array.isArray(a)&&a.length>0&&a.every(Z4)){let n=Array.from(a.reduce((r,s)=>(Object.keys(s).forEach(i=>r.add(i)),r),new Set));return l`
      <div className="overflow-x-auto rounded border border-iron-700/60">
        <table className="w-full border-collapse text-left font-mono text-[11px]">
          <thead>
            <tr>
              ${n.map(r=>l`<th
                  key=${r}
                  className="border-b border-iron-700/60 bg-iron-900 px-2 py-1 font-semibold text-iron-100"
                >${r}</th>`)}
            </tr>
          </thead>
          <tbody>
            ${a.map((r,s)=>l`<tr key=${s}>
                ${n.map(i=>l`<td
                    key=${i}
                    className="border-b border-iron-700/40 px-2 py-1 text-iron-200"
                  >${W4(r[i])}</td>`)}
              </tr>`)}
          </tbody>
        </table>
      </div>
    `}return a!==void 0&&typeof a=="object"?l`<pre
      className="overflow-x-auto whitespace-pre-wrap rounded bg-iron-900 p-2 font-mono text-[var(--v2-positive-text)]"
    >${JSON.stringify(a,null,2)}</pre>`:l`<pre
    className="overflow-x-auto whitespace-pre-wrap rounded bg-iron-900 p-2 font-mono text-[var(--v2-positive-text)]"
  >${e}</pre>`}function Z4(e){return e&&typeof e=="object"&&!Array.isArray(e)&&Object.values(e).every(t=>t===null||typeof t!="object")}function W4(e){return e==null?"":String(e)}function k1({activity:e}){let t=S1(e),a=aA(e),[n,r]=h.default.useState(a);return h.default.useEffect(()=>{a&&r(!0)},[a]),l`
    <div className="mr-auto flex w-full max-w-[85%] flex-col">
      <button
        type="button"
        onClick=${()=>r(s=>!s)}
        aria-expanded=${n?"true":"false"}
        className=${["v2-button flex w-full items-center gap-2 border-0 bg-transparent px-1 py-1.5 text-left text-sm",t.hasError?"text-[var(--v2-danger-text)]":"text-iron-400 hover:text-iron-200"].join(" ")}
      >
        <${M} name="layers" className="h-4 w-4 shrink-0" />
        <span className="truncate">${t.label}</span>
        <${M}
          name="chevron"
          className=${["ml-auto h-3.5 w-3.5 shrink-0",n?"rotate-180":""].join(" ")}
        />
      </button>

      ${n&&l`
        <div className="mt-2 flex flex-col gap-3">
          ${e.map((s,i)=>l`
            <${eA}
              key=${s.id||`${s.role||"activity"}-${i}`}
              item=${s}
            />
          `)}
        </div>
      `}
    </div>
  `}function eA({item:e}){if(e.role==="thinking")return l`<${tA} content=${e.content} />`;if(e.role==="tool_activity"||Xp(e)){let t=Xp(e)?{id:e.id,toolCalls:e.toolCalls}:e;return l`<${ei} activity=${t} />`}return null}function tA({content:e}){return e?l`
    <div className="flex gap-3">
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-iron-800 text-iron-100"
      >
        <${M} name="spark" className="h-4 w-4" />
      </div>
      <div className="min-w-0 max-w-[85%] flex-1 border-l-2 border-white/10 pl-3 text-iron-300">
        <${oa} content=${e} className="text-[13px]" />
      </div>
    </div>
  `:null}function Xp(e){return e?.toolCalls&&e.toolCalls.length>0}function aA(e){return(e||[]).some(t=>t?.role==="thinking"||t?.toolStatus==="running"||t?.toolStatus==="error"?!0:Xp(t)?t.toolCalls.some(a=>a?.toolStatus==="running"||a?.toolStatus==="error"):!1)}function Rc(e,t){let a=URL.createObjectURL(e);try{let n=document.createElement("a");n.href=a,n.download=t||"download",document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(a),100)}catch(n){throw URL.revokeObjectURL(a),n}}function nA({att:e}){let t=e.kind==="image"||(e.mime_type||"").toLowerCase().startsWith("image/"),[a,n]=h.default.useState(()=>t&&e.preview_url||null);return h.default.useEffect(()=>{if(!t){n(null);return}if(e.preview_url){n(e.preview_url);return}if(!e.fetch_url){n(null);return}n(null);let r=!1;return ic(e.fetch_url).then(s=>{r||n(s)}).catch(()=>{}),()=>{r=!0}},[t,e.preview_url,e.fetch_url]),t&&a?l`<img
      src=${a}
      alt=${e.filename||"attachment"}
      className="h-9 w-9 shrink-0 rounded object-cover"
    />`:l`<${M} name="file" className="h-3.5 w-3.5 shrink-0 text-signal" />`}var C1="flex items-stretch rounded-md border border-iron-700 bg-iron-900/50 text-xs",E1="px-3 py-2";function kc({att:e,onPreview:t,testId:a,dataPath:n,downloadTestId:r}){let[s,i]=h.default.useState(!1),o=h.default.useCallback(async()=>{if(e.fetch_url){i(!0);try{let c=await ka(e.fetch_url);Rc(c,e.filename||"download")}catch{}finally{i(!1)}}},[e.fetch_url,e.filename]),u=l`
    <${nA} att=${e} />
    <span className="truncate">${e.filename||"attachment"}</span>
    <span className="ml-auto shrink-0 text-iron-200"
      >${e.mime_type}${e.size_label?" / "+e.size_label:""}</span
    >
  `;return!e.fetch_url&&!e.preview_url?l`<div
      className=${`${C1} ${E1} items-center gap-2`}
      data-testid=${a}
      data-file-path=${n}
    >
      ${u}
    </div>`:l`<div className=${`${C1} overflow-hidden`}>
    <button
      type="button"
      onClick=${()=>t(e)}
      aria-label=${`Preview ${e.filename||"attachment"}`}
      data-testid=${a}
      data-file-path=${n}
      className=${`flex min-w-0 flex-1 items-center gap-2 ${E1} text-left transition-colors hover:bg-iron-900/80`}
    >
      ${u}
    </button>
    ${e.fetch_url&&l`<button
      type="button"
      onClick=${o}
      disabled=${s}
      aria-label=${`Download ${e.filename||"attachment"}`}
      data-testid=${r}
      className="flex shrink-0 items-center border-l border-iron-700 px-2.5 text-iron-200 transition-colors hover:bg-iron-900/80 hover:text-white disabled:opacity-50"
    >
      <${M} name="download" className="h-3.5 w-3.5" />
    </button>`}
  </div>`}var T1={sm:"max-w-sm",md:"max-w-lg",lg:"max-w-2xl",xl:"max-w-4xl",full:"max-w-[calc(100vw-2rem)] max-h-[calc(100dvh-2rem)]"};function ti({open:e,onClose:t,title:a,size:n="md",className:r="",children:s}){return h.default.useEffect(()=>{if(!e)return;let i=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=i}},[e]),h.default.useEffect(()=>{if(!e)return;let i=o=>{o.key==="Escape"&&t?.()};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[e,t]),e?l`
    <!-- Backdrop -->
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      aria-modal="true"
      role="dialog"
    >
      <!-- Dim layer -->
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick=${t}
        aria-hidden="true"
      />

      <!-- Panel -->
      <div
        className=${K("relative z-10 w-full","bg-[var(--v2-card-bg)] border border-[var(--v2-panel-border)]","shadow-[0_24px_60px_rgba(0,0,0,0.35)]","rounded-[1.5rem]","flex flex-col max-h-[90dvh] overflow-hidden",T1[n]??T1.md,r)}
      >
        ${a?l`<${Zp} onClose=${t}>${a}<//>`:null}
        ${s}
      </div>
    </div>
  `:null}function Zp({children:e,onClose:t,className:a=""}){return l`
    <div
      className=${K("flex shrink-0 items-center justify-between gap-4","px-5 py-4 md:px-7 md:py-5","border-b border-[var(--v2-panel-border)]",a)}
    >
      <h2
        className="text-[1.1rem] font-semibold tracking-[-0.02em] text-[var(--v2-text-strong)] md:text-[1.2rem]"
      >
        ${e}
      </h2>
      ${t&&l`
          <button
            type="button"
            onClick=${t}
            aria-label="Close"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px]
              border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)]
              text-[var(--v2-text-muted)]
              hover:bg-[var(--v2-surface-muted)] hover:text-[var(--v2-text-strong)]"
          >
            <${M} name="close" className="h-4 w-4" />
          </button>
        `}
    </div>
  `}function ai({children:e,className:t=""}){return l`
    <div className=${K("flex-1 overflow-y-auto px-5 py-4 md:px-7 md:py-5",t)}>
      ${e}
    </div>
  `}function ni({children:e,className:t=""}){return l`
    <div
      className=${K("shrink-0 flex items-center justify-end gap-3 flex-wrap","px-5 py-4 md:px-7 md:py-5","border-t border-[var(--v2-panel-border)]",t)}
    >
      ${e}
    </div>
  `}var A1=1e5;function Cc({attachment:e,onClose:t}){let a=!!e,[n,r]=h.default.useState("loading"),[s,i]=h.default.useState({}),o=e?t$(e.mime_type):"download";if(h.default.useEffect(()=>{if(!e)return;if(r("loading"),i({}),!e.fetch_url&&e.preview_url){i({dataUrl:e.preview_url,downloadUrl:e.preview_url}),r("ready");return}if(!e.fetch_url){r("error");return}let c=!1,d=null;return ka(e.fetch_url).then(async m=>{d=URL.createObjectURL(m);let f={downloadUrl:d};if(o==="image"||o==="audio"||o==="video")f.dataUrl=await $p(m);else if(o==="pdf")f.frameUrl=d;else if(o==="text"){let p=await m.text();f.truncated=p.length>A1,f.text=f.truncated?p.slice(0,A1):p}if(c){URL.revokeObjectURL(d);return}i(f),r("ready")}).catch(()=>{c||r("error")}),()=>{c=!0,d&&URL.revokeObjectURL(d)}},[e,o]),!e)return null;let u=e.filename||"attachment";return l`
    <${ti} open=${a} onClose=${t} size="xl">
      <${Zp} onClose=${t}>
        <span className="block truncate">${u}</span>
      <//>
      <${ai} className="flex min-h-[12rem] items-center justify-center">
        ${n==="loading"&&l`<div className="text-sm text-iron-400">Loading…</div>`}
        ${n==="error"&&l`<div className="text-sm text-iron-400">Couldn't load this attachment.</div>`}
        ${n==="ready"&&l`<${rA} mode=${o} view=${s} filename=${u} />`}
      <//>
      <${ni}>
        ${s.downloadUrl&&l`<a
          href=${s.downloadUrl}
          download=${u}
          data-testid="attachment-download"
          className="v2-button inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-xs text-iron-200 hover:border-signal/35 hover:text-white"
        >
          <${M} name="download" className="h-3.5 w-3.5" />
          <span>Download</span>
        </a>`}
        <button
          type="button"
          onClick=${t}
          className="v2-button rounded-md border border-white/10 px-3 py-1.5 text-xs text-iron-200 hover:border-signal/35 hover:text-white"
        >
          Close
        </button>
      <//>
    <//>
  `}function rA({mode:e,view:t,filename:a}){switch(e){case"image":return l`<img
        src=${t.dataUrl}
        alt=${a}
        className="mx-auto max-h-[70vh] w-auto rounded object-contain"
      />`;case"audio":return l`<audio controls src=${t.dataUrl} className="w-full" />`;case"video":return l`<video controls src=${t.dataUrl} className="max-h-[70vh] w-full rounded" />`;case"pdf":return l`<iframe
        src=${t.frameUrl}
        title=${a}
        className="h-[70vh] w-full rounded border border-iron-700 bg-white"
      />`;case"text":return l`<div className="w-full">
        <pre
          className="max-h-[70vh] w-full overflow-auto whitespace-pre-wrap break-words rounded bg-iron-900/60 p-3 text-xs text-iron-200"
        >${t.text}</pre>
        ${t.truncated&&l`<div className="mt-2 text-xs text-iron-400">
          Preview truncated — download the file to see the rest.
        </div>`}
      </div>`;default:return l`<div className="flex flex-col items-center gap-2 text-iron-400">
        <${M} name="file" className="h-10 w-10 text-signal" />
        <div className="text-sm">This file type can't be previewed.</div>
      </div>`}}var sA=/\/workspace\/[A-Za-z0-9._\-/]+\.[A-Za-z0-9]+/g;function iA(e){return e.replace(/```[\s\S]*?```/g," ").replace(/`[^`]*`/g," ")}function D1(e){if(typeof e!="string"||!e)return[];let t=new Set,a=[];for(let n of iA(e).matchAll(sA)){let r=n[0];t.has(r)||(t.add(r),a.push(r))}return a}function M1(e){return e.split("/").filter(Boolean).pop()||e}function O1(e){if(typeof e!="number"||!Number.isFinite(e))return"";if(e<1024)return`${e} B`;let t=["KB","MB","GB"],a=e/1024,n=0;for(;a>=1024&&n<t.length-1;)a/=1024,n+=1;return`${a<10?a.toFixed(1):Math.round(a)} ${t[n]}`}function oA({threadId:e,path:t,onPreview:a}){let[n,r]=h.default.useState({mime_type:"",size_label:""});h.default.useEffect(()=>{let i=!0;return kx({threadId:e,path:t}).then(o=>{!i||!o?.stat||r({mime_type:o.stat.mime_type||"",size_label:O1(o.stat.size_bytes)})}).catch(()=>{}),()=>{i=!1}},[e,t]);let s={filename:M1(t),mime_type:n.mime_type,size_label:n.size_label,fetch_url:sc({threadId:e,path:t})};return l`<${kc}
    att=${s}
    onPreview=${a}
    testId="project-file-chip"
    dataPath=${t}
    downloadTestId="project-file-download"
  />`}function L1({threadId:e,content:t}){let a=h.default.useMemo(()=>D1(t),[t]),[n,r]=h.default.useState(null);return!e||a.length===0?null:l`
    <div className="mt-2 flex flex-col gap-1.5">
      ${a.map(s=>l`<${oA}
          key=${s}
          threadId=${e}
          path=${s}
          onPreview=${r}
        />`)}
      <${Cc}
        attachment=${n}
        onClose=${()=>r(null)}
      />
    </div>
  `}var P1={user:"ml-auto rounded-[18px] border border-signal/25 bg-signal/10 px-4 py-3 text-iron-100",assistant:"mr-auto px-1 text-iron-100",system:"mx-auto rounded-[18px] border border-copper/20 bg-copper/10 px-4 py-3 text-center text-copper",error:"mx-auto rounded-[18px] border border-red-400/20 bg-red-500/10 px-4 py-3 text-center text-red-200"};function lA(e){if(!e)return"";let t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}function uA({content:e}){let[t,a]=h.default.useState(!1);return e?l`
    <div className="flex flex-col items-start">
      <button
        type="button"
        onClick=${()=>a(n=>!n)}
        aria-expanded=${t?"true":"false"}
        className="v2-button inline-flex items-center gap-1.5 border-0 bg-transparent px-1 py-1 text-xs font-medium text-iron-400 hover:text-iron-200"
      >
        <${M} name="spark" className="h-3.5 w-3.5" />
        <span>${t?"Hide reasoning":"Reasoning"}</span>
        <${M}
          name="chevron"
          className=${["h-3 w-3",t?"rotate-180":""].join(" ")}
        />
      </button>
      ${t&&l`
        <div className="mt-1 border-l-2 border-white/10 pl-3 text-iron-300">
          <${oa} content=${e} className="text-[13px]" />
        </div>
      `}
    </div>
  `:null}function cA({message:e,onRetry:t,threadId:a}){let{role:n,content:r,images:s,attachments:i,generatedImages:o,isOptimistic:u,status:c,error:d,toolCalls:m,timestamp:f}=e,p=n==="user",[b,y]=h.default.useState(!1),[x,g]=h.default.useState(null),v=h.default.useCallback(async()=>{try{await navigator.clipboard.writeText(typeof r=="string"?r:""),y(!0),Js("Copied to clipboard",{tone:"success"}),setTimeout(()=>y(!1),1400)}catch{}},[r]);if(n==="tool_activity"||m&&m.length>0){let E=m&&m.length>0?{id:e.id,toolCalls:m}:e;return l`<${ei} activity=${E} />`}if(n==="thinking")return l`<${uA} content=${r} />`;if(n==="image")return l`
      <div className="flex">
        <div className="flex flex-wrap gap-2">
          ${(o||[]).map((O,j)=>O.data_url?l`<img key=${j} src=${O.data_url} className="max-h-64 rounded-lg border border-iron-700 object-cover" alt="Generated result" />`:l`
                  <div key=${j} className="rounded-lg border border-iron-700 bg-iron-900/70 px-4 py-3 text-sm text-iron-200">
                    <div>Generated image unavailable in history payload</div>
                    ${O.path&&l`<div className="mt-1 font-mono text-xs text-iron-300">${O.path}</div>`}
                  </div>
                `)}
        </div>
      </div>
    `;let $=lA(f),w=(n==="assistant"||n==="user")&&!u,R=p?"max-w-[85%]":n==="system"||n==="error"?"mx-auto max-w-[85%]":"w-full max-w-[85%]",C=p?"":"w-full min-w-0 max-w-full";return l`
    <div
      data-testid=${`msg-${n}`}
      className=${["group flex w-full min-w-0 flex-col",p?"items-end":"items-start"].join(" ")}
    >
      <div className=${["flex min-w-0 flex-col gap-2",R].join(" ")}>
        <div
          className=${["text-base leading-7",C,P1[n]||P1.assistant,u?"opacity-70":""].join(" ")}
        >
          ${n==="assistant"||n==="system"||n==="error"?l`<${oa} content=${r} />`:l`<div className="whitespace-pre-wrap">${r}</div>`}

          ${c==="error"&&l`
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-red-300">
              <span>${d}</span>
            </div>
          `}

          ${s&&s.length>0&&l`
            <div className="mt-2 flex flex-wrap gap-2">
              ${s.map((E,O)=>l`<img key=${O} src=${E} className="max-h-48 rounded-lg border border-iron-700 object-cover" alt="Message attachment" />`)}
            </div>
          `}

          ${i&&i.length>0&&l`
            <div className="mt-2 flex flex-col gap-1.5">
              ${i.map((E,O)=>l`<${kc}
                key=${E.id||O}
                att=${E}
                onPreview=${g}
              />`)}
            </div>
            <${Cc}
              attachment=${x}
              onClose=${()=>g(null)}
            />
          `}

          ${n==="assistant"&&l`<${L1}
            threadId=${a}
            content=${typeof r=="string"?r:""}
          />`}
        </div>

        ${(w||c==="error"||$)&&l`
          <div
            className=${["flex items-center gap-1.5 px-1 text-iron-400 opacity-0 group-hover:opacity-100 focus-within:opacity-100",p?"justify-end":"justify-start"].join(" ")}
          >
            ${w&&l`
              <button
                type="button"
                onClick=${v}
                aria-label="Copy message"
                className="v2-button inline-flex items-center gap-1 rounded-md border-0 bg-transparent px-1.5 py-1 text-[11px] hover:text-iron-100"
              >
                <${M} name=${b?"check":"copy"} className="h-3.5 w-3.5" />
                ${b?"Copied":"Copy"}
              </button>
            `}
            ${c==="error"&&t&&l`
              <button
                type="button"
                onClick=${()=>t(e)}
                aria-label="Retry message"
                className="v2-button inline-flex items-center gap-1 rounded-md border-0 bg-transparent px-1.5 py-1 text-[11px] text-red-300 hover:text-red-200"
              >
                <${M} name="retry" className="h-3.5 w-3.5" />
                Retry
              </button>
            `}
            ${$&&l`<span className="font-mono text-[10px] text-iron-500">${$}</span>`}
          </div>
        `}
      </div>
    </div>
  `}var j1=h.default.memo(cA);function I1(e){let t=dA(e),a=[];for(let n=0;n<t.length;n+=1){let r=t[n];if(H1(r)){let s=U1(t,n+1),i=t[n+1+s.length];if(s.length>0&&(!i||i.role==="user")){F1(a,s),z1(a,r),n+=s.length;continue}}if(Wp(r)){let s=U1(t,n);F1(a,s),n+=s.length-1;continue}z1(a,r)}return a}function dA(e){let t=new Map;for(let s=0;s<e.length;s+=1){let i=e[s],o=Ec(i);o&&H1(i)&&t.set(o,s)}if(t.size===0)return e;let a=new Map,n=new Set;for(let s=0;s<e.length;s+=1){let i=e[s];if(!Wp(i))continue;let o=Ec(i),u=o?t.get(o):void 0;if(u===void 0||u>=s)continue;let c=a.get(u)||[];c.push(i),a.set(u,c),n.add(s)}if(n.size===0)return e;let r=[];for(let s=0;s<e.length;s+=1){if(n.has(s))continue;let i=a.get(s);i&&r.push(...i),r.push(e[s])}return r}function U1(e,t){let a=t,n=Ec(e[t]);for(;a<e.length&&Wp(e[a])&&mA(n,e[a]);)a+=1;return e.slice(t,a)}function mA(e,t){let a=Ec(t);return!e||!a||a===e}function F1(e,t){if(t.length===0)return;let a=fA(t);e.push({type:"activity-run",id:`activity-run-${a[0].id}`,activity:a})}function z1(e,t){e.push({type:"message",id:t.id,message:t})}function H1(e){return e.role==="assistant"&&!K1(e)&&(e.isFinalReply===!0||(e.kind==="assistant"||e.kind==="assistant_message")&&e.status==="finalized")}function Wp(e){return e.role==="thinking"||e.role==="tool_activity"||K1(e)}function K1(e){return e?.toolCalls&&e.toolCalls.length>0}function Ec(e){return e?.turnRunId||null}function fA(e){return[...e].sort((t,a)=>t?.role!=="tool_activity"||a?.role!=="tool_activity"?0:pA(t,a))}function pA(e,t){if(Number.isFinite(e.activityOrder)&&Number.isFinite(t.activityOrder)){let n=e.activityOrder-t.activityOrder;if(n!==0)return n}let a=B1(q1(e.updatedAt||e.timestamp),q1(t.updatedAt||t.timestamp));return a!==0?a:B1(e.sequence,t.sequence)}function B1(e,t){let a=Number.isFinite(e)?e:null,n=Number.isFinite(t)?t:null;return a===null&&n===null?0:a===null?1:n===null?-1:a-n}function q1(e){if(!e)return null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Q1({messages:e,isLoading:t,hasMore:a,onLoadMore:n,onRetryMessage:r,threadId:s,pending:i=!1,children:o}){let u=k(),c=h.default.useRef(null),d=h.default.useRef(!0),[m,f]=h.default.useState(!0);h.default.useEffect(()=>{if(!c.current||!d.current)return;let g=window.requestAnimationFrame(()=>{let v=c.current;v&&(v.scrollTop=v.scrollHeight)});return()=>window.cancelAnimationFrame(g)},[e,i]);let p=h.default.useCallback(()=>{let x=c.current;if(!x)return;let g=100,v=x.scrollHeight-x.scrollTop-x.clientHeight;d.current=v<g,f(v<g),a&&x.scrollTop<g&&n&&!t&&n()},[a,n,t]),b=h.default.useCallback(()=>{let x=c.current;x&&(x.scrollTop=x.scrollHeight,d.current=!0,f(!0))},[]),y=h.default.useMemo(()=>I1(e),[e]);return l`
    <div className="relative flex min-h-0 min-w-0 flex-1">
    <div
      ref=${c}
      onScroll=${p}
      className="flex min-w-0 flex-1 overflow-y-auto px-4 pt-6 pb-14 sm:px-5 lg:px-8"
    >
      <div className="mx-auto flex w-full min-w-0 max-w-5xl flex-col gap-5">
        ${a&&l`
          <div className="text-center">
            <button
              onClick=${n}
              disabled=${t}
              className="v2-button rounded-md border border-white/10 px-3 py-1.5 text-xs text-iron-300 hover:border-signal/35 hover:text-white disabled:opacity-50"
            >
              ${u(t?"chat.history.loading":"chat.history.loadOlder")}
            </button>
          </div>
        `}
        ${y.map(x=>x.type==="activity-run"?l`<${k1} key=${x.id} activity=${x.activity} />`:l`<${j1}
                key=${x.id}
                message=${x.message}
                onRetry=${r}
                threadId=${s}
              />`)}
        ${o}
      </div>
    </div>
    ${!m&&l`
      <button
        type="button"
        onClick=${b}
        aria-label=${u("chat.jumpToLatest")}
        className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-[var(--v2-panel-border)] bg-[var(--v2-surface)] px-3 py-1.5 text-xs font-medium text-[var(--v2-text-strong)] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] hover:border-[color-mix(in_srgb,var(--v2-accent)_40%,var(--v2-panel-border))]"
      >
        <${M} name="arrowDown" className="h-3.5 w-3.5" />
        ${u("chat.jumpToLatest")}
      </button>
    `}
    </div>
  `}function V1({notice:e,onRecover:t}){return l`
    <div className="mx-auto flex max-w-xl flex-wrap items-center justify-center gap-3 rounded-lg border border-copper/30 bg-copper/10 px-4 py-3 text-sm text-copper">
      <span>${e.message}</span>
      ${e.status!=="loading"&&l`
        <button
          type="button"
          onClick=${t}
          className="rounded-md border border-copper/40 px-2.5 py-1 text-xs font-medium hover:bg-copper/10"
        >
          Reload history
        </button>
      `}
    </div>
  `}function G1({suggestions:e,onSelect:t}){return!e||e.length===0?null:l`
    <div className="px-4 pb-3 sm:px-5 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-wrap gap-2">
        ${e.map(a=>l`
            <button
              key=${a}
              onClick=${()=>t(a)}
              className="v2-button rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-iron-100 hover:border-signal/40 hover:text-signal"
            >
              ${a}
            </button>
          `)}
      </div>
    </div>
  `}function Y1(){return l`
    <div className="flex flex-col items-start">
      <div className="flex min-w-0 max-w-[85%] flex-col gap-2">
        <div
          className="w-fit rounded-[18px] border border-white/10 bg-iron-800/60 px-4 py-3"
        >
          <div className="flex gap-1">
            <span className="v2-typing-dot h-2 w-2 rounded-full bg-iron-200" />
            <span className="v2-typing-dot h-2 w-2 rounded-full bg-iron-200" />
            <span className="v2-typing-dot h-2 w-2 rounded-full bg-iron-200" />
          </div>
        </div>
      </div>
    </div>
  `}function Tc(){return Z("/api/webchat/v2/channels/connectable")}function J1(e,t){if(!eh(e))return null;let a=Ac(e),n=yA(a),r=null;for(let s of t||[]){if(!gA(s))continue;let i=bA(a,s,{commandAliasesOnly:n});i>(r?.matchLength||0)&&(r={channel:s,matchLength:i})}return r?.channel||null}function eh(e){let t=Ac(e);if(!t)return!1;let a=/(^|\s)(connect|link|pair|setup|set up)(\s|$)/.test(t),n=/(^|\s)(account|channel|app|integration|slack|telegram|whatsapp)(\s|$)/.test(t);return a&&n}function hA(e){return[e?.channel,e?.display_name,...Array.isArray(e?.command_aliases)?e.command_aliases:[]].filter(Boolean)}function vA(e,t={}){let a=Array.isArray(e?.command_aliases)?e.command_aliases.filter(Boolean):[];return t.channelManagementOnly?a.filter(n=>X1(Ac(n))):a}function gA(e){return e?.strategy!=="admin_managed_channels"}function yA(e){return Z1(e,"slack")&&X1(e)}function X1(e){return/(^|\s)(channel|channels|allowlist)(\s|$)/.test(e)}function Ac(e){return String(e||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ")}function bA(e,t,a={}){return(a.commandAliasesOnly?vA(t,{channelManagementOnly:!0}):hA(t)).reduce((r,s)=>{let i=Ac(s);return Z1(e,i)?Math.max(r,i.length):r},0)}function Z1(e,t){return t?` ${e} `.includes(` ${t} `):!1}function W1(e,t){if(!t)return null;if(e==="gate"){let a=t.approval_context||null,n=a?xA(a):[],r={kind:"gate",runId:t.turn_run_id,gateRef:t.gate_ref,invocationId:t.invocation_id||null,headline:t.headline,body:t.body,allowAlways:t.allow_always===!0};return a?{...r,toolName:a.tool_name||null,description:a.reason||t.body,actionLabel:a.action?.label||null,destination:a.destination||null,approvalScope:a.scope||null,approvalDetails:n,parameters:n.length?n.map(s=>`${s.label}: ${s.value}`).join(`
`):null}:r}return e==="auth_required"?{kind:"auth_required",challengeKind:t.challenge_kind||(t.provider||t.account_label||t.authorization_url||t.expires_at?"other":"manual_token"),runId:t.turn_run_id,gateRef:t.auth_request_ref,provider:t.provider||null,accountLabel:t.account_label||"",authorizationUrl:t.authorization_url||null,expiresAt:t.expires_at||null,headline:t.headline,body:t.body}:null}function xA(e){let t=[];e.action?.label&&t.push({label:"Action",value:e.action.label}),e.destination?.label&&t.push({label:"Destination",value:e.destination.label}),e.scope?.label&&t.push({label:"Scope",value:e.scope.label});for(let a of e.details||[])!a?.label||a.value==null||t.push({label:a.label,value:String(a.value)});return t}function e2({status:e,failureCategory:t,failureSummary:a}){return typeof a=="string"&&a.trim()?a.trim():typeof t=="string"&&t.trim()?`The run failed: ${t.trim().replaceAll("_"," ")}.`:e==="recovery_required"?"The run is awaiting recovery \u2014 backend reported `recovery_required`.":"The run failed before producing a reply."}function t2(){return{terminalByInvocation:new Map}}function a2(e){e?.current?.terminalByInvocation?.clear()}function n2(e,t,a){let n=s2(t,{toolStatus:"running"});n&&ri(e,n,a,{matchGate:!0})}function r2(e,t,a,n="authorization"){let r=s2(t,{toolStatus:"error",toolError:n});r&&ri(e,r,a,{matchGate:!0})}function ri(e,t,a,n={}){if(!t)return;let r=RA(t);r=_A(r,a),e(s=>{let i=i2(r),o=$A(s,r,i,n);if(o>=0){let c=[...s];return c[o]=SA(c[o],r),th(c[o],a),c}let u={id:i,role:"tool_activity",...r};return th(u,a),[...s,u]})}function s2(e,t={}){if(!e?.runId||!e?.gateRef||e.kind!=="gate"||!e.toolName)return null;let a=e.invocationId||`gate:${e.runId}:${e.gateRef}`;return{invocationId:a,callId:a,capabilityId:e.toolName,toolName:Ur(e.toolName)||e.toolName,toolStatus:t.toolStatus||"running",toolDetail:null,toolParameters:null,toolResultPreview:null,toolError:t.toolError||null,toolDurationMs:null,updatedAt:t.updatedAt||new Date().toISOString(),resultRef:null,truncated:!1,outputBytes:null,outputKind:null,turnRunId:e.runId,gateRef:e.gateRef,gateActivity:!0}}function i2(e){return`tool-${e.invocationId}`}function $A(e,t,a,n){let r=e.findIndex(i=>i?.id===a);if(r>=0)return r;let s=t.gateRef||null;if(s){let i=e.findIndex(o=>o?.role==="tool_activity"&&o.turnRunId===t.turnRunId&&o.gateRef===s);if(i>=0)return i}if(!n.matchGate&&!t.gateActivity){let i=e.findIndex(o=>wA(o,t));if(i>=0)return i}if(n.matchGate||t.gateActivity){let i=e.findIndex(o=>o?.role==="tool_activity"&&!o.gateRef&&o.gateActivity!==!0&&!Gs(o.toolStatus)&&o.turnRunId===t.turnRunId&&o2(o.toolName,t.toolName));if(i>=0)return i}return-1}function wA(e,t){return e?.role==="tool_activity"&&e.gateActivity===!0&&e.turnRunId===t.turnRunId&&o2(e.toolName,t.toolName)}function SA(e,t){let a=Gs(e.toolStatus),n=Gs(t.toolStatus),r=a&&!n,s={...e,...t,id:e.id,role:"tool_activity",invocationId:e.gateActivity&&!t.gateActivity?t.invocationId:e.invocationId||t.invocationId,callId:e.gateActivity&&!t.gateActivity?t.callId:e.callId||t.callId,toolName:t.toolName||e.toolName,toolStatus:r?e.toolStatus:t.toolStatus,toolError:t.toolError||e.toolError,updatedAt:r?e.updatedAt||t.updatedAt:t.updatedAt||e.updatedAt,turnRunId:t.turnRunId||e.turnRunId||null,gateRef:t.gateRef||e.gateRef||null,gateActivity:e.gateActivity&&t.gateActivity,capabilityId:t.capabilityId||e.capabilityId||null,activityOrder:NA(e,t),activityOrderSource:t.activityOrderSource||e.activityOrderSource||null};return e.gateActivity&&!t.gateActivity&&(s.id=i2(t),s.gateActivity=!1),s}function NA(e,t){return Number.isFinite(t.activityOrder)?t.activityOrder:e.activityOrder}function _A(e,t){if(!e?.invocationId)return e;if(Gs(e.toolStatus))return th(e,t),e;let a=t?.current?.terminalByInvocation?.get(e.invocationId);return a?Number.isFinite(e.activityOrder)?{...a,activityOrder:e.activityOrder,activityOrderSource:e.activityOrderSource||a.activityOrderSource||null}:a:e}function th(e,t){!e?.invocationId||!Gs(e.toolStatus)||t?.current?.terminalByInvocation?.set(e.invocationId,e)}function o2(e,t){return!e||!t?!1:Ur(e)===Ur(t)}function RA(e){let t=Ur(e.toolName||e.capabilityId);return{...e,toolName:t||e.toolName||"tool"}}function d2({threadId:e,setMessages:t,setIsProcessing:a,setPendingGate:n,setActiveRun:r,activeRunRef:s,locallyResolvedGatesRef:i,toolActivityStateRef:o,onRunSettled:u}){let c=h.default.useRef(new Set),d=h.default.useRef(null),m=h.default.useRef(null);return h.default.useCallback(f=>{let{type:p,frame:b}=f||{};if(!(!p||!b))switch(p){case"accepted":{let y=b.ack||{};y.run_id&&(d.current=y.run_id),r?.({runId:y.run_id||null,threadId:y.thread_id||e,status:y.status||null}),a(!0);return}case"running":case"capability_progress":{let y=b.progress||{};y.turn_run_id&&(d.current=y.turn_run_id,r?.(x=>x&&x.runId===y.turn_run_id?x:{runId:y.turn_run_id,threadId:e,status:"running"}),CA(n,y.turn_run_id,m)),a(!0);return}case"capability_activity":{let y=b.activity;if(!y||!y.invocation_id)return;ri(t,Cp(y),o);return}case"capability_display_preview":{let y=b.preview;if(!y||!y.invocation_id)return;let x=kp(y);ri(t,x,o);return}case"gate":case"auth_required":{let y=W1(p,b.prompt);y&&(n2(t,y,o),n(y),r?.({runId:y.runId,threadId:e,status:"awaiting_gate"})),a(!1);return}case"final_reply":{let y=b.reply||{};t(x=>[...x,{id:`reply-${y.turn_run_id||Date.now()}`,role:"assistant",content:y.text||"",timestamp:y.generated_at||new Date().toISOString(),turnRunId:y.turn_run_id,isFinalReply:!0}]),n(null),a(!1);return}case"cancelled":{let y=b.run_state?.run_id||s?.current?.runId||null;n(null),a(!1),r?.(null),Dc(c,u,y,!1);return}case"failed":{let y=b.run_state||{},x=y.run_id||s?.current?.runId||null;n(null),a(!1),r?.(null),rh(t,{runId:x,status:y.status||"failed",failureCategory:AA(y),failureSummary:null}),Dc(c,u,x,!1);return}case"projection_snapshot":case"projection_update":{let y=b.state?.items||[];EA({items:y,threadId:e,setMessages:t,setIsProcessing:a,setPendingGate:n,setActiveRun:r,onRunSettled:u,settledRunsRef:c,latestRunIdRef:d,promptRunIdRef:m,activeRunRef:s,locallyResolvedGatesRef:i,toolActivityStateRef:o});return}case"keep_alive":default:return}},[e,t,a,n,r,s,i,o,u])}function Dc(e,t,a,n){!t||!a||!e?.current||e.current.has(a)||(e.current.add(a),t(a,{success:n}))}var kA=new Set(["completed","succeeded","failed","cancelled","recovery_required"]),l2=new Set(["completed","succeeded"]),ah=new Set(["blocked_auth","blocked_approval","blocked_resource"]);function u2(e,t,a){t&&(a?.current===t&&(a.current=null),e(n=>n?.runId===t?null:n))}function CA(e,t,a){t&&e(n=>n?.runId!==t||n.kind==="auth_required"?n:(a?.current===t&&(a.current=null),null))}function EA({items:e,threadId:t,setMessages:a,setIsProcessing:n,setPendingGate:r,setActiveRun:s,onRunSettled:i,settledRunsRef:o,latestRunIdRef:u,promptRunIdRef:c,activeRunRef:d,locallyResolvedGatesRef:m,toolActivityStateRef:f}){let p=u?.current??null;for(let b of e){if(b.run_status){let{run_id:y,status:x,failure_category:g,failure_summary:v}=b.run_status,$=kA.has(x),w=d?.current?.source==="local"?d.current.runId:null,S=!!(y&&w&&w!==y),R=p??u?.current??null,C=!!($&&y&&R&&R!==y),E=y&&ah.has(x)?c2(m,y):null;if(S)continue;if(C){c2(m,d?.current?.runId)?.outcome==="resumed"&&(TA({runId:y,activePromptRunId:d?.current?.runId,success:l2.has(x),status:x,failureCategory:g,failureSummary:v,setMessages:a,setIsProcessing:n,setPendingGate:r,setActiveRun:s,onRunSettled:i,settledRunsRef:o,latestRunIdRef:u,promptRunIdRef:c,locallyResolvedGatesRef:m}),p=null);continue}if(E){u2(r,y,c),E.outcome==="resumed"?(n(!0),s?.(O=>O&&O.runId===y?{...O,status:O.status==="awaiting_gate"?"queued":O.status||"queued"}:{runId:y,threadId:t,status:"queued"}),p=y,u&&(u.current=y)):(n(!1),d?.current?.runId===y&&s?.(null),p=null,u?.current===y&&(u.current=null));continue}y&&(p=y,!$&&u&&(u.current=y),s?.(O=>O&&O.runId===y?{...O,status:x}:{runId:y,threadId:t,status:x})),y&&ah.has(x)?c&&(c.current=y):y&&c?.current===y&&(c.current=null),$?(n(!1),r(null),s?.(null),nh(m,y),p=null,u&&(u.current=null),y&&c?.current===y&&(c.current=null),Dc(o,i,y,l2.has(x)),(x==="failed"||x==="recovery_required")&&rh(a,{runId:y,status:x,failureCategory:g,failureSummary:v})):ah.has(x)||(u2(r,y,c),nh(m,y),n(!0))}if(b.text){let y=`text-${b.text.id}`;a(x=>{let g=x.findIndex($=>$.id===y),v={id:y,role:"assistant",content:b.text.body||"",timestamp:new Date().toISOString(),isFinalReply:!0};if(g>=0){let $=[...x];return $[g]=v,$}return[...x,v]}),n(!1)}if(b.thinking){let y=`thinking-${b.thinking.id}`;a(x=>{let g=x.findIndex($=>$.id===y),v={id:y,role:"thinking",content:b.thinking.body||"",timestamp:new Date().toISOString(),turnRunId:b.thinking.run_id||null};if(g>=0){let $=[...x];return $[g]=v,$}return[...x,v]})}if(b.capability_activity){let y=b.capability_activity;y.invocation_id&&ri(a,Cp(y),f)}if(b.gate&&p&&c?.current===p&&!MA(m,p,b.gate.gate_ref)&&(r(y=>y||{kind:"gate",runId:p,gateRef:b.gate.gate_ref,headline:b.gate.headline,body:"",allowAlways:b.gate.allow_always===!0}),n(!1)),b.skill_activation){let{id:y,skill_names:x=[],feedback:g=[]}=b.skill_activation;if(x.length||g.length){let v=`skill-${y||x.join("-")||"activation"}`,$=[x.length?`Skill activated: ${x.join(", ")}`:"",...g].filter(Boolean).join(`
`);a(w=>w.some(S=>S.id===v)?w:[...w,{id:v,role:"system",content:$,timestamp:new Date().toISOString()}])}}}u&&p&&(u.current=p)}function TA({runId:e,activePromptRunId:t,success:a,status:n,failureCategory:r,failureSummary:s,setMessages:i,setIsProcessing:o,setPendingGate:u,setActiveRun:c,onRunSettled:d,settledRunsRef:m,latestRunIdRef:f,promptRunIdRef:p,locallyResolvedGatesRef:b}){o(!1),u(null),c?.(null),nh(b,t),f&&(f.current=null),p?.current===t&&(p.current=null),Dc(m,d,e,a),(n==="failed"||n==="recovery_required")&&rh(i,{runId:e,status:n,failureCategory:r,failureSummary:s})}function AA(e){let t=e?.failure;return typeof t=="string"&&t.trim()?t.trim():t&&typeof t=="object"&&typeof t.category=="string"&&t.category.trim()?t.category.trim():null}function rh(e,{runId:t,status:a,failureCategory:n,failureSummary:r}){let s=`err-${t||"unknown"}`;e(i=>{let o=i.findIndex(c=>c.id===s),u=e2({status:a,failureCategory:n,failureSummary:r});if(o>=0){if(!r||i[o].content===u)return i;let c=[...i];return c[o]={...c[o],content:u},c}return[...i,{id:s,role:"error",content:u,timestamp:new Date().toISOString()}]})}function c2(e,t){if(!t)return null;let a=e?.current;if(!a)return null;for(let[n,r]of a.entries())if(n.startsWith(`${t}
`))return DA(r);return null}function DA(e){return e&&typeof e=="object"?{resolution:e.resolution||null,outcome:e.outcome||null}:{resolution:e||null,outcome:null}}function nh(e,t){if(!t)return;let a=e?.current;if(a)for(let n of Array.from(a.keys()))n.startsWith(`${t}
`)&&a.delete(n)}function MA(e,t,a){return!t||!a?!1:!!e?.current?.has(`${t}
${a}`)}function m2(e,t,a){let n=e.get(t)||[];e.set(t,[...n,a])}function f2(e,t,a){let n=(e.get(t)||[]).filter(r=>r.id!==a);n.length>0?e.set(t,n):e.delete(t)}function p2(e,t,a,n){let r=LA(n);return r?(OA(e,t,a,{timelineMessageId:r}),r):null}function OA(e,t,a,n){let s=(e.get(t)||[]).map(i=>i.id===a?{...i,...n}:i);s.length>0&&e.set(t,s)}function LA(e){return typeof e!="string"?null:e.startsWith("msg:")?e.slice(4):null}var PA=["accepted","running","capability_progress","capability_activity","capability_display_preview","gate","auth_required","final_reply","cancelled","failed","projection_snapshot","projection_update","keep_alive","error"];function h2({threadId:e,onEvent:t,enabled:a}){let[n,r]=h.default.useState("idle"),s=h.default.useRef(t);s.current=t;let i=h.default.useRef(null);return h.default.useEffect(()=>{if(!a||!e){r("idle");return}i.current=null;let o=null,u=null,c=0,d=3e4;function m(){if(document.visibilityState==="hidden"){r("paused");return}r(c>0?"reconnecting":"connecting"),o=Fx({threadId:e,afterCursor:i.current||void 0}),o.onopen=()=>{c=0,r("connected")},o.onerror=()=>{o&&o.close(),r("disconnected"),c++;let y=Math.min(1e3*2**c,d);u=setTimeout(m,y)};let b=(y,x)=>{let g=null;try{g=JSON.parse(y.data)}catch{return}!g||typeof g!="object"||(y.lastEventId&&(i.current=y.lastEventId),s.current?.({type:g.type||x,frame:g,lastEventId:y.lastEventId||null}))};o.onmessage=y=>b(y,"message");for(let y of PA)o.addEventListener(y,x=>b(x,y))}function f(){u&&(clearTimeout(u),u=null),o&&(o.close(),o=null),r("paused")}function p(){document.visibilityState==="hidden"?f():o||m()}return m(),document.addEventListener("visibilitychange",p),()=>{document.removeEventListener("visibilitychange",p),u&&clearTimeout(u),o&&o.close()}},[a,e]),{status:n}}var jA=3e4,UA="credential_stored_gate_resolution_failed",FA="ironclaw-product-auth",sh="ironclaw:product-auth:oauth-complete",zA="ironclaw:product-auth:oauth-complete";async function v2(e){let t=new AbortController,a=setTimeout(()=>t.abort(),jA);try{return await e(t.signal)}finally{clearTimeout(a)}}function BA(e){let t=new Error("auth gate resolution failed after credential storage");return t.safeAuthGateCode=UA,t.cause=e,t}function qA(e){let a=At.getQueryData?.(["threads"])?.threads;return Array.isArray(a)?!a.find(r=>r.thread_id===e||r.id===e)?.title:!0}function IA(e){return e?.continuation?.type==="turn_gate_resume"}function HA(e){if(e?.outcome)return e.outcome;let t=String(e?.status||"").toLowerCase();return t==="queued"||t==="running"?"resumed":t==="cancelled"||e?.already_terminal===!0?"cancelled":e?.already_terminal===!1?"resumed":null}function g2(e){return e?.kind==="auth_required"&&e?.challengeKind==="oauth_url"}function KA(e){return e?.type===zA&&e?.status==="completed"}function QA(e,t,a){if(!KA(e))return!1;let n=e?.continuation;return!n||n.type!=="turn_gate_resume"?Number(e?.completedAt||0)>=a:!(n.turn_run_ref&&n.turn_run_ref!==t?.runId||n.gate_ref&&n.gate_ref!==t?.gateRef)}function ih(e){if(!e)return null;try{return JSON.parse(e)}catch{return null}}async function VA(e){if(!eh(e))return null;try{let a=(await At.fetchQuery({queryKey:["connectable-channels"],queryFn:Tc}))?.channels||[];return J1(e,a)}catch(t){return console.error("Failed to resolve connectable channels:",t),null}}function y2(e){let t=h.default.useRef(new Map),a=h.default.useRef(1),[n,r]=h.default.useState(0),[s,i]=h.default.useState(Date.now()),[o,u]=h.default.useState(null),c=h.default.useRef(o),d=h.default.useCallback(me=>{let se=typeof me=="function"?me(c.current):me;c.current=se,u(se)},[]);h.default.useEffect(()=>{c.current=o},[o]);let[m,f]=h.default.useState(null),p=h.default.useCallback(()=>t.current.get(e||"__new__")||[],[e]),b=h.default.useCallback(me=>{let se=e||"__new__";me.length>0?t.current.set(se,me):t.current.delete(se)},[e]),{messages:y,hasMore:x,nextCursor:g,isLoading:v,loadError:$,loadHistory:w,setMessages:S}=d$(e,{getPendingMessages:p,setPendingMessages:b}),[R,C]=h.default.useState(!1),[E,O]=h.default.useState(null),[j,J]=h.default.useState(e),D=h.default.useRef(t2()),B=h.default.useRef(new Map),V=h.default.useRef({gateKey:null,credentialRef:null,inFlight:!1});j!==e&&(J(e),C(!1),O(null),u(null),f(null)),h.default.useEffect(()=>{a2(D),B.current.clear()},[e]);let I=Math.max(0,Math.ceil((n-s)/1e3)),re=E?.runId&&E?.gateRef?`${E.runId}
${E.gateRef}`:null;h.default.useEffect(()=>{if(!n)return;let me=setInterval(()=>i(Date.now()),250);return()=>clearInterval(me)},[n]),h.default.useEffect(()=>{V.current.gateKey!==re&&(V.current={gateKey:re,credentialRef:null,inFlight:!1})},[re]),h.default.useEffect(()=>{if(!g2(E))return;let me=Date.now(),se=Pe=>{QA(Pe,E,me)&&(O(Te=>g2(Te)?null:Te),C(!0))},Oe=null;typeof window.BroadcastChannel=="function"&&(Oe=new window.BroadcastChannel(FA),Oe.onmessage=Pe=>se(Pe.data));let Ne=Pe=>{Pe.key===sh&&se(ih(Pe.newValue))};window.addEventListener("storage",Ne),se(ih(window.localStorage?.getItem?.(sh)));let Ve=window.setInterval(()=>{se(ih(window.localStorage?.getItem?.(sh)))},500);return()=>{window.clearInterval(Ve),Oe&&Oe.close(),window.removeEventListener("storage",Ne)}},[E]);let xe=d2({threadId:e,setMessages:S,setIsProcessing:C,setPendingGate:O,setActiveRun:d,activeRunRef:c,locallyResolvedGatesRef:B,toolActivityStateRef:D,onRunSettled:(me,{success:se})=>{se&&b([]),w(void 0,{preserveClientOnly:!0})}}),{status:Qe}=h2({threadId:e,onEvent:xe,enabled:!!e}),ut=h.default.useCallback(async(me,se={})=>{let{threadId:Oe,attachments:Ne=[]}=se,Ve=Ne.map(n$),Pe=Ne.map(r$);if(Ne.length===0){let he=await VA(me);if(he)return f(he),{channel_connect_action:he}}f(null);let Te=Oe||e;if(!Te){let he=await rc();if(At.invalidateQueries({queryKey:["threads"]}),Te=he?.thread?.thread_id,!Te)throw new Error("createThread returned no thread_id")}let jt=Te,vt={id:`pending-${a.current++}`,role:"user",content:me,attachments:Pe,timestamp:new Date().toISOString(),isOptimistic:!0};m2(t.current,jt,vt);let Ut=vt.id;S(he=>[...he,{id:Ut,role:"user",content:me,attachments:Pe,timestamp:vt.timestamp,isOptimistic:!0}]),C(!0),O(null);try{let he=await Px({threadId:Te,content:me,attachments:Ve});qA(Te)&&At.invalidateQueries({queryKey:["threads"]}),he?.run_id&&d({runId:he.run_id,threadId:he.thread_id||Te,status:he.status||null,source:"local"});let te=p2(t.current,jt,Ut,he?.accepted_message_ref);return te&&S($e=>$e.map(ct=>ct.id===Ut?{...ct,timelineMessageId:te}:ct)),he?.outcome==="rejected_busy"&&(S($e=>$e.map(ct=>ct.id===Ut?{...ct,isOptimistic:!1,status:"error"}:ct)),he?.notice&&S($e=>[...$e,{id:`system-rejected-${a.current++}`,role:"system",content:he.notice,timestamp:new Date().toISOString(),isOptimistic:!1}]),C(!1)),he}catch(he){throw he.status===429&&r(Date.now()+GA(he)),S(te=>te.map($e=>$e.id===Ut?{...$e,isOptimistic:!1,status:"error",error:he.message}:$e)),C(!1),he}finally{f2(t.current,jt,Ut)}},[e,S]),Ot=h.default.useCallback(async(me,se={})=>{if(!E)return;let{runId:Oe,gateRef:Ne}=E;if(!Oe||!Ne)throw new Error("resolveGate requires a pending gate with run_id and gate_ref");let Ve=await wp({threadId:e,runId:Oe,gateRef:Ne,resolution:me,always:se.always,credentialRef:se.credentialRef}),Pe=HA(Ve);if(B.current.set(`${Oe}
${Ne}`,{resolution:me,outcome:Pe}),me==="denied"&&Pe==="resumed"&&r2(S,E,D),O(null),Pe==="resumed"){C(!0),d({runId:Ve?.run_id||Oe,threadId:Ve?.thread_id||e,status:Ve?.status||"queued"});return}C(!1),d(null)},[E,e,S,d]),Lt=h.default.useCallback(async me=>{if(!E)throw new Error("auth gate is no longer pending");let{runId:se,gateRef:Oe,provider:Ne}=E;if(!se||!Oe||!Ne)throw new Error("auth gate is missing required credential metadata");let Ve=E.accountLabel||`${Ne} credential`,Pe=`${se}
${Oe}`;if(V.current.gateKey!==Pe&&(V.current={gateKey:Pe,credentialRef:null,inFlight:!1}),V.current.inFlight)throw new Error("auth token submission already in progress");V.current.inFlight=!0;try{let Te=V.current.credentialRef,jt=null;if(!Te){if(jt=await v2(vt=>Bx({provider:Ne,accountLabel:Ve,token:me,threadId:e,runId:se,gateRef:Oe,signal:vt})),Te=jt?.credential_ref,!Te)throw new Error("manual token submit returned no credential_ref");V.current.credentialRef=Te}if(!IA(jt))try{await v2(vt=>wp({threadId:e,runId:se,gateRef:Oe,resolution:"credential_provided",credentialRef:Te,signal:vt}))}catch(vt){throw BA(vt)}V.current={gateKey:null,credentialRef:null,inFlight:!1},O(null),C(!0)}catch(Te){throw V.current.gateKey===Pe&&(V.current.inFlight=!1),Te}},[E,e]),Ja=h.default.useCallback(async me=>{let se=o?.runId;!se||!e||(O(null),C(!1),d(null),await zx({threadId:e,runId:se,reason:me}))},[o,e]),$a=h.default.useCallback(()=>{x&&g&&w(g)},[x,g,w]),$t=h.default.useCallback(async(me,se,Oe)=>{let Ne="approved",Ve=!1;se==="deny"?Ne="denied":se==="cancel"?Ne="cancelled":se==="always"&&(Ne="approved",Ve=!0),await Ot(Ne,{always:Ve})},[Ot]),Pt=h.default.useCallback(()=>{},[]);return{messages:y,isProcessing:R,pendingGate:E,channelConnectAction:m,activeRun:o,sseStatus:Qe,historyLoading:v,historyLoadError:$,hasMore:x,cooldownSeconds:I,send:ut,resolveGate:Ot,submitAuthToken:Lt,cancelRun:Ja,loadMore:$a,dismissChannelConnectAction:()=>f(null),suggestions:[],setSuggestions:Pt,retryMessage:Pt,approve:$t,recoverHistory:Pt,recoveryNotice:null}}function GA(e){let t=e.headers?.get?.("Retry-After"),a=Number(t);return Number.isFinite(a)&&a>0?a*1e3:2e3}function b2({gatewayStatus:e,activeThread:t}){let a=t?.turn_count||0,n=e?.total_connections,r=e?.engine_v2_enabled===!1?"Engine v1":"Engine v2";return{mode:"Auto-review",runtime:"Work locally",workspace:"ironclaw",model:e?.llm_model,backend:e?.llm_backend,threadLabel:t?.title||"New thread",turnCountLabel:`${a} ${a===1?"turn":"turns"}`,engineLabel:r,connectionLabel:typeof n=="number"?`${n} live ${n===1?"connection":"connections"}`:null}}var YA=1500;function JA(e,t){let a=zr(e,t).trim(),n={adapter:e.adapter,base_url:er(e,t).trim()||e.base_url||"",provider_id:String(e.id||"").trim(),provider_type:e.builtin?"builtin":"custom"};return a&&(n.model=a),n}function x2({threads:e,activeThreadId:t,onSelectThread:a,isCreatingThread:n,composerDraft:r="",composerResetKey:s="",gatewayStatus:i}){let{messages:o,isProcessing:u,pendingGate:c,channelConnectAction:d,suggestions:m,sseStatus:f,historyLoading:p,historyLoadError:b,hasMore:y,cooldownSeconds:x,recoveryNotice:g,activeRun:v,send:$,cancelRun:w,retryMessage:S,approve:R,recoverHistory:C,loadMore:E,setSuggestions:O,submitAuthToken:j,dismissChannelConnectAction:J}=y2(t),D=h.default.useMemo(()=>e.find(_=>_.id===t)||null,[e,t]),B=tr({settings:{},gatewayStatus:i,enabled:!0}),[V,I]=h.default.useState({}),[re,xe]=h.default.useState(""),[Qe,ut]=h.default.useState(!1),Ot=h.default.useMemo(()=>(B.providers||[]).filter(_=>yn(_,B.builtinOverrides)),[B.providers,B.builtinOverrides]),Lt=h.default.useMemo(()=>{let _=Ot.filter(U=>String(U.adapter||"").trim().toLowerCase()==="ollama");if(_.length>0)return _;let A=String(B.activeProviderId||"").trim();return A?Ot.filter(U=>String(U.id||"").trim()===A):[]},[Ot,B.activeProviderId]);h.default.useEffect(()=>{let _=new Set(Lt.map(A=>String(A.id||"").trim()).filter(Boolean));I(A=>{let U={};for(let[F,P]of Object.entries(A||{}))_.has(F)&&(U[F]=P);return U})},[Lt]);let Ja=h.default.useCallback(async({silent:_=!1}={})=>{if(Lt.length===0){I({}),_||xe("No configured providers available for model detection.");return}ut(!0),_||xe("");let A={},U=0,F=0;await Promise.all(Lt.map(async P=>{try{let G=await B.listModels(JA(P,B.builtinOverrides));if(!G?.ok||!Array.isArray(G.models))return;let fe=Array.from(new Set(G.models.map(_e=>String(_e||"").trim()).filter(Boolean)));if(fe.length===0)return;A[P.id]=fe,U+=1,F+=fe.length}catch{}})),I(P=>({...P,...A})),_||(U>0?xe(`Detected ${F} model${F===1?"":"s"} from ${U} provider${U===1?"":"s"}.`):xe("No models detected. Verify provider credentials and connectivity.")),ut(!1)},[Lt,B]),$a=h.default.useRef(!1);h.default.useEffect(()=>{$a.current||B.isLoading||($a.current=!0,Ja({silent:!0}))},[Ja,B.isLoading]);let $t=h.default.useMemo(()=>{let _=[];for(let A of Lt){let U=String(A.id||"").trim();if(!U)continue;let F=V[U]||[];if(F.length>0){for(let G of F)_.push({key:`${U}::${G}`,label:`${U} / ${G}`,providerId:U,model:G});continue}let P=zr(A,B.builtinOverrides);P&&_.push({key:`${U}::${P}`,label:`${U} / ${P}`,providerId:U,model:P})}return _},[Lt,V,B.builtinOverrides]),[Pt,me]=h.default.useState("");h.default.useEffect(()=>{if($t.length===0){me("");return}if($t.some(U=>U.key===Pt))return;let _=`${B.activeProviderId||""}::${B.selectedModel||""}`,A=$t.find(U=>U.key===_)||$t[0];me(A.key)},[$t,Pt,B.activeProviderId,B.selectedModel]);let se=h.default.useMemo(()=>$t.find(_=>_.key===Pt)||null,[$t,Pt]),Oe=l`
    <div className="mb-3 space-y-2">
      <div className="flex flex-wrap items-center gap-2 text-left text-xs font-medium uppercase tracking-[0.12em] text-iron-300">
        <span>Model For New Conversation</span>
        <div className="ml-auto flex min-w-[260px] items-center gap-2">
          <select
            value=${Pt}
            onChange=${_=>me(_.target.value)}
            className="v2-select h-8 min-w-0 flex-1 rounded-[8px] px-2.5 py-0 text-xs normal-case tracking-normal"
            disabled=${$t.length===0}
          >
            ${$t.length===0?l`<option value="">No detected models</option>`:$t.map(_=>l`
                    <option key=${_.key} value=${_.key}>${_.label}</option>
                  `)}
          </select>
          <button
            type="button"
            className="h-8 rounded-[8px] border border-[var(--v2-panel-border)] px-3 text-xs normal-case tracking-normal text-[var(--v2-text-muted)] hover:bg-[var(--v2-surface-muted)] hover:text-[var(--v2-text-strong)]"
            onClick=${()=>Ja({silent:!1})}
            disabled=${Qe}
          >
            ${Qe?"Detecting...":"Detect Models"}
          </button>
        </div>
      </div>
      ${re?l`
            <p className="text-[11px] text-[var(--v2-text-muted)]">${re}</p>
          `:null}
    </div>
  `;h.default.useEffect(()=>{if(!t)return;let _=rw(t);_&&(_.providerId===B.activeProviderId&&_.model===B.selectedModel||Wn({provider_id:_.providerId,model:_.model}).catch(A=>{console.error("Failed to activate thread model binding:",A)}))},[t,B.activeProviderId,B.selectedModel]);let Ne=h.default.useMemo(()=>b2({gatewayStatus:i,activeThread:D}),[i,D]),Ve=o.length>0||u||!!c||!!d,Pe=!p&&!Ve&&!b,Te=u&&!c||x>0,jt=x>0?`Retry in ${x}s`:void 0,vt=t||zo,Ut=!!(t&&v?.runId&&v.threadId===t&&u&&!c),he=h.default.useCallback(async(_,{images:A=[],attachments:U=[]}={})=>{!t&&se&&await Wn({provider_id:se.providerId,model:se.model});let F=await $(_,{images:A,attachments:U,threadId:t}),P=F?.thread_id||t;return!t&&P&&se&&sw(P,se),!t&&P&&a&&a(P,{replace:!0}),F},[t,a,se,$]),te=h.default.useCallback(async _=>{O([]),await he(_)},[he,O]),$e=h.default.useCallback(()=>w("user_requested"),[w]);h.default.useEffect(()=>{if(!t)return;if(c){fc(t,bn.NEEDS_ATTENTION);return}if(u){fc(t,bn.RUNNING);return}let _=setTimeout(()=>vw(t),YA);return()=>clearTimeout(_)},[t,c,u]);let[ct,N]=h.default.useState(!1);return h.default.useEffect(()=>{let _=A=>{if(A.key==="Escape"){N(!1);return}if(A.key!=="?")return;let U=A.target,F=U?.tagName;F==="INPUT"||F==="TEXTAREA"||U?.isContentEditable||(A.preventDefault(),N(P=>!P))};return window.addEventListener("keydown",_),()=>window.removeEventListener("keydown",_)},[]),l`
    <div className="flex h-full min-h-0 overflow-hidden">
      <div className="flex min-w-0 flex-1 flex-col">
        <${b1} status=${f} />

        ${b&&l`
          <div
            className="mx-4 mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
            role="alert"
          >
            ${b}
          </div>
        `}

        ${Pe&&l`
          <${x1}
            onSuggestion=${te}
            onSend=${he}
            disabled=${Te}
            initialText=${r}
            resetKey=${s}
            draftKey=${vt}
            context=${Ne}
            statusText=${jt}
            canCancel=${Ut}
            onCancel=${$e}
            preComposerContent=${Oe}
          />
        `}
        ${!Pe&&l`
          <${Q1}
            messages=${o}
            isLoading=${p}
            hasMore=${y}
            onLoadMore=${E}
            onRetryMessage=${S}
            threadId=${t}
            pending=${u}
          >
            ${g&&l`
              <${V1}
                notice=${g}
                onRecover=${C}
              />
            `}
            ${u&&!c&&l`<${Y1} />`}
            ${d&&l`
              <${v1}
                connectAction=${d}
                onDismiss=${J}
              />
            `}
            ${c&&(c.kind==="auth_required"?c.challengeKind==="oauth_url"?l`
                  <${f1}
                    gate=${c}
                    onCancel=${()=>R(c.requestId,"cancel",c.kind)}
                  />
                `:c.challengeKind==="manual_token"?l`
                  <${p1}
                    gate=${c}
                    onSubmit=${j}
                    onCancel=${()=>R(c.requestId,"cancel",c.kind)}
                  />
                `:l`
                  <${m1}
                    gate=${c}
                    onCancel=${()=>R(c.requestId,"cancel",c.kind)}
                  />
                `:l`
              <${d1}
                gate=${c}
                onApprove=${()=>R(c.requestId,"approve",c.kind)}
                onDeny=${()=>R(c.requestId,"deny",c.kind)}
                onAlways=${()=>R(c.requestId,"always",c.kind)}
              />
            `)}
          <//>

          <${G1}
            suggestions=${m}
            onSelect=${te}
          />

          <div className="px-4 pb-1 pt-2 sm:px-5 lg:px-8">${Oe}</div>

          <${_c}
            onSend=${he}
            disabled=${Te}
            initialText=${r}
            resetKey=${s}
            draftKey=${vt}
            context=${Ne}
            statusText=${jt}
            canCancel=${Ut}
            onCancel=${$e}
          />
        `}
      </div>
      <${$1}
        open=${ct}
        onClose=${()=>N(!1)}
      />
    </div>
  `}function oh(){let{threadsState:e,gatewayStatus:t}=Ha(),{threadId:a}=ot(),n=pe(),r=Me(),s=r.state?.composerDraft||"";h.default.useEffect(()=>{a&&a!==e.activeThreadId?e.setActiveThreadId(a):a||e.setActiveThreadId(null)},[a]);let i=h.default.useCallback((o,u={})=>{if(!o){e.setActiveThreadId(null),n("/chat",u);return}e.setActiveThreadId(o),n(`/chat/${o}`,u)},[e,n]);return l`
    <${x2}
      threads=${e.threads}
      activeThreadId=${e.activeThreadId}
      onSelectThread=${i}
      isCreatingThread=${e.isCreating}
      composerDraft=${s}
      composerResetKey=${r.key}
      gatewayStatus=${t}
    />
  `}function $2(e,t){return{name:e?.name||"",id:e?.id||"",adapter:e?.adapter||"open_ai_completions",baseUrl:e?er(e,t):"",model:e?zr(e,t):""}}function w2({provider:e,allProviderIds:t,builtinOverrides:a,open:n,onClose:r,onSave:s,onTest:i,onListModels:o,t:u}){let[c,d]=h.default.useState(()=>$2(e,a)),[m,f]=h.default.useState(""),[p,b]=h.default.useState([]),[y,x]=h.default.useState(null),[g,v]=h.default.useState(""),$=h.default.useRef(!!e);h.default.useEffect(()=>{n&&(d($2(e,a)),f(""),b([]),x(null),v(""),$.current=!!e)},[n,e,a]);let w=e?.builtin===!0,S=e&&!e.builtin,R=h.default.useCallback((J,D)=>{d(B=>{let V={...B,[J]:D};return J==="name"&&!$.current&&(V.id=V$(D)),V})},[]),C=h.default.useCallback(()=>!w&&(!c.name.trim()||!c.id.trim())?u("llm.fieldsRequired"):!w&&!G$(c.id.trim())?u("llm.invalidId"):!S&&!w&&t.includes(c.id.trim())?u("llm.idTaken",{id:c.id.trim()}):"",[t,c.id,c.name,w,S,u]),E=h.default.useCallback(async()=>{let J=C();if(J){x({tone:"error",text:J});return}v("save");try{await s({form:c,apiKey:m,provider:e}),r()}catch(D){x({tone:"error",text:D.message})}finally{v("")}},[m,c,r,s,e,C]),O=h.default.useCallback(async()=>{if(!c.model.trim()){x({tone:"error",text:u("llm.modelRequired")});return}v("test");try{let J=await i(Lp(e,c,m,a));x({tone:J.ok?"success":"error",text:J.message})}catch(J){x({tone:"error",text:J.message})}finally{v("")}},[m,a,c,i,e,u]),j=h.default.useCallback(async()=>{if((w?e?.base_url_required===!0:!0)&&!c.baseUrl.trim()){x({tone:"error",text:u("llm.baseUrlRequired")});return}v("models");try{let D=await o(Lp(e,c,m,a));if(!D.ok||!Array.isArray(D.models)||!D.models.length)x({tone:"error",text:D.message||u("llm.modelsFetchFailed")});else{b(D.models);let B=Y$(c.model,D.models);B!==null&&R("model",B),x({tone:"success",text:u("llm.modelsFetched",{count:D.models.length})})}}catch(D){x({tone:"error",text:D.message})}finally{v("")}},[m,a,c,w,o,e,u,R]);return{form:c,apiKey:m,models:p,message:y,busy:g,isBuiltin:w,isEditing:S,setApiKey:f,update:R,submit:E,runTest:O,fetchModels:j,markIdEdited:()=>{$.current=!0}}}function Mc({provider:e,allProviderIds:t,builtinOverrides:a,open:n,onClose:r,onSave:s,onTest:i,onListModels:o}){let u=k(),c=w2({provider:e,allProviderIds:t,builtinOverrides:a,open:n,onClose:r,onSave:s,onTest:i,onListModels:o,t:u});if(!n)return null;let{form:d,apiKey:m,models:f,message:p,busy:b,isBuiltin:y,isEditing:x}=c,g=y?u("llm.configureProvider",{name:e.name||e.id}):u(x?"llm.editProvider":"llm.newProvider");return l`
    <${ti} open=${n} onClose=${r} title=${g} size="lg">
      <${ai} className="space-y-4">
        ${!y&&l`
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-[var(--v2-text-strong)]">
              ${u("llm.providerName")}
              <${Mt} value=${d.name} onChange=${v=>c.update("name",v.target.value)} />
            </label>
            <label className="space-y-2 text-sm text-[var(--v2-text-strong)]">
              ${u("llm.providerId")}
              <${Mt}
                value=${d.id}
                disabled=${x}
                onChange=${v=>{c.markIdEdited(),c.update("id",v.target.value)}}
              />
            </label>
          </div>
          <label className="block space-y-2 text-sm text-[var(--v2-text-strong)]">
            ${u("llm.adapter")}
            <${Yp} value=${d.adapter} onChange=${v=>c.update("adapter",v.target.value)}>
              ${Op.map(v=>l`<option key=${v.value} value=${v.value}>${v.label}</option>`)}
            <//>
          </label>
        `}

        ${y&&l`
          <div className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-[var(--v2-text-muted)]">
            ${qo(e.adapter)}
          </div>
        `}

        <label className="block space-y-2 text-sm text-[var(--v2-text-strong)]">
          ${u("llm.baseUrl")}
          <${Mt} value=${d.baseUrl} placeholder=${e?.base_url||""} onChange=${v=>c.update("baseUrl",v.target.value)} />
        </label>

        <label className="block space-y-2 text-sm text-[var(--v2-text-strong)]">
          ${u("llm.apiKey")}
          <${Mt} type="password" value=${m} placeholder=${u("llm.apiKeyPlaceholder")} onChange=${v=>c.setApiKey(v.target.value)} />
        </label>

        <label className="block space-y-2 text-sm text-[var(--v2-text-strong)]">
          ${u("llm.defaultModel")}
          <div className="flex items-stretch gap-2">
            <${Mt} value=${d.model} onChange=${v=>c.update("model",v.target.value)} />
            <${T} type="button" variant="secondary" className="shrink-0 whitespace-nowrap" disabled=${b!==""} onClick=${c.fetchModels}>
              ${u(b==="models"?"llm.fetchingModels":"llm.fetchModels")}
            <//>
          </div>
        </label>

        ${f.length>0&&l`
          <${Yp} value=${d.model} onChange=${v=>c.update("model",v.target.value)}>
            ${f.map(v=>l`<option key=${v} value=${v}>${v}</option>`)}
          <//>
        `}

        ${p&&l`
          <div className=${p.tone==="error"?"text-sm text-red-200":"text-sm text-mint"} role="status">
            ${p.text}
          </div>
        `}
      <//>
      <${ni}>
        <${T} type="button" variant="secondary" disabled=${b!==""} onClick=${c.runTest}>
          ${u(b==="test"?"llm.testing":"llm.testConnection")}
        <//>
        <${T} type="button" variant="ghost" disabled=${b!==""} onClick=${r}>${u("common.cancel")}<//>
        <${T} type="button" disabled=${b!==""} onClick=${c.submit}>
          ${u(b==="save"?"common.saving":"common.save")}
        <//>
      <//>
    <//>
  `}function Oc({login:e}){let t=k(),{nearaiBusy:a,nearaiError:n,codexBusy:r,codexError:s,codexCode:i}=e;return l`
    ${a&&l`<div className="text-center text-xs text-[var(--v2-text-muted)]">
      ${t("onboarding.nearaiWaiting")}
    </div>`}
    ${n&&l`<div className="text-center text-xs text-red-300">${n}</div>`}

    ${i&&l`<div
      className="mx-auto max-w-md rounded-lg border border-[var(--v2-border)] bg-[var(--v2-surface-raised)] p-4 text-center"
    >
      <div className="text-xs text-[var(--v2-text-muted)]">
        ${t("onboarding.codexEnterCode")}
      </div>
      <div className="mt-2 font-mono text-2xl font-semibold tracking-[0.3em] text-[var(--v2-text-strong)]">
        ${i.userCode}
      </div>
      <a
        className="mt-2 inline-block text-xs underline hover:text-[var(--v2-text-strong)]"
        href=${i.verificationUri}
        target="_blank"
        rel="noopener noreferrer"
      >
        ${i.verificationUri}
      </a>
    </div>`}
    ${r&&l`<div className="text-center text-xs text-[var(--v2-text-muted)]">
      ${t("onboarding.codexWaiting")}
    </div>`}
    ${s&&l`<div className="text-center text-xs text-red-300">${s}</div>`}
  `}function XA(e,t){if(!t)return!0;let a=t.toLowerCase();return[e.id,e.name,e.adapter,e.base_url,e.default_model].filter(Boolean).some(n=>String(n).toLowerCase().includes(a))}function Lc({settings:e,gatewayStatus:t,searchQuery:a,t:n}){let r=tr({settings:e,gatewayStatus:t}),[s,i]=h.default.useState(null),[o,u]=h.default.useState(!1),[c,d]=h.default.useState(null),m=h.default.useRef(null),f=h.default.useCallback((g,v)=>{m.current&&window.clearTimeout(m.current),d({tone:g,text:v}),m.current=window.setTimeout(()=>d(null),3500)},[]);h.default.useEffect(()=>()=>{m.current&&window.clearTimeout(m.current)},[]);let p=h.default.useCallback((g=null)=>{i(g),u(!0)},[]),b=h.default.useCallback(async g=>{try{await r.setActiveProvider(g),f("success",n("llm.providerActivated",{name:g.name||g.id}))}catch(v){v.message==="base_url"||v.message==="api_key"||v.message==="model"?(p(g),f("error",n(v.message==="base_url"?"llm.baseUrlRequired":v.message==="model"?"llm.modelRequired":"llm.configureToUse"))):f("error",v.message)}},[p,r,f,n]),y=h.default.useCallback(async({form:g,apiKey:v,provider:$})=>{if($?.builtin){await r.saveBuiltinProvider({provider:$,form:g,apiKey:v}),f("success",n("llm.providerConfigured",{name:$.name||$.id}));return}let w=await r.saveCustomProvider({form:g,apiKey:v,editingProvider:$});f("success",n($?"llm.providerUpdated":"llm.providerAdded",{name:w.name||w.id}))},[r,f,n]),x=h.default.useCallback(async g=>{if(window.confirm(n("llm.confirmDelete",{id:g.id})))try{await r.deleteCustomProvider(g),f("success",n("llm.providerDeleted"))}catch(v){f("error",v.message)}},[r,f,n]);return{providerState:r,dialogProvider:s,isDialogOpen:o,message:c,filteredProviders:r.providers.filter(g=>XA(g,a)),allProviderIds:r.providers.map(g=>g.id),openDialog:p,closeDialog:()=>u(!1),handleUse:b,handleSave:y,handleDelete:x}}var ZA=3e5;function WA(){if(typeof window>"u"||!window.location)return!1;let e=window.location.hostname;return e==="localhost"||e==="0.0.0.0"||e==="::1"||/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(e)||e.endsWith(".localhost")}function e5(){return`nearai-wallet-login:${typeof window.crypto?.randomUUID=="function"?window.crypto.randomUUID():`${Date.now()}-${Math.random().toString(16).slice(2)}`}`}function t5(e,t){return new Promise(a=>{if(typeof window.BroadcastChannel!="function"){a(null);return}let n=new window.BroadcastChannel(t),r=u=>{let c=u.data;!c||c.type!=="nearai-wallet-login"||(o(),a(c.ok?c:null))},s=setInterval(()=>{e&&e.closed&&(o(),a(null))},500),i=setTimeout(()=>{o(),a(null)},ZA);function o(){clearInterval(s),clearTimeout(i),n.removeEventListener("message",r),n.close()}n.addEventListener("message",r)})}var a5=3e5,n5=9e5,r5=2e3;async function S2(e,t,a){let n=Date.now()+t,r=2;for(;Date.now()<n;){if(await new Promise(i=>setTimeout(i,r5)),(await dc().catch(()=>null))?.active?.provider_id===e)return"active";if(a&&a.closed){if(r<=0)return"closed";r-=1}}return"timeout"}function Pc({onSuccess:e}={}){let t=k(),a=ee(),[n,r]=h.default.useState(!1),[s,i]=h.default.useState(""),[o,u]=h.default.useState(!1),[c,d]=h.default.useState(""),[m,f]=h.default.useState(null),p=h.default.useCallback(()=>{i(""),d(""),f(null)},[]),b=h.default.useCallback(async()=>{await a.invalidateQueries({queryKey:["llm-providers"]}),e&&e()},[a,e]),y=h.default.useCallback(async v=>{if(p(),WA()){i(t("onboarding.nearaiLocalSso"));return}let $=window.open("about:blank","_blank");if(!$){i(t("onboarding.nearaiFailed"));return}try{$.opener=null}catch{}r(!0);try{let{auth_url:w}=await k$({provider:v,origin:window.location.origin});$.location.href=w;let S=await S2("nearai",a5,$);if(S==="active"){await b();return}$.close(),i(t(S==="closed"?"onboarding.nearaiFailed":"onboarding.nearaiTimeout"))}catch{$.close(),i(t("onboarding.nearaiFailed"))}finally{r(!1)}},[b,p,t]),x=h.default.useCallback(async()=>{p(),r(!0);try{let v=e5(),$=window.open(`/v2/wallet/connect?channel=${encodeURIComponent(v)}`,"_blank","width=460,height=640");if(!$){i(t("onboarding.nearaiFailed"));return}$.opener=null;let w=await t5($,v);if(!w){i(t("onboarding.nearaiFailed"));return}await C$({account_id:w.accountId,public_key:w.publicKey,signature:w.signature,message:w.message,recipient:w.recipient,nonce:w.nonce}),await b()}catch{i(t("onboarding.nearaiFailed"))}finally{r(!1)}},[b,p,t]),g=h.default.useCallback(async()=>{p();let v=window.open("about:blank","_blank");if(v)try{v.opener=null}catch{}u(!0);try{let{user_code:$,verification_uri:w}=await E$();f({userCode:$,verificationUri:w}),v&&(v.location.href=w);let S=await S2("openai_codex",n5,v);if(S==="active"){await b();return}v&&v.close(),d(t(S==="closed"?"onboarding.codexFailed":"onboarding.codexTimeout"))}catch{v&&v.close(),d(t("onboarding.codexFailed"))}finally{u(!1)}},[b,p,t]);return{nearaiBusy:n,nearaiError:s,codexBusy:o,codexError:c,codexCode:m,startNearai:y,startNearaiWallet:x,startCodex:g}}var N2="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z",s5="M21.443 0c-.89 0-1.714.46-2.18 1.218l-5.017 7.448a.533.533 0 0 0 .792.7l4.938-4.282a.2.2 0 0 1 .334.151v13.41a.2.2 0 0 1-.354.128L5.03.905A2.555 2.555 0 0 0 3.078 0h-.521A2.557 2.557 0 0 0 0 2.557v18.886a2.557 2.557 0 0 0 4.736 1.338l5.017-7.448a.533.533 0 0 0-.792-.7l-4.938 4.283a.2.2 0 0 1-.333-.152V5.352a.2.2 0 0 1 .354-.128l14.924 17.87c.486.574 1.2.905 1.952.906h.521A2.558 2.558 0 0 0 24 21.445V2.557A2.558 2.558 0 0 0 21.443 0Z",i5="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z",o5="M16.361 10.26a.894.894 0 0 0-.558.47l-.072.148.001.207c0 .193.004.217.059.353.076.193.152.312.291.448.24.238.51.3.872.205a.86.86 0 0 0 .517-.436.752.752 0 0 0 .08-.498c-.064-.453-.33-.782-.724-.897a1.06 1.06 0 0 0-.466 0zm-9.203.005c-.305.096-.533.32-.65.639a1.187 1.187 0 0 0-.06.52c.057.309.31.59.598.667.362.095.632.033.872-.205.14-.136.215-.255.291-.448.055-.136.059-.16.059-.353l.001-.207-.072-.148a.894.894 0 0 0-.565-.472 1.02 1.02 0 0 0-.474.007Zm4.184 2c-.131.071-.223.25-.195.383.031.143.157.288.353.407.105.063.112.072.117.136.004.038-.01.146-.029.243-.02.094-.036.194-.036.222.002.074.07.195.143.253.064.052.076.054.255.059.164.005.198.001.264-.03.169-.082.212-.234.15-.525-.052-.243-.042-.28.087-.355.137-.08.281-.219.324-.314a.365.365 0 0 0-.175-.48.394.394 0 0 0-.181-.033c-.126 0-.207.03-.355.124l-.085.053-.053-.032c-.219-.13-.259-.145-.391-.143a.396.396 0 0 0-.193.032zm.39-2.195c-.373.036-.475.05-.654.086-.291.06-.68.195-.951.328-.94.46-1.589 1.226-1.787 2.114-.04.176-.045.234-.045.53 0 .294.005.357.043.524.264 1.16 1.332 2.017 2.714 2.173.3.033 1.596.033 1.896 0 1.11-.125 2.064-.727 2.493-1.571.114-.226.169-.372.22-.602.039-.167.044-.23.044-.523 0-.297-.005-.355-.045-.531-.288-1.29-1.539-2.304-3.072-2.497a6.873 6.873 0 0 0-.855-.031zm.645.937a3.283 3.283 0 0 1 1.44.514c.223.148.537.458.671.662.166.251.26.508.303.82.02.143.01.251-.043.482-.08.345-.332.705-.672.957a3.115 3.115 0 0 1-.689.348c-.382.122-.632.144-1.525.138-.582-.006-.686-.01-.853-.042-.57-.107-1.022-.334-1.35-.68-.264-.28-.385-.535-.45-.946-.03-.192.025-.509.137-.776.136-.326.488-.73.836-.963.403-.269.934-.46 1.422-.512.187-.02.586-.02.773-.002zm-5.503-11a1.653 1.653 0 0 0-.683.298C5.617.74 5.173 1.666 4.985 2.819c-.07.436-.119 1.04-.119 1.503 0 .544.064 1.24.155 1.721.02.107.031.202.023.208a8.12 8.12 0 0 1-.187.152 5.324 5.324 0 0 0-.949 1.02 5.49 5.49 0 0 0-.94 2.339 6.625 6.625 0 0 0-.023 1.357c.091.78.325 1.438.727 2.04l.13.195-.037.064c-.269.452-.498 1.105-.605 1.732-.084.496-.095.629-.095 1.294 0 .67.009.803.088 1.266.095.555.288 1.143.503 1.534.071.128.243.393.264.407.007.003-.014.067-.046.141a7.405 7.405 0 0 0-.548 1.873c-.062.417-.071.552-.071.991 0 .56.031.832.148 1.279L3.42 24h1.478l-.05-.091c-.297-.552-.325-1.575-.068-2.597.117-.472.25-.819.498-1.296l.148-.29v-.177c0-.165-.003-.184-.057-.293a.915.915 0 0 0-.194-.25 1.74 1.74 0 0 1-.385-.543c-.424-.92-.506-2.286-.208-3.451.124-.486.329-.918.544-1.154a.787.787 0 0 0 .223-.531c0-.195-.07-.355-.224-.522a3.136 3.136 0 0 1-.817-1.729c-.14-.96.114-2.005.69-2.834.563-.814 1.353-1.336 2.237-1.475.199-.033.57-.028.776.01.226.04.367.028.512-.041.179-.085.268-.19.374-.431.093-.215.165-.333.36-.576.234-.29.46-.489.822-.729.413-.27.884-.467 1.352-.561.17-.035.25-.04.569-.04.319 0 .398.005.569.04a4.07 4.07 0 0 1 1.914.997c.117.109.398.457.488.602.034.057.095.177.132.267.105.241.195.346.374.43.14.068.286.082.503.045.343-.058.607-.053.943.016 1.144.23 2.14 1.173 2.581 2.437.385 1.108.276 2.267-.296 3.153-.097.15-.193.27-.333.419-.301.322-.301.722-.001 1.053.493.539.801 1.866.708 3.036-.062.772-.26 1.463-.533 1.854a2.096 2.096 0 0 1-.224.258.916.916 0 0 0-.194.25c-.054.109-.057.128-.057.293v.178l.148.29c.248.476.38.823.498 1.295.253 1.008.231 2.01-.059 2.581a.845.845 0 0 0-.044.098c0 .006.329.009.732.009h.73l.02-.074.036-.134c.019-.076.057-.3.088-.516.029-.217.029-1.016 0-1.258-.11-.875-.295-1.57-.597-2.226-.032-.074-.053-.138-.046-.141.008-.005.057-.074.108-.152.376-.569.607-1.284.724-2.228.031-.26.031-1.378 0-1.628-.083-.645-.182-1.082-.348-1.525a6.083 6.083 0 0 0-.329-.7l-.038-.064.131-.194c.402-.604.636-1.262.727-2.04a6.625 6.625 0 0 0-.024-1.358 5.512 5.512 0 0 0-.939-2.339 5.325 5.325 0 0 0-.95-1.02 8.097 8.097 0 0 1-.186-.152.692.692 0 0 1 .023-.208c.208-1.087.201-2.443-.017-3.503-.19-.924-.535-1.658-.98-2.082-.354-.338-.716-.482-1.15-.455-.996.059-1.8 1.205-2.116 3.01a6.805 6.805 0 0 0-.097.726c0 .036-.007.066-.015.066a.96.96 0 0 1-.149-.078A4.857 4.857 0 0 0 12 3.03c-.832 0-1.687.243-2.456.698a.958.958 0 0 1-.148.078c-.008 0-.015-.03-.015-.066a6.71 6.71 0 0 0-.097-.725C8.997 1.392 8.337.319 7.46.048a2.096 2.096 0 0 0-.585-.041Zm.293 1.402c.248.197.523.759.682 1.388.03.113.06.244.069.292.007.047.026.152.041.233.067.365.098.76.102 1.24l.002.475-.12.175-.118.178h-.278c-.324 0-.646.041-.954.124l-.238.06c-.033.007-.038-.003-.057-.144a8.438 8.438 0 0 1 .016-2.323c.124-.788.413-1.501.696-1.711.067-.05.079-.049.157.013zm9.825-.012c.17.126.358.46.498.888.28.854.36 2.028.212 3.145-.019.14-.024.151-.057.144l-.238-.06a3.693 3.693 0 0 0-.954-.124h-.278l-.119-.178-.119-.175.002-.474c.004-.669.066-1.19.214-1.772.157-.623.434-1.185.68-1.382.078-.062.09-.063.159-.012z",l5={nearai:{color:"#00ec97",path:s5},openai_codex:{color:"#10a37f",path:N2},openai:{color:"#10a37f",path:N2},anthropic:{color:"#d97757",path:i5},ollama:{color:null,path:o5}};function _2({id:e,name:t}){let a=l5[e],n="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl";if(!a){let s=(t||e||"?").trim().charAt(0).toUpperCase();return l`
      <span
        className=${`${n} bg-[var(--v2-surface-muted)] text-sm font-semibold text-[var(--v2-text-strong)]`}
      >
        ${s}
      </span>
    `}let r=a.color?{background:`color-mix(in srgb, ${a.color} 16%, transparent)`,color:a.color}:{background:"var(--v2-surface-muted)",color:"var(--v2-text-strong)"};return l`
    <span className=${n} style=${r}>
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d=${a.path} />
      </svg>
    </span>
  `}var u5=[{id:"nearai",auth:"nearai",nameKey:"onboarding.providerNearai",descKey:"onboarding.providerNearaiDesc"},{id:"openai_codex",auth:"codex",nameKey:"onboarding.providerCodex",descKey:"onboarding.providerCodexDesc"},{id:"openai",auth:"key",nameKey:"onboarding.providerOpenai",descKey:"onboarding.providerOpenaiDesc"},{id:"anthropic",auth:"key",nameKey:"onboarding.providerAnthropic",descKey:"onboarding.providerAnthropicDesc"},{id:"ollama",auth:"key",nameKey:"onboarding.providerOllama",descKey:"onboarding.providerOllamaDesc"}];function c5({provider:e,isBusy:t,login:a,t:n,onSetUp:r}){let[s,i]=h.default.useState(!1),o=h.default.useRef(null),u=t||a.nearaiBusy;h.default.useEffect(()=>{if(!s)return;let d=f=>{o.current&&!o.current.contains(f.target)&&i(!1)},m=f=>{f.key==="Escape"&&i(!1)};return document.addEventListener("mousedown",d),document.addEventListener("keydown",m),()=>{document.removeEventListener("mousedown",d),document.removeEventListener("keydown",m)}},[s]);let c=[{id:"api-key",label:n("llm.addApiKey"),disabled:t,run:()=>r(e)},{id:"near-wallet",label:n("onboarding.nearWallet"),disabled:a.nearaiBusy,run:a.startNearaiWallet},{id:"github",label:"GitHub",disabled:a.nearaiBusy,run:()=>a.startNearai("github")},{id:"google",label:"Google",disabled:a.nearaiBusy,run:()=>a.startNearai("google")}];return l`
    <div ref=${o} className="relative shrink-0">
      <${T}
        type="button"
        variant="primary"
        size="sm"
        className="gap-1.5"
        aria-haspopup="true"
        aria-expanded=${s?"true":"false"}
        disabled=${u}
        onClick=${()=>i(d=>!d)}
      >
        ${n("onboarding.setUp")}
        <${M} name="chevron" className="h-3.5 w-3.5" />
      <//>
      ${s&&l`
        <div
          role="menu"
          className="absolute right-0 top-10 z-20 min-w-[176px] rounded-[10px] border border-[var(--v2-panel-border)] bg-[var(--v2-surface)] p-1 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.7)]"
        >
          ${c.map(d=>l`
              <button
                key=${d.id}
                type="button"
                role="menuitem"
                disabled=${d.disabled}
                onClick=${()=>{i(!1),d.run()}}
                className="flex w-full items-center rounded-[7px] px-2.5 py-1.5 text-left text-[13px] text-[var(--v2-text)] hover:bg-[var(--v2-surface-soft)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                ${d.label}
              </button>
            `)}
        </div>
      `}
    </div>
  `}function d5({entry:e,provider:t,configured:a,isBusy:n,login:r,t:s,onUse:i,onSetUp:o}){let u=s(e.nameKey),c;return e.auth==="nearai"?c=l`<${c5} provider=${t} isBusy=${n} login=${r} t=${s} onSetUp=${o} />`:e.auth==="codex"?c=l`
      <${T} type="button" variant="secondary" size="sm" disabled=${r.codexBusy} onClick=${r.startCodex}>
        ${s("onboarding.signIn")}
      <//>
    `:a?c=l`<${T} type="button" variant="primary" size="sm" disabled=${n} onClick=${()=>i(t)}>
      ${s("llm.use")}
    <//>`:c=l`<${T} type="button" variant="primary" size="sm" disabled=${n} onClick=${()=>o(t)}>
      ${s("onboarding.setUp")}
    <//>`,l`
    <${ae} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <${_2} id=${e.id} name=${u} />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-semibold text-[var(--v2-text-strong)]">${u}</span>
            ${a&&l`<${z} tone="positive" label=${s("onboarding.ready")} size="sm" />`}
          </div>
          <div className="mt-0.5 truncate text-xs text-[var(--v2-text-muted)]">${s(e.descKey)}</div>
        </div>
      </div>
      <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">${c}</div>
    <//>
  `}function R2(){let{isAdmin:e=!1,isChecking:t=!1}=Ha();return t?null:e?l`<${m5} />`:l`<${lt} to="/chat" replace />`}function m5(){let e=k(),t=pe(),a=ee(),{gatewayStatus:n}=Ha(),r=Lc({settings:{},gatewayStatus:n,searchQuery:"",t:e}),s=r.providerState,i=u5.map(m=>({entry:m,provider:s.providers.find(f=>f.id===m.id)})).filter(m=>m.provider),o=h.default.useCallback(()=>t("/chat"),[t]),u=Pc({onSuccess:o}),c=h.default.useCallback(async m=>{let f=m.active_model||m.default_model||"";await Wn({provider_id:m.id,model:f}),await a.invalidateQueries({queryKey:["llm-providers"]}),t("/chat")},[t,a]),d=h.default.useCallback(async({form:m,apiKey:f,provider:p})=>{await r.handleSave({form:m,apiKey:f,provider:p});let b=p?.id||m.id.trim(),y=m.model?.trim()||p?.default_model||"";await Wn({provider_id:b,model:y}),await a.invalidateQueries({queryKey:["llm-providers"]}),r.closeDialog(),t("/chat")},[r,t,a]);return s.isLoading?l`
      <div className="grid h-full place-items-center text-sm text-[var(--v2-text-muted)]">
        ${e("common.loading")}
      </div>
    `:l`
    <div className="h-full overflow-y-auto">
      <div className="mx-auto flex min-h-full max-w-2xl flex-col justify-center gap-6 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[var(--v2-text-strong)]">
            ${e("onboarding.title")}
          </h1>
          <p className="mt-2 text-sm text-[var(--v2-text-muted)]">${e("onboarding.subtitle")}</p>
        </div>

        <div className="flex flex-col gap-3">
          ${i.map(({entry:m,provider:f})=>l`
              <${d5}
                key=${m.id}
                entry=${m}
                provider=${f}
                configured=${yn(f,s.builtinOverrides)}
                isBusy=${s.isBusy}
                login=${u}
                t=${e}
                onUse=${c}
                onSetUp=${r.openDialog}
              />
            `)}
        </div>

        <${Oc} login=${u} />

        <div className="text-center text-xs text-[var(--v2-text-muted)]">
          ${e("onboarding.moreInSettings")}${" "}
          <button
            type="button"
            className="underline hover:text-[var(--v2-text-strong)]"
            onClick=${()=>t("/settings/inference")}
          >
            ${e("nav.settings")}
          </button>
        </div>
      </div>

      <${Mc}
        open=${r.isDialogOpen}
        provider=${r.dialogProvider}
        allProviderIds=${r.allProviderIds}
        builtinOverrides=${s.builtinOverrides}
        onClose=${r.closeDialog}
        onSave=${d}
        onTest=${s.testConnection}
        onListModels=${s.listModels}
      />
    </div>
  `}function q({children:e,className:t="",...a}){return l`<${ae} className=${t} ...${a}>${e}<//>`}function at({label:e,value:t,tone:a="muted",badgeLabel:n,detail:r,showDivider:s=!0,className:i="",valueClassName:o="text-[1.75rem] md:text-[2rem]"}){return l`
    <div
      className=${K("px-1 py-4",s&&"border-t border-[var(--v2-panel-border)]",i)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div
            className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--v2-text-muted)]"
          >
            ${e}
          </div>
          <div
            className=${K("mt-3 truncate font-medium tracking-[-0.05em] text-[var(--v2-text-strong)]",o)}
          >
            ${t}
          </div>
          ${r&&l`<div className="mt-2 text-xs leading-5 text-[var(--v2-text-muted)]">
            ${r}
          </div>`}
        </div>
        <${z} tone=${a} label=${n??a} />
      </div>
    </div>
  `}function k2({items:e}){return l`
    <div className="grid gap-3">
      ${e.map((t,a)=>l`
          <div
            key=${t.title}
            className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 border-t border-[var(--v2-panel-border)] py-4"
            style=${{"--index":a}}
          >
            <div className="font-mono text-xs text-[var(--v2-accent-text)]">
              ${String(a+1).padStart(2,"0")}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-[var(--v2-text-strong)]">
                ${t.title}
              </div>
              <div className="mt-1 text-sm leading-6 text-[var(--v2-text-muted)]">
                ${t.description}
              </div>
            </div>
          </div>
        `)}
    </div>
  `}function be({title:e,description:t,children:a,boxed:n=!0}){let r=l`
    <div className="max-w-xl">
      <h2
        className="text-[1.35rem] font-medium tracking-[-0.03em] text-[var(--v2-text-strong)] md:text-[1.6rem]"
      >
        ${e}
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-[var(--v2-text-muted)]">
        ${t}
      </p>
      ${a&&l`<div className="mt-5">${a}</div>`}
    </div>
  `;return n?l`<${ae} padding="lg">${r}<//>`:l`<div className="py-8">${r}</div>`}var C2={success:"border-mint/30 bg-mint/10 text-mint",error:"border-red-400/30 bg-red-500/10 text-red-200",info:"border-signal/30 bg-signal/10 text-signal"};function Ga({result:e,onDismiss:t}){return e?l`
    <div className=${["flex items-center gap-3 rounded-xl border px-4 py-3 text-sm",C2[e.type]||C2.info].join(" ")}>
      <span className="min-w-0 flex-1">${e.message}</span>
      <button onClick=${t} className="shrink-0 opacity-70 hover:opacity-100">Dismiss</button>
    </div>
  `:null}var E2="",f5={workspace:"home"};function jc(e){return f5[e]||e}function Yo(e){return[...e||[]].sort((t,a)=>t.is_dir!==a.is_dir?t.is_dir?-1:1:t.name.localeCompare(a.name,void 0,{sensitivity:"base"}))}function si(e){return e?e.split("/").filter(Boolean):[]}function Uc(e){return e?`/workspace/${si(e).map(encodeURIComponent).join("/")}`:"/workspace"}function lh(e){let t=si(e);return t.pop(),t.join("/")}function T2(e){return/\.mdx?$/i.test(e||"")}function Fc({path:e,onNavigate:t}){let a=k(),n=si(e),r="";return l`
    <div className="flex min-w-0 flex-wrap items-center gap-2 font-mono text-sm">
      <button
        type="button"
        onClick=${()=>t("/workspace")}
        className="text-signal hover:underline"
      >
        ${a("workspace.breadcrumbRoot")}
      </button>
      ${n.map((s,i)=>{r=r?`${r}/${s}`:s;let o=r,u=i===0?jc(s):s;return l`
          <span key=${o} className="text-iron-400">/</span>
          <button
            key=${`${o}-button`}
            type="button"
            onClick=${()=>t(Uc(o))}
            className="max-w-[220px] truncate text-signal hover:underline"
          >
            ${u}
          </button>
        `})}
    </div>
  `}function p5(e=""){return String(e).split("/").some(t=>t.startsWith("."))}function A2({path:e,entries:t,isLoading:a,filter:n,onOpen:r,onNavigate:s}){let i=k();if(a)return l`
      <div className="space-y-4">
        <div className="v2-skeleton h-16 rounded-xl" />
        <div className="v2-skeleton h-[460px] rounded-xl" />
      </div>
    `;let o=(t||[]).filter(f=>!p5(f.path)),u=String(n||"").trim().toLowerCase(),c=u?o.filter(f=>f.name.toLowerCase().includes(u)):o,d=Yo(c),m;return o.length?d.length?m=l`
      <div className="divide-y divide-white/[0.06]">
        ${d.map(f=>l`
          <button
            key=${f.path}
            type="button"
            onClick=${()=>r(f.path)}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-iron-200 hover:bg-white/[0.05] hover:text-white"
          >
            <span className=${["w-4 text-center text-xs",f.is_dir?"text-signal":"text-iron-400"].join(" ")}>
              ${f.is_dir?"\u25A1":"\xB7"}
            </span>
            <span className="min-w-0 truncate ${f.is_dir?"font-semibold":""}">${f.name}</span>
          </button>
        `)}
      </div>
    `:m=l`<div className="px-4 py-10 text-center text-sm text-iron-300">${i("workspace.noMatches")}</div>`:m=l`<div className="px-4 py-10 text-center text-sm text-iron-300">${i("workspace.emptyDir")}</div>`,l`
    <${q} className="flex min-h-[520px] flex-col overflow-hidden p-0 xl:min-h-0">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <${Fc} path=${e} onNavigate=${s} />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">${m}</div>
    <//>
  `}var zc="/api/webchat/v2/fs",h5=1024*1024,v5=8*1024*1024;function D2(e){let t=String(e||"").split("/").filter(Boolean);return{mount:t.shift()||"",path:t.join("/")}}function g5(e,t){return t?`${e}/${t}`:e}function y5(e){let t=String(e||"").toLowerCase();return t.startsWith("text/")||t==="application/json"||t==="application/javascript"||t==="application/xml"||t.endsWith("+json")||t.endsWith("+xml")}function b5(e){return String(e||"").toLowerCase().startsWith("image/")}function x5(e){let t=String(e||"").toLowerCase();return t.startsWith("audio/")||t.startsWith("video/")||t.startsWith("font/")||t==="application/pdf"||t==="application/zip"||t==="application/gzip"}function $5(e){if(e.subarray(0,Math.min(e.length,8192)).indexOf(0)!==-1)return!0;try{return new TextDecoder("utf-8",{fatal:!0}).decode(e),!1}catch{return!0}}function w5(e,t){let a=new URL(`${zc}/content`,window.location.origin);return a.searchParams.set("mount",e),a.searchParams.set("path",t),a.pathname+a.search}async function S5(){return(await Z(`${zc}/mounts`))?.mounts||[]}async function ii(e=""){if(!e)return{entries:(await S5()).map(o=>({name:jc(o.mount),path:o.mount,is_dir:!0}))};let{mount:t,path:a}=D2(e),n=new URL(`${zc}/list`,window.location.origin);return n.searchParams.set("mount",t),a&&n.searchParams.set("path",a),{entries:((await Z(n.pathname+n.search))?.entries||[]).map(i=>({name:i.name,path:g5(t,i.path),is_dir:i.kind==="directory"}))}}async function M2(e){let{mount:t,path:a}=D2(e);if(!t||!a)return{kind:"directory",path:e};let n=new URL(`${zc}/stat`,window.location.origin);n.searchParams.set("mount",t),n.searchParams.set("path",a);let s=(await Z(n.pathname+n.search))?.stat||{},i=s.mime_type||"application/octet-stream",o=Number(s.size_bytes||0),u=w5(t,a),c={path:e,mime:i,size_bytes:o,download_path:u};if(s.kind&&s.kind!=="file")return{...c,kind:"directory"};if(b5(i)){if(o>v5)return{...c,kind:"binary"};let p=await ic(u);return{...c,kind:"image",image_data_url:p}}if(x5(i)||o>h5)return{...c,kind:"binary"};let d=await ka(u),m=new Uint8Array(await d.arrayBuffer());if(!y5(i)&&$5(m))return{...c,kind:"binary"};let f=new TextDecoder("utf-8").decode(m);return{...c,kind:"text",content:f}}function O2(e=""){return String(e).split("/").some(t=>t.startsWith("."))}function N5(e,t,a){let n=String(t||"").trim().toLowerCase(),r=(e||[]).filter(s=>!O2(s.path)).filter(s=>!n||s.name.toLowerCase().includes(n)?!0:s.is_dir&&a.has(s.path));return Yo(r)}function L2({entry:e,depth:t,selectedPath:a,expandedPaths:n,filter:r,onToggleDirectory:s,onSelectFile:i}){let o=k(),u=n.has(e.path),c=H({queryKey:["workspace-list",e.path],queryFn:()=>ii(e.path),enabled:e.is_dir&&u});if(e.is_dir){let d=N5(c.data?.entries,r,n);return l`
      <div>
        <button
          type="button"
          onClick=${()=>{i(e.path),s(e.path)}}
          className=${["flex min-h-8 w-full items-center gap-2 rounded-md px-2 text-left text-sm hover:bg-white/[0.05] hover:text-white",a===e.path?"bg-signal/10 text-signal":"text-iron-200"].join(" ")}
          style=${{paddingLeft:`${8+t*16}px`}}
          aria-expanded=${u}
        >
          <span className=${["w-3 text-[10px]",u?"rotate-90":""].join(" ")}>></span>
          <span className="min-w-0 truncate font-semibold">${e.name}</span>
        </button>
        ${u&&l`
          <div className="space-y-1">
            ${c.isLoading?l`<div className="px-4 py-2 text-xs text-iron-400">${o("workspace.loading")}</div>`:c.isError?l`<div className="px-4 py-2 text-xs text-red-300">${o("workspace.unableOpenDirectory")}</div>`:d.map(m=>l`
                  <${L2}
                    key=${m.path}
                    entry=${m}
                    depth=${t+1}
                    selectedPath=${a}
                    expandedPaths=${n}
                    filter=${r}
                    onToggleDirectory=${s}
                    onSelectFile=${i}
                  />
                `)}
          </div>
        `}
      </div>
    `}return l`
    <button
      type="button"
      onClick=${()=>i(e.path)}
      className=${["flex min-h-8 w-full items-center gap-2 rounded-md px-2 text-left text-sm",a===e.path?"bg-signal/10 text-signal":"text-iron-300 hover:bg-white/[0.05] hover:text-white"].join(" ")}
      style=${{paddingLeft:`${24+t*16}px`}}
    >
      <span className="min-w-0 truncate">${e.name}</span>
    </button>
  `}function P2({entries:e,selectedPath:t,expandedPaths:a,filter:n,onToggleDirectory:r,onSelectFile:s,isLoading:i}){let o=k();if(i)return l`<div className="space-y-2 p-3">${[1,2,3,4].map(c=>l`<div key=${c} className="v2-skeleton h-8 rounded-md" />`)}</div>`;let u=Yo(e.filter(c=>!O2(c.path)));return u.length?l`
    <div className="space-y-1 p-2">
      ${u.map(c=>l`
        <${L2}
          key=${c.path}
          entry=${c}
          depth=${0}
          selectedPath=${t}
          expandedPaths=${a}
          filter=${n}
          onToggleDirectory=${r}
          onSelectFile=${s}
        />
      `)}
    </div>
  `:l`<div className="px-4 py-8 text-sm text-iron-300">${o("workspace.noFiles")}</div>`}function j2({rootEntries:e,selectedPath:t,expandedPaths:a,filter:n,onFilterChange:r,isLoadingTree:s,onToggleDirectory:i,onSelectFile:o}){let u=k();return l`
    <${q} className="flex min-h-[420px] flex-col overflow-hidden p-0 xl:min-h-0">
      <div className="border-b border-white/10 p-3">
        <input
          value=${n}
          onInput=${c=>r(c.target.value)}
          placeholder=${u("workspace.filterPlaceholder")}
          className="h-9 w-full rounded-md border border-white/10 bg-iron-950/80 px-3 text-sm text-white outline-none placeholder:text-iron-400 focus:border-signal/45"
        />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <${P2}
          entries=${e}
          selectedPath=${t}
          expandedPaths=${a}
          filter=${n}
          onToggleDirectory=${i}
          onSelectFile=${o}
          isLoading=${s}
        />
      </div>
    <//>
  `}function U2(e){return si(e).pop()||"download"}function _5({path:e,file:t}){let a=k();return t.kind==="image"?l`
      <div className="flex min-h-0 flex-1 items-start overflow-auto p-4">
        <img
          src=${t.image_data_url}
          alt=${U2(e)}
          className="max-h-full max-w-full rounded-lg border border-white/10"
        />
      </div>
    `:t.kind==="text"?l`
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3 sm:px-6 sm:py-4">
        ${T2(e)?l`<${oa} content=${t.content} className="max-w-4xl text-base leading-7" />`:l`<pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-6 text-iron-200">${t.content}</pre>`}
      </div>
    `:l`
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="max-w-md text-sm text-iron-300">${a("workspace.binaryPreviewUnavailable")}</p>
    </div>
  `}function F2({path:e,file:t,isLoading:a,onNavigate:n}){let r=k(),[s,i]=h.default.useState(!1),o=h.default.useCallback(async()=>{if(t?.download_path){i(!0);try{let c=await ka(t.download_path);Rc(c,U2(e))}catch{}finally{i(!1)}}},[t,e]);if(a)return l`
      <div className="space-y-4">
        <div className="v2-skeleton h-16 rounded-xl" />
        <div className="v2-skeleton h-[460px] rounded-xl" />
      </div>
    `;if(!t||t.kind==="directory")return l`
      <${be}
        title=${r("workspace.pickFileTitle")}
        description=${r("workspace.pickFileDesc")}
      />
    `;let u=r("workspace.fileMeta",{mime:t.mime||"application/octet-stream",size:Number(t.size_bytes||0)});return l`
    <${q} className="flex min-h-[520px] flex-col overflow-hidden p-0 xl:min-h-0">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <${Fc} path=${e} onNavigate=${n} />
        <div className="flex items-center gap-2">
          <${z} tone="muted" label=${u} />
          <${T}
            variant="secondary"
            size="sm"
            onClick=${o}
            disabled=${s}
          >${r("workspace.download")}<//>
        </div>
      </div>

      <${_5} path=${e} file=${t} />

      ${lh(e)&&l`
        <div className="border-t border-white/10 px-4 py-3 text-xs text-iron-400">
          ${r("workspace.parent",{path:lh(e)})}
        </div>
      `}
    <//>
  `}function z2(e){let t=k(),a=ee(),[n,r]=h.default.useState(new Set),[s,i]=h.default.useState(""),[o,u]=h.default.useState(null),c=H({queryKey:["workspace-list",""],queryFn:()=>ii("")}),d=H({queryKey:["workspace-file",e],queryFn:()=>M2(e),enabled:!!e}),m=e===""||d.data?.kind==="directory",f=H({queryKey:["workspace-list",e],queryFn:()=>ii(e),enabled:m});h.default.useEffect(()=>{u(null)},[e]);let p=h.default.useCallback(y=>a.fetchQuery({queryKey:["workspace-list",y],queryFn:()=>ii(y)}),[a]),b=h.default.useCallback(async y=>{let x=new Set(n);if(x.has(y)){x.delete(y),r(x);return}x.add(y),r(x);try{await p(y)}catch(g){u({type:"error",message:g.message||t("workspace.unableOpenDirectory")})}},[n,p,t]);return{rootEntries:c.data?.entries||[],file:d.data||null,selectionIsDirectory:m,currentEntries:f.data?.entries||[],expandedPaths:n,filter:s,setFilter:i,result:o,clearResult:()=>u(null),isLoadingTree:c.isLoading,isLoadingFile:d.isLoading,isLoadingListing:f.isLoading,isFetching:c.isFetching||d.isFetching||f.isFetching,error:c.error||d.error||f.error||null,loadDirectory:p,toggleDirectory:b,refresh:()=>{a.invalidateQueries({queryKey:["workspace-list"]}),a.invalidateQueries({queryKey:["workspace-file",e]})}}}function uh(){let e=k(),t=pe(),n=ot()["*"]||E2,r=z2(n),s=h.default.useCallback(i=>{t(Uc(i))},[t]);return l`
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="v2-page-entrance flex-1 p-4 sm:p-6">
        <div className="flex h-full min-h-0 flex-col space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-white">${e("workspace.title")}</h1>
                <${z} tone="muted" label=${e("workspace.readOnly")} />
              </div>
              <p className="mt-0.5 text-sm text-iron-400">${e("workspace.subtitle")}</p>
            </div>
            <${T}
              variant="secondary"
              size="sm"
              onClick=${r.refresh}
              disabled=${r.isFetching}
            >
              ${r.isFetching?e("workspace.refreshing"):e("workspace.refresh")}
            <//>
          </div>

          ${r.error&&l`
            <div
              className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            >
              ${r.error.message}
            </div>
          `}
          <${Ga}
            result=${r.result}
            onDismiss=${r.clearResult}
          />

          <div
            className="grid min-h-0 flex-1 gap-5 xl:grid-cols-[340px_minmax(0,1fr)]"
          >
            <${j2}
              rootEntries=${r.rootEntries}
              selectedPath=${n}
              expandedPaths=${r.expandedPaths}
              filter=${r.filter}
              onFilterChange=${r.setFilter}
              isLoadingTree=${r.isLoadingTree}
              onToggleDirectory=${r.toggleDirectory}
              onSelectFile=${s}
            />
            ${r.selectionIsDirectory?l`
                  <${A2}
                    path=${n}
                    entries=${r.currentEntries}
                    isLoading=${r.isLoadingListing}
                    filter=${r.filter}
                    onOpen=${s}
                    onNavigate=${t}
                  />
                `:l`
                  <${F2}
                    path=${n}
                    file=${r.file}
                    isLoading=${r.isLoadingFile}
                    onNavigate=${t}
                  />
                `}
          </div>
        </div>
      </div>
    </div>
  `}function B2(e){if(!e)return null;let t=e.metadata&&typeof e.metadata=="object"&&!Array.isArray(e.metadata)?e.metadata:{};return{id:e.project_id,name:e.name,description:e.description,goals:Array.isArray(t.goals)?t.goals:[],icon:e.icon||null,color:e.color||null,state:e.state,role:e.role,metadata:t,created_at:e.created_at,updated_at:e.updated_at,health:e.state==="archived"?"muted":"green"}}async function q2(){let t=((await Tx({limit:200}))?.projects||[]).map(B2);return{attention:[],projects:t}}async function I2(e){if(!e)return null;let t=await Ax({projectId:e});return B2(t?.project)}function H2(e){return Promise.resolve({missions:[],todo:!0})}function K2(e){return Promise.resolve({threads:[],todo:!0})}function Q2(e){return Promise.resolve({widgets:[],todo:!0})}function V2(e){return Promise.resolve(null)}function G2(e){return Promise.resolve(null)}function Y2(e){return Promise.resolve({success:!1,message:"TODO: requires v2 missions endpoint"})}function J2(e){return Promise.resolve({success:!1,message:"TODO: requires v2 missions endpoint"})}function X2(e){return Promise.resolve({success:!1,message:"TODO: requires v2 missions endpoint"})}function Z2(){let e=ee(),t=H({queryKey:["projects-overview"],queryFn:q2,refetchInterval:5e3}),a=h.default.useCallback(()=>{e.invalidateQueries({queryKey:["projects-overview"]})},[e]);return{overview:t.data||{attention:[],projects:[]},isLoading:t.isLoading,isRefreshing:t.isFetching,error:t.error||null,invalidate:a}}function W2(e){let t=ee(),a=!!e,n=H({queryKey:["project-detail",e],queryFn:()=>I2(e),enabled:a,refetchInterval:a?7e3:!1}),r=H({queryKey:["project-missions",e],queryFn:()=>H2(e),enabled:a,refetchInterval:a?5e3:!1}),s=H({queryKey:["project-threads",e],queryFn:()=>K2(e),enabled:a,refetchInterval:a?4e3:!1}),i=H({queryKey:["project-widgets",e],queryFn:()=>Q2(e),enabled:a,refetchInterval:a?15e3:!1}),o=h.default.useCallback(()=>{t.invalidateQueries({queryKey:["projects-overview"]}),t.invalidateQueries({queryKey:["project-detail",e]}),t.invalidateQueries({queryKey:["project-missions",e]}),t.invalidateQueries({queryKey:["project-threads",e]}),t.invalidateQueries({queryKey:["project-widgets",e]})},[e,t]);return{project:n.data||null,missions:r.data?.missions||[],threads:s.data?.threads||[],widgets:i.data||[],isLoading:a&&(n.isLoading||r.isLoading||s.isLoading),isRefreshing:n.isFetching||r.isFetching||s.isFetching||i.isFetching,error:n.error||r.error||s.error||i.error||null,invalidate:o}}function eS({projectId:e,missionId:t,threadId:a}){let n=ee(),[r,s]=h.default.useState(null),i=H({queryKey:["project-mission-detail",t],queryFn:()=>V2(t),enabled:!!t,refetchInterval:t?5e3:!1}),o=H({queryKey:["project-thread-detail",a],queryFn:()=>G2(a),enabled:!!a,refetchInterval:a?4e3:!1}),u=h.default.useCallback(()=>{n.invalidateQueries({queryKey:["projects-overview"]}),n.invalidateQueries({queryKey:["project-detail",e]}),n.invalidateQueries({queryKey:["project-missions",e]}),n.invalidateQueries({queryKey:["project-threads",e]}),t&&n.invalidateQueries({queryKey:["project-mission-detail",t]}),a&&n.invalidateQueries({queryKey:["project-thread-detail",a]})},[t,e,n,a]),c=Y({mutationFn:({targetMissionId:f})=>Y2(f),onSuccess:f=>{s({type:"success",message:f?.thread_id?"Mission fired and a new run is live.":"Mission fire request accepted."}),u()},onError:f=>{s({type:"error",message:f.message||"Unable to fire mission"})}}),d=Y({mutationFn:({targetMissionId:f})=>J2(f),onSuccess:()=>{s({type:"success",message:"Mission paused."}),u()},onError:f=>{s({type:"error",message:f.message||"Unable to pause mission"})}}),m=Y({mutationFn:({targetMissionId:f})=>X2(f),onSuccess:()=>{s({type:"success",message:"Mission resumed."}),u()},onError:f=>{s({type:"error",message:f.message||"Unable to resume mission"})}});return{mission:i.data?.mission||null,thread:o.data?.thread||null,inspectorType:a?"thread":t?"mission":null,isLoading:i.isLoading||o.isLoading,isRefreshing:i.isFetching||o.isFetching,error:i.error||o.error||null,actionResult:r,clearActionResult:()=>s(null),fireMission:c.mutateAsync,pauseMission:d.mutateAsync,resumeMission:m.mutateAsync,isBusy:c.isPending||d.isPending||m.isPending}}function Bc(e){if(!e)return"No recent activity";let t=new Date(e),a=Date.now()-t.getTime(),n=Math.abs(a),r=a<0;if(n<6e4)return r?"in under a minute":"just now";if(n<36e5){let i=Math.floor(n/6e4);return r?`in ${i}m`:`${i}m ago`}if(n<864e5){let i=Math.floor(n/36e5);return r?`in ${i}h`:`${i}h ago`}let s=Math.floor(n/864e5);return r?`in ${s}d`:`${s}d ago`}function qc(e){return new Intl.NumberFormat(void 0,{style:"currency",currency:"USD",maximumFractionDigits:e>=100?0:2}).format(Number(e||0))}function tS(e){return e==="green"?"success":e==="yellow"?"warning":e==="red"?"danger":"muted"}function aS(e){return e==="Running"?"signal":e==="Done"||e==="Completed"?"success":e==="Failed"?"danger":"warning"}function R5(e){let t=String(e||"").trim();if(!t)return null;let a=t.match(/^#\s*Mission:\s*(.+?)\s+Goal:\s*([\s\S]+)$/i);if(a)return{missionName:a[1].trim(),missionBrief:a[2].trim()};let n=t.match(/^Mission:\s*(.+?)\s+Goal:\s*([\s\S]+)$/i);return n?{missionName:n[1].trim(),missionBrief:n[2].trim()}:null}function nS(e){let t=R5(e?.goal);return t?{title:t.missionName,subtitle:"Mission run",brief:t.missionBrief}:{title:e?.title||e?.goal||`Thread ${(e?.id||"").slice(0,8)}`,subtitle:e?.thread_type?String(e.thread_type).replace(/_/g," "):"Thread",brief:e?.title&&e?.goal&&e.title!==e.goal?e.goal:""}}function rS(e){let t=e?.projects||[],a=t.reduce((o,u)=>o+Number(u.cost_today_usd||0),0),n=t.reduce((o,u)=>o+Number(u.active_missions||0),0),r=t.reduce((o,u)=>o+Number(u.threads_today||0),0),s=t.reduce((o,u)=>o+Number(u.pending_gates||0),0),i=t.reduce((o,u)=>o+Number(u.failures_24h||0),0);return{totalProjects:t.length,activeMissions:n,threadsToday:r,totalSpend:a,pendingGates:s,failures24h:i,attentionCount:e?.attention?.length||0}}function Jo(e,t){return`${e} ${t}${e===1?"":"s"}`}var k5={projects:"muted",attention:"warning",spend:"success"};function sS({overview:e}){let t=rS(e),a=[{key:"projects",label:"Projects",value:t.totalProjects,detail:`${t.threadsToday} threads active today`},{key:"attention",label:"Attention queue",value:t.attentionCount,detail:`${t.failures24h} failures in the last 24h`},{key:"spend",label:"Spend today",value:qc(t.totalSpend),detail:`${t.totalProjects?"Across every project":"Waiting for activity"}`}];return l`
    <${q} className="p-4 sm:p-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        ${a.map(n=>l`
          <div key=${n.key} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-iron-300">${n.label}</div>
              <${z} tone=${k5[n.key]} label=${n.key} />
            </div>
            <div className="mt-4 text-3xl font-semibold tracking-tight text-white">${n.value}</div>
            <p className="mt-2 text-sm leading-6 text-iron-300">${n.detail}</p>
          </div>
        `)}
      </div>
    <//>
  `}function C5(e){return e?.type==="failure"?"danger":"warning"}function E5(e){return e?.type==="failure"?"failure":"gate"}function iS({items:e,onOpenItem:t}){return e?.length?l`
    <${q} className="overflow-hidden border-amber-300/10 p-0">
      <div className="border-b border-amber-300/10 px-5 py-4 sm:px-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-copper">Needs attention</div>
        <p className="mt-2 max-w-[70ch] text-sm leading-6 text-iron-200">
          Operator-visible gates and recent failures across your project workspace.
        </p>
      </div>
      <div className="grid gap-3 p-4 sm:p-5 xl:grid-cols-2">
        ${e.map(a=>l`
          <button
            key=${`${a.project_id}-${a.thread_id||a.message}`}
            onClick=${()=>t(a)}
            className="group rounded-2xl border border-white/10 bg-iron-950/55 p-4 text-left hover:border-signal/30 hover:bg-white/[0.05]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-white">${a.project_name}</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300">
                  ${a.thread_id?`Thread ${String(a.thread_id).slice(0,8)}`:"Project"}
                </div>
              </div>
              <${z} tone=${C5(a)} label=${E5(a)} />
            </div>
            <p className="mt-3 text-sm leading-6 text-iron-200">${a.message}</p>
            <div className="mt-4 text-xs uppercase tracking-[0.16em] text-signal group-hover:text-white">
              Open project
            </div>
          </button>
        `)}
      </div>
    <//>
  `:null}function T5({project:e,onOpen:t,t:a}){return l`
    <article
      onClick=${()=>t(e.id)}
      role="button"
      tabIndex=${0}
      onKeyDown=${n=>{n.currentTarget===n.target&&(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t(e.id))}}
      className="group cursor-pointer rounded-xl border border-iron-700 bg-iron-800/60 p-5 transition hover:border-signal/30 hover:bg-iron-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v2-accent)]/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-serif text-2xl font-semibold tracking-[-0.03em] text-iron-100">${e.name}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-iron-300">
            ${e.description||a("projects.noDescription")}
          </p>
        </div>
        <${z} tone=${tS(e.health)} label=${e.health||"unknown"} />
      </div>

      ${e.goals?.length?l`
            <div className="mt-4 flex flex-wrap gap-2">
              ${e.goals.slice(0,3).map((n,r)=>l`
                <span key=${r} className="rounded-full border border-iron-700 px-3 py-1 text-xs text-iron-200">
                  ${n}
                </span>
              `)}
            </div>
          `:null}

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-iron-700 bg-iron-950/55 p-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-iron-300">${a("projects.card.runtime")}</div>
          <div className="mt-2 text-sm text-iron-100">
            ${a("projects.card.threadsToday",{count:Jo(e.threads_today||0,"thread")})}
          </div>
        </div>
        <div className="rounded-2xl border border-iron-700 bg-iron-950/55 p-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-iron-300">${a("projects.card.risk")}</div>
          <div className="mt-2 text-sm text-iron-100">${Jo(e.pending_gates||0,"gate")}</div>
          <div className="mt-1 text-xs text-iron-300">
            ${a("projects.card.failures24h",{count:Jo(e.failures_24h||0,"failure")})}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="text-sm text-iron-300">
          <div>${a("projects.card.spendToday",{value:qc(e.cost_today_usd||0)})}</div>
          <div className="mt-1 text-xs uppercase tracking-[0.16em] text-iron-500">${Bc(e.last_activity)}</div>
        </div>
        <${T}
          variant="secondary"
          onClick=${n=>{n.stopPropagation(),t(e.id)}}
        >${a("projects.openWorkspace")}<//>
      </div>
    </article>
  `}function A5({project:e,onOpen:t,t:a}){return l`
    <${q}
      onClick=${()=>t(e.id)}
      role="button"
      tabIndex=${0}
      onKeyDown=${n=>{n.currentTarget===n.target&&(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t(e.id))}}
      className="cursor-pointer overflow-hidden p-5 transition hover:border-signal/30 sm:p-6"
    >
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">${a("projects.general.label")}</div>
          <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.04em] text-iron-100">${a("projects.general.title")}</h2>
          <p className="mt-3 text-sm leading-6 text-iron-200">
            ${a("projects.general.desc")}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="rounded-2xl border border-iron-700 bg-iron-950/55 px-4 py-3 text-sm text-iron-200">
            ${Jo(e.threads_today||0,"thread")} today
          </div>
          <${T}
            variant="secondary"
            onClick=${n=>{n.stopPropagation(),t(e.id)}}
          >${a("projects.openGeneralWorkspace")}<//>
        </div>
      </div>
    <//>
  `}function oS({projects:e,totalProjects:t,search:a,onSearchChange:n,onOpenProject:r,onCreateProject:s,isPreparingChat:i}){let o=k(),u=e.find(d=>d.name==="default"),c=e.filter(d=>d.name!=="default");return!e.length&&t>0?l`
      <${be}
        title=${o("projects.empty.noMatchTitle")}
        description=${o("projects.empty.noMatchDesc")}
      />
    `:e.length?l`
    <div className="space-y-5">
      ${u&&l`<${A5} project=${u} onOpen=${r} t=${o} />`}

      <${q} className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-iron-300">${o("projects.explorer")}</div>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-[-0.04em] text-iron-100">${o("projects.scoped.title")}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-iron-300">
              ${o("projects.scoped.desc")}
            </p>
          </div>
          <div className="flex gap-2">
            <input
              value=${a}
              onInput=${d=>n(d.target.value)}
              placeholder=${o("projects.searchPlaceholder")}
              className="h-11 min-w-[220px] rounded-md border border-iron-700 bg-iron-950/90 px-3 text-sm text-iron-100 outline-none focus:border-signal/45"
            />
            <${T} onClick=${s}>${o(i?"projects.preparingChat":"projects.newProject")}<//>
          </div>
        </div>
      <//>

      ${c.length?l`<div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
            ${c.map(d=>l`<${T5} key=${d.id} project=${d} onOpen=${r} t=${o} />`)}
          </div>`:l`
            <${be}
              title=${o("projects.scoped.onlyGeneralTitle")}
              description=${o("projects.scoped.onlyGeneralDesc")}
            >
              <${T} onClick=${s}>${o(i?"projects.preparingChat":"projects.startProject")}<//>
            <//>
          `}
    </div>
  `:l`
      <${be}
        title=${o("projects.empty.noneTitle")}
        description=${o("projects.empty.noneDesc")}
      >
        <${T} onClick=${s}>${o("projects.createFromChat")}<//>
      <//>
    `}function lS({threads:e,selectedThreadId:t,onSelectThread:a,onNewConversation:n,isStartingConversation:r}){let s=[...e].sort((i,o)=>new Date(o.updated_at||o.created_at)-new Date(i.updated_at||i.created_at));return l`
    <${q} className="p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-iron-300">Conversations</div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Project conversations</h2>
        </div>
        ${n&&l`
          <${T} onClick=${n} disabled=${r}>
            ${r?"Starting\u2026":"New conversation"}
          <//>
        `}
      </div>

      <div className="mt-5 space-y-3">
        ${s.length?s.slice(0,18).map(i=>{let o=nS(i);return l`
                <button
                  key=${i.id}
                  onClick=${()=>a(i.id)}
                  className=${["w-full rounded-[20px] border p-4 text-left",t===i.id?"border-signal/35 bg-signal/10":"border-white/10 bg-white/[0.025] hover:border-signal/25 hover:bg-white/[0.045]"].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-base font-semibold text-white">${o.title}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.16em] text-iron-400">${o.subtitle}</div>
                      ${o.brief?l`<p className="mt-3 line-clamp-2 text-sm leading-6 text-iron-300">${o.brief}</p>`:null}
                    </div>
                    <${z} tone=${aS(i.state)} label=${i.state} />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-400">
                    <span>${i.step_count||0} steps</span>
                    <span>${i.total_tokens||0} tokens</span>
                    <span>${Bc(i.updated_at||i.created_at)}</span>
                  </div>
                </button>
              `}):l`
              <div className="rounded-[20px] border border-dashed border-white/10 px-4 py-8 text-sm leading-6 text-iron-300">
                No project threads yet. When an automation runs or scoped chat work happens inside this project, activity will appear here.
              </div>
            `}
      </div>
    <//>
  `}var D5="/workspace";function M5(e){let t=a=>a.kind==="directory"?0:1;return[...e].sort((a,n)=>t(a)-t(n)||a.name.localeCompare(n.name,void 0,{sensitivity:"base"}))}function O5(e){return e?String(e).replace(/^\/workspace\/?/,"").split("/").filter(Boolean):[]}function uS({threadId:e}){let t=k(),[a,n]=h.default.useState(void 0),[r,s]=h.default.useState(null),i=H({queryKey:["project-files",e||"",a||""],queryFn:()=>Rx({threadId:e,path:a}),enabled:!!e}),o=h.default.useMemo(()=>M5(i.data?.entries||[]),[i.data]),u=h.default.useCallback(async m=>{if(m.kind==="directory"){s(null),n(m.path);return}try{s(null);let f=await ka(sc({threadId:e,path:m.path})),p=URL.createObjectURL(f),b=document.createElement("a");b.href=p,b.download=m.name,document.body.appendChild(b),b.click(),b.remove(),URL.revokeObjectURL(p)}catch(f){s(f?.message||"Unable to download file")}},[e]),c=O5(a),d=l`
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-iron-300">
          ${"Files"}
        </div>
        <${z} tone="muted" label=${t("workspace.readOnly")} />
      </div>
      <${T}
        variant="secondary"
        size="sm"
        onClick=${()=>i.refetch()}
        disabled=${!e||i.isFetching}
      >
        ${i.isFetching?t("workspace.refreshing"):t("workspace.refresh")}
      <//>
    </div>
  `;return e?l`
    <${q} className="p-4 sm:p-5">
      ${d}

      <div className="mt-3 flex min-w-0 flex-wrap items-center gap-1.5 font-mono text-xs text-iron-400">
        <button
          type="button"
          onClick=${()=>n(void 0)}
          className="text-signal hover:underline"
        >
          ${"workspace"}
        </button>
        ${c.map((m,f)=>{let p=`${D5}/${c.slice(0,f+1).join("/")}`;return l`
            <span key=${p} className="text-iron-500">/</span>
            <button
              key=${`${p}-button`}
              type="button"
              onClick=${()=>n(p)}
              className="max-w-[160px] truncate text-signal hover:underline"
            >
              ${m}
            </button>
          `})}
      </div>

      ${r&&l`
        <div className="mt-3 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
          ${r}
        </div>
      `}
      ${i.error&&l`
        <div className="mt-3 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
          ${i.error.message}
        </div>
      `}

      <div className="mt-3 space-y-1">
        ${i.isLoading?[1,2,3,4].map(m=>l`<div key=${m} className="v2-skeleton h-9 rounded-[12px]" />`):o.length?o.map(m=>l`
                <button
                  key=${m.path}
                  type="button"
                  onClick=${()=>u(m)}
                  className="flex w-full items-center gap-3 rounded-[12px] border border-transparent px-3 py-2 text-left hover:border-white/10 hover:bg-white/[0.04]"
                >
                  <${M}
                    name=${m.kind==="directory"?"folder":"file"}
                    className="h-4 w-4 shrink-0 text-iron-300"
                  />
                  <span className="min-w-0 flex-1 truncate text-sm text-white">${m.name}</span>
                  ${m.kind==="directory"?l`<${M} name="chevron" className="h-3.5 w-3.5 shrink-0 -rotate-90 text-iron-500" />`:l`<${M} name="download" className="h-3.5 w-3.5 shrink-0 text-iron-500" />`}
                </button>
              `):l`
              <div className="rounded-[16px] border border-dashed border-white/10 px-4 py-8 text-sm leading-6 text-iron-300">
                ${"This folder is empty."}
              </div>
            `}
      </div>
    <//>
  `:l`
      <${q} className="p-4 sm:p-5">
        ${d}
        <div className="mt-4 rounded-[16px] border border-dashed border-white/10 px-4 py-8 text-sm leading-6 text-iron-300">
          ${"No files yet \u2014 they appear once a thread has run in this project."}
        </div>
      <//>
    `}function L5(e){return[...e||[]].sort((a,n)=>new Date(n.updated_at||n.created_at)-new Date(a.updated_at||a.created_at))[0]?.id||null}function cS({project:e,threads:t,selectedThreadId:a,onSelectThread:n,onNewConversation:r,isStartingConversation:s}){let i=L5(t);return l`
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
      <div className="space-y-5">
        <div className="min-w-0">
          <h2 className="text-2xl font-semibold tracking-tight text-white">${e.name}</h2>
          ${e.description?l`<p className="mt-1 text-sm leading-6 text-iron-300">${e.description}</p>`:null}
        </div>

        <${lS}
          threads=${t}
          selectedThreadId=${a}
          onSelectThread=${n}
          onNewConversation=${r}
          isStartingConversation=${s}
        />
      </div>

      <${uS} threadId=${i} />
    </div>
  `}function Xo(){let e=k(),t=pe(),{threadsState:a}=Ha(),{projectId:n=null,threadId:r=null}=ot(),[s,i]=h.default.useState(""),[o,u]=h.default.useState(null),c=Z2(),d=W2(n),m=eS({projectId:n,threadId:r}),f=h.default.useMemo(()=>{let C=s.trim().toLowerCase();return C?c.overview.projects.filter(E=>[E.name,E.description,...E.goals||[]].some(O=>String(O||"").toLowerCase().includes(C))):c.overview.projects},[c.overview.projects,s]),p=h.default.useMemo(()=>c.overview.projects.find(C=>C.id===n)||null,[c.overview.projects,n]),b=h.default.useCallback(()=>{c.invalidate(),d.invalidate()},[c,d]),y=h.default.useCallback(C=>{t(`/projects/${C}`)},[t]),x=h.default.useCallback(C=>{if(C.thread_id){t(`/projects/${C.project_id}/threads/${C.thread_id}`);return}t(`/projects/${C.project_id}`)},[t]),g=h.default.useCallback(async()=>{let C=null;u(null);try{C=await a.createThread()}catch(E){u({type:"error",message:E.message||e("projects.chatAutoFail")})}t("/chat",{state:{composerDraft:e("projects.creationDraft"),threadId:C}})},[t,a]),v=h.default.useCallback(C=>{t(`/projects/${n}/threads/${C}`)},[t,n]),$=h.default.useCallback(async()=>{u(null);try{let C=await a.createThread(n);t("/chat",{state:{threadId:C}}),d.invalidate()}catch(C){u({type:"error",message:C.message||e("projects.chatAutoFail")})}},[t,a,n,d,e]),w=h.default.useCallback(()=>{t(`/projects/${n}`)},[t,n]),S=l`
    ${n&&l`<${T} variant="ghost" onClick=${()=>t("/projects")}>${e("projects.allProjects")}<//>`}
  `,R=null;return n?d.isLoading?R=l`
        <div className="space-y-4">
          ${[1,2,3].map(C=>l`<div key=${C} className="v2-skeleton h-48 rounded-[20px]" />`)}
        </div>
      `:d.error||!d.project&&!p?R=l`
        <${be}
          title=${e("projects.unavailable")}
          description=${d.error?.message||e("projects.unavailableDesc")}
        >
          <${T} variant="secondary" onClick=${()=>t("/projects")}>${e("projects.returnToProjects")}<//>
        <//>
      `:R=l`
        <${cS}
          project=${d.project||p}
          threads=${d.threads}
          selectedThreadId=${r}
          onSelectThread=${v}
          onNewConversation=${$}
          isStartingConversation=${a.isCreating}
        />
      `:R=c.isLoading?l`
          <div className="space-y-4">
            ${[1,2,3].map(C=>l`<div key=${C} className="v2-skeleton h-40 rounded-[20px]" />`)}
          </div>
        `:l`
          <${oS}
            projects=${f}
            totalProjects=${c.overview.projects.length}
            search=${s}
            onSearchChange=${i}
            onOpenProject=${y}
            onCreateProject=${g}
            isPreparingChat=${a.isCreating}
          />
        `,l`
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="v2-page-entrance flex-1 p-4 sm:p-6">
        <div className="space-y-5">
          <div className="flex flex-wrap justify-end gap-2">
            ${S}
          </div>
          ${c.error&&l`
            <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              ${c.error.message}
            </div>
          `}
          <${Ga} result=${o} onDismiss=${()=>u(null)} />
          <${Ga} result=${m.actionResult} onDismiss=${m.clearActionResult} />
          ${!n&&l`
            <${sS} overview=${c.overview} />
            <${iS} items=${c.overview.attention} onOpenItem=${x} />
          `}
          ${R}
        </div>
      </div>
    </div>
  `}function Zo(e,t={}){return e?new Date(e).toLocaleString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",...t}):"Not scheduled"}function Wo(e){return e==="Active"?"signal":e==="Paused"?"warning":e==="Completed"?"success":e==="Failed"?"danger":"muted"}function dS(e=[]){return e.reduce((t,a)=>(t.total+=1,a.status==="Active"?t.active+=1:a.status==="Paused"?t.paused+=1:a.status==="Completed"?t.completed+=1:a.status==="Failed"&&(t.failed+=1),t.threads+=Number(a.thread_count||a.threads?.length||0),t),{total:0,active:0,paused:0,completed:0,failed:0,threads:0})}function mS(e=[]){let t={Active:0,Paused:1,Failed:2,Completed:3};return[...e].sort((a,n)=>{let r=(t[a.status]??4)-(t[n.status]??4);return r!==0?r:new Date(n.updated_at||0).getTime()-new Date(a.updated_at||0).getTime()})}function Ic({label:e,value:t}){return l`
    <div className="rounded-xl border border-white/8 bg-iron-950/60 p-3">
      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-iron-300">${e}</div>
      <div className="mt-2 text-sm leading-6 text-white">${t}</div>
    </div>
  `}function P5({mission:e,isBusy:t,onFire:a,onPause:n,onResume:r}){let s=k();return e.status==="Active"?l`
      <${T} onClick=${()=>a(e.id)} disabled=${t}>${s("missions.action.fireNow")}<//>
      <${T} variant="secondary" onClick=${()=>n(e.id)} disabled=${t}>${s("missions.action.pause")}<//>
    `:e.status==="Paused"?l`
      <${T} onClick=${()=>r(e.id)} disabled=${t}>${s("missions.action.resume")}<//>
      <${T} variant="secondary" onClick=${()=>a(e.id)} disabled=${t}>${s("missions.action.runOnce")}<//>
    `:l`<${T} onClick=${()=>a(e.id)} disabled=${t}>${s("missions.action.runAgain")}<//>`}function fS({mission:e,isLoading:t,error:a,isBusy:n,onFire:r,onPause:s,onResume:i,onOpenProject:o,onOpenThread:u}){let c=k();return t?l`
      <div className="space-y-4">
        ${[1,2,3].map(d=>l`<div key=${d} className="v2-skeleton h-36 rounded-xl" />`)}
      </div>
    `:a||!e?l`
      <${be}
        title=${c("missions.unavailable")}
        description=${a?.message||c("missions.unavailableDesc")}
      />
    `:l`
    <div className="space-y-4">
      <${q} className="p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-iron-300">${c("missions.dossier")}</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">${e.name}</h2>
            ${e.project&&l`
              <button
                type="button"
                onClick=${()=>o(e.project.id)}
                className="mt-2 text-sm text-signal underline-offset-4 hover:underline"
              >
                ${e.project.name}
              </button>
            `}
          </div>
          <${z} tone=${Wo(e.status)} label=${e.status} />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <${Ic} label=${c("missions.meta.cadence")} value=${e.cadence_description||e.cadence_type||c("missions.meta.manual")} />
          <${Ic} label=${c("missions.meta.threadsToday")} value=${`${e.threads_today||0} / ${e.max_threads_per_day||c("missions.meta.unlimited")}`} />
          <${Ic} label=${c("missions.meta.nextFire")} value=${Zo(e.next_fire_at)} />
          <${Ic} label=${c("missions.meta.updated")} value=${Zo(e.updated_at)} />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <${P5}
            mission=${e}
            isBusy=${n}
            onFire=${r}
            onPause=${s}
            onResume=${i}
          />
        </div>
      <//>

      <${q} className="p-4 sm:p-5">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-iron-300">${c("missions.brief")}</div>
        <div className="mt-4 text-sm leading-6 text-iron-200">
          <${oa} content=${e.goal||c("missions.noGoal")} />
        </div>
      <//>

      ${e.current_focus&&l`
        <${q} className="p-4 sm:p-5">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-iron-300">${c("missions.currentFocus")}</div>
          <div className="mt-4 text-sm leading-6 text-iron-200">
            <${oa} content=${e.current_focus} />
          </div>
        <//>
      `}

      ${e.success_criteria&&l`
        <${q} className="p-4 sm:p-5">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-iron-300">${c("missions.successCriteria")}</div>
          <div className="mt-4 text-sm leading-6 text-iron-200">
            <${oa} content=${e.success_criteria} />
          </div>
        <//>
      `}

      ${e.threads?.length?l`
        <${q} className="p-4 sm:p-5">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-iron-300">${c("missions.spawnedThreads")}</div>
          <div className="mt-4 space-y-3">
            ${e.threads.map(d=>l`
              <button
                key=${d.id}
                type="button"
                onClick=${()=>u(d)}
                className="w-full rounded-xl border border-white/8 bg-iron-950/60 p-4 text-left hover:border-signal/30 hover:bg-white/[0.05]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 truncate text-sm font-semibold text-white">${d.title||d.goal}</div>
                  <${z} tone=${Wo(d.state==="Running"?"Active":d.state==="Failed"?"Failed":"Completed")} label=${d.state} />
                </div>
              </button>
            `)}
          </div>
        <//>
      `:null}
    </div>
  `}function j5(e){return[{value:"all",label:e("missions.filter.allStatuses")},{value:"Active",label:e("missions.status.active")},{value:"Paused",label:e("missions.status.paused")},{value:"Failed",label:e("missions.status.failed")},{value:"Completed",label:e("missions.status.completed")}]}function pS({value:e,onChange:t,children:a,label:n}){return l`
    <label className="min-w-[160px] flex-1 sm:flex-none">
      <span className="sr-only">${n}</span>
      <select
        value=${e}
        onChange=${r=>t(r.target.value)}
        className="v2-select h-11 w-full rounded-md border border-iron-700 bg-iron-800/70 px-3 text-sm text-iron-100 outline-none focus:border-signal/40"
      >
        ${a}
      </select>
    </label>
  `}function U5({mission:e,selectedMissionId:t,onSelectMission:a,onOpenProject:n}){let r=k(),s=t===e.id;return l`
    <div
      className=${["w-full rounded-xl border p-4 text-left",s?"border-signal/35 bg-signal/10":"border-iron-700 bg-iron-800/50 hover:border-signal/25 hover:bg-iron-800/80"].join(" ")}
    >
      <button type="button" onClick=${()=>a(e.id)} className="block w-full text-left">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <div className="min-w-0 truncate text-lg font-semibold text-iron-100">${e.name}</div>
              <${z} tone=${Wo(e.status)} label=${e.status} />
            </div>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-iron-300">${e.goal||r("missions.noGoal")}</p>
          </div>
          <div className="shrink-0 text-right font-mono text-[11px] uppercase tracking-[0.14em] text-iron-400">
            <div>${e.cadence_description||e.cadence_type||"manual"}</div>
            <div className="mt-1">${r("missions.threadCount",{count:e.thread_count||0})}</div>
          </div>
        </div>
      </button>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-iron-700 pt-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-iron-400">
          ${r("missions.updated",{value:Zo(e.updated_at)})}
        </span>
        <${T}
          variant="ghost"
          onClick=${i=>{i.stopPropagation(),n(e.project.id)}}
        >
          ${e.project.name}
        <//>
      </div>
    </div>
  `}function ch({missions:e,totalMissions:t,selectedMissionId:a,search:n,onSearchChange:r,statusFilter:s,onStatusFilterChange:i,projectFilter:o,onProjectFilterChange:u,projectOptions:c,onSelectMission:d,onOpenProject:m}){let f=k(),p=j5(f);return l`
    <${q} className="p-4 sm:p-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-iron-300">${f("missions.title")}</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-iron-100">${f("missions.subtitle")}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-iron-300">
            ${f("missions.summary",{missions:t,projects:c.length})}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <input
          value=${n}
          onChange=${b=>r(b.target.value)}
          placeholder=${f("missions.searchPlaceholder")}
          className="h-11 min-w-[220px] flex-1 rounded-md border border-iron-700 bg-iron-800/70 px-3 text-sm text-iron-100 outline-none placeholder:text-iron-400 focus:border-signal/40"
        />
        <${pS} value=${s} onChange=${i} label=${f("missions.filter.status")}>
          ${p.map(b=>l`<option key=${b.value} value=${b.value}>${b.label}<//>`)}
        <//>
        <${pS} value=${o} onChange=${u} label=${f("missions.filter.project")}>
          <option value="all">${f("missions.filter.allProjects")}</option>
          ${c.map(b=>l`<option key=${b.id} value=${b.id}>${b.name}<//>`)}
        <//>
      </div>

      <div className="mt-5 space-y-3">
        ${e.length?e.map(b=>l`
              <${U5}
                key=${b.id}
                mission=${b}
                selectedMissionId=${a}
                onSelectMission=${d}
                onOpenProject=${m}
              />
            `):l`
              <${be}
                title=${f("missions.emptyTitle")}
                description=${f("missions.emptyDesc")}
                boxed=${!1}
              />
            `}
      </div>
    <//>
  `}function F5(e){return[{key:"total",label:e("missions.summary.totalMissions"),tone:"muted"},{key:"active",label:e("missions.summary.active"),tone:"signal"},{key:"paused",label:e("missions.summary.paused"),tone:"warning"},{key:"threads",label:e("missions.summary.spawnedThreads"),tone:"success"}]}function hS({summary:e}){let t=k(),a=F5(t);return l`
    <${q} className="p-4 sm:p-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        ${a.map(n=>l`
          <div key=${n.key} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-iron-300">${n.label}</div>
              <${z} tone=${n.tone} label=${n.key} />
            </div>
            <div className="mt-4 text-3xl font-semibold tracking-tight text-white">${e[n.key]||0}</div>
            <p className="mt-2 text-sm leading-6 text-iron-300">
              ${n.key==="total"?t("missions.summary.completedFailed",{completed:e.completed||0,failed:e.failed||0}):t("missions.summary.acrossProjects")}
            </p>
          </div>
        `)}
      </div>
    <//>
  `}function vS(){return Promise.resolve({projects:[],todo:!0})}function gS({projectId:e}={}){return Promise.resolve({missions:[],todo:!0})}function yS(e){return Promise.resolve(null)}function bS(e){return Promise.resolve({success:!1,message:"TODO: requires v2 missions endpoint"})}function xS(e){return Promise.resolve({success:!1,message:"TODO: requires v2 missions endpoint"})}function $S(e){return Promise.resolve({success:!1,message:"TODO: requires v2 missions endpoint"})}function wS(e){let t=H({queryKey:["mission-detail",e],queryFn:()=>yS(e),enabled:!!e,refetchInterval:e?5e3:!1});return{mission:t.data?.mission||null,isLoading:t.isLoading,isRefreshing:t.isFetching,error:t.error||null}}function z5(e,t){return{...e,project:{id:t.id,name:t.name,health:t.health}}}function SS(){let e=ee(),[t,a]=h.default.useState(null),n=H({queryKey:["projects-overview"],queryFn:vS,refetchInterval:7e3}),r=n.data?.projects||[],s=bd({queries:r.map(f=>({queryKey:["missions","project",f.id],queryFn:()=>gS({projectId:f.id}),refetchInterval:5e3,select:p=>p?.missions||[]}))}),i=s.flatMap((f,p)=>{let b=r[p];return(f.data||[]).map(y=>z5(y,b))}),o=h.default.useCallback(()=>{e.invalidateQueries({queryKey:["projects-overview"]}),e.invalidateQueries({queryKey:["missions"]}),e.invalidateQueries({queryKey:["mission-detail"]})},[e]),u=(f,p)=>({mutationFn:({missionId:b})=>f(b),onSuccess:()=>{a({type:"success",message:p}),o()},onError:b=>{a({type:"error",message:b.message||"Unable to update mission"})}}),c=Y(u(bS,"Mission fired and a run was queued.")),d=Y(u(xS,"Mission paused.")),m=Y(u($S,"Mission resumed."));return{projects:r,missions:i,summary:dS(i),isLoading:n.isLoading||s.some(f=>f.isLoading),isRefreshing:n.isFetching||s.some(f=>f.isFetching),error:n.error||s.find(f=>f.error)?.error||null,actionResult:t,clearActionResult:()=>a(null),fireMission:c.mutateAsync,pauseMission:d.mutateAsync,resumeMission:m.mutateAsync,isBusy:c.isPending||d.isPending||m.isPending,invalidate:o}}function dh(){let e=k(),t=pe(),{missionId:a=null}=ot(),[n,r]=h.default.useState(""),[s,i]=h.default.useState("all"),[o,u]=h.default.useState("all"),c=SS(),d=wS(a),m=h.default.useMemo(()=>{let g=n.trim().toLowerCase();return mS(c.missions).filter(v=>{let $=!g||[v.name,v.goal,v.project?.name].some(R=>String(R||"").toLowerCase().includes(g)),w=s==="all"||v.status===s,S=o==="all"||v.project?.id===o;return $&&w&&S})},[c.missions,o,n,s]),f=h.default.useMemo(()=>c.missions.find(g=>g.id===a)||null,[a,c.missions]),p=d.mission?{...f,...d.mission,project:f?.project||null}:f,b=h.default.useCallback(g=>{g.project_id&&t(`/projects/${g.project_id}/threads/${g.id}`)},[t]),y=h.default.useCallback(async(g,v)=>{try{await g({missionId:v})}catch{}},[]),x=a?l`
        <div
          className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)]"
        >
          <${ch}
            missions=${m}
            totalMissions=${c.missions.length}
            selectedMissionId=${a}
            search=${n}
            onSearchChange=${r}
            statusFilter=${s}
            onStatusFilterChange=${i}
            projectFilter=${o}
            onProjectFilterChange=${u}
            projectOptions=${c.projects}
            onSelectMission=${g=>t(`/missions/${g}`)}
            onOpenProject=${g=>t(`/projects/${g}`)}
          />
          <${fS}
            mission=${p}
            isLoading=${d.isLoading}
            error=${d.error}
            isBusy=${c.isBusy}
            onFire=${g=>y(c.fireMission,g)}
            onPause=${g=>y(c.pauseMission,g)}
            onResume=${g=>y(c.resumeMission,g)}
            onOpenProject=${g=>t(`/projects/${g}`)}
            onOpenThread=${b}
          />
        </div>
      `:l`
        <${ch}
          missions=${m}
          totalMissions=${c.missions.length}
          selectedMissionId=${a}
          search=${n}
          onSearchChange=${r}
          statusFilter=${s}
          onStatusFilterChange=${i}
          projectFilter=${o}
          onProjectFilterChange=${u}
          projectOptions=${c.projects}
          onSelectMission=${g=>t(`/missions/${g}`)}
          onOpenProject=${g=>t(`/projects/${g}`)}
        />
      `;return l`
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="v2-page-entrance flex-1 p-4 sm:p-6">
        <div className="space-y-5">
          ${a&&l`<div className="flex flex-wrap justify-end gap-2">
            <${T}
              variant="ghost"
              onClick=${()=>t("/missions")}
              >${e("missions.allMissions")}<//
            >
          </div>`}

          ${c.error&&l`
            <div
              className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            >
              ${c.error.message}
            </div>
          `}

          <${Ga}
            result=${c.actionResult}
            onDismiss=${c.clearActionResult}
          />
          <${hS} summary=${c.summary} />

          ${c.isLoading?l`
                <div className="space-y-4">
                  ${[1,2,3].map(g=>l`<div
                        key=${g}
                        className="v2-skeleton h-32 rounded-xl"
                      />`)}
                </div>
              `:x}
        </div>
      </div>
    </div>
  `}var NS=[{id:"overview",label:"Overview"},{id:"activity",label:"Activity"},{id:"files",label:"Files"}],B5=new Set(["pending","in_progress"]),_S=new Set(["failed","interrupted","stuck","cancelled"]);function nr(e){return e?String(e).replace(/_/g," "):"unknown"}function oi(e){return e?e==="completed"||e==="accepted"||e==="submitted"?"success":e==="in_progress"?"signal":e==="pending"?"warning":_S.has(e)?"danger":"muted":"muted"}function q5(e){return B5.has(e)}function Hc(e){return q5(e?.state)}function RS(e){return e?.can_restart?e.job_kind==="sandbox"?e.state==="failed"||e.state==="interrupted":_S.has(e.state):!1}function qr(e,t=8){return e?String(e).slice(0,t):"unknown"}function la(e,t={}){return e?new Date(e).toLocaleString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",...t}):"Not available"}function kS(e){if(e==null)return"Not available";if(e<60)return`${e}s`;let t=Math.floor(e/60),a=e%60;return t<60?`${t}m ${a}s`:`${Math.floor(t/60)}h ${t%60}m`}function mh(e){return[e?.job_kind?`${e.job_kind} job`:null,e?.job_mode?e.job_mode.replace(/^acp:/,"acp "):null,e?.started_at?`started ${la(e.started_at)}`:null].filter(Boolean).join(" / ")}var I5=[{value:"all",label:"All events"},{value:"message",label:"Messages"},{value:"tool_use",label:"Tool calls"},{value:"tool_result",label:"Tool results"},{value:"status",label:"Status"},{value:"result",label:"Final results"}];function CS(e){if(typeof e=="string")return e;try{return JSON.stringify(e,null,2)}catch{return String(e)}}function H5({event:e}){let{event_type:t,data:a}=e;return t==="tool_use"||t==="tool_result"?l`
      <details className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <summary className="cursor-pointer list-none text-sm font-semibold text-white">
          ${t==="tool_use"?a.tool_name||"Tool call":a.tool_name||"Tool result"}
        </summary>
        <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-md bg-iron-950/90 p-3 font-mono text-xs leading-6 text-iron-200">${CS(t==="tool_use"?a.input:a.output||a.error||a)}</pre>
      </details>
    `:t==="message"?l`
      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300">${a.role||"assistant"}</div>
        <div className="mt-2 text-sm leading-6 text-iron-100">${a.content||""}</div>
      </div>
    `:l`
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300">${t.replace(/_/g," ")}</div>
      <div className="mt-2 text-sm leading-6 text-iron-100">${a.message||a.status||CS(a)}</div>
    </div>
  `}function ES({job:e,events:t,onSendPrompt:a,isSendingPrompt:n}){let r=k(),[s,i]=h.default.useState("all"),[o,u]=h.default.useState(""),[c,d]=h.default.useState(!0),m=h.default.useRef(null),f=h.default.useMemo(()=>s==="all"?t:t.filter(b=>b.event_type===s),[t,s]);h.default.useEffect(()=>{c&&m.current&&(m.current.scrollTop=m.current.scrollHeight)},[c,f.length]);let p=h.default.useCallback(async(b=!1)=>{let y=o.trim();if(!(!y&&!b))try{await a({content:y||"(done)",done:b}),u("")}catch{}},[o,a]);return l`
    <${q} className="p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-iron-300">Event stream</div>
          <h3 className="mt-2 text-xl font-semibold text-white">Job activity</h3>
          <p className="mt-2 text-sm leading-6 text-iron-300">Persisted events are refreshed automatically so operators can follow tool calls, prompts, and worker output.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value=${s}
            onChange=${b=>i(b.target.value)}
            className="v2-select h-10 rounded-md border border-white/10 bg-iron-950/90 px-3 text-sm text-white outline-none focus:border-signal/45"
          >
            ${I5.map(b=>l`<option key=${b.value} value=${b.value}>${b.label}</option>`)}
          </select>
          <label className="flex items-center gap-2 text-sm text-iron-300">
            <input type="checkbox" checked=${c} onChange=${b=>d(b.target.checked)} />
            Auto-scroll
          </label>
        </div>
      </div>

      <div ref=${m} className="mt-5 max-h-[56vh] space-y-3 overflow-y-auto rounded-[18px] border border-white/10 bg-iron-950/78 p-4">
        ${f.length?f.map(b=>l`
              <div key=${b.id||`${b.event_type}-${b.created_at}`}>
                <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300">${la(b.created_at)}</div>
                <${H5} event=${b} />
              </div>
            `):l`
              <${be}
                title=${r("job.noActivityTitle")}
                description=${r("job.noActivityDesc")}
              />
            `}
      </div>

      ${e.can_prompt&&l`
        <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto]">
          <input
            value=${o}
            onInput=${b=>u(b.target.value)}
            onKeyDown=${b=>{b.key==="Enter"&&!b.shiftKey&&(b.preventDefault(),p(!1))}}
            placeholder=${r("job.followupPlaceholder")}
            className="h-11 rounded-md border border-white/10 bg-iron-950/90 px-3 text-sm text-white outline-none focus:border-signal/45"
          />
          <${T} variant="secondary" disabled=${n} onClick=${()=>p(!0)}>${r("common.done")}<//>
          <${T} variant="primary" disabled=${n} onClick=${()=>p(!1)}>${r("common.send")}<//>
        </div>
      `}
    <//>
  `}function TS({job:e,activeTab:t,onTabChange:a,onBack:n,onCancel:r,onRestart:s,isBusy:i,children:o}){return l`
    <div className="space-y-5">
      <${q} className="p-5 sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0">
            <button onClick=${n} className="text-sm text-signal hover:text-white">Back to all jobs</button>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-semibold tracking-tight text-white">${e.title||"Untitled job"}</h2>
              <${z} tone=${oi(e.state)} label=${nr(e.state)} />
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300">
              <span>${qr(e.id)}</span>
              <span>created ${la(e.created_at)}</span>
              ${mh(e)&&l`<span>${mh(e)}</span>`}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            ${e.browse_url&&l`
              <a
                href=${e.browse_url}
                target="_blank"
                rel="noreferrer noopener"
                className="v2-button inline-flex h-10 items-center rounded-md border border-white/12 bg-white/[0.04] px-4 text-sm font-semibold text-iron-100 hover:border-signal/45 hover:bg-signal/10"
              >
                Browse files
              </a>
            `}
            ${Hc(e)&&l`
              <${T} variant="secondary" disabled=${i} onClick=${()=>r(e.id)}>Cancel<//>
            `}
            ${RS(e)&&l`
              <${T} variant="primary" disabled=${i} onClick=${()=>s(e.id)}>Restart<//>
            `}
          </div>
        </div>
      <//>

      <div className="flex flex-wrap gap-2">
        ${NS.map(u=>l`
          <button
            key=${u.id}
            onClick=${()=>a(u.id)}
            className=${["v2-button rounded-full border px-4 py-2 text-sm",t===u.id?"border-signal/35 bg-signal/12 text-white":"border-white/10 bg-white/[0.03] text-iron-300 hover:border-signal/25 hover:text-white"].join(" ")}
          >
            ${u.label}
          </button>
        `)}
      </div>

      ${o}
    </div>
  `}function AS({nodes:e,depth:t=0,selectedPath:a,expandingPath:n,onToggleDirectory:r,onSelectPath:s}){return l`
    ${e.map(i=>l`
      <div key=${i.path}>
        <button
          onClick=${()=>i.isDir?r(i.path):s(i.path)}
          className=${["flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm",a===i.path?"bg-signal/10 text-white":"text-iron-200 hover:bg-white/[0.05]"].join(" ")}
          style=${{paddingLeft:`${t*18+12}px`}}
        >
          <span className="w-4 text-center text-iron-300">
            ${i.isDir?n===i.path?"...":i.expanded?"v":">":"\xB7"}
          </span>
          <span className=${i.isDir?"font-medium":""}>${i.name}</span>
        </button>
        ${i.isDir&&i.expanded&&i.children?.length?l`<${AS}
              nodes=${i.children}
              depth=${t+1}
              selectedPath=${a}
              expandingPath=${n}
              onToggleDirectory=${r}
              onSelectPath=${s}
            />`:null}
      </div>
    `)}
  `}function DS({canBrowse:e,tree:t,selectedPath:a,selectedFile:n,fileError:r,isLoadingTree:s,isLoadingFile:i,expandingPath:o,treeError:u,onToggleDirectory:c,onSelectPath:d}){return e?l`
    <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
      <${q} className="min-h-[440px] p-4">
        <div className="border-b border-white/10 px-2 pb-3">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-iron-300">Workspace tree</div>
          <p className="mt-2 text-sm leading-6 text-iron-300">Browse the sandbox output and inspect generated files inline.</p>
        </div>

        <div className="mt-3 max-h-[60vh] overflow-y-auto">
          ${u&&l`<div className="mx-2 mb-3 rounded-md border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">${u}</div>`}
          ${s?l`<div className="space-y-2 px-2">${[1,2,3,4].map(m=>l`<div key=${m} className="v2-skeleton h-8 rounded-md" />`)}</div>`:t.length?l`
                  <${AS}
                    nodes=${t}
                    selectedPath=${a}
                    expandingPath=${o}
                    onToggleDirectory=${c}
                    onSelectPath=${d}
                  />
                `:l`<div className="px-2 py-6 text-sm text-iron-300">No files were recorded for this workspace.</div>`}
        </div>
      <//>

      <${q} className="min-h-[440px] p-5 sm:p-6">
        <div className="border-b border-white/10 pb-3">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-iron-300">File preview</div>
          <p className="mt-2 break-all text-sm leading-6 text-iron-300">${n?.path||a||"Select a file from the tree to inspect its contents."}</p>
        </div>

        ${r&&!i?l`<div className="mt-5 rounded-md border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">${r}</div>`:i?l`<div className="mt-5 space-y-3">${[1,2,3,4,5].map(m=>l`<div key=${m} className="v2-skeleton h-4 rounded" />`)}</div>`:n?l`<pre className="mt-5 max-h-[60vh] overflow-auto whitespace-pre-wrap rounded-[18px] border border-white/10 bg-iron-950/90 p-4 font-mono text-xs leading-6 text-iron-100">${n.content}</pre>`:l`
                <${be}
                  title="No file selected"
                  description="Pick a concrete file from the workspace tree to render it here."
                />
              `}
      <//>
    </div>
  `:l`
      <${be}
        title="No project workspace"
        description="File browsing is only available for sandbox jobs that produced a mounted project directory."
      />
    `}function li({label:e,value:t}){return l`
    <div className="border-t border-white/10 py-4">
      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300">${e}</div>
      <div className="mt-2 text-sm leading-6 text-white">${t||"Not available"}</div>
    </div>
  `}function MS({job:e}){let t=(e.transitions||[]).map(a=>({title:`${nr(a.from)} -> ${nr(a.to)}`,description:[la(a.timestamp),a.reason].filter(Boolean).join(" / ")}));return l`
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
      <${q} className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-iron-300">Execution context</div>
            <h3 className="mt-2 text-xl font-semibold text-white">Timing, state, and runtime shape</h3>
          </div>
          <${z} tone=${oi(e.state)} label=${nr(e.state)} />
        </div>

        <div className="mt-5 grid gap-x-6 md:grid-cols-2">
          <${li} label="Created" value=${la(e.created_at)} />
          <${li} label="Started" value=${la(e.started_at)} />
          <${li} label="Completed" value=${la(e.completed_at)} />
          <${li} label="Duration" value=${kS(e.elapsed_secs)} />
          <${li} label="Kind" value=${e.job_kind?`${e.job_kind} job`:null} />
          <${li} label="Mode" value=${e.job_mode||"Default worker"} />
        </div>
      <//>

      <div className="space-y-5">
        <${q} className="p-5 sm:p-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-iron-300">Description</div>
          <h3 className="mt-2 text-xl font-semibold text-white">Mission brief</h3>
          ${e.description?l`<${oa} content=${e.description} className="mt-4 text-sm leading-7 text-iron-200" />`:l`<p className="mt-4 text-sm leading-6 text-iron-300">This job did not record a long-form description.</p>`}
        <//>

        ${t.length?l`
              <${q} className="p-5 sm:p-6">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-iron-300">Transitions</div>
                <h3 className="mt-2 text-xl font-semibold text-white">State timeline</h3>
                <div className="mt-3">
                  <${k2} items=${t} />
                </div>
              <//>
            `:l`
              <${be}
                title="No state history yet"
                description="Transitions appear here once the job advances or records a recovery event."
              />
            `}
      </div>
    </div>
  `}function OS({jobs:e,totalJobs:t,selectedJobId:a,search:n,onSearchChange:r,stateFilter:s,onStateFilterChange:i,onSelectJob:o,onCancelJob:u,isBusy:c,isRefreshing:d}){let m=k(),f=[{value:"all",label:m("jobs.list.filter.all")},{value:"pending",label:m("jobs.list.filter.pending")},{value:"in_progress",label:m("jobs.list.filter.inProgress")},{value:"completed",label:m("jobs.list.filter.completed")},{value:"failed",label:m("jobs.list.filter.failed")},{value:"stuck",label:m("jobs.list.filter.stuck")}];if(!e.length){let p=!!n.trim()||s!=="all";return l`
      <${be}
        title=${m(t&&p?"jobs.list.empty.noMatchTitle":"jobs.list.empty.noJobsTitle")}
        description=${m(t&&p?"jobs.list.empty.noMatchDesc":"jobs.list.empty.noJobsDesc")}
      />
    `}return l`
    <div className="space-y-5">
      <${q} className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-iron-300">${m("jobs.list.explorer")}</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-iron-100">${m("jobs.list.queueTitle")}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-iron-300">
              ${m("jobs.list.queueDesc")}
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300">
            <span>${m("jobs.list.visible",{count:e.length})}</span>
            <span>/</span>
            <span>${m(d?"jobs.list.state.refreshing":"jobs.list.state.live")}</span>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_220px]">
          <input
            value=${n}
            onInput=${p=>r(p.target.value)}
            placeholder=${m("jobs.list.searchPlaceholder")}
            className="h-11 rounded-md border border-iron-700 bg-iron-950/90 px-3 text-sm text-iron-100 outline-none focus:border-signal/45"
          />
          <select
            value=${s}
            onChange=${p=>i(p.target.value)}
            className="v2-select h-11 rounded-md border border-iron-700 bg-iron-950/90 px-3 text-sm text-iron-100 outline-none focus:border-signal/45"
          >
            ${f.map(p=>l`<option key=${p.value} value=${p.value}>${p.label}</option>`)}
          </select>
        </div>
      <//>

      <div className="grid gap-3">
        ${e.map(p=>l`
          <article
            key=${p.id}
            className=${["group flex flex-col gap-4 rounded-[18px] border p-5",a===p.id?"border-signal/35 bg-signal/10":"border-iron-700 bg-iron-800/60 hover:border-signal/30 hover:bg-iron-800/80"].join(" ")}
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <button onClick=${()=>o(p.id)} className="min-w-0 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-lg font-semibold text-iron-100">${p.title||m("jobs.list.untitled")}</h3>
                  <${z} tone=${oi(p.state)} label=${nr(p.state)} />
                </div>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300">
                  <span>${qr(p.id)}</span>
                  <span>${m("jobs.list.created",{value:la(p.created_at)})}</span>
                  ${p.started_at&&l`<span>${m("jobs.list.started",{value:la(p.started_at)})}</span>`}
                </div>
              </button>

              <div className="flex gap-2">
                ${Hc(p)&&l`
                  <${T}
                    variant="secondary"
                    className="h-9 px-3 text-xs"
                    disabled=${c}
                    onClick=${()=>u(p.id)}
                  >
                    ${m("jobs.action.cancel")}
                  <//>
                `}
                <${T} variant="ghost" className="h-9 px-3 text-xs" onClick=${()=>o(p.id)}>${m("jobs.action.open")}<//>
              </div>
            </div>
          </article>
        `)}
      </div>
    </div>
  `}var K5=[{key:"total",label:"Total jobs",tone:"muted",detail:"All tracked work across agent and sandbox execution."},{key:"pending",label:"Pending",tone:"warning",detail:"Queued work waiting for a worker or container slot."},{key:"in_progress",label:"In progress",tone:"signal",detail:"Actively running jobs and live bridges."},{key:"completed",label:"Completed",tone:"success",detail:"Finished without intervention."},{key:"failed",label:"Failed",tone:"danger",detail:"Runs that terminated with an error or interruption."},{key:"stuck",label:"Stuck",tone:"danger",detail:"Agent work needing recovery or operator attention."}];function LS({summary:e}){return l`
    <${q} className="p-4 sm:p-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        ${K5.map(t=>l`
          <div
            key=${t.key}
            className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
          >
            <${at}
              label=${t.label}
              value=${e?.[t.key]??0}
              tone=${t.tone}
              detail=${t.detail}
              showDivider=${!1}
              className="px-0 py-0"
            />
          </div>
        `)}
      </div>
    <//>
  `}function PS(){return Promise.resolve({jobs:[],pagination:null,todo:!0})}function jS(){return Promise.resolve({total:0,active:0,completed:0,failed:0,todo:!0})}function US(e){return Promise.resolve(null)}function FS(e){return Promise.resolve({success:!1,message:"TODO: requires v2 jobs endpoint"})}function zS(e){return Promise.resolve({success:!1,message:"TODO: requires v2 jobs endpoint"})}function BS(e){return Promise.resolve({events:[],todo:!0})}function qS(e,t){return Promise.resolve({success:!1,message:"TODO: requires v2 jobs endpoint"})}function fh(e,t=""){return Promise.resolve({entries:[],todo:!0})}function IS(e,t){return Promise.resolve({content:"",todo:!0})}function HS(e){let t=ee(),[a,n]=h.default.useState(null),r=H({queryKey:["job-detail",e],queryFn:()=>US(e),enabled:!!e,refetchInterval:e?4e3:!1}),s=H({queryKey:["job-events",e],queryFn:()=>BS(e),enabled:!!e,refetchInterval:e?2500:!1}),i=Y({mutationFn:({content:o,done:u})=>qS(e,{content:o,done:u}),onSuccess:(o,{done:u})=>{n({type:"success",message:u?"Done signal sent to the job":"Follow-up sent to the job"}),t.invalidateQueries({queryKey:["job-detail",e]}),t.invalidateQueries({queryKey:["job-events",e]}),t.invalidateQueries({queryKey:["jobs"]}),t.invalidateQueries({queryKey:["jobs-summary"]})},onError:o=>{n({type:"error",message:o.message||"Unable to send follow-up"})}});return h.default.useEffect(()=>{n(null)},[e]),{job:r.data||null,events:s.data?.events||[],isLoading:r.isLoading,isRefreshing:r.isFetching||s.isFetching,error:r.error||s.error||null,sendPrompt:i.mutateAsync,isSendingPrompt:i.isPending,promptResult:a,clearPromptResult:()=>n(null)}}function KS(e=[]){return e.map(t=>({name:t.name,path:t.path,isDir:t.is_dir,children:t.is_dir?[]:null,loaded:!1,expanded:!1}))}function QS(e,t){for(let a of e){if(a.path===t)return a;if(a.children?.length){let n=QS(a.children,t);if(n)return n}}return null}function Kc(e,t,a){return e.map(n=>n.path===t?a(n):n.children?.length?{...n,children:Kc(n.children,t,a)}:n)}function VS(e){let[t,a]=h.default.useState([]),[n,r]=h.default.useState(""),[s,i]=h.default.useState(""),[o,u]=h.default.useState(""),c=!!(e?.project_dir&&e?.id),d=H({queryKey:["job-files-root",e?.id],queryFn:()=>fh(e.id,""),enabled:c}),m=H({queryKey:["job-file",e?.id,n],queryFn:()=>IS(e.id,n),enabled:!!(c&&n)});h.default.useEffect(()=>{a([]),r(""),i(""),u("")},[e?.id]),h.default.useEffect(()=>{d.data?.entries?(a(KS(d.data.entries)),i("")):d.error&&i(d.error.message||"Unable to load project files")},[d.data,d.error]);let f=h.default.useCallback(async p=>{let b=QS(t,p);if(!(!b||!e?.id)){if(b.expanded){a(y=>Kc(y,p,x=>({...x,expanded:!1})));return}if(b.loaded){a(y=>Kc(y,p,x=>({...x,expanded:!0})));return}u(p);try{let y=await fh(e.id,p);a(x=>Kc(x,p,g=>({...g,expanded:!0,loaded:!0,children:KS(y.entries)}))),i("")}catch(y){i(y.message||"Unable to open folder")}finally{u("")}}},[e?.id,t]);return{canBrowse:c,tree:t,selectedPath:n,selectPath:r,selectedFile:m.data||null,fileError:m.error?.message||"",isLoadingTree:d.isLoading,isLoadingFile:m.isLoading||m.isFetching,expandingPath:o,treeError:s,toggleDirectory:f}}function GS(){let e=ee(),[t,a]=h.default.useState(null),n=H({queryKey:["jobs-summary"],queryFn:jS,refetchInterval:5e3}),r=H({queryKey:["jobs"],queryFn:PS,refetchInterval:5e3}),s=h.default.useCallback(()=>{e.invalidateQueries({queryKey:["jobs"]}),e.invalidateQueries({queryKey:["jobs-summary"]})},[e]),i=Y({mutationFn:({jobId:u})=>FS(u),onSuccess:(u,{jobId:c})=>{a({type:"success",message:`Job ${qr(c)} cancelled`}),s()},onError:u=>{a({type:"error",message:u.message||"Unable to cancel job"})}}),o=Y({mutationFn:({jobId:u})=>zS(u),onSuccess:u=>{a({type:"success",message:`Restart queued as ${qr(u?.new_job_id)}`}),s()},onError:u=>{a({type:"error",message:u.message||"Unable to restart job"})}});return{summary:n.data||{total:0,pending:0,in_progress:0,completed:0,failed:0,stuck:0},jobs:r.data?.jobs||[],isLoading:n.isLoading||r.isLoading,isRefreshing:n.isFetching||r.isFetching,error:n.error||r.error||null,actionResult:t,clearActionResult:()=>a(null),cancelJob:i.mutateAsync,restartJob:o.mutateAsync,isBusy:i.isPending||o.isPending,invalidate:s}}function YS({result:e,onDismiss:t}){let a=k();if(!e)return null;let n={success:"border-mint/30 bg-mint/10 text-mint",error:"border-red-400/30 bg-red-500/10 text-red-200",info:"border-signal/30 bg-signal/10 text-signal"};return l`
    <div
      className=${["flex items-center gap-3 rounded-xl border px-4 py-3 text-sm",n[e.type]||n.info].join(" ")}
    >
      <span className="min-w-0 flex-1">${e.message}</span>
      <button
        onClick=${t}
        className="shrink-0 opacity-70 hover:opacity-100"
      >
        ${a("jobs.dismiss")}
      </button>
    </div>
  `}function ph(){let e=k(),t=pe(),{jobId:a=null}=ot(),[n,r]=h.default.useState(""),[s,i]=h.default.useState("all"),[o,u]=h.default.useState(a?"activity":"overview"),c=GS(),d=HS(a),m=VS(d.job);h.default.useEffect(()=>{u(a?"activity":"overview")},[a]);let f=h.default.useMemo(()=>{let v=n.trim().toLowerCase();return c.jobs.filter($=>{let w=!v||$.title.toLowerCase().includes(v)||$.id.toLowerCase().includes(v),S=s==="all"||$.state===s;return w&&S})},[c.jobs,n,s]),p=h.default.useCallback(v=>t(`/jobs/${v}`),[t]),b=h.default.useCallback(async v=>{try{await c.cancelJob({jobId:v})}catch{}},[c]),y=h.default.useCallback(async v=>{try{let $=await c.restartJob({jobId:v});$?.new_job_id&&t(`/jobs/${$.new_job_id}`)}catch{}},[c,t]),x=l`
    ${a&&l`<${T} variant="ghost" onClick=${()=>t("/jobs")}
      >${e("jobs.allJobs")}<//
    >`}
  `,g=null;if(a)if(d.isLoading)g=l`
        <div className="space-y-4">
          ${[1,2,3].map(v=>l`<div key=${v} className="v2-skeleton h-32 rounded-[18px]" />`)}
        </div>
      `;else if(d.error||!d.job)g=l`
        <${be}
          title=${e("jobs.unavailable")}
          description=${d.error?.message||e("jobs.unavailableDesc")}
        >
          <${T} variant="secondary" onClick=${()=>t("/jobs")}
            >${e("jobs.returnToJobs")}<//
          >
        <//>
      `;else{let v={overview:l`<${MS} job=${d.job} />`,activity:l`
          <${ES}
            job=${d.job}
            events=${d.events}
            onSendPrompt=${d.sendPrompt}
            isSendingPrompt=${d.isSendingPrompt}
          />
        `,files:l`
          <${DS}
            canBrowse=${m.canBrowse}
            tree=${m.tree}
            selectedPath=${m.selectedPath}
            selectedFile=${m.selectedFile}
            fileError=${m.fileError}
            isLoadingTree=${m.isLoadingTree}
            isLoadingFile=${m.isLoadingFile}
            expandingPath=${m.expandingPath}
            treeError=${m.treeError}
            onToggleDirectory=${m.toggleDirectory}
            onSelectPath=${m.selectPath}
          />
        `};g=l`
        <${TS}
          job=${d.job}
          activeTab=${o}
          onTabChange=${u}
          onBack=${()=>t("/jobs")}
          onCancel=${b}
          onRestart=${y}
          isBusy=${c.isBusy}
        >
          ${v[o]||v.overview}
        <//>
      `}else g=c.isLoading?l`
          <div className="space-y-4">
            ${[1,2,3].map(v=>l`<div
                  key=${v}
                  className="v2-skeleton h-28 rounded-[18px]"
                />`)}
          </div>
        `:l`
          <${OS}
            jobs=${f}
            totalJobs=${c.jobs.length}
            selectedJobId=${a}
            search=${n}
            onSearchChange=${r}
            stateFilter=${s}
            onStateFilterChange=${i}
            onSelectJob=${p}
            onCancelJob=${b}
            isBusy=${c.isBusy}
            isRefreshing=${c.isRefreshing}
          />
        `;return l`
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="v2-page-entrance flex-1 p-4 sm:p-6">
        <div className="space-y-5">
          ${a&&l`<div className="flex flex-wrap justify-end gap-2">
            ${x}
          </div>`}
          ${c.error&&l`
            <div
              className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            >
              ${c.error.message}
            </div>
          `}
          <${YS}
            result=${c.actionResult}
            onDismiss=${c.clearActionResult}
          />
          <${YS}
            result=${d.promptResult}
            onDismiss=${d.clearPromptResult}
          />
          <${LS} summary=${c.summary} />
          ${g}
        </div>
      </div>
    </div>
  `}function rr(e){return e?new Date(e).toLocaleString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"Not scheduled"}function Qc(e,t=!0){return!t||e==="disabled"?"muted":e==="active"?"signal":e==="running"?"warning":e==="failing"||e==="attention"?"danger":"muted"}function Vc(e){return e==="verified"?"success":e==="unverified"?"warning":"muted"}function JS(e=[]){return[...e].sort((t,a)=>t.enabled!==a.enabled?t.enabled?-1:1:new Date(a.next_fire_at||a.last_run_at||0).getTime()-new Date(t.next_fire_at||t.last_run_at||0).getTime())}function XS(e){return!e||typeof e!="object"?"No action details":e.type?e.type:e.Lightweight?"lightweight":e.FullJob?"full job":"configured"}function Q5(e){return e==="ok"?"success":e==="running"?"warning":"danger"}function ZS({runs:e}){return e?.length?l`
    <div className="space-y-3">
      ${e.map(t=>l`
          <div key=${t.id} className="rounded-xl border border-iron-700 bg-iron-950/40 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <${z} tone=${Q5(t.status)} label=${t.status} />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-iron-400">
                ${rr(t.started_at)}
              </span>
            </div>
            ${t.result_summary&&l`<p className="mt-3 text-sm leading-6 text-iron-300">${t.result_summary}</p>`}
          </div>
        `)}
    </div>
  `:l`
      <div className="rounded-xl border border-iron-700 bg-iron-950/40 p-4 text-sm text-iron-300">
        No runs recorded yet.
      </div>
    `}function sr({label:e,value:t}){return l`
    <div className="rounded-xl border border-iron-700 bg-iron-950/50 p-3">
      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-iron-400">
        ${e}
      </div>
      <div className="mt-2 min-w-0 break-words text-sm text-iron-100">
        ${t||"\u2014"}
      </div>
    </div>
  `}function WS({title:e,value:t}){return l`
    <div>
      <h3 className="text-sm font-semibold text-iron-100">${e}</h3>
      <pre
        className="mt-3 max-h-72 overflow-auto rounded-xl border border-iron-700 bg-iron-950/70 p-4 text-xs leading-5 text-iron-200"
      >${JSON.stringify(t||{},null,2)}</pre>
    </div>
  `}function eN({routine:e,isLoading:t,error:a,isBusy:n,onTriggerRoutine:r,onToggleRoutine:s,onDeleteRoutine:i}){let o=pe(),u=k();return t?l`
      <div className="space-y-4">
        ${[1,2,3].map(c=>l`<div key=${c} className="v2-skeleton h-32 rounded-xl" />`)}
      </div>
    `:a||!e?l`
      <${be}
        title=${u("routine.unavailable")}
        description=${a?.message||u("routine.unavailableDesc")}
      />
    `:l`
    <${q} className="p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-2xl font-semibold tracking-tight text-iron-100">
              ${e.name}
            </h2>
            <${z}
              tone=${Qc(e.status,e.enabled)}
              label=${e.enabled?e.status:"disabled"}
            />
            <${z}
              tone=${Vc(e.verification_status)}
              label=${e.verification_status||"unknown"}
            />
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-iron-300">
            ${e.description||e.trigger_summary||"No description"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <${T} variant="secondary" disabled=${n} onClick=${r}>Run<//>
          <${T} variant="ghost" disabled=${n} onClick=${s}>
            ${e.enabled?"Disable":"Enable"}
          <//>
          <${T} variant="ghost" onClick=${i}>Delete<//>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <${sr} label="Trigger" value=${e.trigger_summary||e.trigger_type} />
        <${sr} label="Action" value=${XS(e.action)} />
        <${sr} label="Next fire" value=${rr(e.next_fire_at)} />
        <${sr} label="Last run" value=${rr(e.last_run_at)} />
        <${sr} label="Run count" value=${e.run_count} />
        <${sr} label="Failures" value=${e.consecutive_failures} />
        <${sr} label="Created" value=${rr(e.created_at)} />
        <${sr} label="Routine ID" value=${e.id} />
      </div>

      ${e.conversation_id&&l`
        <div className="mt-5">
          <${T} variant="secondary" onClick=${()=>o(`/chat/${e.conversation_id}`)}>
            Open routine thread
          <//>
        </div>
      `}

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <${WS} title=${u("routine.triggerPayload")} value=${e.trigger} />
        <${WS} title=${u("routine.actionPayload")} value=${e.action} />
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold text-iron-100">Recent runs</h3>
        <${ZS} runs=${e.recent_runs} />
      </div>
    <//>
  `}function tN({routine:e,selectedRoutineId:t,onSelectRoutine:a,onTriggerRoutine:n,onToggleRoutine:r,isBusy:s}){let i=t===e.id;return l`
    <article
      className=${["group flex flex-col gap-4 rounded-[18px] border p-5",i?"border-signal/35 bg-signal/10":"border-iron-700 bg-iron-800/60 hover:border-signal/30 hover:bg-iron-800/80"].join(" ")}
    >
      <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
        <button onClick=${()=>a(e.id)} className="min-w-0 text-left">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-lg font-semibold text-iron-100">${e.name}</h3>
            <${z}
              tone=${Qc(e.status,e.enabled)}
              label=${e.enabled?e.status:"disabled"}
            />
            <${z}
              tone=${Vc(e.verification_status)}
              label=${e.verification_status||"unknown"}
            />
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-iron-300">
            ${e.description||e.trigger_summary||"No description"}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300">
            <span>${e.trigger_type}</span>
            <span>${e.action_type}</span>
            <span>runs ${e.run_count||0}</span>
            <span>next ${rr(e.next_fire_at)}</span>
          </div>
        </button>

        <div className="flex shrink-0 flex-wrap gap-2">
          <${T}
            variant="secondary"
            className="h-9 px-3 text-xs"
            disabled=${s}
            onClick=${()=>n(e.id)}
          >
            Run
          <//>
          <${T}
            variant="ghost"
            className="h-9 px-3 text-xs"
            disabled=${s}
            onClick=${()=>r(e.id)}
          >
            ${e.enabled?"Disable":"Enable"}
          <//>
          <${T}
            variant="ghost"
            className="h-9 px-3 text-xs"
            onClick=${()=>a(e.id)}
          >
            Open
          <//>
        </div>
      </div>
    </article>
  `}var V5=[{value:"all",label:"All routines"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"},{value:"unverified",label:"Unverified"},{value:"failing",label:"Failing"}];function hh({routines:e,totalRoutines:t,selectedRoutineId:a,search:n,onSearchChange:r,statusFilter:s,onStatusFilterChange:i,onSelectRoutine:o,onTriggerRoutine:u,onToggleRoutine:c,isBusy:d,isRefreshing:m}){let f=k();if(!e.length){let p=!!n.trim()||s!=="all";return l`
      <${be}
        title=${t&&p?"No routines match":"No routines yet"}
        description=${t&&p?"Adjust the search or status filter to find a saved routine.":"Routines created from chat will appear here after they are saved."}
      />
    `}return l`
    <div className="space-y-5">
      <${q} className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-iron-300">
              ${f("routines.explorer")}
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-iron-100">
              ${f("routines.title")}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-iron-300">
              ${f("routines.description")}
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300">
            <span>${e.length} visible</span>
            <span>/</span>
            <span>${m?"refreshing":"live"}</span>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_220px]">
          <input
            value=${n}
            onInput=${p=>r(p.target.value)}
            placeholder="Search routine name, trigger, or action"
            className="h-11 rounded-md border border-iron-700 bg-iron-950/90 px-3 text-sm text-iron-100 outline-none focus:border-signal/45"
          />
          <select
            value=${s}
            onChange=${p=>i(p.target.value)}
            className="v2-select h-11 rounded-md border border-iron-700 bg-iron-950/90 px-3 text-sm text-iron-100 outline-none focus:border-signal/45"
          >
            ${V5.map(p=>l`<option key=${p.value} value=${p.value}>${p.label}<//>`)}
          </select>
        </div>
      <//>

      <div className="grid gap-3">
        ${e.map(p=>l`
            <${tN}
              key=${p.id}
              routine=${p}
              selectedRoutineId=${a}
              onSelectRoutine=${o}
              onTriggerRoutine=${u}
              onToggleRoutine=${c}
              isBusy=${d}
            />
          `)}
      </div>
    </div>
  `}var G5=[{key:"total",label:"Total routines",tone:"muted",detail:"All saved schedules and event handlers."},{key:"enabled",label:"Enabled",tone:"signal",detail:"Ready to run from schedule, event, or manual trigger."},{key:"disabled",label:"Disabled",tone:"muted",detail:"Paused until explicitly re-enabled."},{key:"unverified",label:"Unverified",tone:"warning",detail:"Needs a successful validation run."},{key:"failing",label:"Failing",tone:"danger",detail:"Recent run status needs operator attention."},{key:"runs_today",label:"Runs today",tone:"success",detail:"Routines with activity since local day start."}];function aN({summary:e}){return l`
    <${q} className="p-4 sm:p-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        ${G5.map(t=>l`
            <div
              key=${t.key}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
            >
              <${at}
                label=${t.label}
                value=${e?.[t.key]??0}
                tone=${t.tone}
                detail=${t.detail}
                showDivider=${!1}
                className="px-0 py-0"
              />
            </div>
          `)}
      </div>
    <//>
  `}function nN(e){let[t,a]=h.default.useState(""),[n,r]=h.default.useState("all");return{filteredRoutines:h.default.useMemo(()=>{let i=t.trim().toLowerCase();return JS(e).filter(o=>{let u=[o.name,o.description,o.trigger_summary,o.trigger_type,o.action_type,o.status].join(" ").toLowerCase(),c=!i||u.includes(i),d=n==="all"||n==="enabled"&&o.enabled||n==="disabled"&&!o.enabled||n==="unverified"&&o.verification_status==="unverified"||n==="failing"&&o.status==="failing";return c&&d})},[e,t,n]),search:t,setSearch:a,statusFilter:n,setStatusFilter:r}}function rN(){return Promise.resolve({routines:[],todo:!0})}function sN(){return Promise.resolve({total:0,active:0,paused:0,todo:!0})}function iN(e){return Promise.resolve(null)}function Gc(e){return Promise.resolve({success:!1,message:"TODO: requires v2 routines endpoint"})}function Yc(e){return Promise.resolve({success:!1,message:"TODO: requires v2 routines endpoint"})}function oN(e){return Promise.resolve({success:!1,message:"TODO: requires v2 routines endpoint"})}function lN(e){let t=ee(),[a,n]=h.default.useState(null),r=H({queryKey:["routine-detail",e],queryFn:()=>iN(e),enabled:!!e,refetchInterval:e?5e3:!1}),s=h.default.useCallback(()=>{t.invalidateQueries({queryKey:["routine-detail",e]}),t.invalidateQueries({queryKey:["routines"]}),t.invalidateQueries({queryKey:["routines-summary"]})},[t,e]),i=(c,d)=>({mutationFn:()=>c(e),onSuccess:()=>{n({type:"success",message:d}),s()},onError:m=>{n({type:"error",message:m.message||"Unable to update routine"})}}),o=Y(i(Gc,"Routine run queued.")),u=Y(i(Yc,"Routine status updated."));return{routine:r.data||null,isLoading:r.isLoading,error:r.error||null,actionResult:a,clearActionResult:()=>n(null),triggerRoutine:o.mutateAsync,toggleRoutine:u.mutateAsync,isBusy:o.isPending||u.isPending}}function uN(){let e=ee(),[t,a]=h.default.useState(null),n=H({queryKey:["routines-summary"],queryFn:sN,refetchInterval:5e3}),r=H({queryKey:["routines"],queryFn:rN,refetchInterval:5e3}),s=h.default.useCallback(()=>{e.invalidateQueries({queryKey:["routines"]}),e.invalidateQueries({queryKey:["routines-summary"]}),e.invalidateQueries({queryKey:["routine-detail"]})},[e]),i=(d,m)=>({mutationFn:({routineId:f})=>d(f),onSuccess:()=>{a({type:"success",message:m}),s()},onError:f=>{a({type:"error",message:f.message||"Unable to update routine"})}}),o=Y(i(Gc,"Routine run queued.")),u=Y(i(Yc,"Routine status updated.")),c=Y(i(oN,"Routine deleted."));return{summary:n.data||{total:0,enabled:0,disabled:0,unverified:0,failing:0,runs_today:0},routines:r.data?.routines||[],isLoading:n.isLoading||r.isLoading,isRefreshing:n.isFetching||r.isFetching,error:n.error||r.error||null,actionResult:t,clearActionResult:()=>a(null),triggerRoutine:o.mutateAsync,toggleRoutine:u.mutateAsync,deleteRoutine:c.mutateAsync,isBusy:o.isPending||u.isPending||c.isPending,invalidate:s}}function vh(){let e=pe(),{routineId:t=null}=ot(),a=uN(),n=lN(t),r=nN(a.routines),s=h.default.useCallback(async(u,c)=>{try{await u({routineId:c})}catch{}},[]),i=h.default.useCallback(async(u,c)=>{if(window.confirm(`Delete routine "${c}"?`))try{await a.deleteRoutine({routineId:u}),e("/routines")}catch{}},[e,a]),o=t?l`
        <div className="grid gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(440px,1.1fr)]">
          <${hh}
            routines=${r.filteredRoutines}
            totalRoutines=${a.routines.length}
            selectedRoutineId=${t}
            search=${r.search}
            onSearchChange=${r.setSearch}
            statusFilter=${r.statusFilter}
            onStatusFilterChange=${r.setStatusFilter}
            onSelectRoutine=${u=>e(`/routines/${u}`)}
            onTriggerRoutine=${u=>s(a.triggerRoutine,u)}
            onToggleRoutine=${u=>s(a.toggleRoutine,u)}
            isBusy=${a.isBusy}
            isRefreshing=${a.isRefreshing}
          />
          <${eN}
            routine=${n.routine}
            isLoading=${n.isLoading}
            error=${n.error}
            isBusy=${n.isBusy}
            onTriggerRoutine=${n.triggerRoutine}
            onToggleRoutine=${n.toggleRoutine}
            onDeleteRoutine=${()=>i(t,n.routine?.name||t)}
          />
        </div>
      `:l`
        <${hh}
          routines=${r.filteredRoutines}
          totalRoutines=${a.routines.length}
          selectedRoutineId=${t}
          search=${r.search}
          onSearchChange=${r.setSearch}
          statusFilter=${r.statusFilter}
          onStatusFilterChange=${r.setStatusFilter}
          onSelectRoutine=${u=>e(`/routines/${u}`)}
          onTriggerRoutine=${u=>s(a.triggerRoutine,u)}
          onToggleRoutine=${u=>s(a.toggleRoutine,u)}
          isBusy=${a.isBusy}
          isRefreshing=${a.isRefreshing}
        />
      `;return l`
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="v2-page-entrance flex-1 p-4 sm:p-6">
        <div className="space-y-5">
          ${t&&l`<div className="flex flex-wrap justify-end gap-2">
            <${T} variant="ghost" onClick=${()=>e("/routines")}>
              All routines
            <//>
          </div>`}

          ${a.error&&l`
            <div
              className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            >
              ${a.error.message}
            </div>
          `}

          <${Ga}
            result=${a.actionResult}
            onDismiss=${a.clearActionResult}
          />
          <${Ga}
            result=${n.actionResult}
            onDismiss=${n.clearActionResult}
          />
          <${aN} summary=${a.summary} />

          ${a.isLoading?l`
                <div className="space-y-4">
                  ${[1,2,3].map(u=>l`<div key=${u} className="v2-skeleton h-32 rounded-xl" />`)}
                </div>
              `:o}
        </div>
      </div>
    </div>
  `}function Y5(e){return e==="available"?"success":e==="unavailable"?"warning":"muted"}function J5(e,t){return e.split(/(\{[^}]+\})/).map((n,r)=>{let s=n.match(/^\{(.+)\}$/)?.[1];return s&&t[s]!=null?t[s]:n})}function cN({deliveryState:e}){let t=k(),a=e.currentTarget?.target_id||"",[n,r]=h.default.useState(a),[s,i]=h.default.useState(!1),o=h.default.useRef(null);h.default.useEffect(()=>{r(a)},[a]),h.default.useEffect(()=>()=>{o.current&&clearTimeout(o.current)},[]);let u=n!==a,c=e.isLoading||e.isSaving,d=u&&!c,m=!!a&&!c,f=e.finalReplyTargets.length>0,p=e.targets.some(O=>O?.capabilities?.final_replies&&O?.target?.status==="unavailable"),b=f||p,y=O=>(o.current&&clearTimeout(o.current),i(!1),O.then(()=>{o.current&&clearTimeout(o.current),i(!0),o.current=setTimeout(()=>i(!1),2200)}).catch(()=>{})),x=()=>{d&&y(e.saveFinalReplyTarget(n||null))},g=()=>{m&&(r(""),y(e.saveFinalReplyTarget(null)))},v=e.currentTarget?.display_name||t("automations.delivery.none"),$=e.currentStatus,w=$==="available"?"success":$==="unavailable"?"warning":"muted",S=t($==="available"?"automations.delivery.pill.ready":$==="unavailable"?"automations.delivery.pill.unavailable":"automations.delivery.pill.notSet"),R=!!e.currentTarget,C=t(R?"automations.delivery.changeTarget":"automations.delivery.availableTargets"),E=J5(t("automations.delivery.footnote"),{command:l`<code
        key="cmd"
        className="rounded px-1.5 py-0.5 font-mono text-[0.6875rem] bg-[var(--v2-surface-muted)] text-[var(--v2-accent-text)]"
      >
        approve &lt;code&gt;
      </code>`});return l`
    <${q} className="p-5 sm:p-6">
      <div className="flex flex-col gap-5">

        <!-- ── Header ──────────────────────────────────────────────── -->
        <div className="flex flex-col gap-1">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--v2-text-muted)]">
            ${t("automations.delivery.eyebrow")}
          </div>
          <h2 className="mt-1 text-xl font-semibold tracking-[-0.02em] text-[var(--v2-text-strong)]">
            ${t("automations.delivery.title")}
          </h2>
          <p className="mt-1 text-sm leading-6 text-[var(--v2-text-muted)]">
            ${t("automations.delivery.explainer")}
          </p>
        </div>

        <hr className="border-t border-[var(--v2-panel-border)]" />

        <!-- ── Current default row (only when a target is configured) ── -->
        ${R&&l`
          <div>
            <span className="mb-1.5 block font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--v2-text-faint)]">
              ${t("automations.delivery.currentDefault")}
            </span>
            <div
              className="flex items-center gap-3 rounded-xl border px-4 py-3 bg-[var(--v2-positive-soft)] border-[color-mix(in_srgb,var(--v2-positive-text)_25%,var(--v2-panel-border))]"
            >
              <span className="flex-1 min-w-0 text-sm font-semibold text-[var(--v2-text-strong)] truncate">
                ${v}
              </span>
              <${z} tone=${w} label=${S} />
            </div>
          </div>
        `}

        <!-- ── Radio option rows ────────────────────────────────────── -->
        <div>
          <span className="mb-1.5 block font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--v2-text-faint)]">
            ${C}
          </span>
          <div
            className="flex flex-col gap-3"
            role="radiogroup"
            aria-label=${t("automations.delivery.title")}
          >

            <!-- Available external targets -->
            ${e.finalReplyTargets.map(O=>{let j=O?.target?.target_id??"",J=O?.target?.display_name||O?.target?.target_id||"",D=O?.target?.description||"",B=O?.target?.status??"available",V=n===j;return l`
                <label
                  key=${j}
                  className=${K("flex items-start gap-3.5 rounded-xl border px-4 py-3.5 cursor-pointer","transition-colors duration-100","bg-[var(--v2-surface-soft)] border-[var(--v2-panel-border)]","hover:bg-[var(--v2-surface-muted)] hover:border-[color-mix(in_srgb,var(--v2-accent)_30%,var(--v2-panel-border))]",V&&"border-[color-mix(in_srgb,var(--v2-accent)_45%,var(--v2-panel-border))] bg-[var(--v2-accent-soft)]")}
                >
                  <input
                    type="radio"
                    name="delivery-target"
                    value=${j}
                    checked=${V}
                    disabled=${c}
                    onChange=${()=>r(j)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--v2-accent)]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[var(--v2-text-strong)] leading-snug">
                      ${J}
                    </div>
                    ${D&&l`<div className="mt-0.5 text-xs leading-5 text-[var(--v2-text-muted)]">
                      ${D}
                    </div>`}
                  </div>
                  <${z}
                    tone=${Y5(B)}
                    label=${t(B==="unavailable"?"automations.delivery.pill.unavailable":"automations.delivery.pill.ready")}
                    className="self-center shrink-0"
                  />
                </label>
              `})}

            <!-- Unpaired notice rows (targets present but status=unavailable
                 and NOT already shown above because they lack final_replies) -->
            ${p&&l`
              <div
                className="flex items-center gap-3 rounded-xl border border-dashed border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] px-4 py-3.5 text-sm text-[var(--v2-text-muted)]"
              >
                <span className="text-base shrink-0 opacity-70">📎</span>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-[var(--v2-text-muted)]">
                    ${t("automations.delivery.unpairedNotice")}
                  </span>
                  <div className="mt-0.5 text-xs leading-5 text-[var(--v2-text-faint)]">
                    ${t("automations.delivery.unpairedDesc")}
                  </div>
                </div>
                <${z}
                  tone="warning"
                  label=${t("automations.delivery.pill.notPaired")}
                  className="shrink-0"
                />
              </div>
            `}

            <!-- Web app only / fallback row -->
            <label
              className=${K("flex items-start gap-3.5 rounded-xl border px-4 py-3.5","transition-colors duration-100","bg-[var(--v2-surface-soft)] border-[var(--v2-panel-border)]",f?"cursor-pointer hover:bg-[var(--v2-surface-muted)] hover:border-[color-mix(in_srgb,var(--v2-accent)_30%,var(--v2-panel-border))]":"cursor-default",n===""&&"border-[color-mix(in_srgb,var(--v2-accent)_45%,var(--v2-panel-border))] bg-[var(--v2-accent-soft)]")}
            >
              <input
                type="radio"
                name="delivery-target"
                value=""
                checked=${n===""}
                disabled=${c||!f}
                onChange=${()=>r("")}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--v2-accent)]"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[var(--v2-text-strong)] leading-snug">
                  ${t("automations.delivery.webOption")}
                </div>
                <div className="mt-0.5 text-xs leading-5 text-[var(--v2-text-muted)]">
                  ${t("automations.delivery.webOptionDesc")}
                </div>
              </div>
              <${z}
                tone="muted"
                label=${t("automations.delivery.pill.fallback")}
                className="self-center shrink-0"
              />
            </label>

          </div>
        </div>

        <!-- ── Save row ─────────────────────────────────────────────── -->
        <div className="flex flex-wrap items-center gap-3">
          <${T}
            variant="primary"
            size="sm"
            disabled=${!d}
            onClick=${x}
          >
            <${M} name="check" className="h-3.5 w-3.5" />
            ${t("automations.delivery.save")}
          <//>
          <${T}
            variant="secondary"
            size="sm"
            disabled=${!m}
            onClick=${g}
          >
            ${t("automations.delivery.clear")}
          <//>
          ${s&&l`
            <span
              role="status"
              className="flex items-center gap-1.5 text-xs font-semibold text-[var(--v2-positive-text)]"
            >
              <${M} name="check" className="h-3 w-3" />
              ${t("automations.delivery.saved")}
            </span>
          `}
          ${e.saveError&&!s&&l`
            <span
              role="alert"
              className="flex items-center gap-1.5 text-xs font-semibold text-red-300"
            >
              <${M} name="close" className="h-3 w-3" />
              ${t("automations.delivery.saveFailed")}
            </span>
          `}
        </div>

        <!-- ── Footnote (only when an external Slack-style target exists) ── -->
        ${b&&l`
          <div
            className="rounded-[10px] border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] px-4 py-3 text-xs leading-relaxed text-[var(--v2-text-faint)]"
          >
            ${E}
          </div>
        `}

      </div>
    <//>
  `}var mN={active:{labelKey:"automations.state.active",tone:"signal"},scheduled:{labelKey:"automations.state.scheduled",tone:"signal"},paused:{labelKey:"automations.state.paused",tone:"warning"},disabled:{labelKey:"automations.state.disabled",tone:"warning"},inactive:{labelKey:"automations.state.inactive",tone:"warning"},completed:{labelKey:"automations.state.completed",tone:"success"},unknown:{labelKey:"automations.state.unknown",tone:"muted"}},fN={ok:{labelKey:"automations.lastStatus.done",tone:"success"},error:{labelKey:"automations.lastStatus.error",tone:"danger"},running:{labelKey:"automations.lastStatus.running",tone:"info"}},pN={ok:{labelKey:"automations.runStatus.ok",tone:"success"},error:{labelKey:"automations.runStatus.error",tone:"danger"},running:{labelKey:"automations.runStatus.running",tone:"info"},unknown:{labelKey:"automations.runStatus.unknown",tone:"muted"}};function Ir(e){return typeof e=="function"?e:t=>t}var yh=[{value:"all",labelKey:"automations.filter.all",predicate:null},{value:"active",labelKey:"automations.filter.active",predicate:el},{value:"running",labelKey:"automations.filter.running",predicate:e=>e.has_running_run},{value:"failures",labelKey:"automations.filter.failures",predicate:e=>e.has_failed_runs},{value:"paused",labelKey:"automations.filter.paused",predicate:uD}];function hN(e,t,a){return(Array.isArray(e?.automations)?e.automations:[]).filter(r=>r?.source?.type==="schedule").map(r=>rD(r,t,a)).sort(lD)}function vN(e,t){let a=yh.find(n=>n.value===t)?.predicate;return a?e.filter(a):e}function gN(e){let t=e.filter(s=>el(s)).length,a=e.filter(s=>s.has_running_run).length,n=e.filter(s=>s.has_failed_runs).length,r=e.filter(s=>el(s)&&gh(s)!=null).sort((s,i)=>(s.next_run_timestamp??Number.MAX_SAFE_INTEGER)-(i.next_run_timestamp??Number.MAX_SAFE_INTEGER))[0];return{scheduled:e.length,active:t,running:a,failures:n,nextRun:r?.next_run_label||null}}function X5(e,t,a,n){let r=typeof a=="function"?a:g=>g;if(!e||typeof e!="string")return r("automations.schedule.custom");let s=fD(e);if(!s)return r("automations.schedule.custom");let{minute:i,hour:o,dayOfMonth:u,month:c,dayOfWeek:d,year:m}=s,f=t&&typeof t=="string"?t:null,p=f?` (${f})`:"",b=m==="*"&&u==="*"&&c==="*"&&d==="*";if(b&&o==="*"){if(i==="*")return r("automations.schedule.everyMinute");let g=pD(i);if(g===1)return r("automations.schedule.everyMinute");if(g)return r("automations.schedule.everyMinutes",{count:g});if(ir(i,0,59))return r("automations.schedule.hourlyAt",{minute:String(Number(i)).padStart(2,"0")})}let y=cD(o,i,n);if(!y)return r("automations.schedule.custom");if(b)return r("automations.schedule.everyDayAt",{time:y})+p;let x=hD(d);if(m==="*"&&u==="*"&&c==="*"&&x==="1-5")return r("automations.schedule.weekdaysAt",{time:y})+p;if(m==="*"&&u==="*"&&c==="*"&&ir(x,0,7)){let g=dD(Number(x)%7,n);return r("automations.schedule.weekdayAt",{weekday:g,time:y})+p}if(m==="*"&&ir(u,1,31)&&c==="*"&&d==="*")return r("automations.schedule.monthlyAt",{day:Number(u),time:y})+p;if(ir(u,1,31)&&ir(c,1,12)&&d==="*"&&(m==="*"||ir(m,1970,9999))){let g=mD(Number(c),Number(u),m==="*"?null:Number(m),n);return r("automations.schedule.dateAt",{date:g,time:y})+p}return r("automations.schedule.custom")}function ui(e,t="Unknown",a){if(!e)return t;let n=new Date(e);if(Number.isNaN(n.getTime()))return t;try{return n.toLocaleString(a||[],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return n.toLocaleString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}}function Z5(e,t){let a=mN[e]?.labelKey||"automations.state.unknown";return Ir(t)(a)}function W5(e){return mN[e]?.tone||"muted"}function eD(e,t){let a=fN[e]?.labelKey||"automations.lastStatus.none";return Ir(t)(a)}function tD(e){return fN[e]?.tone||"muted"}function aD(e,t){let a=pN[Jc(e)]?.labelKey||"automations.runStatus.unknown";return Ir(t)(a)}function nD(e){return pN[Jc(e)]?.tone||"muted"}function rD(e,t,a){let n=Ir(t),r=sD(e.recent_runs,t,a),s=r[0]||null,i=r.find(d=>d.status==="running")||null,o=r.find(d=>d.status==="ok"||d.status==="error")||null,u=o?.status||e.last_status,c=o?.completed_at||e.last_run_at||null;return{...e,display_name:e.name||n("automations.untitled"),schedule_timezone:e.source?.timezone||"UTC",schedule_label:X5(e.source?.cron,e.source?.timezone||"UTC",t,a),state_label:Z5(e.state,t),state_tone:W5(e.state),next_run_timestamp:bh(e.next_run_at),next_run_label:ui(e.next_run_at,n("automations.date.notScheduled"),a),last_run_label:ui(c,n("automations.date.noRuns"),a),last_status_label:eD(u,t),last_status_tone:tD(u),created_label:ui(e.created_at,n("automations.date.unknown"),a),recent_runs:r,latest_run:s,current_run:i,has_running_run:r.some(d=>d.status==="running"),has_failed_runs:r.some(d=>d.status==="error"),success_rate_label:oD(r,t)}}function sD(e,t,a){let n=Ir(t);return Array.isArray(e)?e.map(r=>{let s=Jc(r?.status),i=r?.fired_at||r?.fire_slot||r?.submitted_at||r?.completed_at||null,o=bh(i);return{...r,status:s,status_label:aD(s,t),status_tone:nD(s),timestamp:o,timestamp_source:i,fired_label:ui(i,n("automations.date.unscheduled"),a),submitted_label:ui(r?.submitted_at,n("automations.date.notSubmitted"),a),completed_label:ui(r?.completed_at,n("automations.date.notCompleted"),a),chat_path:r?.thread_id?`/chat/${encodeURIComponent(r.thread_id)}`:null}}).sort((r,s)=>(s.timestamp??0)-(r.timestamp??0)):[]}function Jc(e){return e==="ok"||e==="error"||e==="running"?e:"unknown"}function yN(e){let t=Array.isArray(e)?e:[],a={total:t.length,ok:0,error:0,running:0,unknown:0};for(let n of t)a[Jc(n?.status)]+=1;return a}function iD(e){let t=yN(e);return[{key:"ok",tone:"text-emerald-300",count:t.ok},{key:"error",tone:"text-red-300",count:t.error},{key:"running",tone:"text-sky-300",count:t.running},{key:"unknown",tone:"text-iron-400",count:t.unknown}].filter(a=>a.count>0)}function bN(e,t){let a=Ir(t),n=yN(e),r=iD(e).map(s=>({...s,text:a(`automations.runs.${s.key}`,{count:s.count})}));return{total:n.total,totalText:a("automations.runs.total",{count:n.total}),chips:r}}function oD(e,t){let a=Ir(t),n=e.filter(s=>s.status==="ok"||s.status==="error");if(!n.length)return a("automations.successRate.none");let r=n.filter(s=>s.status==="ok").length;return a("automations.successRate.visible",{percent:Math.round(r/n.length*100)})}function lD(e,t){let a=el(e),n=el(t);return a!==n?a?-1:1:(gh(e)??Number.MAX_SAFE_INTEGER)-(gh(t)??Number.MAX_SAFE_INTEGER)}function bh(e){if(!e)return null;let t=new Date(e);return Number.isNaN(t.getTime())?null:t.getTime()}function el(e){return e?.state==="active"||e?.state==="scheduled"}function uD(e){return["paused","disabled","inactive"].includes(e?.state)}function gh(e){return e?.next_run_timestamp??bh(e?.next_run_at)}function xh(e,t,a){try{return new Intl.DateTimeFormat(e||"en",t).format(a)}catch{return new Intl.DateTimeFormat("en",t).format(a)}}function cD(e,t,a){return!ir(e,0,23)||!ir(t,0,59)?null:xh(a,{hour:"numeric",minute:"2-digit"},new Date(2001,0,1,Number(e),Number(t)))}function dD(e,t){return xh(t,{weekday:"long"},new Date(2001,0,7+e))}function mD(e,t,a,n){let r=a!=null?{month:"short",day:"numeric",year:"numeric"}:{month:"short",day:"numeric"};return xh(n,r,new Date(a??2e3,e-1,t))}function fD(e){let t=e.trim().split(/\s+/);if(t.length===5){let[a,n,r,s,i]=t;return{minute:a,hour:n,dayOfMonth:r,month:s,dayOfWeek:i,year:"*"}}if(t.length===6&&dN(t[0])){let[,a,n,r,s,i]=t;return{minute:a,hour:n,dayOfMonth:r,month:s,dayOfWeek:i,year:"*"}}if(t.length===7&&dN(t[0])){let[,a,n,r,s,i,o]=t;return{minute:a,hour:n,dayOfMonth:r,month:s,dayOfWeek:i,year:o}}return null}function dN(e){return/^0+$/.test(e)}function ir(e,t,a){if(!/^\d+$/.test(e))return!1;let n=Number(e);return n>=t&&n<=a}function pD(e){let t=/^\*\/(\d+)$/.exec(e);if(!t)return null;let a=Number(t[1]);return a>=1&&a<=59?a:null}function hD(e){let t=String(e||"").toUpperCase();return{SUN:"0",MON:"1",TUE:"2",WED:"3",THU:"4",FRI:"5",SAT:"6","MON-FRI":"1-5"}[t]||e}function vD(e){return{id:String(e?.id??`${e?.timestamp}:${e?.target}:${e?.message}`),timestamp:e?.timestamp||"",level:String(e?.level||"info").toLowerCase(),target:e?.target||"",message:e?.message||"",threadId:e?.thread_id||null,runId:e?.run_id||null,turnId:e?.turn_id||null,toolCallId:e?.tool_call_id||null,toolName:e?.tool_name||null,source:e?.source||null}}function xN({threadId:e,runId:t,turnId:a,toolCallId:n,toolName:r,source:s}={},{absolute:i=!1}={}){let o=new URLSearchParams;e&&o.set("thread_id",e),t&&o.set("run_id",t),a&&o.set("turn_id",a),n&&o.set("tool_call_id",n),r&&o.set("tool_name",r),s&&o.set("source",s);let u=o.toString(),c=`/logs${u?`?${u}`:""}`;return i?`/v2${c}`:c}function $N(e){let t=e?.logs&&typeof e.logs=="object"?e.logs:e||{},a=Array.isArray(t.entries)?t.entries:[];return{source:t.source||"",entries:a.map(vD),nextCursor:t.next_cursor||null,tailSupported:!!t.tail_supported,followSupported:!!t.follow_supported}}var gD=8;function $h(e){return e.run_id||e.thread_id||e.submitted_at||e.timestamp_source}function Xc({runs:e=[]}){let t=k(),a=e.slice(0,gD);if(!a.length)return l`<span className="text-xs text-iron-400">${t("automations.table.noRuns")}</span>`;let n=e.length-a.length;return l`
    <div
      className="flex items-center gap-1.5"
      aria-label=${t("automations.runs.showingOf",{shown:a.length,total:e.length})}
    >
      ${a.map(r=>l`
        <span
          key=${$h(r)}
          title=${`${r.status_label} \xB7 ${r.fired_label}`}
          className=${K("h-3 w-3 rounded-full border",r.status==="ok"&&"border-emerald-300/50 bg-emerald-400",r.status==="error"&&"border-red-300/50 bg-red-400",r.status==="running"&&"border-sky-300/60 bg-sky-400",r.status==="unknown"&&"border-iron-500 bg-iron-600")}
        />
      `)}
      ${n>0&&l`<span
        className="ml-0.5 font-mono text-[11px] text-iron-400"
        title=${t("automations.runs.showingOf",{shown:a.length,total:e.length})}
      >
        +${n}
      </span>`}
    </div>
  `}function Zc({runs:e=[],className:t=""}){let a=k(),n=bN(e,a);return n.total?l`
    <div className=${K("flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px]",t)}>
      <span className="text-iron-300">${n.totalText}</span>
      ${n.chips.map(r=>l`<span key=${r.key} className=${r.tone}>${r.text}</span>`)}
    </div>
  `:l`<span className=${K("text-[11px] text-iron-400",t)}>
      ${a("automations.table.noRuns")}
    </span>`}function wN({run:e,onOpenRun:t,onOpenLogs:a}){let n=k(),r=!!e.chat_path,s=xN({threadId:e.thread_id,runId:e.run_id}),i=!!((e.thread_id||e.run_id)&&a);return l`
    <div className="grid gap-3 border-b border-[var(--v2-panel-border)] py-3 last:border-0 sm:grid-cols-[6.5rem_minmax(0,1fr)_auto] sm:items-center">
      <div>
        <${z} tone=${e.status_tone} label=${e.status_label} />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-iron-100">${e.fired_label}</div>
        <div className="mt-1 truncate font-mono text-[11px] text-iron-400">
          ${e.thread_id?`${n("automations.detail.thread")} ${e.thread_id}`:n("automations.detail.noThread")}
        </div>
        ${e.run_id&&l`
          <div className="mt-1 truncate font-mono text-[11px] text-iron-500">
            ${n("automations.detail.run")} ${e.run_id}
          </div>
        `}
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <${T}
          variant="secondary"
          size="sm"
          disabled=${!r}
          onClick=${r?()=>t(e.chat_path):void 0}
        >
          <${M} name="chat" className="mr-1.5 h-4 w-4" />
          ${n("automations.detail.openRun")}
        <//>
        <${T}
          variant="ghost"
          size="sm"
          disabled=${!i}
          onClick=${i?()=>a(s):void 0}
        >
          <${M} name="file" className="mr-1.5 h-4 w-4" />
          ${n("nav.logs")}
        <//>
      </div>
    </div>
  `}function Wc({label:e,value:t,tone:a}){return l`
    <div className="min-w-0 rounded-xl border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] p-3">
      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-iron-400">
        ${e}
      </div>
      <div
        className=${K("mt-2 min-w-0 break-words text-sm text-iron-100",a==="success"&&"text-emerald-200",a==="danger"&&"text-red-200",a==="info"&&"text-sky-200")}
      >
        ${t||"\u2014"}
      </div>
    </div>
  `}function SN({automation:e}){let t=k(),a=pe();if(!e)return l`
      <${q} className="p-4 sm:p-5">
        <${be}
          boxed=${!1}
          title=${t("automations.detail.emptyTitle")}
          description=${t("automations.detail.emptyDescription")}
        />
      <//>
    `;let n=e.current_run;return l`
    <${q} className="overflow-hidden">
      <div className="border-b border-[var(--v2-panel-border)] p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h3 className="truncate text-xl font-semibold tracking-tight text-iron-100">
              ${e.display_name}
            </h3>
            <div className="mt-2 truncate font-mono text-[11px] uppercase tracking-[0.12em] text-iron-400">
              ${e.automation_id}
            </div>
          </div>
          <${z}
            tone=${e.has_running_run?"info":e.state_tone}
            label=${e.has_running_run?t("automations.status.running"):e.state_label}
          />
        </div>
      </div>

      <div className="space-y-5 p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <${Wc} label=${t("automations.detail.schedule")} value=${e.schedule_label} />
          <${Wc}
            label=${t("automations.detail.successRate")}
            value=${e.success_rate_label}
            tone=${e.has_failed_runs?"danger":"success"}
          />
          <${Wc} label=${t("automations.detail.lastCompleted")} value=${e.last_run_label} />
          <${Wc}
            label=${t("automations.detail.currentRun")}
            value=${n?.run_id||n?.thread_id||t("automations.detail.noCurrentRun")}
            tone=${e.has_running_run?"info":null}
          />
        </div>

        <div>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-sm font-semibold text-iron-100">
              ${t("automations.detail.recentRuns")}
            </h4>
            <div className="flex flex-col items-end gap-1">
              <${Xc} runs=${e.recent_runs} />
              <${Zc} runs=${e.recent_runs} />
            </div>
          </div>

          ${e.recent_runs.length?l`
                <div>
                  ${e.recent_runs.map(r=>l`
                    <${wN}
                      key=${$h(r)}
                      run=${r}
                      onOpenRun=${a}
                      onOpenLogs=${a}
                    />
                  `)}
                </div>
              `:l`
                <div className="rounded-xl border border-dashed border-[var(--v2-panel-border)] p-4 text-sm text-iron-300">
                  ${t("automations.detail.noRuns")}
                </div>
              `}
        </div>
      </div>
    <//>
  `}var yD=["automations.empty.example1","automations.empty.example2","automations.empty.example3"];function bD({promptKey:e}){let t=k(),a=t(e),[n,r]=h.default.useState(!1),s=h.default.useRef(null);return h.default.useEffect(()=>()=>clearTimeout(s.current),[]),l`
    <li
      className="flex items-center gap-3 rounded-xl border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] px-4 py-3"
    >
      <span className="min-w-0 flex-1 text-sm leading-6 text-iron-200">${a}</span>
      <button
        type="button"
        onClick=${async()=>{try{await navigator.clipboard.writeText(a),r(!0),clearTimeout(s.current),s.current=setTimeout(()=>r(!1),1500)}catch{}}}
        aria-label=${t(n?"automations.empty.copied":"automations.empty.copyPrompt")}
        title=${t(n?"automations.empty.copied":"automations.empty.copyPrompt")}
        className=${K("inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--v2-panel-border)] text-iron-300 hover:text-iron-100 hover:border-white/20","focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v2-accent)]",n&&"text-emerald-300")}
      >
        <${M} name=${n?"check":"copy"} className="h-4 w-4" />
      </button>
    </li>
  `}function NN(){let e=k(),t=pe();return l`
    <${q} className="p-6 sm:p-8">
      <div className="max-w-2xl">
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-iron-100 flex items-center gap-3">
          ${e("automations.empty.onboardingTitle")}
        </h2>
        <p className="mt-3 text-sm leading-6 text-iron-300">
          ${e("automations.empty.onboardingDescription")}
        </p>

        <div className="mt-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-iron-400">
            ${e("automations.empty.examplesTitle")}
          </div>
          <ul className="mt-3 space-y-2">
            ${yD.map(a=>l`<${bD} key=${a} promptKey=${a} />`)}
          </ul>
        </div>

        <div className="mt-6">
          <${T} variant="primary" size="sm" onClick=${()=>t("/chat")}>
            <${M} name="chat" className="mr-1.5 h-4 w-4" />
            ${e("automations.empty.startInChat")}
          <//>
        </div>
      </div>
    <//>
  `}function _N({automations:e,filter:t,onFilterChange:a,onRefresh:n,isRefreshing:r,selectedAutomationId:s,onSelectAutomation:i}){let o=k(),u=vN(e,t),c=e.length>0,d=u.find(m=>m.automation_id===s)||u[0]||null;return l`
    <div className="space-y-5">
      <${q} className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-iron-300">
              ${o("automations.eyebrow")}
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-iron-100">
              ${o("automations.title")}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-iron-300">
              ${o("automations.description")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div
              className="inline-flex overflow-hidden rounded-[10px] border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)]"
              role="group"
              aria-label=${o("automations.filterLabel")}
            >
              ${yh.map(m=>l`
                <button
                  key=${m.value}
                  type="button"
                  aria-pressed=${t===m.value}
                  onClick=${()=>a(m.value)}
                  className=${K("h-9 px-3 text-xs font-semibold",t===m.value?"bg-[var(--v2-accent-soft)] text-[var(--v2-accent-text)]":"text-[var(--v2-text-muted)] hover:bg-[var(--v2-surface-muted)] hover:text-[var(--v2-text-strong)]")}
                >
                  ${o(m.labelKey)}
                </button>
              `)}
            </div>
            <${T}
              variant="secondary"
              size="icon-sm"
              aria-label=${o("automations.refresh")}
              title=${o(r?"automations.refreshing":"automations.refresh")}
              disabled=${r}
              onClick=${n}
            >
              <${M}
                name="retry"
                className=${K("h-4 w-4",r&&"v2-spin")}
              />
            <//>
          </div>
        </div>
      <//>

      ${u.length?l`
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.12fr)_minmax(22rem,0.88fr)]">
              <${q} className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px] border-collapse">
                    <thead>
                      <tr className="border-b border-[var(--v2-panel-border)] text-left">
                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-iron-300">
                          ${o("automations.table.name")}
                        </th>
                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-iron-300">
                          ${o("automations.table.schedule")}
                        </th>
                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-iron-300">
                          ${o("automations.table.nextRun")}
                        </th>
                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-iron-300">
                          ${o("automations.table.recentRuns")}
                        </th>
                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-iron-300">
                          ${o("automations.table.status")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      ${u.map(m=>{let f=m.automation_id===d?.automation_id;return l`
                          <tr
                            key=${m.automation_id}
                            className=${K("border-b border-[var(--v2-panel-border)] last:border-0 hover:bg-white/[0.03]",f&&"bg-[var(--v2-accent-soft)]/30")}
                          >
                            <td className="max-w-[280px] px-5 py-4 align-top">
                              <button
                                type="button"
                                aria-pressed=${f}
                                onClick=${()=>i(m.automation_id)}
                                className="block w-full min-w-0 rounded text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v2-accent)]"
                              >
                                <div className="truncate text-sm font-semibold text-iron-100">
                                  ${m.display_name}
                                </div>
                                <div className="mt-1 truncate font-mono text-[11px] uppercase tracking-[0.12em] text-iron-400">
                                  ${m.automation_id}
                                </div>
                              </button>
                            </td>
                            <td className="px-5 py-4 align-top text-sm text-iron-200">
                              ${m.schedule_label}
                            </td>
                            <td className="px-5 py-4 align-top text-sm text-iron-200">
                              ${m.next_run_label}
                            </td>
                            <td className="px-5 py-4 align-top">
                              <div className="space-y-2">
                                <${Xc} runs=${m.recent_runs} />
                                <${Zc} runs=${m.recent_runs} />
                              </div>
                            </td>
                            <td className="px-5 py-4 align-top">
                              <${z}
                                tone=${m.has_running_run?"info":m.has_failed_runs?"danger":m.state_tone}
                                label=${m.has_running_run?o("automations.status.running"):m.has_failed_runs?o("automations.status.needsReview"):m.state_label}
                              />
                            </td>
                          </tr>
                        `})}
                    </tbody>
                  </table>
                </div>
              <//>

              <${SN} automation=${d} />
            </div>
          `:c?l`
              <${be}
                title=${o("automations.empty.matchingTitle")}
                description=${o("automations.empty.matchingDescription")}
              />
            `:l`<${NN} />`}
    </div>
  `}function RN({summary:e,activeFilter:t,onSelectFilter:a}){let n=k(),r=[{key:"scheduled",label:n("automations.summary.scheduled"),value:e?.scheduled??0,tone:"muted",detail:n("automations.summary.scheduledDetail"),filter:"all"},{key:"active",label:n("automations.summary.active"),value:e?.active??0,tone:"signal",detail:n("automations.summary.activeDetail"),filter:"active"},{key:"running",label:n("automations.summary.running"),value:e?.running??0,tone:"info",detail:n("automations.summary.runningDetail"),filter:"running"},{key:"failures",label:n("automations.summary.failures"),value:e?.failures??0,tone:(e?.failures??0)>0?"danger":"success",detail:n("automations.summary.failuresDetail"),filter:(e?.failures??0)>0?"failures":null},{key:"nextRun",label:n("automations.summary.nextRun"),value:e?.nextRun||n("automations.summary.none"),tone:"info",detail:n("automations.summary.nextRunDetail"),valueClassName:"text-lg md:text-xl"}];return l`
    <${q} className="p-4 sm:p-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        ${r.map(s=>{let i=!!(s.filter&&a),o=i&&t===s.filter,u=l`
            <${at}
              label=${s.label}
              value=${s.value}
              tone=${s.tone}
              badgeLabel=${n(`automations.badge.${s.tone}`)}
              detail=${s.detail}
              valueClassName=${s.valueClassName}
              showDivider=${!1}
              className="px-0 py-0"
            />
          `,c="rounded-[14px] border border-white/8 bg-white/[0.03] p-4 text-left";return i?l`
            <button
              key=${s.key}
              type="button"
              aria-pressed=${o}
              title=${n("automations.summary.filterAction",{label:s.label})}
              onClick=${()=>a(s.filter)}
              className=${K(c,"transition-colors hover:border-white/20 hover:bg-white/[0.05]","focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v2-accent)]",o&&"border-[var(--v2-accent)]/60 bg-[var(--v2-accent-soft)]/30")}
            >
              ${u}
            </button>
          `:l`<div key=${s.key} className=${c}>${u}</div>`})}
      </div>
    <//>
  `}var xD=50,$D=25;function kN(){let{t:e,lang:t}=al(),a=H({queryKey:["automations"],queryFn:()=>Cx({limit:xD,runLimit:$D}),refetchInterval:3e4,refetchIntervalInBackground:!1}),n=h.default.useMemo(()=>hN(a.data,e,t),[a.data,e,t]),r=h.default.useMemo(()=>gN(n),[n]),s=a.data?.scheduler_enabled!==!1;return{automations:n,summary:r,schedulerEnabled:s,isLoading:a.isLoading,isRefreshing:a.isFetching,error:a.error||null,refetch:a.refetch}}var CN=["outbound-delivery","preferences"],EN=["outbound-delivery","targets"];function TN(){let e=ee(),t=H({queryKey:CN,queryFn:Dx}),a=H({queryKey:EN,queryFn:Mx}),n=Y({mutationFn:({finalReplyTargetId:i})=>Ox({finalReplyTargetId:i}),onSuccess:i=>{e.setQueryData(CN,i),e.invalidateQueries({queryKey:EN})}}),r=h.default.useMemo(()=>a.data?.targets??[],[a.data]),s=h.default.useMemo(()=>r.filter(i=>i?.capabilities?.final_replies),[r]);return{preferences:t.data??null,targets:r,finalReplyTargets:s,currentTarget:t.data?.final_reply_target??null,currentStatus:t.data?.final_reply_target_status??"none_configured",isLoading:t.isLoading||a.isLoading,isRefreshing:t.isFetching||a.isFetching,isSaving:n.isPending,error:t.error||a.error||null,saveError:n.error||null,saveFinalReplyTarget:i=>n.mutateAsync({finalReplyTargetId:i}),refetch:()=>{t.refetch(),a.refetch()}}}function AN(){let e=k(),[t,a]=h.default.useState("all"),[n,r]=h.default.useState(null),s=kN(),i=TN(),[o,u]=h.default.useState(!1),c=h.default.useRef(null);h.default.useEffect(()=>()=>clearTimeout(c.current),[]);let d=h.default.useCallback(()=>{u(!0),clearTimeout(c.current),c.current=setTimeout(()=>u(!1),1e3),s.refetch()},[s.refetch]),m=s.isRefreshing||o,f=s.error&&!s.isLoading&&s.automations.length===0;return h.default.useEffect(()=>{if(!s.automations.length){r(null);return}s.automations.some(b=>b.automation_id===n)||r(s.automations[0].automation_id)},[s.automations,n]),l`
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="v2-page-entrance flex-1 p-4 sm:p-6">
        <div className="space-y-5">
          ${s.error&&l`
            <div
              className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            >
              ${e("automations.error.loadFailed")}
            </div>
          `}

          ${f?null:l`
                ${!s.isLoading&&!s.schedulerEnabled&&l`
                  <div
                    role="status"
                    className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3"
                  >
                    <div className="text-sm font-semibold text-amber-200">
                      ${e("automations.schedulerOff.title")}
                    </div>
                    <div className="mt-0.5 text-xs leading-5 text-amber-200/80">
                      ${e("automations.schedulerOff.description")}
                    </div>
                  </div>
                `}
                <${RN}
                  summary=${s.summary}
                  activeFilter=${t}
                  onSelectFilter=${a}
                />
                <${cN} deliveryState=${i} />

                ${s.isLoading?l`
                      <div className="space-y-4">
                        ${[1,2,3].map(p=>l`<div
                              key=${p}
                              className="v2-skeleton h-28 rounded-[18px]"
                            />`)}
                      </div>
                    `:l`
                      <${_N}
                        automations=${s.automations}
                        filter=${t}
                        onFilterChange=${a}
                        onRefresh=${d}
                        isRefreshing=${m}
                        selectedAutomationId=${n}
                        onSelectAutomation=${r}
                      />
                    `}
              `}
        </div>
      </div>
    </div>
  `}var DN={success:"border-mint/30 bg-mint/10 text-mint",error:"border-red-400/30 bg-red-500/10 text-red-200",info:"border-signal/30 bg-signal/10 text-signal"};function MN({result:e,onDismiss:t}){return h.default.useEffect(()=>{if(!e)return;let a=setTimeout(t,4e3);return()=>clearTimeout(a)},[e,t]),e?l`
    <div className=${["flex items-center gap-3 rounded-xl border px-4 py-3 text-sm",DN[e.type]||DN.info].join(" ")}>
      <${M}
        name=${e.type==="success"?"check":e.type==="error"?"close":"bolt"}
        className="h-4 w-4 shrink-0"
      />
      <span className="min-w-0 flex-1">${e.message}</span>
      <button onClick=${t} className="shrink-0 opacity-70 hover:opacity-100">
        <${M} name="close" className="h-3.5 w-3.5" />
      </button>
    </div>
  `:null}var ON="/api/webchat/v2/channels/slack/allowed",wD="/api/webchat/v2/channels/slack/subjects";function LN(e=[]){return Array.from(new Set(e.map(t=>String(t||"").trim()).filter(Boolean))).sort()}function PN(){return Z(ON)}function jN(){return Z(wD)}function UN(e){let t=e.some(r=>typeof r!="string"),a=e.map(r=>typeof r=="string"?{channel_id:r}:{channel_id:r.channel_id,subject_user_id:r.subject_user_id}),n=t?{channels:a}:{channel_ids:a.map(r=>r.channel_id)};return Z(ON,{method:"PUT",body:JSON.stringify(n)})}function FN(e,t){return e?.payload?.error||e?.payload?.message||e?.message||t}var zN=["slack-allowed-channels"];function qN({action:e}){let t=k(),a=ee(),[n,r]=h.default.useState(""),[s,i]=h.default.useState(""),[o,u]=h.default.useState([]),c=ND(e,t),d=H({queryKey:zN,queryFn:PN}),m=H({queryKey:["slack-routable-subjects"],queryFn:jN}),f=m.data?.subjects||[],p=BN(f),b=m.isSuccess||m.isError,y=f.length>0;h.default.useEffect(()=>{d.data&&u(wh(d.data.channels||[]))},[d.data]);let x=Y({mutationFn:({channels:R})=>UN(R),onSuccess:R=>{u(wh(R.channels||[])),a.invalidateQueries({queryKey:zN}),a.invalidateQueries({queryKey:["slack-routable-subjects"]}),a.invalidateQueries({queryKey:["extensions"]}),a.invalidateQueries({queryKey:["connectable-channels"]})}}),g=()=>{let R=n.trim();!R||!m.isSuccess||(u(C=>wh([...C,{channel_id:R,subject_user_id:s}])),r(""))},v=R=>{u(C=>C.filter(E=>E.channel_id!==R))},$=(R,C)=>{u(E=>E.map(O=>O.channel_id===R?{...O,subject_user_id:C}:O))},w=()=>{x.mutate({channels:SD(o)})},S=m.isError&&o.some(R=>!R.subject_user_id);return l`
    <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal">
            ${c.title}
          </h4>
          <p className="mt-2 text-xs leading-5 text-iron-300">
            ${c.instructions}
          </p>
        </div>
        ${d.data?.team_id&&l`<span className="shrink-0 rounded-md border border-white/[0.08] px-2 py-1 font-mono text-[10px] text-iron-500">
          ${d.data.team_id}
        </span>`}
      </div>

      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="text"
          value=${n}
          onChange=${R=>r(R.target.value)}
          onKeyDown=${R=>R.key==="Enter"&&g()}
          placeholder=${c.inputPlaceholder}
          className="h-9 min-w-0 flex-1 rounded-md border border-white/12 bg-white/[0.04] px-3 font-mono text-sm text-iron-100 outline-none placeholder:text-iron-700 focus:border-signal/45"
        />
        <select
          value=${s}
          onChange=${R=>i(R.target.value)}
          disabled=${!y}
          className="h-9 min-w-0 rounded-md border border-white/12 bg-white/[0.04] px-3 text-sm text-iron-100 outline-none focus:border-signal/45"
        >
          ${!y&&l`<option value="">${c.noSubjectsLabel}</option>`}
          ${y&&l`<option value="">${c.autoSubjectLabel}</option>`}
          ${p.map(R=>l`
              <option key=${R.subject_user_id} value=${R.subject_user_id}>
                ${R.display_name}
              </option>
            `)}
        </select>
        <${T}
          variant="secondary"
          size="sm"
          className="shrink-0"
          onClick=${g}
          disabled=${!n.trim()||!m.isSuccess}
        >
          ${c.addLabel}
        <//>
      </div>

      <div className="mb-3 rounded-lg border border-white/[0.06] bg-black/10">
        ${d.isLoading&&l`<div className="px-3 py-2 text-xs text-iron-400">${c.loadingMessage}</div>`}
        ${!d.isLoading&&o.length===0&&l`<div className="px-3 py-2 text-xs text-iron-500">
          ${c.emptyMessage}
        </div>`}
        ${o.map(R=>l`
            <label
              key=${R.channel_id}
              className="flex min-h-10 items-center justify-between gap-3 border-t border-white/[0.05] px-3 first:border-t-0"
            >
              <span className="min-w-0">
                <span className="block truncate font-mono text-xs text-iron-200">
                  ${R.channel_id}
                </span>
              </span>
              <div className="flex shrink-0 items-center gap-2">
                ${y?l`
                    <select
                      value=${R.subject_user_id}
                      onChange=${C=>$(R.channel_id,C.target.value)}
                      className="h-8 rounded-md border border-white/10 bg-white/[0.04] px-2 text-xs text-iron-100 outline-none focus:border-signal/45"
                    >
                      <option value="">${c.autoSubjectLabel}</option>
                      ${BN(f,R).map(C=>l`
                          <option key=${C.subject_user_id} value=${C.subject_user_id}>
                            ${C.display_name}
                          </option>
                        `)}
                    </select>
                  `:l`<span className="max-w-40 truncate text-xs text-iron-500">
                    ${R.subject_user_id?R.subject_display_name||R.subject_user_id:c.autoSubjectLabel}
                  </span>`}
                <input
                  type="checkbox"
                  checked=${!0}
                  aria-label=${c.allowLabel(R.channel_id)}
                  onChange=${()=>v(R.channel_id)}
                  className="h-4 w-4 rounded border-white/20 bg-white/[0.04] text-signal"
                />
              </div>
            </label>
          `)}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <${T}
          variant="primary"
          size="sm"
          className="shrink-0"
          onClick=${w}
          disabled=${!d.isSuccess||!b||x.isPending||S}
        >
          ${x.isPending?c.savingLabel:c.submitLabel}
        <//>
        ${x.isSuccess&&l`<p className="text-xs text-emerald-300">
          ${c.successMessage}
        </p>`}
        ${(d.isError||m.isError||x.isError)&&l`<p className="text-xs text-red-300">
          ${FN(x.error||d.error||m.error,c.errorMessage)}
        </p>`}
      </div>
    </div>
  `}function BN(e=[],t={}){let a=new Map;for(let r of e){let s=String(r.subject_user_id||"").trim();s&&a.set(s,{subject_user_id:s,display_name:r.display_name||s})}let n=String(t.subject_user_id||"").trim();return n&&!a.has(n)&&a.set(n,{subject_user_id:n,display_name:t.subject_display_name||n}),Array.from(a.values()).sort((r,s)=>r.display_name.localeCompare(s.display_name)||r.subject_user_id.localeCompare(s.subject_user_id))}function wh(e=[]){let t=new Map;for(let a of e){let n=String(a.channel_id||"").trim();if(!n)continue;let r={channel_id:n,subject_user_id:String(a.subject_user_id||"").trim()},s=String(a.subject_display_name||"").trim();s&&(r.subject_display_name=s),t.set(n,r)}return LN(Array.from(t.keys())).map(a=>t.get(a))}function SD(e=[]){return e.map(t=>({channel_id:t.channel_id,subject_user_id:t.subject_user_id}))}function ND(e,t){return{title:e?.title||t("channels.slackAccessTitle"),instructions:e?.instructions||t("channels.slackAccessInstructions"),inputPlaceholder:e?.input_placeholder||e?.code_placeholder||"C0123456789",addLabel:t("channels.slackAccessAdd"),loadingMessage:t("channels.slackAccessLoading"),emptyMessage:t("channels.slackAccessEmpty"),submitLabel:e?.submit_label||t("channels.slackAccessSave"),savingLabel:t("channels.slackAccessSaving"),successMessage:e?.success_message||t("channels.slackAccessSuccess"),errorMessage:e?.error_message||t("channels.slackAccessError"),autoSubjectLabel:t("channels.slackAccessAutoSubject"),noSubjectsLabel:t("channels.slackAccessNoSubjects"),allowLabel:a=>t("channels.slackAccessAllow",{channelId:a})}}var Sh={wasm_tool:"WASM Tool",wasm_channel:"Channel",channel:"Channel",mcp_server:"MCP Server",first_party:"First-party",system:"System",channel_relay:"Relay"};function or(e){return e==="wasm_channel"||e==="channel"}var IN={active:"success",ready:"success",pairing_required:"warning",pairing:"warning",auth_required:"warning",setup_required:"muted",failed:"danger",installed:"muted"},HN={active:"active",ready:"ready",pairing_required:"pairing",pairing:"pairing",auth_required:"auth needed",setup_required:"setup needed",failed:"failed",installed:"installed"},KN={mounted:"success",disabled:"muted",missing_secret:"warning"},QN={mounted:"route live",disabled:"route off",missing_secret:"route misconfigured"};function VN(e){let t=GN(e);return!e?.package_ref||t==="active"||t==="ready"?null:t==="auth_required"||t==="setup_required"?"configure":e?.kind==="wasm_channel"||or(e?.kind)&&(t==="pairing_required"||t==="pairing")?null:"activate"}function GN(e){return e?.onboarding_state||e?.onboardingState||e?.activation_status||e?.activationStatus||(e?.active?"active":"installed")}function Nh(e){let t=GN(e);return t==="active"||t==="ready"}function YN({extension:e,secrets:t=[],fields:a=[]}={}){return Nh(e)||a.length>0||t.length===0?!1:t.every(n=>n.provided)}var JN="flex self-start flex-col rounded-[14px] border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] p-4",XN="mt-1.5 flex flex-wrap items-center gap-x-2 font-mono text-[10px] text-[var(--v2-text-faint)]",ZN="mt-2 line-clamp-2 min-h-[2.5rem] text-xs leading-5 text-[var(--v2-text-muted)]",WN="mt-3 flex items-center gap-2 border-t border-[var(--v2-panel-border)] pt-3",e_="v2-button inline-flex items-center gap-1.5 border-0 bg-transparent p-0 font-mono text-[11px] text-[var(--v2-text-faint)] hover:text-[var(--v2-accent-text)]",_D="rounded border border-[var(--v2-panel-border)] bg-[var(--v2-surface)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--v2-text-muted)]";function t_(e){return e.package_ref?.id||""}function RD({actions:e,isBusy:t}){let a=k(),[n,r]=h.default.useState(!1),s=h.default.useRef(null);return h.default.useEffect(()=>{if(!n)return;let i=o=>{s.current&&!s.current.contains(o.target)&&r(!1)};return document.addEventListener("mousedown",i),()=>document.removeEventListener("mousedown",i)},[n]),l`
    <div ref=${s} className="relative shrink-0">
      <button
        type="button"
        aria-label=${a("extensions.moreActions")}
        aria-haspopup="true"
        aria-expanded=${n?"true":"false"}
        disabled=${t}
        onClick=${()=>r(i=>!i)}
        className="grid h-7 w-7 place-items-center rounded-md border border-transparent text-[var(--v2-text-faint)] hover:bg-[var(--v2-surface-muted)] hover:text-[var(--v2-text-strong)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <${M} name="more" className="h-4 w-4" strokeWidth=${2.4} />
      </button>
      ${n&&l`
        <div
          role="menu"
          className="absolute right-0 top-8 z-10 min-w-[156px] rounded-[10px] border border-[var(--v2-panel-border)] bg-[var(--v2-surface)] p-1 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.7)]"
        >
          ${e.map(i=>l`
              <button
                key=${i.id}
                type="button"
                role="menuitem"
                disabled=${t}
                onClick=${()=>{r(!1),i.run()}}
                className=${["flex w-full items-center gap-2.5 rounded-[7px] px-2.5 py-1.5 text-left text-[13px] disabled:cursor-not-allowed disabled:opacity-50",i.danger?"text-[var(--v2-danger-text)] hover:bg-[var(--v2-danger-soft)]":"text-[var(--v2-text)] hover:bg-[var(--v2-surface-soft)]"].join(" ")}
              >
                <${M} name=${i.icon||"settings"} className="h-3.5 w-3.5" />
                ${i.label}
              </button>
            `)}
        </div>
      `}
    </div>
  `}function a_({items:e}){return!e||e.length===0?null:l`
    <div className="mt-3 flex flex-wrap gap-1">
      ${e.map(t=>l`<span key=${t} className=${_D}>${t}</span>`)}
    </div>
  `}function ci({ext:e,onActivate:t,onConfigure:a,onRemove:n,isBusy:r}){let s=k(),i=e.onboarding_state||e.activation_status||(e.active?"active":"installed"),o=IN[i]||"muted",u=s(`extensions.state.${i}`)||HN[i]||i,c=or(e.kind)&&e.runtime_status||null,d=c?KN[c]||"muted":null,m=c?QN[c]||c:null,f=s(`extensions.kind.${e.kind}`)||Sh[e.kind]||e.kind,p=e.display_name||t_(e),b=!!e.package_ref,y=e.tools||[],[x,g]=h.default.useState(!1),$=(i==="setup_required"||i==="auth_required"?e.onboarding?.credential_instructions||e.onboarding?.credential_next_step:e.onboarding?.credential_next_step||e.onboarding?.credential_instructions)||null,w={packageRef:e.package_ref,displayName:p,active:e.active,activationStatus:e.activation_status,onboardingState:e.onboarding_state},S=[],R=[],C=VN(e);C==="configure"?S.push({id:"configure",label:e.authenticated?s("extensions.reconfigure"):s("extensions.configure"),run:()=>a(w)}):C==="activate"&&S.push({id:"activate",label:"Activate",run:()=>t(w)}),b&&(e.needs_setup||e.has_auth)&&C!=="configure"&&R.push({id:"configure",label:e.authenticated?s("extensions.reconfigure"):s("extensions.configure"),icon:"settings",run:()=>a(w)}),b&&or(e.kind)&&(i==="setup_required"||i==="failed")&&R.push({id:"setup",label:"Setup",icon:"settings",run:()=>a(w)}),b&&or(e.kind)&&(i==="active"||i==="ready"||i==="pairing_required"||i==="pairing")&&R.push({id:"reconfigure",label:"Reconfigure",icon:"settings",run:()=>a(w)}),b&&R.push({id:"remove",label:s("common.remove")||"Remove",icon:"trash",danger:!0,run:()=>n(w)});let E=S[0];return l`
    <div className=${JN}>
      <div className="flex items-start gap-2">
        <${z} tone=${o} label=${u} size="sm" />
        ${c&&l`<${z} tone=${d} label=${m} size="sm" />`}
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-[var(--v2-text-strong)]">
          ${p}
        </span>
        ${R.length>0&&l`<${RD} actions=${R} isBusy=${r} />`}
      </div>

      <div className=${XN}>
        <span>${f}</span>
        ${e.version&&l`<span>· v${e.version}</span>`}
      </div>

      ${e.description&&l`<p className=${ZN}>${e.description}</p>`}

      ${e.activation_error&&l`
        <div
          className="mt-2 rounded-[10px] border border-[color-mix(in_srgb,var(--v2-danger-text)_36%,var(--v2-panel-border))] bg-[var(--v2-danger-soft)] px-3 py-1.5 text-xs text-[var(--v2-danger-text)]"
        >
          ${e.activation_error}
        </div>
      `}

      ${$&&l`
        <div className="mt-2 rounded-md border border-white/12 bg-white/[0.04] px-3 py-2 text-xs leading-5 text-[var(--v2-text-muted)]">
          ${$}
        </div>
      `}

      <div className=${WN}>
        ${y.length>0?l`
              <button
                type="button"
                aria-expanded=${x?"true":"false"}
                onClick=${()=>g(O=>!O)}
                className=${e_}
              >
                <${M} name="layers" className="h-3.5 w-3.5" />
                <span>${y.length===1?s("extensions.oneCapability"):s("extensions.pluralCapabilities",{count:y.length})}</span>
                <${M}
                  name="chevron"
                  className=${["h-3 w-3",x?"rotate-180":""].join(" ")}
                />
              </button>
            `:l`<span className="font-mono text-[11px] text-[var(--v2-text-faint)]">No capabilities</span>`}
        <span className="flex-1"></span>
        ${E&&l`
          <${T} variant="secondary" size="sm" onClick=${E.run} disabled=${r}>
            ${E.label}
          <//>
        `}
      </div>

      ${x&&l`<${a_} items=${y} />`}
    </div>
  `}function Hr({entry:e,onInstall:t,isBusy:a,statusLabel:n}){let r=k(),s=r(`extensions.kind.${e.kind}`)||Sh[e.kind]||e.kind,i=e.display_name||t_(e),o=!!(e.package_ref&&t),u=e.keywords||[],[c,d]=h.default.useState(!1);return l`
    <div className=${JN}>
      <div className="flex items-start gap-2">
        <${z}
          tone="muted"
          label=${n||r("extensions.state.available")||"available"}
          size="sm"
        />
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-[var(--v2-text-strong)]">
          ${i}
        </span>
      </div>

      <div className=${XN}>
        <span>${s}</span>
        ${e.version&&l`<span>· v${e.version}</span>`}
      </div>

      ${e.description&&l`<p className=${ZN}>${e.description}</p>`}

      <div className=${WN}>
        ${u.length>0?l`
              <button
                type="button"
                aria-expanded=${c?"true":"false"}
                onClick=${()=>d(m=>!m)}
                className=${e_}
              >
                <${M} name="list" className="h-3.5 w-3.5" />
                <span>${u.length===1?r("extensions.oneKeyword"):r("extensions.pluralKeywords",{count:u.length})}</span>
                <${M}
                  name="chevron"
                  className=${["h-3 w-3",c?"rotate-180":""].join(" ")}
                />
              </button>
            `:l`<span className="font-mono text-[11px] text-[var(--v2-text-faint)]"></span>`}
        <span className="flex-1"></span>
        ${o&&l`
          <${T}
            variant="outline"
            size="sm"
            onClick=${()=>t({packageRef:e.package_ref,displayName:i})}
            disabled=${a}
          >
            <${M} name="plus" className="mr-1.5 h-3.5 w-3.5" />
            Install
          <//>
        `}
      </div>

      ${c&&l`<${a_} items=${u} />`}
    </div>
  `}function n_(){return Z("/api/webchat/v2/extensions")}function r_(){return Z("/api/webchat/v2/extensions/registry")}function s_(e){return Z("/api/webchat/v2/extensions/install",{method:"POST",body:JSON.stringify({package_ref:e})})}function i_(e){return Z(`/api/webchat/v2/extensions/${encodeURIComponent(di(e))}/activate`,{method:"POST"})}function o_(e){return Z(`/api/webchat/v2/extensions/${encodeURIComponent(di(e))}/remove`,{method:"POST"})}function l_(e){return Z(`/api/webchat/v2/extensions/${encodeURIComponent(di(e))}/setup`)}function u_(e,t,a){return Z(`/api/webchat/v2/extensions/${encodeURIComponent(di(e))}/setup`,{method:"POST",body:JSON.stringify({action:"submit",payload:{secrets:t,fields:a}})})}function c_(e,t,a){return Z(`/api/webchat/v2/extensions/${encodeURIComponent(di(e))}/setup/test-connection`,{method:"POST",body:JSON.stringify({secrets:t,fields:a})})}function d_(e,t){let a=t?.setup||{},n=new Date(Date.now()+10*60*1e3).toISOString();return Z(`/api/webchat/v2/extensions/${encodeURIComponent(di(e))}/setup/oauth/start`,{method:"POST",body:JSON.stringify({provider:t.provider,account_label:a.account_label||`${t.provider} credential`,scopes:a.scopes||[],expires_at:n,invocation_id:a.invocation_id})})}function m_(){return Promise.resolve({requests:[]})}function f_(){return Promise.resolve({success:!1,message:"Pairing requires a v2 pairing endpoint."})}function di(e){let t=typeof e=="string"?e:e?.id;if(!t)throw new Error("Extension package_ref is required");return t}var kD=2e3,CD=10*60*1e3;function mi(e){return e?.package_ref?.id||null}function _h(e){return e?.display_name||mi(e)||""}function p_(e,t,a){return mi(t)||`${e}:${_h(t)||"unknown"}:${a}`}function ED(e,t){return e.installed!==t.installed?e.installed?-1:1:_h(e.entry||e.extension).localeCompare(_h(t.entry||t.extension))}function h_(){let e=ee(),t=H({queryKey:["gateway-status-extensions"],queryFn:Vs,staleTime:1e4}),a=H({queryKey:["extensions"],queryFn:n_}),n=H({queryKey:["extension-registry"],queryFn:r_}),r=H({queryKey:["connectable-channels"],queryFn:Tc}),s=h.default.useCallback(()=>{e.invalidateQueries({queryKey:["extensions"]}),e.invalidateQueries({queryKey:["extension-registry"]}),e.invalidateQueries({queryKey:["gateway-status-extensions"]}),e.invalidateQueries({queryKey:["connectable-channels"]})},[e]),[i,o]=h.default.useState(null),u=h.default.useCallback(()=>o(null),[]),c=Y({mutationFn:({packageRef:D})=>s_(D),onSuccess:(D,{displayName:B})=>{D.success?(o({type:"success",message:D.message||D.instructions||`${B||"Extension"} installed`}),D.auth_url&&window.open(D.auth_url,"_blank","noopener,noreferrer")):o({type:"error",message:D.message||"Install failed"}),s()},onError:D=>{o({type:"error",message:D.message}),s()}}),d=Y({mutationFn:({packageRef:D})=>i_(D),onSuccess:(D,{displayName:B})=>{D.success?(o({type:"success",message:D.message||D.instructions||`${B||"Extension"} activated`}),D.auth_url&&window.open(D.auth_url,"_blank","noopener,noreferrer")):D.auth_url?(window.open(D.auth_url,"_blank","noopener,noreferrer"),o({type:"info",message:"Opening authentication\u2026"})):D.awaiting_token?o({type:"info",message:"Configuration required"}):o({type:"error",message:D.message||"Activation failed"}),s()},onError:D=>{o({type:"error",message:D.message})}}),m=Y({mutationFn:({packageRef:D})=>o_(D),onSuccess:(D,{displayName:B})=>{D.success?o({type:"success",message:`${B||"Extension"} removed`}):o({type:"error",message:D.message||"Remove failed"}),s()},onError:D=>{o({type:"error",message:D.message})}}),f=t.data||{},p=a.data?.extensions||[],b=n.data?.entries||[],y=r.data?.channels||[],x=new Map(p.map(D=>[mi(D),D]).filter(([D])=>!!D)),g=new Set(b.map(D=>mi(D)).filter(Boolean)),v=[...b.map((D,B)=>{let V=mi(D),I=V&&x.get(V)||null;return{id:p_("registry",D,B),installed:!!(I||D.installed),entry:D,extension:I}}),...p.filter(D=>{let B=mi(D);return!B||!g.has(B)}).map((D,B)=>({id:p_("installed",D,B),installed:!0,entry:null,extension:D}))].sort(ED),$=D=>or(D.kind),w=p.filter($),S=p.filter(D=>D.kind==="mcp_server"),R=p.filter(D=>!$(D)&&D.kind!=="mcp_server"),C=b.filter(D=>$(D)&&!D.installed),E=b.filter(D=>D.kind==="mcp_server"&&!D.installed),O=b.filter(D=>D.kind!=="mcp_server"&&!$(D)&&!D.installed),j=a.isLoading||n.isLoading,J=c.isPending||d.isPending||m.isPending;return{status:f,extensions:p,channels:w,mcpServers:S,tools:R,channelRegistry:C,mcpRegistry:E,toolRegistry:O,registry:b,catalogEntries:v,connectableChannels:y,isLoading:j,isBusy:J,actionResult:i,clearResult:u,install:c.mutate,activate:d.mutate,remove:m.mutate,invalidate:s}}function v_(e){let t=H({queryKey:["extension-setup",e?.id||e],queryFn:()=>l_(e),enabled:!!e});return{secrets:t.data?.secrets||[],fields:t.data?.fields||[],onboarding:t.data?.onboarding||null,isLoading:t.isLoading,error:t.error}}function g_(e,t){let a=ee(),n=e?.id||e;return Y({mutationFn:({secrets:r,fields:s})=>u_(e,r,s),onSuccess:r=>{a.invalidateQueries({queryKey:["extensions"]}),a.invalidateQueries({queryKey:["extension-setup",n]}),t&&t(r)}})}function y_(e){return Y({mutationFn:({secrets:t,fields:a})=>c_(e,t,a)})}function b_(e){let t=ee(),a=e?.id||e,n=h.default.useRef(null),r=h.default.useCallback(()=>{n.current&&(window.clearInterval(n.current),n.current=null)},[]),s=h.default.useCallback(()=>{t.invalidateQueries({queryKey:["extensions"]}),t.invalidateQueries({queryKey:["extension-registry"]}),t.invalidateQueries({queryKey:["extension-setup",a]})},[a,t]),i=h.default.useCallback(()=>{let u=t.getQueryData(["extension-setup",a]);if(u?.secrets?.length>0&&u.secrets.every(f=>f.provided))return!0;let d=(t.getQueryData(["extensions"])?.extensions||[]).find(f=>f.package_ref?.id===a),m=d?.onboarding_state||d?.activation_status||(d?.active?"active":null);return m==="active"||m==="ready"},[a,t]),o=h.default.useCallback(u=>{r();let c=Date.now();n.current=window.setInterval(()=>{s(),(i()||u&&u.closed||Date.now()-c>CD)&&(r(),s())},kD)},[r,s,i]);return h.default.useEffect(()=>r,[r]),Y({mutationFn:({secret:u,popup:c})=>d_(e,u).then(d=>({res:d,popup:c})),onSuccess:({res:u,popup:c})=>{let d=c;u.authorization_url&&c&&!c.closed?c.location.href=u.authorization_url:u.authorization_url?d=window.open(u.authorization_url,"_blank","noopener,noreferrer"):c&&!c.closed&&c.close(),s(),d&&o(d)},onError:(u,c)=>{r();let d=c?.popup;d&&!d.closed&&d.close()}})}function x_(e,t={}){let a=H({queryKey:["pairing",e],queryFn:()=>m_(e),enabled:!!e&&t.enabled!==!1,refetchInterval:5e3}),n=ee(),r=Y({mutationFn:({code:s})=>f_(e,s),onSuccess:()=>{n.invalidateQueries({queryKey:["pairing",e]}),n.invalidateQueries({queryKey:["extensions"]})}});return{requests:a.data?.requests||[],isLoading:a.isLoading,approve:r.mutate,isApproving:r.isPending,result:r.isSuccess?r.data:null,error:r.isError?r.error:null}}function $_(e,t){return e?.payload?.error||e?.payload?.message||e?.message||t}var TD={title:"pairing.title",instructions:"pairing.instructions",placeholder:"pairing.placeholder",action:"pairing.approve",success:"pairing.success",error:"pairing.error",empty:"pairing.none"};function w_({channel:e,redeemFn:t,i18nKeys:a=TD,queryKeys:n,copy:r,showPendingRequests:s=!0}){let i=k(),o=typeof t=="function",u=x_(e,{enabled:!o}),c=ee(),[d,m]=h.default.useState(""),f=AD(i,a,r),p=Y({mutationFn:({code:S})=>t(e,S),onSuccess:()=>{m("");for(let S of n||[["pairing",e],["extensions"]])c.invalidateQueries({queryKey:S})}}),b=h.default.useCallback(S=>u.approve({code:S}),[u.approve]),y=h.default.useCallback(()=>{let S=d.trim();S&&(o?p.mutate({code:S}):(u.approve({code:S}),m("")))},[o,d,u.approve,p]),x=o?[]:u.requests,g=o?!1:u.isLoading,v=o?p.isPending:u.isApproving,$=o?p.isSuccess?p.data:null:u.result,w=o?p.isError?p.error:null:u.error;return g?l`
      <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
        <div className="v2-skeleton h-3 w-24 rounded" />
      </div>
    `:l`
    <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
      <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">
        ${f.title}
      </h4>
      <p className="mb-4 text-xs leading-5 text-iron-300">${f.instructions}</p>

      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="text"
          value=${d}
          onChange=${S=>m(S.target.value)}
          onKeyDown=${S=>S.key==="Enter"&&y()}
          placeholder=${f.placeholder}
          className="h-9 min-w-0 flex-1 rounded-md border border-white/12 bg-white/[0.04] px-3 font-mono text-sm text-iron-100 outline-none placeholder:text-iron-700 focus:border-signal/45"
        />
        <${T}
          variant="secondary"
          className="h-9 shrink-0 px-3 text-xs"
          onClick=${y}
          disabled=${v||!d.trim()}
        >
          ${f.action}
        <//>
      </div>

      ${$?.success&&l`<p className="mb-3 text-xs text-emerald-300">
        ${$.message||f.success}
      </p>`}
      ${$&&!$.success&&l`<p className="mb-3 text-xs text-red-300">
        ${$.message||f.error}
      </p>`}
      ${w&&l`<p className="mb-3 text-xs text-red-300">
        ${$_(w,f.error)}
      </p>`}

      ${s&&x.length>0?l`
            <div className="space-y-2">
              ${x.map(S=>l`
                <div
                  key=${S.code||S.id}
                  className="flex items-center justify-between gap-3 rounded-md border border-white/[0.06] bg-white/[0.02] px-3 py-2"
                >
                  <div className="min-w-0">
                    <span className="font-mono text-sm text-iron-200">${S.code||S.id}</span>
                    ${S.label&&l`
                      <span className="ml-2 text-xs text-iron-300">${S.label}</span>
                    `}
                  </div>
                  <${T}
                    variant="secondary"
                    className="h-7 px-2.5 text-xs"
                    onClick=${()=>b(S.code||S.id)}
                    disabled=${v}
                  >
                    ${f.action}
                  <//>
                </div>
              `)}
            </div>
          `:s&&l`<p className="text-xs text-iron-300">${i(a.empty)}</p>`}
    </div>
  `}function AD(e,t,a){return{title:a?.title||e(t.title),instructions:a?.instructions||e(t.instructions),placeholder:a?.input_placeholder||a?.code_placeholder||e(t.placeholder),action:a?.submit_label||e(t.action),success:a?.success_message||e(t.success),error:a?.error_message||e(t.error)}}function ed(e){return e.package_ref?.id||""}function S_(e){return ed(e)==="slack"}function __(e){return e?.channel==="slack"&&e.strategy==="admin_managed_channels"}function R_(e){return e?.channel==="slack"&&e.strategy==="inbound_proof_code"}function DD(e){let t=e||[],a=[t.find(__),t.find(R_)].filter(Boolean);if(a.length>0)return a;let n=t.find(r=>r.channel==="slack");return n?[n]:[]}function N_({slackConnectAction:e,slackConnectActions:t}){let n=(t||(e?[e]:[])).map(r=>__(r)?l`<${qN} action=${r.action} />`:R_(r)?l`<${Nc} action=${r.action} />`:null).filter(Boolean);return n.length>0?l`<div className="space-y-3">${n}</div>`:null}function k_({status:e,channels:t,connectableChannels:a,channelRegistry:n,onActivate:r,onConfigure:s,onRemove:i,onInstall:o,isBusy:u}){let c=k(),d=t||[],m=e.enabled_channels||[],f=DD(a),p=d.some(S_),b=f.length>0&&!p;return l`
    <div className="space-y-5">
      <div className="v2-panel rounded-[18px] p-5 sm:p-6">
        <h3
          className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-signal"
        >
          ${c("channels.builtIn")}
        </h3>
        <${fi}
          name="Web Gateway"
          description=${c("channels.webGatewayDesc")||"Browser-based chat with SSE streaming"}
          enabled=${!0}
          detail=${"SSE: "+(e.sse_connections||0)+" \xB7 WS: "+(e.ws_connections||0)}
        />
        <${fi}
          name="HTTP Webhook"
          description=${c("channels.httpWebhookDesc")||"Inbound webhook endpoint for external integrations"}
          enabled=${m.includes("http")}
          detail="ENABLE_HTTP=true"
        />
        <${fi}
          name="CLI"
          description=${c("channels.cliDesc")||"Terminal interface with TUI or simple REPL"}
          enabled=${m.includes("cli")}
          detail="ironclaw run --cli"
        />
        <${fi}
          name="REPL"
          description=${c("channels.replDesc")||"Minimal read-eval-print loop for testing"}
          enabled=${m.includes("repl")}
          detail="ironclaw run --repl"
        />
        ${b&&l`
          <${fi}
            name=${c("channels.slack")||"Slack"}
            description=${c("channels.slackDesc")||"Tenant app channel for DMs and app mentions"}
            enabled=${!1}
            statusLabel="legacy"
            statusTone="muted"
            detail=${c("channels.slackDetail")||"Tenant Slack app install"}
          >
            <${N_}
              slackConnectActions=${f}
            />
          </${fi}>
        `}
      </div>

      ${d.length>0&&l`
        <div className="v2-panel rounded-[18px] p-5 sm:p-6">
          <h3
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-signal"
          >
            ${c("channels.messaging")}
          </h3>
          <div className="grid grid-cols-1 gap-4">
            ${d.map(y=>l`
                <div key=${ed(y)} className="flex flex-col gap-3">
                  <${ci}
                    ext=${y}
                    onActivate=${r}
                    onConfigure=${s}
                    onRemove=${i}
                    isBusy=${u}
                  />
                  ${S_(y)&&l`<${N_}
                    slackConnectActions=${f}
                  />`}
                  ${(y.onboarding_state==="pairing_required"||y.onboarding_state==="pairing")&&l` <${w_} channel=${ed(y)} /> `}
                </div>
              `)}
          </div>
        </div>
      `}
      ${n.length>0&&l`
        <div className="v2-panel rounded-[18px] p-5 sm:p-6">
          <h3
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-signal"
          >
            ${c("channels.availableChannels")}
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-3">
            ${n.map(y=>l`
                <${Hr}
                  key=${ed(y)}
                  entry=${y}
                  onInstall=${o}
                  isBusy=${u}
                />
              `)}
          </div>
        </div>
      `}
    </div>
  `}function fi({name:e,description:t,enabled:a,detail:n,children:r,statusLabel:s=a?"on":"off",statusTone:i=a?"success":"muted"}){return l`
    <div
      className="border-t border-white/[0.06] py-4 first:border-0 first:pt-0"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-iron-200">${e}</span>
            <${z}
              tone=${i}
              label=${s}
            />
          </div>
          <div className="mt-1 text-xs text-iron-300">${t}</div>
          ${n&&l`<div className="mt-1 font-mono text-[11px] text-iron-700">
            ${n}
          </div>`}
        </div>
      </div>
      ${r}
    </div>
  `}function C_({extension:e,onActivate:t,onClose:a,onSaved:n}){let r=k(),s=e?.packageRef||e?.package_ref||null,i=s?.id||e?.id||"",o=e?.displayName||i||"Extension",{secrets:u=[],fields:c=[],onboarding:d,isLoading:m,error:f}=v_(s),[p,b]=h.default.useState({}),[y,x]=h.default.useState({}),[g,v]=h.default.useState(null),$=[...u,...c].some(I=>["nextcloud_talk_base_url","nextcloud_talk_bot_username","nextcloud_talk_app_password"].includes(I?.name)),w=i==="nextcloud-talk"||i==="nextcloud_talk"||i.toLowerCase().includes("nextcloud")||$,S=b_(s),R=y_(s),C=g_(s,I=>{I.success!==!1&&(n&&n(I),a())}),E=h.default.useCallback(()=>{let I={};for(let[re,xe]of Object.entries(p)){let Qe=(xe||"").trim();Qe&&(I[re]=Qe)}C.mutate({secrets:I,fields:y})},[p,y,C]),O=h.default.useCallback(()=>{let I={};for(let[re,xe]of Object.entries(p)){let Qe=(xe||"").trim();Qe&&(I[re]=Qe)}R.mutate({secrets:I,fields:y},{onSuccess:re=>{v({tone:re?.success===!1?"error":"success",message:re?.message||"Connection test completed."})},onError:re=>{v({tone:"error",message:re.message})}})},[p,y,R]),j=h.default.useCallback(I=>{let re=window.open("about:blank","_blank","width=600,height=600");re&&(re.opener=null),S.mutate({secret:I,popup:re})},[S]),D=u.filter(I=>(I.setup?.kind||"manual_token")==="manual_token").length>0||c.length>0,B=Nh(e),V=YN({extension:e,secrets:u,fields:c});return m?l`
      <${td} onClose=${a} title=${r("extensions.configureName").replace("{name}",o)}>
        <div className="space-y-3">
          ${[1,2].map(I=>l`<div
                key=${I}
                className="v2-skeleton h-10 w-full rounded-md"
              />`)}
        </div>
      <//>
    `:f?l`
      <${td} onClose=${a} title=${r("extensions.configureName").replace("{name}",o)}>
        <p className="text-sm text-red-200">
          ${r("extensions.loadFailed")||"Failed to load setup:"} ${f.message}
        </p>
      <//>
    `:u.length===0&&c.length===0?l`
      <${td} onClose=${a} title=${r("extensions.configureName").replace("{name}",o)}>
        <p className="text-sm text-iron-300">
          ${r("extensions.noConfigRequired")||"No configuration required for this extension."}
        </p>
      <//>
    `:l`
    <${td} onClose=${a} title=${r("extensions.configureName").replace("{name}",o)}>
      ${d?.credential_instructions&&l`
        <p className="mb-4 text-sm leading-6 text-iron-300">
          ${d.credential_instructions}
        </p>
      `}
      ${d?.setup_url&&l`
        <a
          href=${d.setup_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-signal hover:underline"
        >
          Get credentials
          <${M} name="bolt" className="h-3.5 w-3.5" />
        </a>
      `}

      <div className="space-y-4">
        ${u.map(I=>l`
            <div key=${I.name}>
              <label
                className="mb-1.5 flex items-center gap-2 text-sm text-iron-200"
              >
                ${I.prompt||I.name}
                ${I.optional&&l`
                  <span className="font-mono text-[10px] text-iron-700"
                    >${r("common.optional")||"optional"}</span
                  >
                `}
                ${I.provided&&l`
                  <span className="font-mono text-[10px] text-mint"
                    >${r("common.configured")||"configured"}</span
                  >
                `}
              </label>
              ${(I.setup?.kind||"manual_token")==="oauth"?l`
                    <div className="flex items-center justify-between gap-3 rounded-md border border-white/12 bg-white/[0.04] px-3 py-2">
                      <span className="text-xs text-iron-300">
                        ${I.provided?r("extensions.authConfigured")||"Authorization is configured.":r("extensions.authPopup")||"Authorize this provider in a browser popup."}
                      </span>
                      <${T}
                        variant=${I.provided?"secondary":"primary"}
                        onClick=${()=>j(I)}
                        disabled=${S.isPending}
                      >
                        ${S.isPending?r("extensions.opening"):I.provided?r("extensions.reconnect"):r("extensions.authorize")}
                      <//>
                    </div>
                  `:l`
              <input
                type="password"
                placeholder=${I.provided?"\u2022\u2022\u2022\u2022\u2022\u2022\u2022 (leave blank to keep)":""}
                value=${p[I.name]||""}
                onChange=${re=>b(xe=>({...xe,[I.name]:re.target.value}))}
                onKeyDown=${re=>re.key==="Enter"&&E()}
                className="h-10 w-full rounded-md border border-white/12 bg-white/[0.04] px-3 text-sm text-iron-100 outline-none placeholder:text-iron-700 focus:border-signal/45"
              />
              ${I.auto_generate&&!I.provided&&l`
                <p className="mt-1 text-xs text-iron-700">
                  ${r("extensions.autoGenerated")||"Auto-generated if left blank"}
                </p>
              `}
                  `}
            </div>
          `)}
        ${c.map(I=>l`
            <div key=${I.name}>
              <label
                className="mb-1.5 flex items-center gap-2 text-sm text-iron-200"
              >
                ${I.prompt||I.name}
                ${I.provided&&l`
                  <span className="font-mono text-[10px] text-mint"
                    >${r("common.configured")||"configured"}</span
                  >
                `}
                ${I.optional&&l`
                  <span className="font-mono text-[10px] text-iron-700"
                    >${r("common.optional")||"optional"}</span
                  >
                `}
              </label>
              <input
                type="text"
                placeholder=${I.provided?"\u2022\u2022\u2022\u2022\u2022\u2022\u2022 (leave blank to keep)":I.placeholder||""}
                value=${y[I.name]||""}
                onChange=${re=>x(xe=>({...xe,[I.name]:re.target.value}))}
                onKeyDown=${re=>re.key==="Enter"&&E()}
                className="h-10 w-full rounded-md border border-white/12 bg-white/[0.04] px-3 text-sm text-iron-100 outline-none placeholder:text-iron-700 focus:border-signal/45"
              />
            </div>
          `)}
      </div>

      ${d?.credential_next_step&&l`
        <p className="mt-4 text-xs leading-5 text-iron-300">
          ${d.credential_next_step}
        </p>
      `}
      ${B&&l`
        <div
          className="mt-4 rounded-md border border-mint/20 bg-mint/10 px-3 py-2 text-xs text-mint"
        >
          ${r("extensions.activeConfigured")}
        </div>
      `}
      ${C.error&&l`
        <div
          className="mt-4 rounded-md border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs text-red-200"
        >
          ${C.error.message}
        </div>
      `}
      ${S.error&&l`
        <div
          className="mt-4 rounded-md border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs text-red-200"
        >
          ${S.error.message}
        </div>
      `}
      ${g&&l`
        <div
          className=${g.tone==="error"?"mt-4 rounded-md border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs text-red-200":"mt-4 rounded-md border border-mint/20 bg-mint/10 px-3 py-2 text-xs text-mint"}
        >
          ${g.message}
        </div>
      `}

      <div className="mt-6 flex items-center justify-end gap-3">
        <${T} variant="ghost" onClick=${a}>${r("common.cancel")||"Cancel"}<//>
        ${w&&l`
          <${T}
            variant="secondary"
            onClick=${O}
            disabled=${R.isPending||C.isPending||S.isPending}
          >
            ${R.isPending?r("llm.testing"):r("llm.testConnection")}
          <//>
        `}
        ${V&&l`
        <${T}
          variant="primary"
          onClick=${()=>t?.(e)}
        >
          Activate
        <//>
        `}
        ${D&&l`
        <${T}
          variant=${V?"secondary":"primary"}
          onClick=${E}
          disabled=${C.isPending}
        >
          ${C.isPending?"Saving\u2026":r("common.save")||"Save"}
        <//>
        `}
      </div>
    <//>
  `}function td({onClose:e,title:t,children:a}){return h.default.useEffect(()=>{let n=r=>{r.key==="Escape"&&e()};return window.addEventListener("keydown",n),()=>window.removeEventListener("keydown",n)},[e]),l`
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick=${n=>{n.target===n.currentTarget&&e()}}
    >
      <div
        className="v2-panel mx-4 w-full max-w-lg rounded-2xl p-6"
        onClick=${n=>n.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">${t}</h3>
          <button
            onClick=${e}
            className="grid h-8 w-8 place-items-center rounded-md text-iron-300 hover:bg-white/[0.06] hover:text-white"
          >
            <${M} name="close" className="h-4 w-4" />
          </button>
        </div>
        ${a}
      </div>
    </div>
  `}function E_(e){return e.package_ref?.id||""}function T_({mcpServers:e,mcpRegistry:t,onActivate:a,onConfigure:n,onRemove:r,onInstall:s,isBusy:i}){let o=k();return e.length===0&&t.length===0?l`
      <div className="v2-panel rounded-[18px] p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-white">${o("extensions.emptyMcpTitle")}</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-iron-300">
          ${o("extensions.emptyMcpDesc")}
        </p>
      </div>
    `:l`
    <div className="space-y-5">
      ${e.length>0&&l`
        <div className="v2-panel rounded-[18px] p-5 sm:p-6">
          <h3
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-signal"
          >
            ${o("mcp.installed")}
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-3">
            ${e.map(u=>l`
                <${ci}
                  key=${E_(u)}
                  ext=${u}
                  onActivate=${a}
                  onConfigure=${n}
                  onRemove=${r}
                  isBusy=${i}
                />
              `)}
          </div>
        </div>
      `}
      ${t.length>0&&l`
        <div className="v2-panel rounded-[18px] p-5 sm:p-6">
          <h3
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-signal"
          >
            Available MCP servers
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-3">
            ${t.map(u=>l`
                <${Hr}
                  key=${E_(u)}
                  entry=${u}
                  onInstall=${s}
                  isBusy=${i}
                />
              `)}
          </div>
        </div>
      `}
    </div>
  `}function MD(e){return e?.package_ref?.id||""}function OD(e){return e.entry||e.extension||{}}function A_({catalogEntries:e,onInstall:t,onActivate:a,onConfigure:n,onRemove:r,isBusy:s}){let i=k(),[o,u]=h.default.useState(""),c=o.trim().toLowerCase(),d=c?e.filter(y=>{let x=OD(y);return(x.display_name||MD(x)).toLowerCase().includes(c)||(x.description||"").toLowerCase().includes(c)||(x.keywords||[]).some(g=>g.toLowerCase().includes(c))}):e,m=d.filter(y=>y.installed&&y.extension),f=d.filter(y=>y.installed&&!y.extension&&y.entry),p=m.length+f.length,b=d.filter(y=>!y.installed&&y.entry);return e.length===0?l`
      <div className="v2-panel rounded-[18px] p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-white">
          ${i("ext.registry.emptyTitle")}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-iron-300">
          ${i("ext.registry.emptyDesc")}
        </p>
      </div>
    `:l`
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value=${o}
          onChange=${y=>u(y.target.value)}
          placeholder=${i("ext.registry.searchPlaceholder")}
          className="h-9 flex-1 rounded-md border border-white/12 bg-white/[0.04] px-3 text-sm text-iron-100 outline-none placeholder:text-iron-700 focus:border-signal/45"
        />
        <span className="font-mono text-[11px] text-iron-700">
          ${d.length} / ${e.length}
        </span>
      </div>

      <div className="v2-panel rounded-[18px] p-5 sm:p-6">
        ${d.length===0?l`<p className="py-4 text-sm text-iron-300">
              ${i("ext.registry.noMatch")}
            </p>`:l`
              ${p>0&&l`
                <h3
                  className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-signal"
                >
                  ${i("extensions.installed")}
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-3">
                  ${m.map(y=>l`
                      <${ci}
                        key=${y.id}
                        ext=${y.extension||y.entry}
                        onActivate=${a}
                        onConfigure=${n}
                        onRemove=${r}
                        isBusy=${s}
                      />
                    `)}
                  ${f.map(y=>l`
                      <${Hr}
                        key=${y.id}
                        entry=${y.entry}
                        statusLabel=${i("extensions.installed")}
                        isBusy=${s}
                      />
                    `)}
                </div>
              `}

              ${b.length>0&&l`
                <h3
                  className=${["mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-signal",p>0?"mt-6":""].join(" ")}
                >
                  ${i("ext.registry.availableTitle")}
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-3">
                  ${b.map(y=>l`
                      <${Hr}
                        key=${y.id}
                        entry=${y.entry}
                        onInstall=${t}
                        isBusy=${s}
                      />
                    `)}
                </div>
              `}
            `}
      </div>
    </div>
  `}function Rh(){let{tab:e="registry"}=ot(),[t,a]=h.default.useState(null),{status:n,channels:r,mcpServers:s,channelRegistry:i,mcpRegistry:o,catalogEntries:u,connectableChannels:c,isLoading:d,isBusy:m,actionResult:f,clearResult:p,install:b,activate:y,remove:x,invalidate:g}=h_(),v=h.default.useCallback(C=>a(C),[]),$=h.default.useCallback(()=>a(null),[]),w=h.default.useCallback(()=>g(),[g]),S=h.default.useCallback(C=>{C&&(y(C),a(null))},[y]);if(d)return l`
      <div className="flex h-full flex-col overflow-y-auto">
        <div className="v2-page-entrance flex-1 p-4 sm:p-6">
          <div className="space-y-5">
            ${[1,2,3].map(C=>l`
                <div
                  key=${C}
                  className="flex items-center justify-between border-t border-white/[0.06] py-4 first:border-0"
                >
                  <div>
                    <div className="v2-skeleton h-4 w-40 rounded" />
                    <div className="v2-skeleton mt-2 h-3 w-56 rounded" />
                  </div>
                  <div className="v2-skeleton h-7 w-16 rounded-full" />
                </div>
              `)}
          </div>
        </div>
      </div>
    `;if(e==="installed")return l`<${lt} to="/extensions/registry" replace />`;let R={channels:l`<${k_}
      status=${n}
      channels=${r}
      connectableChannels=${c}
      channelRegistry=${i}
      onActivate=${y}
      onConfigure=${v}
      onRemove=${x}
      onInstall=${b}
      isBusy=${m}
    />`,mcp:l`<${T_}
      mcpServers=${s}
      mcpRegistry=${o}
      onActivate=${y}
      onConfigure=${v}
      onRemove=${x}
      onInstall=${b}
      isBusy=${m}
    />`,registry:l`<${A_}
      catalogEntries=${u}
      onInstall=${b}
      onActivate=${y}
      onConfigure=${v}
      onRemove=${x}
      isBusy=${m}
    />`};return R[e]?l`
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="v2-page-entrance flex-1 p-4 sm:p-6">
        <div className="space-y-5">
          <${MN} result=${f} onDismiss=${p} />
          ${R[e]}
        </div>
      </div>

      ${t&&l`
        <${C_}
          extension=${t}
          onActivate=${S}
          onClose=${$}
          onSaved=${w}
        />
      `}
    </div>
  `:l`<${lt} to="/extensions/registry" replace />`}var D_=[{groupKey:"settings.group.embeddings",fields:[{key:"embeddings.enabled",labelKey:"settings.field.embeddingsEnabled",descKey:"settings.field.embeddingsEnabledDesc",type:"boolean"},{key:"embeddings.provider",labelKey:"settings.field.embeddingsProvider",descKey:"settings.field.embeddingsProviderDesc",type:"select",options:["openai","nearai"]},{key:"embeddings.model",labelKey:"settings.field.embeddingsModel",descKey:"settings.field.embeddingsModelDesc",type:"text"}]},{groupKey:"settings.group.sampling",fields:[{key:"temperature",labelKey:"settings.field.temperature",descKey:"settings.field.temperatureDesc",type:"float",min:0,max:2,step:.1}]}],M_=[{groupKey:"settings.group.core",fields:[{key:"agent.name",labelKey:"settings.field.agentName",descKey:"settings.field.agentNameDesc",type:"text"},{key:"agent.max_parallel_jobs",labelKey:"settings.field.maxParallelJobs",descKey:"settings.field.maxParallelJobsDesc",type:"number"},{key:"agent.job_timeout_secs",labelKey:"settings.field.jobTimeout",descKey:"settings.field.jobTimeoutDesc",type:"number"},{key:"agent.max_tool_iterations",labelKey:"settings.field.maxToolIterations",descKey:"settings.field.maxToolIterationsDesc",type:"number"},{key:"agent.use_planning",labelKey:"settings.field.planning",descKey:"settings.field.planningDesc",type:"boolean"},{key:"agent.auto_approve_tools",labelKey:"settings.field.autoApproveTools",descKey:"settings.field.autoApproveToolsDesc",type:"boolean"},{key:"agent.default_timezone",labelKey:"settings.field.timezone",descKey:"settings.field.timezoneDesc",type:"text"},{key:"agent.session_idle_timeout_secs",labelKey:"settings.field.sessionIdleTimeout",descKey:"settings.field.sessionIdleTimeoutDesc",type:"number"},{key:"agent.stuck_threshold_secs",labelKey:"settings.field.stuckThreshold",descKey:"settings.field.stuckThresholdDesc",type:"number"},{key:"agent.max_repair_attempts",labelKey:"settings.field.maxRepairAttempts",descKey:"settings.field.maxRepairAttemptsDesc",type:"number"},{key:"agent.max_cost_per_day_cents",labelKey:"settings.field.dailyCostLimit",descKey:"settings.field.dailyCostLimitDesc",type:"number",min:0},{key:"agent.max_actions_per_hour",labelKey:"settings.field.actionsPerHour",descKey:"settings.field.actionsPerHourDesc",type:"number",min:0},{key:"agent.allow_local_tools",labelKey:"settings.field.allowLocalTools",descKey:"settings.field.allowLocalToolsDesc",type:"boolean"}]},{groupKey:"settings.group.heartbeat",fields:[{key:"heartbeat.enabled",labelKey:"settings.field.heartbeatEnabled",descKey:"settings.field.heartbeatEnabledDesc",type:"boolean"},{key:"heartbeat.interval_secs",labelKey:"settings.field.heartbeatInterval",descKey:"settings.field.heartbeatIntervalDesc",type:"number"},{key:"heartbeat.notify_channel",labelKey:"settings.field.heartbeatNotifyChannel",descKey:"settings.field.heartbeatNotifyChannelDesc",type:"text"},{key:"heartbeat.notify_user",labelKey:"settings.field.heartbeatNotifyUser",descKey:"settings.field.heartbeatNotifyUserDesc",type:"text"},{key:"heartbeat.quiet_hours_start",labelKey:"settings.field.quietHoursStart",descKey:"settings.field.quietHoursStartDesc",type:"number",min:0,max:23},{key:"heartbeat.quiet_hours_end",labelKey:"settings.field.quietHoursEnd",descKey:"settings.field.quietHoursEndDesc",type:"number",min:0,max:23},{key:"heartbeat.timezone",labelKey:"settings.field.heartbeatTimezone",descKey:"settings.field.heartbeatTimezoneDesc",type:"text"}]},{groupKey:"settings.group.sandbox",fields:[{key:"sandbox.enabled",labelKey:"settings.field.sandboxEnabled",descKey:"settings.field.sandboxEnabledDesc",type:"boolean"},{key:"sandbox.policy",labelKey:"settings.field.sandboxPolicy",descKey:"settings.field.sandboxPolicyDesc",type:"select",options:["readonly","workspace_write","full_access"]},{key:"sandbox.timeout_secs",labelKey:"settings.field.sandboxTimeout",descKey:"settings.field.sandboxTimeoutDesc",type:"number",min:0},{key:"sandbox.memory_limit_mb",labelKey:"settings.field.sandboxMemoryLimit",descKey:"settings.field.sandboxMemoryLimitDesc",type:"number",min:0},{key:"sandbox.image",labelKey:"settings.field.sandboxImage",descKey:"settings.field.sandboxImageDesc",type:"text"}]},{groupKey:"settings.group.routines",fields:[{key:"routines.max_concurrent",labelKey:"settings.field.routinesMaxConcurrent",descKey:"settings.field.routinesMaxConcurrentDesc",type:"number",min:0},{key:"routines.default_cooldown_secs",labelKey:"settings.field.routinesDefaultCooldown",descKey:"settings.field.routinesDefaultCooldownDesc",type:"number",min:0}]},{groupKey:"settings.group.safety",fields:[{key:"safety.max_output_length",labelKey:"settings.field.safetyMaxOutput",descKey:"settings.field.safetyMaxOutputDesc",type:"number",min:0},{key:"safety.injection_check_enabled",labelKey:"settings.field.safetyInjectionCheck",descKey:"settings.field.safetyInjectionCheckDesc",type:"boolean"}]},{groupKey:"settings.group.skills",fields:[{key:"skills.max_active",labelKey:"settings.field.skillsMaxActive",descKey:"settings.field.skillsMaxActiveDesc",type:"number",min:0},{key:"skills.max_context_tokens",labelKey:"settings.field.skillsMaxContextTokens",descKey:"settings.field.skillsMaxContextTokensDesc",type:"number",min:0}]},{groupKey:"settings.group.search",fields:[{key:"search.fusion_strategy",labelKey:"settings.field.fusionStrategy",descKey:"settings.field.fusionStrategyDesc",type:"select",options:["rrf","weighted"]}]}],O_=[{groupKey:"settings.group.gateway",fields:[{key:"channels.gateway_host",labelKey:"settings.field.gatewayHost",descKey:"settings.field.gatewayHostDesc",type:"text"},{key:"channels.gateway_port",labelKey:"settings.field.gatewayPort",descKey:"settings.field.gatewayPortDesc",type:"number"}]},{groupKey:"settings.group.tunnel",fields:[{key:"tunnel.provider",labelKey:"settings.field.tunnelProvider",descKey:"settings.field.tunnelProviderDesc",type:"select",options:["ngrok","cloudflare","tailscale","custom"]},{key:"tunnel.public_url",labelKey:"settings.field.tunnelPublicUrl",descKey:"settings.field.tunnelPublicUrlDesc",type:"text"}]}],kh=new Set(["embeddings.enabled","embeddings.provider","embeddings.model","agent.auto_approve_tools","tunnel.provider","tunnel.public_url","gateway.rate_limit","gateway.max_connections"]);function L_(e){return String(e||"").trim().toLowerCase()}function P_(e){if(e==null)return"";if(Array.isArray(e))return e.map(P_).join(" ");if(typeof e=="object")try{return JSON.stringify(e)}catch{return""}return String(e)}function nt(e,t){let a=L_(e);return a?t.map(P_).join(" ").toLowerCase().includes(a):!0}function pi(e,t,a,n){let r=L_(a);return r?e.map(s=>{let i=s.groupKey?n(s.groupKey):"",o=s.fields.filter(u=>nt(r,[i,u.key,u.labelKey?n(u.labelKey):u.label,u.descKey?n(u.descKey):u.description,t[u.key]]));return{...s,fields:o}}).filter(s=>s.fields.length>0):e}function LD({visible:e}){let t=k();return e?l`
    <span
      className="font-mono text-[11px] text-mint"
      role="status"
    >
      ${t("tools.saved")}
    </span>
  `:null}function PD({checked:e,onChange:t,label:a}){return l`
    <button
      type="button"
      role="switch"
      aria-checked=${e}
      aria-label=${a}
      onClick=${()=>t(!e)}
      className=${["relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border",e?"border-signal/40 bg-signal/30":"border-white/15 bg-white/[0.06]"].join(" ")}
    >
      <span
        className=${["pointer-events-none inline-block h-5 w-5 rounded-full",e?"translate-x-5 bg-signal":"translate-x-0 bg-iron-300"].join(" ")}
      />
    </button>
  `}function jD({field:e,value:t,onSave:a,isSaved:n}){let r=k(),[s,i]=h.default.useState(""),o=e.labelKey?r(e.labelKey):e.label||"",u=e.descKey?r(e.descKey):e.description||"";h.default.useEffect(()=>{e.type!=="boolean"&&i(t!=null?String(t):"")},[t,e.type]);let c=h.default.useCallback(d=>{if(d==="")a(e.key,null);else if(e.type==="number"){let m=parseInt(d,10);isNaN(m)||a(e.key,m)}else if(e.type==="float"){let m=parseFloat(d);isNaN(m)||a(e.key,m)}else a(e.key,d)},[e.key,e.type,a]);return l`
    <div className="flex items-start justify-between gap-6 border-t border-white/[0.06] py-4 first:border-0 first:pt-0">
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-iron-200">${o}</div>
        ${u&&l`<div className="mt-1 text-xs leading-5 text-iron-300">${u}</div>`}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        ${e.type==="boolean"?l`
              <${PD}
                checked=${t===!0||t==="true"}
                onChange=${d=>a(e.key,d?"true":"false")}
                label=${o}
              />
            `:e.type==="select"?l`
              <select
                value=${s}
                onChange=${d=>{i(d.target.value),c(d.target.value)}}
                aria-label=${o}
                className="v2-select h-9 rounded-md border border-white/12 bg-white/[0.04] px-3 text-sm text-iron-100 outline-none focus:border-signal/45"
              >
                <option value="">${r("tools.default")}</option>
                ${e.options.map(d=>l`<option key=${d} value=${d}>${d}</option>`)}
              </select>
            `:l`
              <input
                type=${e.type==="float"||e.type==="number"?"number":"text"}
                value=${s}
                onChange=${d=>i(d.target.value)}
                onBlur=${d=>c(d.target.value)}
                onKeyDown=${d=>d.key==="Enter"&&c(d.target.value)}
                step=${e.step!==void 0?String(e.step):e.type==="float"?"any":"1"}
                min=${e.min!==void 0?String(e.min):void 0}
                max=${e.max!==void 0?String(e.max):void 0}
                placeholder=${r("tools.default")}
                aria-label=${o}
                className="h-9 w-36 rounded-md border border-white/12 bg-white/[0.04] px-3 text-right font-mono text-sm text-iron-100 outline-none placeholder:text-iron-700 focus:border-signal/45"
              />
            `}
        <${LD} visible=${n} />
      </div>
    </div>
  `}function hi({group:e,groupKey:t,fields:a,settings:n,onSave:r,savedKeys:s}){let i=k(),o=t?i(t):e||"";return l`
    <${ae} className="p-4 sm:p-6">
      <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]">${o}</h3>
      <div>
        ${a.map(u=>l`
              <${jD}
                key=${u.key}
                field=${u}
                value=${n[u.key]}
                onSave=${r}
                isSaved=${s[u.key]}
              />
            `)}
      </div>
    <//>
  `}function kt({query:e}){let t=k();return l`
    <${ae} padding="lg">
      <div className="flex items-center gap-3">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] text-[var(--v2-text-faint)]"
        >
          <${M} name="search" className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-[var(--v2-text-strong)]">
            ${t("settings.noMatchingSettings",{query:e})}
          </h3>
        </div>
      </div>
    <//>
  `}function j_({settings:e,onSave:t,savedKeys:a,isLoading:n,searchQuery:r=""}){let s=k();if(n)return l`<${UD} />`;let i=pi(M_,e,r,s);return i.length===0?l`<${kt} query=${r} />`:l`
    <div className="space-y-5">
      ${i.map(o=>l`
            <${hi}
              key=${o.groupKey}
              groupKey=${o.groupKey}
              fields=${o.fields}
              settings=${e}
              onSave=${t}
              savedKeys=${a}
            />
          `)}
    </div>
  `}function UD(){return l`
    <div className="space-y-5">
      ${[1,2,3].map(e=>l`
            <${ae} key=${e} padding="md">
              <div className="mb-4 h-3 w-20 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
              ${[1,2,3,4].map(t=>l`
                    <div
                      key=${t}
                      className="flex items-center justify-between border-t border-[var(--v2-panel-border)] py-4 first:border-0"
                    >
                      <div>
                        <div className="h-4 w-32 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
                        <div className="mt-1 h-3 w-48 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
                      </div>
                      <div className="h-9 w-36 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
                    </div>
                  `)}
            <//>
          `)}
    </div>
  `}function U_(){let e=H({queryKey:["gateway-status-settings"],queryFn:Vs,staleTime:1e4}),t=H({queryKey:["extensions"],queryFn:D$}),a=H({queryKey:["extension-registry"],queryFn:M$}),n=e.data||{},r=t.data?.extensions||[],s=a.data?.entries||[],i=r.filter(m=>m.kind==="wasm_channel"||m.kind==="channel"),o=s.filter(m=>(m.kind==="wasm_channel"||m.kind==="channel")&&!m.installed),u=r.filter(m=>m.kind==="mcp_server"),c=s.filter(m=>m.kind==="mcp_server"&&!m.installed),d=e.isLoading||t.isLoading;return{status:n,channels:i,channelRegistry:o,mcpServers:u,mcpRegistry:c,extensions:r,isLoading:d}}function FD({name:e,description:t,enabled:a,detail:n}){let r=k();return l`
    <div
      className="flex items-start justify-between gap-4 border-t border-[var(--v2-panel-border)] py-4 first:border-0 first:pt-0"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--v2-text)]">${e}</span>
          <${z}
            tone=${a?"positive":"muted"}
            label=${r(a?"channels.statusOn":"channels.statusOff")}
            size="sm"
          />
        </div>
        <div className="mt-1 text-xs text-[var(--v2-text-muted)]">${t}</div>
        ${n&&l`<div className="mt-1 font-mono text-[11px] text-[var(--v2-text-faint)]">
          ${n}
        </div>`}
      </div>
    </div>
  `}function F_({channel:e,registryEntry:t}){let a=k(),n=t?.display_name||e?.name||t?.name||a("common.unknown"),r=t?.description||e?.description||"",s=!!e,i=e?.onboarding_state||"setup_required",o={ready:"positive",auth_required:"warning",pairing_required:"warning",setup_required:"muted"},u={ready:a("channels.ready"),auth_required:a("channels.authNeeded"),pairing_required:a("channels.pairing"),setup_required:a("channels.setup")};return l`
    <div
      className="flex items-start justify-between gap-4 border-t border-[var(--v2-panel-border)] py-4 first:border-0 first:pt-0"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--v2-text)]">${n}</span>
          ${s?l`<${z}
                tone=${o[i]||"muted"}
                label=${u[i]||i}
                size="sm"
              />`:l`<${z}
                tone="muted"
                label=${a("channels.available")}
                size="sm"
              />`}
        </div>
        <div className="mt-1 text-xs text-[var(--v2-text-muted)]">${r}</div>
      </div>
    </div>
  `}function zD(e,t){let a=e.enabled_channels||[];return[{id:"web",name:t("channels.webGateway"),description:t("channels.webGatewayDesc"),enabled:!0,detail:"SSE: "+(e.sse_connections||0)+" \xB7 WS: "+(e.ws_connections||0)},{id:"http",name:t("channels.httpWebhook"),description:t("channels.httpWebhookDesc"),enabled:a.includes("http"),detail:"ENABLE_HTTP=true"},{id:"cli",name:t("channels.cli"),description:t("channels.cliDesc"),enabled:a.includes("cli"),detail:"ironclaw run --cli"},{id:"repl",name:t("channels.repl"),description:t("channels.replDesc"),enabled:a.includes("repl"),detail:"ironclaw run --repl"}]}function BD({status:e,channels:t,channelRegistry:a,mcpServers:n,mcpRegistry:r,searchQuery:s,t:i}){let o=zD(e,i).filter(b=>nt(s,[i("channels.builtIn"),b.id,b.name,b.description,b.detail])),u=new Set(t.map(b=>b.name)),c=t.filter(b=>nt(s,[i("channels.messaging"),b.name,b.display_name,b.description,b.onboarding_state])),d=a.filter(b=>!u.has(b.name)).filter(b=>nt(s,[i("channels.messaging"),b.name,b.display_name,b.description])),m=new Set(n.map(b=>b.name)),f=n.filter(b=>nt(s,[i("channels.mcpServers"),b.name,b.display_name,b.description,b.active?i("channels.active"):i("channels.inactive")])),p=r.filter(b=>!m.has(b.name)).filter(b=>nt(s,[i("channels.mcpServers"),b.name,b.display_name,b.description]));return{builtInChannels:o,visibleChannels:c,availableRegistry:d,visibleMcpServers:f,availableMcp:p}}function z_({searchQuery:e=""}){let t=k(),{status:a,channels:n,channelRegistry:r,mcpServers:s,mcpRegistry:i,isLoading:o}=U_();if(o)return l`
      <div className="space-y-5">
        <${ae} padding="md">
          <div className="mb-4 h-3 w-28 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
          ${[1,2,3].map(p=>l`
              <div
                key=${p}
                className="flex items-center justify-between border-t border-[var(--v2-panel-border)] py-4 first:border-0"
              >
                <div className="h-4 w-32 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
                <div className="h-6 w-16 animate-pulse rounded-full bg-[var(--v2-surface-muted)]" />
              </div>
            `)}
        <//>
      </div>
    `;let{builtInChannels:u,visibleChannels:c,availableRegistry:d,visibleMcpServers:m,availableMcp:f}=BD({status:a,channels:n,channelRegistry:r,mcpServers:s,mcpRegistry:i,searchQuery:e,t});return u.length===0&&c.length===0&&d.length===0&&m.length===0&&f.length===0?l`<${kt} query=${e} />`:l`
    <div className="space-y-5">
      ${u.length>0&&l`
      <${ae} padding="md">
        <h3
          className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]"
        >
          ${t("channels.builtIn")}
        </h3>
        ${u.map(p=>l`
            <${FD}
              key=${p.id}
              name=${p.name}
              description=${p.description}
              enabled=${p.enabled}
              detail=${p.detail}
            />
          `)}
      <//>
      `}

      ${(c.length>0||d.length>0)&&l`
        <${ae} padding="md">
          <h3
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]"
          >
            ${t("channels.messaging")}
          </h3>
          ${c.map(p=>l`
              <${F_}
                key=${p.name}
                channel=${p}
                registryEntry=${r.find(b=>b.name===p.name)}
              />
            `)}
          ${d.map(p=>l`
              <${F_} key=${p.name} registryEntry=${p} />
            `)}
        <//>
      `}
      ${(m.length>0||f.length>0)&&l`
        <${ae} padding="md">
          <h3
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]"
          >
            ${t("channels.mcpServers")}
          </h3>
          ${m.map(p=>l`
                <div
                  key=${p.name}
                  className="flex items-start justify-between gap-4 border-t border-[var(--v2-panel-border)] py-4 first:border-0 first:pt-0"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[var(--v2-text)]"
                        >${p.display_name||p.name}</span
                      >
                      <${z}
                        tone=${p.active?"positive":"muted"}
                        label=${p.active?t("channels.active"):t("channels.inactive")}
                        size="sm"
                      />
                    </div>
                    <div className="mt-1 text-xs text-[var(--v2-text-muted)]">
                      ${p.description||""}
                    </div>
                  </div>
                </div>
              `)}
          ${f.map(p=>l`
                <div
                  key=${p.name}
                  className="flex items-start justify-between gap-4 border-t border-[var(--v2-panel-border)] py-4 first:border-0 first:pt-0"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[var(--v2-text)]"
                        >${p.display_name||p.name}</span
                      >
                      <${z}
                        tone="muted"
                        label=${t("channels.available")}
                        size="sm"
                      />
                    </div>
                    <div className="mt-1 text-xs text-[var(--v2-text-muted)]">
                      ${p.description||""}
                    </div>
                  </div>
                </div>
              `)}
        <//>
      `}
    </div>
  `}function B_({provider:e,activeProviderId:t,selectedModel:a,builtinOverrides:n,isBusy:r,onUse:s,onConfigure:i,onDelete:o,onNearaiLogin:u,onNearaiWallet:c,onCodexLogin:d,loginBusy:m}){let f=k(),p=e.id===t,b=yn(e,n),y=er(e,n),x=H$(e,n,t,a),g=mc(e,n),v=K$(e),$=f(g==="api_key"?"llm.missingApiKey":g==="base_url"?"llm.missingBaseUrl":"llm.notConfigured"),[w,S]=h.default.useState(p),R=h.default.useCallback(()=>S(Qe=>!Qe),[]);h.default.useEffect(()=>{S(p)},[p]);let C=b?l`<span className="hidden truncate font-mono text-[11px] text-[var(--v2-text-faint)] sm:inline">
        ${qo(e.adapter)} · ${x||e.default_model||f("llm.none")}
      </span>`:l`<span className="font-mono text-[11px] text-[var(--v2-warning-text)]">
        ${$}
      </span>`,E=e.id==="nearai"||e.id==="openai_codex",O=e.api_key_set===!0||e.has_api_key===!0,j=e.builtin?e.id==="nearai"&&v&&!O?f("llm.addApiKey"):f("llm.configure"):f("common.edit"),J=v&&e.builtin?l`
          <${T}
            type="button"
            variant="secondary"
            size="sm"
            disabled=${r}
            onClick=${()=>i(e)}
          >
            ${j}
          <//>
        `:null,D=!p&&e.id==="nearai"?l`
          ${J}
          <${T} type="button" variant="secondary" size="sm" disabled=${m} onClick=${c}>
            ${f("onboarding.nearWallet")}
          <//>
          <${T} type="button" variant="secondary" size="sm" disabled=${m} onClick=${()=>u("github")}>
            GitHub
          <//>
          <${T} type="button" variant="secondary" size="sm" disabled=${m} onClick=${()=>u("google")}>
            Google
          <//>
        `:!p&&e.id==="openai_codex"?l`
          <${T} type="button" variant="secondary" size="sm" disabled=${m} onClick=${d}>
            ${f("onboarding.codexSignIn")}
          <//>
        `:null,V=!p&&b&&(!E||e.id==="nearai"&&e.has_api_key===!0)?l`
        <${T}
          type="button"
          variant="primary"
          size="sm"
          disabled=${r}
          onClick=${()=>s(e)}
        >
          ${f("llm.use")}
        <//>
      `:null,I=b?null:l`
        <${T}
          type="button"
          variant="secondary"
          size="sm"
          disabled=${r}
          onClick=${()=>i(e)}
        >
          ${f(g==="api_key"?"llm.addApiKey":"llm.configure")}
        <//>
      `,re=p?null:V||(E?D:I),xe=!E&&(e.builtin&&e.id!=="bedrock"||!e.builtin)||e.id==="nearai"&&v;return l`
    <${ae}
      padding="none"
      data-testid="llm-provider-card"
      data-provider-id=${e.id}
      className=${["transition-colors",p?"border-[color-mix(in_srgb,var(--v2-positive-text)_36%,var(--v2-panel-border))]":w?"border-[color-mix(in_srgb,var(--v2-accent)_32%,var(--v2-panel-border))]":""].join(" ")}
    >
      <div className="flex w-full items-stretch hover:bg-[var(--v2-surface-soft)]">
        <button
          type="button"
          aria-expanded=${w?"true":"false"}
          aria-label=${f(w?"llm.collapseDetails":"llm.expandDetails")}
          data-testid="llm-provider-disclosure"
          onClick=${R}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 px-4 py-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v2-accent)] sm:pl-5 sm:pr-3"
        >
          <span
            className=${["h-2 w-2 shrink-0 rounded-full",p?"bg-[var(--v2-positive-text)]":b?"bg-[var(--v2-accent)]":"bg-[var(--v2-warning-text)]"].join(" ")}
          />
          <span className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
            <span className="min-w-0 truncate text-sm font-semibold text-[var(--v2-text-strong)]">
              ${e.name||e.id}
            </span>
            <span className="font-mono text-[11px] text-[var(--v2-text-faint)]">${e.id}</span>
            ${p&&l`<${z} tone="positive" label=${f("llm.active")} size="sm" />`}
            ${e.builtin&&!p&&l`<${z} tone="muted" label=${f("llm.builtin")} size="sm" />`}
          </span>
          <span className="hidden min-w-0 max-w-[280px] truncate sm:block">${C}</span>
        </button>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 py-3 pr-4 sm:pr-5">
          ${re}
          <button
            type="button"
            onClick=${R}
            data-testid="llm-provider-chevron"
            aria-label=${f(w?"llm.collapseDetails":"llm.expandDetails")}
            className=${["grid h-7 w-7 place-items-center rounded-md text-[var(--v2-text-faint)] transition-transform hover:bg-[var(--v2-surface-muted)] hover:text-[var(--v2-text-strong)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v2-accent)]",w?"rotate-180":""].join(" ")}
          >
            <${M} name="chevron" className="h-4 w-4" />
          </button>
        </div>
      </div>

      ${w&&l`
        <div data-testid="llm-provider-details" className="border-t border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] px-4 py-4 sm:px-5">
          <div className="grid gap-3 text-xs text-[var(--v2-text-muted)] sm:grid-cols-3">
            <div>
              <div className="font-mono uppercase text-[10px] text-[var(--v2-text-faint)]">${f("llm.adapter")}</div>
              <div className="mt-1 truncate">${qo(e.adapter)}</div>
            </div>
            <div>
              <div className="font-mono uppercase text-[10px] text-[var(--v2-text-faint)]">${f("llm.baseUrl")}</div>
              <div className="mt-1 truncate font-mono">${y||f("llm.none")}</div>
            </div>
            <div>
              <div className="font-mono uppercase text-[10px] text-[var(--v2-text-faint)]">${f("llm.model")}</div>
              <div className="mt-1 truncate font-mono">${x||f("llm.none")}</div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-end gap-2 border-t border-[var(--v2-panel-border)] pt-3">
            ${xe&&l`
              <${T}
                type="button"
                variant="secondary"
                size="sm"
                disabled=${r}
                onClick=${()=>i(e)}
              >
                ${j}
              <//>
            `}
            ${!e.builtin&&!p&&l`
              <${T}
                type="button"
                variant="danger"
                size="sm"
                disabled=${r}
                onClick=${()=>o(e)}
              >
                ${f("common.delete")}
              <//>
            `}
          </div>
        </div>
      `}
    <//>
  `}var qD=[{key:"active",labelKey:"llm.groupActive",dotClass:"bg-[var(--v2-positive-text)]"},{key:"ready",labelKey:"llm.groupReady",dotClass:"bg-[var(--v2-accent)]"},{key:"setup",labelKey:"llm.groupSetup",dotClass:"bg-[var(--v2-warning-text)]"}];function ID({label:e,count:t,dotClass:a}){return l`
    <div className="mb-2 mt-1 flex items-center gap-2 px-1">
      <span className=${"h-1.5 w-1.5 rounded-full "+a} />
      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--v2-text-faint)]">
        ${e}
      </span>
      <span className="font-mono text-[10.5px] text-[var(--v2-text-faint)]">·</span>
      <span className="font-mono text-[10.5px] text-[var(--v2-text-faint)]">${t}</span>
      <span className="ml-2 h-px flex-1 bg-[var(--v2-panel-border)]" />
    </div>
  `}function q_({settings:e,gatewayStatus:t,searchQuery:a=""}){let n=k(),r=Lc({settings:e,gatewayStatus:t,searchQuery:a,t:n}),s=r.providerState,i=Pc(),o=i.nearaiBusy||i.codexBusy;if(a&&r.filteredProviders.length===0)return l`<${kt} query=${a} />`;let u=Q$(r.filteredProviders,s.builtinOverrides,s.activeProviderId);return l`
    <${ae} className="p-4 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]">
            ${n("llm.providers")}
          </h3>
          <p className="mt-1 text-sm text-[var(--v2-text-muted)]">${n("llm.providersDesc")}</p>
        </div>
        <${T} type="button" variant="secondary" size="sm" className="gap-2" onClick=${()=>r.openDialog(null)}>
          <${M} name="plus" className="h-3.5 w-3.5" />
          ${n("llm.addProvider")}
        <//>
      </div>

      ${r.message&&l`
        <div
          className=${["mb-4 rounded-md border px-3 py-2 text-sm",r.message.tone==="error"?"border-red-400/30 bg-red-500/10 text-red-200":"border-mint/30 bg-mint/10 text-mint"].join(" ")}
          role="status"
        >
          ${r.message.text}
        </div>
      `}

      <${Oc} login=${i} />

      ${s.isLoading?l`<div className="text-sm text-[var(--v2-text-muted)]">${n("common.loading")}</div>`:s.error?l`<div className="text-sm text-red-200">${n("error.loadFailed",{what:n("llm.providers"),message:s.error.message})}</div>`:l`
            <div className="space-y-1">
              ${qD.flatMap(c=>{let d=u[c.key];return d.length?[l`
                    <section
                      key=${c.key}
                      data-testid="llm-provider-group"
                      data-provider-status=${c.key}
                      className="mb-3"
                    >
                      <${ID}
                        label=${n(c.labelKey)}
                        count=${d.length}
                        dotClass=${c.dotClass}
                      />
                      <div className="space-y-2">
                      ${d.map(m=>l`
                          <${B_}
                            key=${m.id}
                            provider=${m}
                            activeProviderId=${s.activeProviderId}
                            selectedModel=${s.selectedModel}
                            builtinOverrides=${s.builtinOverrides}
                            isBusy=${s.isBusy}
                            onUse=${r.handleUse}
                            onConfigure=${r.openDialog}
                            onDelete=${r.handleDelete}
                            onNearaiLogin=${i.startNearai}
                            onNearaiWallet=${i.startNearaiWallet}
                            onCodexLogin=${i.startCodex}
                            loginBusy=${o}
                          />
                        `)}
                      </div>
                    </section>
                  `]:[]})}
            </div>
          `}

      <${Mc}
        open=${r.isDialogOpen}
        provider=${r.dialogProvider}
        allProviderIds=${r.allProviderIds}
        builtinOverrides=${s.builtinOverrides}
        onClose=${r.closeDialog}
        onSave=${r.handleSave}
        onTest=${s.testConnection}
        onListModels=${s.listModels}
      />
    <//>
  `}function I_({settings:e,gatewayStatus:t,onSave:a,savedKeys:n,isLoading:r,searchQuery:s=""}){let i=k(),{activeProviderId:o,selectedModel:u,providers:c,hasActiveProvider:d}=tr({settings:e,gatewayStatus:t});if(r)return l`<${HD} />`;let m=d?o:"",f=c.find(g=>g.id===o),p=d&&(u||f?.default_model||e.selected_model)||"",b=pi(D_,e,s,i),y=nt(s,[i("inference.provider"),i("inference.backend"),m,i("inference.model"),p]),x=nt(s,[i("llm.providers"),i("llm.providersDesc"),i("llm.addProvider"),"llm","provider","openai","anthropic","ollama","near"]);return!y&&!x&&b.length===0?l`<${kt} query=${s} />`:l`
    <div className="space-y-5">
      ${y&&l`
      <${ae} padding="none" className="p-4 sm:p-5">
        <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]">${i("inference.provider")}</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] px-4 py-3">
            <div className="text-xs text-[var(--v2-text-muted)]">${i("inference.backend")}</div>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-mono text-lg font-semibold text-[var(--v2-text-strong)]">${m||i("inference.none")}</span>
              ${d?l`<${z} tone="positive" label=${i("inference.active")} size="sm" />`:l`<${z} tone="muted" label=${i("llm.notConfigured")} size="sm" />`}
            </div>
          </div>
          <div className="rounded-md border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] px-4 py-3">
            <div className="text-xs text-[var(--v2-text-muted)]">${i("inference.model")}</div>
            <div className="mt-1 font-mono text-lg font-semibold text-[var(--v2-text-strong)]">
              ${p||i("inference.none")}
            </div>
          </div>
        </div>
      <//>
      `}

      ${x&&l`
        <${q_}
          settings=${e}
          gatewayStatus=${t}
          searchQuery=${s}
        />
      `}

      ${b.map(g=>l`
            <${hi}
              key=${g.groupKey}
              groupKey=${g.groupKey}
              fields=${g.fields}
              settings=${e}
              onSave=${a}
              savedKeys=${n}
            />
          `)}
    </div>
  `}function lr({className:e=""}){return l`
    <div
      className=${"rounded animate-pulse bg-[var(--v2-surface-muted)] "+e}
    />
  `}function HD(){return l`
    <div className="space-y-5">
      <${ae} padding="md">
        <${lr} className="mb-4 h-3 w-24" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] p-4">
            <${lr} className="h-3 w-16" />
            <${lr} className="mt-2 h-6 w-28" />
          </div>
          <div className="rounded-md border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] p-4">
            <${lr} className="h-3 w-16" />
            <${lr} className="mt-2 h-6 w-40" />
          </div>
        </div>
      <//>
      ${[1,2].map(e=>l`
            <${ae} key=${e} padding="md">
              <${lr} className="mb-4 h-3 w-20" />
              ${[1,2,3].map(t=>l`
                    <div key=${t} className="flex items-center justify-between border-t border-[var(--v2-panel-border)] py-4 first:border-0">
                      <${lr} className="h-4 w-32" />
                      <${lr} className="h-9 w-36" />
                    </div>
                  `)}
            <//>
          `)}
    </div>
  `}function H_({searchQuery:e=""}){let t=k(),{lang:a,setLang:n}=al(),r=nl.find(i=>i.code===a)||nl[0],s=nl.filter(i=>nt(e,[i.code,i.name,i.native]));return s.length===0?l`<${kt} query=${e} />`:l`
    <${ae} padding="md">
      <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]">
        ${t("lang.title")}
      </h3>
      <p className="text-sm leading-6 text-[var(--v2-text-muted)]">
        ${t("lang.description")}
      </p>

      <div className="mt-5 rounded-xl border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] p-4">
        <div className="text-xs text-[var(--v2-text-muted)]">${t("lang.current")}</div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-[var(--v2-text-strong)]">${r.native}</span>
          <span className="font-mono text-xs text-[var(--v2-text-faint)]">${r.name}</span>
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        ${s.map(i=>l`
            <button
              key=${i.code}
              type="button"
              onClick=${()=>n(i.code)}
              className=${["flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left",i.code===a?"border-[color-mix(in_srgb,var(--v2-accent)_35%,var(--v2-panel-border))] bg-[var(--v2-accent-soft)] text-[var(--v2-text-strong)]":"border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] text-[var(--v2-text-muted)] hover:border-[color-mix(in_srgb,var(--v2-accent)_20%,var(--v2-panel-border))] hover:bg-[var(--v2-surface-muted)] hover:text-[var(--v2-text-strong)]"].join(" ")}
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">${i.native}</div>
                <div className="truncate font-mono text-[11px] text-[var(--v2-text-faint)]">${i.name}</div>
              </div>
              <div className="shrink-0 font-mono text-[11px] text-[var(--v2-text-faint)]">${i.code}</div>
            </button>
          `)}
      </div>
    <//>
  `}function K_({settings:e,onSave:t,savedKeys:a,isLoading:n,searchQuery:r=""}){let s=k();if(n)return l`
      <div className="space-y-5">
        ${[1,2].map(o=>l`
              <${ae} key=${o} padding="md">
                <div className="mb-4 h-3 w-20 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
                ${[1,2].map(u=>l`
                      <div key=${u} className="flex items-center justify-between border-t border-[var(--v2-panel-border)] py-4 first:border-0">
                        <div className="h-4 w-32 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
                        <div className="h-9 w-36 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
                      </div>
                    `)}
              <//>
            `)}
      </div>
    `;let i=pi(O_,e,r,s);return i.length===0?l`<${kt} query=${r} />`:l`
    <div className="space-y-5">
      ${i.map(o=>l`
            <${hi}
              key=${o.groupKey}
              groupKey=${o.groupKey}
              fields=${o.fields}
              settings=${e}
              onSave=${t}
              savedKeys=${a}
            />
          `)}
    </div>
  `}function Q_(){let e=k(),[t,a]=h.default.useState(!1),n=h.default.useCallback(()=>a(!0),[]),r=h.default.useCallback(()=>a(!1),[]),s=h.default.useCallback(()=>a(!1),[]);return{restartEnabled:!1,unavailableReason:e("settings.restartUnavailable"),isRestarting:!1,progressLabel:"",error:null,message:null,confirmOpen:t,openConfirm:n,closeConfirm:r,confirmRestart:s}}function V_({visible:e,gatewayStatus:t,gatewayStatusQuery:a}){let n=k(),r=Q_({gatewayStatus:t,gatewayStatusQuery:a});return e?l`
    <div className="space-y-3">
      <div
        role="alert"
        className="flex flex-col gap-3 rounded-xl border border-copper/30 bg-copper/10 px-4 py-3 sm:flex-row sm:items-center"
      >
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <${M} name="bolt" className="mt-0.5 h-4 w-4 shrink-0 text-copper" />
          <div className="min-w-0">
            <p className="text-sm text-copper">
              ${n("settings.restartRequired")}
            </p>
            ${!r.restartEnabled&&l`
              <p className="mt-1 text-xs text-[var(--v2-text-muted)]">
                ${r.unavailableReason}
              </p>
            `}
            ${r.isRestarting&&l`
              <p className="mt-1 text-xs text-[var(--v2-text-muted)]">
                ${r.progressLabel}
              </p>
            `}
          </div>
        </div>

        <${T}
          type="button"
          variant="secondary"
          size="sm"
          disabled=${!r.restartEnabled||r.isRestarting}
          onClick=${r.openConfirm}
          title=${r.restartEnabled?void 0:r.unavailableReason}
          className="w-full sm:w-auto"
        >
          <${M} name=${r.isRestarting?"pulse":"bolt"} className="h-4 w-4" />
          ${r.isRestarting?n("settings.restartStarting"):n("settings.restartNow")}
        <//>
      </div>

      ${r.error&&l`
        <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          ${r.error}
        </div>
      `}

      ${r.message&&l`
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          ${r.message}
        </div>
      `}
    </div>

    <${ti}
      open=${r.confirmOpen}
      onClose=${r.closeConfirm}
      title=${n("restart.title")}
      size="sm"
    >
      <${ai} className="space-y-3">
        <p className="text-sm text-[var(--v2-text)]">
          ${n("restart.description")}
        </p>
        <div className="rounded-xl border border-copper/25 bg-copper/10 px-3 py-2 text-xs text-copper">
          ${n("restart.warning")}
        </div>
      <//>
      <${ni}>
        <${T}
          type="button"
          variant="ghost"
          size="sm"
          disabled=${r.isRestarting}
          onClick=${r.closeConfirm}
        >
          ${n("restart.cancel")}
        <//>
        <${T}
          type="button"
          variant="danger"
          size="sm"
          disabled=${r.isRestarting}
          onClick=${r.confirmRestart}
        >
          <${M} name="bolt" className="h-4 w-4" />
          ${n("restart.confirm")}
        <//>
      <//>
    <//>

    ${r.isRestarting&&l`
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
        role="status"
        aria-live="polite"
      >
        <div className="w-full max-w-sm rounded-[1.5rem] border border-[var(--v2-panel-border)] bg-[var(--v2-card-bg)] p-6 text-center shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-copper/30 bg-copper/10 text-copper">
            <${M} name="pulse" className="h-5 w-5 animate-pulse" />
          </div>
          <p className="mt-4 text-base font-semibold text-[var(--v2-text-strong)]">
            ${n("restart.progressTitle")}
          </p>
          <p className="mt-2 text-sm text-[var(--v2-text-muted)]">
            ${r.progressLabel}
          </p>
        </div>
      </div>
    `}
  `:null}function G_(){let e=ee(),t=H({queryKey:["skills"],queryFn:O$}),a=Y({mutationFn:P$,onSuccess:()=>{e.invalidateQueries({queryKey:["skills"]})}}),n=Y({mutationFn:U$,onSuccess:()=>{e.invalidateQueries({queryKey:["skills"]})}}),r=Y({mutationFn:({name:i,content:o})=>j$(i,{content:o}),onSuccess:()=>{e.invalidateQueries({queryKey:["skills"]})}});return{skills:t.data?.skills||[],query:t,fetchSkillContent:L$,installSkill:a.mutateAsync,removeSkill:n.mutateAsync,updateSkill:r.mutateAsync,isInstalling:a.isPending,isRemoving:n.isPending,isUpdating:r.isPending}}function Y_({skill:e,onEdit:t,onRemove:a,onUpdate:n,isRemoving:r,isUpdating:s}){let i=k(),o=e.name||e.id,u=e.trust||e.trust_level||"installed",c=e.source_kind||"installed",d=!!e.can_edit,m=!!e.can_delete,[f,p]=h.default.useState(!1),[b,y]=h.default.useState(""),[x,g]=h.default.useState(""),[v,$]=h.default.useState(!1);h.default.useEffect(()=>{f||(y(""),g(""))},[f]);let w=h.default.useCallback(async()=>{$(!0),g("");try{let R=await t(o);y(R?.content||""),p(!0)}catch(R){g(R.message||i("skills.contentLoadFailed"))}finally{$(!1)}},[o,t,i]),S=h.default.useCallback(async()=>{(await n(o,b))?.success&&p(!1)},[b,o,n]);return l`
    <div className="ext-card border-t border-[var(--v2-panel-border)] py-4 first:border-0 first:pt-0">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-[var(--v2-text)]">${o}</span>
            <${z}
              tone=${String(u).toLowerCase()==="trusted"?"positive":"muted"}
              label=${u}
              size="sm"
            />
            <${z}
              tone=${c==="system"?"positive":"muted"}
              label=${i(`skills.source.${c}`)}
              size="sm"
            />
            ${e.version&&l`<span className="font-mono text-[11px] text-[var(--v2-text-faint)]">v${e.version}</span>`}
          </div>

          ${e.description&&l`<div className="mt-1 text-xs text-[var(--v2-text-muted)]">${e.description}</div>`}

          ${f?l`
                <div className="mt-3">
                  <${wc}
                    rows=${12}
                    value=${b}
                    className="font-mono text-xs leading-5"
                    onInput=${R=>y(R.currentTarget.value)}
                  />
                </div>
              `:l`<${KD} skill=${e} />`}
        </div>

        <div className="flex shrink-0 flex-wrap justify-end gap-2">
          ${d&&!f&&l`
            <${T}
              type="button"
              variant="secondary"
              size="sm"
              disabled=${s||v}
              title=${i("skills.edit")}
              onClick=${w}
            >
              <${M} name="file" className="h-4 w-4" />
              ${i(v?"skills.loading":"skills.edit")}
            <//>
          `}
          ${f&&l`
            <${T}
              type="button"
              variant="ghost"
              size="sm"
              disabled=${s}
              onClick=${()=>{y(""),p(!1)}}
            >
              <${M} name="close" className="h-4 w-4" />
              ${i("skills.cancel")}
            <//>
            <${T}
              type="button"
              variant="primary"
              size="sm"
              disabled=${s}
              onClick=${S}
            >
              <${M} name="check" className="h-4 w-4" />
              ${i(s?"skills.saving":"skills.save")}
            <//>
          `}
          ${m&&!f&&l`
            <${T}
              type="button"
              variant="danger"
              size="sm"
              disabled=${r}
              title=${i("skills.delete")}
              onClick=${()=>a(o)}
            >
              <${M} name="trash" className="h-4 w-4" />
              ${i("skills.delete")}
            <//>
          `}
        </div>
      </div>
      ${x&&l`<p className="mt-2 text-xs text-[var(--v2-danger-text)]">${x}</p>`}
    </div>
  `}function KD({skill:e}){let t=k();return l`
    ${e.keywords?.length>0&&l`
      <div className="mt-2 text-xs text-[var(--v2-text-muted)]">
        <span className="text-[var(--v2-text-faint)]">${t("skills.activatesOn")}:</span>
        ${e.keywords.join(", ")}
      </div>
    `}
    ${e.usage_hint&&l`<div className="mt-2 text-xs text-[var(--v2-text-muted)]">${e.usage_hint}</div>`}
    ${e.setup_hint&&l`<div className="mt-2 text-xs text-[var(--v2-warning-text)]">${e.setup_hint}</div>`}
    ${(e.has_requirements||e.has_scripts||e.install_source_url)&&l`
      <div className="mt-2 flex flex-wrap gap-1.5">
        ${e.has_requirements&&l`<${Ch}>requirements.txt<//>`}
        ${e.has_scripts&&l`<${Ch}>scripts/<//>`}
        ${e.install_source_url&&l`<${Ch}>${t("skills.imported")}<//>`}
      </div>
    `}
  `}function Ch({children:e}){return l`
    <span className="rounded border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--v2-text-muted)]">
      ${e}
    </span>
  `}function J_({onInstall:e,isInstalling:t}){let a=k(),[n,r]=h.default.useState(""),[s,i]=h.default.useState(""),[o,u]=h.default.useState({name:"",content:""}),[c,d]=h.default.useState(""),[m,f]=h.default.useState(""),p=h.default.useCallback((y,x)=>{u(g=>!g[y]||!x.trim()?g:{...g,[y]:""})},[]),b=h.default.useCallback(async()=>{let y=QD({name:n,content:s}),x=VD(y,a);if(x.name||x.content){u(x),d(""),f("");return}u({name:"",content:""}),d(""),f("");try{let g=await e(y);if(!g?.success){d(g?.message||a("skills.installFailed"));return}r(""),i(""),f(g.message||a("skills.installedSuccess",{name:y.name}))}catch(g){d(g.message||a("skills.installFailed"))}},[s,n,e,a]);return l`
    <${ae} padding="md">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]">
            ${a("skills.import")}
          </h3>
          <p className="mt-1 text-sm text-[var(--v2-text-muted)]">
            ${a("skills.importDesc")}
          </p>
        </div>
      </div>

      <${$n} label=${a("skills.name")} error=${o.name} required>
        <${Mt}
          size="sm"
          error=${!!o.name}
          aria-invalid=${o.name?"true":void 0}
          value=${n}
          placeholder=${a("skills.namePlaceholder")}
          onInput=${y=>{let x=y.currentTarget.value;r(x),p("name",x)}}
        />
      <//>

      <${$n}
        className="mt-3"
        label=${a("skills.content")}
        error=${o.content}
        hint=${a("skills.contentHint")}
        required
      >
        <${wc}
          rows=${5}
          error=${!!o.content}
          aria-invalid=${o.content?"true":void 0}
          value=${s}
          placeholder=${a("skills.contentPlaceholder")}
          onInput=${y=>{let x=y.currentTarget.value;i(x),p("content",x)}}
        />
      <//>

      ${c&&l`<p className="mt-3 text-sm text-[var(--v2-danger-text)]">${c}</p>`}
      ${m&&l`<p className="mt-3 text-sm text-[var(--v2-positive-text)]">${m}</p>`}

      <div className="mt-4 flex justify-end">
        <${T} type="button" size="sm" disabled=${t} onClick=${b}>
          <${M} name="upload" className="h-4 w-4" />
          ${a(t?"skills.installing":"skills.install")}
        <//>
      </div>
    <//>
  `}function QD({name:e,content:t}){let a={name:e.trim()};return t.trim()&&(a.content=t.trim()),a}function VD(e,t){return{name:e.name?"":t("skills.nameRequired"),content:e.content?"":t("skills.contentRequired")}}function X_({searchQuery:e=""}){let t=k(),{skills:a,query:n,fetchSkillContent:r,installSkill:s,removeSkill:i,updateSkill:o,isInstalling:u,isRemoving:c,isUpdating:d}=G_(),[m,f]=h.default.useState(""),[p,b]=h.default.useState(""),y=h.default.useCallback(async v=>{if(window.confirm(t("skills.confirmDelete",{name:v}))){f(""),b("");try{let $=await i(v);if(!$?.success){f($?.message||t("skills.removeFailed"));return}b($.message||t("skills.removed",{name:v}))}catch($){f($.message||t("skills.removeFailed"))}}},[i,t]),x=h.default.useCallback(async(v,$)=>{if(!$.trim())return f(t("skills.contentRequired")),b(""),{success:!1,message:t("skills.contentRequired")};f(""),b("");try{let w=await o({name:v,content:$});return w?.success?(b(w.message||t("skills.updated",{name:v})),w):(f(w?.message||t("skills.updateFailed")),w)}catch(w){let S=w.message||t("skills.updateFailed");return f(S),{success:!1,message:S}}},[t,o]),g;if(n.isLoading)g=l`
      <${ae} padding="md">
          <div className="mb-4 h-3 w-24 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
          ${[1,2,3].map(v=>l`
            <div key=${v} className="flex items-center justify-between border-t border-[var(--v2-panel-border)] py-4 first:border-0">
              <div>
                <div className="h-4 w-32 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
                <div className="mt-1 h-3 w-48 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
              </div>
              <div className="h-6 w-20 animate-pulse rounded-full bg-[var(--v2-surface-muted)]" />
            </div>
          `)}
        <//>
    `;else if(n.error)g=l`
      <${ae} padding="md">
          <p className="text-sm text-[var(--v2-danger-text)]">${t("skills.failedLoad",{message:n.error.message})}</p>
        <//>
    `;else{let v=a.filter(w=>nt(e,[w.name,w.id,w.description,w.keywords,w.trust_level,w.source_kind,w.version])),$=YD(v);a.length===0?g=l`
        <${ae} padding="lg">
          <h3 className="text-lg font-semibold text-[var(--v2-text-strong)]">${t("skills.noInstalled")}</h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-[var(--v2-text-muted)]">
            ${t("skills.noInstalledDesc")}
          </p>
        <//>
      `:v.length===0?g=l`<${kt} query=${e} />`:g=l`
        <div id="skills-list">
          ${$.map(w=>l`
              <${GD}
                key=${w.id}
                title=${t(w.labelKey)}
                skills=${w.skills}
                onEdit=${r}
                onRemove=${y}
                onUpdate=${x}
                isRemoving=${c}
                isUpdating=${d}
              />
            `)}
        </div>
      `}return l`
    <div className="space-y-4">
      <${J_} onInstall=${s} isInstalling=${u} />
      <${JD} error=${m} result=${p} />
      ${g}
    </div>
  `}function GD({title:e,skills:t,onEdit:a,onRemove:n,onUpdate:r,isRemoving:s,isUpdating:i}){return t.length===0?null:l`
    <${ae} padding="md">
      <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]">
        ${e}
      </h3>
      ${t.map(o=>l`
          <${Y_}
            key=${`${o.source_kind||"skill"}:${o.name||o.id}`}
            skill=${o}
            onEdit=${a}
            onRemove=${n}
            onUpdate=${r}
            isRemoving=${s}
            isUpdating=${i}
          />
        `)}
    <//>
  `}function YD(e){let t=[{id:"user",labelKey:"skills.group.user",skills:[]},{id:"system",labelKey:"skills.group.system",skills:[]},{id:"workspace",labelKey:"skills.group.workspace",skills:[]}],a=t[0];for(let n of e){let r=n.source_kind||"";(r==="system"?t[1]:r==="workspace"?t[2]:a).skills.push(n)}return t.filter(n=>n.skills.length>0)}function JD({error:e,result:t}){return!e&&!t?null:l`
    <div
      className=${e?"rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200":"rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200"}
    >
      ${e||t}
    </div>
  `}function ad(e,t="Request failed"){if(e&&e.success===!1)throw new Error(e.message||t);return e}function Z_(){let e=ee(),t=H({queryKey:["settings-tools"],queryFn:T$}),a=t.data?.tools||[],[n,r]=h.default.useState({}),s=Y({mutationFn:async({name:o,state:u})=>ad(await A$(o,u),"Save failed"),onSuccess:(o,{name:u,state:c})=>{e.setQueryData(["settings-tools"],d=>d&&{...d,tools:d.tools.map(m=>m.name===u?{...m,state:c}:m)}),r(d=>({...d,[u]:!0})),setTimeout(()=>r(d=>({...d,[u]:!1})),2e3)}}),i=h.default.useCallback((o,u)=>s.mutate({name:o,state:u}),[s]);return{tools:a,query:t,setPermission:i,savedTools:n,error:s.error}}function XD({tool:e,onPermissionChange:t,isSaved:a}){let n=k(),r=[{value:"always_allow",label:n("tools.alwaysAllow"),tone:"positive"},{value:"ask",label:n("tools.askEachTime"),tone:"warning"},{value:"disabled",label:n("tools.disabled"),tone:"danger"}],s=e.locked,i=r.find(u=>u.value===e.state)||r[1],o=e.state===e.default_state;return l`
    <div
      className="flex items-center justify-between gap-4 border-t border-[var(--v2-panel-border)] py-3.5 first:border-0 first:pt-0"
    >
      <div className="flex min-w-0 items-center gap-3">
        ${s&&l`<${M}
          name="lock"
          className="h-3.5 w-3.5 shrink-0 text-[var(--v2-text-faint)]"
        />`}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="truncate font-mono text-sm text-[var(--v2-text)]"
              >${e.name}</span
            >
            ${o&&l`
              <span
                className="rounded border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--v2-text-faint)]"
              >
                ${n("tools.default")}
              </span>
            `}
          </div>
          ${e.description&&l`
            <div className="mt-0.5 truncate text-xs text-[var(--v2-text-muted)]">
              ${e.description}
            </div>
          `}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        ${s?l`<${z} tone=${i.tone} label=${i.label} size="sm" />`:l`
              <select
                value=${e.state}
                onChange=${u=>t(e.name,u.target.value)}
                aria-label=${n("tools.permissionFor",{name:e.name})}
                className="v2-select h-8 rounded-md border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] px-2.5 font-mono text-xs text-[var(--v2-text-strong)] outline-none focus:border-[color-mix(in_srgb,var(--v2-accent)_45%,var(--v2-panel-border))]"
              >
                ${r.map(u=>l`<option key=${u.value} value=${u.value}>
                      ${u.label}
                    </option>`)}
              </select>
            `}
        ${a&&l`
          <span className="font-mono text-[11px] text-[var(--v2-accent-text)]"
            >${n("tools.saved")}</span
          >
        `}
      </div>
    </div>
  `}function W_({searchQuery:e=""}){let t=k(),{tools:a,query:n,setPermission:r,savedTools:s}=Z_();if(n.isLoading)return l`
      <${ae} padding="md">
        <div className="mb-4 h-3 w-28 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
        ${[1,2,3,4,5].map(o=>l`
            <div
              key=${o}
              className="flex items-center justify-between border-t border-[var(--v2-panel-border)] py-3.5 first:border-0"
            >
              <div className="h-4 w-36 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
              <div className="h-8 w-28 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
            </div>
          `)}
      <//>
    `;if(n.error)return l`
      <${ae} padding="md">
        <p className="text-sm text-[var(--v2-danger-text)]">
          ${t("tools.failedLoad",{message:n.error.message})}
        </p>
      <//>
    `;let i=a.filter(o=>nt(e,[o.name,o.description,o.state,o.default_state,o.locked?t("tools.disabled"):""]));return l`
    <div className="space-y-4">
      ${e&&l`
        <div className="flex justify-end">
          <span className="font-mono text-[11px] text-[var(--v2-text-faint)]">
            ${i.length} / ${a.length}
          </span>
        </div>
      `}

      <${ae} padding="md">
        <h3
          className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]"
        >
          ${t("tools.permissions")}
        </h3>
        ${i.length===0?l`<p className="py-4 text-sm text-[var(--v2-text-muted)]">
              ${t("tools.noMatch")}
            </p>`:i.map(o=>l`
                  <${XD}
                    key=${o.name}
                    tool=${o}
                    onPermissionChange=${r}
                    isSaved=${s[o.name]}
                  />
                `)}
      <//>
    </div>
  `}function eR(e){return(Number(e)||0).toFixed(2)}function ZD(e){let t=Number(e)||0;return`${t>=0?"+":""}${t.toFixed(2)}`}function tR(e,t){if(!e)return t("traceCommons.never");let a=new Date(e);return Number.isNaN(a.getTime())?t("traceCommons.never"):a.toLocaleString()}function Kr({label:e,value:t,description:a}){return l`
    <div
      className="flex items-center justify-between gap-3 border-t border-[var(--v2-panel-border)] py-3 first:border-0"
    >
      <div className="min-w-0">
        <div className="text-sm text-[var(--v2-text-strong)]">${e}</div>
        ${a&&l`<div className="mt-0.5 text-xs text-[var(--v2-text-muted)]">${a}</div>`}
      </div>
      <div className="shrink-0 font-mono text-sm text-[var(--v2-text-strong)]">${t}</div>
    </div>
  `}function aR({searchQuery:e=""}){let t=k(),{credits:a,query:n,authorize:r}=hc();if(!nt(e,["trace commons","credits",t("settings.traceCommons"),t("traceCommons.title")]))return l`<${kt} query=${e} />`;let s;if(n.isLoading)s=l`
      <div className="mt-4">
        ${[1,2,3].map(i=>l`
            <div
              key=${i}
              className="flex items-center justify-between border-t border-[var(--v2-panel-border)] py-3 first:border-0"
            >
              <div className="h-4 w-32 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
              <div className="h-4 w-16 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
            </div>
          `)}
      </div>
    `;else if(n.isError)s=l`
      <div
        className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
      >
        ${t("traceCommons.loadFailed")}
      </div>
    `;else if(!a||!a.enrolled&&!(a.submissions_total>0))s=l`
      <div
        className="mt-4 rounded-xl border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] px-4 py-6 text-center text-sm text-[var(--v2-text-muted)]"
      >
        ${t("traceCommons.emptyState")}
      </div>
    `;else{let i=a.recent_explanations||[],o=a.holds||[];s=l`
      <div className="mt-4">
        <${Kr}
          label=${t("traceCommons.enrollment")}
          value=${a.enrolled?t("traceCommons.enrolled"):t("traceCommons.notEnrolled")}
        />
        <${Kr}
          label=${t("traceCommons.pendingCredit")}
          description=${t("traceCommons.pendingCreditDesc")}
          value=${eR(a.pending_credit)}
        />
        <${Kr}
          label=${t("traceCommons.finalCredit")}
          description=${t("traceCommons.finalCreditDesc")}
          value=${eR(a.final_credit)}
        />
        <${Kr}
          label=${t("traceCommons.delayedLedger")}
          description=${t("traceCommons.delayedLedgerDesc")}
          value=${ZD(a.delayed_credit_delta)}
        />
        <${Kr}
          label=${t("traceCommons.submissions")}
          value=${t("traceCommons.submissionsValue",{submitted:a.submissions_submitted||0,accepted:a.submissions_accepted||0,total:a.submissions_total||0})}
        />
        <${Kr}
          label=${t("traceCommons.lastSubmission")}
          value=${tR(a.last_submission_at,t)}
        />
        <${Kr}
          label=${t("traceCommons.lastSync")}
          description=${t("traceCommons.lastSyncDesc")}
          value=${tR(a.last_credit_sync_at,t)}
        />
      </div>
      ${i.length>0&&l`
        <div className="mt-5">
          <h4
            className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]"
          >
            ${t("traceCommons.recentExplanations")}
          </h4>
          <ul className="ml-4 list-disc space-y-1 text-xs text-[var(--v2-text-muted)]">
            ${i.map((u,c)=>l`<li key=${c}>${u}</li>`)}
          </ul>
        </div>
      `}
      ${o.length>0&&l`
        <div className="mt-5">
          <h4
            className="mb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]"
          >
            ${t("traceCommons.heldTitle")}
          </h4>
          <p className="mb-2 text-xs leading-5 text-[var(--v2-text-muted)]">
            ${t("traceCommons.heldDescription")}
          </p>
          <ul className="space-y-2">
            ${o.map(u=>l`
                <li
                  key=${u.submission_id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] px-3 py-2"
                >
                  <div className="min-w-0">
                    <div className="text-xs text-[var(--v2-text-strong)]">${u.reason}</div>
                    <div className="mt-0.5 truncate font-mono text-[10px] text-[var(--v2-text-faint)]">
                      ${u.submission_id}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick=${()=>r.mutate(u.submission_id)}
                    disabled=${r.isPending}
                    className="shrink-0 rounded-lg border border-[var(--v2-accent-soft)] px-2.5 py-1 text-xs font-medium text-[var(--v2-accent-text)] transition-colors hover:bg-[var(--v2-accent-soft)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    ${r.isPending?t("traceCommons.authorizing"):t("traceCommons.authorize")}
                  </button>
                </li>
              `)}
          </ul>
        </div>
      `}
    `}return l`
    <${ae} padding="md">
      <h3
        className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]"
      >
        ${t("traceCommons.title")}
      </h3>
      <p className="text-sm leading-6 text-[var(--v2-text-muted)]">
        ${t("traceCommons.description")}
      </p>

      ${s}

      <p className="mt-5 text-xs leading-5 text-[var(--v2-text-faint)]">
        ${t("traceCommons.note")}
      </p>
    <//>
  `}function nR(){let e=ee(),t=H({queryKey:["admin-users"],queryFn:B$,retry:!1}),a=t.data?.users||[],n=t.error?.message?.includes("403")||t.error?.message?.includes("Forbidden"),r=Y({mutationFn:q$,onSuccess:()=>e.invalidateQueries({queryKey:["admin-users"]})}),s=Y({mutationFn:({id:i,payload:o})=>I$(i,o),onSuccess:()=>e.invalidateQueries({queryKey:["admin-users"]})});return{users:a,query:t,isForbidden:n,createUser:r.mutate,updateUser:(i,o)=>s.mutate({id:i,payload:o}),createError:r.error,isCreating:r.isPending}}function WD({onCreate:e,isCreating:t,error:a}){let n=k(),[r,s]=h.default.useState(""),[i,o]=h.default.useState(""),[u,c]=h.default.useState("member"),[d,m]=h.default.useState(!1),f=p=>{p.preventDefault(),r.trim()&&e({display_name:r.trim(),email:i.trim()||void 0,role:u},{onSuccess:()=>{s(""),o(""),m(!1)}})};return d?l`
    <${ae} padding="md">
      <h3
        className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]"
      >
        ${n("users.newUser")}
      </h3>
      <form onSubmit=${f} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <${$n} label=${n("users.displayName")} htmlFor="user-name">
            <${Mt}
              id="user-name"
              type="text"
              value=${r}
              onChange=${p=>s(p.target.value)}
              required
            />
          <//>
          <${$n} label=${n("users.email")} htmlFor="user-email">
            <${Mt}
              id="user-email"
              type="email"
              value=${i}
              onChange=${p=>o(p.target.value)}
            />
          <//>
        </div>
        <${$n} label=${n("users.role")} htmlFor="user-role">
          <select
            id="user-role"
            value=${u}
            onChange=${p=>c(p.target.value)}
            className="v2-select h-9 rounded-md border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] px-3 text-sm text-[var(--v2-text-strong)] outline-none focus:border-[color-mix(in_srgb,var(--v2-accent)_45%,var(--v2-panel-border))]"
          >
            <option value="member">${n("users.member")}</option>
            <option value="admin">${n("users.admin")}</option>
          </select>
        <//>
        ${a&&l` <p className="text-sm text-[var(--v2-danger-text)]">${a.message}</p> `}
        <div className="flex gap-2">
          <${T} type="submit" disabled=${t}>
            ${n(t?"users.creating":"users.createUser")}
          <//>
          <${T}
            variant="ghost"
            type="button"
            onClick=${()=>m(!1)}
            >${n("users.cancel")}<//
          >
        </div>
      </form>
    <//>
  `:l`
      <${T} variant="secondary" onClick=${()=>m(!0)}>
        <${M} name="plus" className="mr-2 h-4 w-4" />
        ${n("users.addUser")}
      <//>
    `}function eM({user:e}){let t=k(),a=e.status==="active"?"positive":"danger",n=e.role==="admin"?"accent":"muted";return l`
    <div
      className="flex items-center justify-between gap-4 border-t border-[var(--v2-panel-border)] py-3.5 first:border-0 first:pt-0"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--v2-text)]"
            >${e.display_name||e.id}</span
          >
          <${z}
            tone=${n}
            label=${e.role==="admin"?t("users.admin"):t("users.member")}
            size="sm"
          />
          <${z} tone=${a} label=${e.status||"active"} size="sm" />
        </div>
        ${e.email&&l`
          <div className="mt-0.5 font-mono text-xs text-[var(--v2-text-muted)]">
            ${e.email}
          </div>
        `}
      </div>
      <div
        className="flex shrink-0 items-center gap-4 font-mono text-[11px] text-[var(--v2-text-faint)]"
      >
        ${e.last_active&&l`<span>${new Date(e.last_active).toLocaleDateString()}</span>`}
      </div>
    </div>
  `}function rR({searchQuery:e=""}){let t=k(),{users:a,query:n,isForbidden:r,createUser:s,createError:i,isCreating:o}=nR();if(n.isLoading)return l`
      <${ae} padding="md">
        <div className="mb-4 h-3 w-24 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
        ${[1,2,3].map(c=>l`
            <div
              key=${c}
              className="flex items-center justify-between border-t border-[var(--v2-panel-border)] py-3.5 first:border-0"
            >
              <div className="h-4 w-32 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
              <div className="h-6 w-20 animate-pulse rounded-full bg-[var(--v2-surface-muted)]" />
            </div>
          `)}
      <//>
    `;if(r)return l`
      <${ae} padding="lg">
        <div className="flex items-center gap-3">
          <${M} name="lock" className="h-5 w-5 text-[var(--v2-text-faint)]" />
          <h3 className="text-lg font-semibold text-[var(--v2-text-strong)]">
            ${t("users.adminRequired")}
          </h3>
        </div>
        <p className="mt-2 max-w-md text-sm leading-6 text-[var(--v2-text-muted)]">
          ${t("users.adminRequiredDesc")}
        </p>
      <//>
    `;if(n.error)return l`
      <${ae} padding="md">
        <p className="text-sm text-[var(--v2-danger-text)]">
          ${t("users.failedLoad",{message:n.error.message})}
        </p>
      <//>
    `;let u=a.filter(c=>nt(e,[c.id,c.display_name,c.email,c.role,c.status,c.last_active]));return l`
    <div className="space-y-5">
      <${WD}
        onCreate=${s}
        isCreating=${o}
        error=${i}
      />

      <${ae} padding="md">
        <h3
          className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]"
        >
          ${t("users.title",{count:u.length})}
        </h3>
        ${a.length===0?l`<p className="py-4 text-sm text-[var(--v2-text-muted)]">
              ${t("users.noUsers")}
            </p>`:u.length===0?l`<p className="py-4 text-sm text-[var(--v2-text-muted)]">
              ${t("settings.noMatchingSettings",{query:e})}
            </p>`:u.map(c=>l`<${eM} key=${c.id} user=${c} />`)}
      <//>
    </div>
  `}function sR(){let e=ee(),t=H({queryKey:["settings-export"],queryFn:x$,staleTime:3e4}),a=t.data?.settings||{},[n,r]=h.default.useState({}),[s,i]=h.default.useState(!1),o=Y({mutationFn:async({key:m,value:f})=>ad(await $$(m,f),"Save failed"),onSuccess:(m,{key:f,value:p})=>{e.setQueryData(["settings-export"],b=>{if(!b)return b;let y={...b,settings:{...b.settings}};return p==null?delete y.settings[f]:y.settings[f]=p,y}),r(b=>({...b,[f]:!0})),setTimeout(()=>r(b=>({...b,[f]:!1})),2e3),kh.has(f)&&i(!0)}}),u=h.default.useCallback((m,f)=>o.mutate({key:m,value:f}),[o]),c=Y({mutationFn:w$,onSuccess:(m,f)=>{e.invalidateQueries({queryKey:["settings-export"]}),Object.keys(f?.settings||{}).some(b=>kh.has(b))&&i(!0)}}),d=h.default.useCallback(m=>c.mutateAsync(m),[c]);return{settings:a,query:t,save:u,savedKeys:n,needsRestart:s,importSettings:d,isImporting:c.isPending,saveError:o.error||c.error}}function Eh(){let e=k(),{tab:t}=ot(),{gatewayStatus:a,gatewayStatusQuery:n,isAdmin:r=!1}=Ha(),s=r?"inference":"language",i=t||s,{settings:o,query:u,save:c,savedKeys:d,needsRestart:m,saveError:f}=sR(),[p,b]=h.default.useState("");h.default.useEffect(()=>{b("")},[i]);let y=u.isLoading,x={inference:l`<${I_}
      settings=${o}
      gatewayStatus=${a}
      onSave=${c}
      savedKeys=${d}
      isLoading=${y}
      searchQuery=${p}
    />`,agent:l`<${j_}
      settings=${o}
      onSave=${c}
      savedKeys=${d}
      isLoading=${y}
      searchQuery=${p}
    />`,channels:l`<${z_} searchQuery=${p} />`,networking:l`<${K_}
      settings=${o}
      onSave=${c}
      savedKeys=${d}
      isLoading=${y}
      searchQuery=${p}
    />`,tools:l`<${W_} searchQuery=${p} />`,skills:l`<${X_} searchQuery=${p} />`,traces:l`<${aR} searchQuery=${p} />`,users:l`<${rR} searchQuery=${p} />`,language:l`<${H_} searchQuery=${p} />`},g=R=>R==="users"||R==="inference",v=R=>Object.prototype.hasOwnProperty.call(x,R),$=Object.keys(x).filter(R=>r||!g(R)),S=v(s)&&$.includes(s)?s:$[0]||"language";return!v(i)||!r&&g(i)?l`<${lt} to=${`/settings/${S}`} replace />`:l`
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="v2-page-entrance flex-1 p-4 sm:p-6">
          <div className="space-y-5">
            ${m&&l`<div className="sticky top-0 z-20 -mx-4 -mt-4 mb-1 bg-[color-mix(in_srgb,var(--v2-canvas)_92%,transparent)] px-4 pt-4 backdrop-blur sm:-mx-6 sm:px-6">
              <${V_}
                visible=${!0}
                gatewayStatus=${a}
                gatewayStatusQuery=${n}
              />
            </div>`}

            ${f&&l`
              <div
                className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
              >
                ${e("error.saveFailed",{message:f.message})}
              </div>
            `}

            ${x[i]}
          </div>
        </div>
      </div>
    </div>
  `}var Th=Object.freeze({todo:!0});function iR(){return Promise.resolve({users:[],total:0,...Th})}function oR(e){return Promise.resolve(null)}function lR(e){return Promise.resolve({success:!1,message:"TODO: requires v2 admin endpoint"})}function uR(e,t){return Promise.resolve({success:!1,message:"TODO: requires v2 admin endpoint"})}function cR(e){return Promise.resolve({success:!1,message:"TODO: requires v2 admin endpoint"})}function dR(e){return Promise.resolve({success:!1,message:"TODO: requires v2 admin endpoint"})}function mR(e){return Promise.resolve({success:!1,message:"TODO: requires v2 admin endpoint"})}function fR(e,t){return Promise.resolve({success:!1,message:"TODO: requires v2 admin endpoint"})}function pR(){return Promise.resolve({total_users:0,active_users:0,suspended_users:0,admin_users:0,total_jobs:0,llm_calls:0,total_cost_usd:0,active_jobs:0,uptime_seconds:0,recent_users:[],...Th})}function hR(e="day",t){return Promise.resolve({entries:[],...Th})}function vR(){return H({queryKey:["admin","usage-summary"],queryFn:pR,refetchInterval:3e4})}function nd(e="day",t){return H({queryKey:["admin","usage",e,t],queryFn:()=>hR(e,t),refetchInterval:3e4})}function vi(){let e=ee(),t=H({queryKey:["admin","users"],queryFn:iR,refetchInterval:1e4}),a=t.data,n=Array.isArray(a)?a:a?.users||[],r=t.error?.message?.includes("403")||t.error?.message?.includes("Forbidden"),s=()=>e.invalidateQueries({queryKey:["admin","users"]}),i=Y({mutationFn:lR,onSuccess:s}),o=Y({mutationFn:({id:f,payload:p})=>uR(f,p),onSuccess:s}),u=Y({mutationFn:f=>cR(f),onSuccess:s}),c=Y({mutationFn:f=>dR(f),onSuccess:s}),d=Y({mutationFn:f=>mR(f),onSuccess:s}),m=Y({mutationFn:({userId:f,name:p})=>fR(f,p)});return{users:n,query:t,isForbidden:r,createUser:i.mutateAsync,isCreating:i.isPending,createError:i.error,updateUser:(f,p)=>o.mutateAsync({id:f,payload:p}),deleteUser:u.mutateAsync,suspendUser:c.mutateAsync,activateUser:d.mutateAsync,createToken:(f,p)=>m.mutateAsync({userId:f,name:p}),newToken:m.data,clearToken:()=>m.reset()}}function gR(e){return H({queryKey:["admin","user",e],queryFn:()=>oR(e),enabled:!!e,refetchInterval:1e4})}function Ya(e){return e==null||e===0?"0":e>=1e6?(e/1e6).toFixed(1)+"M":e>=1e3?(e/1e3).toFixed(1)+"K":String(e)}function Ta(e){if(e==null)return"$0.00";let t=parseFloat(e);return isNaN(t)?"$0.00":"$"+t.toFixed(2)}function yR(e){if(!e)return"0s";let t=Math.floor(e/86400),a=Math.floor(e%86400/3600),n=Math.floor(e%3600/60);return t>0?`${t}d ${a}h`:a>0?`${a}h ${n}m`:`${n}m`}function ur(e){if(!e)return"Never";let t=(Date.now()-new Date(e).getTime())/1e3;return t<0||t<60?"Just now":t<3600?Math.floor(t/60)+"m ago":t<86400?Math.floor(t/3600)+"h ago":t<2592e3?Math.floor(t/86400)+"d ago":new Date(e).toLocaleDateString()}function gi(e){return e?e.length>12?e.slice(0,12)+"\u2026":e:""}function yi(e){return e==="active"?"success":e==="suspended"?"danger":"muted"}function bi(e){return e==="admin"?"signal":"muted"}function bR(e){let t=e.length,a=e.filter(s=>s.status==="active").length,n=e.filter(s=>s.status==="suspended").length,r=e.filter(s=>s.role==="admin").length;return{total:t,active:a,suspended:n,admins:r}}function xR(e,{search:t="",filter:a="all"}){let n=e;if(a==="active"?n=n.filter(r=>r.status==="active"):a==="suspended"?n=n.filter(r=>r.status==="suspended"):a==="admin"&&(n=n.filter(r=>r.role==="admin")),t.trim()){let r=t.toLowerCase();n=n.filter(s=>s.display_name&&s.display_name.toLowerCase().includes(r)||s.email&&s.email.toLowerCase().includes(r)||s.id&&s.id.toLowerCase().includes(r))}return n}function $R(e){let t={};for(let a of e)t[a.user_id]||(t[a.user_id]={user_id:a.user_id,calls:0,input_tokens:0,output_tokens:0,cost:0}),t[a.user_id].calls+=a.call_count||0,t[a.user_id].input_tokens+=a.input_tokens||0,t[a.user_id].output_tokens+=a.output_tokens||0,t[a.user_id].cost+=parseFloat(a.total_cost)||0;return Object.values(t).sort((a,n)=>n.cost-a.cost)}function wR(e){let t={};for(let a of e)t[a.model]||(t[a.model]={model:a.model,calls:0,input_tokens:0,output_tokens:0,cost:0}),t[a.model].calls+=a.call_count||0,t[a.model].input_tokens+=a.input_tokens||0,t[a.model].output_tokens+=a.output_tokens||0,t[a.model].cost+=parseFloat(a.total_cost)||0;return Object.values(t).sort((a,n)=>n.cost-a.cost)}function SR(e){return e.reduce((t,a)=>({calls:t.calls+a.calls,input_tokens:t.input_tokens+a.input_tokens,output_tokens:t.output_tokens+a.output_tokens,cost:t.cost+a.cost}),{calls:0,input_tokens:0,output_tokens:0,cost:0})}function tM({users:e,onSelectUser:t}){let a=k(),n=[...e].sort((r,s)=>{let i=r.last_active_at||r.created_at||"";return(s.last_active_at||s.created_at||"").localeCompare(i)}).slice(0,8);return n.length?l`
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left">
            <th className="pb-3 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300">${a("admin.dashboard.name")}</th>
            <th className="pb-3 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300">${a("admin.dashboard.role")}</th>
            <th className="pb-3 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300">${a("admin.dashboard.status")}</th>
            <th className="hidden pb-3 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300 sm:table-cell">${a("admin.dashboard.jobs")}</th>
            <th className="pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300">${a("admin.dashboard.lastActive")}</th>
          </tr>
        </thead>
        <tbody>
          ${n.map(r=>l`
              <tr key=${r.id} className="border-b border-white/[0.06] last:border-0">
                <td className="py-3 pr-4">
                  <button
                    onClick=${()=>t(r.id)}
                    className="text-sm font-medium text-signal hover:underline"
                  >
                    ${r.display_name||r.id}
                  </button>
                </td>
                <td className="py-3 pr-4"><${z} tone=${bi(r.role)} label=${r.role||"member"} /></td>
                <td className="py-3 pr-4"><${z} tone=${yi(r.status)} label=${r.status||"active"} /></td>
                <td className="hidden py-3 pr-4 font-mono text-xs text-iron-300 sm:table-cell">${r.job_count??0}</td>
                <td className="py-3 text-xs text-iron-300">${ur(r.last_active_at)}</td>
              </tr>
            `)}
        </tbody>
      </table>
    </div>
  `:l`<p className="py-4 text-sm text-iron-300">${a("admin.dashboard.noUsers")}</p>`}function NR({onSelectUser:e,onNavigateTab:t}){let a=k(),n=vR(),{users:r,query:s}=vi(),i=n.data||{},o=bR(r),u=i.usage_30d||{},c=i.jobs||{};return n.isLoading||s.isLoading?l`
      <div className="space-y-5">
        <${q} className="p-5 sm:p-6">
          <div className="v2-skeleton mb-4 h-4 w-32 rounded" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            ${[1,2,3,4].map(m=>l`<div key=${m} className="v2-skeleton h-28 rounded-lg" />`)}
          </div>
        <//>
      </div>
    `:l`
    <div className="space-y-5">
      <${q} className="p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal">${a("admin.dashboard.systemOverview")}</h3>
          ${i.uptime_seconds!=null&&l`
            <span className="font-mono text-xs text-iron-300">${a("admin.dashboard.uptime",{value:yR(i.uptime_seconds)})}</span>
          `}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <${at}
            label=${a("admin.dashboard.totalUsers")}
            value=${String(o.total)}
            tone=${o.total>0?"success":"muted"}
          />
          <${at}
            label=${a("admin.dashboard.activeUsers")}
            value=${String(o.active)}
            tone="success"
          />
          <${at}
            label=${a("admin.dashboard.suspended")}
            value=${String(o.suspended)}
            tone=${o.suspended>0?"danger":"muted"}
          />
          <${at}
            label=${a("admin.dashboard.admins")}
            value=${String(o.admins)}
            tone="signal"
          />
        </div>
      <//>

      <${q} className="p-5 sm:p-6">
        <h3 className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">${a("admin.dashboard.usage30d")}</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <${at}
            label=${a("admin.dashboard.totalJobs")}
            value=${String(c.total||0)}
            tone="muted"
          />
          <${at}
            label=${a("admin.dashboard.llmCalls")}
            value=${String(u.llm_calls||0)}
            tone="muted"
          />
          <${at}
            label=${a("admin.dashboard.totalCost")}
            value=${Ta(u.total_cost)}
            tone="signal"
          />
          <${at}
            label=${a("admin.dashboard.activeJobs")}
            value=${String(c.in_progress||0)}
            tone=${(c.in_progress||0)>0?"success":"muted"}
          />
        </div>
      <//>

      <${q} className="p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal">${a("admin.dashboard.recentUsers")}</h3>
          <button
            onClick=${()=>t("users")}
            className="text-xs text-signal hover:underline"
          >
            ${a("admin.dashboard.viewAll")}
          </button>
        </div>
        <${tM} users=${r} onSelectUser=${e} />
      <//>
    </div>
  `}var aM=[{value:"day",label:"24h"},{value:"week",label:"7d"},{value:"month",label:"30d"}];function nM({value:e,max:t}){let a=t>0?e/t*100:0;return l`
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
      <div
        className="h-full rounded-full bg-signal/50"
        style=${{width:`${Math.max(a,1)}%`}}
      />
    </div>
  `}function _R({onSelectUser:e}){let t=k(),[a,n]=h.default.useState("day"),r=nd(a),s=r.data?.usage||[],i=$R(s),o=wR(s),u=SR(i),c=i.length>0?i[0].cost:0;return r.isLoading?l`
      <${q} className="p-5 sm:p-6">
        <div className="v2-skeleton mb-4 h-4 w-32 rounded" />
        <div className="grid gap-4 sm:grid-cols-4">
          ${[1,2,3,4].map(d=>l`<div key=${d} className="v2-skeleton h-28 rounded-lg" />`)}
        </div>
      <//>
    `:l`
    <div className="space-y-5">
      <${q} className="p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal">${t("admin.usage.overview")}</h3>
          <div className="flex gap-1">
            ${aM.map(d=>l`
                <button
                  key=${d.value}
                  onClick=${()=>n(d.value)}
                  className=${["rounded-md px-3 py-1.5 text-[11px] font-medium",a===d.value?"border border-signal/35 bg-signal/10 text-white":"border border-transparent text-iron-300 hover:text-white"].join(" ")}
                >
                  ${d.label}
                </button>
              `)}
          </div>
        </div>

        ${s.length===0?l`<p className="py-4 text-sm text-iron-300">${t("admin.usage.noData")}</p>`:l`
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <${at} label=${t("admin.usage.totalCalls")} value=${u.calls.toLocaleString()} tone="muted" />
                <${at} label=${t("admin.usage.inputTokens")} value=${Ya(u.input_tokens)} tone="muted" />
                <${at} label=${t("admin.usage.outputTokens")} value=${Ya(u.output_tokens)} tone="muted" />
                <${at} label=${t("admin.usage.totalCost")} value=${Ta(u.cost.toFixed(2))} tone="signal" />
              </div>
            `}
      <//>

      ${i.length>0&&l`
        <${q} className="p-5 sm:p-6">
          <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">${t("admin.usage.perUser")}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="pb-3 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300">${t("admin.usage.user")}</th>
                  <th className="pb-3 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300">${t("admin.usage.calls")}</th>
                  <th className="hidden pb-3 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300 sm:table-cell">${t("admin.usage.input")}</th>
                  <th className="hidden pb-3 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300 sm:table-cell">${t("admin.usage.output")}</th>
                  <th className="pb-3 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300">${t("admin.usage.cost")}</th>
                  <th className="hidden pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300 md:table-cell" />
                </tr>
              </thead>
              <tbody>
                ${i.map(d=>l`
                    <tr key=${d.user_id} className="border-b border-white/[0.06] last:border-0">
                      <td className="py-3 pr-4">
                        <button
                          onClick=${()=>e(d.user_id)}
                          className="font-mono text-xs text-signal hover:underline"
                        >
                          ${gi(d.user_id)}
                        </button>
                      </td>
                      <td className="py-3 pr-4 font-mono text-xs text-iron-300">${d.calls.toLocaleString()}</td>
                      <td className="hidden py-3 pr-4 font-mono text-xs text-iron-300 sm:table-cell">${Ya(d.input_tokens)}</td>
                      <td className="hidden py-3 pr-4 font-mono text-xs text-iron-300 sm:table-cell">${Ya(d.output_tokens)}</td>
                      <td className="py-3 pr-4 font-mono text-xs text-iron-100">${Ta(d.cost.toFixed(2))}</td>
                      <td className="hidden py-3 md:table-cell">
                        <${nM} value=${d.cost} max=${c} />
                      </td>
                    </tr>
                  `)}
              </tbody>
            </table>
          </div>
        <//>
      `}

      ${o.length>0&&l`
        <${q} className="p-5 sm:p-6">
          <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">${t("admin.usage.perModel")}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="pb-3 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300">${t("admin.usage.model")}</th>
                  <th className="pb-3 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300">${t("admin.usage.calls")}</th>
                  <th className="hidden pb-3 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300 sm:table-cell">${t("admin.usage.input")}</th>
                  <th className="hidden pb-3 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300 sm:table-cell">${t("admin.usage.output")}</th>
                  <th className="pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300">${t("admin.usage.cost")}</th>
                </tr>
              </thead>
              <tbody>
                ${o.map(d=>l`
                    <tr key=${d.model} className="border-b border-white/[0.06] last:border-0">
                      <td className="py-3 pr-4 font-mono text-xs text-iron-100">${d.model}</td>
                      <td className="py-3 pr-4 font-mono text-xs text-iron-300">${d.calls.toLocaleString()}</td>
                      <td className="hidden py-3 pr-4 font-mono text-xs text-iron-300 sm:table-cell">${Ya(d.input_tokens)}</td>
                      <td className="hidden py-3 pr-4 font-mono text-xs text-iron-300 sm:table-cell">${Ya(d.output_tokens)}</td>
                      <td className="py-3 font-mono text-xs text-iron-100">${Ta(d.cost.toFixed(2))}</td>
                    </tr>
                  `)}
              </tbody>
            </table>
          </div>
        <//>
      `}
    </div>
  `}function cr({label:e,children:t}){return l`
    <div className="flex items-start justify-between gap-4 border-t border-white/[0.06] py-3 first:border-0 first:pt-0">
      <span className="text-xs text-iron-300">${e}</span>
      <span className="text-right text-sm text-iron-100">${t}</span>
    </div>
  `}function RR({userId:e,onBack:t}){let a=k(),n=gR(e),r=nd("month",e),{suspendUser:s,activateUser:i,updateUser:o,deleteUser:u,createToken:c,newToken:d,clearToken:m}=vi(),[f,p]=h.default.useState(null),[b,y]=h.default.useState(!1),x=n.data,g=r.data?.usage||[];if(h.default.useEffect(()=>{x&&f===null&&p(x.role)},[x]),n.isLoading)return l`
      <div className="space-y-5">
        <${q} className="p-5 sm:p-6">
          <div className="v2-skeleton mb-2 h-6 w-48 rounded" />
          <div className="v2-skeleton h-4 w-32 rounded" />
        <//>
      </div>
    `;if(n.error)return l`
      <${q} className="p-5 sm:p-6">
        <p className="text-sm text-red-200">${a("error.loadFailed",{what:a("admin.users.user"),message:n.error.message})}</p>
      <//>
    `;if(!x)return null;let v=async()=>{f&&f!==x.role&&await o(x.id,{role:f})},$=async()=>{await u(x.id),t()},w=async()=>{let S=window.prompt(a("admin.users.tokenNamePrompt",{name:x.display_name||a("admin.users.userFallback")}));S&&await c(x.id,S)};return l`
    <div className="space-y-5">
      <button
        onClick=${t}
        className="flex items-center gap-1.5 text-xs text-iron-300 hover:text-white"
      >
        <span>←</span>
        <span>${a("admin.users.backToUsers")}</span>
      </button>

      <${q} className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white">${x.display_name||x.id}</h2>
            <div className="mt-2 flex items-center gap-2">
              <${z} tone=${bi(x.role)} label=${x.role||"member"} />
              <${z} tone=${yi(x.status)} label=${x.status||"active"} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            ${x.status==="active"?l`<${T} variant="secondary" onClick=${()=>s(x.id)}>${a("admin.users.suspend")}<//>`:l`<${T} variant="secondary" onClick=${()=>i(x.id)}>${a("admin.users.activate")}<//>`}
            <${T} variant="secondary" onClick=${w}>${a("admin.users.createToken")}<//>
            <button
              onClick=${()=>y(!0)}
              className="v2-button inline-flex h-10 items-center justify-center rounded-md border border-red-400/30 bg-red-500/10 px-4 text-sm font-semibold text-red-200 hover:bg-red-500/20"
            >
              ${a("admin.users.delete")}
            </button>
          </div>
        </div>
      <//>

      ${(d?.token||d?.plaintext_token)&&l`
        <div className="rounded-xl border border-signal/30 bg-signal/10 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white">${a("admin.users.tokenCreated")}</p>
              <p className="mt-1 text-xs text-iron-300">${a("admin.users.tokenCreatedDesc")}</p>
              <code className="mt-2 block truncate rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-xs text-iron-100">
                ${d.token||d.plaintext_token}
              </code>
            </div>
            <button onClick=${m} className="text-iron-300 hover:text-white">
              <${M} name="close" className="h-4 w-4" />
            </button>
          </div>
        </div>
      `}

      <div className="grid gap-5 lg:grid-cols-2">
        <${q} className="p-5 sm:p-6">
          <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">${a("admin.user.profile")}</h3>
          <${cr} label=${a("admin.user.id")}>
            <span className="font-mono text-xs">${x.id}</span>
          <//>
          <${cr} label=${a("admin.user.email")}>${x.email||a("admin.user.notSet")}<//>
          <${cr} label=${a("admin.user.created")}>${ur(x.created_at)}<//>
          <${cr} label=${a("admin.user.lastLogin")}>${ur(x.last_login_at)}<//>
          ${x.created_by&&l`
            <${cr} label=${a("admin.user.createdBy")}>
              <span className="font-mono text-xs">${gi(x.created_by)}</span>
            <//>
          `}
        <//>

        <${q} className="p-5 sm:p-6">
          <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">${a("admin.user.summary")}</h3>
          <${cr} label=${a("admin.user.jobs")}>${x.job_count??0}<//>
          <${cr} label=${a("admin.user.totalCost")}>${Ta(x.total_cost)}<//>
          <${cr} label=${a("admin.user.lastActive")}>${ur(x.last_active_at)}<//>
        <//>
      </div>

      <${q} className="p-5 sm:p-6">
        <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">${a("admin.user.roleManagement")}</h3>
        <div className="flex items-end gap-3">
          <div>
            <label className="mb-1 block text-xs text-iron-300">${a("admin.user.currentRole")}</label>
            <select
              value=${f||x.role}
              onChange=${S=>p(S.target.value)}
              className="v2-select h-9 rounded-md border border-white/12 bg-white/[0.04] px-3 text-sm text-iron-100 outline-none focus:border-signal/45"
            >
              <option value="member">${a("admin.users.member")}</option>
              <option value="admin">${a("admin.users.admin")}</option>
            </select>
          </div>
          <${T} onClick=${v} disabled=${!f||f===x.role}>
            ${a("admin.user.saveRole")}
          <//>
        </div>
      <//>

      <${q} className="p-5 sm:p-6">
        <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">${a("admin.user.usage30Days")}</h3>
        ${g.length===0?l`<p className="py-4 text-sm text-iron-300">${a("admin.user.noUsage")}</p>`:l`
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left">
                      <th className="pb-3 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300">${a("admin.usage.model")}</th>
                      <th className="pb-3 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300">${a("admin.usage.calls")}</th>
                      <th className="hidden pb-3 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300 sm:table-cell">${a("admin.usage.input")}</th>
                      <th className="hidden pb-3 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300 sm:table-cell">${a("admin.usage.output")}</th>
                      <th className="pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-iron-300">${a("admin.usage.cost")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${g.map((S,R)=>l`
                        <tr key=${R} className="border-b border-white/[0.06] last:border-0">
                          <td className="py-3 pr-4 font-mono text-xs text-iron-100">${S.model}</td>
                          <td className="py-3 pr-4 font-mono text-xs text-iron-300">${(S.call_count||0).toLocaleString()}</td>
                          <td className="hidden py-3 pr-4 font-mono text-xs text-iron-300 sm:table-cell">${Ya(S.input_tokens)}</td>
                          <td className="hidden py-3 pr-4 font-mono text-xs text-iron-300 sm:table-cell">${Ya(S.output_tokens)}</td>
                          <td className="py-3 font-mono text-xs text-iron-100">${Ta(S.total_cost)}</td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              </div>
            `}
      <//>

      ${b&&l`
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick=${()=>y(!1)}>
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-iron-900 p-6" onClick=${S=>S.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white">${a("admin.users.deleteUserTitle")}</h3>
            <p className="mt-2 text-sm text-iron-300">
              ${a("admin.users.deleteUserDesc",{name:x.display_name})}
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <${T} variant="ghost" onClick=${()=>y(!1)}>${a("admin.users.cancel")}<//>
              <button
                onClick=${$}
                className="v2-button inline-flex h-10 items-center justify-center rounded-md bg-red-500/20 px-4 text-sm font-semibold text-red-200 hover:bg-red-500/30"
              >
                ${a("admin.users.delete")}
              </button>
            </div>
          </div>
        </div>
      `}
    </div>
  `}function rM(e){return[{value:"all",label:e("admin.users.filter.all")},{value:"active",label:e("admin.users.filter.active")},{value:"suspended",label:e("admin.users.filter.suspended")},{value:"admin",label:e("admin.users.filter.admins")}]}function sM({token:e,onDismiss:t}){let a=k(),[n,r]=h.default.useState(!1),s=()=>{navigator.clipboard&&(navigator.clipboard.writeText(e),r(!0),setTimeout(()=>r(!1),2e3))};return l`
    <div className="rounded-xl border border-signal/30 bg-signal/10 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-iron-100">${a("admin.users.tokenCreated")}</p>
          <p className="mt-1 text-xs text-iron-300">${a("admin.users.tokenCreatedDesc")}</p>
          <div className="mt-3 flex items-center gap-2">
            <code className="min-w-0 flex-1 truncate rounded-md border border-iron-700 bg-iron-800/70 px-3 py-2 font-mono text-xs text-iron-100">
              ${e}
            </code>
            <${T} variant="secondary" onClick=${s}>
              ${a(n?"admin.users.copied":"admin.users.copy")}
            <//>
          </div>
        </div>
        <button onClick=${t} className="text-iron-300 hover:text-iron-100">
          <${M} name="close" className="h-4 w-4" />
        </button>
      </div>
    </div>
  `}function iM({onCreate:e,isCreating:t,error:a}){let n=k(),[r,s]=h.default.useState(""),[i,o]=h.default.useState(""),[u,c]=h.default.useState("member"),[d,m]=h.default.useState(!1),f=async p=>{p.preventDefault(),r.trim()&&(await e({display_name:r.trim(),email:i.trim()||void 0,role:u}),s(""),o(""),m(!1))};return d?l`
    <${q} className="p-5 sm:p-6">
      <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">${n("admin.users.createUser")}</h3>
      <form onSubmit=${f} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs text-iron-300">${n("admin.users.displayName")}</label>
            <input
              type="text"
              value=${r}
              onChange=${p=>s(p.target.value)}
              required
              className="h-9 w-full rounded-md border border-iron-700 bg-iron-800/70 px-3 text-sm text-iron-100 outline-none placeholder:text-iron-400 focus:border-signal/45"
              placeholder=${n("admin.users.displayNamePlaceholder")}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-iron-300">${n("admin.users.email")}</label>
            <input
              type="email"
              value=${i}
              onChange=${p=>o(p.target.value)}
              className="h-9 w-full rounded-md border border-iron-700 bg-iron-800/70 px-3 text-sm text-iron-100 outline-none placeholder:text-iron-400 focus:border-signal/45"
              placeholder=${n("admin.users.emailPlaceholder")}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-iron-300">${n("admin.users.role")}</label>
            <select
              value=${u}
              onChange=${p=>c(p.target.value)}
              className="v2-select h-9 w-full rounded-md border border-iron-700 bg-iron-800/70 px-3 text-sm text-iron-100 outline-none focus:border-signal/45"
            >
              <option value="member">${n("admin.users.member")}</option>
              <option value="admin">${n("admin.users.admin")}</option>
            </select>
          </div>
        </div>
        ${a&&l`<p className="text-sm text-[var(--v2-danger-text)]">${a.message}</p>`}
        <div className="flex gap-2">
          <${T} type="submit" disabled=${t}>
            ${n(t?"admin.users.creating":"admin.users.createUser")}
          <//>
          <${T} variant="ghost" type="button" onClick=${()=>m(!1)}>${n("admin.users.cancel")}<//>
        </div>
      </form>
    <//>
  `:l`
      <${T} variant="secondary" onClick=${()=>m(!0)}>
        <${M} name="plus" className="mr-2 h-4 w-4" />
        ${n("admin.users.newUser")}
      <//>
    `}function oM({title:e,message:t,confirmLabel:a,onConfirm:n,onCancel:r}){let s=k();return l`
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick=${r}>
      <div className="w-full max-w-md rounded-xl border border-iron-700 bg-iron-900 p-6" onClick=${i=>i.stopPropagation()}>
        <h3 className="text-lg font-semibold text-iron-100">${e}</h3>
        <p className="mt-2 text-sm text-iron-300">${t}</p>
        <div className="mt-5 flex justify-end gap-2">
          <${T} variant="ghost" onClick=${r}>${s("admin.users.cancel")}<//>
          <button
            onClick=${n}
            className="v2-button inline-flex h-10 items-center justify-center rounded-md bg-[var(--v2-danger-soft)] px-4 text-sm font-semibold text-[var(--v2-danger-text)] hover:bg-[color-mix(in_srgb,var(--v2-danger-soft)_65%,var(--v2-danger-text))]"
          >
            ${a}
          </button>
        </div>
      </div>
    </div>
  `}function lM({user:e,onSelect:t,onSuspend:a,onActivate:n,onChangeRole:r,onCreateToken:s}){let i=k();return l`
    <div className="flex items-center justify-between gap-4 border-t border-iron-700 py-3.5 first:border-0 first:pt-0">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick=${()=>t(e.id)}
            className="text-sm font-medium text-signal hover:underline"
          >
            ${e.display_name||e.id}
          </button>
          <${z} tone=${bi(e.role)} label=${e.role||"member"} />
          <${z} tone=${yi(e.status)} label=${e.status||"active"} />
        </div>
        <div className="mt-0.5 flex flex-wrap gap-x-4 gap-y-0.5">
          ${e.email&&l`<span className="font-mono text-xs text-iron-300">${e.email}</span>`}
          <span className="font-mono text-xs text-iron-700">${gi(e.id)}</span>
        </div>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <span className="hidden font-mono text-xs text-iron-300 sm:inline">
          ${e.job_count!=null?i("admin.users.jobsCount",{count:e.job_count}):""}
          ${e.total_cost!=null?` \xB7 ${Ta(e.total_cost)}`:""}
        </span>
        <span className="hidden text-xs text-iron-700 lg:inline">${ur(e.last_active_at)}</span>
        <div className="flex gap-1">
          ${e.status==="active"?l`<button onClick=${()=>a(e.id)} className="rounded-md border border-iron-700 px-2.5 py-1.5 text-[11px] font-medium text-iron-300 hover:border-[color-mix(in_srgb,var(--v2-danger-text)_36%,var(--v2-panel-border))] hover:text-[var(--v2-danger-text)]">${i("admin.users.suspend")}</button>`:l`<button onClick=${()=>n(e.id)} className="rounded-md border border-iron-700 px-2.5 py-1.5 text-[11px] font-medium text-iron-300 hover:border-signal/30 hover:text-signal">${i("admin.users.activate")}</button>`}
          <button
            onClick=${()=>r(e.id,e.role==="admin"?"member":"admin")}
            className="rounded-md border border-iron-700 px-2.5 py-1.5 text-[11px] font-medium text-iron-300 hover:border-iron-700 hover:text-iron-100"
          >
            ${e.role==="admin"?i("admin.users.demote"):i("admin.users.promote")}
          </button>
          <button
            onClick=${()=>s(e.id,e.display_name)}
            className="rounded-md border border-iron-700 px-2.5 py-1.5 text-[11px] font-medium text-iron-300 hover:border-signal/30 hover:text-signal"
          >
            ${i("admin.users.token")}
          </button>
        </div>
      </div>
    </div>
  `}function kR({selectedUserId:e,onSelectUser:t}){let a=k(),{users:n,query:r,isForbidden:s,createUser:i,isCreating:o,createError:u,updateUser:c,deleteUser:d,suspendUser:m,activateUser:f,createToken:p,newToken:b,clearToken:y}=vi(),[x,g]=h.default.useState(""),[v,$]=h.default.useState("all"),[w,S]=h.default.useState(null),R=xR(n,{search:x,filter:v}),C=rM(a),E=j=>{S({title:a("admin.users.suspendTitle"),message:a("admin.users.suspendDesc"),confirmLabel:a("admin.users.suspend"),onConfirm:()=>{m(j),S(null)}})},O=async(j,J)=>{let D=window.prompt(a("admin.users.tokenNamePrompt",{name:J||a("admin.users.userFallback")}));D&&await p(j,D)};return r.isLoading?l`
      <${q} className="p-5 sm:p-6">
        <div className="v2-skeleton mb-4 h-3 w-24 rounded" />
        ${[1,2,3].map(j=>l`
          <div key=${j} className="flex items-center justify-between border-t border-iron-700 py-3.5 first:border-0">
            <div className="v2-skeleton h-4 w-32 rounded" />
            <div className="v2-skeleton h-6 w-20 rounded-full" />
          </div>
        `)}
      <//>
    `:s?l`
      <${q} className="p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <${M} name="lock" className="h-5 w-5 text-iron-700" />
          <h3 className="text-lg font-semibold text-iron-100">${a("users.adminRequired")}</h3>
        </div>
        <p className="mt-2 max-w-md text-sm leading-6 text-iron-300">
          ${a("users.adminRequiredDesc")}
        </p>
      <//>
    `:l`
    <div className="space-y-5">
      ${b&&l`
        <${sM}
          token=${b.token||b.plaintext_token}
          onDismiss=${y}
        />
      `}

      <${iM} onCreate=${i} isCreating=${o} error=${u} />

      <${q} className="p-5 sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal">
            ${a("admin.users.title",{count:R.length,total:n.length})}
          </h3>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder=${a("admin.users.searchPlaceholder")}
              value=${x}
              onChange=${j=>g(j.target.value)}
              className="h-8 w-48 rounded-md border border-iron-700 bg-iron-800/70 px-3 text-xs text-iron-100 outline-none placeholder:text-iron-400 focus:border-signal/45"
            />
            <div className="flex gap-1">
              ${C.map(j=>l`
                  <button
                    key=${j.value}
                    onClick=${()=>$(j.value)}
                    className=${["rounded-md px-2.5 py-1.5 text-[11px] font-medium",v===j.value?"border border-signal/35 bg-signal/10 text-iron-100":"border border-transparent text-iron-300 hover:text-iron-100"].join(" ")}
                  >
                    ${j.label}
                  </button>
                `)}
            </div>
          </div>
        </div>

        ${R.length===0?l`<p className="py-4 text-sm text-iron-300">${a("admin.users.noMatch")}</p>`:R.map(j=>l`
                <${lM}
                  key=${j.id}
                  user=${j}
                  onSelect=${t}
                  onSuspend=${E}
                  onActivate=${f}
                  onChangeRole=${(J,D)=>c(J,{role:D})}
                  onCreateToken=${O}
                />
              `)}
      <//>

      ${w&&l`
        <${oM}
          title=${w.title}
          message=${w.message}
          confirmLabel=${w.confirmLabel}
          onConfirm=${w.onConfirm}
          onCancel=${()=>S(null)}
        />
      `}
    </div>
  `}function CR(){let{tab:e="dashboard"}=ot(),t=pe(),[a,n]=h.default.useState(null),r=h.default.useCallback(o=>{n(o),t("/admin/users")},[t]),s=h.default.useCallback(()=>{n(null)},[]),i={dashboard:l`<${NR}
      onSelectUser=${r}
      onNavigateTab=${o=>t("/admin/"+o)}
    />`,users:a?l`<${RR} userId=${a} onBack=${s} />`:l`<${kR}
          selectedUserId=${a}
          onSelectUser=${r}
        />`,usage:l`<${_R} onSelectUser=${r} />`};return i[e]?l`
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="v2-page-entrance flex-1 p-4 sm:p-6">
        <div className="space-y-5">${i[e]}</div>
      </div>
    </div>
  `:l`<${lt} to="/admin/dashboard" replace />`}var uM=2e3,cM=500,dM=2e3,mM=new Set([403,404]),fM=[["threadId","thread_id","logs.scope.thread"],["runId","run_id","logs.scope.run"],["turnId","turn_id","logs.scope.turn"],["toolCallId","tool_call_id","logs.scope.toolCall"],["toolName","tool_name","logs.scope.tool"],["source","source","logs.scope.source"]];function pM(e=globalThis.location){let t=new URLSearchParams(e?.search||"");return fM.reduce((a,[n,r,s])=>{let i=t.get(r)?.trim();return i?(a[n]=i,a.active.push({key:n,param:r,labelKey:s,value:i})):a[n]=null,a},{active:[]})}function ER(){let e=Me(),t=h.default.useMemo(()=>pM(e),[e.search]),[a,n]=h.default.useState([]),[r,s]=h.default.useState("all"),[i,o]=h.default.useState(""),[u,c]=h.default.useState(!1),[d,m]=h.default.useState(!0),[f,p]=h.default.useState(!0),[b,y]=h.default.useState(null),[x,g]=h.default.useState(!1),v=h.default.useRef(new Set),$=h.default.useRef(0),w=h.default.useCallback(async()=>{if(x)return;let C=++$.current;p(!0);try{let E=await Lx({limit:cM,level:r==="all"?null:r,target:i.trim()||null,threadId:t.threadId,runId:t.runId,turnId:t.turnId,toolCallId:t.toolCallId,toolName:t.toolName,source:t.source});if(C!==$.current)return;let O=v.current,J=$N(E).entries.filter(D=>!O.has(D.id));n(J),y(null)}catch(E){if(C!==$.current)return;if(mM.has(E?.status)){n([]),y(null),g(!0);return}y(E)}finally{C===$.current&&p(!1)}},[x,r,t,i]);h.default.useEffect(()=>{w()},[w]),h.default.useEffect(()=>{if(u||x)return;let C=setInterval(w,uM);return()=>clearInterval(C)},[x,w,u]);let S=h.default.useCallback(()=>{c(C=>!C)},[]),R=h.default.useCallback(()=>{let C=[...v.current,...a.map(E=>E.id)].slice(-dM);v.current=new Set(C),n([])},[a]);return{entries:a,totalCount:a.length,paused:u,togglePause:S,clearEntries:R,levelFilter:r,setLevelFilter:s,targetFilter:i,setTargetFilter:o,autoScroll:d,setAutoScroll:m,serverLevel:null,changeServerLevel:async()=>{},scope:t,status:b?"error":f?"loading":"ready",isLoading:f,error:b}}var hM=["all","trace","debug","info","warn","error"],vM=["trace","debug","info","warn","error"],TR={trace:"text-[var(--v2-text-muted)]",debug:"text-[color-mix(in_srgb,var(--v2-accent)_80%,white)]",info:"text-[var(--v2-text-strong)]",warn:"text-yellow-400",error:"text-red-400"},gM={warn:"bg-yellow-500/5",error:"bg-red-500/8"};function yM({entry:e}){let t=k(),[a,n]=h.default.useState(!1),r=e.timestamp?e.timestamp.substring(11,23):"",s=TR[e.level]||TR.info,i=gM[e.level]||"",o=[{key:"thread_id",labelKey:"logs.scope.thread",value:e.threadId},{key:"run_id",labelKey:"logs.scope.run",value:e.runId},{key:"turn_id",labelKey:"logs.scope.turn",value:e.turnId},{key:"tool_call_id",labelKey:"logs.scope.toolCall",value:e.toolCallId},{key:"tool_name",labelKey:"logs.scope.tool",value:e.toolName},{key:"source",labelKey:"logs.scope.source",value:e.source}].filter(u=>!!u.value);return l`
    <div data-testid="logs-entry" className=${i}>
      <div
        data-testid="logs-entry-row"
        onClick=${()=>n(u=>!u)}
        className=${["grid cursor-pointer select-none gap-x-3 px-4 py-1 font-mono text-xs hover:bg-[var(--v2-surface-muted)]","grid-cols-[7rem_3rem_minmax(10rem,18rem)_1fr]"].join(" ")}
      >
        <span className="text-[var(--v2-text-muted)] tabular-nums">${r}</span>
        <span className=${["font-semibold uppercase",s].join(" ")}>
          ${e.level}
        </span>
        <span className="truncate text-[var(--v2-text-muted)]">${e.target}</span>
        <span
          data-testid="logs-entry-message"
          className=${["min-w-0 text-[var(--v2-text-base)]",a?"whitespace-pre-wrap break-all":"truncate"].join(" ")}
        >
          ${e.message}
        </span>
      </div>
      ${a&&o.length>0&&l`
        <div
          data-testid="logs-entry-context"
          className="flex flex-wrap gap-1.5 px-4 pb-2 pl-[calc(7rem+3rem+2.5rem)] font-mono text-[11px] text-[var(--v2-text-muted)]"
        >
          ${o.map(u=>l`
              <span
                key=${u.key}
                data-testid="logs-context-chip"
                data-context-key=${u.key}
                className="inline-flex max-w-full items-center gap-1 rounded-[6px] border border-[var(--v2-panel-border)] bg-[var(--v2-surface-muted)] px-2 py-0.5"
              >
                <span>${t(u.labelKey)}</span>
                <span className="max-w-[18rem] truncate text-[var(--v2-text-base)]">${u.value}</span>
              </span>
            `)}
        </div>
      `}
    </div>
  `}function AR({value:e,onChange:t,options:a,labelKey:n,t:r}){return l`
    <select
      value=${e}
      onChange=${s=>t(s.target.value)}
      className="v2-select h-8 min-w-0 rounded-[8px] px-2.5 py-0 text-xs"
    >
      ${a.map(s=>l`<option key=${s} value=${s}>${r(n(s))}</option>`)}
    </select>
  `}function bM({label:e,value:t,scopeKey:a}){return l`
    <span
      data-testid="logs-scope-chip"
      data-scope-key=${a}
      className="inline-flex max-w-full items-center gap-1 rounded-[6px] border border-[var(--v2-panel-border)] bg-[var(--v2-surface-muted)] px-2 py-1 font-mono text-[11px] text-[var(--v2-text-muted)]"
      title=${`${e}: ${t}`}
    >
      <span className="uppercase tracking-[0.08em]">${e}</span>
      <span className="max-w-[18rem] truncate text-[var(--v2-text-base)]">${t}</span>
    </span>
  `}function DR(){let e=k(),{entries:t,totalCount:a,paused:n,togglePause:r,clearEntries:s,levelFilter:i,setLevelFilter:o,targetFilter:u,setTargetFilter:c,autoScroll:d,setAutoScroll:m,serverLevel:f,changeServerLevel:p,scope:b,isLoading:y,error:x}=ER(),g=h.default.useRef(null),v=h.default.useRef(!0);h.default.useEffect(()=>{d&&v.current&&g.current&&(g.current.scrollTop=0)},[t,d]);let $=h.default.useCallback(R=>{v.current=R.currentTarget.scrollTop<=48},[]),w=t.length>0,S=b?.active||[];return l`
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <!-- Toolbar -->
      <div
        className="flex shrink-0 flex-wrap items-center gap-2 border-b border-[var(--v2-panel-border)] bg-[var(--v2-canvas-strong)] px-4 py-2"
      >
        <!-- Level filter -->
        <${AR}
          value=${i}
          onChange=${o}
          options=${hM}
          labelKey=${R=>R==="all"?"logs.levelAll":`logs.level.${R}`}
          t=${e}
        />

        <!-- Target filter -->
        <input
          type="text"
          value=${u}
          onInput=${R=>c(R.target.value)}
          placeholder=${e("logs.filterTarget")}
          className="h-8 min-w-[10rem] flex-1 rounded-[8px] border border-[var(--v2-panel-border)] bg-[var(--v2-surface-muted)] px-3 text-xs text-[var(--v2-text-base)] placeholder:text-[var(--v2-text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--v2-accent)]"
        />

        <div className="flex items-center gap-2 ml-auto">
          <span className="hidden tabular-nums text-xs text-[var(--v2-text-muted)] sm:inline">
            ${e("logs.entryCount",{count:a})}
          </span>

          <!-- Auto-scroll toggle -->
          <label className="flex cursor-pointer items-center gap-1.5 text-xs text-[var(--v2-text-muted)]">
            <input
              type="checkbox"
              checked=${d}
              onChange=${R=>m(R.target.checked)}
              className="h-3.5 w-3.5 accent-[var(--v2-accent)]"
            />
            ${e("logs.autoScroll")}
          </label>

          <!-- Pause/Resume -->
          <button
            onClick=${r}
            className=${["h-8 rounded-[8px] px-3 text-xs font-medium",n?"bg-[var(--v2-accent-soft)] text-[var(--v2-accent-text)] hover:bg-[color-mix(in_srgb,var(--v2-accent)_18%,transparent)]":"border border-[var(--v2-panel-border)] text-[var(--v2-text-muted)] hover:bg-[var(--v2-surface-muted)] hover:text-[var(--v2-text-strong)]"].join(" ")}
          >
            ${e(n?"logs.resume":"logs.pause")}
          </button>

          <!-- Clear -->
          <button
            onClick=${()=>{confirm(e("logs.confirmClear"))&&s()}}
            className="h-8 rounded-[8px] border border-[var(--v2-panel-border)] px-3 text-xs text-[var(--v2-text-muted)] hover:bg-[var(--v2-surface-muted)] hover:text-[var(--v2-text-strong)]"
          >
            ${e("logs.clear")}
          </button>
        </div>

        ${S.length>0&&l`
          <div
            data-testid="logs-scope-toolbar"
            className="flex w-full flex-wrap items-center gap-2 border-t border-[var(--v2-panel-border)] pt-2 text-xs text-[var(--v2-text-muted)]"
          >
            <span className="font-medium text-[var(--v2-text-strong)]">${e("logs.scoped")}</span>
            ${S.map(R=>l`<${bM} key=${R.param} scopeKey=${R.param} label=${e(R.labelKey)} value=${R.value} />`)}
            <a
              href="/v2/logs"
              className="ml-auto rounded-[6px] px-2 py-1 text-xs text-[var(--v2-text-muted)] hover:bg-[var(--v2-surface-muted)] hover:text-[var(--v2-text-strong)]"
            >
              ${e("logs.clearScope")}
            </a>
          </div>
        `}

        <!-- Server log level -->
        ${f!=null&&l`
          <div className="flex w-full items-center gap-2 border-t border-[var(--v2-panel-border)] pt-2 text-xs text-[var(--v2-text-muted)]">
            <span>${e("logs.serverLevel")}</span>
            <${AR}
              value=${f}
              onChange=${p}
              options=${vM}
              labelKey=${R=>`logs.level.${R}`}
              t=${e}
            />
            <span className="ml-auto tabular-nums">
              ${e("logs.entryCount",{count:a})}
              ${n?l`<span className="ml-1 text-yellow-400">${e("logs.pausedBadge")}</span>`:null}
            </span>
          </div>
        `}
      </div>

      <!-- Log output -->
      <div
        ref=${g}
        onScroll=${$}
        className="min-h-0 flex-1 overflow-y-auto bg-[var(--v2-canvas)]"
      >
        ${x&&w?l`
              <div
                className="sticky top-0 z-10 border-b border-red-500/25 bg-red-950/70 px-4 py-2 text-xs text-red-100 backdrop-blur"
              >
                ${e("error.loadFailed",{what:e("nav.logs"),message:x.message||x.statusText||"Request failed"})}
              </div>
            `:null}
        ${x&&!w?l`
              <div
                className="flex h-full items-center justify-center px-6 text-center text-sm text-red-300"
              >
                ${e("error.loadFailed",{what:e("nav.logs"),message:x.message||x.statusText||"Request failed"})}
              </div>
            `:y&&!w?l`
                <div
                  className="flex h-full items-center justify-center text-sm text-[var(--v2-text-muted)]"
                >
                  ${e("common.loading")}
                </div>
              `:w?t.map(R=>l`<${yM} key=${R.id} entry=${R} />`):l`
              <div
                className="flex h-full items-center justify-center text-sm text-[var(--v2-text-muted)]"
              >
                ${e("logs.empty")}
              </div>
            `}
      </div>
    </div>
  `}function OR(){return l`
    <main className="grid min-h-[100dvh] place-items-center bg-[var(--v2-canvas)] px-6">
      <div className="text-sm text-[var(--v2-text-muted)]">Checking session...</div>
    </main>
  `}function xM({auth:e}){let t=pe(),n=Me().state?.from,r=n?`${n.pathname||Fr}${n.search||""}${n.hash||""}`:Fr,s=`/v2${r==="/"?"":r}`,i=h.default.useCallback(o=>{e.signIn(o),t(r,{replace:!0})},[e,r,t]);return e.isChecking?l`<${OR} />`:e.isAuthenticated?l`<${lt} to=${r} replace />`:l`<${r1}
    initialToken=${e.token}
    error=${e.error}
    oauthRedirectAfter=${s}
    onSubmit=${i}
  />`}function $M({auth:e,children:t}){let a=Me();return e.isChecking?l`<${OR} />`:e.isAuthenticated?t:l`<${lt} to="/login" replace state=${{from:a}} />`}function wM({auth:e}){return l`
    <${$M} auth=${e}>
      <${Mw}
        token=${e.token}
        profile=${e.profile}
        isChecking=${e.isChecking}
        isAdmin=${e.isAdmin}
        rebornProjectsEnabled=${e.rebornProjectsEnabled}
        onSignOut=${e.signOut}
      />
    <//>
  `}function MR({auth:e}){return e.isAdmin?l`<${CR} />`:l`<${lt} to=${Fr} replace />`}function LR(){let e=g$();return l`
    <${gp} basename="/v2">
      <${fp}>
        <${ye} path="/login" element=${l`<${xM} auth=${e} />`} />
        <${ye} path="/" element=${l`<${wM} auth=${e} />`}>
          <${ye} index element=${l`<${lt} to=${Fr} replace />`} />
          <${ye} path="overview" element=${l`<${lt} to=${Fr} replace />`} />
          <${ye} path="welcome" element=${l`<${R2} />`} />
          <${ye} path="chat" element=${l`<${oh} />`} />
          <${ye} path="chat/:threadId" element=${l`<${oh} />`} />
          <${ye} path="workspace" element=${l`<${uh} />`} />
          <${ye} path="workspace/*" element=${l`<${uh} />`} />
          <${ye} path="projects" element=${l`<${Xo} />`} />
          <${ye} path="projects/:projectId" element=${l`<${Xo} />`} />
          <${ye} path="projects/:projectId/missions/:missionId" element=${l`<${Xo} />`} />
          <${ye} path="projects/:projectId/threads/:threadId" element=${l`<${Xo} />`} />
          <${ye} path="missions" element=${l`<${dh} />`} />
          <${ye} path="missions/:missionId" element=${l`<${dh} />`} />
          <${ye} path="jobs" element=${l`<${ph} />`} />
          <${ye} path="jobs/:jobId" element=${l`<${ph} />`} />
          <${ye} path="routines" element=${l`<${vh} />`} />
          <${ye} path="routines/:routineId" element=${l`<${vh} />`} />
          <${ye} path="automations" element=${l`<${AN} />`} />
          <${ye} path="extensions" element=${l`<${Rh} />`} />
          <${ye} path="extensions/:tab" element=${l`<${Rh} />`} />
          <${ye} path="logs" element=${l`<${DR} />`} />
          <${ye} path="settings" element=${l`<${Eh} />`} />
          <${ye} path="settings/:tab" element=${l`<${Eh} />`} />
          <${ye} path="admin" element=${l`<${MR} auth=${e} />`} />
          <${ye} path="admin/:tab" element=${l`<${MR} auth=${e} />`} />
        <//>
        <${ye} path="*" element=${l`<${lt} to=${Fr} replace />`} />
      <//>
    <//>
  `}Mh("en",{"language.name":"English","language.switch":"Language changed","common.unknown":"Unknown","common.cancel":"Cancel","common.delete":"Delete","common.edit":"Edit","common.loading":"Loading...","common.save":"Save","common.saving":"Saving...","common.done":"Done","common.send":"Send","nav.chat":"Chat","nav.close":"Close","nav.workspace":"Workspace","nav.projects":"Projects","nav.jobs":"Jobs","nav.routines":"Routines","nav.automations":"Automations","nav.missions":"Missions","nav.extensions":"Extensions","nav.settings":"Settings","nav.admin":"Admin","nav.logs":"Logs","nav.docs":"Documentation","nav.sectionWork":"Work","nav.sectionSystem":"System","theme.switchToLight":"Switch to light theme","theme.switchToDark":"Switch to dark theme","theme.light":"Light theme","theme.dark":"Dark theme","header.signOut":"Sign out","status.online":"online","status.offline":"offline","status.checking":"checking","login.tagline":"Gateway v2","login.hero":"Local agent control without losing the operator trail.","login.heroSub":"Token access keeps the browser console tied to the same gateway runtime, approvals, tools, and thread state.","login.bearerAuth":"Bearer auth","login.bearerDesc":"Paste the local gateway token to open the operator surface.","login.console":"IronClaw console","login.secureSub":"Secure access to the local agent gateway.","login.tokenLabel":"Gateway token","login.tokenRequired":"Gateway token is required","login.tokenPlaceholder":"Paste your auth token","login.tokenHint":"Use the token printed by the local gateway process.","login.connect":"Connect","login.oauthDivider":"or continue with","login.oauthProvider":"Continue with {provider}","chat.heroTitle":"Hello, what do you need help with?","chat.heroDesc":"Start with a goal, a repo question, a review request, or work you want inspected.","chat.emptyTitle":"Start with a concrete operator task.","chat.emptyDesc":"Send a message or ask for a gateway check. The workspace keeps approvals and runtime activity visible as the turn progresses.","chat.suggestion1":"Map the current gateway state","chat.suggestion1Desc":"Inspect runtime health, channels, tools, and open work.","chat.suggestion2":"Review recent thread activity","chat.suggestion2Desc":"Look for correctness risks, blocked approvals, and follow-ups.","chat.suggestion3":"Draft an extension readiness check","chat.suggestion3Desc":"Verify setup, auth, pairing, and available capabilities.","chat.placeholder":"Message IronClaw...","chat.heroPlaceholder":"Ask IronClaw anything.","chat.followUpPlaceholder":"Ask for follow-up changes","chat.send":"Send message","chat.attachFiles":"Attach files","chat.attachmentRemove":"Remove attachment","chat.attachmentDropHint":"Drop files to attach","chat.attachmentTooMany":"You can attach at most {max} files per message.","chat.attachmentTooLarge":"{name} is too large (max {max} per file).","chat.attachmentTotalTooLarge":"Attachments exceed the {max} total limit.","chat.attachmentUnsupportedType":"{name} is not a supported file type.","chat.attachmentReadFailed":"Could not read {name}.","chat.attachmentStagingFailed":"Could not attach the selected files.","chat.fileDownloadFailed":"Couldn't download that file.","chat.modeAutoReview":"Auto-review","chat.runtimeLocal":"Work locally","chat.statusWorking":"Working","chat.identityUser":"You","chat.identityAssistant":"IronClaw","chat.jumpToLatest":"Jump to latest","shortcuts.title":"Keyboard shortcuts","shortcuts.send":"Send message","shortcuts.newline":"New line","shortcuts.help":"Show this help","shortcuts.close":"Close","chat.conversations":"Conversations","chat.threads":"{count} threads","chat.newThread":"New","chat.creating":"Creating","chat.selectConversation":"Select conversation","chat.noConversations":"No conversations yet. Start a thread from the composer suggestions.","chat.turns":"{count} turns","connection.connected":"Connected","connection.reconnecting":"Reconnecting...","connection.disconnected":"Disconnected","connection.connecting":"Connecting...","connection.paused":"Paused while tab is hidden","approval.title":"Approval required","approval.approve":"Approve","approval.deny":"Deny","approval.always":"Always","approval.approveAndAlways":"Approve & always allow","approval.alwaysAllowToolLabel":"Always allow {tool} without asking","approval.thisTool":"this tool","approval.viewFullCommand":"View full command","approval.showCommandPreview":"Show preview","tool.tabDetails":"Details","tool.tabParameters":"Parameters","tool.tabResult":"Result","tool.tabError":"Error","tool.noDetail":"No additional detail.","tool.runFile":"explored {n} file","tool.runFiles":"explored {n} files","tool.runSearch":"{n} search","tool.runSearches":"{n} searches","tool.runCommand":"ran {n} command","tool.runCommands":"ran {n} commands","tool.runOther":"{n} tool","tool.runOthers":"{n} tools","tool.exitOk":"succeeded","tool.exitError":"failed","tool.exitRunning":"running\u2026","tool.riskRead":"reads","tool.riskWrite":"writes files","tool.riskExec":"runs commands","tool.riskNetwork":"network","authGate.title":"Authentication required","authGate.tokenLabel":"Access token","authGate.tokenPlaceholder":"Paste access token","authGate.tokenRequired":"A token is required.","authGate.submit":"Use token","authGate.submitting":"Checking...","authGate.cancel":"Cancel","authGate.oauthTitle":"Authorization required","authGate.oauthAccountLabel":"Account:","authGate.openAuthorization":"Open {provider} authorization","authGate.reopenAuthorization":"Re-open {provider} authorization","authGate.oauthWaiting":"Waiting for authorization to complete\u2026 You can close the popup tab once you\u2019ve approved access.","authGate.expiresAt":"Expires","authGate.oauthProviderFallback":"the provider","authGate.serviceUnavailable":"Service unavailable","authGate.pillAuthorize":"Authorize","authGate.pillEnterToken":"Enter token","authGate.unsupportedChallenge":"Open settings to complete this authentication step.","authGate.submitFailed":"Could not save the token.","authGate.resolveFailedAfterTokenSaved":"Token saved. Could not resume the blocked run; retry to resume it.","error.gatewayConnection":"Unable to connect to the gateway","error.saveFailed":"Save failed: {message}","error.loadFailed":"Failed to load {what}: {message}","extensions.installed":"Installed","extensions.channels":"Channels","extensions.mcp":"MCP Servers","extensions.registry":"Registry","settings.inference":"Inference","settings.agent":"Agent","settings.channels":"Channels","settings.networking":"Networking","settings.tools":"Tools","settings.skills":"Skills","settings.traceCommons":"Trace Commons","settings.users":"Users","settings.language":"Language","traceCommons.title":"Trace Commons credits","traceCommons.description":"Credit earned for contributed redacted traces, scoped to your account.","traceCommons.emptyState":"Not enrolled \u2014 ask your agent to onboard with a Trace Commons invite.","traceCommons.loadFailed":"Could not load Trace Commons credits.","traceCommons.enrollment":"Enrollment","traceCommons.enrolled":"Enrolled","traceCommons.notEnrolled":"Not enrolled","traceCommons.pendingCredit":"Pending credit","traceCommons.pendingCreditDesc":"Earned but not yet finalized","traceCommons.finalCredit":"Final credit","traceCommons.finalCreditDesc":"Confirmed credit","traceCommons.delayedLedger":"Delayed ledger","traceCommons.delayedLedgerDesc":"Can still change after review","traceCommons.submissions":"Submissions","traceCommons.submissionsValue":"{submitted} submitted, {accepted} accepted of {total} total","traceCommons.cardAccepted":"Accepted {accepted} / {submitted}","traceCommons.cardHeld":"{count} held for review","traceCommons.heldTitle":"Held for review","traceCommons.heldDescription":"Held because of higher privacy risk; review and authorize to submit.","traceCommons.authorize":"Authorize","traceCommons.authorizing":"Authorizing\u2026","traceCommons.lastSubmission":"Last submission","traceCommons.lastSync":"Last credit sync","traceCommons.lastSyncDesc":"Local view as of last sync","traceCommons.never":"never","traceCommons.recentExplanations":"Recent credit explanations","traceCommons.note":"Local view as of last sync \u2014 the authoritative credit ledger is server-side. Final credit can change after privacy review, replay/eval, duplicate checks, and downstream utility scoring.","settings.back":"Back","settings.searchPlaceholder":"Search settings...","settings.clearSearch":"Clear search","settings.noMatchingSettings":'No settings match "{query}"',"settings.manageJson":"Settings JSON","settings.export":"Export","settings.import":"Import","settings.importing":"Importing...","settings.exportSuccess":"Settings exported","settings.importSuccess":"Settings imported","settings.importInvalid":"Selected file must contain a settings object","settings.importFailed":"Import failed: {message}","settings.restartRequired":"Some changes require a restart to take effect.","settings.restartNow":"Restart now","settings.restartStarting":"Restarting...","settings.restartUnavailable":"Restart from the web UI isn't available yet. Restart the gateway process manually to apply pending changes.","restart.title":"Restart IronClaw","restart.description":"Restart the gateway process to apply pending changes.","restart.warning":"Running tasks may be interrupted while the gateway restarts.","restart.cancel":"Cancel","restart.confirm":"Confirm restart","restart.progressTitle":"Restarting IronClaw","tee.title":"TEE Attestation","tee.verified":"Verified runtime attestation available","tee.imageDigest":"Image digest","tee.tlsFingerprint":"TLS certificate fingerprint","tee.reportData":"Report data","tee.vmConfig":"VM config","tee.loading":"Loading attestation report...","tee.loadFailed":"Could not load attestation report","tee.copyReport":"Copy report","tee.copied":"Copied","llm.active":"Active","llm.addProvider":"Add provider","llm.adapter":"Adapter","llm.apiKey":"API key","llm.apiKeyPlaceholder":"Leave blank to keep the stored key","llm.baseUrl":"Base URL","llm.baseUrlRequired":"Base URL is required.","llm.builtin":"Built-in","llm.configure":"Configure","llm.configureProvider":"Configure {name}","llm.configureToUse":"Configure this provider before activating it.","llm.confirmDelete":'Delete provider "{id}"?',"llm.defaultModel":"Default model","llm.editProvider":"Edit provider","llm.fetchModels":"Fetch models","llm.fetchingModels":"Fetching...","llm.fieldsRequired":"Display name and provider ID are required.","llm.idTaken":'Provider ID "{id}" is already used.',"llm.invalidId":"Use lowercase letters, numbers, hyphens, or underscores.","llm.model":"Model","llm.modelRequired":"A model is required.","llm.modelsFetched":"{count} models found.","llm.modelsFetchFailed":"No models were returned.","llm.newProvider":"New provider","llm.none":"None","llm.notConfigured":"Not configured","llm.providerActivated":"Switched to {name}.","llm.providerAdded":'Added provider "{name}".',"llm.providerConfigured":"Configured {name}.","llm.providerDeleted":"Provider deleted.","llm.providerId":"Provider ID","llm.providerName":"Display name","llm.providerUpdated":'Updated provider "{name}".',"llm.providers":"LLM providers","llm.providersDesc":"Manage built-in and custom inference providers.","onboarding.title":"Welcome to IronClaw","onboarding.subtitle":"Choose an AI provider to get started. You can change or add more later in Settings.","onboarding.setUp":"Set up","onboarding.signIn":"Sign in","onboarding.nearWallet":"NEAR Wallet","onboarding.ready":"Ready","onboarding.moreInSettings":"Need a different provider? Configure any of them in","onboarding.providerNearai":"NEAR AI","onboarding.providerNearaiDesc":"Free hosted models. Use an API key or SSO.","onboarding.providerCodex":"ChatGPT subscription","onboarding.providerCodexDesc":"Use your existing ChatGPT Plus or Pro plan.","onboarding.providerOpenai":"OpenAI API","onboarding.providerOpenaiDesc":"Bring your own OpenAI API key.","onboarding.providerAnthropic":"Anthropic API","onboarding.providerAnthropicDesc":"Bring your own Anthropic API key.","onboarding.providerOllama":"Local Ollama","onboarding.providerOllamaDesc":"Run open models locally. No API key needed.","onboarding.nearaiWaiting":"Waiting for NEAR AI sign-in in the opened tab\u2026","onboarding.nearaiTimeout":"NEAR AI sign-in timed out. Please try again.","onboarding.nearaiFailed":"NEAR AI sign-in failed. Please try again.","onboarding.nearaiLocalSso":"NEAR AI browser sign-in (GitHub, Google, NEAR Wallet) isn't supported on localhost \u2014 NEAR AI rejects local callback URLs. Add a NEAR AI API key instead, or run behind a public URL.","onboarding.codexSignIn":"Sign in with ChatGPT","onboarding.codexEnterCode":"Enter this code in the opened tab to authorize:","onboarding.codexWaiting":"Waiting for ChatGPT authorization in the opened tab\u2026","onboarding.codexTimeout":"ChatGPT sign-in timed out. Please try again.","onboarding.codexFailed":"ChatGPT sign-in failed. Please try again.","llm.testConnection":"Test connection","llm.testing":"Testing...","llm.use":"Use","llm.groupActive":"Active","llm.groupReady":"Ready to use","llm.groupSetup":"Needs setup","llm.expandDetails":"Show details","llm.collapseDetails":"Hide details","llm.missingApiKey":"Missing API key","llm.missingBaseUrl":"Missing base URL","llm.addApiKey":"Add API key","settings.group.embeddings":"Embeddings","settings.group.sampling":"Sampling","settings.field.embeddingsEnabled":"Enable embeddings","settings.field.embeddingsEnabledDesc":"Semantic search over workspace memory","settings.field.embeddingsProvider":"Provider","settings.field.embeddingsProviderDesc":"Embedding model provider","settings.field.embeddingsModel":"Model","settings.field.embeddingsModelDesc":"Embedding model identifier","settings.field.temperature":"Temperature","settings.field.temperatureDesc":"Default sampling temperature (0.0\u20132.0)","settings.group.core":"Core","settings.group.heartbeat":"Heartbeat","settings.group.sandbox":"Sandbox","settings.group.routines":"Routines","settings.group.safety":"Safety","settings.group.skills":"Skills","settings.group.search":"Search","settings.field.agentName":"Agent name","settings.field.agentNameDesc":"Display name for the assistant","settings.field.maxParallelJobs":"Max parallel jobs","settings.field.maxParallelJobsDesc":"Concurrent background job limit","settings.field.jobTimeout":"Job timeout","settings.field.jobTimeoutDesc":"Seconds before a job is marked stuck","settings.field.maxToolIterations":"Max tool iterations","settings.field.maxToolIterationsDesc":"Tool call limit per turn","settings.field.planning":"Planning","settings.field.planningDesc":"Enable multi-step planning before execution","settings.field.autoApproveTools":"Auto-approve tools","settings.field.autoApproveToolsDesc":"Skip approval for all tool calls","settings.field.timezone":"Timezone","settings.field.timezoneDesc":"IANA timezone for scheduled work","settings.field.sessionIdleTimeout":"Session idle timeout","settings.field.sessionIdleTimeoutDesc":"Seconds of inactivity before session ends","settings.field.stuckThreshold":"Stuck threshold","settings.field.stuckThresholdDesc":"Seconds before a job is considered stuck","settings.field.maxRepairAttempts":"Max repair attempts","settings.field.maxRepairAttemptsDesc":"Retry limit for stuck job recovery","settings.field.dailyCostLimit":"Daily cost limit (cents)","settings.field.dailyCostLimitDesc":"Maximum spend per day in cents","settings.field.actionsPerHour":"Actions per hour limit","settings.field.actionsPerHourDesc":"Hourly action rate cap","settings.field.allowLocalTools":"Allow local tools","settings.field.allowLocalToolsDesc":"Enable filesystem and shell access","settings.field.heartbeatEnabled":"Enable heartbeat","settings.field.heartbeatEnabledDesc":"Periodic proactive execution","settings.field.heartbeatInterval":"Interval","settings.field.heartbeatIntervalDesc":"Seconds between heartbeat runs","settings.field.heartbeatNotifyChannel":"Notify channel","settings.field.heartbeatNotifyChannelDesc":"Channel to send heartbeat notifications","settings.field.heartbeatNotifyUser":"Notify user","settings.field.heartbeatNotifyUserDesc":"User ID to notify on findings","settings.field.quietHoursStart":"Quiet hours start","settings.field.quietHoursStartDesc":"Hour (0\u201323) to begin suppression","settings.field.quietHoursEnd":"Quiet hours end","settings.field.quietHoursEndDesc":"Hour (0\u201323) to end suppression","settings.field.heartbeatTimezone":"Timezone","settings.field.heartbeatTimezoneDesc":"IANA timezone for quiet hours","settings.field.sandboxEnabled":"Enable sandbox","settings.field.sandboxEnabledDesc":"Docker-based tool execution","settings.field.sandboxPolicy":"Policy","settings.field.sandboxPolicyDesc":"Container filesystem access level","settings.field.sandboxTimeout":"Timeout","settings.field.sandboxTimeoutDesc":"Container execution time limit","settings.field.sandboxMemoryLimit":"Memory limit (MB)","settings.field.sandboxMemoryLimitDesc":"Container memory ceiling","settings.field.sandboxImage":"Docker image","settings.field.sandboxImageDesc":"Container image for sandbox runs","settings.field.routinesMaxConcurrent":"Max concurrent","settings.field.routinesMaxConcurrentDesc":"Parallel routine execution limit","settings.field.routinesDefaultCooldown":"Default cooldown","settings.field.routinesDefaultCooldownDesc":"Seconds between routine runs","settings.field.safetyMaxOutput":"Max output length","settings.field.safetyMaxOutputDesc":"Character limit on tool output","settings.field.safetyInjectionCheck":"Injection detection","settings.field.safetyInjectionCheckDesc":"Scan tool outputs for prompt injection","settings.field.skillsMaxActive":"Max active skills","settings.field.skillsMaxActiveDesc":"Concurrent skill attachment limit","settings.field.skillsMaxContextTokens":"Max context tokens","settings.field.skillsMaxContextTokensDesc":"Token budget for injected skill prompts","settings.field.fusionStrategy":"Fusion strategy","settings.field.fusionStrategyDesc":"Result merging method for hybrid search","settings.group.gateway":"Gateway","settings.group.tunnel":"Tunnel","settings.field.gatewayHost":"Host","settings.field.gatewayHostDesc":"Gateway bind address","settings.field.gatewayPort":"Port","settings.field.gatewayPortDesc":"Gateway listen port","settings.field.tunnelProvider":"Provider","settings.field.tunnelProviderDesc":"Public tunnel service","settings.field.tunnelPublicUrl":"Public URL","settings.field.tunnelPublicUrlDesc":"Static tunnel endpoint","channels.builtIn":"Built-in channels","channels.messaging":"Messaging channels","channels.availableChannels":"Available channels","channels.mcpServers":"MCP servers","channels.webGateway":"Web Gateway","channels.webGatewayDesc":"Browser-based chat with SSE streaming","channels.httpWebhook":"HTTP Webhook","channels.httpWebhookDesc":"Inbound webhook endpoint for external integrations","channels.cli":"CLI","channels.cliDesc":"Terminal interface with TUI or simple REPL","channels.repl":"REPL","channels.replDesc":"Minimal read-eval-print loop for testing","channels.slack":"Slack","channels.slackDesc":"Tenant app channel for DMs and app mentions","channels.slackDetail":"Tenant Slack app install","channels.statusOn":"on","channels.statusOff":"off","channels.ready":"ready","channels.authNeeded":"auth needed","channels.pairing":"pairing","channels.setup":"setup","channels.active":"active","channels.inactive":"inactive","channels.available":"available","channels.slackAccessTitle":"Slack team agents","channels.slackAccessInstructions":"Map Slack channels to the team agents that should answer there.","channels.slackAccessAdd":"Add","channels.slackAccessLoading":"Loading Slack channels...","channels.slackAccessEmpty":"No Slack channels allowed yet.","channels.slackAccessAllow":"Remove {channelId}","channels.slackAccessAutoSubject":"Auto-generated team subject","channels.slackAccessNoSubjects":"No team agents available","channels.slackAccessSave":"Save channels","channels.slackAccessSaving":"Saving...","channels.slackAccessSuccess":"Slack channels saved.","channels.slackAccessError":"Slack channel update failed.","tools.permissions":"Tool permissions","tools.alwaysAllow":"Always allow","tools.askEachTime":"Ask each time","tools.disabled":"Disabled","tools.default":"default","tools.saved":"saved","tools.permissionFor":"Permission for {name}","tools.filterPlaceholder":"Filter tools\u2026","tools.noMatch":"No tools match the filter.","tools.failedLoad":"Failed to load tools: {message}","skills.installed":"Installed skills","skills.group.user":"Your skills","skills.group.system":"System skills","skills.group.workspace":"Workspace skills","skills.source.user":"user","skills.source.installed":"installed","skills.source.system":"system","skills.source.workspace":"workspace","skills.noInstalled":"No skills installed","skills.noInstalledDesc":"Skills extend the agent with domain-specific instructions. Add a SKILL.md bundle or place SKILL.md files in your workspace.","skills.failedLoad":"Failed to load skills: {message}","skills.import":"Add skill","skills.importDesc":"Paste SKILL.md content to add a user-mounted skill.","skills.name":"Skill name","skills.namePlaceholder":"skill-name","skills.url":"HTTPS URL","skills.urlHint":"Use a direct HTTPS link to a SKILL.md or supported skill bundle.","skills.urlPlaceholder":"https://example.com/SKILL.md","skills.httpsRequired":"URL must use HTTPS.","skills.importSourceRequired":"Provide an HTTPS URL or SKILL.md content.","skills.content":"SKILL.md content","skills.contentHint":"Use the full SKILL.md frontmatter and prompt content.","skills.contentPlaceholder":"---\\nname: example\\ndescription: ...\\n---\\n","skills.install":"Add","skills.installing":"Adding...","skills.installFailed":"Add failed.","skills.installedSuccess":'Added skill "{name}"',"skills.nameRequired":"Skill name is required.","skills.contentRequired":"SKILL.md content is required.","skills.remove":"Remove","skills.delete":"Delete","skills.edit":"Edit","skills.loading":"Loading...","skills.save":"Save","skills.saving":"Saving...","skills.cancel":"Cancel","skills.confirmRemove":'Remove skill "{name}"?',"skills.confirmDelete":'Delete skill "{name}"?',"skills.removeFailed":"Remove failed.","skills.removed":'Removed skill "{name}"',"skills.contentLoadFailed":"Failed to load SKILL.md content.","skills.updateFailed":"Update failed.","skills.updated":'Updated skill "{name}"',"skills.activatesOn":"Activates on","skills.imported":"imported","users.title":"Users ({count})","users.addUser":"Add user","users.newUser":"New user","users.displayName":"Display name","users.email":"Email","users.role":"Role","users.member":"Member","users.admin":"Admin","users.createUser":"Create user","users.creating":"Creating\u2026","users.cancel":"Cancel","users.adminRequired":"Admin access required","users.adminRequiredDesc":"User management is only available to accounts with admin privileges.","users.failedLoad":"Failed to load users: {message}","users.noUsers":"No users registered.","workspace.title":"Workspace","workspace.subtitle":"Memory, files & attachments","workspace.readOnly":"Read-only","workspace.filterPlaceholder":"Filter by name\u2026","workspace.emptyDir":"This folder is empty.","workspace.refresh":"Refresh","workspace.refreshing":"Refreshing","workspace.loading":"Loading...","workspace.noFiles":"No files here.","workspace.noMatches":"Nothing matches that filter.","workspace.breadcrumbRoot":"workspace","workspace.pickFileTitle":"Pick a file","workspace.pickFileDesc":"Choose a file from the tree to preview or download it. This viewer is read-only.","workspace.parent":"Parent: {path}","workspace.download":"Download","workspace.binaryPreviewUnavailable":"No inline preview for this file type. Download it to view the contents.","workspace.fileMeta":"{mime} \xB7 {size} bytes","workspace.unableOpenDirectory":"Unable to open directory","jobs.allJobs":"All jobs","jobs.refresh":"Refresh","jobs.refreshing":"Refreshing","jobs.unavailable":"Job unavailable","jobs.unavailableDesc":"This job no longer exists or is outside your access scope.","jobs.returnToJobs":"Return to jobs","jobs.dismiss":"Dismiss","jobs.list.explorer":"Explorer","jobs.list.queueTitle":"Job queue","jobs.list.queueDesc":"Search by title or ID, jump into a run, and stop active work without leaving the page.","jobs.list.visible":"{count} visible","jobs.list.state.live":"live","jobs.list.state.refreshing":"refreshing","jobs.list.searchPlaceholder":"Search job title or UUID","jobs.list.empty.noMatchTitle":"No jobs match the current filters","jobs.list.empty.noMatchDesc":"Try a broader search term or reset the state filter to see the rest of the queue.","jobs.list.empty.noJobsTitle":"No jobs yet","jobs.list.empty.noJobsDesc":"Background work, sandbox runs, and operator interventions will appear here once the gateway starts creating jobs.","jobs.list.filter.all":"All states","jobs.list.filter.pending":"Pending","jobs.list.filter.inProgress":"In progress","jobs.list.filter.completed":"Completed","jobs.list.filter.failed":"Failed","jobs.list.filter.stuck":"Stuck","jobs.list.untitled":"Untitled job","jobs.list.created":"created {value}","jobs.list.started":"started {value}","jobs.action.cancel":"Cancel","jobs.action.open":"Open","jobs.detail.backToAll":"Back to all jobs","jobs.detail.tabs.overview":"Overview","jobs.detail.tabs.activity":"Activity","jobs.detail.tabs.files":"Files","missions.allMissions":"All missions","missions.refresh":"Refresh","missions.refreshing":"Refreshing","missions.title":"Missions","missions.subtitle":"Execution loops","missions.summary":"{missions} missions across {projects} project workspaces.","missions.searchPlaceholder":"Search missions","missions.filter.status":"Status","missions.filter.project":"Project","missions.filter.allStatuses":"All statuses","missions.filter.allProjects":"All projects","missions.status.active":"Active","missions.status.paused":"Paused","missions.status.failed":"Failed","missions.status.completed":"Completed","missions.noGoal":"No mission goal set.","missions.threadCount":"{count} threads","missions.updated":"Updated {value}","missions.emptyTitle":"No missions match","missions.emptyDesc":"Adjust the search or filters to find a mission loop.","missions.unavailable":"Mission unavailable","missions.unavailableDesc":"This mission no longer exists or is outside your access scope.","missions.dossier":"Mission dossier","missions.meta.cadence":"Cadence","missions.meta.manual":"manual","missions.meta.threadsToday":"Threads today","missions.meta.unlimited":"unlimited","missions.meta.nextFire":"Next fire","missions.meta.updated":"Updated","missions.action.fireNow":"Fire now","missions.action.pause":"Pause","missions.action.resume":"Resume","missions.action.runOnce":"Run once","missions.action.runAgain":"Run again","missions.brief":"Brief","missions.currentFocus":"Current focus","missions.successCriteria":"Success criteria","missions.spawnedThreads":"Spawned threads","missions.summary.totalMissions":"Total missions","missions.summary.active":"Active","missions.summary.paused":"Paused","missions.summary.spawnedThreads":"Spawned threads","missions.summary.completedFailed":"{completed} completed / {failed} failed","missions.summary.acrossProjects":"Across every project workspace","automations.eyebrow":"Scheduled work","automations.title":"Automations","automations.description":"Scheduled automations only.","automations.filterLabel":"Automation status filter","automations.filter.all":"All","automations.filter.active":"Active","automations.filter.running":"Running","automations.filter.failures":"Failures","automations.filter.paused":"Paused","automations.refresh":"Refresh automations","automations.error.loadFailed":"Unable to load automations","automations.schedulerOff.title":"Scheduling is turned off","automations.schedulerOff.description":"These automations are saved but won't run until the scheduler is enabled.","automations.schedule.custom":"Custom schedule","automations.schedule.everyMinute":"Every minute","automations.schedule.everyMinutes":"Every {count} minutes","automations.schedule.hourlyAt":"Hourly at :{minute}","automations.schedule.everyDayAt":"Every day at {time}","automations.schedule.weekdaysAt":"Weekdays at {time}","automations.schedule.weekdayAt":"{weekday} at {time}","automations.schedule.monthlyAt":"Day {day} of each month at {time}","automations.schedule.dateAt":"{date} at {time}","automations.badge.muted":"Muted","automations.badge.signal":"Signal","automations.badge.info":"Info","automations.badge.danger":"Danger","automations.badge.success":"Success","automations.state.active":"Active","automations.state.scheduled":"Scheduled","automations.state.paused":"Paused","automations.state.disabled":"Disabled","automations.state.inactive":"Inactive","automations.state.completed":"Completed","automations.state.unknown":"Unknown","automations.lastStatus.done":"Done","automations.lastStatus.error":"Error","automations.lastStatus.running":"Running","automations.lastStatus.none":"No result","automations.runStatus.ok":"OK","automations.runStatus.error":"Error","automations.runStatus.running":"Running","automations.runStatus.unknown":"Unknown","automations.date.unknown":"Unknown","automations.date.notScheduled":"Not scheduled","automations.date.noRuns":"No runs yet","automations.date.unscheduled":"Unscheduled","automations.date.notSubmitted":"Not submitted","automations.date.notCompleted":"Not completed","automations.untitled":"Untitled automation","automations.successRate.none":"No completed runs","automations.successRate.visible":"{percent}% visible runs","automations.delivery.eyebrow":"Delivery defaults","automations.delivery.title":"Where triggered results are sent","automations.delivery.explainer":"Choose where automation results are delivered when a triggered run finishes.","automations.delivery.currentDefault":"Current default","automations.delivery.changeTarget":"Change target","automations.delivery.availableTargets":"Available targets","automations.delivery.none":"None","automations.delivery.webOption":"Web app only (no external delivery)","automations.delivery.webOptionDesc":"Results are stored in the run history. No DM or notification is sent.","automations.delivery.unpairedNotice":"Slack DM \u2014 not available","automations.delivery.unpairedDesc":"Pair your Slack account to enable DM delivery.","automations.delivery.save":"Save","automations.delivery.clear":"Clear","automations.delivery.saved":"Saved","automations.delivery.saveFailed":"Couldn't save the delivery target. Please try again.","automations.delivery.footnote":"Approval requests sent to your DM are answered by replying {command} in Slack.","automations.delivery.pill.ready":"Ready","automations.delivery.pill.unavailable":"Unavailable","automations.delivery.pill.notSet":"Not set","automations.delivery.pill.notPaired":"Not paired","automations.delivery.pill.fallback":"Fallback","automations.summary.scheduled":"Scheduled","automations.summary.scheduledDetail":"Scheduled automations visible to this agent.","automations.summary.active":"Active","automations.summary.activeDetail":"Enabled schedules waiting for their next run.","automations.summary.paused":"Paused","automations.summary.pausedDetail":"Schedules not currently expected to run.","automations.summary.running":"Running now","automations.summary.runningDetail":"Automations with a run in progress.","automations.summary.failures":"Failures","automations.summary.failuresDetail":"Automations with a failed run in recent history.","automations.summary.filterAction":"Show {label}","automations.summary.nextRun":"Next run","automations.summary.none":"None","automations.summary.nextRunDetail":"Soonest scheduled run in this list.","automations.empty.matchingTitle":"No matching automations","automations.empty.matchingDescription":"Try a different status filter.","automations.empty.noneTitle":"No scheduled automations yet.","automations.empty.noneDescription":"This agent has no scheduled work to show.","automations.empty.onboardingTitle":"No automations yet","automations.empty.onboardingDescription":"Automations are created by chatting with your agent \u2014 there's no form to fill out. Ask it to do something on a schedule and it will set up a recurring automation for you.","automations.empty.examplesTitle":"Try asking your agent","automations.empty.example1":"Check the nearai/ironclaw repo every 10 minutes and summarize new issues, PRs, and commits.","automations.empty.example2":"Every weekday at 9am, send me a summary of my unread email.","automations.empty.example3":"Remind me to review open pull requests every afternoon at 3pm.","automations.empty.startInChat":"Start in chat","automations.empty.copyPrompt":"Copy prompt","automations.empty.copied":"Copied","automations.refreshing":"Refreshing\u2026","automations.table.name":"Name","automations.table.schedule":"Schedule","automations.table.nextRun":"Next run","automations.table.lastRun":"Last run","automations.table.recentRuns":"Recent runs","automations.table.noRuns":"No runs","automations.table.status":"Status","automations.runs.total":"Recent runs: {count}","automations.runs.ok":"OK: {count}","automations.runs.error":"Failed: {count}","automations.runs.running":"Running: {count}","automations.runs.unknown":"Unknown: {count}","automations.runs.showingOf":"Showing {shown} of {total} recent runs","automations.status.running":"Running","automations.status.needsReview":"Needs review","automations.detail.emptyTitle":"Select an automation","automations.detail.emptyDescription":"Choose a schedule to inspect recent runs.","automations.detail.schedule":"Schedule","automations.detail.successRate":"Success rate","automations.detail.lastCompleted":"Last completed","automations.detail.currentRun":"Current run","automations.detail.noCurrentRun":"No active run","automations.detail.recentRuns":"Recent runs","automations.detail.noRuns":"This automation has not produced any visible runs yet.","automations.detail.openRun":"Open run","automations.detail.thread":"thread","automations.detail.run":"run","automations.detail.noThread":"No thread attached","routines.explorer":"Tasks","routines.title":"Routines","routines.description":"Search saved routines, inspect their schedule or trigger, and run or pause them without leaving v2.","ext.installed":"Installed","ext.channels":"Channels","ext.mcp":"MCP","ext.registry":"Registry","ext.registry.searchPlaceholder":"Search extensions\u2026","ext.registry.emptyTitle":"Registry is empty","ext.registry.emptyDesc":"All available extensions are already installed, or no registry is configured.","ext.registry.availableTitle":"Available extensions","ext.registry.noMatch":"No extensions match the filter.","chat.history.loading":"Loading...","chat.history.loadOlder":"Load older messages","projects.allProjects":"All projects","projects.returnToProjects":"Return to projects","projects.unavailable":"Project unavailable","projects.unavailableDesc":"This project no longer exists or is outside your access scope.","projects.refresh":"Refresh","projects.refreshing":"Refreshing","projects.newProject":"New project","projects.preparingChat":"Preparing chat...","projects.createFromChat":"Create from chat","projects.startProject":"Start a project","projects.searchPlaceholder":"Search projects","projects.creationDraft":"Create a new project for me. I want to set up a project for: ","projects.chatAutoFail":"Unable to prepare chat automatically. Opening chat anyway.","projects.openWorkspace":"Open project","projects.openGeneralWorkspace":"Open project","projects.noDescription":"No project description yet. The project is still being shaped by recent activity and thread history.","projects.general.label":"General project","projects.general.title":"Default project control room","projects.general.desc":"Shared context, ad hoc work, and the catch-all runtime path for threads that are not yet promoted into a named project.","projects.scoped.title":"Scoped projects","projects.scoped.desc":"Browse durable workspaces, inspect missions, review recent activity, and jump into the project that needs you now.","projects.scoped.onlyGeneralTitle":"Only the general workspace is active","projects.scoped.onlyGeneralDesc":"Create a named project when work deserves its own missions, files, widgets, and long-running context.","projects.empty.noMatchTitle":"No projects match the current search","projects.empty.noMatchDesc":"Try a broader search term or clear the filter to return to the full workspace map.","projects.empty.noneTitle":"No projects yet","projects.empty.noneDesc":"Projects appear once the assistant creates durable workspaces. You can start from chat and ask IronClaw to spin up a scoped project for ongoing work.","projects.card.runtime":"Runtime","projects.card.risk":"Risk","projects.card.threadsToday":"{count} today","projects.card.failures24h":"{count} in 24h","projects.card.spendToday":"{value} spend today","projects.explorer":"Explorer","lang.title":"Language","lang.description":"Choose the display language for the interface.","lang.current":"Current language","inference.provider":"LLM provider","inference.backend":"Backend","inference.model":"Model","inference.active":"active","inference.none":"\u2014","pairing.title":"Pairing","pairing.instructions":"Enter the code from the channel to finish pairing.","pairing.placeholder":"Enter pairing code\u2026","pairing.approve":"Approve","pairing.success":"Pairing complete.","pairing.error":"Pairing failed.","pairing.none":"No pending pairing requests.","pairing.slackTitle":"Slack account connection","pairing.slackInstructions":"Message the Slack app, then enter the code here.","pairing.slackPlaceholder":"Enter Slack pairing code\u2026","pairing.connect":"Connect","pairing.slackSuccess":"Slack account connected.","pairing.slackError":"Invalid or expired Slack pairing code.","admin.tab.dashboard":"Dashboard","admin.tab.users":"Users","admin.tab.usage":"Usage","admin.dashboard.systemOverview":"System overview","admin.dashboard.uptime":"Uptime: {value}","admin.dashboard.totalUsers":"Total users","admin.dashboard.activeUsers":"Active users","admin.dashboard.suspended":"Suspended","admin.dashboard.admins":"Admins","admin.dashboard.usage30d":"30-day usage","admin.dashboard.totalJobs":"Total jobs","admin.dashboard.activeJobs":"Active jobs","admin.dashboard.llmCalls":"LLM calls","admin.dashboard.totalCost":"Total cost","admin.dashboard.recentUsers":"Recent users","admin.dashboard.viewAll":"View all","admin.dashboard.noUsers":"No users yet.","admin.dashboard.name":"Name","admin.dashboard.role":"Role","admin.dashboard.status":"Status","admin.dashboard.jobs":"Jobs","admin.dashboard.lastActive":"Last active","admin.users.user":"user","admin.users.userFallback":"user","admin.users.title":"Users ({count} / {total})","admin.users.searchPlaceholder":"Search\u2026","admin.users.noMatch":"No users match the current filters.","admin.users.filter.all":"All","admin.users.filter.active":"Active","admin.users.filter.suspended":"Suspended","admin.users.filter.admins":"Admins","admin.users.newUser":"New user","admin.users.createUser":"Create user","admin.users.creating":"Creating\u2026","admin.users.cancel":"Cancel","admin.users.displayName":"Display name","admin.users.displayNamePlaceholder":"Jane Doe","admin.users.email":"Email","admin.users.emailPlaceholder":"jane@example.com","admin.users.role":"Role","admin.users.member":"Member","admin.users.admin":"Admin","admin.users.suspend":"Suspend","admin.users.activate":"Activate","admin.users.promote":"Promote","admin.users.demote":"Demote","admin.users.token":"Token","admin.users.jobsCount":"{count} jobs","admin.users.suspendTitle":"Suspend user","admin.users.suspendDesc":"This will prevent the user from authenticating. Continue?","admin.users.tokenNamePrompt":"Token name for {name}:","admin.users.tokenCreated":"Token created","admin.users.tokenCreatedDesc":"Copy this now \u2014 it will not be shown again.","admin.users.copy":"Copy","admin.users.copied":"Copied","admin.users.backToUsers":"Back to users","admin.users.createToken":"Create token","admin.users.delete":"Delete","admin.users.deleteUserTitle":"Delete user","admin.users.deleteUserDesc":'Are you sure you want to delete "{name}"? This action cannot be undone.',"admin.user.profile":"Profile","admin.user.summary":"Summary","admin.user.id":"ID","admin.user.email":"Email","admin.user.created":"Created","admin.user.lastLogin":"Last login","admin.user.createdBy":"Created by","admin.user.notSet":"Not set","admin.user.jobs":"Jobs","admin.user.totalCost":"Total cost","admin.user.lastActive":"Last active","admin.user.roleManagement":"Role management","admin.user.currentRole":"Current role","admin.user.saveRole":"Save role","admin.user.usage30Days":"Usage (last 30 days)","admin.user.noUsage":"No usage data.","admin.usage.overview":"Usage overview","admin.usage.noData":"No usage data for this period.","admin.usage.totalCalls":"Total calls","admin.usage.inputTokens":"Input tokens","admin.usage.outputTokens":"Output tokens","admin.usage.totalCost":"Total cost","admin.usage.perUser":"Per-user breakdown","admin.usage.perModel":"Per-model breakdown","admin.usage.user":"User","admin.usage.model":"Model","admin.usage.calls":"Calls","admin.usage.input":"Input","admin.usage.output":"Output","admin.usage.cost":"Cost","logs.levelAll":"All levels","logs.level.trace":"TRACE","logs.level.debug":"DEBUG","logs.level.info":"INFO","logs.level.warn":"WARN","logs.level.error":"ERROR","logs.filterTarget":"Filter by target\u2026","logs.autoScroll":"Auto-scroll","logs.pause":"Pause","logs.resume":"Resume","logs.clear":"Clear","logs.confirmClear":"Clear all log entries?","logs.scoped":"Scoped logs","logs.scope.thread":"Thread","logs.scope.run":"Run","logs.scope.turn":"Turn","logs.scope.toolCall":"Tool call","logs.scope.tool":"Tool","logs.scope.source":"Source","logs.clearScope":"Clear scope","logs.serverLevel":"Server level:","logs.entryCount":"{count} entries","logs.pausedBadge":"\u25CF paused","logs.empty":"Waiting for log entries\u2026","common.recent":"Recent","common.searchChats":"Search chats...","common.gatewaySession":"Gateway session","common.pinned":"Pinned","common.deleteChat":"Delete chat","chat.deleteFailed":"Couldn't delete this conversation.","chat.deleteBusy":"Can't delete a conversation while it's still running. Stop it first, then try again.","command.placeholder":"Type a command or search...","routine.searchPlaceholder":"Search routine name, trigger, or action","routine.unavailable":"Routine unavailable","routine.unavailableDesc":"This routine no longer exists or is outside your access scope.","routine.triggerPayload":"Trigger payload","routine.actionPayload":"Action payload","job.noWorkspace":"No project workspace","job.noFile":"No file selected","job.noActivityTitle":"No activity captured yet","job.noActivityDesc":"This job has not written any persisted events for the selected filter.","job.noStateTitle":"No state history yet","job.followupPlaceholder":"Send a follow-up prompt to the running job","common.noChatsMatch":'No chats match "{query}"',"extensions.configure":"Configure","extensions.reconfigure":"Reconfigure","extensions.configureName":"Configure {name}","extensions.allInstalled":"All installed extensions","mcp.installed":"Installed MCP servers","extensions.oneCapability":"1 capability","extensions.pluralCapabilities":"{count} capabilities","extensions.oneKeyword":"1 keyword","extensions.pluralKeywords":"{count} keywords","extensions.moreActions":"More actions","extensions.kind.wasm_tool":"WASM Tool","extensions.kind.wasm_channel":"Channel","extensions.kind.channel":"Channel","extensions.kind.mcp_server":"MCP Server","extensions.kind.first_party":"First-party","extensions.kind.system":"System","extensions.kind.channel_relay":"Relay","extensions.state.active":"active","extensions.state.ready":"ready","extensions.state.pairing_required":"pairing","extensions.state.pairing":"pairing","extensions.state.auth_required":"auth needed","extensions.state.setup_required":"setup needed","extensions.state.failed":"failed","extensions.state.installed":"installed","extensions.state.available":"available","extensions.loadFailed":"Failed to load setup:","extensions.noConfigRequired":"No configuration required for this extension.","common.optional":"optional","common.configured":"configured","extensions.autoGenerated":"Auto-generated if left blank","extensions.activeConfigured":"Extension is active.","extensions.authConfigured":"Authorization is configured.","extensions.authPopup":"Authorize this provider in a browser popup.","extensions.opening":"Opening...","extensions.authorize":"Authorize","extensions.reauthorize":"Reauthorize","extensions.reconnect":"Reconnect","extensions.emptyInstalledTitle":"No extensions installed","extensions.emptyInstalledDesc":"Browse the Registry tab to discover and install WASM tools, channels, and MCP servers.","extensions.emptyMcpTitle":"No MCP servers","extensions.emptyMcpDesc":"MCP servers extend the agent with additional tool capabilities over the Model Context Protocol. Install them from the registry.","common.dismiss":"Dismiss","common.pin":"Pin","common.unpin":"Unpin","common.remove":"Remove"});(0,PR.createRoot)(document.getElementById("v2-root")).render(l`
  <${Oh}>
    <${yd} client=${At}>
      <${LR} />
    <//>
  <//>
`);
