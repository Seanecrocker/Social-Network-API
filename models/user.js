// Import Mongoose and necessary components
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Define the User schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'], // Email validation regex
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought', // References the Thought model
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User', // Self-reference to User model
      },
    ],
  },
  {
    toJSON: {
      virtuals: true, // Include virtuals when data is output as JSON
    },
    id: false, // Disable the default 'id' virtual
  }
);

// Create a virtual property `friendCount` that gets the number of friends
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Create the User model using the userSchema
const User = model('User', userSchema);

// Export the User model to be used in other parts of the application
module.exports = User;