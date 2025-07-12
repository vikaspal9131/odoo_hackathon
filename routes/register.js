const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Show Register Form
router.get("/register", (req, res) => {
  res.render("auth/register", { error: null });
});

// Handle Register Form
router.post("/register", async (req, res) => {
  const { email, password, skillsOffered, skillsWanted } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.render("auth/register", { error: "Email already exists" });

    const user = new User({
      email,
      password,
      skillsOffered: skillsOffered.split(",").map(s => s.trim()),
      skillsWanted: skillsWanted.split(",").map(s => s.trim())
    });

    await user.save();
    req.session.user = user;
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.render("auth/register", { error: "Registration failed" });
  }
});

module.exports = router;
