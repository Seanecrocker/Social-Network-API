const { User, Thought } = require('../models');

// Function to get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Function to get a single user by its _id and populated thought and friend data
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('thoughts')
      .populate('friends')
      .select('-__v');

    if (!user) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Function to create a new user
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Function to update a user by its _id
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Function to delete a user by its _id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }

    // Bonus: Remove associated thoughts when a user is deleted
    await Thought.deleteMany({ _id: { $in: user.thoughts } });

    res.json({ message: 'User and associated thoughts deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Add the function definitions for addFriend and removeFriend
const addFriend = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    ).populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const removeFriend = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    ).populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};