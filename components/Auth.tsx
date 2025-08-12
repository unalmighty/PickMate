'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function AuthBox() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUserEmail(user?.email ?? null)
    })()
  }, [])

  async function signIn(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) { alert(error.message); return }
    setSent(true)
  }

  async function signOut() {
    await supabase.auth.signOut()
    location.reload()
  }

  if (userEmail) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-gray-600">Signed in as {userEmail}</span>
        <button onClick={signOut} className="border px-3 py-1 rounded">Sign out</button>
      </div>
    )
  }

  if (sent) return <p>Check your email for a login link.</p>

  return (
    <form onSubmit={signIn} className="flex gap-2">
      <input
        className="border px-3 py-2 rounded w-56"
        placeholder="you@example.com"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <button className="bg-purple-600 text-white px-3 py-2 rounded">Sign in</button>
    </form>
  )
}
