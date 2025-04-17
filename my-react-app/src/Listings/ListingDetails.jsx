import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Listings.css";  
function ListingDetails(){
    const { id } = useParams(); //gets param from url EX: Route path="/Listings/:id" 
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchListing = async () => { 
            //SAME AS LISTINGS.JSX
            try {
                const response = await fetch(`/api/listings/${id}`, { 
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    credentials: "include"
                }); 
                
                if (!response.ok) {
                    throw new Error("Error fetching listing details");
                }
                const data = await response.json();
                setListing(data);
            } catch (error) {
                setError(error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchListing();
    }, [id]);

    return (
        <div className="listing-details-container"> 
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">Error: {error.message}</div>} 
            {!listing && <div className="no-listing">No listing found!</div>}
            {listing && (
                <div className="listing-details"> 
                    <img src={listing.image} alt={listing.product} className="listing-image" />
                    <h1 className="listing-title">{listing.product}</h1>
                    <p className="listing-price">Price: ${listing.price}</p>
                    <p className="listing-seller">Seller: {listing.username}</p>
                    <p className="listing-description">{listing.description}</p>
                    <p className="listing-email">Email: {listing.email}</p>
                </div>
            )}
        </div> 
    );
}

export default ListingDetails;
