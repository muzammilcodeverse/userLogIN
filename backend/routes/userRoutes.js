const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  getMe,
  updateUser,
  deleteUser,
  logoutUser
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);

// Protected routes
router.get('/me', protect, getMe);
router.post('/logout', protect, logoutUser);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

module.exports = router;
