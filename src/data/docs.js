// Per-plugin documentation. Routes are `/docs` (plugin listing) and
// `/docs/:slug/:section` for each doc page.
//
// MoParticles has full documentation written from the plugin's GitHub
// README (https://github.com/Chest-Solutions/MoParticles). Every other
// plugin is a stub (`stub: true`) until its docs are written.
//
// Body entries are plain strings (rendered as paragraphs) or
// `{ code: '...' }` objects (rendered as code blocks).

export const docRegistry = {
  moparticles: {
    name: 'MoParticles',
    tagline:
      'Parses MoLang - the Bedrock particle language - bakes it into a Java-compatible animation with item displays, generates the resource pack, and plays it client-side.',
    icon: 'Sparkles',
    hero: '/img/moparticles.webp',
    github: 'https://github.com/Chest-Solutions/MoParticles',
    versions: ['Java servers', 'Vanilla clients', 'Resource pack'],
    sections: [
      {
        id: 'overview',
        title: 'Introduction',
        body: [
          'MoParticles is a Minecraft server plugin that plays Bedrock Edition particle effects on Java Edition servers. It parses MoLang - the particle language Bedrock resource packs use - and bakes the result into a Java-compatible animation built out of item displays.',
          'When an effect is loaded, MoParticles also generates a resource pack containing the textures the effect needs and plays the animation client-side. Players see smooth, fully animated Bedrock-style particles on a completely vanilla Java client - no client-side mods required.',
          'The plugin ships with a small showcase of effects and accepts any MoLang particle definition you drop in, so animations from existing Bedrock resource packs can be replayed on your Java server with a single command.',
        ],
      },
      {
        id: 'install',
        title: 'Installing',
        body: [
          'Grab a jar. You can download it from the GitHub repository, or build it yourself from source - the project uses Gradle with the shadow plugin, so a single command produces the runnable jar:',
          { code: './gradlew shadowJar' },
          'Drop the resulting jar into your server’s plugins/ folder and restart. On first start, MoParticles creates its data folder at plugins/MoParticles/ with a particles/ directory containing the bundled example effects, and generates the resource pack with the required textures.',
          'Because the animations are baked into item displays and textures are delivered through the generated resource pack, players need to accept the server resource pack prompt when joining. Without the pack the animations will not render correctly.',
        ],
      },
      {
        id: 'commands',
        title: 'Using it',
        body: [
          'Everything is controlled through the /moparticles command (aliases may vary per version):',
          { code: '/moparticles list' },
          'Lists every effect currently loaded on the server.',
          { code: '/moparticles play <effect> <location> [radius]' },
          'Plays an effect at a specific location, optionally limited to a radius around it. This is the form to use from consoles, command blocks, or scripts when you want the effect somewhere other than where you are standing.',
          { code: '/moparticles playhere <effect> [radius]' },
          'Plays an effect right where you are standing - handy for previewing animations in-game.',
          { code: '/moparticles stop <id>' },
          'Stops a single running animation by its id. Ids are returned when the animation starts (and are available to plugins through the API).',
          { code: '/moparticles stopall' },
          'Stops every running MoParticles animation on the server.',
          { code: '/moparticles reload' },
          'Reloads the particle definitions from plugins/MoParticles/particles/ without a restart.',
          { code: '/moparticles info <effect>' },
          'Prints details about a loaded effect, such as its texture and animation settings.',
        ],
      },
      {
        id: 'effects',
        title: 'Effects',
        body: [
          'Effects are MoLang particle definition files in the same JSON format Bedrock resource packs use (the snowstorm format). MoParticles bundles three showcase effects (from snowstorm, plus a custom one) that are copied into plugins/MoParticles/particles/ on first start:',
          { code: 'snowstorm:fire     - a custom snowstorm fire particle\nsnowstorm:loading  - snowstorm’s loading circle particle\nsnowstorm:rainbow  - snowstorm’s rainbow particle animation' },
          'To add your own effects, drop more .json particle definition files into plugins/MoParticles/particles/ and run /moparticles reload. Files placed in that folder are picked up without restarting the server.',
          'Since the definitions are standard Bedrock MoLang particles, you can reuse animations from Bedrock resource packs you own - just make sure you have the rights to use and ship their textures in the generated resource pack.',
        ],
      },
      {
        id: 'troubleshooting',
        title: 'Troubleshooting',
        body: [
          'Effect doesn’t render for players? Confirm they accepted the server resource pack. The animations and textures are delivered through the pack MoParticles generates, so declining the prompt leaves the item displays without their textures.',
          '/moparticles play says the effect doesn’t exist? Run /moparticles list to see what is actually loaded, check the file sits in plugins/MoParticles/particles/, and run /moparticles reload. Effect names use the namespace of the definition file (e.g. snowstorm:fire), not just the file name.',
          'A custom effect loads but looks wrong? The MoLang definition may reference textures or features that weren’t carried over from the Bedrock pack it came from. Compare against the bundled snowstorm effects, which are known to work, and adjust the definition.',
          'Building from source fails? Make sure you run ./gradlew shadowJar (not plain build) so dependencies are bundled into the final jar.',
        ],
      },
      {
        id: 'developer',
        title: 'Developer docs',
        body: [
          'You can play MoParticles effects from your own plugin through MoParticleAPI. MoParticles is published via JitPack.',
          'First, add it to your build. Gradle:',
          {
            code: `repositories {
    maven { url 'https://jitpack.io' }
}

dependencies {
    compileOnly 'com.github.Chest-Solutions:MoParticles:1.0.0'
}`,
          },
          'Maven:',
          {
            code: `<repositories>
    <repository>
        <id>jitpack.io</id>
        <url>https://jitpack.io</url>
    </repository>
</repositories>

<dependencies>
    <dependency>
        <groupId>com.github.Chest-Solutions</groupId>
        <artifactId>MoParticles</artifactId>
        <version>1.0.0</version>
        <scope>provided</scope>
    </dependency>
</dependencies>`,
          },
          'Then declare MoParticles as a dependency in your plugin.yml so it loads before your plugin:',
          {
            code: `name: MyPlugin
version: 1.0
main: com.example.plugin.MyPlugin
depend: [MoParticles]`,
          },
          'Finally, play (and stop) effects in code. MoParticleAPI.get() returns the shared API instance; play(...) starts the animation at a location and returns a UUID you can use to stop it again:',
          {
            code: `MoParticleAPI api = MoParticleAPI.get();
String effectName = "fire";
Location targetLocation = player.getLocation();

if (api.hasEffect(effectName)) { // Safety check
    UUID animationId = api.play(effectName, targetLocation, 10.0); // Play it

    api.stop(animationId); // Stop it
}`,
          },
          'The full source lives on GitHub if you want to see everything the API exposes.',
        ],
      },
    ],
  },

  doorcards: {
    name: 'DoorCards',
    tagline: 'Door-based menus and interactions for Paper servers.',
    icon: 'DoorOpen',
    hero: '/img/doorcards.webp',
    github: 'https://github.com/Chest-Solutions',
    versions: ['Paper 1.20.4+', 'Purpur'],
    stub: true,
    sections: [
      {
        id: 'overview',
        title: 'Introduction',
        body: [
          'DoorCards turns physical doors in the world into interactive menus. Full documentation hasn’t been written yet - this page is a placeholder.',
          'In the meantime, you can follow development or open an issue on GitHub, or ask questions in the Chest Solutions Discord.',
        ],
      },
    ],
  },

  foliashops: {
    name: 'FoliaShops',
    tagline: 'Player shops for Folia and Paper servers.',
    icon: 'Store',
    hero: '/img/foliashops.webp',
    github: 'https://github.com/Chest-Solutions',
    versions: ['Folia', 'Paper 1.20.4+', 'Purpur'],
    stub: true,
    sections: [
      {
        id: 'overview',
        title: 'Introduction',
        body: [
          'FoliaShops is a player shop plugin built to be safe on Folia’s regionized threading. Full documentation hasn’t been written yet - this page is a placeholder.',
          'In the meantime, you can follow development or open an issue on GitHub, or ask questions in the Chest Solutions Discord.',
        ],
      },
    ],
  },

  foliagui: {
    name: 'FoliaGUI',
    tagline: 'A lightweight GUI framework for Folia and Paper plugins.',
    icon: 'LayoutGrid',
    hero: '/img/foliagui.webp',
    github: 'https://github.com/Chest-Solutions',
    versions: ['Folia', 'Paper 1.20.4+', 'Purpur'],
    stub: true,
    sections: [
      {
        id: 'overview',
        title: 'Introduction',
        body: [
          'FoliaGUI is a library other plugins use to build GUIs that are thread-safe on Folia. Full documentation hasn’t been written yet - this page is a placeholder.',
          'In the meantime, you can follow development or open an issue on GitHub, or ask questions in the Chest Solutions Discord.',
        ],
      },
    ],
  },
}

export const slugMap = Object.fromEntries(
  Object.entries(docRegistry).map(([slug, data]) => [slug, data.name]),
)
