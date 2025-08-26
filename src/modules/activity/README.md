# Module: activity

This module provides an append-only audit trail for important events in the system.

## Features

- **Event Logging**: A single `log` function that can be called from any other module to record an action.
- **Resilient**: If the activity module is disabled, calls to `log` become a no-op, ensuring the rest of the application continues to function without error.
- **API**: Provides an API to retrieve and prune activity logs.

## Toggling

This module can be enabled or disabled in `src/modules/registry.ts`.
