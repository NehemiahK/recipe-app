import React from 'react'

const LoginButton = ({ loggedIn }) => {
    return <li>
        {loggedIn ? <a href='http://localhost:5000/auth/logout'>Logout</a> :
            <a href='http://localhost:5000/auth/facebook'>Login</a>
        }
    </li>
}

export default LoginButton