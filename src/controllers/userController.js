const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dayInMilisecond = 86400000;

const createUser = async (req, res) => {
     const { name, email, password } = req.body;
     
     const alreadyExists = await User.findOne({ email });

     if(alreadyExists){
          return res.status(400).json({ message: "user already exists"});
     }


     const user = new User({
          name,
          email,
          password 
     });

     const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(password, salt);

     await user.save();

     const payload = {
          user: {
               email: user.email,
          }
     }

     jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (error, token) => {
               if(!error) return res.json({ token }).status(200)
          }
     )
}

const authUser = async (req, res) => {
     const { email, password } = req.body;

     const user = await User.findOne({
          email
     })

     if(!user){
          return res.status(400).json()
     }

     const isPasswordCorrect = await bcrypt.compare(password, user.password);

     if(!isPasswordCorrect){
          return res.status(400).json()
     }

     const payload = {
          user: {
               email: user.email,
          }
     }
     
     jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d'}, (error, token) => {
               if(!error) {
                    return res.cookie('token', token, {
                    expires: new Date(Date.now() + dayInMilisecond*7), 
                    httpOnly: false,
               }).status(200).json({
                    token
               }).send({ user, token: token})
               
          }
          }
     )
}

const getUser = (req, res) => {
     const { email } = req.user;
     res.status(200).json({ email: email})
}

module.exports = {
     createUser,
     authUser,
     getUser
}