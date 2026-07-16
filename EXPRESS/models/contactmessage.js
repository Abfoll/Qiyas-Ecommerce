import mongoose from "mongoose";

const ContactMessageSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: true,
      trim: true, 
      lowercase: true 
    },
    subject: { 
      type: String, 
      required: true, 
      trim: true 
    },
    message: { 
      type: String, 
      required: true, 
      trim: true, 
      maxlength: 2000 
    },
    status: { 
      type: String, 
      enum: ['new', 'read', 'responded'], 
      default: 'new' 
    },
  },
  { timestamps: true }
);

const ContactMessage = mongoose.model('ContactMessage', ContactMessageSchema);
export default ContactMessage;
