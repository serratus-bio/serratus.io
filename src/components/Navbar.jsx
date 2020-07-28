import React from 'react'
import { NavLink } from "react-router-dom";


const Navbar = () => {
  return (
    <div className="flex font-montserrat font-medium">
      <div className="flex sm:hidden w-full justify-center items-center text-center h-16 bg-gray-100 border-b-2 border-gray-300">
        <NavLink exact to="/" className="block w-20 h-8 m-auto"><img src="/logo.png" alt="logo" /></NavLink>
      </div>
      <div className="hidden sm:flex flex-row w-screen bg-gray-100 sm:p-4 justify-between z-10 border-b-2  border-gray-300">
        <NavLink exact to="/" className="ml-10 w-20 h-8 "><img src="/logo.png" alt="logo"></img></NavLink>
        <div className="justify-flex-end mt-1 mr-10">
          <NavLink exact to="/" className="ml-10 hover:text-blue-800" activeClassName="text-blue-600">Home</NavLink>
          <NavLink exact to="/mission" className="ml-10 hover:text-blue-800" activeClassName="text-blue-600">Mission</NavLink>
          <NavLink exact to="/technology" className="ml-10 hover:text-blue-800" activeClassName="text-blue-600">Technology</NavLink>
          <NavLink exact to="/query" className="ml-10 hover:text-blue-800" activeClassName="text-blue-600">Query</NavLink>
          <a href="https://github.com/ababaian/serratus" className="ml-8 bg-white font-mono font-normal border-2 border-gray-600 rounded-lg p-2 hover:text-blue-600 hover:border-blue-600" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
