# How we work

## Branches

- `main` is protected: only reviewed pull requests, always working.
- Each of us works on his own branch: `YUHAO`, `chealean`, `Djalli`, `yinghui`.
- One branch = one requirement (R1, R2, ...). Keep it short and rebase on `main`
  before opening the pull request.

## Commits

- Small commits, one idea per commit.
- Prefix the message: `feat(scope):`, `fix(scope):`, `docs:`, `chore:`.
- Write it in English, imperative mood ("add the probe", not "added").

## Pull requests

- Open the PR when your part is finished, target `main`.
- `main` requires **1 approval** from another member: nobody merges his own PR.
- Say what you did and how you tested it (command output, screenshot, CI link).
- Delete the branch after the merge.

## Never commit

- `.env`, tokens, kubeconfig, `*.tfstate`, `node_modules`
- If a secret is pushed by mistake: tell the team and revoke the key. Deleting it in
  a later commit is not enough, the history keeps it.
