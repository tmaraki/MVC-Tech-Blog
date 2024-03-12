const express = require('express');
const router = express.Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//GET all posts 
router.get('/', async (req, res) => {
  try {
    console.log('GET / home router accessed');
    // Get all blogposts and JOIN with user data
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment', 'postId', 'user_Id', 'created_at'],
          include: {
              model: User,
              attributes: ['username'],
          },
      }],
    });

    // Serialize data so the template can read it
    const blogPosts = dbBlogPostData.map((blogPost) => blogPost.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogPosts, 
      logged_in: req.session.logged_in,
      username: req.session.username,
      userId: req.session.userId });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogpost/:id', async (req, res) => {
  try {
    console.log('GET /blogpost/:id router accessed by :id');
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
         model: Comment,
                    attributes: ['id', 'comment', 'postId', 'user_Id', 'created_at'],
                    include: {
                      model: User,
                      attributes: ['username'],
                    },
                  },
                  {
                    model: User,
                    attributes: ['username'],
                  },
            ],
        });
        if (dbBlogPostData) {
            const blogPost = dbBlogPostData.get({ plain: true });
            console.log(blogPost);
            res.render('single-post', { blogPost, loggedIn: req.session.loggedIn, username: req.session.username, })  
        } else {
            res.status(404).json({ message: "This id has no post."});
            return;
        }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// login
router.get('/login', (req, res) => {
  console.log('GET/login router accessed');
    if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// Signup
router.get('/signup', async (req, res) => {
  res.render('signup');
})

module.exports = router;
