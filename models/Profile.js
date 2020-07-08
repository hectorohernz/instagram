const mongoose = require('mongoose');

// Profile 

const ProfileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    profileImage: {
        type: String
    },
    bio:{
        type:String
    },
    location :{
        type: String
    },
    marital:{
        type: String
    },
    music:{
        type: String
    },
    hobbies: {
        type: [String] 
    },
    food: {
        type: String
    },
    movie: {
        type: String
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);