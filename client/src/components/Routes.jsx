import React from 'react'

import {
  Switch,
  Route,
} from "react-router-dom";

import Home from '../components/Home/Home'
import AddRecipe from './AddRecipe/AddRecipe';
import LocalLogin from './LocalLogin/LocalLogin';

const Routes = () => {
    return (
        <Switch>
        
        <Route path={["/add-recipe/:id","/add-recipe"]}>
          <AddRecipe />
        </Route>

        <Route path="/login-local">
          <LocalLogin />
        </Route>

        <Route path="/">
          <Home />
        </Route>

      </Switch>
    )

}

export default Routes