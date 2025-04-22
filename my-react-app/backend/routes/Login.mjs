/**
 * Login Route Handler
 * 
 * This module handles user authentication including:
 * - User login with credentials
 * - User logout
 * - Session status checking
 */

import { Router } from "express";
import { body, validationResult } from "express-validator";
import { comparePassword } from "../utils/helpers.mjs";
import { user } from "../mongoose/user.mjs";

const router = Router();

/**
 * POST /api/login
 * Authenticates a user and creates a session
 * 
 * Request Body:
 * - username: string - User's username
 * - password: string - User's password
 * 
 * Returns:
 * - 200: User object on successful login
 * - 400: Validation errors if input is invalid
 * - 401: Invalid credentials message
 * - 500: Server error message
 */
router.post('/api/login', 
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
    async (request, response) => {
        console.log('Login attempt received:', request.body);
        
        // Validate input data
        const result = validationResult(request);
        if (!result.isEmpty()) {
            console.log('Validation errors:', result.array());
            return response.status(400).json({ errors: result.array() });
        }
        
        const { username, password } = request.body;
        
        try {
            console.log('Searching for user:', username); 
            // Find user in database
            const foundUser = await user.findOne({ username });
            
            // Check if user exists
            if (!foundUser) {
                console.log('User not found/invalid credentials');
                return response.status(401).json({ message: "Invalid credentials" });
            } 
            
            // Verify password
            if (!comparePassword(password, foundUser.password)) {
                console.log('Invalid password');
                return response.status(401).json({ message: "Invalid credentials" });
            }
            
            // Create session
            request.session.user = foundUser;
            console.log('Login successful for user:', username);
            return response.status(200).json(foundUser);
        } catch (error) {
            console.error("Login error:", error);
            return response.status(500).json({ message: "Server error" });
        }
    }
);

/**
 * POST /api/logout
 * Destroys the user's session
 * 
 * Returns:
 * - 200: Success message
 * - 500: Error message if logout fails
 */
router.post('/api/logout', (request, response) => {
    console.log('Logout attempt received');
    request.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
            return response.status(500).json({ message: "Error logging out" });
        }
        console.log('User logged out successfully');
        return response.status(200).json({ message: "Logged out successfully" });
    });
});

/**
 * GET /api/login/status
 * Checks if a user is currently logged in
 * 
 * Returns:
 * - 200: User object if logged in
 * - 401: Not logged in message
 */
router.get('/api/login/status', (request, response) => {
    console.log('Checking login status for session user:', request.session.user);
    if (request.session.user) {
        return response.status(200).json(request.session.user);
    }
    return response.status(401).json({ message: "Not logged in" });
});

export default router;
