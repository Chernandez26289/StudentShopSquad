import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./ListingDetails.css";  
import { useNavigate } from "react-router-dom";

function ListingDetails(){
    const { id } = useParams(); //gets param from url EX: Route path="/Listings/:id" 
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchListing = async () => { 
            try { 
                //sends get request to listings.mjs
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
                console.log("Listing data:", data); // Debug log
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

    return(
        <div className="listingsdetails-page-container"> 
        <Navbar />
        <br />
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">Error: {error.message}</div>} 
            {!listing && <div className="no-listing">No listing found!</div>}
            {listing && (
                <div className="listingdetails-item"> 
                    <img src={listing.image} alt={listing.product} className="listingdetails-image" />
                    <h1 className="listingdetails-title">{listing.product}</h1>
                    <p className="listingdetails-price">Price: ${listing.price}</p>
                    <p className="listingdetails-seller">Seller: {listing.username}</p>
                    <p className="listingdetails-email">Contact: {listing.email}</p>
                    <p className="listingdetails-description">{listing.description}</p>
                </div>
            )}
        </div> 
    );
}

export default ListingDetails;
