import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Profile.css";

function Profile(){
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const password = "MySecurePassword123"; //Replace with actual password source\
    const username = "UserExample"; //Replace with actual Username source
    const email = "User@example.com"; //Replace with actual Email source

    let passwordDisplay;
    let buttonText;
    let usernameDisplay;
    let emailDisplay;

    usernameDisplay = "Username: " + username;
    emailDisplay = "Email: " + email;

    if(showPassword){
        passwordDisplay = "Password: " + password;
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
        </div>
    );
}

export default Profile;