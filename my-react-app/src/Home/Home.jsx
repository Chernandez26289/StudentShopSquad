import "./Home.css";
import Navbar from "../Navbar/Navbar";

function Home(){
    return(
        <div className="home-page-container">
            <Navbar />
            <div className="maintitle">Welcome to Student Shop Squad!</div>
        </div>
    );
}

export default Home;