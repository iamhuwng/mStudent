# Module: student-home

This module provides a dashboard for students to see an aggregated view of their work.

## Features

- **Aggregated View**: Shows student profile, materials, classes, and deadlines.
- **Service Composition**: This module does not have its own database tables. It composes data by calling the services of other modules.
- **Conditionally Renders**: Sections of the dashboard are hidden if the underlying module is disabled.

## Toggling

This module can be enabled or disabled in `src/modules/registry.ts`.
