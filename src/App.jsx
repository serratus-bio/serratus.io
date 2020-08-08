import React from 'react';
import Navbar from './components/Navbar'
import { Route, useLocation, Switch } from "react-router-dom";
import { useTransition } from 'react-spring'
import './styles/main.css';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Query from './pages/Query';
import About from './pages/About';
import Team from './pages/Team';
import Access from './pages/Access';

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
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/query" component={Query} />
        <Route exact path="/about" component={About} />
        <Route exact path="/team" component={Team} />
        <Route exact path="/access" component={Access} />
      </Switch>
    </div>
  );
}

export default App;
