import { useEffect } from 'react'

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} - Chest Solutions` : 'Chest Solutions'
  }, [title])
}
