const { User, Thought } = require('../models');

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
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // ADD thought
  postThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message:
                "Thought created, but User ID doesn't exist or is invalid.",
            })
          : res.status(200).json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // UPDATE thought
  putThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, context: 'query', new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Thought ID doesn't exist or is invalid." })
          : res.status(200).json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // DELETE thought
  deleteThought(req, res) {
    Thought.findByIdAndDelete({ _id: req.params.thoughtId }, {})
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Thought ID doesn't exist or is invalid." })
          : res.status(200).json({
              message: `Succesfully deleted Thought ${req.params.userId}.`,
            })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // ADD reaction TO thought
  postReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Thought ID doesn't exist or is invalid." })
          : res.status(200).json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // DELETE reaction FROM thought
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Thought ID doesn't exist or is invalid." })
          : res.status(200).json({
              message: `Succesfully deleted Reaction ${req.params.userId}.`,
            })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
