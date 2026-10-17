// Create the Register form.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";

function RegisterForm() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        setError('');

        try {
            // Check passwords
            if (password !== passwordConfirmation) {
                setError("Your passwords don't match");
                return
            }

            // Pass the Information to the register function
            const response = await register(username, email, password, passwordConfirmation);

            if (response) {
                navigate("/login");
            }
        } catch (err) {
            setError(err.message);
        }

    }

    return (
 
            <form className="container mt-5" onSubmit={handleSubmit}>
                <div className="mb-3">   
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)}></input>
                </div>
                <div className="mb-3">   
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div className="mb-3">   
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div className="mb-3">   
                    <label className="form-label">Password Confirmation</label>
                    <input type="password" className="form-control" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)}></input>
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

export default RegisterForm;