const { User, Thought } = require('../models');

module.exports = {
  // ALL users
  getUsers(req, res) {
    User.find({}, '-id')
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //   SINGLE user
  getUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate([{ path: 'thoughts' }, { path: 'friends' }])
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "User ID doesn't exist or is invalid." })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //   ADD user
  postUser(req, res) {
    User.create(req.body)
      .then((user) => res.status(200).json(user))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //   UPDATE User
  putUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, context: 'query', new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "User ID doesn't exist or is invalid." })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // DELETE user AND thoughts
  deleteUser(req, res) {
    User.findByIdAndDelete({ _id: req.params.userId }, {})
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "User ID doesn't exist or is invalid." })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({
          message: `Succesfully deleted User ${req.params.userId} and associated thoughts.`,
        })
      )
      .catch((err) => res.status(500).json(err));
  },
  // ADD friend
  postFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "User ID doesn't exist or is invalid." })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // REMOVE friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "User ID doesn't exist or is invalid." })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
