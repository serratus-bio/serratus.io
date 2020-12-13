import React from 'react';
import Navbar from './components/Navbar'
import { Route, useLocation, Switch, Redirect } from "react-router-dom";
import ReactGA from 'react-ga';
import { useTransition } from 'react-spring'
import './styles/main.css';
import Home from './pages/Home';
import Explorer from './components/Explorer';
import About from './pages/About';
import Team from './pages/Team';
import Jbrowse from './pages/Jbrowse';
import Access from './pages/Access';

export default () => {
  React.useEffect(() => {
    // track initial page load
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

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
        <Route exact path="/explorer" component={Explorer} />
        <Route exact path="/about" component={About} />
        <Route exact path="/team" component={Team} />
        <Route exact path="/jbrowse" component={Jbrowse} />
        <Route exact path="/access" component={Access} />
        <Route exact path="/family" component={() => {return <Redirect to="/explorer" />}} />
        <Route exact path="/explore" component={() => {return <Redirect to="/explorer" />}} />
        <Route exact path="/query" component={() => {return <Redirect to="/explorer" />}} />
      </Switch>
    </div>
  );
}
