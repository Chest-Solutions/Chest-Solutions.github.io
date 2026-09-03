---
title: Plugin API
order: 5
---

# Plugin API

MoParticles exposes a small, dependency-light API so other plugins can trigger effects. Everything is available through the static `MoParticleAPI` class.

## 1. Add the dependency

MoParticles is published to [JitPack](https://jitpack.io) — trigger a build with the tag you want.

<details open>
<summary><b>Gradle</b></summary>

```groovy
repositories {
    maven { url 'https://jitpack.io' }
}

dependencies {
    compileOnly 'com.github.Chest-Solutions:MoParticles:1.1.0'
}
```

</details>

<details>
<summary><b>Maven</b></summary>

```xml
<repositories>
    <repository>
        <id>jitpack.io</id>
        <url>https://jitpack.io</url>
    </repository>
</repositories>

<dependencies>
    <dependency>
        <groupId>com.github.Chest-Solutions</groupId>
        <artifactId>MoParticles</artifactId>
        <version>1.1.0</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

</details>

## 2. Declare the plugin dependency

In your `plugin.yml`:

```yaml
name: MyPlugin
version: 1.0
main: com.example.plugin.MyPlugin
depend: [MoParticles]
```

## 3. Use the API

```java
import com.csl.moparticles.api.MoParticleAPI;
import org.bukkit.Location;
import java.util.UUID;

MoParticleAPI api = MoParticleAPI.get();
String effectName = "snowstorm:fire";
Location target = player.getLocation();

if (api.hasEffect(effectName)) {          // safety check
    UUID animationId = api.play(effectName, target, 10.0); // play it

    // later...
    api.stop(animationId);                // stop it
}
```

### API reference

| Method | Returns | Description |
| --- | --- | --- |
| `MoParticleAPI.get()` | `MoParticleAPI` | The API instance (throws if MoParticles isn't enabled) |
| `isEnabled()` | `boolean` | Whether MoParticles is currently enabled |
| `listEffects()` | `List<String>` | All loaded effect IDs, sorted |
| `hasEffect(String id)` | `boolean` | Whether an effect with this ID is loaded |
| `play(String effect, Location where, double radius)` | `UUID` | Play an effect; returns the animation ID (or `null` on failure) |
| `stop(UUID id)` | `void` | Stop a specific animation |
| `stopAll()` | `void` | Stop every animation |
| `getResourcePackFile()` | `File` | Path to the generated `resourcepack.zip` |

Effect IDs passed to `hasEffect` / `play` support the same shorthand resolution as commands — see [Effect IDs](/docs/moparticles/particles#effect-ids).

### Keeping an effect alive

Effects with a looping emitter stop themselves when their `active_time` ends. For a permanent ambience loop, re-play the effect when it finishes (or on a scheduled task):

```java
Bukkit.getScheduler().runTaskTimer(plugin, () -> {
    api.play("snowstorm:rainbow", lobbyLocation, 8.0);
}, 60L, 2400L); // every 2 minutes
```
