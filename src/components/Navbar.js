import React, { useLocation } from 'react'
import { NavLink } from "react-router-dom";
import { Link, animateScroll as scroll } from "react-scroll";


const Navbar = () => {
    const [menu, setMenu] = React.useState(false)

    const handleClick = () => {
        setMenu(!menu)
    }


    return (
        <div className="flex">
             
           {menu ? 
           <div>
                <div className="flex flex-col fixed w-screen h-screen bg-gray-500 p-4 z-10 border-b-2 align-items justify-center border-gray-300 text-center mb-64 pb-32">
                <NavLink exact to="/" className="sm:invisible font-mono text-xl ml-2 p-6 text-size hover:text-blue-800"  onClick={() => handleClick()} activeClassName="text-blue-600">Home</NavLink>
                <NavLink exact to="/About" className=" sm:invisible font-mono ml-2  text-xl p-6 hover:text-blue-800" onClick={() => handleClick()} activeClassName="text-blue-600">About</NavLink>
                <NavLink exact to="/Projects" className="sm:invisible font-mono text-xl ml-2 p-6 hover:text-blue-800" onClick={() => handleClick()} activeClassName="text-blue-600">Projects</NavLink>
                <a href="/danLohrResume.pdf" onClick={() => handleClick()} className=" sm:invisible text-xl font-mono ml-2 p-6 hover:text-blue-800" target="_blank">Resume</a>
               </div> 
               </div>
               : 
            <div className="flex flex-row absolute w-screen bg-gray-100 sm:p-4 justify-between z-10 border-b-2  border-gray-300">
           <NavLink exact to="/"  className="invisible sm:visible sm:ml-10 w-20 h-8 "><img src="/logo.png"></img></NavLink>
           <div className="justify-flex-end mt-1 mr-10">
           {/* <text>hi</text> */}
           <div className="flex flex-row justify-between pl-8 pr-2">
           <NavLink exact to="/"  className="visible mt-6 pt-1 sm:hidden sm:ml-10 w-2 h-2"><img src="/logo.png"></img></NavLink>
           <svg onClick={() => handleClick()} className="visible sm:hidden mt-6" viewBox="0 0 100 80" width="40" height="40">
            <rect width="100" height="20"></rect>
            <rect y="30" width="100" height="20"></rect>
            <rect y="60" width="100" height="20"></rect>
            </svg>
           </div>
               <NavLink exact to="/" className="invisible sm:visible ml-10 hover:text-blue-800" activeClassName="text-blue-600">Home</NavLink>
               <NavLink exact to="/Mission" className="invisible sm:visible ml-10 hover:text-blue-800" activeClassName="text-blue-600">Mission</NavLink>
               <NavLink exact to="/Technology" className="invisible sm:visible ml-10 hover:text-blue-800" activeClassName="text-blue-600">Technology</NavLink>
               <NavLink exact to="/Data" className="invisible sm:visible ml-10 hover:text-blue-800" activeClassName="text-blue-600">Data</NavLink>
               <a href="https://github.com/ababaian/serratus" className="invisible sm:visible ml-8 bg-white font-mono border-2 border-gray-600 rounded-lg p-2 hover:text-blue-600 hover:border-blue-600" target="_blank">GitHub</a>
               {/* border-2 border-black rounded-lg px-4 py-2 hover:bg-gray-100 hover:text-blue-600 hover:border-white */}
           </div>
            </div>}  
        </div>
    )
}

export default Navbar
