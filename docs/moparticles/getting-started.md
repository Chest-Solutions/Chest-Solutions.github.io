---
title: Getting started
order: 2
---

# Getting started

## Requirements

| Requirement | Version |
| --- | --- |
| Server software | Paper (1.21.x — built and tested on 1.21.11) |
| Java | 21+ |
| Client | 1.21.x (item-display models require a recent client) |

> **Note:** MoParticles is a Paper plugin. It will not run on plain Spigot, CraftBukkit, or BungeeCord.

## Installation

1. Download the latest `MoParticles-x.x-all.jar` from the [releases page](https://github.com/Chest-Solutions/MoParticles/releases).
2. Drop the jar into your server's `plugins/` folder.
3. Start (or restart) the server. On boot you should see:

   ```text
   [MoParticles] Loaded 3 particle effect(s).
   MoParticles v1.1.0 enabled.
   ```

4. That's it. There is no configuration file to edit — the plugin works out of the box.

## Your first effect

With the server running, give a player the `moparticles` command permission (or run it as an operator) and try:

```text
/moparticles playhere snowstorm:rainbow
```

This plays the bundled rainbow effect at your current location with a default radius of 10 blocks.

## The resource pack

MoParticles generates a resource pack on boot at:

```text
plugins/MoParticles/generated/resourcepack.zip
```

The pack contains the **item models** and **particle textures** that the animations are built from. Players need this pack installed for the effects to render correctly:

- Share the zip with your players (a download link, a media folder, or your launcher's pack directory).
- If you add new particle files later, the pack is regenerated the next time the plugin loads — redistribute the updated zip when you do.

> The pack is regenerated from your `particles/` and `textures/` folders, so it always matches what's loaded.

## Folder layout

Everything MoParticles owns lives under `plugins/MoParticles/`:

```text
plugins/MoParticles/
├── particles/          # your .json effect files (3 bundled by default)
├── textures/
│   └── particle/       # texture files (circle.png, cube.png bundled)
└── generated/
    └── resourcepack.zip
```

## Configuration (optional)

MoParticles has zero required settings. If you need to debug, create `plugins/MoParticles/config.yml`:

```yaml
# Log extra diagnostics to the console while effects are playing
debug: false
```

Then restart the server (or use `/moparticles reload` after editing).

## Building from source

If you prefer to build MoParticles yourself, you need **JDK 21**:

```bash
git clone https://github.com/Chest-Solutions/MoParticles.git
cd MoParticles
./gradlew shadowJar
```

The shaded jar is written to `build/libs/`.
