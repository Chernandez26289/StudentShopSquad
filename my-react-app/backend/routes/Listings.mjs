/**
 * Listings Route Handler
 * 
 * This module handles all listing-related API endpoints including:
 * - Fetching all listings with optional search
 * - Fetching a single listing by ID
 * - Deleting listings with proper authorization
 */

import { Router } from "express";
import { listing } from "../mongoose/listing.mjs";

const router = Router();

/**
 * GET /api/listings
 * Fetches all listings with optional search functionality and username filtering
 * Query Parameters:
 * - search: Optional string to filter listings by product name, description, or username
 * - username: Optional string to filter listings by exact username match
 * Returns:
 * - 200: Array of listings matching the search criteria
 * - 500: Error message if database query fails
 */
router.get('/api/listings', async (request, response) => {
    try {
        const { search, username } = request.query;
        let query = {};
        
        // If username is provided, filter by exact username match
        if (username) {
            query.username = username;
        }
        
        // If search parameter exists, create a search query
        if (search) {
            query = {
                ...query,
                $or: [
                    { product: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                    { username: { $regex: search, $options: 'i' } }
                ]
            };
        }

        const listings = await listing.find(query);
        console.log('Listings from database:', listings);
        return response.status(200).json(listings);
    } catch (error) {
        console.error("Error fetching listings:", error);
        return response.status(500).json({ message: "Error fetching listings" });
    }
});

/**
 * GET /api/listings/:id
 * Fetches a single listing by its ID
 * Parameters:
 * - id: The MongoDB ID of the listing to fetch
 * Returns:
 * - 200: The listing object
 * - 500: Error message if database query fails
 */
router.get('/api/listings/:id', async (request, response) => { 
    console.log("Fetching listing by ID:", request.params.id);
    try {
        const { id } = request.params;
        const listingFound = await listing.findById(id);
        return response.status(200).json(listingFound);
    } catch (error) {
        console.error("Error fetching listing:", error);
        return response.status(500).json({ message: "Error fetching listing" });
    }
});

/**
 * DELETE /api/listings/:id
 * Deletes a listing with proper authorization checks
 * Parameters:
 * - id: The MongoDB ID of the listing to delete
 * Authentication:
 * - Requires user to be logged in
 * - User must own the listing to delete it
 * Returns:
 * - 200: Success message
 * - 401: If user is not logged in
 * - 403: If user doesn't own the listing
 * - 404: If listing not found
 * - 500: Error message if database operation fails
 */
router.delete('/api/listings/:id', async (request, response) => {
    try {
        const { id } = request.params;
        
        // Check for valid session
        if (!request.session.user) {
            return response.status(401).json({ message: "Must be logged in to delete listings" });
        }

        // Find listing
        const listingToDelete = await listing.findById(id);
        
        if (!listingToDelete) {
            return response.status(404).json({ message: "Listing not found" });
        }

        // Verify ownership
        if (listingToDelete.username !== request.session.user.username) {
            return response.status(403).json({ message: "Not authorized to delete this listing" });
        }

        // Delete the listing
        await listing.findByIdAndDelete(id);
        
        return response.status(200).json({ message: "Listing deleted successfully" });
    } catch (error) {
        console.error("Error deleting listing:", error);
        return response.status(500).json({ message: "Error deleting listing" });
    }
});

export default router; 