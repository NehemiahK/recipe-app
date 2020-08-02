import React from 'react'

import Profile from '../components/Profile/Profile'
import Home from '../components/Home/Home'

import {
    Switch,
    Route,
  } from "react-router-dom";

const Routes = () => {
    return (
        <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    )

}

export default Routes