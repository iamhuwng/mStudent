Goal: Implement read-only aggregator dashboards for teachers and students.

Scope (IN):
- **Teacher Dashboard**: Create a new page that aggregates data from other services.
  - Show lists of recent assignments, ungraded submissions, and recent activity.
  - This dashboard will have NO repository of its own. It will compose data by calling the services of other enabled modules.
- **Student Home**: Create a new page for logged-in students.
  - Show a list of their assigned materials (from class and individual assignments).
  - Show a list of their upcoming deadlines.
- **Conditional Rendering**: UI sections on both dashboards must be hidden if their underlying data source module is disabled in the registry.

Scope (OUT):
- No new database collections. These are read-only views.
- No write operations from the dashboards.

Acceptance:
- The teacher dashboard correctly displays data from the `assignments` and `submissions-grading` modules.
- If the `assignments` module is disabled, the "Recent Assignments" card disappears from the teacher dashboard without causing an error.
- The student home page correctly lists all assignments for that student.
- CODEMAP is updated.
