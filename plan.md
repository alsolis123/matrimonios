# Marriage Survey Project Plan

## Document Purpose

This document is the execution plan for the project.

Unlike `design.md`, which captures product and design agreements, this file should focus on how the application will be organized, built, deployed, and verified.

It should help future sessions continue implementation work without having to redefine the technical path each time.

## Planning Scope

This plan is focused on:

- project setup
- folder structure
- deployment approach
- database preparation
- implementation phases
- technical checkpoints before the event

This plan is not meant to replace the product decisions already defined in `design.md`.

## Current Planning Status

This project is no longer only in pre-implementation planning.

At this point:

- the product direction has already been defined in `design.md`
- the survey categories, questions, result format, and suggestion bank already exist
- the deployment baseline has already been chosen
- the folder structure and implementation phases have already been outlined
- the Next.js app has already been scaffolded in this repository
- the initial app shell and placeholder routes already exist
- the initial Supabase schema and seed files already exist
- the local Supabase client helpers already exist
- the survey catalog can already be served from code through `/api/survey`
- the public participant flow is already implemented end to end
- the admin area already has PIN protection, aggregate metrics, export, and presentation mode
- the result view already supports printable PDF download through the browser print flow

The next session should not restart product discovery by default.

The next session should use this plan to begin implementation in a controlled order.

## Current Implementation Snapshot

The repository already contains working implementation progress.

Completed so far:

- Next.js app scaffolded with TypeScript and App Router
- placeholder routes created for `/`, `/encuesta`, `/resultado`, `/administracion`, and `/administracion/presentacion`
- project structure created for `components`, `lib`, `types`, and `supabase`
- package renamed to `matrimonios`
- local environment example file added as `.env.example`
- Supabase JavaScript client installed
- Supabase helper files added under `src/lib/supabase`
- TypeScript database types stub added for the current schema direction
- initial schema migration added at `supabase/migrations/20260423_01_initial_schema.sql`
- initial seed added at `supabase/seed/001_initial_content.sql`
- question catalog added in code at `src/lib/questions/catalog.ts`
- suggestion catalog added in code at `src/lib/suggestions/catalog.ts`
- survey definition service added at `src/lib/questions/service.ts`
- `GET /api/survey?audience=man|woman` already returns the survey definition from code
- local environment variables have already been configured in `.env.local`
- Supabase project connection is already working with public URL, publishable key, secret key, and `ADMIN_PIN`
- all survey categories, questions, intro text, and suggestions were translated to Spanish in both code and SQL seed
- `POST /api/survey` already stores real `submissions` and `answers` in Supabase
- `/encuesta` already supports audience selection, intro screen, one-question-at-a-time flow, 1-to-5 scoring, and submission
- `/resultado?token=...` already loads a saved result, computes 1 strength and 2 weaknesses, and shows full suggestion lists
- `/api/pdf?token=...` already returns a printable result view for browser-based PDF saving
- `/administracion` already requires a server-verified PIN and stores an admin session in an `httpOnly` cookie
- `/administracion` already shows completed survey counts, audience split, category averages, strongest category, and weakest categories
- `/api/export` already generates a CSV export compatible with Excel
- `/administracion/presentacion` already supports a guided presentation mode with multiple slides over the aggregate data
- the landing page has already been simplified for participants and now keeps admin access only in the footer
- church branding has already been added with footer copy and logo asset under `public/iglesia-biblica-vida-logo.png`

Validation already performed:

- `npm run lint` passes
- `npm run build` passes outside the sandboxed session environment
- inside the sandbox, `next build` may fail with `spawn EPERM`; this was treated as an environment restriction, not a project defect, because the same build succeeds outside the sandbox
- manual browser testing already confirmed that the app runs locally by invoking Next directly through `node.exe` because `node`, `npm`, and `npx` are not currently on the Windows `PATH`

## Previous Blocker Resolved

The previous Supabase restoration blocker has been resolved.

The project is now connected to a real Supabase instance and local credentials are already configured.

The schema and seed have already been applied in Supabase, and the current app is using that live project for persistence.

There is no longer a Supabase connection blocker for normal development work.

## Current Recommended Next Step

When the next session begins, the practical first check should be:

1. run a quick end-to-end QA pass in local development
2. verify participant flow, result flow, admin login, CSV export, presentation mode, and printable PDF
3. make any final UX or copy polish discovered during QA
4. prepare deployment configuration in Vercel
5. perform a first production deploy and test the deployed app

## Confirmed Technical Baseline

The current technical baseline is:

- Next.js
- TypeScript
- Vercel for deployment
- Supabase for PostgreSQL and supporting backend services
- mobile-first frontend
- lightweight server-side admin PIN protection

The project should stay simple and appropriate for a short-lived event application running on free-tier services where possible.

## Deployment Strategy

The recommended deployment flow is:

1. build the project locally with Next.js
2. keep the code in a Git repository
3. push the repository to GitHub
4. connect the repository to Vercel
5. create and configure the Supabase project
6. set environment variables in local development and in Vercel
7. deploy preview versions during development
8. publish the production deployment for the event

This gives the project a simple, low-maintenance path with minimal infrastructure overhead.

The expected hosting model is:

- one Next.js application deployed in Vercel
- one Supabase project for database and supporting backend needs
- no separate VPS, home server, or custom always-on backend

## Environment Strategy

The project should support at least two environments:

- local development
- production

Preview deployments in Vercel should also be used during development when helpful.

The app should be designed so environment-specific values are controlled through environment variables instead of hardcoded values.

## Expected Environment Variables

The initial environment variables should include:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PIN`

Important rules:

- `SUPABASE_SECRET_KEY` and `SUPABASE_SERVICE_ROLE_KEY` must never be exposed to the browser
- `ADMIN_PIN` should be checked server-side only
- client-side code should only use the public Supabase values when appropriate

## Recommended Project Structure

The project should use the Next.js App Router and a folder structure that keeps routes, UI, and domain logic clearly separated.

Recommended structure:

```text
src/
  app/
    page.tsx
    layout.tsx
    globals.css
    encuesta/
      page.tsx
    resultado/
      page.tsx
    administracion/
      page.tsx
      presentacion/
        page.tsx
    api/
      survey/
        route.ts
      pdf/
        route.ts
      admin/
        pin/
          route.ts
      export/
        route.ts

  components/
    survey/
    results/
    admin/
    ui/

  lib/
    supabase/
    scoring/
    questions/
    suggestions/
    pdf/
    admin/
    utils/

  types/

supabase/
  migrations/
  seed/

public/
```

## Folder Responsibility Guidance

The main folder responsibilities should be:

- `src/app`: routes, layouts, route handlers, page-level composition
- `src/components`: reusable UI pieces grouped by feature
- `src/lib/supabase`: Supabase clients and helpers
- `src/lib/scoring`: category score calculation and result ranking logic
- `src/lib/questions`: question definitions and gender-based question sets
- `src/lib/suggestions`: category suggestion bank and mapping logic
- `src/lib/pdf`: PDF generation logic
- `src/lib/admin`: admin PIN validation and admin-only helpers
- `src/types`: shared TypeScript types
- `supabase/migrations`: database schema history
- `supabase/seed`: optional seed data for categories and questions

This structure is meant to keep the project readable and easy to resume.

## Route Planning

The current route direction should be:

- `/` for the landing or entry experience
- `/encuesta` for the participant survey flow
- `/resultado` for the final participant results
- `/administracion` for the admin area
- `/administracion/presentacion` for immersive chart presentation mode

Possible API route responsibilities:

- `/api/survey` for survey definition loading and submission handling
- `/api/pdf` for participant printable PDF view generation
- `/api/admin/pin` for server-side admin PIN verification and session clearing
- `/api/export` for CSV export generation

The public participant flow should remain visually separate from the admin flow.

The result route may later use a submission identifier, token, or server-generated reference to load the correct result safely, but this detail is still implementation-specific and does not need to be finalized before bootstrap work begins.

## Data Model Planning

The initial data model should be planned around these entities:

- `categories`
- `questions`
- `question_sets`
- `submissions`
- `answers`

Suggested responsibilities:

- `categories`: stores the 4 agreed categories
- `questions`: stores the survey questions and links them to category and audience
- `question_sets`: distinguishes the men's and women's question collections if needed
- `submissions`: stores a survey completion record
- `answers`: stores each answer tied to a submission and question

The schema should avoid storing participant names.

If an internal identifier is needed, it should be generated by the system and not displayed in the participant flow.

## Data Loading Strategy

Because the questions and suggestions are already defined, the project should treat them as controlled content.

The likely initial approach should be:

- store the final survey questions in the database
- keep development-friendly source copies in code or seed files
- store the suggestion bank in code, in the database, or both, depending on simplicity

The priority is maintainability and ease of setup for the event.

The first implementation should prefer keeping the question and suggestion source material easy to audit and edit.

## Scoring Strategy

The scoring logic should remain lightweight.

The expected approach is:

- calculate per-category averages from answers
- identify the highest-scoring category as the single strength
- identify the two lowest-scoring categories as the two weaknesses
- attach the full suggestion list for each weak category

This logic should live in a dedicated scoring module instead of being spread across page components.

## Admin Access Strategy

The admin experience should use a lightweight PIN-based access model.

The current planning assumptions are:

- admin access is separated by route
- the admin PIN is verified server-side
- the admin route should not rely only on being hidden
- the implementation should remain simple and short-lived for the event context

Current implementation detail:

- the admin session is already implemented through an `httpOnly` signed cookie
- the current session duration is 8 hours
- logout is already implemented through `DELETE /api/admin/pin`

## Excel Export Strategy

The admin area should allow exporting survey data to an Excel-compatible file.

The simplest acceptable first version may be:

- CSV export if that proves significantly lighter and simpler
- XLSX export only if the library cost and complexity remain reasonable

Decision taken:

- phase 1 already uses CSV export
- this is currently considered sufficient because it opens correctly in Excel while avoiding heavy dependencies

The export should prioritize:

- category-level analysis support
- question and answer clarity
- no participant names
- compatibility with common spreadsheet tools

## PDF Strategy

The participant result view should support downloadable PDF output.

The first implementation should favor:

- simple and readable formatting
- category results
- one strength
- two weaknesses
- full suggestion lists for weak categories

Decision taken:

- phase 1 already uses a printable HTML route at `/api/pdf?token=...`
- the browser print dialog is triggered automatically so the participant can save the result as a PDF
- this was chosen over server-side PDF libraries to keep the stack lighter and more reliable for the MVP

## Implementation Phases

### Phase 1: Project Bootstrap

- initialize the Next.js project with TypeScript
- configure linting and formatting defaults if needed
- create the base folder structure
- prepare the initial Git repository

Status: completed.

### Phase 2: Supabase Setup

- create the Supabase project
- define the initial schema
- add migrations
- prepare seed data for categories and questions

Status: completed for MVP needs.

Already done:

- migration file created
- seed file created
- environment example file created
- local client and type helpers created
- real Supabase project connected
- local environment variables configured
- migration applied in Supabase
- seed applied in Supabase

Still pending:

- optional future schema refinements only if new product needs appear

### Phase 3: Base App Shell

- create the global layout
- establish theme variables and basic styling direction
- create the public entry route
- create placeholder routes for survey, result, and admin

Status: completed for the initial shell.

### Phase 4: Survey Flow

- implement gender selection
- load the appropriate 20 questions
- build the one-question-at-a-time survey UI
- save submissions and answers to the database

Status: completed.

### Phase 5: Results Logic

- calculate category averages
- determine one strength and two weaknesses
- attach full suggestion lists for weak categories
- render the participant results screen

Status: completed.

### Phase 6: Admin Area

- implement admin PIN verification
- build the admin summary screen
- add aggregate charts by category
- add export capability
- add presentation mode

Status: completed for MVP scope.

### Phase 7: PDF Output

- generate participant result PDFs
- verify layout on mobile and desktop
- confirm that the PDF content matches the result screen

Status: completed for MVP scope using printable HTML.

### Phase 8: Event Readiness

- verify deployment settings in Vercel
- verify environment variables
- test end-to-end flows
- test admin access
- test exports and PDF downloads
- perform a final content review

Status: current active phase.

## Technical Priorities

When implementation begins, priorities should be:

1. reliability over cleverness
2. simple deployability over architectural purity
3. mobile usability over feature expansion
4. minimal dependencies over convenience-heavy packages
5. event readiness over long-term extensibility

## Risks To Watch

The main technical risks are:

- adding too much complexity for a short-lived event app
- using heavy libraries for PDF or Excel generation
- spreading business logic across UI components
- leaving admin protection as frontend-only behavior
- underestimating testing before the event date

Current watch items:

- the local Windows environment does not currently have Node tooling on `PATH`, so local commands may need to be run through the full `node.exe` path unless the user fixes `PATH`
- the browser-based PDF approach depends on the client browser print dialog rather than a binary PDF generated on the server
- admin access is appropriate for a phase 1 church event app, but it is still intentionally lightweight

## Suggested Build Order For The First Coding Sessions

When implementation starts, the recommended order is:

1. scaffold the Next.js app and folder structure
2. create the Supabase project and schema
3. add the survey categories and questions
4. build the participant survey flow
5. build scoring and result generation
6. build the admin PIN gate
7. add charts and export
8. add PDF output
9. verify deployment and production readiness

## Recommended First Task In The Next Session

If the next session is ready to continue, the first practical task should be:

1. perform a careful manual QA pass across the full app
2. note any visual or UX issues discovered in mobile and desktop
3. prepare Vercel environment variables
4. deploy and validate the production instance

This is now the shortest path to meaningful product progress.

## Definition Of Ready For Launch

Before the application is considered ready for the event, it should satisfy at least these conditions:

- survey flow works on mobile
- answers are stored correctly
- results show one strength and two weaknesses correctly
- full suggestions are shown for weak categories
- admin route is protected by a server-side PIN check
- aggregate charts load correctly
- export works correctly
- PDF download works correctly
- production deployment is stable in Vercel

Additional practical readiness checks now relevant:

- landing page wording and branding feel appropriate for church participants
- admin PIN flow behaves correctly after login and logout
- CSV export opens cleanly in Excel
- printable PDF opens cleanly and can be saved from common browsers

## Future Session Continuity

When a future session resumes implementation, the expected workflow should be:

- read `design.md` first for product decisions
- read `plan.md` second for execution order
- continue from `Phase 8: Event Readiness` unless new issues are discovered
- keep the architecture lightweight unless a clear need appears

## Quick Resume Checklist

If a new session needs a fast handoff summary, assume this:

- `design.md` already contains the core product decisions, survey categories, approved draft questions, and improvement suggestions
- `plan.md` already contains the target stack, deployment approach, folder structure, implementation phases, and current implementation snapshot
- the app is no longer just scaffolded; the participant and admin MVP flows are already implemented
- the Supabase schema and seed are already applied in the real project
- the application content is now in Spanish
- the landing page already uses church branding and keeps admin access in the footer
- survey submissions already persist to Supabase
- results, printable PDF, admin PIN, CSV export, and presentation mode are already implemented
- the next milestone is QA, deployment preparation, and production rollout rather than core feature development

## Current Implemented Routes Snapshot

The current repository already has these meaningful routes:

- `/` simplified landing page for participants, with only the public survey CTA visible and admin access kept in the footer
- `/encuesta` full participant flow with audience selection, intro note, 20-question survey, and save to Supabase
- `/resultado?token=...` personalized result screen with 1 strength, 2 weaknesses, and suggestions
- `/administracion` PIN-protected dashboard with aggregate metrics
- `/administracion/presentacion` guided presentation mode over the aggregate data
- `/api/survey` survey definition loading and submission persistence
- `/api/admin/pin` admin login/logout session handling
- `/api/export` administrative CSV export
- `/api/pdf?token=...` printable participant result

## Notes For The Next Session

- Do not re-open the core architecture unless a real deployment blocker appears.
- The current system is intentionally lightweight and suitable for an event MVP.
- If the next session focuses on deployment, prioritize Vercel environment setup and production QA over new features.
- If the next session focuses on polish, prioritize only high-signal fixes discovered during real testing.
- Avoid adding heavy dependencies for PDF or Excel unless a concrete production problem justifies the cost.
