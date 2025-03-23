import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Profile.css";

function Profile(){
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); 
    const [user, setUser] = useState(null);  
   
    //Methods
    useEffect(() =>{  
        console.log('home page rendered');
        const checkIfLoggedIn = async () => {
            try {
                const response = await fetch('http://localhost:5173/api/login/status', {
                    credentials: 'include'
                });
                if (!response.ok){ 
                    throw new Error('Login First!');
                } 
                const data = await response.json();  
                setUser(data);
            } catch (error){
                console.error('fail in check if logged in', error);
            }
        };
        checkIfLoggedIn();  
        console.log('user', user);
    }, []);   

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5173/api/logout', { 
                method: 'POST',
                credentials: 'include'
            }); 
            if (!response.ok){
                throw new Error('Failed to logout');
            }
            setUser(null);
            navigate('/Login');
        } catch (error){
            console.error('fail in logout', error);
        }
    };

    //Variables
    let password = "Please login to view password"; 
    let username = "Please login to view username"; 
    let email = "Please login to view email";
    
    let passwordDisplay;
    let buttonText;
    const usernameDisplay = user ? "Username: " + user.username : "Username: " + username;
    const emailDisplay = user ? "Email: " + user.email : "Email: " + email;

    if(showPassword){
        passwordDisplay = user ? "Password: " + user.password : "Password: " + password;
        buttonText = "Hide Password";
    }else{
        passwordDisplay = "Password: Hidden";
        buttonText = "Show Password";
    }
    return(
        <div className="profile-page-container">
            <Navbar />
            <div className="maintitle">Profile</div>
            <br/>
            <div id="Hello-User">{usernameDisplay}</div>
            <br/>
            <div id="EmailInfo">{emailDisplay}</div>
            <br/>
            <div id="passwordcss" className={showPassword ? "visible-password" : "hidden-password"}>
                {passwordDisplay}
            </div>
            <br/>
            <div id="toggleButton">
                <button onClick={() => setShowPassword(!showPassword)}>
                    {buttonText}
                </button>
            </div>  
            <br/>
            <div id="toggleButton">
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Profile;