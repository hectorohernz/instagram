const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "../public/uploads",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});
const filterFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: filterFilter,
});

// @route   GET api/profile/me
// @Desc    get current users profile
// @access  Private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "username"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/profile/me
// @Desc    Create / Update a users profile
// @access  Private

router.post("/", [upload.single("recFile"), auth], async (req, res) => {
  const {
    bio,
    location,
    marital,
    music,
    hobbies,
    food,
    movie,
    profileImage,
  } = req.body;
  const url = req.protocol + "://" + req.get("host");
  // Build profiles object
  const profileFields = {}; // Object before hits the database

  profileFields.user = req.user.id;
  if (req.file) profileFields.profileImage = "uploads/" + req.file.filename;
  if (bio) profileFields.bio = bio;
  if (location) profileFields.location = location;
  if (marital) profileFields.marital = marital;
  if (music) profileFields.music = music;
  if (food) profileFields.food = food;
  if (movie) profileFields.movie = movie;
  if (hobbies) {
    profileFields.hobbies = hobbies.split(",").map((hobby) => hobby.trim());
  }

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    // Create Profile
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @ Route GET api/profile
// @ Desc Get All Profiles
// @ Access Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "name",
      "username",
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @ Route GET api/profiles/user/:user_id
// @ Desc Get profile by user ID
// @ Access Public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "username"]);
    if (!profile) return res.status(400).json({ msg: "User Does Not Exist " });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "User Does Not Exist " });
    }

    res.status(500).send("Server Error");
  }
});

// @ Route DELETE api/profile
// @ Desc DELETE profile, user & Post
// @ Access Private

router.delete("/", auth, async (req, res) => {
  try {
    // @ todo - remove users posts

    // Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Removes User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
