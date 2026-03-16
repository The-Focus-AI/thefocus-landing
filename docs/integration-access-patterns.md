# Integration Access Patterns

This document compares the access and operations patterns in:

- `qbsync`
- `foundtain-creek`
- `quantificore`

The goal is to make the next integration easier to bootstrap without rediscovering auth, secrets, deploy, and scheduler decisions each time.

## Short answer

Use `foundtain-creek` as the baseline for new work.

It has the best overall shape:

- project-local `mise` + GCP auth
- Secret Manager as the system of record for credentials
- small Cloud Run services with explicit public/private boundaries
- event-driven processing where possible
- shared client modules for token refresh and API calls

But do not copy it blindly:

- borrow `qbsync`'s per-request OAuth `state` generation and validation
- borrow `quantificore`'s Cloud Build + `--update-secrets` pattern when the service set grows

## Comparison Table

| Repo | Runtime shape | Local auth pattern | External auth pattern | Secret pattern | Trigger pattern | What to copy |
| --- | --- | --- | --- | --- | --- | --- |
| `qbsync` | Single App Engine Flask app | Isolated gcloud config in `mise`, plus `env-vars.sh` | QuickBooks OAuth code flow inside main app | Mixed; runtime env loaded from shell file, tokens stored in Mongo | App Engine `cron.yaml` hitting a secret route | Good `state` validation, simple isolated gcloud config |
| `foundtain-creek` | Multiple Cloud Run services | Project-local ADC file in repo, loaded via `mise` | Dedicated Xero auth service; worker uses shared token client | Secret Manager everywhere; refresh token rotated as new secret version | Eventarc for file pipeline; HTTP `/poll` endpoint available for Cloud Scheduler | Best default pattern for new integrations |
| `quantificore` | Multi-service Cloud Run via Cloud Build | Simple `gcloud auth login` + ADC | No external SaaS OAuth; admin login is internal app auth | Secret Manager injected at deploy via `--update-secrets`; optional local `.env` materialization | Scheduler-oriented endpoints exist, but scheduler setup is outside repo | Best pattern for CI/CD and secret injection at deploy time |

## Repo Notes

### `qbsync`

Relevant files:

- `qbsync/mise.toml`
- `qbsync/env-vars.sh`
- `qbsync/steering_house/quickbooks_to_googlesheets.py`
- `qbsync/steering_house/utils/util.py`
- `qbsync/steering_house/cron.yaml`

Observed pattern:

- `mise run auth` creates and uses an isolated gcloud configuration named `qb-to-sheets`.
- Local runtime depends on `source env-vars.sh`.
- The main Flask app handles:
  - QuickBooks OAuth launch and callback
  - viewer login via shared secret
  - background sync trigger
  - App Engine cron entrypoint
- OAuth tokens and sync state are stored in Mongo by `realm_id`.
- Token refresh runs on a schedule before sync work.
- App Engine cron calls a secret path, and the app also checks `X-Appengine-Cron` or a custom header.

Strengths:

- The OAuth `state` value is random and persisted, then validated on callback.
- Scheduled token refresh is explicit and tied to operational state.
- Using a dedicated gcloud config avoids stomping the default operator context.

Weaknesses:

- Auth UI, operational UI, OAuth callback, and cron worker all live in one service.
- Secrets are shell-driven rather than fully managed in Secret Manager.
- The deployment shape is App Engine specific, which is less reusable for newer projects.

### `foundtain-creek`

Relevant files:

- `foundtain-creek/mise.toml`
- `foundtain-creek/README.md`
- `foundtain-creek/docs/gcloud-auth.md`
- `foundtain-creek/scripts/setup-secrets.sh`
- `foundtain-creek/scripts/setup-xero-secrets.sh`
- `foundtain-creek/scripts/setup-infrastructure.sh`
- `foundtain-creek/functions/xero-auth/index.js`
- `foundtain-creek/functions/xero-submit/xero-client.js`
- `foundtain-creek/functions/xero-submit/index.js`

Observed pattern:

- `mise.toml` sets project-scoped env up front:
  - `CLOUDSDK_ACTIVE_CONFIG_NAME`
  - `GOOGLE_CLOUD_PROJECT`
  - `GOOGLE_CLOUD_REGION`
  - `GOOGLE_APPLICATION_CREDENTIALS = "{{config_root}}/.adc.json"`
- `mise run auth` does both:
  - `gcloud auth login`
  - `gcloud auth application-default login`
- It then copies ADC into a repo-local `.adc.json` and patches in `quota_project_id`.
- Runtime secrets are pulled from Secret Manager, not shell files.
- Deploy tasks use `gcloud run deploy` with `--set-secrets`.
- The Xero auth flow is split cleanly:
  - public `xero-auth` service for `/auth` and `/callback`
  - shared `xero-client.js` for token refresh and API calls
  - worker services read client credentials and refresh token from Secret Manager
  - refresh token rotation writes a new secret version
- Event-driven processing is preferred:
  - webhook or upload -> GCS
  - Eventarc -> parser
- A scheduler-friendly pattern exists too:
  - `xero-submit` exposes `POST /poll` for automated submission

Strengths:

- Best separation of concerns.
- Best local operator experience.
- Best secret hygiene.
- Best reusable Cloud Run deployment shape.
- Shared token client makes external SaaS access portable across services.

Weaknesses to fix before copying:

- The Xero auth service uses a fixed OAuth `state` string instead of generating and validating a per-request value.
- If you reuse this pattern for another OAuth integration, add proper `state` handling and preferably PKCE if the provider supports it.

### `quantificore`

Relevant files:

- `quantificore/mise.toml`
- `quantificore/cloudbuild.yaml`
- `quantificore/quantificore/api/main.py`
- `quantificore/quantificore/api/admin/router.py`
- `quantificore/docs/GOOGLE_CLOUD_ACCESS.md`

Observed pattern:

- `mise` is used mostly for developer workflows and manual cloud access.
- Deployment is handled by Cloud Build rather than local `gcloud run deploy` commands.
- Secrets are attached at deploy time with `--update-secrets`.
- The public API is allowed unauthenticated access.
- Internal services are private Cloud Run services.
- Admin login is app-level auth:
  - operator posts `ADMIN_API_KEY`
  - app sets an `admin_session` cookie
  - middleware protects `/admin/*`
- Admin endpoints are explicitly written so Cloud Scheduler can call them for maintenance.

Strengths:

- Best CI/CD pattern of the three repos.
- Best deploy-time secret injection pattern.
- Clean distinction between public API and private worker services.

Weaknesses:

- Local auth is simpler, but less isolated than `foundtain-creek`.
- Admin auth is fine for a small internal dashboard, but it is not a reusable third-party OAuth pattern.

## Recommended Baseline For New Integrations

### 1. Local auth: use project-local ADC

Copy the `foundtain-creek` shape, not the `qbsync` shell-file shape.

Recommended properties:

- repo-scoped gcloud config name
- repo-local ADC file
- explicit project and region in `mise.toml`
- no dependency on the user's global ADC state after bootstrap

Minimal pattern:

```toml
[env]
_.file = ".env"
CLOUDSDK_ACTIVE_CONFIG_NAME = "myproject"
GOOGLE_CLOUD_PROJECT = "myproject"
GOOGLE_CLOUD_REGION = "us-central1"
GOOGLE_APPLICATION_CREDENTIALS = "{{config_root}}/.adc.json"

[tasks.auth]
run = """
gcloud auth login

ADC_DEST="$GOOGLE_APPLICATION_CREDENTIALS"
unset GOOGLE_APPLICATION_CREDENTIALS
gcloud auth application-default login \
  --scopes=openid,https://www.googleapis.com/auth/userinfo.email,https://www.googleapis.com/auth/cloud-platform
cp ~/.config/gcloud/application_default_credentials.json "$ADC_DEST"
export GOOGLE_APPLICATION_CREDENTIALS="$ADC_DEST"

python3 - <<'PY' "$GOOGLE_APPLICATION_CREDENTIALS" "$GOOGLE_CLOUD_PROJECT"
import json, sys
path, project = sys.argv[1], sys.argv[2]
data = json.load(open(path))
data["quota_project_id"] = project
json.dump(data, open(path, "w"), indent=2)
PY
"""
```

Why:

- local scripts and SDKs use the same predictable credentials file
- developers do not have to keep reauth-debugging global ADC
- the repo becomes portable across machines

### 2. Secrets: Secret Manager should be the source of truth

Copy the `foundtain-creek` and `quantificore` approach.

Recommended rules:

- store provider client IDs and client secrets in Secret Manager
- store rotating refresh tokens in Secret Manager too
- give runtime service accounts:
  - `roles/secretmanager.secretAccessor`
  - `roles/secretmanager.secretVersionAdder` if they rotate tokens
- inject static runtime secrets at deploy time with:
  - `--set-secrets` for manual deploy tasks
  - `--update-secrets` in Cloud Build

Do not use `env-vars.sh` as the long-term pattern for production credentials.

### 3. External SaaS auth: split bootstrap from runtime

Best pattern:

1. Public auth/bootstrap service
2. Shared provider client module
3. Private worker services that use that shared client

That means:

- `/auth` and `/callback` live in a small public Cloud Run service
- refresh and API-call logic live in a shared library
- background workers never handle user consent directly

Recommended flow:

1. Read `client_id` and `client_secret` from Secret Manager.
2. Generate a random OAuth `state`.
3. Persist the expected `state` in a short-lived store.
4. Redirect the operator to the provider consent screen.
5. On callback, validate `state`.
6. Exchange the auth code for tokens.
7. Store the refresh token in Secret Manager.
8. If the provider has account or tenant IDs, write them back into your system of record.
9. Let worker services refresh access tokens on demand.

Important nuance:

- `qbsync` gets step 2 and step 5 right.
- `foundtain-creek` gets the service decomposition right.
- The next implementation should combine both.

If the provider supports machine-to-machine auth, prefer that over browser OAuth.

Examples:

- client credentials
- service accounts
- one-time custom connection models

That removes callback handling, refresh-token rotation, and operator UI entirely.

### 4. Runtime boundary: public and private services

Use the `foundtain-creek` and `quantificore` split:

- public services:
  - webhook receivers
  - upload UIs
  - OAuth/bootstrap pages
  - public APIs if the product needs them
- private services:
  - parsers
  - submitters
  - ingestors
  - scheduled maintenance workers

This keeps the blast radius small:

- public services do the minimum
- private services hold the operational credentials
- IAM decides what can invoke what

### 5. Triggers and scheduling

Preferred order:

1. Native events
2. Cloud Scheduler
3. Secret cron URLs

Use native events first:

- `foundtain-creek` uses GCS -> Eventarc -> parser
- this is the best pattern when the source system can emit events or when you can turn input into storage events

Use Cloud Scheduler second:

- for polling APIs
- for maintenance jobs
- for retry loops
- for "submit everything in ready state" workflows like `xero-submit`'s `/poll`

Only use secret cron URLs as the fallback:

- `qbsync`'s App Engine cron route works, but it is a legacy hosting-specific pattern
- for new work, prefer Cloud Scheduler calling an authenticated Cloud Run endpoint or Pub/Sub target

### 6. Admin/operator auth

There are two different auth problems:

- provider auth
- operator UI auth

Do not mix them.

Recommended rule:

- provider auth should be token-based and Secret Manager-backed
- operator UI auth should be separate, usually one of:
  - Identity-Aware Proxy
  - Cloud Run IAM
  - app-level session auth for small internal tools

`quantificore` shows the lightweight version:

- operator enters `ADMIN_API_KEY`
- app sets a secure cookie
- middleware protects `/admin/*`

This is fine for internal tooling, but it is not the same thing as third-party API auth.

## Build-The-Next-One Checklist

When starting a new integration, use this order:

1. Create a repo-local `mise.toml` with project, region, and `.adc.json`.
2. Add `mise run auth`, `auth-status`, and deploy tasks before writing app code.
3. Create Secret Manager bootstrap scripts for all non-user credentials.
4. Decide whether the provider supports machine-to-machine auth.
5. If not, create a tiny public OAuth bootstrap service.
6. Put refresh logic in a shared client module, not inline in handlers.
7. Keep workers private and inject secrets with Cloud Run or Cloud Build.
8. Choose triggers:
   - Eventarc/webhook first
   - Cloud Scheduler second
9. Add smoke-test tasks for auth status, logs, and health checks.
10. Document the exact bootstrap sequence in the repo README.

## What To Reuse Next Time

Reuse directly from `foundtain-creek`:

- project-local ADC pattern in `mise.toml`
- Secret Manager bootstrap scripts
- Cloud Run deploy tasks with `--set-secrets`
- shared provider client module
- public bootstrap service + private worker split
- Eventarc-first architecture

Reuse selectively from `qbsync`:

- random OAuth `state`
- callback `state` validation
- explicit scheduled token refresh thinking

Reuse selectively from `quantificore`:

- Cloud Build deployment pipeline
- `--update-secrets` at deploy time
- scheduler-friendly maintenance endpoints
- lightweight internal admin cookie flow

## Recommended Default Stack

If we build another integration like this tomorrow, the default stack should be:

- `mise` for local toolchain and auth tasks
- Cloud Run for services
- Secret Manager for all credentials
- repo-local ADC file for operator access
- dedicated OAuth bootstrap service only if browser consent is unavoidable
- shared provider client module for token refresh and API calls
- Eventarc/webhooks for event-driven flows
- Cloud Scheduler for polling and maintenance
- Cloud Build once the repo has more than one deployable service

That gives us the operational clarity of `foundtain-creek`, the OAuth correctness pieces from `qbsync`, and the deploy discipline of `quantificore`.
