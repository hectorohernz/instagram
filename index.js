const express = require("express"); // Express to a quickier way of  creating a server with mongodb
const app = express();
const connectDB = require("./config/db"); // Requiring Connection to mongodb and mongoose connection
const path = require("path");
const cors = require('cors');
const PORT = process.env.PORT || 5000;
require('dotenv').config();

// Connect Database
connectDB();
app.use(cors());
// using json data
app.use(express.json({ extented: false, limit: "50mb" }));



// Defining Routes
app.use("/api/users", require("./routes/api/users")); // Defining User route
app.use("/api/auth", require("./routes/api/auth")); // Defining Auth route
app.use("/api/profile", require('./routes/api/profiles')); // Defining profiles route
// app.use("/api/posts", require("./routes/api/post")); // Defining Post route
app.use('/', require("./routes/api/rootApi"));

// Server static assets in production

  app.use(express.static('client/build')));
  app.get("*", (req, res) => {	 
    res.sendFile(path.resolve(__dirname,  "./client/build", "index.html"));
  });


// Int Server
app.listen(PORT, function() {
  console.log(`Server is Listening ${PORT}!`)
})