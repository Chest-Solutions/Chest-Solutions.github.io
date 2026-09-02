// Lightweight particle field: glowing motes drifting upward.
// One pre-rendered glow sprite per color, then drawImage per frame.
//
// Two palettes, because the two themes need opposite things: on the dark page
// the motes are drawn additively (`lighter`) in near-white blue, which is
// invisible on a white page — additive blending against white is a no-op. On
// the light page we switch to plain `source-over` and deeper blues instead.
const PALETTES = {
  dark: [
    [74, 168, 240],
    [124, 194, 251],
    [169, 217, 255],
    [255, 255, 255],
  ],
  light: [
    [47, 138, 214],
    [31, 108, 174],
    [90, 160, 220],
    [122, 186, 236],
  ],
}

let active = null

// VitePress keeps the current appearance as a `.dark` class on <html>.
const isDark = () => document.documentElement.classList.contains('dark')

function makeSprites(dark) {
  return (dark ? PALETTES.dark : PALETTES.light).map(([r, g, b]) => {
    const size = 64
    const c = document.createElement('canvas')
    c.width = size
    c.height = size
    const sctx = c.getContext('2d')
    const grad = sctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    grad.addColorStop(0, `rgba(${r},${g},${b},0.9)`)
    grad.addColorStop(0.35, `rgba(${r},${g},${b},0.28)`)
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
    sctx.fillStyle = grad
    sctx.fillRect(0, 0, size, size)
    return c
  })
}

export function mountParticleField(host) {
  if (active || !host || typeof document === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const canvas = document.createElement('canvas')
  canvas.className = 'particle-field'
  host.appendChild(canvas)
  const ctx = canvas.getContext('2d')

  // Theme-dependent state; rebuilt whenever the appearance flips.
  let dark = isDark()
  let sprites = makeSprites(dark)
  let composite = dark ? 'lighter' : 'source-over'

  let width = 0
  let height = 0
  let particles = []
  let raf = 0

  const spawn = (fromBottom) => ({
    x: Math.random() * width,
    y: fromBottom ? height + 10 : Math.random() * height,
    r: Math.random() * 2.2 + 0.8,
    vx: (Math.random() - 0.5) * 0.14,
    vy: -(Math.random() * 0.4 + 0.1),
    c: (Math.random() * PALETTES.dark.length) | 0,
    a: Math.random() * 0.5 + 0.12,
    tw: Math.random() * Math.PI * 2,
    tws: Math.random() * 0.02 + 0.004,
  })

  const resize = () => {
    const rect = host.getBoundingClientRect()
    width = rect.width
    height = rect.height
    canvas.width = Math.max(1, Math.floor(width * dpr))
    canvas.height = Math.max(1, Math.floor(height * dpr))
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  const init = () => {
    const count = Math.min(110, Math.max(30, Math.floor((width * height) / 16000)))
    particles = Array.from({ length: count }, () => spawn(false))
  }

  const draw = () => {
    ctx.clearRect(0, 0, width, height)
    ctx.globalCompositeOperation = composite
    for (const p of particles) {
      p.tw += p.tws
      p.x += p.vx
      p.y += p.vy
      if (p.y < -16 || p.x < -16 || p.x > width + 16) Object.assign(p, spawn(true))
      const alpha = p.a * (0.65 + 0.35 * Math.sin(p.tw))
      const s = p.r * 10
      ctx.globalAlpha = alpha
      ctx.drawImage(sprites[p.c], p.x - s / 2, p.y - s / 2, s, s)
    }
    ctx.globalAlpha = 1
    raf = requestAnimationFrame(draw)
  }

  resize()
  init()
  raf = requestAnimationFrame(draw)

  const onResize = () => {
    resize()
    init()
  }
  const onVisibility = () => {
    if (document.visibilityState === 'visible' && !raf) {
      raf = requestAnimationFrame(draw)
    }
    if (document.visibilityState === 'hidden' && raf) {
      cancelAnimationFrame(raf)
      raf = 0
    }
  }
  window.addEventListener('resize', onResize)
  document.addEventListener('visibilitychange', onVisibility)

  // Re-tint the field when the theme toggle flips `.dark` on <html>.
  const observer = new MutationObserver(() => {
    const next = isDark()
    if (next === dark) return
    dark = next
    sprites = makeSprites(dark)
    composite = dark ? 'lighter' : 'source-over'
  })
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })

  active = {
    destroy() {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      observer.disconnect()
      canvas.remove()
    },
  }
}

export function unmountParticleField() {
  if (active) {
    active.destroy()
    active = null
  }
}

// Mount into the current hero if there is one; unmount otherwise.
export function syncParticleField() {
  if (typeof document === 'undefined') return
  // Wait for Vue to hydrate: mounting into the SSR markup before hydration
  // causes a hydration mismatch and the canvas gets discarded.
  if (!document.querySelector('#app')?.__vue_app__) return
  const hero = document.querySelector('.VPHero')
  if (hero && !active) {
    mountParticleField(hero)
  } else if (!hero && active) {
    unmountParticleField()
  }
}
