const MAGNET_PULL = 4

// JS only reports the cursor; CSS decides whether to use it, so touch and reduced motion stay still
export function handleMagnetMove(event) {
  const card = event.currentTarget
  const box = card.getBoundingClientRect()
  const x = ((event.clientX - box.left) / box.width - 0.5) * 2 * MAGNET_PULL
  const y = ((event.clientY - box.top) / box.height - 0.5) * 2 * MAGNET_PULL

  card.style.setProperty('--magnet-x', `${x}px`)
  card.style.setProperty('--magnet-y', `${y}px`)
}
