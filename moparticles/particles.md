# Particle format

MoParticles reads **Bedrock `particle_effect` JSON files** — the same format used by resource packs and the SnowStorm effect library. The goal is broad compatibility: components MoParticles doesn't understand are safely ignored, so most Bedrock effect files just work.

## Where particles live

Drop `.json` files into:

```text
plugins/MoParticles/particles/
```

Three effects are bundled by default (`fire.json`, `loading.json`, `rainbow.json`). After adding or changing files, run:

```text
/moparticles reload
```

or restart the server.

## File structure

A particle file has a `format_version`, a `particle_effect` object with a `description`, and a `components` block:

```json
{
  "format_version": "1.10.0",
  "particle_effect": {
    "description": {
      "identifier": "snowstorm:fire",
      "basic_render_parameters": {
        "material": "particles_add",
        "texture": "textures/particle/moparticles/cube"
      }
    },
    "components": {
      "minecraft:emitter_rate_steady": {
        "spawn_rate": 45,
        "max_particles": 100
      },
      "minecraft:emitter_lifetime_looping": {
        "active_time": 1
      },
      "minecraft:emitter_shape_point": {
        "offset": ["math.random(-0.1, 0.15)", 0, "math.random(-0.1, 0.15)"]
      },
      "minecraft:particle_lifetime_expression": {
        "max_lifetime": "math.random(1, 1.5)"
      },
      "minecraft:particle_initial_speed": 0,
      "minecraft:particle_motion_dynamic": {
        "linear_acceleration": [0, 2.5, 0],
        "linear_drag_coefficient": 1
      },
      "minecraft:particle_appearance_billboard": {
        "size": [0.15, 0.15],
        "facing_camera_mode": "rotate_xyz",
        "uv": {
          "texture_width": 16,
          "texture_height": 16,
          "uv": [0, 0],
          "uv_size": [16, 16]
        }
      },
      "minecraft:particle_appearance_tinting": {
        "color": ["1.0", "0.85", "0.2", "1"]
      }
    }
  }
}
```

### `description`

| Field | Type | Description |
| --- | --- | --- |
| `identifier` | string | The effect ID, e.g. `snowstorm:fire`. This is what you use in commands and the API |
| `basic_render_parameters.texture` | string | Texture path used for the effect, e.g. `textures/particle/moparticles/cube` |
| `basic_render_parameters.material` | string | `particles_add` or `particles_alpha` |

### Supported components

| Component | Purpose |
| --- | --- |
| `minecraft:emitter_initialization` | Run MoLang on emitter creation (`creation_expression`) — declare `variable.*` state |
| `minecraft:emitter_lifetime_once` | Emitter fires once (`lifetime`) |
| `minecraft:emitter_lifetime_looping` | Emitter loops for a duration (`active_time`) |
| `minecraft:emitter_lifetime_expression` | Emitter lifetime from a MoLang expression (`max_lifetime`) |
| `minecraft:emitter_rate_steady` | Steady spawn rate (`spawn_rate`, `max_particles`) |
| `minecraft:emitter_rate_instant` | Burst-spawn a fixed count (`num_particles`) |
| `minecraft:emitter_rate_manual` | Reserved for manual spawning (no auto-spawn) |
| `minecraft:emitter_shape_point` | Spawn at a point, with an optional `offset` |
| `minecraft:emitter_shape_box` | Spawn inside a box |
| `minecraft:emitter_shape_sphere` | Spawn inside/around a sphere |
| `minecraft:emitter_shape_disc` | Spawn inside a disc |
| `minecraft:emitter_shape_custom` | Custom shape data |
| `minecraft:emitter_shape_entity_aabb` | Spawn within an entity-sized box |
| `minecraft:particle_initial_speed` | Fixed initial speed, or a MoLang expression |
| `minecraft:particle_initial_velocity` | Initial velocity vector (x/y/z, each a number or expression) |
| `minecraft:particle_motion_dynamic` | Acceleration, drag, and wind (`linear_acceleration`, `linear_drag_coefficient`) |
| `minecraft:particle_motion_parametric` | Position/velocity/rotation curves over life (`x`, `y`, `z` curve objects) |
| `minecraft:particle_appearance_billboard` | Size (constant or expression), facing mode, and UV layout |
| `minecraft:particle_appearance_tinting` | RGB(A) color per particle — each channel may be a MoLang expression |

Components present in a file but **not** in this table (for example `minecraft:particle_initial_spin` or `minecraft:emitter_local_space`) are ignored, which keeps Bedrock files valid.

## MoLang support

Anywhere a value may be an expression, you can use:

- **Variables** — `variable.particle_age`, `variable.particle_lifetime`, `variable.emitter_age`, plus any `variable.*` you declare in `emitter_initialization`.
- **Math functions** — the common MoLang set: `math.random`, `math.sin`, `math.cos`, `math.abs`, `math.pow`, `math.sqrt`, `math.floor`, `math.ceil`, `math.clamp`, `math.lerp`, `math.log`, etc.
- **Operators** — standard arithmetic, comparison, and ternary (`? :`) operators.

For example, a classic fade-out tint:

```json
"minecraft:particle_appearance_tinting": {
  "color": [
    "1.0 - 0.8 * (variable.particle_age / variable.particle_lifetime)",
    "0.85 * math.pow(1.0 - (variable.particle_age / variable.particle_lifetime), 2)",
    "0.2",
    "1 - (variable.particle_age / variable.particle_lifetime)"
  ]
}
```

## Effect IDs

Commands and the API accept a few forms of an effect ID:

| You type | Resolves to |
| --- | --- |
| `snowstorm:fire` | `snowstorm:fire` (exact match) |
| `fire` | `moparticles:fire` (namespace defaults to `moparticles`), or any loaded ID ending in `:fire` |
| `FIRE` | case-insensitive match |

## Adding your own textures

Texture files referenced by your effects are looked up in:

```text
plugins/MoParticles/textures/particle/
```

Two textures ship by default: `circle.png` and `cube.png`. The generated resource pack includes everything it finds here, so a custom `.png` + a `.json` effect is all you need to add a brand-new look.

## Full bundled example

The complete `snowstorm:fire` effect ships in the repository at [`src/main/resources/particles/fire.json`](https://github.com/Chest-Solutions/MoParticles/blob/main/src/main/resources/particles/fire.json) — it's a good template: steady emission, a looping emitter, dynamic motion (upward acceleration + drag), and an age-based color tint.
