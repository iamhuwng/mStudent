# Module: deadlines-notifications

This module handles the logic for upcoming and overdue deadlines and can emit notifications.

## Features

- **Deadline Computation**: Logic to determine which assignments are upcoming or overdue.
- **Notification Emitter**: A stub for a system that could send emails, push notifications, etc.
- **UI Indicator**: Marks expired assignments as read-only in the UI.

## Dependencies

- `assignments`
- `submissions`

## Toggling

This module can be enabled or disabled in `src/modules/registry.ts`.
