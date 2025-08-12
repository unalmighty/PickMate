'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Gig = {
  id: number
  title: string
  region: string
  crop: string
  start_date: string | null
  rate_type: 'hourly' | 'piece'
  rate: number
  accommodation: boolean
  transport: boolean
  description: string | null
}

export default function HomePage() {
  const [gigs, setGigs] = useState<Gig[]>([])

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('gigs')
        .select('*')
        .eq('status','active')
        .order('start_date', { ascending: true })
      if (!error) setGigs(data || [])
    })()
  }, [])

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Find work</h1>
      <div className="grid gap-3">
        {gigs.map(g => (
          <div key={g.id} className="border rounded-xl p-4">
            <div className="flex justify-between items-center gap-2">
              <h2 className="font-medium">{g.title}</h2>
              <span className="text-sm">{g.rate_type} · ${g.rate}</span>
            </div>
            <p className="text-sm text-gray-600">{g.region} • {g.crop}</p>
            {g.start_date && <p className="text-xs text-gray-500 mt-1">Start: {new Date(g.start_date).toLocaleDateString()}</p>}
            {g.description && <p className="text-sm mt-2">{g.description}</p>}
          </div>
        ))}
        {gigs.length === 0 && <p className="text-gray-600">No gigs yet. Be the first to <a href="/post">post a job</a>.</p>}
      </div>
    </main>
  )
}
