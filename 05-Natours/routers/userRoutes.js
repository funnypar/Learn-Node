const express = require('express');
const {
  getAllUsers,
  createUser,
  getOneUser,
  patchUser,
  deleteUser,
} = require('../controllers/userControllers');

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getOneUser).patch(patchUser).delete(deleteUser);

module.exports = userRouter;
