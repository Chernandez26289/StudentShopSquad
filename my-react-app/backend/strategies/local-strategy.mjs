import passport from "passport"; 
import {Strategy } from 'passport-local';  
import {user} from "../mongoose/user.mjs"


passport.serializeUser((user, done) =>{ 
	console.log("Insider Serialize User: "); 
    console.log(user.id);
	done(null, user.id);
    
});
passport.deserializeUser( async (id, done) =>{ 
			
    console.log("Inside Deserializer");
    try  { 
        const findUser = await user.findById(id);
        if(!findUser) throw new Error('User not found');  
        done(null, findUser);
    } 
    catch (err) { 
        done(err, null); 
        
    }
});
export default passport.use( 

    new Strategy( async (username, password, done) => { 
                console.log("Username: " + username); 
                console.log("Password: " + password);
				try {
					const findUser = await user.findOne({username}); 
                    console.log("user is: " + findUser);
					if(!findUser) throw new Error('User not found'); 
					if(findUser.password !== password) throw new Error(findUser.password + ' Invalid Password: ' +password); 
					
					done(null, findUser); //username password correct
				} 
				catch(err) {  
                    console.log("Error in passport strategy");
					done(err, null); //uh oh!
				
				}

    })
)