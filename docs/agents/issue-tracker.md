# Issue tracker: GitHub

Issues and specs for this repo live as GitHub issues. Use the `gh` CLI for all operations.

## Conventions

- Create an issue with `gh issue create --title "..." --body "..."`. Use a heredoc for multiline bodies.
- Read an issue with `gh issue view <number> --comments`, filtering comments with `jq` and fetching labels.
- List issues with `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` and the appropriate `--label` and `--state` filters.
- Comment with `gh issue comment <number> --body "..."`.
- Apply or remove labels with `gh issue edit <number> --add-label "..."` or `--remove-label "..."`.
- Close an issue with `gh issue close <number> --comment "..."`.

Infer the repository from `git remote -v`. `gh` does this automatically inside the clone.

## Pull requests as a triage surface

**PRs as a request surface: no.**

When set to `yes`, PRs use the same labels and states as issues:

- Read a PR with `gh pr view <number> --comments` and `gh pr diff <number>`.
- List external PRs with `gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments`. Keep `CONTRIBUTOR`, `FIRST_TIME_CONTRIBUTOR`, and `NONE`. Drop `OWNER`, `MEMBER`, and `COLLABORATOR`.
- Comment, label, or close with `gh pr comment`, `gh pr edit`, and `gh pr close`.

GitHub shares one number space across issues and pull requests. Resolve a bare `#42` with `gh pr view 42`, then fall back to `gh issue view 42`.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments`.

## Wayfinding operations

The `/wayfinder` skill uses one map issue with child issues as tickets.

- A map is an issue labelled `wayfinder:map` that holds Notes, Decisions-so-far, and Fog.
- Link child tickets as GitHub sub-issues. If sub-issues are unavailable, add each child to a task list in the map and put `Part of #<map>` at the top of its body.
- Label child tickets `wayfinder:<type>`, where the type is `research`, `prototype`, `grilling`, or `task`.
- Represent blockers with GitHub issue dependencies. If dependencies are unavailable, add `Blocked by: #<n>` at the top of the child body.
- To find the frontier, list the map's open children and drop assigned or blocked tickets. The first remaining ticket in map order wins.
- Claim a ticket with `gh issue edit <n> --add-assignee @me`.
- Resolve a ticket by commenting with the answer, closing it, and adding its context pointer to the map's Decisions-so-far section.
