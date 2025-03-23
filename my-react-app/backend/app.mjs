import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import session from "express-session"
import passport from "passport"
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import "./strategies/local-strategy.mjs";
import mongoose from "mongoose" 
import {query, validationResult} from "express-validator"
import usersRouter from "./routes/users.mjs"; 
import authRouter from "./routes/auth.mjs";
import loginRouter from "./routes/Login.mjs";
import registrationRouter from "./routes/Registration.mjs";
import mockUsers from "./constants.mjs"; 

mongoose.connect('mongodb://localhost/StudentShopSquad') 
	.then(() => console.log("Connected to Database")) 
	.catch((err) => console.log(`Error: ${err}`));

const app = express();
const PORT = 5173;

// Basic middleware  

// CORS to allow cross-origin requests
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json()); 
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    secret: 'CEN Project', 
    saveUninitialized: false,
    resave: false, 
    cookie: { 
        maxAge: 60000 * 60,
        secure: false,
        httpOnly: true
    },  
})); 

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(usersRouter); 
app.use(authRouter);
app.use(loginRouter);
app.use(registrationRouter);
// Serve static files from React build
app.use(express.static(path.join(__dirname, '../dist')));

// API Routes for testing (IGNORE)
app.get('/api/about', (req, res) => {
    console.log('About page visited');
    res.json({ message: 'About page data received' });
});

app.get("/api/loginregistration/auth", (request, response) => { 
    const {username, password} = request.query;  
    response.send(mockUsers);
});

// Base React app
app.get('*', (req, res) => { 
    console.log("serving react app");
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT} - Serving both React app and API`);
}); 