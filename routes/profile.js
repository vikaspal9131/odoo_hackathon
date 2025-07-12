const express = require("express");
const router = express.Router();
const User = require("../models/User");

// View a user's profile by ID
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");

    res.render("profile", { user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
