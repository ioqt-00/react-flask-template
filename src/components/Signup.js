import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


async function signup(credentials) {
    return fetch('api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

function Signup() {
    const history = useHistory()
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        await signup({
            username,
            password,
            email
        });
        history.push('/login')
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
        <label>
        <p>Email</p>
        <input type="email" onChange={e => setEmail(e.target.value)} />
        </label>
        <div>
        <button type="submit">Submit</button>
        </div>
    </form>
    )
}

export default Signup;
