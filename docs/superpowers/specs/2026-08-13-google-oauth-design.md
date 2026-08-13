# Google OAuth Login Integration Design

## Objective
Implement a "Login with Google" authentication flow using Supabase and Next.js App Router. Provide the user with the correct configuration parameters for the Google Cloud Console.

## User Actions Required (Google Cloud Console)
To set this up, the user must configure an OAuth Client ID in Google Cloud Platform (GCP) with the following details:
- **Authorized JavaScript origins**: `http://localhost:3000` (and production URL when deployed).
- **Authorized redirect URIs**: `https://zorlanuihfinyncvwjaz.supabase.co/auth/v1/callback`

## Architecture & Data Flow
- **Flow Option**: Standard Redirect Flow.
- **Trigger**: User clicks "Login with Google" on the login page.
- **Frontend**: The client calls `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: 'http://localhost:3000/auth/callback' } })`.
- **Callback Handling**: A server-side Next.js route handler (`/auth/callback/route.ts`) handles the code exchange via `@supabase/ssr`.

## Components to Modify/Create
1. **Frontend Button**: A UI component for the Google Login button (likely in `src/app/login/page.tsx` or `src/components/auth/`).
2. **Callback Route**: `src/app/auth/callback/route.ts` to securely handle the code-to-session exchange.

## Dependencies
- `@supabase/ssr`
- `@supabase/supabase-js`
