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

export default router; 