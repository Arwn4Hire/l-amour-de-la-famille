const jwt = require("jsonwebtoken");
const User = require("../models/user");
const expressJwt = require('express-jwt')
const dotenv = require("dotenv");
dotenv.config();
const { sendEmail } = require('../helpers');

exports.signup = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    return res.status(403).json({
      error: "Email is in use"
    });

  const user = new User(req.body);
  await user.save();
  res.status(200).json({ message: "SignUp success please login" });
};

exports.signin = (req, res) => {
  //find the user = email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: " User with that email does not exist. Please signUp"
      });
    }
    //if found match email and pass

    //create auth method
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: " email and password do not match with what we have "
      });
    }
    //gen token with id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //process as token as 't' in cookie with exp
    res.cookie("t", token, { expire: new Date() + 9999 });
    //return res with user n tkn
    const { _id, name, email } = user;
    return res.json({ token, user: { _id, email, name } });
  });
};

exports.signout = (req, res) => {
    res.clearCookie("t")
    return res.json({message: "signOut success"})
}

exports.requireSignin = expressJwt({
    //if tkm is valid vify 
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
})

//added
exports.forgotPassword = (req, res) => {
  if (!req.body) return res.status(400).json({ message: 'No request body' });
  if (!req.body.email) return res.status(400).json({ message: 'No Email in request body' });

  console.log('forgot password finding user with that email');
  const { email } = req.body;
  console.log('signin req.body', email);
  // find the user based on email
  User.findOne({ email }, (err, user) => {
      // if err or no user
      if (err || !user)
          return res.status('401').json({
              error: 'User with that email does not exist!'
          });

      // generate a token with user id and secret
      const token = jwt.sign({ _id: user._id, iss: process.env.APP_NAME }, process.env.JWT_SECRET);

      // email data
      const emailData = {
          from: 'noreply@Nicholas-Memories-Photo.com',
          to: email,
          subject: 'Password Reset Instructions From lamour de la famille',
          text: `Please use the following link to reset your password for lamour de la famille: ${
              process.env.CLIENT_URL
          }/reset-password/${token}`,
          html: `<p>Please use the following link to reset your password to lamour de la famille:</p> <p>${
              process.env.CLIENT_URL
          }/reset-password/${token}</p>`
      };

      return user.updateOne({ resetPasswordLink: token }, (err, success) => {
          if (err) {
              return res.json({ message: err });
          } else {
              sendEmail(emailData);
              return res.status(200).json({
                  message: `Email has been sent to ${email}. Follow the instructions to reset your password.`
              });
          }
      });
  });
};

// to allow user to reset password
// first you will find the user in the database with user's resetPasswordLink
// user model's resetPasswordLink's value must match the token
// if the user's resetPasswordLink(token) matches the incoming req.body.resetPasswordLink(token)
// then we got the right user

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  User.findOne({ resetPasswordLink }, (err, user) => {
      // if err or no user
      if (err || !user)
          return res.status('401').json({
              error: 'Invalid Link!'
          });

      const updatedFields = {
          password: newPassword,
          resetPasswordLink: ''
      };

      user = _.extend(user, updatedFields);
      user.updated = Date.now();

      user.save((err, result) => {
          if (err) {
              return res.status(400).json({
                  error: err
              });
          }
          res.json({
              message: `Great! Now you can login with your new password.`
          });
      });
  });
};