const express = require("express");
const router = express.Router();
const Auth = require("../../middleware/auth"); // Middleware function To make the user has a profile
const { validationResult, check } = require("express-validator"); //  a set of express.js middlewares that wraps validator.js validator and sanitizer functions.
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs"); // password hashing
const User = require("../../models/User");

// @route   GET API/auth
// @Desc    auth Route
// @access  Access Public
router.get("/", Auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});





// @route   POST  api/auth
// @Desc   Authenticate User & Get Token
// @access  Access Public
router.post(
  "/",
  [
    /*
       Checking is a username and password has been entered.
      */
    check("username", "Please Enter A Valid User Name").not().isEmpty(),
    check("password", "Password Is Required").exists(),
  ],

  async (req, res) => {
    // Error Response
    const errors = validationResult(req); // Making sure the requirements are filled
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructing array to make life easier
    const { username, password } = req.body; 

    try {
      let user = await User.findOne({ username }); // Finding if the user exist in the database
      if (!user) {
        // If the user does exist run this code block
        return res
          .status(400)
          .json({ errors: [{ msg: "Username doesn't Exist" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password); // Comparing the users entered password with the stored password for the client 

      if (!isMatch) { // If isn't a match, returning json data 
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Password Credentials" }] });
      }

      const payload = { 
        user: {
          id: user.id
        }
      };

      jwt.sign( // Assigning token which will expire
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );


    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
