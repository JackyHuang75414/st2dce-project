# Incident timeline

> One line per event, **UTC timestamps**, written live by the scribe during the drill
> (do not reconstruct it afterwards - the value is in the real timestamps).

| Time (UTC) | Actor | Event | Evidence |
|---|---|---|---|
| 2026-11-24T14:00:00Z | saboteur | Fault injected: TODO describe exactly what was changed and how | `kubectl` command / screenshot |
| 2026-11-24T14:01:30Z | monitoring | Alert `HighErrorRate` fired | Alertmanager / Grafana screenshot |
| 2026-11-24T14:03:00Z | responder | Acknowledged the alert, opened the dashboard | dashboard screenshot |
| 2026-11-24T14:05:00Z | responder | Hypothesis 1 tested and rejected | query output |
| 2026-11-24T14:08:00Z | responder | Mitigation applied (rollback / scale / fix) | `kubectl rollout undo ...` output |
| 2026-11-24T14:10:00Z | responder | Service restored, error ratio back to baseline | Grafana graph |
| 2026-11-24T14:15:00Z | team | All-clear, incident closed | - |

## Notes for the scribe

- Record the **first** symptom time, not the alert time.
- Write the command and the observed output for each action.
- Mark clearly which actions were mitigation (restore service) and which were
  diagnosis (understanding the cause).
