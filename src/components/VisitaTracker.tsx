'use client'

import { useEffect } from 'react'

export function VisitaTracker() {
  useEffect(() => {
    if (sessionStorage.getItem('visitaRegistrada')) return
    fetch('/api/registrar-visita', { method: 'POST' })
      .then(() => sessionStorage.setItem('visitaRegistrada', '1'))
      .catch(() => {})
  }, [])

  return null
}
