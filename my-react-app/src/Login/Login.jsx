import "./Login.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login(){
    const navigate = useNavigate();   
    // Set format on how we recieve data with the form
    const [formData, setFormData] = useState({ 
        username: '', 
        password: ''
    })  
    // Set format on how we recieve error
    const [error, setError] = useState('');

    const handleChange = (event) => { 
        const {name, value} = event.target;
        setFormData({...formData, [name]: value})
    } 

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        console.log('Submitting form data:', formData);

        try {
            const response = await fetch('http://localhost:5173/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                }),
                credentials: 'include'
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            console.log('Login successful:', data);
            navigate('/');
        } catch (err) {
            setError(err.message || 'An unexpected error occurred');
        }
    };

    return(
        <div className="login-page-container">
            <Navbar />
            <div className="maintitle">Welcome to the Login Page!</div>
            <div id="about">Please enter login below!</div> 
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-container">
                <div id="usernamecss">
                    <label htmlFor="username">Username: </label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        placeholder="Please enter Username" 
                        required
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>    
                <div id="passwordcss">
                    <label htmlFor="password">Password: </label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Please enter Password" 
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div id="submitbutton">
                    <input type="submit" value="Login"/>
                </div>
                </div>
            </form>
            <div className="header-option-container" onClick={() => { navigate(`/Registration`); }}>
                <div className="header-option-text">No Account? Click to Register.</div>
            </div>
        </div>
    );
}

export default Login;