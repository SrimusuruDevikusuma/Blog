const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema for the posts collection
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: Date
});

// Create a model for the posts collection
const Post = mongoose.model('Post', postSchema);

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Route to get all posts
app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// Route to create a new post
app.post('/posts', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date()
  });

  await post.save();

  res.json(post);
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});