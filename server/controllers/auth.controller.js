import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import template from './../helpers/template'
import renderBody from './../helpers/renderBody'
import _ from 'lodash'
import config from './../../config/config'
import sendEmail from './../helpers/sendEmail'

const signin = async (req, res) => {
  try {
    let user = await User.findOne({
      "email": req.body.email
    })

    if (!user)
      return res.status('401').json({
        error: "User not found"
      })

    if (!user.authenticate(req.body.password)) {
      return res.status('401').send({
        error: "Email and password don't match."
      })
    }

    if(!user.isVerified){
     
      const emailData = {
        from: "noreply@node-react.com",
        to: user.email,
        subject: "Welcome to Venari City. Verify email!",
        html: renderBody(template(`Email verification link, ${user.name}!`, 
          `Please use the following link to verify your email:  http://${req.get('host')}/verify-email/${user.verifyEmailLink}`))
      }
      await sendEmail(emailData);

      return res.status('401').send({
        error: "Email not verified. New email verification was sent to your email address. Please make sure to check your email spam/trash folder"
      })
    }

    const token = jwt.sign({
      _id: user._id, educator: user.educator, manager: user.manager
    }, config.jwtSecret)

    res.cookie("t", token, {
      expire: new Date() + 9999
    })

    return res.json({
      token,
      user: {
        _id: user._id, 
        name: user.name, 
        email: user.email, 
        educator: user.educator,
        manager: user.manager
      }
    })
  } catch (err) {
    console.log(err)
    return res.status('401').json({
      error: "Could not sign in"
    })

  }
}

const verifyEmail = (req, res) => {
  const { verifyEmailLink } = req.body;
  console.log("Verify email")
  console.log(verifyEmailLink)

  User.findOne({ verifyEmailLink }, (err, user) => {
    console.log("User :" + user)
      // if err or no user
      if (err || !user)
          return res.status("401").json({
              error: "Invalid or already used link!"
          });

      const updatedFields = {
          isVerified: true,
          verifyEmailLink: ""
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
              message: `Great! Now you can login.`
          });
      });
  });
}

const forgotPassword = (req, res) => {
  if (!req.body) return res.status(400).json({ message: "No request body" });
  if (!req.body.email)
      return res.status(400).json({ message: "No Email in request body" });

  console.log("forgot password finding user with that email");
  const { email } = req.body;
  console.log("signin req.body", email);
  // find the user based on email
  User.findOne({ email }, (err, user) => {
      // if err or no user
      if (err || !user)
          return res.status("401").json({
              error: "User with that email does not exist!"
          });

      // generate a token with user id and secret
      const token = jwt.sign(
          { _id: user._id, iss: "NODEAPI" },
          config.jwtSecret
        );
      // email data
      const emailData = {
          from: "noreply@node-react.com",
          to: email,
          subject: "Password Reset Instructions",
          text: `Please use the following link to reset your password: http://${req.get('host')}/reset-password/${token}`,
          html: renderBody(template('Password Reset Instructions', 
      `Please use the following link to reset your password: http://${req.get('host')}/reset-password/${token}`))
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

const resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;
  console.log(newPassword)

  User.findOne({ resetPasswordLink }, (err, user) => {
      // if err or no user
      if (err || !user)
          return res.status("401").json({
              error: "Invalid Link!"
          });

      user.password = newPassword
      user.resetPasswordLink = ""
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

const signout = (req, res) => {
  res.clearCookie("t")
  return res.status('200').json({
    message: "signed out"
  })
}

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth'
})

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  if (!(authorized)) {
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

export default {
  signin,
  signout,
  requireSignin,
  hasAuthorization,
  forgotPassword,
  resetPassword,
  verifyEmail
}
