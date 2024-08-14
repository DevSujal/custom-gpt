import React from 'react'
import Input from './Input'

function Search({className}) {
  return (
    <div className={`${className}`}>
    <Input className = "w-full rounded-none bg-transparent" placeholder = "Find a Conversation"/>
    </div>
  )
}

export default Search
