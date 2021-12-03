const router = require('express').Router();
const { compareSync } = require('bcrypt');
const { Topic, Comment, User } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth')

// GET all topics for home -> home handlebar
router.get('/', async (req, res) => {
  try {
    const topicData = await Topic.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const topics = topicData.map((topic) =>
      topic.get({ plain: true })
    );

    res.render('home', {
      topics,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one topic -> topic handlebar
router.get('/topic/:id', withAuth, async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
    // If the user is logged in, allow them to view the topic
    try {
      const topicData = await Topic.findByPk(req.params.id, {
        include: [
          {
            model: Comment,
            attributes: [
              'comment',
              'user_id',
            ],
          },
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
      const topic = topicData.get({ plain: true });

      res.render('topic', { topic, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// GET comment -> comment handlebar
router.get('/topic/:id/comment', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: {
        topic_id: req.params.id,
      },
      include: [
        {model: User}
      ]
    })

    const comments = commentData.map((comment) => comment.get({ plain: true }));
    console.log(comments);

    const topicData = await Topic.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: [
            'comment',
            'user_id',
          ],
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const topic = topicData.get({ plain: true });

      res.render('comment', { 
        topic, 
        comments,       
        loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

//CREATE new comment
router.post('/topic/:id', withAuth, async (req, res) => {
  try {
    const id = req.headers.referer.split("/").pop();
    console.log(req.session)
    const commentData = await Comment.create({
      comment: req.body.comment,
      user_id: req.session.userId,
      topic_id: id,
    })
    console.log(commentData)
    res.status(200).json(commentData);
    } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
