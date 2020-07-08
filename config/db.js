const mongoose = require('mongoose');
require('dotenv').config();


mongoose.set('useFindAndModify', false);


const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_HOST , {
        useNewUrlParser: true, // NewUrlPaser 
        useUnifiedTopology: true // Required for DeprecationWarning: current Server Discovery and Monitoring engine is deprecated,
        ,useCreateIndex: true
        });

        console.log("MongoDB CONNECTED..... ")
    } catch(err){
        console.error(err.message);
        // Exit Process with failure
        process.exit(1);
    }
};

module.exports = connectDB;