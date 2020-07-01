const express = require("express");
const router = express.Router();
const { validationResult, check } = require("express-validator"); //  a set of express.js middlewares that wraps validator.js validator and sanitizer functions.
const User = require("../../models/User"); // Bring in mongodb model ( Schema )
const bcrypt = require("bcryptjs"); // password hashing
const jwt = require("jsonwebtoken");
require("dotenv").config();

// @route  Post api/user
// @Desc   Register User and Back-end Valdiation
// @access  Access Public
// @Test Postman http://localhost:5000/api/users ;

router.post(
  "/",
  [
    /*
      The following is using express-validator to check if the req.body 
      is valid before submitting , if isn't valid it will throw us an errors array.
      Checking if the following input data is valid.
    */

    check("name", "Name is required").not().isEmpty(),
    check("email", "Please Include a Valid Email").isEmail(),
    check("phone", "Please Include Phone Number").notEmpty(),
    check("username", "Please Enter A Valid User Name").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Error Response

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructing array to make life easier
    const { name, email, username, phone, password } = req.body;

    try {
      let user = await User.findOne({ username }); // Finding if the user exist in the database
      if (user) {
        // If the user does exist run this code block
        return res
          .status(400)
          .json({ errors: [{ msg: "Username Already Exist" }] });
      }

      user = await User.findOne({ email }); //finding if the email exist in the database
      if (user) {
        // If the email does exist run this code block
        return res
          .status(400)
          .json({ errors: [{ msg: "Email Already Exist" }] });
      }

      // Creating a new user
      user = new User({
        name,
        email,
        username,
        password,
        phone,
      });

      // Encrpty Password
      // salt to do the hashing
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt); // creating hash
      await user.save(); // Just a reminder anything that returns a promise you would like to use await in front

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if(err) throw err;
          res.json({token})
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
