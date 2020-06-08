import React from 'react'
import { NavLink, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from '../pages/Home'
import About from '../pages/About'
import Projects from '../pages/Projects'

const Navbar = () => {
    return (
        <Router>
            <div className="flex flex-row bg-teal-500 p-4 justify-between">
                <p className="ml-10">Navbar</p>
                <div className="justify-flex-end mr-10">
                    <NavLink exact to="/" className="ml-10 hover:text-blue-800" activeClassName="text-blue-600">Home</NavLink>
                    <NavLink exact to="/About" className="ml-10 hover:text-blue-800" activeClassName="text-blue-600">About</NavLink>
                    <NavLink exact to="/Projects" className="ml-10 hover:text-blue-800" activeClassName="text-blue-600">Projects</NavLink>
                </div>
            </div>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/About">
                    <About/>
                </Route>
                <Route exact path="/Projects">
                    <Projects/>
                </Route>
            </Switch>
    </Router>
    )
}

export default Navbar
