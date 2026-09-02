# Image credits

The screenshots in `public/img/` were found through image search (not generated),
then cropped and re-encoded as WebP. They are player-made Minecraft content, used
under Mojang's non-commercial usage guidelines:
https://www.minecraft.net/en-us/usage-guidelines

Minecraft is a trademark of Mojang Synergies AB. We are not affiliated with or
endorsed by Mojang or Microsoft.

| File | Shows | Found at |
| --- | --- | --- |
| `img/hero-sunset.webp` | Ocean world at sunset | wallpaperaccess.com/minecraft-sunset |
| `img/glyphs.webp` | Enchanting-table glyphs | mcpedl.com/enchanting-table-colored-particles |
| `img/mining.webp` | Diamond ore beside lava (hotbar cropped) | wallpapers.com/minecraft-diamond |
| `img/arena.webp` | Player-built PvP arena | reddit.com/r/Minecraft/comments/1cp0wq |
| `img/chest.png`, `favicon.png` | Render of the Minecraft chest block | toppng.com (Minecraft chest render) |

To swap one, drop the replacement at the same path. To keep the build lean:

```bash
convert big.png -resize 1400x -strip -quality 80 public/img/shot.webp
```
