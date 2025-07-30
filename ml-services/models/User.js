// ml-services/models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  caretakerEmail: { type: String },
  password: String
});

// THIS IS IMPORTANT!
const User = mongoose.model('User', UserSchema);
export default User;

