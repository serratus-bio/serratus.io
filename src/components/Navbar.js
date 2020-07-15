import React from 'react'
import { NavLink } from "react-router-dom";


const Navbar = () => {
  return (
    <div className="flex">
      <div className="flex flex-row w-screen bg-gray-100 sm:p-4 justify-between z-10 border-b-2  border-gray-300">
        <NavLink exact to="/" className="invisible sm:visible sm:ml-10 w-20 h-8 "><img src="/logo.png" alt="logo"></img></NavLink>
        <div className="justify-flex-end mt-1 mr-10">
          <NavLink exact to="/" className="invisible sm:visible ml-10 hover:text-blue-800" activeClassName="text-blue-600">Home</NavLink>
          <NavLink exact to="/Mission" className="invisible sm:visible ml-10 hover:text-blue-800" activeClassName="text-blue-600">Mission</NavLink>
          <NavLink exact to="/Technology" className="invisible sm:visible ml-10 hover:text-blue-800" activeClassName="text-blue-600">Technology</NavLink>
          <NavLink exact to="/Data" className="invisible sm:visible ml-10 hover:text-blue-800" activeClassName="text-blue-600">Data</NavLink>
          <a href="https://github.com/ababaian/serratus" className="invisible sm:visible ml-8 bg-white font-mono border-2 border-gray-600 rounded-lg p-2 hover:text-blue-600 hover:border-blue-600" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
