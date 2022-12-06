const { Router } = require('express');
const Post = require('../models/Post.js');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const posts = await Post.insert(req.body);
    res.json(posts);
  } catch (e) {
    next(e);
  }
});
