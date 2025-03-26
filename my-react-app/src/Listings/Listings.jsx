import "./Listings.css";
import Navbar from "../Navbar/Navbar";
import { useState } from "react";

function Listings(){
    const [searchFilter, setSearchFilter] = useState("");

    const filterListings = (e) => {
        setSearchFilter(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // TODO: Implement search functionality when listings data is available
        console.log('Searching for:', searchFilter);
    };

    return(
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
        </div>
    );
}

export default Listings;