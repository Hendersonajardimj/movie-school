# Movie School Editor Handoff

This guide is for editors who want to update curriculum/content without writing code.

## Goal

You should be able to:

1. Create a GitHub account.
2. Edit lesson files in the browser.
3. Propose changes safely (without pushing directly to `main`).
4. Get changes reviewed and published.

---

## 1) Create a GitHub account

1. Go to [https://github.com/signup](https://github.com/signup).
2. Sign up with your email.
3. Verify your email and log in.
4. Send your GitHub username to the project owner (Josh) so you can be added as a collaborator.

Once invited, accept the repository invitation in your email or GitHub notifications.

---

## 2) Open the repo

Repository:

- [https://github.com/Hendersonajardimj/movie-school](https://github.com/Hendersonajardimj/movie-school)

Main curriculum content lives in:

- `content/weeks/`
- Collaboration/brainstorm doc:
  - `docs/curriculum-suggestions.md`

Each lesson is one Markdown file, for example:

- `content/weeks/week-01-do-the-right-thing.md`

---

## 3) Make edits without touching `main` (recommended)

Always use a branch + pull request for suggested edits.

### Browser-only workflow (no terminal needed)

1. Open the file you want to edit in GitHub.
2. Click the pencil icon (`Edit this file`).
3. Make your edits.
4. Scroll to **Commit changes**.
5. Select: `Create a new branch for this commit and start a pull request`.
6. Give branch a clear name, like:
   - `edit/week-04-thesis-update`
   - `edit/week-08-prompts-rewrite`
7. Click **Propose changes**.
8. Open the pull request (PR), add a short summary of what changed and why.
9. Request review from Josh (and/or other editors).

After approval, the PR is merged into `main`.

---

## 4) What happens after merge?

If Railway is connected to GitHub auto-deploy for this repo:

1. PR is merged to `main`.
2. Railway automatically rebuilds and redeploys.
3. Live site updates after deploy succeeds.

If Railway is not connected yet, Josh can deploy manually.

---

## 5) Markdown quick guide (only what you need)

Inside each lesson file, there are two parts:

1. **Frontmatter** at the top between `---` and `---` (structured fields)
2. **Body content** below that (normal paragraph text)

### Frontmatter example

```md
---
slug: week-01-do-the-right-thing
week: 1
arc: power-and-systems
arcTitle: Power and Systems
films:
  - title: The War of the Worlds (Orson Welles Radio Broadcast)
    year: 1938
    runtime: 60
  - title: Network
    year: 1976
    runtime: 121
poster: /posters/week-01.svg
thesis: Media power compounds when urgency outruns verification.
outcomes:
  - contextual-awareness
  - emotional-resilience
prompts:
  - Which conflict in the film looked personal but was actually systemic?
  - Where did you see people talking past each other rather than listening?
  - What scene most challenged your assumptions about fairness?
actionStep: "In one disagreement this week, map the structural pressures before judging the people."
furtherViewing:
  - La Haine (1995)
---
```

### Safe editing rules

1. Keep the same field names (do not rename keys).
2. Keep indentation exactly for list items (`two spaces + -`).
3. If a sentence includes a colon `:`, wrap it in quotes:
   - `actionStep: "Do this: then do that."`
4. Keep top and bottom `---` lines.
5. Only edit one lesson per PR when possible (easier review).

---

## 6) Common edits editors can make

1. Improve `thesis` language.
2. Rewrite `prompts` for better discussion quality.
3. Update `actionStep` for practical clarity.
4. Add or revise `furtherViewing`.
5. Improve body paragraphs for voice and flow.

---

## 7) Use AI to help draft edits

You can paste a lesson into ChatGPT/Claude and ask for a revision, then copy edits back into GitHub.

### Prompt template

```text
You are editing a curriculum lesson for Movie School.
Keep the same YAML keys and structure.
Rewrite for clarity, stronger voice, and practical impact.
Do not remove fields. Keep 3+ reflection prompts.
If any value has a colon, quote it.
Return the full updated markdown file.
```

Before committing, compare AI output to original and keep only changes you agree with.

---

## 8) PR checklist (copy into PR description)

- [ ] I edited the correct file in `content/weeks/`.
- [ ] I did not edit directly on `main`.
- [ ] Frontmatter keys are unchanged.
- [ ] List indentation and formatting are valid.
- [ ] Any value with `:` is wrapped in quotes.
- [ ] I explained what changed and why.

---

## 9) If something breaks

If GitHub shows conflicts or build errors:

1. Leave the PR open.
2. Add a comment describing what you changed.
3. Tag Josh for help.

Do not force-merge a PR with failing checks.

---

## 10) Optional team workflow conventions

Recommended:

1. One person edits content.
2. One person reviews tone/curriculum quality.
3. One person approves for publish.

Branch naming:

- `edit/week-XX-topic`
- `edit/arc-power-systems-pass`
- `edit/copy-style-pass`

PR title format:

- `Week 07: tighten prompts and action step`
- `Arc 1 pass: thesis clarity edits`

---

## 11) Best collaboration pattern (recommended)

Use each channel for one specific purpose:

1. `docs/curriculum-suggestions.md`:
   - Brainstorming
   - Candidate films
   - Open questions
   - Draft ideas not ready for production
2. Pull requests:
   - Actual lesson edits in `content/weeks/*.md`
   - Structured review and approval
3. PR comments:
   - Inline feedback on exact lines
   - Revision requests

Optional:

4. GitHub Discussions:
   - Big-picture strategy debates across arcs
   - Long-running editorial conversations

Simple rule:

- If it changes live curriculum behavior, use a PR.
- If it is early thinking, put it in `docs/curriculum-suggestions.md`.
