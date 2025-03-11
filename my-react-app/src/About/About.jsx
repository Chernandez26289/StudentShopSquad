import "./About.css";
import Navbar from "../Navbar/Navbar";

function About(){
    return(
        <div className="about-page-container">
            <Navbar />
            <div className="maintitle">Welcome to the about page!</div>
        </div>
    );
}

export default About;