import {Router} from "express" 
import {query, validationResult, checkSchema, matchedData} from "express-validator"; //validationResult gives the errors 
import {user} from "../mongoose/user.mjs"
import {createUserValidationSchema} from "../utils/validationSchema"




const router = Router(); 

router.post("/api/users", checkSchema(createUserValidationSchema), async (request, response) =>{ 
  const result = validationResult(request); 
  if(!result.isEmpty()) {console.log("Uh Oh!"); return response.send(result.array());} // this sends the errors of the validation result
  
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
  
  