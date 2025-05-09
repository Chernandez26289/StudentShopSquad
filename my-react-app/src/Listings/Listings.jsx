/**
 * Listings Component
 * 
 * This component displays a grid of product listings with search functionality and pagination.
 * It fetches listings from the backend API and allows users to search through them.
 */

import "./Listings.css";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";  

function Listings(){
    // State management for listings and search functionality
    const [searchFilter, setSearchFilter] = useState("");
    const [listings, setListings] = useState([]);
    const [error, setError] = useState(null);
    const [currpage, setcurrpage] = useState(0); 
    const [loading, setLoading] = useState(false);
    const [searchTimeout, setSearchTimeout] = useState(null);
    const listingsperpage = 12;
    const [isSearching, setIsSearching] = useState(false);

    /**
     * Fetches listings from the backend API
     */
    const fetchListings = async (search = "") => {
        console.log("Fetching listings...");
        try { 
            setLoading(true);
            const response = await fetch(`http://localhost:5173/api/listings${search ? `?search=${encodeURIComponent(search)}` : ''}`, {
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
        } finally {
            setLoading(false);
            setIsSearching(false);
        }
    };

    // Cleanup timeout on component unmount
    useEffect(() => {
        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchTimeout]);

    // Fetch listings on component mount
    useEffect(() => {
        setLoading(true);
        fetchListings();
    }, []);

    /**
     * Updates the search filter state
     * @param {Event} e - The input change event
     */
    const filterListings = (e) => {
        setSearchFilter(e.target.value);
    };

    /**
     * Handles the search form submission
     * @param {Event} e - The form submission event
     */
    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchFilter);
        if (searchFilter.trim()) {
            setIsSearching(true);
            setLoading(true);
            fetchListings(searchFilter);
        }
    };

    /**
     * Resets the search and shows all listings
     */
    const handleShowAll = () => {
        setSearchFilter("");
        setIsSearching(false);
        setLoading(true);
        fetchListings();
    };

    // Calculate pagination boundaries
    const start = isSearching ? 0 : currpage * listingsperpage;
    const end = isSearching ? listings.length : start + listingsperpage;
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
                <button type="button" onClick={handleShowAll} className="search-button">
                    Show All
                </button>
            </form>
            <br />
            {loading && <div className="loading">Loading...</div>}
            <div className="listings-container"> 
                <div className="listings-grid">
                    {displayed.map((listing) => ( 
                        <Link to={`/Listings/${listing._id}`} key={listing._id} className="listing-link">    
                            <div className="listing-item">
                                <img src={listing.image} alt={listing.product} className="listing-image"/>
                                <div className="listing-content">
                                    <h1 className="listing-title">{listing.product}</h1>
                                    <p className="listing-price">Price: ${listing.price}</p>
                                    <p className="listing-seller">Seller: {listing.username}</p>
                                    <p className="listing-description">{listing.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            {!searchFilter && (
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
            )}
        </div>
    );
}

export default Listings;