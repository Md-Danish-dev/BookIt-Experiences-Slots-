import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import logo from "../images/logo.png"

export default function Header({ onSearch }) {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  const handleSearch = () => {
    if (onSearch && location.pathname === "/") {
      onSearch(search.toLowerCase())
    } else {
      navigate(`/?search=${search}`)
    }
  }

  return (
    <header className="w-full fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        
        <div
          className="flex items-center gap-2 font-semibold text-lg cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo"/>
          
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search experiences"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-md w-72"
          />
          <button
            onClick={handleSearch}
            className="bg-yellow-400 px-5 py-2 rounded-md font-medium"
          >
            Search
          </button>
        </div>
      </div>
    </header>
  )
}



