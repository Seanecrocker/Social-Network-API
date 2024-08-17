const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Reaction schema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(), // Generates a new ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toLocaleString(), // Formats the date
    },
  },
  {
    toJSON: {
      getters: true, // Enable getters for this schema
    },
    id: false, // Disable the default 'id' virtual
  }
);

module.exports = reactionSchema;