const express = require('express')
const checkAuth = require("../middleware/auth")
const storyController = require("../controllers/storyController");
const router = new express.Router()

router.post("/stories", checkAuth, storyController.createStory);
router.get("/stories", checkAuth, storyController.getAllStories);
router.get("/stories/me", checkAuth, storyController.getUserStories);
router.get("/stories/:id", checkAuth, storyController.getStory);
router.patch("/stories/:id", checkAuth, storyController.updateStory);
router.post("/stories/:id/comment", checkAuth, storyController.addComment);
router.delete("/stories/:id", checkAuth, storyController.deleteStory);

module.exports = router