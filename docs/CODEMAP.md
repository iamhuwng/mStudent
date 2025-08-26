# Code Map

This document provides a map of the generated code in the M'Student application, based on traceability markers in the source files.

## platform-core

| Gen ID | Export | Layer | File | Routes |
|---|---|---|---|---|
| `core.nav` | `MainNav` | `ui` | `src/modules/platform-core/ui/main-nav.tsx` | - |
| `core.home` | `Home` | `ui` | `src/app/page.tsx` | `/` |
| `core.middleware.guard` | `middleware` | `api` | `src/middleware.ts` | `* (excluded)` |
| `core.http.fetch` | `http` | `service` | `src/lib/services/http.ts` | - |
| `core.registry.read` | `modules`, `isModuleEnabled` | `service` | `src/modules/registry.ts` | - |
| `rules.users` | - | `repo` | `firestore.rules` | - |
| `rules.classes` | - | `repo` | `firestore.rules` | - |
| `rules.materials` | - | `repo` | `firestore.rules` | - |

## auth-session

| Gen ID | Export | Layer | File | Routes |
|---|---|---|---|---|
| `auth.login.ui` | `LoginForm` | `ui` | `src/modules/auth-session/ui/login-form.tsx` | - |
| `auth.login.service` | `login` | `service` | `src/modules/auth-session/service/session.service.ts` | `/api/session/login` |
| `auth.logout.service` | `logout` | `service` | `src/modules/auth-session/service/session.service.ts` | `/api/session/logout` |
| `auth.api` | `POST` | `api` | `src/app/api/session/[action]/route.ts` | `/api/session/*` |
| `auth.login.repo` | `login` | `repo` | `src/modules/auth-session/repo/session.repo.ts` | - |
| `auth.claims.ensure` | `session` | `repo` | `src/modules/auth-session/repo/session.repo.ts` | - |

## users

| Gen ID | Export | Layer | File | Routes |
|---|---|---|---|---|
| `users.list` | `UsersList` | `ui` | `src/modules/users/ui/users-list.tsx` | - |
| `users.detail` | `UserDetail` | `ui` | `src/modules/users/ui/user-detail.tsx` | - |
| `users.list.service` | `getUsers` | `service` | `src/modules/users/service/users.service.ts` | `/api/users` |
| `users.detail.service` | `getUserById` | `service` | `src/modules/users/service/users.service.ts` | `/api/users/:id` |
| `users.create.service` | `createUser` | `service` | `src/modules/users/service/users.service.ts` | `/api/users` |
| `users.update.service` | `updateUser` | `service` | `src/modules/users/service/users.service.ts` | `/api/users/:id` |
| `users.delete.service` | `deleteUser` | `service` | `src/modules/users/service/users.service.ts` | `/api/users/:id` |
| `users.api.list` | `GET` | `api` | `src/app/api/users/route.ts` | `/api/users` |
| `users.api.create` | `POST` | `api` | `src/app/api/users/route.ts` | `/api/users` |
| `users.api.detail`| `GET` | `api` | `src/app/api/users/[id]/route.ts`| `/api/users/:id` |
| `users.api.update`| `PUT` | `api` | `src/app/api/users/[id]/route.ts`| `/api/users/:id` |
| `users.api.delete`| `DELETE` | `api` | `src/app/api/users/[id]/route.ts`| `/api/users/:id` |
| `users.list.repo` | `getUsers` | `repo` | `src/modules/users/repo/users.repo.ts` | - |
| `users.detail.repo`| `getUserById`| `repo` | `src/modules/users/repo/users.repo.ts` | - |
| `users.create.repo` | `createUser` | `repo` | `src/modules/users/repo/users.repo.ts` | - |
| `users.update.repo`| `updateUser`| `repo` | `src/modules/users/repo/users.repo.ts` | - |
| `users.delete.repo`| `deleteUser`| `repo` | `src/modules/users/repo/users.repo.ts` | - |

## classes

| Gen ID | Export | Layer | File | Routes |
|---|---|---|---|---|
| `classes.list` | `ClassesList` | `ui` | `src/modules/classes/ui/classes-list.tsx` | - |
| `classes.detail` | `ClassDetail` | `ui` | `src/modules/classes/ui/class-detail.tsx` | - |
| `classes.list.service` | `getClasses` | `service` | `src/modules/classes/service/classes.service.ts` | `/api/classes` |
| `classes.detail.service` | `getClassById` | `service` | `src/modules/classes/service/classes.service.ts` | `/api/classes/:id` |
| `classes.members.service` | `getClassMembers` | `service` | `src/modules/classes/service/classes.service.ts` | `/api/classes/:id/members` |
| `classes.create.service` | `createClass` | `service` | `src/modules/classes/service/classes.service.ts` | `/api/classes` |
| `classes.assign.service` | `assignMemberToClass` | `service` | `src/modules/classes/service/classes.service.ts` | `/api/classes/:id/members` |
| `classes.list.api` | `GET` | `api` | `src/app/api/classes/route.ts` | `/api/classes` |
| `classes.create.api` | `POST` | `api` | `src/app/api/classes/route.ts` | `/api/classes` |
| `classes.detail.api` | `GET` | `api` | `src/app/api/classes/[id]/route.ts` | `/api/classes/:id` |
| `classes.members.api` | `GET` | `api` | `src/app/api/classes/[id]/members/route.ts` | `/api/classes/:id/members` |
| `classes.assign.api` | `POST` | `api` | `src/app/api/classes/[id]/members/route.ts` | `/api/classes/:id/members` |
| `classes.list.repo` | `getClasses` | `repo` | `src/modules/classes/repo/classes.repo.ts` | - |
| `classes.detail.repo` | `getClassById` | `repo` | `src/modules/classes/repo/classes.repo.ts` | - |
| `classes.create.repo` | `createClass` | `repo` | `src/modules/classes/repo/classes.repo.ts` | - |
| `classes.members.repo` | `getClassMembers` | `repo` | `src/modules/classes/repo/classes.repo.ts` | - |
| `classes.assign.repo` | `assignMemberToClass` | `repo` | `src/modules/classes/repo/classes.repo.ts` | - |

## materials

| Gen ID | Export | Layer | File | Routes |
|---|---|---|---|---|
| `materials.list` | `MaterialsList` | `ui` | `src/modules/materials/ui/materials-list.tsx` | - |
| `materials.detail` | `MaterialDetail` | `ui` | `src/modules/materials/ui/material-detail.tsx` | - |
| `materials.preview` | `MaterialPreview` | `ui` | `src/modules/materials/ui/material-preview.tsx` | - |
| `materials.list.service` | `getMaterials` | `service` | `src/modules/materials/service/materials.service.ts` | `/api/materials` |
| `materials.detail.service` | `getMaterialById` | `service` | `src/modules/materials/service/materials.service.ts` | `/api/materials/:id` |
| `materials.create.service` | `createMaterial` | `service` | `src/modules/materials/service/materials.service.ts` | `/api/materials` |
| `materials.update.service` | `updateMaterial` | `service` | `src/modules/materials/service/materials.service.ts` | `/api/materials/:id` |
| `materials.delete.service` | `deleteMaterial` | `service` | `src/modules/materials/service/materials.service.ts` | `/api/materials/:id` |
| `materials.api.list` | `GET` | `api` | `src/app/api/materials/route.ts` | `/api/materials` |
| `materials.api.create` | `POST` | `api` | `src/app/api/materials/route.ts` | `/api/materials` |
| `materials.api.detail`| `GET` | `api` | `src/app/api/materials/[id]/route.ts`| `/api/materials/:id` |
| `materials.api.update`| `PUT` | `api` | `src/app/api/materials/[id]/route.ts`| `/api/materials/:id` |
| `materials.api.delete`| `DELETE` | `api` | `src/app/api/materials/[id]/route.ts`| `/api/materials/:id` |
| `materials.list.repo` | `getMaterials` | `repo` | `src/modules/materials/repo/materials.repo.ts` | - |
| `materials.detail.repo`| `getMaterialById`| `repo` | `src/modules/materials/repo/materials.repo.ts` | - |
| `materials.create.repo` | `createMaterial` | `repo` | `src/modules/materials/repo/materials.repo.ts` | - |
| `materials.update.repo`| `updateMaterial`| `repo` | `src/modules/materials/repo/materials.repo.ts` | - |
| `materials.delete.repo`| `deleteMaterial`| `repo` | `src/modules/materials/repo/materials.repo.ts` | - |

## assignments

| Gen ID | Export | Layer | File | Routes |
|---|---|---|---|---|
| `assignments.create.service` | `createAssignment` | `service` | `src/modules/assignments/service/assignments.service.ts` | `/api/assignments` |
| `assignments.list.forStudent` | `getAssignmentsForStudent` | `service` | `src/modules/assignments/service/assignments.service.ts` | `/api/assignments` |
| `assignments.list.forClass` | `getAssignmentsForClass` | `service` | `src/modules/assignments/service/assignments.service.ts` | `/api/assignments` |
| `assignments.delete.service` | `deleteAssignment` | `service` | `src/modules/assignments/service/assignments.service.ts` | `/api/assignments/:id` |
| `assignments.create` | `POST` | `api` | `src/app/api/assignments/route.ts` | `/api/assignments` |
| `assignments.list` | `GET` | `api` | `src/app/api/assignments/route.ts` | `/api/assignments` |
| `assignments.delete` | `DELETE` | `api` | `src/app/api/assignments/[id]/route.ts` | `/api/assignments/:id` |
| `assignments.create.repo` | `createAssignment` | `repo` | `src/modules/assignments/repo/assignments.repo.ts` | - |
| `assignments.list.forStudent` | `getAssignmentsForStudent` | `repo` | `src/modules/assignments/repo/assignments.repo.ts` | - |
| `assignments.list.forClass` | `getAssignmentsForClass` | `repo` | `src/modules/assignments/repo/assignments.repo.ts` | - |
| `assignments.delete.repo` | `deleteAssignment` | `repo` | `src/modules/assignments/repo/assignments.repo.ts` | - |

## submissions-grading

| Gen ID | Export | Layer | File | Routes |
|---|---|---|---|---|
| `submissions.create.service` | `createSubmission` | `service` | `src/modules/submissions-grading/service/submissions.service.ts` | `/api/submissions` |
| `submissions.list.ungraded` | `getUngradedSubmissions` | `service` | `src/modules/submissions-grading/service/submissions.service.ts` | `/api/submissions` |
| `submissions.grade.service` | `gradeSubmission` | `service` | `src/modules/submissions-grading/service/submissions.service.ts` | `/api/submissions/:id/grade` |
| `submissions.create` | `POST` | `api` | `src/app/api/submissions/route.ts` | `/api/submissions` |
| `submissions.list` | `GET` | `api` | `src/app/api/submissions/route.ts` | `/api/submissions` |
| `submissions.grade` | `PUT` | `api` | `src/app/api/submissions/[id]/grade/route.ts` | `/api/submissions/:id/grade` |
| `submissions.create.repo` | `createSubmission` | `repo` | `src/modules/submissions-grading/repo/submissions.repo.ts` | - |
| `submissions.list.ungraded` | `getUngradedSubmissions` | `repo` | `src/modules/submissions-grading/repo/submissions.repo.ts` | - |
| `submissions.grade.repo` | `gradeSubmission` | `repo` | `src/modules/submissions-grading/repo/submissions.repo.ts` | - |

## activity

| Gen ID | Export | Layer | File | Routes |
|---|---|---|---|---|
| `activity.log.service` | `logActivity` | `service` | `src/modules/activity/service/activity.service.ts` | `/api/activity` |
| `activity.list.service` | `getActivity` | `service` | `src/modules/activity/service/activity.service.ts` | `/api/activity` |
| `activity.prune.service` | `pruneActivity` | `service` | `src/modules/activity/service/activity.service.ts` | `/api/activity` |
| `activity.log` | `POST` | `api` | `src/app/api/activity/route.ts` | `/api/activity` |
| `activity.list` | `GET` | `api` | `src/app/api/activity/route.ts` | `/api/activity` |
| `activity.prune` | `DELETE` | `api` | `src/app/api/activity/route.ts` | `/api/activity` |
| `activity.log.repo` | `logActivity` | `repo` | `src/modules/activity/repo/activity.repo.ts` | - |
| `activity.list.repo` | `getActivity` | `repo` | `src/modules/activity/repo/activity.repo.ts` | - |
| `activity.prune.repo` | `pruneActivity` | `repo` | `src/modules/activity/repo/activity.repo.ts` | - |

## dashboard-teacher

| Gen ID | Export | Layer | File | Routes |
|---|---|---|---|---|
| `dashboard.teacher.aggregate.service` | `getTeacherDashboardData` | `service` | `src/modules/dashboard-teacher/service/dashboard.service.ts` | - |
| `dashboard.teacher.aggregate.ui` | `TeacherDashboard` | `ui` | `src/modules/dashboard-teacher/ui/teacher-dashboard.tsx` | - |

## student-home

| Gen ID | Export | Layer | File | Routes |
|---|---|---|---|---|
| `student.home.aggregate.service` | `getStudentHomeData` | `service` | `src/modules/student-home/service/student-home.service.ts` | - |
| `student.home.aggregate.ui` | `StudentHome` | `ui` | `src/modules/student-home/ui/student-home.tsx` | - |

## flashcards

| Gen ID | Export | Layer | File | Routes |
|---|---|---|---|---|
| `flashcards.list.ui` | `FlashcardsPage` | `ui` | `src/app/flashcards/page.tsx` | `/flashcards` |
| `flashcards.detail.ui` | `FlashcardSetPage` | `ui` | `src/app/flashcards/[id]/page.tsx` | `/flashcards/:id` |
| `flashcards.set.create` | `createFlashcardSet` | `service` | `src/modules/flashcards/service/flashcards.service.ts` | `/api/flashcards/sets` |
| `flashcards.card.create` | `createFlashcard` | `service` | `src/modules/flashcards/service/flashcards.service.ts` | `/api/flashcards/cards` |
| `flashcards.progress.mark` | `markFlashcardProgress` | `service` | `src/modules/flashcards/service/flashcards.service.ts` | `/api/flashcards/progress` |
| `flashcards.api` | `POST` | `api` | `src/app/api/flashcards/[entity]/route.ts` | `/api/flashcards/*` |
| `flashcards.set.create` | `createFlashcardSet` | `repo` | `src/modules/flashcards/repo/flashcards.repo.ts` | - |
| `flashcards.card.create` | `createFlashcard` | `repo` | `src/modules/flashcards/repo/flashcards.repo.ts` | - |
| `flashcards.progress.mark` | `markFlashcardProgress` | `repo` | `src/modules/flashcards/repo/flashcards.repo.ts` | - |
