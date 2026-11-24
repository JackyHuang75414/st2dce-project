# k8s/ - Kubernetes deployment (R4, 3 pts)

## What must be here

- `base/`: `deployment.yaml`, `service.yaml`, `configmap.yaml`, `secret.yaml` (+ `kustomization.yaml`)
- `overlays/`: `dev/`, `staging/` (and `preview/` if you use it for ephemeral environments)

## Acceptance criteria from the brief

- Deployment, Service, ConfigMap, **Secret**
- **Liveness and readiness probes** on `/health`
- **Resource requests and limits**
- **At least 2 replicas** and a rolling update strategy
- Image tag linked to a commit, usable `kubectl rollout history`

## Applied by hand (before Terraform takes over)

```bash
kubectl create namespace dev
kubectl apply -k k8s/overlays/dev
kubectl rollout status deployment/app -n dev
kubectl port-forward -n dev svc/app 8080:80
curl http://localhost:8080/health
```

The GHCR package is private: create the pull secret before applying.

```bash
kubectl create secret docker-registry ghcr-pull -n dev \
  --docker-server=ghcr.io --docker-username=<user> --docker-password=<token>
```
