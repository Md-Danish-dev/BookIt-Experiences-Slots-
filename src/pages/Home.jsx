// import React, { useEffect, useState } from 'react'
// import { getExperiences } from '../services/api'
// import ExperienceCard from '../components/ExperienceCard'

// export default function Home(){
//   const [exps, setExps] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(()=>{
//     getExperiences().then(r=>{ setExps(r.data) }).catch(console.error).finally(()=>setLoading(false))
//   },[])

//   if(loading) return <div className="p-8">Loading...</div>

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {exps.map(e => <ExperienceCard key={e._id} exp={e} />)}
//       </div>
//     </div>
//   )
// }



import React, { useEffect, useState } from "react"
import { getExperiences } from "../services/api"
import ExperienceCard from "../components/ExperienceCard"
import Layout from "./Layout"
import { useSearchParams } from "react-router-dom"

export default function Home() {
  const [experiences, setExperiences] = useState([])
  const [filtered, setFiltered] = useState([])
  const [searchParams] = useSearchParams()

  const filter = (query) => {
    const q = query.toLowerCase()
    setFiltered(
      experiences.filter(exp =>
        exp.title.toLowerCase().includes(q) ||
        exp.shortDescription.toLowerCase().includes(q)
      )
    )
  }

  useEffect(() => {
    getExperiences().then(res => {
      setExperiences(res.data)
      setFiltered(res.data)

      const q = searchParams.get("search")
      if (q) filter(q)
    })
  }, [])

  return (
    <Layout onSearch={filter}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {filtered.map(exp => (
          <ExperienceCard key={exp._id} exp={exp} />
        ))}
      </div>
    </Layout>
  )
}


