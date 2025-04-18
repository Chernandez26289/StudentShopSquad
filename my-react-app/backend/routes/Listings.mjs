import { Router } from "express";
import { listing } from "../mongoose/listing.mjs";

const router = Router();

// Show all listings with optional search
router.get('/api/listings', async (request, response) => {
    try {
        const { search } = request.query;
        let query = {};
        
        // If search parameter exists, create a search query
        if (search) {
            query = {
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

// Delete a listing
router.delete('/api/listings/:id', async (request, response) => {
    try {
        const { id } = request.params;
        
        // first check for session
        if (!request.session.user) {
            return response.status(401).json({ message: "Must be logged in to delete listings" });
        }

        // Find lisiting
        const listingToDelete = await listing.findById(id);
        
        if (!listingToDelete) {
            return response.status(404).json({ message: "Listing not found" });
        }

        // Check if the logged-in user owns this listing
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