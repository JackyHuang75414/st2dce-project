# Working conventions (R1 - Git and collaboration)

## Branches

| Branch | Use |
|---|---|
| `main` | Always releasable. Protected: no direct push, no force push. |
| `feat/<topic>` | One feature per branch, e.g. `feat/k8s-manifests`, `feat/terraform`, `feat/dashboards` |
| `fix/<topic>` | Bug fixes, e.g. `fix/probe-timeout` |
| `docs/<topic>` | Documentation only |

Keep branches short-lived (a few days max). Rebase on `main` before opening the pull
request so the history stays linear:

```bash
git switch main && git pull
git switch feat/my-topic
git rebase main
git push --force-with-lease
```

## Commit messages

Conventional commits, imperative mood, one logical change per commit:

```
feat(k8s): add readiness and liveness probes
fix(ci): pin trivy-action version
docs(runbook): document the database failover procedure
chore(deps): bump express to 5.3.1
```

## Pull requests

1. One reviewer is enough on a four-person team, but **never merge your own PR
   without review** - the brief grades reviewed merge requests.
2. PR description must state what changed, how it was tested, and the evidence
   (command output, screenshot, link to a CI run).
3. The `Build and test`, `Security scan` and `Build image` jobs must be green.
4. Squash merge, then delete the branch.

## Never commit

- credentials, tokens, kubeconfigs, `*.tfstate`, `.env` files
  (`.gitignore` covers the usual cases, and the CI runs gitleaks);
- build artefacts (`node_modules/`, images, coverage reports).

If a secret is committed by mistake, tell the team immediately: it must be revoked
and purged from the history, not merely deleted in a later commit.
