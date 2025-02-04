'use client'

import { useEffect, useState } from 'react'
import { SignIn } from '@clerk/nextjs'

export default function NotFoundPage() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_CLERK_FRONTEND_API) {
      setIsReady(true)
    }
  }, [])

  if (!isReady) {
    return <p>Loading...</p>
  }

  return <SignIn />
}
