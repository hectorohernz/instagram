const mongoose = require('mongoose'); // Mongoose helps mongodb define a schema

// @Desc Setting a mongodb structure  

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique: true 
    },
    username:{
        type: String,
        required:true,
        unique: true 
    },
    password:{
        type: String,
        required: true
    },
    Date:{
        type: Date, default: Date.now
    }
});

// @Desc Setting a mongodb structure  Exporting Schema and model

module.exports = User = mongoose.model('user', userSchema);
