const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');

const { userRouter } = require('./routes/user');
const { authRouter } = require('./routes/auth');
const dotenv = require('dotenv');
dotenv.config();

// eslint-disable-next-line no-undef
const apiPrefix = process.env.apiPrefix || '/api';
// eslint-disable-next-line no-undef
const Port = process.env.Port || 8080;

const expressServer = express();

expressServer.use(express.urlencoded({ extended: true }));
expressServer.use(express.json());
expressServer.use(cors());
expressServer.use(helmet());
expressServer.use(morgan('dev'));
expressServer.use(compression());

// Define routers
expressServer.use(apiPrefix + '/user', userRouter);
expressServer.use(apiPrefix + '/auth', authRouter);

expressServer.listen(Port, () => {
  console.log(`Listening on port ${Port}`);
});

// eslint-disable-next-line no-undef
console.log(`Worker ${process.pid} started`);
