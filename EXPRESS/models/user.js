import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
      select: false, 
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    phone: { 
      type: String,
      trim: true },
    addresses: [
      {
        label: { type: String, default: 'Home' },
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
        isDefault: { 
          type: Boolean, 
          default: false 
        },
      },
    ],
    isActive: { 
      type: Boolean, 
      default: true 
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);







const User = mongoose.model('User', UserSchema);
export default User;