const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name!']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide the password'],
        minlength: 6,
        select:false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: [passwordValidator,'Passwords are not the same!']
    },
     passwordChangedAt: Date
    
});
//works only when create and save               
function passwordValidator(value) {
    return value === this.password;
}

userSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return   await  bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};
const User = mongoose.model('User', userSchema)

module.exports = User;