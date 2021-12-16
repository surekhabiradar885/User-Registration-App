const { promisify } = require('util');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

exports.signUp = catchAsyncErrors(async (req, res)=>{   
        const newUser = await User.create(req.body);
        const token = signToken(newUser._id);
        res.status(200).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        });      
      
})

exports.signIn = catchAsyncErrors(async (req, res) => {
    const { email, password } = req.body;
    //1.check if the email & password exist
    if (!email || !password) {
        return next(new ErrorHandler('Please provide email and password!', 400));
    }
    //2. check if user exist && password is correct
    const user = await  User.findOne({ email }).select('+password');
    //3. if eveything is ok then send the token to client
    const isPasswordMatched = await user.comparePassword(password, user.password);

    if (!user || !isPasswordMatched) {
        //return next(new ErrorHandler('Incorrect email or password', 401));
        return res.status(401).json({
            status: 'Fail',
            message:'Incorrect email or password'
    });   
    }
    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token
    });    
    
})
exports.protect = catchAsyncErrors(async (req, res, next) => {
    let token;
    //1) get token and check if it exist
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
         token = req.headers.authorization.split(' ')[1];
    }
    console.log("token ", token);
     if (!token) {
        next(new ErrorHandler('You are not logged in. Please login to get access',401))
    }
    //2)verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //3)check if the user still exist
     const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new ErrorHandler(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
    //4)check if the user chages the password after the token was issued
     if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new ErrorHandler('User recently changed password! Please log in again.', 401)
    );
  }
 // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
    next();
})