import "./Home.css";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
function Home(){ 
    const [user, setUser] = useState(null); 
    //useEffect activates to perform side effects whenever a component renders 
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
    //no dependencies to only run once

   
    return(
        <div className="home-page-container">
            <Navbar />  
            {user && (<div className="maintitle">Welcome to Student Shop Squad {user.username}!</div>)}
            {!user && (<div className="maintitle">Welcome to Student Shop Squad!</div>)}
            <div id="AboutInfo">
                <p>
                    StudentShopSquad is a student-made site for the sale and purchase of school supplies relevant to a student's academic courses.
                </p>
                <p>
                    This project is designed to make the process of buying supplies from other students at the University of Florida more convenient.
                </p>
                <p>
                    While you are on StudentShopSquad, feel free to create an account, browse listings, or create one of your own. However, please be polite
                    toward other users, respect their privacy, and ensure a safe environment for everyone.
                </p>
                <p>
                    You are able to browse the listings while not logged in, but you are not able to create one without logging in, if you do not have an
                     account please select the login page and register from there!
                </p>
            </div>
        </div>
    );
}

export default Home;