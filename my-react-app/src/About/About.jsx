import "./About.css";
import Navbar from "../Navbar/Navbar";

function About(){
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