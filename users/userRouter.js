const express = require('express');

const Users = require('./userDb');
const Posts = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({message: "there was an error finding the user."})
    })
});

router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
  // do your magic!
  Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "There was an error creating the post" });
    });
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "no users can be found." })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
    res.status(404).json({ message: "no user was found by that id." })
  })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      res.status(500).json({ message: "there was an error getting posts." })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "this person has be deleted" })
      } else {
        res.status(404).json({ message: "this person cannot be found" })
      }
    })
});

router.put('/:id', [validateUserId, validateUser], (req, res) => {
  // do your magic!
  Users.update(req.body, req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: "the user could not be found." })
      }
    })
    .catch(error => {
      res.status(500).json({ message: "error updating the user." })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  Users.getById(req.params.id)
    .then(user => {
      if(user) {
        next();
      } else {
        res.status(400).status({message: "invalid user id"});
      }
    })
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({message: "missing required user information."})
  } else if (!req.body.name) {
    res.status(400).json({message: "missing required name field"})
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({message: "missing post data"})
  } else if (!req.body.text) {
    res.status(400).json({ message: "Missing required text field" })
  } else {
    next();
  }
}

module.exports = router;
