# Module: auth-session

This module provides user authentication features.

## Features

- **Login Form (`ui/login-form.tsx`)**: A client component for users to enter their credentials.
- **Session Service (`service/session.service.ts`)**: Client-side functions for `login` and `logout` that call the API layer.
- **API Route (`app/api/session/[action]/route.ts`)**: Server-side endpoint to handle login/logout requests.
- **Session Repository (`repo/session.repo.ts`)**: Server-only logic to validate credentials against a data source. Currently a placeholder.

## Toggling

This module can be disabled in `src/modules/registry.ts`. When disabled, the "Login" link will disappear from the navigation.
