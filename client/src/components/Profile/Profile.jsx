import React,{useEffect,useContext, useState} from 'react'

import {UserContext} from '../../context/UserContext'

const Profile = () => {
    const {user, setUser} = useContext(UserContext)

    const [userForm, setUserForm] = useState({firstName:'', lastName:''})

    const updateUserForm = (e) => {
        setUserForm({
            ...userForm,
            [e.target.name]:e.target.value
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        fetch("/api/user",{
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache': 'no-cache' 
              },
            credentials: 'same-origin',
            body: JSON.stringify(userForm)
          })
          .then(res => res.json())
          .then(data => setUser(data))
    }

  useEffect(()=>{
      let firstName = user.firstName || ''
      let lastName = user.lastName || ''
      setUserForm({firstName,lastName})
  },[user])

    return <div>
        <form onSubmit={handleFormSubmit}>
        <label>
          First Name:
          <input type="text" name='firstName' 
          value={userForm.firstName} onChange={updateUserForm} />
        </label>

        <label>
          Last Name:
          <input type="text" name='lastName' 
          value={userForm.lastName} onChange={updateUserForm} />
        </label>

        <input type="submit" value="Submit" />
        </form>
    </div>
}

export default Profile