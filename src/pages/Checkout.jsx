import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { postBooking, validatePromo } from '../services/api'
import Layout from './Layout'

export default function Checkout(){
  const { state } = useLocation()
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [promo, setPromo] = useState('')
  const [discount, setDiscount] = useState(0)
  const [accept, setAccept] = useState(false)
  const [loading, setLoading] = useState(false)

  if(!state) return <div className="p-8">Missing data</div>

  const applyPromo = async ()=>{
    try{
      const r = await validatePromo(promo)
      if(r.data.type==='percent') setDiscount((state.price * r.data.amount)/100)
      else setDiscount(r.data.amount)
    }catch(e){ alert('Invalid promo') }
  }

  const submit = async ()=>{ 
    if(!name || !email || !accept){ alert('fill details and accept terms'); return }
    setLoading(true)
    try{
      const payload = { experienceId: state.experienceId, date: state.date, time: state.time, customer:{name,email}, promoCode: promo }
      const r = await postBooking(payload)
      nav('/result', { state: { success: true, booking: r.data } })
    }catch(e){
      nav('/result', { state: { success: false, message: e?.response?.data?.message || 'Booking failed' } })
    }finally{ setLoading(false) }
  }

  const total = Math.max(0, (state.price||0) - (discount||0))

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded p-4 card-shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input className="p-3 border rounded" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
            <input className="p-3 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className="mt-3 flex gap-2">
            <input className="flex-1 p-3 border rounded" placeholder="Promo code" value={promo} onChange={e=>setPromo(e.target.value)} />
            <button onClick={applyPromo} className="px-4 py-2 rounded bg-black text-white">Apply</button>
          </div>
          <label className="flex items-center gap-2 mt-3"><input type="checkbox" checked={accept} onChange={e=>setAccept(e.target.checked)} /> I agree to the terms and safety policy</label>
        </div>

        <div className="lg:col-span-1 bg-white rounded p-4 card-shadow">
          <div className="flex justify-between text-sm text-gray-500">Experience <span>{state.title}</span></div>
          <div className="flex justify-between text-sm mt-1">Date <span>{state.date}</span></div>
          <div className="flex justify-between text-sm">Time <span>{state.time}</span></div>
          <div className="flex justify-between text-sm mt-3">Subtotal <span>₹{state.price}</span></div>
          <div className="flex justify-between text-sm">Discount <span>-₹{Math.round(discount)}</span></div>
          <div className="flex justify-between font-bold mt-4">Total <span>₹{Math.round(total)}</span></div>
          <div className="mt-4"><button disabled={loading} onClick={submit} className="px-4 py-3 rounded bg-brand w-full">Pay and Confirm</button></div>
        </div>
      </div>
    </Layout>
  )
}
