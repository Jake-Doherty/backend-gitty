const { Router } = require('express');
const Post = require('../models/Post.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      if (req.body.detail.length > 255) {
        res.statusMessage = 'post exceeds 255 character limit!';
        res.status(400).end();
      } else {
        const newPost = await Post.insert(req.body, req.user.id);
        res.json(newPost);
      }
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const posts = await Post.getAll();
      res.json(posts);
    } catch (e) {
      next(e);
    }
  });
