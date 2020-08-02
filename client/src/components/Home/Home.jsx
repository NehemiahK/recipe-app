import React,{useContext} from 'react'

import {UserContext} from '../../context/UserContext'

const Home = () => {
    const {user} = useContext(UserContext)

    return <div>
        {user.firstName ? 
            <div>Welcome {user.firstName}. Do you want to 
                 <a href='http://localhost:5000/auth/logout'> log out</a> ?
            
            </div>
            : <a href='http://localhost:5000/auth/facebook'>Login With Facebook</a>

        }
        

    </div>
}

export default Home