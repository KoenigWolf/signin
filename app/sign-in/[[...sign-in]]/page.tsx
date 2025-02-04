'use client'

import { useState } from 'react'
import { SignIn } from '@clerk/nextjs'
import { UserCircle } from 'lucide-react'

export default function Page() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* アイコンボタン */}
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-200 transition"
        aria-label="Sign in"
      >
        <UserCircle className="h-8 w-8 text-gray-700" />
      </button>

      {/* サインインフォーム（クリック時に表示） */}
      {isOpen && (
        <div className="absolute top-16 right-4 bg-white p-4 rounded-lg shadow-lg">
          <SignIn />
        </div>
      )}
    </div>
  )
}
