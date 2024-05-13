import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { setToken } from '../helpers/login';

async function loginUser(credentials) {
    return fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

function Login() {
    const history = useHistory();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token)
        history.push("/home")
      }

    return(
    <form onSubmit={handleSubmit}>
        <label>
        <p>Username</p>
        <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
        <p>Password</p>
        <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
        <button type="submit">Submit</button>
        </div>
    </form>
    )
}

export default Login;
