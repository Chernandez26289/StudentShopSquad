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
                setListings(data);
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
        // TODO: Implement search functionality when listings data is available
        console.log('Searching for:', searchFilter);
    };

    return (
        <div className="listings-page-container">
            <Navbar />
            <div className="maintitle">Welcome to the listings page!</div>
            <form onSubmit={handleSearch} className="search-container">
                <input
                    type="text"
                    placeholder="Search listings..."
                    value={searchFilter}
                    onChange={filterListings}
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>
            {loading && <div className="loading">Loading Listings...</div>}
            <div className="listings">
                {listings.slice().reverse().map((listing) => (  
                    //NEW adding a link, which brings to other page 
                    //Prevents full page reload, href would reload the page, which loses state
                    <Link to={`/Listings/${listing._id}`} key={listing._id}>
                        <div key={listing._id} className="listing-item">
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