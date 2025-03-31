import { Router } from "express";
import { body, validationResult } from "express-validator";
import {listing } from "../mongoose/listing.mjs";

const router = Router();



// Create Listing route
router.post('/api/createlisting', 
    async (request, response) => {
        console.log('Create listing attempt received:', request.body);
        
        // Check if data follows schema
        const result = validationResult(request);
        if (!result.isEmpty()) {
            console.log('Validation errors:', result.array());
            return response.status(400).json({ errors: result.array() });
        }

        const { product, description, image, username, price } = request.body; 
        console.log(request.body);
        try {
            // TODO: Add database integration here
            
            const newListing = new listing({
                product,
                description, 
                image, 
                price,
                username
            });

            const savedListing = await newListing.save();
            console.log('New listing created:', savedListing.product);

            // Set user session
            console.log('Creating listing for product:', product);
            
            // For now, just return success
            return response.status(201).json({ 
                message: "Listing created",
                listing: {
                    product,
                    description,
                    image,
                    price,
                    username
                }
            });
        } catch (error) {
            console.error("Create listing error:", error);
            return response.status(500).json({ message: "Listing creation error" });
        }
    }
);

export default router; 