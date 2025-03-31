import { Router } from "express";
import { listing } from "../mongoose/listing.mjs";

const router = Router();

// Show all listings
router.get('/api/listings', async (request, response) => {
    try {
        const listings = await listing.find({});
        console.log('Listings from database:', listings);
        return response.status(200).json(listings);
    } catch (error) {
        console.error("Error fetching listings:", error);
        return response.status(500).json({ message: "Error fetching listings" });
    }
});

export default router; 