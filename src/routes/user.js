const express = require('express');

const { Router } = express;
const { UserService } = require('../services/userService');
const { protectedRoutes } = require('../middleware/authentication');

const userRouter = Router();

userRouter.get('/', protectedRoutes, async (req, res) => {
  const options = { projection: { _id: 0, password: 0 } };
  const response = await UserService.findOne(req.user, options);
  try {
    res.json({ response });
  } catch (err) {
    res.status(500);
  }
});

userRouter.put('/', protectedRoutes, async (req, res) => {
  const updateData = req.body;
  const updateDoc = {
    $set: {
      firstName: updateData.firstName,
      lastName: updateData.lastName,
      email: updateData.email,
    },
  };
  await UserService.updateUser(req.user, updateDoc);
  try {
    res.json({ status: 200, message: 'User has updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

userRouter.delete('/', protectedRoutes, async (req, res) => {
  await UserService.deleteUser(req.user);
  try {
    res.json({ status: 200, message: 'User has deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = {
  userRouter,
};
