import React,{useContext} from 'react'
import {Link} from "react-router-dom";

import {UserContext} from '../../context/UserContext'

import './navbar.css'
import LoginButton from '../LoginButton/LoginButton';

const pages = [
  {path:'/',label:'Home'},
  {path:'/add-recipe',label:'Add a Recipe',onlyLoggedIn:true},
]

const Navbar = () => {
  const {user : {loggedIn} } = useContext(UserContext)

    return(
        <nav className='navbar'>
        <ul>
          {pages.map(({path,label,onlyLoggedIn}) => {
           return onlyLoggedIn && !loggedIn ? <></>:
          <li key={path}>
            <Link to={path}>{label}</Link>
          </li>
          }
    )}
          
          <LoginButton loggedIn={loggedIn}/>
        
        </ul>
      </nav>
    )
}

export default Navbar