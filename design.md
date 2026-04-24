# Marriage Survey Project Design

## Document Purpose

This document captures the current product and architecture agreements for the marriage survey application.

It should guide future sessions so the project can move forward without redefining the same basics repeatedly.

This document is for design decisions only. It does not mean the application should be implemented yet.

## Product Summary

This project is a web application for a church marriage evaluation process.

The application will let a participant enter the survey flow, identify whether the person is a man or a woman, answer a personalized set of questions, and receive a simple results summary showing strengths and weaknesses.

The application should feel custom and intentional, not like a generic form tool. Even though a similar process could be done in Google Forms, the goal here is a more personalized experience with a cinema-inspired visual identity.

## Current Design Status

The following product decisions are already defined and should be treated as settled unless intentionally revised later:

- the app is a church marriage survey web application for a specific event
- the stack baseline is Next.js on Vercel with Supabase
- the participant flow is mobile-first and immersive, with no distracting admin navigation
- the survey uses separate question sets for men and women
- each participant answers 20 questions
- the answer scale is numeric from 1 to 5
- the survey uses 4 categories with 5 questions per category
- the current 40 questions are the approved working baseline
- the final result shows 1 strength and 2 weaknesses
- every weak category should show its full suggestion list
- the admin area is separate and protected by a lightweight server-verified PIN
- the admin area should support aggregate charts, Excel-compatible export, and presentation mode
- the app should avoid storing participant names

The next design work should build on these decisions instead of reopening them by default.

## Product Positioning

This is not a general survey platform.

It is a focused church application for marriage self-evaluation, with:

- personalized question sets by gender
- private individual results
- anonymous aggregate reporting for church leadership
- a branded visual identity inspired by movie review sites such as Rotten Tomatoes

## Core User Experience Direction

The application should have a cinema or movie review theme.

The visual language should feel inspired by film critics, ratings, reviews, scorecards, and cinematic presentation, while still being respectful and appropriate for a church context.

This does not mean the app should become playful or unserious. The theme is mainly for branding, visual identity, and interaction style.

The public survey experience should feel immersive and uninterrupted.

The main participant flow should avoid navigation bars, admin links, or other interface elements that distract from the question-by-question experience.

## Main Survey Flow

The expected participant flow is:

1. user enters the application
2. user selects whether they are man or woman
3. user answers 20 questions shown one at a time
4. each question belongs to a category
5. answers are stored in the database
6. the application shows a simple summary of strongest and weakest areas
7. the user can download the results as a PDF

The default survey route should prioritize immersion over site-style navigation.

That means the participant flow should feel more like a guided experience than a traditional dashboard.

## Gender-Based Question Logic

The survey will have two different question sets:

- one set for men
- one set for women

Each person should only see the version that applies to the selected gender.

The final exact questions are not defined yet.

For now, the system design should assume:

- 20 questions for men
- 20 questions for women
- temporary generic questions can be used during early development
- the real wording will be defined later

## Question Structure

Each question should belong to a category.

The categories will later be used to summarize results and identify strengths and weaknesses.

The questions should not remain too broad or easy to answer in a vague way.

The preferred direction is to write questions that are more specific, concrete, and personally confronting, so that a participant is less likely to answer positively based only on occasional behavior.

For example, the wording should avoid overly general ideas such as "do I love my spouse?" without practical context.

Instead, questions should point toward recognizable habits, attitudes, and repeated conduct in daily married life.

The goal is not to shame the participant, but to encourage honest self-examination in the light of Christ.

## Survey Categories And Draft Questions

The survey structure should use 4 categories with 5 questions each, for a total of 20 questions per participant.

These categories are shared conceptually across the survey, but the wording of the questions is different for men and women.

The current agreed categories are:

- Communion with Christ
- Love and Order in the Home
- Grace in the Relationship
- Faithfulness and Testimony

These draft questions are currently treated as the working baseline and should be preserved unless intentionally revised later.

### Participant Intro Note Draft

This form is personal and confidential. Answer honestly before God, thinking about the real condition of your marriage and not only how you would like it to be seen. The purpose of this evaluation is not condemnation, but to help identify strengths and areas that need growth so that Christ may be seen more clearly in your marriage.

### Questions For Men

#### Communion with Christ

1. In recent weeks, have I consistently set apart time to pray and meditate on God's Word, or has my communion with God been neglected?
2. Do I usually initiate or promote family devotions at home, instead of waiting for them to happen only occasionally?
3. When I must make decisions for my home, do I seek God's direction first, or do I act only according to my own judgment?
4. Can my wife see real evidence of godliness in my daily life, such as self-control, prayer, obedience, and fear of God?
5. When I notice spiritual coldness in my home, do I take responsibility to encourage my family toward Christ?

#### Love and Order in the Home

1. Do I serve my wife in concrete day-to-day needs, or do I usually expect to be served?
2. Is my leadership in the home reflected in care, example, and sacrifice, or more in imposition, passivity, or comfort?
3. Do I take initiative to talk with my wife about her spiritual, emotional, and practical burdens?
4. Do I assume my responsibility to lead the home toward Christ even when I am tired, busy, or discouraged?
5. Do the decisions I make at home show love and consideration for my wife, or do they usually revolve mainly around me?

#### Grace in the Relationship

1. When my wife expresses a concern to me, do I listen patiently, or do I defend myself before understanding her?
2. In the middle of conflict, do I control my tone, my words, and my gestures, or do I react with harshness, hurtful silence, or impatience?
3. When I sin against my wife, do I ask for forgiveness clearly and sincerely, without justifying myself or minimizing what I did?
4. Do I treat my wife with honor in private as well, not only in front of others?
5. In recent weeks, have I cultivated conversations that build up my wife, or has most of our interaction been merely functional, cold, or tense?

#### Faithfulness and Testimony

1. Have I guarded my mind, eyes, and heart in faithfulness to my wife, avoiding the feeding of impure thoughts or conduct?
2. Do I manage my time, money, and priorities responsibly, or have I neglected important areas of the home?
3. Does my conduct inside and outside the home reflect the same Christianity, or do I show a different image depending on who sees me?
4. Am I modeling a marriage that honors Christ before my family, church, and others?
5. Does my wife feel secure in my integrity, consistency, and commitment to our marriage covenant?

### Questions For Women

#### Communion with Christ

1. In recent weeks, have I consistently set apart time to pray and meditate on God's Word, or has my communion with God been neglected?
2. Do I participate with willingness and seriousness in family devotions, instead of treating them as something secondary?
3. When I face burdens or frustrations in the home, do I seek the Lord first before reacting?
4. Can my husband see real evidence of godliness in my daily life, such as meekness, obedience, prayer, and fear of God?
5. When I notice spiritual coldness in my home, do I encourage my family toward Christ with a godly example and attitude?

#### Love and Order in the Home

1. Do I treat my husband with respect in the way I speak to him, correct him, and refer to him?
2. Do I submit to his leadership in love when it does not involve sin, or do I usually resist it because of pride, anger, or a desire to control?
3. Do I support my husband in his spiritual responsibility, or do I weaken his leadership with constant criticism, contempt, or indifference?
4. Do I seek to build the atmosphere of the home with wisdom, service, and willingness, even on difficult days?
5. Do the attitudes I bring into the home help create peace and order, or do they usually increase tension and weariness?

#### Grace in the Relationship

1. When my husband speaks to me about something that needs correction or conversation, do I listen with humility, or do I react immediately with defensiveness or annoyance?
2. In the middle of conflict, do I control my tone, my words, and my gestures, or do I react with harshness, contempt, or hurtful silence?
3. When I sin against my husband, do I ask for forgiveness clearly and sincerely, without justifying myself or shifting blame?
4. Do I avoid using words, comparisons, or attitudes that humiliate or weaken my husband?
5. In recent weeks, have I tried to speak to my husband in a way that makes him feel respected, encouraged, and built up?

#### Faithfulness and Testimony

1. Have I guarded my mind, eyes, and heart in faithfulness to my husband, avoiding the feeding of impure thoughts or conduct?
2. Do I manage my time, resources, and priorities responsibly within the home?
3. Does my conduct inside and outside the home reflect the same Christianity, or do I project a different image depending on who sees me?
4. Am I contributing to making our marriage reflect Christ before family, church, and others?
5. Can my husband trust my integrity, consistency, and commitment to our marriage covenant?

## Answer and Scoring Direction

The answer format should use a numeric scale from 1 to 5.

This is now the default agreed response model for the project.

The first version should avoid heavy or complex analysis.

The intended result logic is:

- group answers by category
- calculate simple category scores using averages or another lightweight method
- show the categories with the strongest scores
- show the categories with the weakest scores

If lightweight unsupervised grouping is later useful, it can be evaluated, but the current preferred direction is not machine learning for its own sake. A simple and explainable method is better for the MVP.

## Results Experience

At the end of the survey, the participant should receive an individual result summary.

That summary should:

- show strongest areas
- show weakest areas
- be based on category-level scoring
- be easy to understand on mobile
- be available for PDF download

The current preferred summary format is:

- 1 strongest category
- 2 weakest categories
- all practical improvement suggestions associated with each weak category

The suggestions should be simple, encouraging, and actionable.

They should not feel clinical or overly technical.

The application should not try to present the result as a clinical or psychological diagnosis. It is a reflective summary of self-reported answers.

## Improvement Suggestions Bank

The survey results should be able to show concrete improvement suggestions for weak categories.

These suggestions should not stay abstract. They should point to real next steps that a couple can apply in the coming days.

The current results direction is to show all suggestions tied to each weak category selected for the final summary.

That means if a category appears among the 2 weakest areas, the participant should see the full set of suggestions prepared for that category, not only one or two example tips.

The preferred suggestion style is:

- short and direct
- pastoral in tone
- specific enough to create action
- oriented toward concrete goals for the current week

The following suggestion bank is the current approved baseline.

### Communion with Christ

- Define 3 fixed days this week to have a family devotion for 10 to 15 minutes.
- Read a short Bible passage together, and at the end let each spouse say 1 truth, 1 sin to correct, and 1 prayer request.
- Set a daily 5-minute alarm to pray specifically for your marriage.
- Write down 2 spiritual areas where your home has grown cold, and pray about them together for 7 days.
- Before making an important household decision, commit to praying together first instead of reacting immediately.

### Love and Order in the Home

- The husband should define 2 concrete actions of spiritual leadership for this week, such as initiating a devotion and opening a spiritual conversation with his wife.
- The wife should aim to respond with verbal respect during tense conversations throughout the week, avoiding interruption, raised voice, or ridicule.
- Have one conversation this week to redistribute 3 household responsibilities that are currently creating burden or frustration.
- The husband should ask his wife once this week what emotional or practical burden she is carrying, and listen without correcting her immediately.
- The wife should seek one concrete daily way to support her husband's leadership without criticism or unnecessary resistance.

### Grace in the Relationship

- When conflict appears, agree to take a 10-minute pause before continuing if either spouse feels close to reacting harshly.
- Practice asking for forgiveness with this structure: specific sin, no excuses, recognition of harm, and desire to change.
- Set apart 30 minutes this week to talk about one unresolved tension without phones or distractions.
- For 7 days, consciously eliminate sarcasm, punishing silence, and humiliating words.
- At the end of 3 days this week, each spouse should tell the other 1 thing they are thankful for and 1 area where they personally want to grow.

### Faithfulness and Testimony

- Do a personal review this week of habits that weaken faithfulness, such as consumed content, improper conversations, flirtation, fantasy, or neglect.
- Make 1 concrete decision this week to cut off a source of temptation.
- Review together how time and money are being used, and adjust 1 priority that does not reflect a Christ-centered home.
- Ask one another, "Is what we show in church the same as what we live at home?" and write down 2 concrete changes.
- Commit this week to 1 visible act of Christian witness as a couple, such as serving, reconciling with someone, praying with another couple, or helping a need.

## Participant Intro Note

Before the questions begin, the survey should show a short introductory note.

That note should communicate these ideas clearly:

- this is a personal and confidential form
- the person should answer with honesty before God
- the purpose is the benefit, strengthening, and examination of the marriage
- the value of the results depends on truthful answers

The tone of this note should be pastoral, direct, and respectful.

It should prepare the participant to answer sincerely rather than quickly.

## Privacy And Identity

Privacy is a core product requirement.

The system should not store participant names in the database for survey records.

The participant should not be asked to enter an identification number as part of the public survey experience.

If an internal identifier exists in the database, it should be system-oriented only and not part of the visible user flow.

The current direction is:

- no participant names in survey records
- no visible identification-number field in the participant flow
- anonymous or pseudonymous storage suitable for aggregate reporting

The goal is to reduce unnecessary exposure of personal identity while still allowing reporting and administration.

## Submission Rules

The intended use is one survey response per person.

However, the first version does not need a heavy technical enforcement system to prevent duplicate submissions.

The practical agreement is:

- participants should be instructed to respond only once
- the app does not need strong anti-duplicate enforcement for the event version
- the design should stay lightweight and appropriate for a short-lived event

## Administrative Reporting

The application should eventually support an administrator role.

The admin area should live in a separate route from the participant experience, for example `/administracion` or a similar path.

The purpose of this separation is product clarity, not only security:

- the public survey flow stays visually clean and immersive
- administration features stay out of sight for normal participants
- the app does not need a visible navbar or admin entry point in the main experience

The administrator should be able to review general aggregate results across the church population, such as:

- strongest categories overall
- weakest categories overall
- broader trends across submitted responses

The purpose of admin reporting is to understand general patterns, not to expose individual participants.

Admin reporting should be aggregated and privacy-conscious by default.

The admin area should eventually support at least these actions:

- export survey data to Excel
- review aggregate charts and summaries
- open a presentation-style immersive screen that shows result charts one by one with explanatory text

The presentation-style screen should be designed for guided review of church-wide results, not only for spreadsheet-style inspection.

The aggregate visualizations should stay lightweight and focus on averaged category results across the church.

## Mobile-First Interface Direction

The participant experience should be designed mobile-first.

The survey should work especially well on phones because it will likely be completed from a mobile device.

Important interface assumptions:

- one question at a time
- clean and focused layout
- visually attractive transitions or pacing
- good readability on small screens
- also usable on desktop without becoming a desktop-first experience
- no distracting navigation during the participant flow

## Technical Platform Baseline

The selected initial platform remains:

- Next.js for the web application
- Vercel for hosting and deployments
- Supabase for PostgreSQL database and authentication

There should not be a separate traditional backend server in phase 1 unless a real product need appears later.

## Backend Strategy

The initial version should rely on Supabase for:

- PostgreSQL database
- authentication
- authorization through Row Level Security
- basic application data access

If more server-side logic is needed later, acceptable options include:

- Next.js server actions
- Next.js route handlers
- Supabase Edge Functions

The default rule remains: do not add backend complexity before it is clearly justified.

## Authentication Direction

Authentication needs are now split into two product areas:

- participant access flow
- administrator access flow

The current direction is:

- participant access should stay as simple as possible
- the participant flow should not require a traditional full user account
- the admin area should be separate from the public flow

The current preference is not to require a full traditional admin user system in the first phase.

This is especially true because the application may be used for a short event window or even a single-day activity, so the admin access model should stay proportionate to the real risk and lifetime of the app.

However, the admin route should not rely only on a hidden URL or extra numbers in the path as the only protection. That would be weak security even for low-sensitivity data.

The preferred lightweight compromise for phase 1 is:

- a separate admin route such as `/administracion`
- a simple PIN or passcode gate
- server-side verification before allowing access to exports or aggregate data

This keeps the admin experience lightweight without pretending that obscurity alone is security.

For this project, a server-verified admin PIN is currently the preferred phase 1 approach over a full username and password system.

## Database Direction

The database should be designed around:

- question catalog
- category catalog
- survey submissions
- survey answers
- internal submission identifier
- gender-specific survey variants
- aggregated reporting support

The schema should avoid storing unnecessary personal data.

## Security Position

Security should be treated as a product requirement from the beginning.

### Security Principles

- never expose the home network
- never trust frontend-only permission checks
- enforce permissions at the database policy layer
- keep secrets server-side only
- prefer managed infrastructure over self-managed internet-facing servers
- minimize personal data collection

### Minimum Security Rules

- enable RLS on every application table
- create explicit read and write policies
- do not use the Supabase service role key in the browser
- keep Vercel environment variables scoped correctly
- use least privilege whenever possible
- do not store participant names unless there is a later justified need
- do not depend only on a secret URL path to protect administration features
- require at least a lightweight server-verified gate for admin exports and reporting
- a server-side PIN gate is acceptable for phase 1 if the app is short-lived and low-risk

## Branding And Tone Direction

The UI should feel more like a polished branded app than a spreadsheet or plain form.

The theme direction is:

- cinema-inspired
- score-oriented
- modern and visually memorable
- respectful for church use
- mobile-friendly

The design should take inspiration from the feeling of a review platform, not literally copy Rotten Tomatoes branding.

## PDF Output Direction

The first product design should assume that a participant can download a PDF summary after finishing.

The PDF should contain:

- summary of strong areas
- summary of weak areas
- suggestions for improvement on weak areas
- category-based result presentation
- clean visual styling consistent with the app

The PDF does not need to include raw technical details or full diagnostic logic.

## Admin Export Direction

The admin area should include a simple export action that generates an Excel file from the survey data stored in the database.

The export is meant for church-level analysis outside the app when needed.

The export should follow these principles:

- avoid exposing participant names
- avoid unnecessary personal identifiers
- preserve category and answer data needed for analysis
- make the file easy to open in Excel without extra transformation

## Admin Presentation Mode

The admin area should also support an immersive presentation mode.

This mode should:

- open a dedicated screen
- show charts one by one
- include a short explanation or interpretation for each chart
- be suitable for reviewing results in meetings or presentations

This is different from the normal admin dashboard view.

The dashboard is for inspection and export. The presentation mode is for guided visual storytelling of the aggregate results.

## Product Constraints

- no names should be required for the main survey record
- no visible identification-number step in the participant flow
- results should be understandable and lightweight
- the analysis method should be simple and explainable
- the application should feel custom, not like a generic forms product
- the participant flow should prioritize mobile usability
- admin reporting must avoid exposing individual identities
- the main survey interface should not be cluttered with admin navigation
- admin access can be lightweight, but not protected only by obscurity
- the app should stay light enough for free-tier hosting and services
- the app is intended for a specific event, not a full long-term survey platform
- question wording should favor specific self-examination over vague self-perception

## Open Decisions

The following points are still intentionally unresolved:

- exact admin dashboard scope
- exact admin PIN behavior, such as session duration and reset approach
- exact Excel export fields
- exact presentation-mode chart sequence and explanations
- exact PDF layout

## Suggested Next Design Sequence

Unless we intentionally change direction, the next design work should follow this order:

1. define the final participant entry screen and flow
2. define the scoring method and category aggregation details
3. define the data model
4. define the participant results view
5. define the admin reporting view
6. define the admin PIN behavior
7. define the Excel export content
8. define the presentation mode flow
9. define the PDF content and layout

## Default Assumptions For Future Sessions

Unless explicitly changed later, future work should assume:

- Stack: Next.js on Vercel + Supabase
- no self-hosting from the home network
- no separate custom backend in phase 1
- participant survey with gender-based question sets
- 20 questions per gender
- one-question-at-a-time mobile-first flow
- immersive participant experience without visible admin distractions
- 1 to 5 answer scale
- category-based scoring
- no visible participant identifier in the user flow
- anonymous or pseudonymous storage without participant names
- individual summary plus aggregate church reporting
- 1 strength, 2 weaknesses, and full category suggestion lists in the individual result
- separate admin route for exports and aggregate visualizations
- church-level charts based on averaged category results
- admin access protected by a lightweight server-verified PIN in phase 1
- PDF download at the end of the survey
- security and simplicity are higher priority than fancy architecture

## Instruction For Future Session Continuity

When this project is resumed in a future session, the working assumption should be:

- treat this document as the source of truth for current product direction
- continue with the Vercel + Supabase architecture
- design from the marriage survey use case only
- preserve the privacy-first approach
- avoid overengineering the scoring logic
- do not start implementation until the unresolved product decisions are sufficiently defined

## Quick Resume Checklist

If a new session starts and needs a fast summary, assume this:

- product and content definition are already far enough along to begin implementation planning
- the survey categories, questions, and improvement suggestions are already documented in this file
- the main remaining design decisions are around result presentation details, admin behavior details, export details, and PDF details
- the next practical document to consult after this one is `plan.md`
