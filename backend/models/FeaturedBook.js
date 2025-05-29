import mongoose from "mongoose";

const FeaturedSchema = new mongoose.Schema({
    
}, {timestamps: true})

export const FeaturedBook = mongoose.model('featuredbook', FeaturedSchema)