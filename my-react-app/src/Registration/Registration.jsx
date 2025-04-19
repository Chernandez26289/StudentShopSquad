import "./Registration.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Registration(){
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });
    const [error, setError] = useState('');

    //WORKS FOR ANY INPUT FIELD
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        console.log('Submitting form data:', formData);
        
        try {
            const response = await fetch('http://localhost:5173/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ 
                    username: formData.username,
                    password: formData.password,
                    email: formData.email
                }),
                credentials: 'include'
            });

            const errorData = await response.json();
            if (!response.ok) {
                
                throw new Error(errorData.message || ' Registration failed');
            }

           
            console.log('Registration successful:', errorData);
            navigate('/');
        } catch (err) {
            setError(err.message ||' An unexpected error occurred');
        }
            
            
            
        
    };
    
    return(
        <div className="rhdhd">
            <Navbar />
        <div className="registration-page-container">
            <div className="maintitle">Welcome to the Registration Page!</div>
            <div id= "about">Please enter information below!</div> 
            <br></br> 
            {error && <div className="error-message">Error! {error}</div> } 
            <br></br>
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
                <div id="emailcss">
                    <label htmlFor="email">Email: </label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Please enter Email" 
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <br/>
                <div id="submitbutton">
                    <input type="submit" value="Register" />
                </div>
                </div>
            </form>
            <div className="header-option-container" onClick={() =>{ navigate(`/Login`); }}>
            <div className="header-option-text">Have an Account? Click to Login.</div>
            </div>
        </div>
        </div>
    );
}

export default Registration;