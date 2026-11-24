# infra/ - Infrastructure as Code (R5, 3 pts)

## What must be here

```
infra/
├── modules/
│   └── app/            # reusable: namespace, deployments, services, config
├── envs/
│   ├── dev/            # main.tf, variables.tf, dev.tfvars, backend.tf (documented state)
│   └── staging/        # its own state
└── preview/            # ephemeral environment per pull request
```

## Acceptance criteria from the brief

- Terraform code that provisions the infrastructure (cluster, namespace, supporting
  resources) - the `kind` + `kubernetes` providers are enough
- **Variables, outputs** and a **remote or documented** state approach
- `terraform validate` and `terraform plan` run **in the pipeline**
- An **ephemeral environment** that can be created and destroyed automatically

## Rules

- Never commit `*.tfstate*` or `.terraform/` (`.gitignore` already covers them)
- **Do** commit `.terraform.lock.hcl` in every root module
- No credentials in `.tf`/`.tfvars`: pass them with `TF_VAR_*` or a secret manager
- One state per environment (`envs/<env>/`), never one giant state
