const express = require('express');
const Post = require('../models/post');

const router = express.Router();

// Create a new post
router.post('/', async (req, res) => {
  const { user, content } = req.body;
  try {
    const newPost = await Post.create({ user, content });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name').sort('-createdAt');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Like a post
router.put('/:id/like', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a comment to a post
router.post('/:id/comment', async (req, res) => {
  const { id } = req.params;
  const { user, comment } = req.body;

  try {
    const post = await Post.findById(id);
    post.comments.push({ user, comment });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
