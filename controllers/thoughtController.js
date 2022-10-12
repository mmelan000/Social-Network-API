const { User, Thought, reactionSchema } = require('../models');

module.exports = {
  // ALL thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => {
        res.status(200).json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // SINGLE thought
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Thought ID doesn't exist or is invalid." })
          : res.status(200).json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
