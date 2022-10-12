const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: [
        true,
        'You must provied a message with a maximum of 280 characters.',
      ],
      maxlength: 280,
    },
    username: {
      type: String,
      required: [true, 'You must provide a username.'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        return new Intl.DateTimeFormat('en-US', {
          dateStyle: 'full',
          timeStyle: 'short',
        }).format(date);
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
