const router = require('express').Router();

const {
  getThoughts,
  getThought,
  postThought,
  putThought,
  deleteThought,
  postReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts GET and POST
router.route('/').get(getThoughts).post(postThought);

// /api/thoughts/:thoughtId GET, PUT, and DELETE
router
  .route('/:thoughtId')
  .get(getThought)
  .put(putThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reaction POST
router.route('/:thoughtId/reaction').post(postReaction);

// /api/thoughts/:thoughtId/reaction/:reactionID DELETE
router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction);

module.exports = router;
