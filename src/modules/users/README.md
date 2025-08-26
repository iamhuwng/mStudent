# Module: users

This module provides features for managing and viewing users (students, staff, etc.).

## Features

- **Users List (`ui/users-list.tsx`)**: A client component to display a list of all users.
- **User Detail (`ui/user-detail.tsx`)**: A client component to display the profile of a single user.
- **Users Service (`service/users.service.ts`)**: Client-side functions for fetching user data from the API layer.
- **API Routes (`app/api/users/...`)**: Server-side endpoints for user data.
- **Users Repository (`repo/users.repo.ts`)**: Server-only logic to retrieve user data from a data source. Currently provides mock data.

## Toggling

This module can be disabled in `src/modules/registry.ts`. When disabled, the "Users" link will disappear from the navigation, and all user-related pages will show a "Module Disabled" message.
