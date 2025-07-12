const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/profile", async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/login");
    }

    const user = await User.findById(req.session.user._id);
    if (!user) return res.status(404).send("User not found");

    res.render("profile", { user }); // ✅ yaha user pass karna important tha
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
