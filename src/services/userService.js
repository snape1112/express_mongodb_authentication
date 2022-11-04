require('dotenv').config();
const { compare, genSalt, hash } = require('bcrypt');
const { ObjectId } = require('mongodb');
const { sign } = require('jsonwebtoken');
const { UserRepository } = require('../repositories/userRepository');
const { UserModel } = require('../models/user.model');

const { secret } = process.env;

class UserService {
  static userRepository = UserRepository;

  static async createUser({ firstName, lastName, email, password }) {
    const existingUser = await UserRepository.findOne({ email });
    if (existingUser) {
      return;
    }

    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);
    const userModel = new UserModel(firstName, lastName, email, hashPassword);
    // eslint-disable-next-line consistent-return
    return await this.userRepository.insertOne(userModel);
  }

  static async createToken({ email, password }) {
    const document = await this.userRepository.findOne({ email });
    const match = document && (await compare(password, document.password));
    if (!match) return;

    // eslint-disable-next-line consistent-return
    return {
      accessToken: sign(
        {
          data: {
            id: document._id,
          },
        },
        // eslint-disable-next-line comma-dangle
        `${secret}`
      ),
    };
  }

  static async findOne(id, options) {
    const document = await this.userRepository.findOne({ _id: ObjectId(id) }, options);
    if (!document) throw new Error('something went wrong');
    return document;
  }

  static async updateUser(filter, updateDoc) {
    return await this.userRepository.updateOne({ _id: ObjectId(filter) }, updateDoc);
  }

  static async deleteUser(query) {
    const document = await this.userRepository.deleteOne({ _id: ObjectId(query) });
    if (!document) throw new Error('something went wrong');
    return document;
  }
}

module.exports = {
  UserService,
};
