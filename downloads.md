---
layout: site
title: Downloads
sidebar: false
---

# Downloads

The latest release of MoParticles. Put it in your `plugins/` folder, start the server, and you're done.

<Downloads />

## Version history

| Version | Date | Notes |
| --- | --- | --- |
| [MoParticles-1.1-all.jar](https://github.com/Chest-Solutions/MoParticles/releases/download/v1.1.0/MoParticles-1.1-all.jar) | August 15, 2026 | Multi-version support |
| [MoParticles-1.0-all.jar](https://github.com/Chest-Solutions/MoParticles/releases/download/v1.0.0/MoParticles-1.0-all.jar) | — | Initial release |

## Build from source

Requires JDK 21:

```bash
git clone https://github.com/Chest-Solutions/MoParticles.git
cd MoParticles
./gradlew shadowJar
```

The shaded jar is written to `build/libs/`.
