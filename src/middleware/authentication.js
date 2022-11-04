require('dotenv').config();
const { verify } = require('jsonwebtoken');

const { secret } = process.env;
const protectedRoutes = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) throw new Error('something went wrong');

  const accessToken = token.split(' ')[1];
  return verify(accessToken, `${secret}`, (err, decode) => {
    if (err) throw new Error('something went wrong with verify');

    req.user = decode.data.id;
    next();
  });
};

module.exports = {
  protectedRoutes,
};
