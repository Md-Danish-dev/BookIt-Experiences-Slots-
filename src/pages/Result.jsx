import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Layout from './Layout'

export default function Result(){
  const { state } = useLocation()
  const nav = useNavigate()
  if(!state) return <div className="p-8">No result</div>

  if(state.success){
    const b = state.booking
    return (
      <div className="p-8 text-center">
        <div className="text-6xl text-green-500">✓</div>
        <h1 className="text-2xl mt-4">Booking Confirmed</h1>
        <p className="mt-2">Ref ID: {b._id}</p>
        <button className="mt-6 px-4 py-2 border rounded" onClick={()=>nav('/')}>Back to Home</button>
      </div>
    )
  }

  return (
    <Layout>
      <div className="p-8 text-center">
        <h1 className="text-2xl">Booking Failed</h1>
        <p className="mt-2">{state.message}</p>
        <button className="mt-6 px-4 py-2 border rounded" onClick={()=>nav('/')}>Back to Home</button>
      </div>
    </Layout>
  )
}
