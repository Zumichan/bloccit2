const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const validation = require("./validation");

 //We register a route for the create action along with validation middleware and controller action
router.post("/topics/:topicId/posts/:postId/comments/create",
  validation.validateComments,
  commentController.create);

 //We register a route for the destroy action along with validation middleware and controller action
router.post("/topics/:topicId/posts/:postId/comments/:id/destroy",
  commentController.destroy);
module.exports = router;
