import React from 'react'

const LoginButton = ({ loggedIn }) => {
    return <li>
        {loggedIn ? <a href='/auth/logout'>Logout</a> :
            <a href='/auth/facebook'>Login</a>
        }
    </li>
}

export default LoginButton