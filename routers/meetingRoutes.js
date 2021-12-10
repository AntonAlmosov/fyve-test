const express = require("express");
const meetingController = require("../controllers/meetingController");

const router = express.Router();

router
  .route("/")
  .get(meetingController.getMeeting)
  .post(meetingController.postMeeting);

module.exports = router;
