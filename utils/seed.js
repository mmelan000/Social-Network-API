const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { thoughtSeed, reactionSeed, userSeed } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // picks random index in array
  Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
  };

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  // add users
  await User.collection.insertMany(userSeed);

  // extract user _ids into array
  const userIds = userSeed.map((r) => r._id);

  // extract usernames into array
  const usernames = userSeed.map((r) => r.username);

  // extracts thought _ids into array

  // adds random users to thoughts
  thoughtSeed.forEach(function (e) {
    const randomUser = usernames.random();
    e.username = randomUser;
  });
  // adds random users to reaction
  reactionSeed.forEach(function (e) {
    const randomUser = usernames.random();
    e.username = randomUser;
  });

  // insert thoughts into DB
  await Thought.collection.insertMany(thoughtSeed);

  // extracts thought _ids into array
  const thoughtIds = thoughtSeed.map((r) => r._id);

  // adds randomn friends
  for (let i = 0; i < userSeed.length; i++) {
    await User.findOneAndUpdate(
      { _id: userIds.random() },
      { $addToSet: { friends: userIds.random() } }
    );
  }
  for (let i = 0; i < thoughtSeed.length; i++) {
    await User.findOneAndUpdate(
      { username: thoughtSeed[i].username },
      { $addToSet: { thoughts: thoughtSeed[i]._id } }
    );
  }

  // add thoughts to their proper users
  for (let i = 0; i < reactionSeed.length; i++) {
    await Thought.findOneAndUpdate(
      { _id: thoughtIds.random() },
      { $addToSet: { reactions: reactionSeed[i] } }
    );
  }

  console.info('Seeding complete! 🌱');
  process.exit(0);
});
