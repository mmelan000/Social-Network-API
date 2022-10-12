const router = require('express').Router();

const {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
  postFriend,
  deleteFriend,
} = require('../../controllers/userController');

// /api/users GET and POST
router.route('/').get(getUsers).post(postUser);

// /api/users/:userId GET, PUT, and DELETE
router.route('/:userId').get(getUser).put(putUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId POST and DELETE
router
  .route('/:userId/friends/:friendId')
  .post(postFriend)
  .delete(deleteFriend);

module.exports = router;
