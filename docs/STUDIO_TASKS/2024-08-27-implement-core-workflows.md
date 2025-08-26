Goal: Implement Phase 2/3 core workflows for assignments, submissions, and grading.

Scope (IN):
- **Assignments**: Implement logic to assign a material to one or more students or a class, with an optional deadline.
- **Submissions**: Allow a student to submit work for an assignment. This can be a simple text content stub for now.
- **Grading**: Allow a teacher to view ungraded submissions and assign a grade (e.g., score, total, comment).
- **Activity Log**: Implement an append-only `activity.log` service. Other modules (assignments, submissions) must call this service to log key events. The log service should be a no-op if the `activity` module is disabled.

Scope (OUT):
- Does not include real-time notifications.
- Does not include complex grading rubrics or feedback tools.

Acceptance:
- A teacher can assign a material to a class.
- A student in that class can see the assignment and submit a response.
- The teacher can see the submission and give it a grade.
- The creation of the assignment and the submission are logged in the activity stream.
- The system works end-to-end with the `activity` module both enabled and disabled.
