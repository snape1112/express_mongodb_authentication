# RESTful API Express Mongodb Driver

Install the dependencies:

```bash
yarn install or npm install
```

Set the environment variables:

```bash
.env

# open .env and modify the environment variables (if needed)
```

## Commands

Running locally:

```bash
yarn dev
```

```bash
npm run dev
```

## Testing Command

```bash
npm run test
```

### Application will run by default on port:`8080`

## Authentication

```javascript
const express = require('express');

const { Router } = express;
const { UserService } = require('../services/userService');
const { protectedRoutes } = require('../middleware/authentication');

const userRouter = Router();

userRouter.post('/login', async (req, res) => {
  const credentials = req.body;
  const response = await UserService.createToken(credentials);
  try {
    res.json({ response });
  } catch (err) {
    res.status(500);
  }
});

module.exports = {
  userRouter,
};


These routes require a valid JWT access token in the Authorization request header using the Bearer schema.
```

## Authorization

```javascript
const express = require('express');

const { Router } = express;
const { UserService } = require('../services/userService');
const { protectedRoutes } = require('../middleware/authentication');

const userRouter = Router();

userRouter.get('/', protectedRoutes, async (req, res) => {
  const options = { projection: { _id: 0, password: 0 } };
  const response = await UserService.showUser(req.user, options);
  try {
    res.json({ response });
  } catch (err) {
    res.status(500);
  }
});

module.exports = {
  userRouter,
};
```
