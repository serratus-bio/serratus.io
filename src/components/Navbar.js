import React from 'react'
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <p>Navbar</p>
            <NavLink
            exact
            to="/"
            className="nav-item nav-link"
            activeClassName="nav-item nav-link active">Home</NavLink>
          <NavLink
            exact
            to="/"
            className="nav-item nav-link"
            activeClassName="nav-item nav-link active">About</NavLink>
          <NavLink
            exact
            to="/"
            className="nav-item nav-link"
            activeClassName="nav-item nav-link active">Projects</NavLink>
        </div>
    )
}

export default Navbar
