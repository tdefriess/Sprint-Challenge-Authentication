const bcrypt = require('bcryptjs');

const router = require('express').Router();

const Users = require('../database/users-model');

router.post('/register', (req, res) => {
  // implement registration
  if (req.body.username && req.body.password) {
    const userInfo = req.body;

  const ROUNDS = process.env.ROUNDS || 8;
  const hash = bcrypt.hashSync(userInfo.password, ROUNDS);

  userInfo.password = hash;

  Users.add(userInfo)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({errorMessage: 'could not add user to database'})
    });
  } else {
    res.status(401).json({message: 'Please provide both a username and password'})
  }  
});

router.post('/login', (req, res) => {
  // implement login
  const {username, password} = req.body;

  Users.findBy({ username })
    .then(([user]) => {

      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = {
          id: user.id,
          username: user.username
        }

        res.status(200).json({user})
      } else {
        res.status(401).json({message: 'Please provide valid credentials'})
      }
    })
    .catch(err => {
      res.status(500).json({errorMessage: 'Error finding a user by that name'})
    })
});

module.exports = router;
