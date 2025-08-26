# Module: dashboard-teacher

This module provides a dashboard for teachers to see an aggregated view of recent activity.

## Features

- **Aggregated View**: Shows latest assignments, submissions, materials, etc.
- **Service Composition**: This module does not have its own database tables. It composes data by calling the services of other modules.
- **Conditionally Renders**: Sections of the dashboard are hidden if the underlying module (e.g., `assignments`) is disabled.

## Toggling

This module can be enabled or disabled in `src/modules/registry.ts`.
