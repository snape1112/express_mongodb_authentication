const express = require('express');

const { Router } = express;
const { UserService } = require('../services/userService');

const authRouter = Router();

authRouter.post('/login', async (req, res) => {
  const credentials = req.body;
  const response = await UserService.createToken(credentials);
  try {
    res.json({ response });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

authRouter.post('/register', async (req, res) => {
  const credentials = req.body;
  const response = await UserService.createUser(credentials);
  try {
    if (response === undefined) return res.json({ status: 400 });
    res.json({ status: 200, message: 'User has registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});


module.exports = {
  authRouter,
};
