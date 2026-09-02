# FAQ

## Do players need to install anything?

Yes — the **generated resource pack**. It contains the item models and particle textures the animations are built from, and it's what makes the effects render. Distribute `plugins/MoParticles/generated/resourcepack.zip` to your players (download link, shared folder, or launcher). There is no client mod and no server-side dependency beyond Paper.

## Which Minecraft versions are supported?

MoParticles is built against Paper **1.21.11** and requires **Java 21** on the server. Clients need a recent 1.21.x client for item-display models to render. If you hit an issue on a different build, [open an issue](https://github.com/Chest-Solutions/MoParticles/issues) — version support is an active goal.

## Is it laggy?

MoParticles is designed to be cheap: the MoLang simulation happens **once** when an effect is loaded (the "baking" step), and playback is a stream of vanilla item-display updates. The main cost at runtime scales with:

- the **radius** of the effect (more viewers → more updates),
- the **number of simultaneous animations**,
- how many particles per frame the effect produces.

Keep radii reasonable for busy lobbies, and use `/moparticles stopall` when you're done.

## Can I use existing SnowStorm effects?

That's the point. The three bundled effects are taken from [SnowStorm](https://github.com/JannisX11/snowstorm). Drop any compatible `particle_effect` JSON into `plugins/MoParticles/particles/` and run `/moparticles reload`.

## Why do I see invisible particles / nothing at all?

In 90% of cases the viewers just don't have the resource pack. Check:

1. The pack exists at `plugins/MoParticles/generated/resourcepack.zip`.
2. Viewers have it enabled.
3. The texture you reference actually exists (bundled: `circle.png`, `cube.png`).

## Can I edit the bundled effects?

Yes. The bundled `.json` files are copied into `plugins/MoParticles/particles/` on first boot — edit them there (don't edit the jar), then `/moparticles reload`.

## Is MoParticles free? Will it stay free?

Yes. Chest Solutions projects are free and open source — the source is on [GitHub](https://github.com/Chest-Solutions/MoParticles) and contributions are welcome.

## Where do I report bugs or request features?

The [MoParticles issues page](https://github.com/Chest-Solutions/MoParticles/issues), or the [community Discord](https://discord.gg/MsWqevupwh).
