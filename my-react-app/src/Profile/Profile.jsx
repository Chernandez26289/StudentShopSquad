import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Profile.css";
import "../Listings/Listings.css";

function Profile(){
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); 
    const [user, setUser] = useState(null);
    const [userListings, setUserListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isManaging, setIsManaging] = useState(false);
    const [hoverListingId, setHoverListingId] = useState(null);
    const [deletingListings, setDeletingListings] = useState(new Set());
    //Methods
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
                // Fetch user's listings after getting user data
                fetchUserListings(data.username);
            } catch (error){
                console.error('fail in check if logged in', error);
            }
        };
        checkIfLoggedIn();  
        console.log('user', user);
    }, []);   

    const fetchUserListings = async (username) => {
        try {  
            setLoading(true);
            //URI encodes the username to avoid special characters to crash our server
            const response = await fetch(`http://localhost:5173/api/listings?username=${encodeURIComponent(username)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Error Getting Listings');
            }
            const data = await response.json();
            setUserListings(data);
        } catch (error) { 
            setLoading(false);
            console.error('Error fetching user listings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5173/api/logout', { 
                method: 'POST',
                credentials: 'include'
            }); 
            if (!response.ok){
                throw new Error('Failed to logout');
            }
            setUser(null);
            navigate('/Login');
        } catch (error){
            console.error('fail in logout', error);
        }
    };

    const handleDeleteListing = async (listingId) => {
        try {
            // Add this listing to the deleting set
            setDeletingListings(prev => new Set([...prev, listingId]));

            const response = await fetch(`http://localhost:5173/api/listings/${listingId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to delete listing');
            }

            // Remove the listing from state
            setUserListings(prevListings => 
                prevListings.filter(listing => listing._id !== listingId)
            );
        } catch (error) {
            console.error('Error deleting listing:', error);
        } finally {
            // Remove this listing from the deleting set
            setDeletingListings(prev => {
                const newSet = new Set(prev);
                newSet.delete(listingId);
                return newSet;
            });
        }
    };

    //Variables
    let password = "Please login to view password"; 
    let username = "Please login to view username"; 
    let email = "Please login to view email";
    
    let passwordDisplay;
    let buttonText;
    const usernameDisplay = user ? "Username: " + user.username : "Username: " + username;
    const emailDisplay = user ? "Email: " + user.email : "Email: " + email;

    if(showPassword){
        passwordDisplay = user ? "Password: " + user.password : "Password: " + password;
        buttonText = "Hide Password";
    }else{
        passwordDisplay = "Password: Hidden";
        buttonText = "Show Password";
    }

    return(
        <div className="profile-page-container">
            <Navbar />
            <div className="maintitle">Profile</div>
            <br/>
            <div id="Hello-User">{usernameDisplay}</div>
            <br/>
            <div id="profile-EmailInfo">{emailDisplay}</div>
            <br/>
            <div id="profile-passwordcss" className={showPassword ? "visible-password" : "hidden-password"}>
                {passwordDisplay}
            </div>
            <br/>
            <div id="toggleButton">
                <button onClick={() => setShowPassword(!showPassword)}>
                    {buttonText}
                </button>
            </div>  
            <br/>
            <div id="toggleButton">
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div> 
            <div className="listings-container"> 
                {loading && <div className="loading">Loading...</div>}
                {!loading && (
                    <>
                        <div className="listings-header">
                            {!isManaging ? <h2>{user ? user.username : "Please login to view listings"}'s Listings</h2> : <h2>Click to Delete!</h2>}
                            {userListings.length > 0 && (
                                <button 
                                    className="manage-listings-button"
                                    onClick={() => setIsManaging(!isManaging)}
                                >
                                    {isManaging ? "Done Managing" : "Manage Listings"}
                                </button>
                            )}
                        </div>
                        <div className="listings-grid">
                            {userListings.map((listing) => (
                                <div 
                                    key={listing._id} 
                                    className={`listing-item ${isManaging ? 'managing' : ''} ${deletingListings.has(listing._id) ? 'deleting' : ''}`}
                                    onMouseEnter={() => isManaging && !deletingListings.has(listing._id) && setHoverListingId(listing._id)}
                                    onMouseLeave={() => setHoverListingId(null)}
                                    onClick={() => isManaging && !deletingListings.has(listing._id) && handleDeleteListing(listing._id)}
                                >
                                    <img src={listing.image} alt={listing.product} className="listing-image"/>
                                    <h3 className="listing-title">{listing.product}</h3>
                                    <p className="listing-price">Price: ${listing.price}</p>
                                    <p className="listing-description">{listing.description}</p>
                                    {isManaging && hoverListingId === listing._id && !deletingListings.has(listing._id) && (
                                        <div className="delete-overlay">
                                            <p>Do you want to remove {listing.product}?</p>
                                            <p className="click-instruction">Click to remove</p>
                                        </div>
                                    )}
                                    {deletingListings.has(listing._id) && (
                                        <div className="deleting-overlay">
                                            <p>Deletion in progress...</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Profile;