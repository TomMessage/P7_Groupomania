import { useState } from "react";
import { useNavigate } from "react-router-dom";


function SignIn() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function handleLogin(e) {
        e.preventDefault();
        const formError = document.querySelector('.form-error');
        let data;
        try {
            if(email && password) {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                data = await response.json();
                if(response.status > 399) {
                    formError.innerHTML = data.message;
                } else {
                    const token = data.token;
                    const userId = data.userId;
                    const pseudo = data.pseudo;

                    localStorage.setItem('token', token);
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('pseudo', pseudo);

                    console.log(data)
                };
                navigate('/');
            }
        }
        catch(error) {
            console.log(error)

        };
    }

    return (
        <form action='' onSubmit={handleLogin} id='sign-up-form'>
            <label htmlFor='email'>Email</label>
            <br />
            <input type='text' name='email' id='email' onChange={(e) => setEmail
                (e.target.value)} value={email} />
            <br />
            <label htmlFor='password'>Mot de passe</label>
            <br />
            <input type="password" name='password' id='password' onChange={(e) => setPassword
                (e.target.value)} value={password} />
            <div className='form-error'></div>
            <br />
            <input type="submit" value="Se connecter" />

        </form>
    )
}

export default SignIn;