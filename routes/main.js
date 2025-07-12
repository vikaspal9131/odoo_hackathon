const express = require("express");
const router = express.Router();
const User = require("../models/user");

// GET /
router.get("/", (req, res) => {
  res.render("main", {
    users: [],               // no users yet
    query: "",               // empty search bar
    user: req.session.user  // current logged-in user (if any)
  });
});

// POST /search
router.post("/search", async (req, res) => {
  const query = req.body.query?.trim() || "";

  const users = await User.find({
    $or: [
      { skillsOffered: { $regex: query, $options: "i" } },
      { skillsWanted: { $regex: query, $options: "i" } }
    ]
  });

  res.render("main", {
    users,
    query,
    user: req.session.user  // logged in user for "Send Request" check
  });
});

module.exports = router;
