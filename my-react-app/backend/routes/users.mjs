/**
 * Users Route Handler
 * 
 * This module handles user-related operations including:
 * - User creation with validation
 * - User session management
 */

import {Router} from "express" 
import {query, validationResult, checkSchema, matchedData} from "express-validator"; //validationResult gives the errors 
import {user} from "../mongoose/user.mjs"
import {createUserValidationSchema} from "../utils/validationSchema"




const router = Router(); 

/**
 * POST /api/users
 * Creates a new user with schema validation
 * 
 * Request Body:
 * - Must match the createUserValidationSchema
 * 
 * Returns:
 * - 201: Created user object
 * - 400: Validation errors
 * - 401: Error creating user
 */
router.post("/api/users", checkSchema(createUserValidationSchema), async (request, response) =>{ 
  const result = validationResult(request); 
  if(!result.isEmpty()) {console.log("Validation errors:", result.array()); return response.send(result.array());} // this sends the errors of the validation result
  
  const data = matchedData(request); 
  console.log(data);
  try{ 
      const {body} = request; 
      const newUser = new user(body); 
      const savedUser = await newUser.save(); 
      return response.status(201).send(savedUser);

  } catch(err){  
    console.log(err);
    return response.sendStatus(401); 

  }
});


/**
 * GET /api/users
 * Retrieves user session information
 * 
 * Query Parameters:
 * - filter: string - Must be 3-10 characters
 * 
 * Returns:
 * - Session data if available
 */
router.get(
  "/api/users",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Must not be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("Must be at least 3-10 characters"),
  (request, response) => {
    console.log(request.session.id);
    request.sessionStore.get(request.session.id, (err, sessionData) => {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log("Inside Session Store Get");
      console.log(sessionData);
    })
  }
);


// router.get(
//     "/api/users",
//     query("filter")
//       .isString()
//       .notEmpty()
//       .withMessage("Must not be empty")
//       .isLength({ min: 3, max: 10 })
//       .withMessage("Must be at least 3-10 characters"),
//     (request, response) => {
//       const result = validationResult(request);
//       console.log(result);
//       const { query: { filter, value } } = request;
//       if (filter && value) {
//         return response.send(
//           mockUsers.filter((user) => user[filter].includes(value))
//         );
//       }
//       return response.send(mockUsers);
//     }
//   ); 
   export default router; 
  
  