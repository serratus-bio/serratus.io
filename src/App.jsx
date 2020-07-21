import React from 'react';
import Navbar from './components/Navbar'
import { Route, useLocation, Switch } from "react-router-dom";
import { useTransition } from 'react-spring'
import './styles/main.css';
import Home from './pages/Home';
import Mission from './pages/Mission';
import Technology from './pages/Technology';
import Report from './pages/Report';
import Query from './pages/Query';

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
        <Route exact path="/mission" component={Mission} />
        <Route exact path="/technology" component={Technology} />
        <Route exact path="/query" component={Query} />
        <Route exact path="/report" component={Report} />
      </Switch>
    </div>
  );
}

export default App;
