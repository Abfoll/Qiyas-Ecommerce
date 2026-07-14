import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import { generateToken } from "../../utils/generateToken.js";
import { requireAuth } from "../context/index.js";

export const userResolvers = {
  Query: {
    me: (_parent, _args, context) => {
      return context.user;
    },
  },

  Mutation: {
    register: async (_parent, { name, email, password }) => {
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters.");
      }

      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        throw new Error("An account with that email already exists.");
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, passwordHash });
      const token = generateToken(user);

      return { token, user };
    },

    login: async (_parent, { email, password }) => {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        throw new Error("Invalid email or password.");
      }

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) {
        throw new Error("Invalid email or password.");
      }

      const token = generateToken(user);
      return { token, user };
    },
  },

  User: {
    id: (parent) => parent._id.toString(),
    createdAt: (parent) => parent.createdAt.toISOString(),
  },
};