# monitoring/ - Observability (R6, 3 pts)

## What must be here

- `dashboards/`: Grafana dashboard exported as JSON (one panel per golden signal)
- `alerts/`: Prometheus rules (`PrometheusRule` or plain rule files)
- `loki/`: log collection configuration or the values used for the chart
- `slo.md`: the SLO definition(s) with the error budget

## Acceptance criteria from the brief

- Metrics collected (Prometheus) and **at least one Grafana dashboard**
- **At least two meaningful, symptom-based alerts** (error rate, latency or availability)
- A defined **SLO** for at least one indicator
- **Centralized logs** (Loki) with **documented example queries**
- Bonus: dashboards are usable during the incident demo (they are graded in R6/R7)

## Dashboard: the four golden signals

| Signal | Query |
|---|---|
| Traffic | `sum(rate(http_requests_total[5m]))` |
| Errors | `sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m]))` |
| Latency | `histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))` |
| Saturation | `sum(container_memory_working_set_bytes{namespace="dev"}) by (pod)` |

## Example log queries (document them here once Loki is running)

```
{namespace="dev", app="app"} |= "error"
{namespace="dev"} | json | status >= 500
{namespace="dev"} | json | duration_ms > 500
```
