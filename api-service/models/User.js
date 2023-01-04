const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

function generateRandomPassword() {
  return Math.random().toString(36).slice(2, 10);
}

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    default: generateRandomPassword,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
    required: true,
  },
});

UserSchema.pre('save', async function save(next) {
  const user = this;
  if (!user.isNew && !user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
  } catch (error) {
    if (error) return next(error);
  }

  return next();
});

module.exports = mongoose.model('User', UserSchema);
