import React, { useState } from "react";
import axious from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {// to pass the setIsLoggedIn function as a prop, set it in users.jsx slay
    const [credentials , setCredientials] = useState({user_email: '', user_pass: ''});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;// destructuring the name andvalue w osas :O
        /*so basically,
        -name is the name attribute of the input field (e.g., "user_email" or "user_pass")
        -value is the current value of the input field */
        setCredientials({ ...credentials, [name]: value });
        /* so the "..."  spreads all existing properties of the credentials object into the new object. then
        name becomes whatever the name attribute of the input field is, and value becomes the current value of the input field 
        aka user_email: "user@example.com" */

    };

    const handleSubmit= async(e) => {
        e.preventDefault();
        try{
            const URL = 'http://localhost:4000/api/auth/login'
            const res = await axious.post(URL, credentials);
            if(res.data.token && res.status === 200){
                localStorage.setItem('token', res.data.token);
                setIsLoggedIn(true);
                navigate('/users');
                /*If successful and a token is received:

                -Stores the token in localStorage for persistent auth state.
                -Calls setIsLoggedIn(true) to update the app's authentication state.
                -Navigates to the '/users' route.
                */
            }

        }catch(e){
            console.error('Failed to login', e);
            alert('Failed to login, check your creds');
        }
        
    }
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="user_email"
                        value={credentials.user_email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="user_pass"
                        value={credentials.user_pass}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
    
}