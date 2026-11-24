# Architecture

> Owner: ___
> Keep this file in sync with the real deployment: it is the reference used in the
> demo video and it justifies R4 (hybrid/multi-cloud) and R8 (rebuild from scratch).

## Components

| Component | Technology | Role |
|---|---|---|
| API | Node.js 20 + Express 5 | Serves the REST endpoints, `/health`, `/metrics`, writes JSON logs to stdout |
| Database | PostgreSQL 16 | Stores the application data (second component required by the brief) |
| Cluster | kind (local Kubernetes) | Runs both components in the `dev` namespace |
| Monitoring | kube-prometheus-stack + Loki | Metrics, dashboards, alerts, log aggregation |
| Infrastructure | Terraform | Provisions the namespace and supporting resources; ephemeral environments |

## Data flow

```
            HTTP                         SQL
User  ------------>  Service/app  ------------->  PostgreSQL
                          |  |
             /metrics     |  |  JSON logs (stdout)
                          v  v
                    Prometheus   Loki  -->  Grafana (dashboards + alerts)
```

## Design decisions

| Decision | Why |
|---|---|
| kind instead of a cloud cluster | No cloud account required; the whole stack runs on a laptop, reproducible in CI |
| Kustomize base + overlays | Same manifests for dev/staging/prod, differences explicit and reviewable |
| Image tagged with the commit SHA | Traceability: commit -> pipeline run -> image; no mutable `latest` |
| Postgres as a StatefulSet/Deployment with a PVC | Realistic stateful dependency, and it gives the incident drill something to break |
| JSON logs to stdout | Collected by the platform (Loki), no log files to rotate inside the container |

## How this design extends to hybrid / multi-cloud (R4)

The manifests keep no cloud-specific assumption: the image comes from GHCR, the
configuration comes from ConfigMaps/Secrets, and the only per-target differences
(ingress class, storage class, service type, replica count, resource sizes) live in
Kustomize overlays. On a cloud provider the `Service` becomes `LoadBalancer`, the
storage class points at the managed disk/volume CSI, and the cluster itself is
created by the cloud Terraform provider instead of `kind`; the application
manifests do not change. Terraform is split per environment (`infra/envs/<env>`),
so an on-prem cluster and a cloud cluster each keep their own state, and GitOps
(Argo CD / Flux) can pull the matching overlay per cluster.

## TODO

- [ ] Diagram of the final deployment (screenshot or mermaid) with real object names
- [ ] Decision log: monitoring stack chart version, resource sizing
