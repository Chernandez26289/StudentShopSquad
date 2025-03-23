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
        </div>
    );
}

export default Home;