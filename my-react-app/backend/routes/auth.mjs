/**
 * Authentication Route Handler
 * 
 * This module handles Passport.js authentication endpoints including:
 * - Local authentication
 * - Authentication status checking
 */

import passport from "passport" 
import {Router} from "express"  
import {query, validationResult} from "express-validator";
const router = Router();  

/**
 * POST /api/auth
 * Authenticates a user using Passport.js local strategy
 * 
 * Returns:
 * - 200: If authentication is successful
 * - 401: If authentication fails
 */
router.post('/api/auth', passport.authenticate('local'), (request, response) =>{ 
    console.log(request.session);
	response.sendStatus(200);

}) 

/**
 * GET /api/auth/status
 * Checks the current authentication status
 * 
 * Returns:
 * - 200: User object if authenticated
 * - 401: If user is not authenticated
 */
router.get('/api/auth/status', (request, response) =>{ 

    console.log("In auth: "+ request.user); 
    console.log(request.session);
    return request.user ? response.send(request.user) : response.sendStatus(401);

})  
export default router;