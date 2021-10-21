import React from 'react'
import ReactGA from 'react-ga'
import { Route, Switch } from 'react-router-dom'
import { routes } from './common/routes'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'

import './styles/main.css'

export const App = () => {
    React.useEffect(() => {
        // track initial page load
        ReactGA.pageview(window.location.pathname + window.location.search)
    }, [])

    return (
        <div>
            <Navbar></Navbar>
            <Switch>
                {Object.values(routes).map((route) => (
                    <Route
                        exact={route.exact}
                        path={route.path}
                        component={route.component}
                        key={route.path}
                    />
                ))}
            </Switch>
            {window.location.pathname !== '/' && <Footer />}
        </div>
    )
}
