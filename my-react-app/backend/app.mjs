/**
 * Main application file for the Student Shop Squad backend
 * This file sets up the Express server, middleware, and routes
 */

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import session from "express-session"
import passport from "passport"
import cors from 'cors';

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import strategies and routes
import "./strategies/local-strategy.mjs";
import mongoose from "mongoose" 
import {query, validationResult} from "express-validator"
import usersRouter from "./routes/users.mjs"; 
import authRouter from "./routes/auth.mjs";
import loginRouter from "./routes/Login.mjs";
import registrationRouter from "./routes/Registration.mjs";
import createListingRouter from "./routes/CreateListing.mjs";
import listingsRouter from './routes/Listings.mjs';

// Database connection
mongoose.connect(Insert your own MongoDB URI here) 
	.then(() => console.log("Connected to Database")) 
	.catch((err) => console.log(`Error: ${err}`));

// Initialize Express app
const app = express();
const PORT = 5173;

// CORS configuration for cross-origin requests
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
})); 

// Body parsing middleware with increased limits for base64 image handling
app.use(express.json({limit: '50mb'})); 
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Session configuration
app.use(session({
    secret: 'CEN Project', 
    saveUninitialized: false,
    resave: false, 
    cookie: { 
        maxAge: 60000 * 60, // 1 hour
        secure: false,
        httpOnly: true
    },  
})); 

// Passport middleware for authentication
app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use(usersRouter); 
app.use(authRouter);
app.use(loginRouter);
app.use(registrationRouter); 
app.use(createListingRouter);
app.use(listingsRouter);

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../dist')));

// API Routes for testing
app.get('/api/about', (req, res) => {
    console.log('About page visited');
    res.json({ message: 'About page data received' });
});

app.get("/api/loginregistration/auth", (request, response) => { 
    const {username, password} = request.query;  
    response.send(mockUsers);
});

// Catch-all route for React app
app.get('*', (req, res) => { 
    console.log("serving react app");
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT} - Serving both React app and API`);
}); 