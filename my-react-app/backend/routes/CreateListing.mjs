/**
 * CreateListing Route Handler
 * 
 * This module handles the creation of new product listings in the system.
 * It validates the input data and creates a new listing in the database.
 */

import { Router } from "express";
import { body, validationResult } from "express-validator";
import { listing } from "../mongoose/listing.mjs";

const router = Router();

/**
 * POST /api/createlisting
 * Creates a new product listing
 * 
 * Request Body:
 * - product: string - Name of the product
 * - description: string - Product description
 * - image: string - Base64 encoded image
 * - username: string - Seller's username
 * - price: number - Product price
 * - email: string - Seller's email
 * 
 * Returns:
 * - 201: Success response with created listing details
 * - 400: Validation errors if input data is invalid
 * - 500: Error message if database operation fails
 */
router.post('/api/createlisting', 
    async (request, response) => {
        console.log('Create listing attempt received:', request.body);
        
        // Validate input data
        const result = validationResult(request);
        if (!result.isEmpty()) {
            console.log('Validation errors:', result.array());
            return response.status(400).json({ errors: result.array() });
        }

        const { product, description, image, username, price, email } = request.body; 
        console.log(request.body);
        try {
            // Create new listing document
            const newListing = new listing({
                product,
                description, 
                image, 
                price,
                username,
                email
            });

            // Save to database
            const savedListing = await newListing.save();
            console.log('New listing created:', savedListing.product);
            
            // Return success response with listing details
            return response.status(201).json({ 
                message: "Listing created",
                listing: {
                    product,
                    description,
                    image,
                    price,
                    username,
                    email
                }
            });
        } catch (error) {
            console.error("Create listing error:", error);
            return response.status(500).json({ message: "Listing creation error" });
        }
    }
);

export default router; 