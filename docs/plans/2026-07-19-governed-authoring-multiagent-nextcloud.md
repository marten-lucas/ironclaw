# Governed Authoring, Multiagent and Nextcloud Talk Concept

**Status:** Konzept + Umsetzungsgrundlage
**Ziel:** Eine getrennte, governte Authoring-Schicht für IronClaw/Reborn, die Identity, Memory, Skills, Agenten, Modellprofile, Tool-Policies und Channel-Konfiguration bearbeitbar macht, ohne den Reborn-Workspace-Viewer zu einem generischen Dateieditor umzubauen.

## 1. Problem und Leitentscheidung

Der Reborn-Workspace ist heute bewusst read-only. Das ist für Inspection und Download sinnvoll, aber nicht für echte Pflege von Identity, Memory, Skills, Agenten und Channel-Regeln. Wenn später harte Tool-Regeln wirklich greifen sollen, reicht Prompttext nicht aus. Dafür braucht IronClaw eine explizite Authoring- und Policy-Schicht mit prüfbaren Entitäten, klaren UI-Routen und einer Ausführungslogik, die vor Modellaufruf und vor Toolausführung validiert.

Leitentscheidung: Der bestehende Reborn-Workspace bleibt Inspector. Bearbeitung findet in einer separaten, domainorientierten Authoring-Oberfläche statt.

## 2. Übernommene Anforderungen aus der Architekturvorgabe

- Modellzugriffe laufen über Profile statt über konkrete Modellnamen.
- Profile wie `default`, `coding` und `vision` werden zentral auf Ollama-Modelle gemappt.
- Die Zuordnung ist über die Channel- oder System-Konfiguration editierbar.
- Autonome Agenten werden beim Start oder bei Delegation über ihr Profil auf ein konkretes Modell geroutet.
- Nextcloud Talk läuft als Fake-User ohne externe Middleware.
- Der Channel akzeptiert nur Webhooks, wenn der Bot erwähnt wird.
- Die Antwort wird direkt per REST an Nextcloud gesendet.
- Credentials und Basis-URL werden ausschließlich über die UI konfiguriert.
- Der Channel bleibt asynchron und quittiert Webhooks sofort.
- Optionaler Vision-/Attachment-Pfad ist später vorbereitbar.

## 3. Fachliches Zielbild

IronClaw erhält eine verteilte, aber fachlich einheitliche Konfigurations- und Authoring-Oberfläche für vier Ebenen:

1. **Identität**: Wer spricht das System oder ein Agent im Ton, Rollenbild und Organisationskontext an?
2. **Wissen**: Welche Memory-Einträge, Richtlinien und Kontextfragmente gelten?
3. **Fähigkeiten**: Welche Skills sind vorhanden, aktiv, versioniert und zuordenbar?
4. **Ausführung**: Welche Agenten existieren, mit welchen Default-Profilen, Tool-Rechten und Channels?

Darüber liegt eine Policy-Schicht, die vor Delegation, Toolausführung und Channel-Egress entscheidet, ob eine Aktion erlaubt ist.

## 4. Fachliches Datenmodell

### 4.1 Kernentitäten

```text
Agent
  - agent_id
  - name
  - display_name
  - role
  - status
  - default_profile_id
  - allowed_tool_sets
  - allowed_channel_ids
  - memory_scope
  - skill_bindings
  - policy_binding_id
  - created_at
  - updated_at

AgentProfile
  - profile_id
  - name
  - purpose
  - prompt_overlay
  - required_capabilities
  - default_model_profile_id
  - created_at
  - updated_at

ModelProfile
  - model_profile_id
  - name                 // default, coding, vision
  - ollama_model_name
  - temperature
  - top_p
  - max_context_tokens
  - created_at
  - updated_at

ChannelConfig
  - channel_id
  - channel_type         // nextcloud-talk, future-channel, ...
  - name
  - base_url
  - bot_username
  - app_password_secret_ref
  - webhook_path
  - model_profile_map
  - mention_filter_mode
  - enabled
  - created_at
  - updated_at

ToolPolicy
  - policy_id
  - name
  - scope                // global, channel, agent, profile
  - allow_rules
  - deny_rules
  - escalation_rules
  - created_at
  - updated_at

Skill
  - skill_id
  - name
  - version
  - source
  - trusted
  - status
  - prompt_module
  - constraints
  - created_at
  - updated_at

MemoryItem
  - memory_id
  - scope                // identity, project, agent, global
  - owner_id
  - title
  - content
  - tags
  - visibility
  - version
  - created_at
  - updated_at

IdentityDocument
  - identity_id
  - subject_type         // system, agent, user, channel
  - subject_id
  - tone
  - role_description
  - organization_context
  - constraints
  - created_at
  - updated_at

DelegationTask
  - task_id
  - source_agent_id
  - target_agent_id
  - requested_profile_id
  - resolved_model_profile_id
  - channel_id
  - prompt
  - status
  - created_at
  - updated_at

ChannelEvent
  - event_id
  - channel_id
  - external_message_id
  - room_token
  - sender
  - mention_detected
  - payload
  - processing_state
  - reply_message_id
  - created_at
  - updated_at

AuditEntry
  - audit_id
  - actor_id
  - entity_type
  - entity_id
  - action
  - before_snapshot
  - after_snapshot
  - created_at
```

### 4.2 Modellauflösung

Der Router löst nie direkt ein Ollama-Modell aus dem Request ab, sondern immer ein Profil.

```text
requested_profile -> channel/profile lookup -> resolved_model_profile -> ollama_model_name
```

Fallback-Regel:
- Wenn ein Profil fehlt, wird `default` verwendet.
- Wenn `default` fehlt, ist die Konfiguration invalid und die Anfrage wird abgelehnt.

### 4.3 Policy-Prinzip

Toolregeln werden zweistufig bewertet:

1. **Deklarativ**: Skills, Profile und Channel erlauben oder verlangen Fähigkeiten.
2. **Enforcement**: ToolPolicy prüft zur Laufzeit, ob Delegation, Toolausführung und Egress erlaubt sind.

Das ist absichtlich strenger als reine Promptanweisungen. Wenn eine Regel kritisch ist, muss sie im Policy-Layer stehen.

## 5. UI-Struktur

### 5.1 Navigation

- Dashboard
- Identity
- Memory
- Skills
- Agents
- Model Profiles
- Tool Policies
- Channels
- Delegations
- Audit
- Reborn Workspace Viewer

### 5.2 Seiten und Funktionen

**Dashboard**
- Überblick über aktive Agenten, offene Delegationen, Channel-Zustände und Policy-Warnungen.

**Identity**
- Bearbeiten von Systemidentität, Agententönen, Organisationskontext, Namensgebung und Rollen.

**Memory**
- Strukturiertes Erstellen, Bearbeiten, Versionieren und Freigeben von Memory-Einträgen.

**Skills**
- Skills listen, aktivieren, deaktivieren, versionieren und Agenten zuordnen.

**Agents**
- Agenten anlegen, umbennen, deaktivieren, Rollen vergeben, Default-Profile setzen, Tools und Skills binden.

**Model Profiles**
- Profile definieren und auf konkrete Ollama-Modelle mappen.

**Tool Policies**
- Regeln für erlaubte und verbotene Aktionen bearbeiten.

**Channels**
- Nextcloud Talk und spätere Kanäle konfigurieren: URL, Credentials, Webhook, Mention-Verhalten, Egress.

**Delegations**
- Aufträge zwischen Agenten mit Profil, Ziel und Policy-Kontext sichtbar machen.

**Audit**
- Änderungsverlauf mit Diff und Actor sichtbar machen.

**Reborn Workspace Viewer**
- Read-only Inspector für technische Artefakte, Speicherorte und Downloads.

## 6. Review der Architekturvorgabe

### 6.1 Direkt übernommen

- Profile statt Modellnamen.
- Zentrale Mapping-Tabelle Profile -> Ollama-Modell.
- Dynamisches Routing bei Delegation.
- Nextcloud Fake-User mit Mention-Filter und REST-Egress.
- Keine externe Middleware.
- Vollständig UI-konfigurierbare Credentials.
- Asynchroner Webhook-Eingang.

### 6.2 Fachlich präzisiert

- Modellprofile sind nicht nur Channel-Konfig, sondern eine allgemeine Ausführungsressource, die Channel, Agenten und Delegationen gemeinsam nutzen.
- Agenten besitzen ein Default-Profil, aber Delegationen können ein eigenes Profil anfordern.
- Skills sind nicht nur Textbausteine, sondern versionierte Capability-Module mit Bindung an Policies und Agenten.
- Harte Toolregeln gehören in eine Policy-Schicht, nicht nur in Prompts.
- Secret-Werte werden nicht direkt gespeichert, sondern über Secret-Referenzen gebunden.

### 6.3 Nicht 1:1 übernommen

- Konkrete Rust-Snippets aus der Vorgabe werden nicht als API-Festlegung betrachtet, sondern als Beispiel für die spätere Implementierung.
- Die Channel-Konfig enthält das Modellmapping, aber die globale Modellprofil-Verwaltung bleibt als eigene UI- und Domain-Ebene sichtbar.

## 7. Epics

### Epic A: Governed Authoring Layer

Ziel: Eine editierbare, versionierte Authoring-Schicht für Identity, Memory, Skills, Policies und Agenten.

**Ergebnis:** Der Benutzer kann Systemkontext kontrolliert pflegen, ohne den read-only Workspace-Viewer zu missbrauchen.

### Epic B: Model Profile Routing

Ziel: Agenten und Channels arbeiten mit Profilen, nicht mit harten Modellnamen.

**Ergebnis:** Default-, Coding- und Vision-Profile können zentral definiert und auf Ollama-Modelle geroutet werden.

### Epic C: Managed Multiagent Roster

Ziel: Der CEO kann weitere Agenten einstellen, Rollen vergeben und Default-Profile setzen.

**Ergebnis:** Delegationen, Zuständigkeiten und Rechte sind sichtbar und auditierbar.

### Epic D: Tool Policy Enforcement

Ziel: Harte Toolregeln werden vor Ausführung geprüft.

**Ergebnis:** Kritische Regeln greifen zuverlässig auch dann, wenn Prompts unklar oder manipuliert sind.

### Epic E: Nextcloud Talk Fake-User Channel

Ziel: IronClaw reagiert als normaler Nextcloud-Benutzer auf Mentions und sendet Antworten direkt an Talk zurück.

**Ergebnis:** Ein voll UI-konfigurierbarer, asynchroner Channel ohne externe Middleware.

### Epic F: Audit and Change Safety

Ziel: Änderungen an Agenten, Policies, Skills und Channels sind nachvollziehbar und rollbar.

**Ergebnis:** Die Authoring-Schicht bleibt operativ beherrschbar.

## 8. Tickets

### Epic A Tickets

1. Definiere die Domain-Records für IdentityDocument, MemoryItem, Skill und ToolPolicy.
2. Baue CRUD-APIs für die Authoring-Entitäten.
3. Implementiere Versionierung und Audit-Entries für jede Mutation.
4. Erstelle die Identity-, Memory- und Skill-Editorseiten.
5. Binde den read-only Workspace-Viewer als Inspector ein.

### Epic B Tickets

1. Führe ModelProfile als eigene Entität ein.
2. Implementiere die Profile-zu-Modell-Auflösung mit Default-Fallback.
3. Ergänze die UI für Profile und Ollama-Mapping.
4. Stelle sicher, dass Agenten und Channels Profile anfordern können.
5. Verifiziere, dass ein fehlendes Profil zu einem kontrollierten Fehler führt.

### Epic C Tickets

1. Definiere Agent mit Default-Profil, Rollenbeschreibung und Policy-Bindung.
2. Implementiere die Agenten-Verwaltung im Dashboard.
3. Erlaube dem CEO das Anlegen, Umbenennen und Deaktivieren von Agenten.
4. Implementiere DelegationTask für Agent-zu-Agent-Aufträge.
5. Zeige offene Delegationen und ihre Profilauflösung in der UI.

### Epic D Tickets

1. Definiere die Policy-DSL oder Policy-Struktur für erlaubte und verbotene Aktionen.
2. Prüfe Toolzugriffe vor jeder Ausführung.
3. Prüfe Channel-Egress gegen Channel- und Agent-Policies.
4. Sperre Delegationen, die das Zielprofil oder die Zielaktion nicht abdecken.
5. Baue Tests für erlaubte, verweigerte und eskalierte Fälle.

### Epic E Tickets

1. Baue den Nextcloud-Webhook-Ingress mit Mention-Filter.
2. Entferne den Mention-String aus der Nutzlast vor der Modellanfrage.
3. Sende Antworten per REST an die Talk-API mit OCS-Headern.
4. Konfiguriere Nextcloud-URL, Bot-Username und App-Passwort ausschließlich über die UI.
5. Stelle asynchrone Verarbeitung und sofortiges HTTP-200-Ack sicher.
6. Ergänze später einen optionalen Attachment-/Vision-Pfad.

### Epic F Tickets

1. Logge alle Änderungen an Authoring-Entitäten als AuditEntry.
2. Baue Diff-Ansichten für Änderungen an Policies, Skills, Profiles und Agenten.
3. Ergänze Rollback- oder Revert-Mechanismen für kritische Konfigurationen.
4. Ergänze Validierungsregeln für ungültige Zustände in der UI.

## 9. Kompakte Implementierungs-Spezifikation

### 9.1 Domänengrenzen

- **Authoring Domain**: Identity, Memory, Skills, Policies, Agents, Model Profiles.
- **Execution Domain**: Delegation, Routing, Channel Processing, Tool Enforcement.
- **Channel Domain**: Nextcloud Talk Ingress/Egress, Mention-Filter, Credentials, Async Job Handling.
- **Audit Domain**: Änderungsprotokoll und Nachvollziehbarkeit.

### 9.2 Datenklassen

```text
IdentityDocument(subject_type, subject_id, tone, role_description, organization_context, constraints)
MemoryItem(scope, owner_id, title, content, tags, visibility, version)
Skill(name, version, source, trusted, status, prompt_module, constraints)
ToolPolicy(name, scope, allow_rules, deny_rules, escalation_rules)
Agent(name, display_name, role, status, default_profile_id, allowed_tool_sets, allowed_channel_ids, memory_scope, skill_bindings, policy_binding_id)
ModelProfile(name, ollama_model_name, temperature, top_p, max_context_tokens)
ChannelConfig(channel_type, name, base_url, bot_username, app_password_secret_ref, webhook_path, model_profile_map, mention_filter_mode, enabled)
DelegationTask(source_agent_id, target_agent_id, requested_profile_id, resolved_model_profile_id, channel_id, prompt, status)
ChannelEvent(channel_id, external_message_id, room_token, sender, mention_detected, payload, processing_state, reply_message_id)
AuditEntry(actor_id, entity_type, entity_id, action, before_snapshot, after_snapshot)
```

### 9.3 UI-Routen

```text
/dashboard
/identity
/memory
/skills
/agents
/model-profiles
/tool-policies
/channels
/delegations
/audit
/workspace  // read-only inspector
```

### 9.4 Verarbeitungsfluss: Agent-zu-Agent-Delegation

1. Ein Agent oder der CEO erzeugt eine DelegationTask mit Ziel und gewünschtem Profil.
2. Die Policy-Schicht prüft, ob die Delegation erlaubt ist.
3. Das Profil wird auf ein konkretes ModelProfile aufgelöst.
4. Das konkrete Ollama-Modell wird an die Ausführung übergeben.
5. Toolaufrufe laufen durch den Policy-Check, bevor sie ausgeführt werden.
6. Das Ergebnis wird als AuditEntry und optional als Memory-Update persistiert.

### 9.5 Verarbeitungsfluss: Nextcloud Talk

1. Nextcloud sendet den Webhook an IronClaw.
2. IronClaw prüft sofort, ob die Nachricht den Bot erwähnt.
3. Ohne Mention: sofortiges HTTP 200 und kein LLM-Aufruf.
4. Mit Mention: Mention-String entfernen und ChannelEvent erzeugen.
5. Profil auf Modell auflösen.
6. Antwort über den Agenten-/LLM-Pfad erzeugen.
7. Antwort per REST an Nextcloud Talk senden.
8. Ergebnis und Antwort-Referenz auditieren.

## 10. Definition of Done

### 10.1 Konzept-Dod

- Der Reborn-Workspace bleibt read-only Inspector.
- Es existiert eine separate Authoring-Schicht für Identity, Memory, Skills, Policies und Agents.
- Profile, nicht Modellnamen, sind die fachliche Eingabe für Agenten und Channels.
- Profile werden zentral auf Ollama-Modelle gemappt.
- Die Modellauflösung hat einen kontrollierten Default-Fallback.
- Harte Toolregeln sind in einer Policy-Schicht implementiert oder klar dafür vorgesehen.

### 10.2 Multiagent-Dod

- Der CEO kann Agenten anlegen, umbenennen, deaktivieren und Rollen vergeben.
- Jeder Agent kann ein Default-Profil besitzen.
- Delegationen können ein spezifisches Profil anfordern.
- Die Ausführung routet Delegationen deterministisch auf das passende Modell.
- Agenten, Delegationen und Profilauflösungen sind auditierbar.

### 10.3 Nextcloud-Dod

- Nextcloud Talk kann als Fake-User ohne externe Middleware betrieben werden.
- Webhook-Ingress funktioniert asynchron und blockiert nicht.
- Nur Mentions an den konfigurierten Bot werden verarbeitet.
- REST-Egress an Talk funktioniert mit korrekter Authentifizierung und OCS-Headern.
- URL, Username und App-Passwort sind nur über die UI konfigurierbar.

### 10.4 Safety-Dod

- Änderungen an Policies, Skills, Profiles und Agenten sind versioniert.
- Jede kritische Änderung erzeugt Auditdaten.
- Ungültige Modell- oder Policy-Konfigurationen werden kontrolliert abgelehnt.
- Secrets werden nicht im Klartext in der UI oder in Konfigurationsdateien gespeichert.

## 11. Empfehlung für die spätere Implementierung

Die spätere Umsetzung sollte in dieser Reihenfolge erfolgen:

1. Authoring-Domain und Datenmodelle.
2. UI-Routen und Basis-CRUD.
3. ModelProfile-Resolver und Default-Fallback.
4. Agent-Roster und Delegation.
5. Tool-Policy-Enforcement.
6. Nextcloud Talk Channel.
7. Audit und Revert.

So bleibt das System erweiterbar, ohne die bestehende Reborn-Architektur zu destabilisieren.