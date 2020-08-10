import React, {createContext, useState, useEffect} from 'react'
import {getUser} from '../api/user'
export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user,setUser] = useState({})

    useEffect(()=>{
      getUser().then(data => setUser(data))
    },[])

    return (
        <UserContext.Provider value={{user,setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider