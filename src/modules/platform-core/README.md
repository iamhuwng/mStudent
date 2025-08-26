# Module: platform-core

This module contains the core components and configuration for the M'Student application platform. It is not intended to be disabled.

## Features

- **Central Module Registry (`src/modules/registry.ts`)**: Defines all available modules and their enabled state.
- **Root Layout & Navigation (`src/app/layout.tsx`, `src/modules/platform-core/ui/header.tsx`)**: Provides the main application shell and generates navigation links from the module registry.
- **HTTP Service (`src/lib/services/http.ts`)**: A client-side fetch helper for interacting with the API layer.
- **Middleware (`src/middleware.ts`)**: Handles request processing for the application, excluding API and static asset routes.
- **Root README**: The main `README.md` file explaining the project's architecture is considered part of this core module.
