import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ExperienceCard({ exp }){
  const nav = useNavigate()
  return (
    <div className="bg-white rounded-lg overflow-hidden card-shadow flex flex-col">
      <div className="h-44 w-full overflow-hidden">
        <img src={exp.imageUrl} alt={exp.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{exp.title}</h3>
          <p className="text-sm text-black px-3 py-1 rounded  bg-gray-400">{exp.city}</p>
        </div>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{exp.shortDescription}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="text-sm font-bold"><span className="font-normal text-gray-700">From </span>₹{exp.price}</div>
          <button onClick={()=>nav(`/experience/${exp._id}`)} className="px-3 py-1 rounded bg-brand text-black">View Details</button>
        </div>
      </div>
    </div>
  )
}
