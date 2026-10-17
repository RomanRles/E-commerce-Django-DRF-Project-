import { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';


function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        setError('');

        try {
            const session = await login(username, password);

            if (session) {
                navigate("/");
            }
        }
        catch (err) {
            // return error
            setError('Wrong Username or password values');
        }

    }

    return (
        <form className="container mt-5" onSubmit={handleSubmit}>

                <div className="mb-3">   
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" value={username} onChange={e => {setUsername(e.target.value)}}></input>
                </div>
                <div className="mb-3">   
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={e => {setPassword(e.target.value)}} ></input>
                </div>
                {error && (
                    <div className='alert alert-danger'>
                        {error}
                    </div>
                )}

                <button type="submit" className="btn btn-primary">Submit</button>

            </form>
    )
}

export default LoginForm;