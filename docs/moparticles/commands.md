---
title: Commands
order: 3
---

# Commands

All commands live under `/moparticles` (tab-completion enabled).

| Command | Description |
| --- | --- |
| `/moparticles list` | List every loaded effect by ID |
| `/moparticles play <effect> <x> <y> <z> [radius]` | Play an effect at a specific location |
| `/moparticles playhere <effect> [radius]` | Play an effect at your current location |
| `/moparticles stop <id>` | Stop a specific playing animation |
| `/moparticles stopall` | Stop every playing animation |
| `/moparticles reload` | Re-scan `particles/` and reload all effects (pack is regenerated) |
| `/moparticles info <effect>` | Show details about an effect (frames, texture, emitter) |

All commands accept **shorthand effect IDs** — see [Effect IDs](/docs/moparticles/particles#effect-ids) for the resolution rules.

## Examples

```text
# List what's loaded
/moparticles list

# Play fire 3 blocks above ground at the spawn area
/moparticles play snowstorm:fire 0 70 0 8

# Play the loading spinner right where you are, 12-block radius
/moparticles playhere snowstorm:loading 12

# Stop a specific animation (the ID is shown when you play an effect)
/moparticles stop 8f3c2a1e-6b4d-4c2a-9e1f-2d3c4b5a6f7e

# Stop everything
/moparticles stopall

# Inspect an effect
/moparticles info snowstorm:fire
```

## Permissions

By default the commands are available to operators. If your permission system (LuckPerms, EssentialsX, etc.) manages plugin permissions, nodes follow the standard `<plugin>.<command>` pattern, e.g.:

```text
moparticles.use        # all commands
```
