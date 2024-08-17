const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const reactionSchema = require('./Reaction'); 

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toLocaleString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // Array of nested reaction documents
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;