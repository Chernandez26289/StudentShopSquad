import passport from "passport" 
import {Router} from "express"  
import {query, validationResult} from "express-validator";
const router = Router();  
router.post('/api/auth', passport.authenticate('local'), (request, response) =>{ 
    console.log(request.session);
	response.sendStatus(200);

}) 

router.get('/api/auth/status', (request, response) =>{ 

    console.log("In auth: "+ request.user); 
    console.log(request.session);
    return request.user ? response.send(request.user) : response.sendStatus(401);

})  
export default router;