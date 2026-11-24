# Postmortem - <incident title>

> Owner: ___
> **Blameless**: describe systems, decisions and conditions, never a person's fault.
> Replace "X deployed a bad version" with "the pipeline promoted a build whose
> integration test did not cover the failing path".

- **Date of incident:** TODO (UTC)
- **Duration:** TODO (from first symptom to all-clear)
- **Severity:** SEV-? (define the scale in this repository)
- **Author(s):** TODO
- **Status:** draft / reviewed

## Summary and impact

Two or three sentences: what broke, who or what was affected, how long, how it was
restored. Quantify when possible (error ratio, number of failed requests, SLO budget
consumed).

## Timeline (UTC)

See [`incident-timeline.md`](incident-timeline.md) and summarise the key moments here
(detection, mitigation, root cause found, all-clear).

## Root cause and contributing factors

**Root cause** - one paragraph.

**5 Whys**

1. Why did users see errors? ->
2. Why did that happen? ->
3. Why was it possible? ->
4. Why was it not detected earlier? ->
5. Why was it not prevented? ->

**Contributing factors** - what made it worse or slower to fix (missing dashboard,
noisy alert, unclear runbook, slow rollout...).

## What went well / what went poorly

| Went well | Went poorly |
|---|---|
| TODO | TODO |

## Action items

| # | Action | Owner | Deadline | Status |
|---|---|---|---|---|
| 1 | TODO (preventive: test, pipeline gate, config) | @ | YYYY-MM-DD | open |
| 2 | TODO (detective: alert, dashboard) | @ | YYYY-MM-DD | open |
| 3 | TODO (mitigating: runbook, automation) | @ | YYYY-MM-DD | open |

## Lessons learned

What would we change in the design, the pipeline or the on-call process so that the
same class of incident cannot happen again?
