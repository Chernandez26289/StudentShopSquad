import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({  

		username: mongoose.Schema.Types.String, 
		
		password: mongoose.Schema.Types.String, 

		email: mongoose.Schema.Types.String
}) 

export const user = mongoose.model('User', userSchema);