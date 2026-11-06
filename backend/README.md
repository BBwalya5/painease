# PainEase Node.js Backend

This is a standalone backend foundation for the future replacement of the Supabase-backed implementation. It does not currently connect to the database or change the frontend's existing Supabase integration.

## Structure

- `src/app.js` - Express application setup
- `src/server.js` - HTTP server lifecycle and shutdown
- `src/config/` - environment configuration
- `src/routes/` - API route registration
- `src/controllers/` - HTTP request/response handlers
- `src/services/` - application business logic
- `src/repositories/` - data access abstractions
- `src/db/` - future database adapters
- `src/middleware/` - authentication, validation, and error middleware
- `src/modules/` - future feature modules
- `test/` - Node.js tests

## Run

```powershell
cd backend
npm install
npm run dev
```

The API base URL is `http://localhost:3001/api/v1`.

The health endpoint is `GET /api/v1/health`.

## MySQL configuration

Copy `.env.example` to `.env` and update the `DB_*` values. The backend uses a pooled `mysql2/promise` adapter through `src/db/database.js`. Database connections are lazy: a repository calls `database.query()` or `database.connect()` when a MySQL operation is needed.

## HTTP-only authentication

The session cookie is `httpOnly`, `sameSite=strict`, and `secure` in production. Configure `AUTH_SECRET`, `AUTH_COOKIE_NAME`, and `AUTH_COOKIE_MAX_AGE_MS` in `.env`.

- `POST /api/v1/auth/login` - Reserved for MySQL-backed credential verification
- `GET /api/v1/auth/session` - Returns the current authenticated session
- `POST /api/v1/auth/logout` - Clears the session cookie
- `POST /api/v1/auth/development-session` - Development-only test cookie creation

## Separate frontend deployment

Set `CLIENT_URLS` to a comma-separated list of allowed frontend origins. Configure `AUTH_COOKIE_SAME_SITE` for the relationship between the frontend and API:

- `lax` for same-site or typical production subdomains
- `strict` for same-site requests where maximum restriction is acceptable
- `none` for cross-site frontend/API domains

Cross-site cookies require HTTPS and `secure: true`. When `AUTH_COOKIE_SAME_SITE=none` is used in production, deploy with HTTPS, set `TRUST_PROXY=true`, and set `AUTH_COOKIE_DOMAIN` only when the cookie should span frontend/API subdomains.

## Initial MySQL schema

The complete PainEase MySQL schema is at [src/db/migrations/001_initial_mysql.sql](src/db/migrations/001_initial_mysql.sql).

In phpMyAdmin:

1. Start Apache and MySQL in WAMP.
2. Open `http://localhost/phpmyadmin`.
3. Select the `painease` database.
4. Open the **SQL** tab.
5. Open the migration file, copy its contents, and select **Go**.

The migration creates users, roles, profiles, pain records, guide messages, professional profiles, facilities, library articles, sessions, password reset tokens, and audit logs. It also removes and recreates these tables, so run it only on a development database.
