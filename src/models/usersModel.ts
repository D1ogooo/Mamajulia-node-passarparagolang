import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user"
  },
  createdAt: {
    type: Date,
    default: new Intl.DateTimeFormat('pt-BR').format(new Date()),
  }
});

const User = mongoose.model('User', UserSchema);
export { User }