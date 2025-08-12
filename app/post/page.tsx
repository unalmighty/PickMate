'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function PostPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [form, setForm] = useState({
    title:'', region:'', crop:'', start_date:'', rate_type:'hourly', rate:'',
    accommodation:false, transport:false, description:'', contact_phone:'', accepted_terms:false
  })

  useEffect(() => { (async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUserId(user?.id ?? null)
  })() }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!userId) return alert('Sign in first')
    if (!form.accepted_terms) return alert('Please confirm Award/WHS obligations first.')

    const payload = { ...form, rate: Number(form.rate), owner: userId }
    const { error } = await supabase.from('gigs').insert(payload as any)
    if (error) alert(error.message); else { alert('Posted!'); location.href='/' }
  }

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Post a job</h1>
      {!userId && <p className="text-sm text-gray-600">You must sign in (top-right) to post.</p>}
      <form onSubmit={submit} className="grid gap-3 max-w-xl">
        <input className="border p-2 rounded" placeholder="Title" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))}/>
        <div className="grid grid-cols-2 gap-3">
          <input className="border p-2 rounded" placeholder="Region" value={form.region} onChange={e=>setForm(f=>({...f,region:e.target.value}))}/>
          <input className="border p-2 rounded" placeholder="Crop" value={form.crop} onChange={e=>setForm(f=>({...f,crop:e.target.value}))}/>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input type="date" className="border p-2 rounded" value={form.start_date} onChange={e=>setForm(f=>({...f,start_date:e.target.value}))}/>
          <div className="flex gap-3">
            <select className="border p-2 rounded" value={form.rate_type} onChange={e=>setForm(f=>({...f,rate_type:e.target.value}))}>
              <option value="hourly">Hourly</option>
              <option value="piece">Piece</option>
            </select>
            <input className="border p-2 rounded" placeholder="Rate" inputMode="decimal" value={form.rate} onChange={e=>setForm(f=>({...f,rate:e.target.value}))}/>
          </div>
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.accommodation} onChange={e=>setForm(f=>({...f,accommodation:e.target.checked}))}/> Accommodation
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.transport} onChange={e=>setForm(f=>({...f,transport:e.target.checked}))}/> Transport
          </label>
        </div>
        <textarea className="border p-2 rounded" rows={4} placeholder="Description"
          value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))}/>
        <input className="border p-2 rounded" placeholder="Contact phone"
          value={form.contact_phone} onChange={e=>setForm(f=>({...f,contact_phone:e.target.value}))}/>
        <label className="text-sm flex items-start gap-2">
          <input type="checkbox" checked={form.accepted_terms} onChange={e=>setForm(f=>({...f,accepted_terms:e.target.checked}))}/>
          <span>I confirm our pay meets Award obligations (incl. minimum hourly guarantee for piece rates) and we provide WHS induction & water/rest. <a className="underline" href="#" onClick={e=>{e.preventDefault(); alert('Link out to FWO/WHS resources in production.')}}>Learn more</a></span>
        </label>
        <button className="bg-purple-600 text-white px-4 py-2 rounded" disabled={!userId}>Post job</button>
      </form>
    </main>
  )
}
