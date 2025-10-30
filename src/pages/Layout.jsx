import Header from "./Header"
import React from "react"

export default function Layout({ children, onSearch }) {
  return (
    <>
      <Header onSearch={onSearch} />
      <div className="pt-24">
        {children}
      </div>
    </>
  )
}

