import { DoorOpen, LayoutGrid, Sparkles, Store } from 'lucide-react'

export const pluginIcons = {
  MoParticles: Sparkles,
  DoorCards: DoorOpen,
  FoliaShops: Store,
  FoliaGUI: LayoutGrid,
}

// Colorful gradients for the plugin icon tiles. Each plugin is assigned one
// at random (from a shuffled pool, so neighbouring cards never clash) the
// first time it's seen - the assignment lives for the whole session, so a
// plugin keeps its colour across the docs and downloads pages, and re-rolls
// on the next visit.
const TILE_GRADIENTS = [
  'from-rose-500/80 to-orange-400/80',
  'from-fuchsia-500/80 to-purple-500/80',
  'from-violet-500/80 to-indigo-500/80',
  'from-sky-500/80 to-cyan-400/80',
  'from-emerald-500/80 to-lime-400/80',
  'from-amber-400/80 to-yellow-300/80',
  'from-pink-500/80 to-rose-400/80',
  'from-teal-400/80 to-green-400/80',
  'from-blue-500/80 to-sky-400/80',
  'from-red-500/80 to-pink-500/80',
]

const tileGradients = new Map()
let gradientPool = []

function nextGradient(key) {
  if (!tileGradients.has(key)) {
    if (gradientPool.length === 0) {
      gradientPool = [...TILE_GRADIENTS].sort(() => Math.random() - 0.5)
    }
    tileGradients.set(key, gradientPool.pop())
  }
  return tileGradients.get(key)
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
