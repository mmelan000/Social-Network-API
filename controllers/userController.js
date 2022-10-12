const { User, Thought } = require('../models');

module.exports = {
  // ALL users
  getUsers(req, res) {
    User.find()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //   SINGLE user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({
        path: 'thoughts',
        path: 'friends',
        select: '-__v',
      })
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
};
