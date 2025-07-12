const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Login Form
router.get("/login", (req, res) => {
  res.render("auth/login", { error: null });
});

// Handle Login POST
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.render("auth/login", { error: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.render("auth/login", { error: "Invalid password" });
  }

  req.session.user = user;
  res.redirect("/dashboard");
});

// Dashboard
router.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  res.render("users/dashboard", { user: req.session.user });
});

module.exports = router;
