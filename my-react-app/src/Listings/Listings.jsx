import "./Listings.css";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";

function Listings(){
    const [searchFilter, setSearchFilter] = useState("");
    const [listings, setListings] = useState([]);
    const [error, setError] = useState(null);
    const [currpage, setcurrpage] = useState(0);
    const listingsperpage = 12;

    useEffect(() => {
        const fetchListings = async () => {
            console.log("Fetching listings...");
            try {
                const response = await fetch('http://localhost:5173/api/listings', {
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
        };
        fetchListings();
    }, []);

    const filterListings = (e) =>{
        setSearchFilter(e.target.value);
    };

    const handleSearch = (e) =>{
        e.preventDefault();
        console.log('Searching for:', searchFilter);
    };

    const start = currpage * listingsperpage;
    const end = start + listingsperpage;
    const displayed = listings.slice(start, end);

    return(
        <div className="listings-page-container">
            <Navbar />
            <div className="maintitle">Welcome to the Listings Page!</div>
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
            <div className="listings-grid">
                {displayed.map((listing) => (
                    <div key={listing._id} className="listing-item">
                        <img src={listing.image} alt={listing.product} className="listing-image"/>
                        <h1 className="listing-title">{listing.product}</h1>
                        <p className="listing-price">Price: ${listing.price}</p>
                        <p className="listing-seller">Seller: {listing.username}</p>
                        <p className="listing-description">{listing.description}</p>
                    </div>
                ))}
            </div>
            <div className="pagination-buttons">
                <button
                    onClick={() => setcurrpage((prev) => Math.max(prev - 1, 0))}
                    disabled={currpage === 0}
                    className="pagination-button"
                >
                    Previous 12
                </button>
                <button
                    onClick={() => setcurrpage((prev) => (start + listingsperpage < listings.length ? prev + 1 : prev))}
                    disabled={end >= listings.length}
                    className="pagination-button"
                >
                    Next 12
                </button>
            </div>
        </div>
    );
}

export default Listings;