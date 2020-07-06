const express = require("express"); // Express to a quickier way of  creating a server with mongodb
const app = express();
const connectDB = require("./config/db"); // Requiring Connection to mongodb and mongoose connection
const path = require("path");
const cors = require("cors");
// Connect Database
connectDB();
// using json data
app.use(express.json({ extented: false, limit: "50mb" }));


// Hello
// Defining Routes
app.use("/api/users", require("./routes/api/users")); // Defining User route
app.use("/api/auth", require("./routes/api/auth")); // Defining Auth route
app.use("/api/profile", require("./routes/api/profiles")); // Defining profiles route
app.use("/api/posts", require("./routes/api/post")); // Defining Post route

// Server static assets in production

if (process.env.NODE_ENV === "production") {
  
  console.log(" Server Is In production")
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get("*", (req, res) => {
    const index = path.resolve(__dirname, "client/build", "index.html");
    res.sendFile(index);
  });

} else{
  console.log(" Server Is In Dev")
    app.use(express.static(path.join(__dirname, 'client/build')));
    
    app.get("*", (req, res) => {
      const index = path.resolve(__dirname, "client/build", "index.html");
      res.sendFile(index);
    });
}

const PORT = process.env.PORT || 5000; // Server location is localhost:5000 or If process.env.PORT

// Int Server
app.listen(PORT, () => {
  console.log(`PORT Is Listening on localhost:${PORT}`);
});
