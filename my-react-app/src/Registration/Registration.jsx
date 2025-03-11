import "./Registration.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

function Registration(){
    const navigate = useNavigate();
    return(
        <div className="registration-page-container">
            <Navbar />
            <div className="maintitle">Welcome to the registration page!</div>
            <br></br>
            <div id= "about">Please enter information below!</div> 
            <br></br>
            <form>
                <div id="usernamecss">
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" name="username" placeholder="Please enter Username" required/>
                </div>    
                <br/>
                <div id="passwordcss">
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" placeholder="Please enter Password" required/>
                </div>
                <br/>
                <div id="emailcss">
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" name="email" placeholder="Please enter Email" required/>
                </div>
                <br/>
                <div id="submitbutton">
                    <input type="submit" value="Login"/>
                </div>
            </form>
            <div className="header-option-container" onClick={() =>{ navigate(`/Login`); }}>
            <div className="header-option-text">Have an Account? Click to Login.</div>
            </div>
        </div>
    );
}

export default Registration;