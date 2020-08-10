import React,{useState,useContext} from 'react'

import { useHistory } from "react-router-dom";

import {signIn} from '../../api/auth'
import {UserContext} from '../../context/UserContext'

/*I have this configured only for login local to test on Dev*/

const LocalLogin = () => {

    const [username,setUsername] = useState('')
    const history = useHistory();

    const {setUser} = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        signIn({username,password:'fake'}).then(user => {
            setUser(user)
            history.push("/");
        })
    }

    return(<form onSubmit={handleSubmit} style={{display:'flex',justifyContent:'center'}}>
        <input type ='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type='submit' value='Submit' />
    </form>)
}

export default LocalLogin