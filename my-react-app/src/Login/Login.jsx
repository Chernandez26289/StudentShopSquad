import "./Login.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

function Login(){
    const navigate = useNavigate();
    return(
        <div className="login-page-container">
            <Navbar />
            <div className="maintitle">Welcome to the login page!</div>
            <br></br>
            <div id= "about">Please enter login below!</div> 
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
                <div id="submitbutton">
                    <input type="submit" value="Login"/>
                </div>
            </form>
            <div className="header-option-container" onClick={() =>{ navigate(`/Registration`); }}>
            <div className="header-option-text">No Account? Click to Register.</div>
            </div>
        </div>
    );
}

export default Login;