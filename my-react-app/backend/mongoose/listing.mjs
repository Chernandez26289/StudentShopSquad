import mongoose from "mongoose"; 

const listingSchema = new mongoose.Schema({  

    product: mongoose.Schema.Types.String,
    
    description: mongoose.Schema.Types.String,

    image: mongoose.Schema.Types.String, 

    price: mongoose.Schema.Types.String,

    username: mongoose.Schema.Types.String
}) 

export const listing = mongoose.model('Listing', listingSchema);