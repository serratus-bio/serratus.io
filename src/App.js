import React from 'react';
import Navbar from './components/Navbar'
import { Route, useLocation, Switch, BrowserRouter as Router } from "react-router-dom";
import {useTransition, animated} from 'react-spring'
import './styles/main.css';
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
// import Background from './images/background.jpg'

const App = () => {
  const location = useLocation()
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0, transform: "translate(100%, 0)" },
    enter: { opacity: 1, transform: "translate(0, 0)" },
    leave: { opacity: 0, transform: "translate(-100%, 0)" },
    
  });

  return (
    <>
      <Navbar></Navbar>
      {transitions.map(({ item, props, key}) => (
        <animated.div key={key} style={props}>
          <Switch location={item} >
              <Route exact path="/">
                  <Home />
              </Route>
              <Route exact path="/About">
                  <About/>
              </Route>
              <Route exact path="/Projects">
                  <Projects/>
              </Route>
          </Switch>
        </animated.div>
      ))}
    
    </>
  );
}

export default App;
