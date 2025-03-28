import { Router } from "express";
import { body, validationResult } from "express-validator";
import {comparePassword} from "../utils/helpers.mjs";
import { user } from "../mongoose/user.mjs";

const router = Router();

// Login route
router.post('/api/login', 
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
    async (request, response) => {
        console.log('Login attempt received:', request.body);
        //check if data follows schema
        const result = validationResult(request);
        if (!result.isEmpty()) {
            console.log('Validation errors:', result.array());
            return response.status(400).json({ errors: result.array() });
        }
        const { username, password } = request.body;
        
        try {
            console.log('Searching for user:', username); 
            //find user in database
            const foundUser = await user.findOne({ username});
            //if user not found, return error
            if (!foundUser) {
                console.log('User not found/invalid credentials');
                return response.status(401).json({ message: "Invalid credentials" });
            } 
            //check if password is correct
            if (!comparePassword(password, foundUser.password)) {
                console.log('Invalid password');
                return response.status(401).json({ message: "Invalid credentials" });
            }
            // Set user in session
            request.session.user = foundUser;
            console.log('Login successful for user:', username);
            return response.status(200).json(foundUser);
        } catch (error) {
            console.error("Login error:", error);
            return response.status(500).json({ message: "Server error" });
        }
    }
);

// Logout route FIXME: impliment this later through frontend
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

// Check login status after logging in
router.get('/api/login/status', (request, response) => {
    console.log('Checking login status for session user:', request.session.user);
    if (request.session.user) {
        return response.status(200).json(request.session.user);
    }
    return response.status(401).json({ message: "Not logged in" });
});

export default router;
