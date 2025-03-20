import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () =>{
  const navigate = useNavigate();
  return(
    <div className="header-container">
      <div className="header-options">
      <div className="money">
                <img src="public/money.png" alt="Image of money" height="50" />
            </div>
        <div className="header-option-container" onClick={() =>{ navigate(`/`); }}>
          <div className="header-option-text">Home</div>
        </div>

        <div className="header-option-container" onClick={() =>{ navigate(`/about`); }}>
          <div className="header-option-text">About</div>
        </div>

        <div className="header-option-container" onClick={() =>{ navigate(`/Listings`); }}>
          <div className="header-option-text">Listings</div>
        </div>

        <div className="header-option-container" onClick={() =>{ navigate(`/Login`); }}>
          <div className="header-option-text">Login</div>
        </div>
      </div>
      <div className="profile-option-container" onClick={() =>{ navigate(`/Profile`); }}>
          <div className="header-option-text">Profile</div>
        </div>
    </div>
  );
};

export default Navbar;