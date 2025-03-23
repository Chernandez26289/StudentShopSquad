import "./About.css";
import Navbar from "../Navbar/Navbar";
import { useEffect } from 'react';

function About(){
    useEffect(() => {
        console.log('About component loaded - Making API call...');
        
        fetch('http://localhost:5173/api/about')
            .then(response => {
                console.log('Received response:', response.status);
                return response.json();
            })
            .then(data => {
                console.log('Backend response data:', data);
            })
            .catch(error => {
                console.error('Error making API call:', error);
            });
    }, []);

    return(
        <div className="about-page-container">
            <Navbar />
            <div className="maintitle">Welcome to the About Page!</div>
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
            </div>
        </div>
    );
}

export default About;