import React from 'react';
import Navbar from './components/Navbar'
import { Route, useLocation, Switch} from "react-router-dom";
import {useTransition} from 'react-spring'
import './styles/main.css';
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Data from './pages/Data'

const App = () => {
  const location = useLocation()
  useTransition(location, location => location.pathname, {
    from: { opacity: 0, transform: "translate(100%, 0)" },
    enter: { opacity: 1, transform: "translate(0, 0)" },
    leave: { opacity: 0, transform: "translate(-100%, 0)" },
  });

  return (
    <div>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Mission" component={About} />
        <Route exact path="/Technology" component={Projects} />
        <Route exact path="/Data" component={Data} />
      </Switch>
    </div>
  );
}

export default App;
