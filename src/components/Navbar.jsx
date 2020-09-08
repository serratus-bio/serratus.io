import React from 'react'
import { NavLink } from "react-router-dom";
import { ExternalLink } from "../helpers/common";


const Navbar = () => {
  return (
    <div className="flex font-montserrat font-medium">
      <div className="flex sm:hidden w-full justify-center items-center text-center h-16 bg-gray-100 border-b-2 border-gray-300">
        <NavLink exact to="/" className="block w-20 h-8 m-auto"><img src="/logo.png" alt="logo" /></NavLink>
      </div>
      <div className="hidden sm:flex flex-row w-screen bg-gray-100 sm:p-4 justify-between z-10 border-b-2  border-gray-300">
        <NavLink exact to="/" className="ml-10 w-20 h-8 "><img src="/logo.png" alt="logo"></img></NavLink>
        <div className="justify-flex-end mt-1 mr-10">
          <NavLink exact to="/explorer" className="ml-10 hover:text-blue-800" activeClassName="text-blue-600">Explorer</NavLink>
          <NavLink exact to="/about" className="ml-10 hover:text-blue-800" activeClassName="text-blue-600">About</NavLink>
          <NavLink exact to="/team" className="ml-10 hover:text-blue-800" activeClassName="text-blue-600">Team</NavLink>
          <ExternalLink href="https://www.biorxiv.org/content/10.1101/2020.08.07.241729v1" className="ml-6 bg-white font-mono font-normal border-2 border-gray-600 rounded-lg p-2 hover:text-blue-600 hover:border-blue-600">Preprint</ExternalLink>
          <ExternalLink href="https://github.com/ababaian/serratus" className="ml-6 bg-white font-mono font-normal border-2 border-gray-600 rounded-lg p-2 hover:text-blue-600 hover:border-blue-600">GitHub</ExternalLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
