# Module: classes

This module provides features for managing classes and their members.

## Features

- **Classes List (`ui/classes-list.tsx`)**: A client component to display a list of all classes.
- **Class Detail (`ui/class-detail.tsx`)**: A client component to display details of a single class, including its members.
- **Classes Service (`service/classes.service.ts`)**: Client-side functions for fetching and managing class data.
- **API Routes (`app/api/classes/...`)**: Server-side endpoints for class and member data.
- **Classes Repository (`repo/classes.repo.ts`)**: Server-only logic to manage class data in the database.

## Toggling

This module can be disabled in `src/modules/registry.ts`. When disabled, the "Classes" link will disappear from the navigation.
