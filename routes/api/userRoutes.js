const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// GET all users
router.get('/', getUsers);

// GET a single user by its _id and populated thought and friend data
router.get('/:id', getSingleUser);

// POST a new user
router.post('/', createUser);

// PUT to update a user by its _id
router.put('/:id', updateUser);

// DELETE to remove user by its _id
router.delete('/:id', deleteUser);

// POST to add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', addFriend);

// DELETE to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', removeFriend);

module.exports = router;