import mongoose from 'mongoose';

const contactSchema = mongoose.Schema({
   _id: Number,
  name: {
    type: String,
    required: [true, "First name is required"],
    trim: true
  },
 
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true
  },
  info: {
    type: Date,
    default: Date.now
  }
});

const contactModel = mongoose.model('contact_collection', contactSchema);

export default contactModel;
