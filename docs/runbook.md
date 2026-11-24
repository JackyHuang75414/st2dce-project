# Runbook

> Owner: ___
> The brief asks for **at least two likely failure scenarios**. Each entry must be
> usable by someone who did not build the system: how to detect it, how to confirm
> it, how to mitigate it, and when to escalate.

## Scenario 1 - High error rate on the API (HTTP 5xx)

**Symptoms**
- Alert `HighErrorRate` firing (error ratio > 5 % for 5 minutes)
- Grafana: `Errors` panel above the SLO budget
- Logs: `level="error"` entries with `status=500`

**Detection**
```bash
kubectl get pods -n dev
kubectl logs -n dev deploy/app --tail=50 | grep '"level":"error"'
```

**Quick checks**
1. Did a deployment just roll out? `kubectl rollout history deployment/app -n dev`
2. Is the database reachable? `kubectl logs -n dev statefulset/postgres --tail=30`
3. Is it a single pod or all of them? (pod-level 5xx points at one instance)

**Mitigation**
- If the errors started with the last rollout: `kubectl rollout undo deployment/app -n dev`
- If the database is the cause: restart/scale it, or restore the last backup
- Communicate in the incident channel; do not debug on the running pod

**Escalation** - if the rollback does not restore the service within 10 minutes,
escalate to ___ .

## Scenario 2 - Application pods not Ready / database unavailable

**Symptoms**
- `kubectl get pods -n dev` shows `0/1 Running` or `CrashLoopBackOff`
- Alert `AppDown` / `PodNotReady` firing (availability SLO burning)

**Detection**
```bash
kubectl describe pod -n dev -l app=app | tail -30      # Events section
kubectl logs -n dev deploy/app --previous             # last crash
```

**Quick checks**
1. Readiness probe failing (`Events`: `Readiness probe failed`)? Check `/health`
   from inside the pod: `kubectl exec -n dev deploy/app -- wget -qO- localhost:3000/health`
2. `ImagePullBackOff`? The GHCR package is private: check the `ghcr-pull` secret.
3. `Pending`? Not enough CPU/memory: `kubectl describe node`.

**Mitigation**
- Wrong image / bad rollout: `kubectl rollout undo deployment/app -n dev`
- Missing configuration: fix the ConfigMap/Secret and restart the rollout
- Node pressure: free resources or add capacity to the kind cluster

**Escalation** - database restore is a destructive action: never do it alone,
call ___ .
