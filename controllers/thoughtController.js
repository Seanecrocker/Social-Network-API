const { Thought, User } = require('../models');

// GET to get all thoughts
const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().select('-__v');
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET to get a single thought by its _id
const getSingleThought = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id).select('-__v');

    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// POST to create a new thought
const createThought = async (req, res) => {
  try {
    const newThought = await Thought.create({
      ...req.body,
      userId: req.body.userId  // Store userId in the thought model
    });

    // Push the created thought's _id to the associated user's thoughts array field
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    res.json(newThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// PUT to update a thought by its _id
const updateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE to remove a thought by its _id
const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);

    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }

    // Remove the thought from the associated user's thoughts array using the userId
    await User.findByIdAndUpdate(
      thought.userId,  // Using userId stored in the thought model
      { $pull: { thoughts: req.params.id } },
      { new: true }
    );

    res.json({ message: 'Thought deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// POST to create a reaction stored in a single thought's reactions array field
const createReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $addToSet: { reactions: req.body } },
      { new: true, runValidators: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE to remove a reaction by the reaction's reactionId value
const deleteReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
};