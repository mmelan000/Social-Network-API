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
};
