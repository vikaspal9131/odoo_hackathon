const express = require("express");
const router = express.Router();
const SwapRequest = require("../models/SwapRequest");

// POST /swap-request/:toUserId
router.post("/swap-request/:toUserId", async (req, res) => {
  const fromUser = req.session.user?._id;
  const toUser = req.params.toUserId;

  if (!fromUser) return res.redirect("/login");
  if (fromUser === toUser) return res.redirect("back");

  // check if already exists
  const alreadySent = await SwapRequest.findOne({ fromUser, toUser });
  if (alreadySent) return res.redirect("back");

  await SwapRequest.create({ fromUser, toUser });

  res.redirect("back");
});

module.exports = router;
