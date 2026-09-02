# Image credits

Two kinds of assets, and the difference matters:

**Searched (not generated)** — `public/img/hero-sunset.webp` (page hero background),
`public/img/mining.webp` (home community band) and `public/img/chest.png` +
`public/favicon.png` (the Minecraft chest used as the site icon). They were found
through image search, then cropped and re-encoded as WebP/PNG. They are player-made
Minecraft content, used under Mojang's non-commercial usage guidelines:
https://www.minecraft.net/en-us/usage-guidelines

| File | Shows | Found at |
| --- | --- | --- |
| `img/hero-sunset.webp` | Ocean world at sunset | wallpaperaccess.com/minecraft-sunset |
| `img/mining.webp` | Diamond ore beside lava (hotbar cropped) | wallpapers.com/minecraft-diamond |
| `img/chest.png`, `favicon.png` | Render of the Minecraft chest block | toppng.com (Minecraft chest render) |

**Generated** — the four plugin card artworks (`img/moparticles.webp`,
`img/doorcards.webp`, `img/foliashops.webp`, `img/foliagui.webp`) are AI-generated
abstract graphics in the site's dark, grainy style. They are decoration only — no
in-game content, and nothing else on the site is generated.

Minecraft is a trademark of Mojang Synergies AB. We are not affiliated with or
endorsed by Mojang or Microsoft.

To swap an image, keep the same path. To keep the build lean:

```bash
convert big.png -resize 800x -strip -quality 74 public/img/card.webp
```
