import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () =>{ 
  const navigate = useNavigate();
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
  return(
    <div className="header-container">
      <div className="header-options">
      
        <div className="header-option-container" onClick={() =>{ navigate(`/`); }}>
          <div className="header-option-text">Home</div>
        </div>

        <div className="header-option-container" onClick={() =>{ navigate(`/about`); }}>
          <div className="header-option-text">About</div>
        </div>

        <div className="header-option-container" onClick={() =>{ navigate(`/Listings`); }}>
          <div className="header-option-text">Listings</div>
        </div>
        <div className="money">
                <img src="public/money.png" alt="Image of money" height="50" />
            </div>
        {user && (
          <div className="header-option-container" onClick={() =>{ navigate(`/CreateListing`); }}>
            <div className="header-option-text">Create Listing</div>
          </div>
        )}

        {!user && (
          <div className="header-option-container" onClick={() =>{ navigate(`/Login`); }}>
            <div className="header-option-text">Login</div>
          </div>
        )}
      </div>
      {user && (
        <div className="profile-option-container" onClick={() =>{ navigate(`/Profile`); }}>
          <div className="header-option-text">Profile</div>
        </div>
      )}
    </div>
  );
};

export default Navbar;