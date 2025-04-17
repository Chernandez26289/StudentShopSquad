import "./Listings.css";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 

function Listings() {
    const [searchFilter, setSearchFilter] = useState("");
    const [listings, setListings] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            console.log("fetching listings");
            try {
                const response = await fetch('/api/listings', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    credentials: "include"
                });

                if (!response.ok) {
                    throw new Error('Error Getting Listings');
                }

                const data = await response.json();
                setListings(data.reverse());
            } catch (error) {
                setError(error);
            } 
            finally {
                console.log("Listings Loaded"); 
                setLoading(false);
            }
        };
        fetchListings();
    }, []);

    const filterListings = (e) => {
        setSearchFilter(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchFilter);
    };

    return (
        <div>
            {loading && <div className="loading">Loading Listings...</div>}
            <div className="listings">
                {listings.slice().reverse().map((listing) => (  
                    <Link to={`/Listings/${listing._id}`} key={listing._id}>
                        <div className="listing-item">
                            <img src={listing.image} alt={listing.product} className="listing-image" />
                            <h1 className="listing-title">{listing.product}</h1>
                            <p className="listing-price">Price: ${listing.price}</p>
                            <p className="listing-seller">Seller: {listing.username}</p>
                            <p className="listing-description">{listing.description}</p>
                        </div> 
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Listings;