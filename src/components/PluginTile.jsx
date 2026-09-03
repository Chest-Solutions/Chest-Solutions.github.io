import { DoorOpen, LayoutGrid, Sparkles, Store } from 'lucide-react'

export const pluginIcons = {
  MoParticles: Sparkles,
  DoorCards: DoorOpen,
  FoliaShops: Store,
  FoliaGUI: LayoutGrid,
}

// Colorful gradients for the plugin icon tiles. Each plugin has a fixed
// gradient, so its colour is the same on every visit and consistent across
// the docs and downloads pages.
const TILE_GRADIENTS = {
  MoParticles: 'from-fuchsia-500/80 to-purple-500/80',
  DoorCards: 'from-amber-400/80 to-yellow-300/80',
  FoliaShops: 'from-emerald-500/80 to-lime-400/80',
  FoliaGUI: 'from-sky-500/80 to-cyan-400/80',
}

const DEFAULT_GRADIENT = 'from-violet-500/80 to-indigo-500/80'

function nextGradient(key) {
  return TILE_GRADIENTS[key] ?? DEFAULT_GRADIENT
}

export default function PluginTile({
  name,
  size = 'h-11 w-11',
  iconSize = 'h-5 w-5',
}) {
  const Icon = pluginIcons[name] ?? Sparkles
  return (
    <div
      className={`flex ${size} items-center justify-center rounded-xl border border-white/15 bg-gradient-to-br shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] ${nextGradient(name)}`}
    >
      <Icon className={`${iconSize} text-white drop-shadow-sm`} />
    </div>
  )
}
