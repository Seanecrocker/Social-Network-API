const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,       
  deleteReaction        
} = require('../../controllers/thoughtController');

// GET to get all thoughts
router.get('/', getThoughts);

// GET to get a single thought by its _id
router.get('/:id', getSingleThought);

// POST to create a new thought
router.post('/', createThought);

// PUT to update a thought by its _id
router.put('/:id', updateThought);

// DELETE to remove a thought by its _id
router.delete('/:id', deleteThought);

// POST to create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', createReaction);   

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);   

module.exports = router;