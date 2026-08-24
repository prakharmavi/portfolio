# Domain docs

This repository uses a single-context domain-document layout.

## Before exploring

Read these files when they exist:

- `CONTEXT.md` at the repository root
- Relevant ADRs under `docs/adr/`

Proceed silently when either location does not exist. The domain-modeling skill creates these files when the project resolves domain terms or architectural decisions.

## File structure

```text
/
├── CONTEXT.md
├── docs/
│   └── adr/
└── src/
```

## Use glossary terms

When an issue, refactor proposal, hypothesis, or test names a domain concept, use the term defined in `CONTEXT.md`. Do not replace it with a synonym that the glossary rejects.

If the glossary does not define a needed concept, reconsider whether the project uses that language. Record genuine vocabulary gaps for the domain-modeling skill.

## Flag ADR conflicts

Call out any proposal that contradicts an existing ADR. Name the ADR and explain why the decision may need reconsideration instead of silently overriding it.
