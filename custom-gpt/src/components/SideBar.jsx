import React from 'react'
import Search from './Search'

function SideBar({className}) {
  return (
    <div className={` border-r-gray-700 border-r-2 bg-transparent cursor-w-resize resize-x max-w-lg overflow-auto ${className}`}>
      <Search className="bg-transparent border-b-2 mb-2"/>
    </div>
  )
}

export default SideBar
