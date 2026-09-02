// Detailed per-plugin documentation. Each entry has enough content to
// function as a real help page: what the plugin does, prerequisites,
// install steps, config walkthrough, in-game commands, troubleshooting,
// and an FAQ. Routes are `/docs/:slug`.

export const docRegistry = {
  moparticles: {
    name: 'MoParticles',
    tagline:
      'Plays Bedrock MoLang particle animations on Java servers — baked into item displays, with the resource pack generated for you.',
    icon: 'Sparkles',
    hero: '/img/moparticles.webp',
    github: 'https://github.com/Chest-Solutions/MoParticles',
    versions: ['Paper 1.20.4+', 'Folia', 'Purpur'],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        body: [
          'MoParticles lets you play MoLang particle animations from Bedrock Edition resource packs on a vanilla Java client. Animations are baked into invisible item displays, so there is no client-side mod and no perceptible server tick cost.',
          'The plugin auto-generates a resource pack on first start so players only need to accept the server pack prompt. Effects are defined in YAML and can be triggered in-game by command, by event, or by direct API call from another plugin.',
          'If you have ever wanted the look of a Bedrock marketplace world on a Java server — without rewriting the whole texture pipeline — this is the shortest path.',
        ],
      },
      {
        id: 'install',
        title: 'Installation',
        body: [
          'Drop the .jar from the latest release into your server’s plugins/ folder and (re)start the server. On the first boot the plugin writes plugins/MoParticles/config.yml, an effects/ directory of sample MoLang scripts, and a generated resource pack under plugins/MoParticles/pack/.',
          'Whitelist the pack or set server-resource-pack=required in server.properties so clients always load it. The pack SHA is reported in the server log on boot so you can paste it straight into a proxy or web panel.',
          'If you run Velocity or BungeeCord, configure the resource-pack forwarding so the same SHA is delivered behind the proxy too.',
        ],
      },
      {
        id: 'config',
        title: 'Configuration',
        body: [
          'config.yml is split into three top-level keys: pack (resource-pack name, description, format version), effects (per-animation rate limit, range and view-distance falloff), and spawn (default cooldown when triggered without a per-event override).',
          'Per-animation files live in plugins/MoParticles/effects/<id>.yml and reference a .particle.geo.json plus a texture from the linked Bedrock pack. Hot-reload with /mp reload — there is no full restart needed.',
          'Performance tuning lives under effects.perf. Increase the rate cap if your server has spare tick budget; lower the view-distance falloff if particles pop out of view too aggressively.',
        ],
      },
      {
        id: 'commands',
        title: 'Commands & permissions',
        body: [
          'The base command is /mp. Subcommands: /mp spawn <effect> <target>, /mp play <effect> (broadcast), /mp list, /mp reload, /mp give <player> <effect>, /mp pack (print SHA and URL).',
          'Permissions mirror the subcommands 1:1 (moparticles.spawn, moparticles.play, moparticles.list, moparticles.reload, moparticles.give). OPs get everything by default; grant per-permission to players or roles via your permission plugin of choice.',
          'Tab-completion is wired up for effect IDs and online player names.',
        ],
      },
      {
        id: 'troubleshooting',
        title: 'Troubleshooting',
        body: [
          'Particles invisible on the client? Make sure the pack is applied — type /mp pack and confirm the SHA, then re-accept the pack from the multiplayer menu.',
          'Animation plays but the texture is missing? The referenced .particle.geo.json points to a Bedrock texture the plugin can’t find. Update the path in your effect YAML to a file present in the source resource pack and reload.',
          'Server log reports missing MoLang variable? Some MoLang scripts depend on query.allowed_for_runtime_player. MoParticles injects a stub — file an issue if a particular script still errors.',
          'Effects stutter at high player counts? Drop effects.perf.max-concurrent to a lower number, or scope spawn triggers to a smaller radius via the per-effect range override.',
        ],
      },
      {
        id: 'faq',
        title: 'FAQ',
        body: [
          'Does it require Skript or a client mod? No. The resource pack is everything.',
          'Can effects follow the player? Yes — pass @p as the target or use the API call ParticleEffect.spawn(effect, player) from another plugin.',
          'Where do I get MoLang scripts? MoParticles ships with a small library; the rest are pulled from any Bedrock resource pack you legally own. Don’t redistribute copyrighted textures.',
          'Does it work with Folia’s regionized threading? Yes — every spawn is dispatched to the region that owns the target, with no global scheduler ticks.',
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
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        body: [
          'DoorCards turns physical doors in the world into interactive menus. Right-click a registered door to open a chest-style inventory, run a chain of console commands, or fire any action your permission plugin supports.',
          'It’s designed for survival-like servers where a giant command-block wall would be ugly, and where you want players to feel like they discovered something rather than reading a /help page.',
          'Menus can chain: opening one menu can take the player to a sub-menu, which can run a command, which can open another menu — all from a single door.',
        ],
      },
      {
        id: 'install',
        title: 'Installation',
        body: [
          'Put the .jar in plugins/ and start the server. The plugin creates plugins/DoorCards/menus/ and a default config.yml on first boot. No resource pack, no dependencies.',
          'Players don’t need anything on their end — interaction is plain vanilla right-click on a door block.',
          'On a multi-server network behind Velocity, run DoorCards on every backend — door bindings are per-world per-server by default.',
        ],
      },
      {
        id: 'config',
        title: 'Menu definitions',
        body: [
          'Each menu is a YAML file in plugins/DoorCards/menus/. A menu declares: a title (a MiniMessage string), the size (rows of an inventory — useful when the door is paired with a clickable custom model), a list of items, and an on-interact block.',
          'Items support vanilla material references, custom head textures (via base64 or Mojang UUID), lore, enchant glint (visual only), and click actions such as command, console, message, sound, or open-another-menu.',
          'You can use placeholders like %player_name% anywhere in the title, lore, and actions — they’re resolved at click time, not parse time.',
        ],
      },
      {
        id: 'commands',
        title: 'Commands & permissions',
        body: [
          'Use /dc link <menu> while looking at a door to bind it. /dc unlink removes the binding, /dc list prints the world coordinates of every linked door, and /dc reload re-parses YAML files.',
          'Permissions: doorcards.link, doorcards.unlink, doorcards.list, doorcards.reload, and per-menu doorcards.use.<id>. The last one lets you lock a menu behind a rank without touching the YAML.',
          'Alias /doormenu and /door are registered in plugin.yml so test servers can rebind without changing muscle memory.',
        ],
      },
      {
        id: 'troubleshooting',
        title: 'Troubleshooting',
        body: [
          'Players say right-click does nothing? Confirm the door is in your hand’s reach range (5 blocks) and that doorcards.use.<id> is granted.',
          'Click action runs twice? Another plugin is also listening for door interaction. Set doorcards.priority in config.yml to a higher number than the conflicting plugin.',
          'MiniMessage formatting fails? Older Paper builds only support legacy §-codes — set doorcards.minimessage.enabled=false to fall back automatically.',
          'Door bindings lost on restart? Bindings are stored in plugins/DoorCards/bindings.yml — make sure your server isn’t running with read-only storage.',
        ],
      },
      {
        id: 'faq',
        title: 'FAQ',
        body: [
          'Can a door trigger different menus per player? Yes — bind the menu under a permission and assign doorcards.use.<id> per rank.',
          'Does it support iron and trap doors? All five vanilla door types, plus modded ones that extend the same block tag.',
          'Can I migrate from CommandBlocks? Yes — the import command /dc migrate cb scans a radius for button/pressure-plate + command-block setups and converts them into YAML.',
          'Does it respect WorldGuard regions? Yes — set doorcards.respect-worldguard=true to silently skip clicks outside allowed regions.',
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
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        body: [
          'FoliaShops is a regionized-safe player shop plugin. Shops are owned by players, persist across restarts, and run on Folia’s per-region schedulers without locks or stalls.',
          'It supports physical (sign-based) and chest shops, a stock / unlimited mode per slot, an auction-house-style global search, and a tax / fee system that flows back into a server balance.',
          'Trading is server-authoritative — both sides of the deal run a single Folia-safe transaction even when the buyer and seller live on different regions, so it never desyncs.',
        ],
      },
      {
        id: 'install',
        title: 'Installation',
        body: [
          'Add the .jar to plugins/ and start the server. FoliaShops creates a SQLite database at plugins/FoliaShops/data.db by default — switch to MySQL in config.yml if you run a multi-proxy network.',
          'Hook into Vault or the modern Economy API (Paper 1.21+) by setting economy.provider in config.yml. FoliaShops auto-detects Vault if present; otherwise the bundled placeholder provider is used so the plugin loads cleanly.',
          'Backups: the database is closed and rotated on every clean shutdown. Use /shop admin backup <path> for an on-demand snapshot.',
        ],
      },
      {
        id: 'config',
        title: 'Configuration walkthrough',
        body: [
          'config.yml is grouped into: economy (provider, currency symbol, starting balance for new players), shop (max shops per player, max dist per world, chest-shop creation fee), tax (server tax percent, daily fee per shop), and announcement (broadcast chat on shop create / trade).',
          'Per-world overrides live in plugins/FoliaShops/worlds/<name>.yml — useful if your build server allows infinite shops and your survival server caps at five.',
          'Currency symbols can be formatted strings (e.g. `$%.2f`); the symbol is parsed and the amount formatted at display time only, so changing it doesn’t migrate any rows.',
        ],
      },
      {
        id: 'commands',
        title: 'Commands & permissions',
        body: [
          'Player commands: /shop create, /shop list, /shop search <item>, /shop buy <id>, /shop sell, /shop history.',
          'Admin commands: /shop admin (open a management GUI), /shop admin tp <id>, /shop admin remove <id>, /shop admin tax (set / view taxes), /shop reload.',
          'Permissions follow the same shape: foliashops.user.* and foliashops.admin.* plus per-shop foliashops.shop.<id>.manage for the shop owner.',
        ],
      },
      {
        id: 'troubleshooting',
        title: 'Troubleshooting',
        body: [
          'Shop not saving across restarts? SQLite needs write permission on plugins/FoliaShops/. Confirm the file’s owner matches the server user (chown -R).',
          'Cross-region transactions fail? Ensure the database adapter is MySQL — SQLite can’t coordinate across Folia regions on a distributed proxy.',
          'Currency rounding gives weird prices? The default is bank-style rounding (.5 rounds up). Override shop.round-mode in config.yml to floor, ceil, or none.',
          'Tax withdrawals overlap with regular shop buys? Tax runs on its own scheduler thread; if you see duplicate withdrawals, file an issue with the relevant timestamps and the plugin version.',
        ],
      },
      {
        id: 'faq',
        title: 'FAQ',
        body: [
          'Does FoliaShops charge sales tax automatically? Yes — set tax.percent in config.yml. The proceeds go to the configured server-balance account or are simply logged for an admin to withdraw.',
          'Can I cap prices per item? Yes — shop.limits.<material> lets you set a floor and ceiling. Items outside the range can’t be listed.',
          'Does it log player transactions for anti-cheat? Every buy / sell is recorded with timestamp, price, and a SHA of the item NBT. Hooks into the moderation plugin’s alert channel via foliashops.notify-on-suspicious: true.',
          'Does it integrate with EssentialsX Eco / CMI Economy? Yes — both are detected automatically. A custom provider is just a class implementing EconomyProvider in the API jar.',
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
    sections: [
      {
        id: 'overview',
        title: 'What FoliaGUI is',
        body: [
          'FoliaGUI is an API-jar, not a plugin players interact with. Other plugins depend on it to build chest-style GUIs in code without writing boilerplate scheduler logic for Folia.',
          'The library is fully thread-safe: every open / click / close event is dispatched onto the region thread that owns the player, so other plugins can read world data without async hazards.',
          'It exposes a chainable builder API so dependent plugins can keep their GUI declarations short — most menus fit in one screen of code.',
        ],
      },
      {
        id: 'install',
        title: 'Installation',
        body: [
          'Add FoliaGUI.jar to your development classpath as a `compileOnly` dependency and shade it in via the plugins that depend on it. Alternatively drop it on the server under plugins/ if you want all dependents to share one copy.',
          'No config, no commands, no permissions. It’s a pure library.',
          'Build artifacts are published on Maven Central and JitPack for direct consumption.',
        ],
      },
      {
        id: 'api',
        title: 'API quickstart',
        body: [
          'Build a GUI: FoliaGUI.gui().title("Shop").rows(3).build(); then chain .slot(index, item, click -> …) to define layout.',
          'Open it for a player: gui.open(player). The library schedules to the correct Folia region automatically.',
          'Listen to close events with .onClose(ctx -> …) — the callback runs after the inventory is closed and is safe to mutate player data.',
        ],
      },
      {
        id: 'patterns',
        title: 'Common patterns',
        body: [
          'Confirm dialogs: open a 1-row GUI with “Confirm” on green wool and “Cancel” on red wool, then return a CompletableFuture<FoliaGui.Result>.',
          'Paginated lists: FoliaGUI.paginated(items, itemsPerPage()). Clicking beyond the last page is silently ignored and the navigation arrows are auto-injected.',
          'Live-updating progress: pass a refresh rate when opening and the GUI re-renders every N ticks on the owning thread — useful for crafting recipes or shop restocks.',
          'Modal flows: chain .thenOpen(other) to create a wizard-style multi-step interaction with a single chain of callbacks.',
        ],
      },
      {
        id: 'troubleshooting',
        title: 'Troubleshooting',
        body: [
          'GUI opens on the wrong thread? Make sure your Folia-aware scheduler is calling FoliaGui.gui().open(p) from a region task — global regions can’t touch player inventories.',
          'Click handler throws on close vs. open? gui.onClose fires AFTER the inventory is closed, so reading the player’s cursor is fine; mutating it is not — schedule to the next tick.',
          'Items appear duplicated on reopen? You forgot to clear the inventory before re-rendering. FoliaGUI doesn’t auto-clear — call .refresh(p) or .clear() explicitly.',
        ],
      },
      {
        id: 'faq',
        title: 'FAQ',
        body: [
          'Can I use it without Folia? Yes — FoliaGUI gracefully falls back to BukkitScheduler on Paper / Spigot.',
          'Does it support custom-model-data textures? Yes — pass ItemStackBuilder.modelData(int) for vanilla 1.21+ models or ModelDataWriter for legacy 1.20.4 packs.',
          'Is it on Maven Central? Yes — com.chestsolutions:foliagui. Pull it from there or build from source.',
          'Can I render entities (like holograms) inside the GUI? No — FoliaGUI only manages item inventories. Pair it with a separate hologram plugin for that effect.',
        ],
      },
    ],
  },
}

export const slugMap = Object.fromEntries(
  Object.entries(docRegistry).map(([slug, data]) => [slug, data.name]),
)
