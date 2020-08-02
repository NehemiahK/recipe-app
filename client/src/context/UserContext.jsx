import React, {createContext, useState, useEffect} from 'react'

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user,setUser] = useState({})

    useEffect(()=>{
      fetch('/api/user')
      .then(res => res.json())
      .then(data => {
          const  {status,firstName,lastName} = data
          setUser({status,firstName,lastName})
      }).catch(err=> console.log(err))
    },[])

    return (
        <UserContext.Provider value={{user,setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider