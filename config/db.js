const mongoose = require('mongoose');
require('dotenv').config();
let uri = null;

mongoose.set('useFindAndModify', false);
if(process.env.NODE_ENV === "production"){
   uri = "mongodb+srv://username:Ilovepugs@instagram-db-maqfn.mongodb.net/instagram-db?retryWrites=true&w=majority";
} else{
    uri = "mongodb+srv://username:Ilovepugs@instagram-db-maqfn.mongodb.net/instagram-db?retryWrites=true&w=majority";
}

const connectDB = async () => {
    try{
        await mongoose.connect(uri, {
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