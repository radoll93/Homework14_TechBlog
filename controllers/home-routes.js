const router = require('express').Router();
const { Topic, Comment, User } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth')

// GET all topics for home
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

// GET one topic
router.get('/topic/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
    // If the user is logged in, allow them to view the topic
    try {
      const topicData = await Topic.findByPk(req.params.id, {
        include: [
          {
            model: Comment,
            attributes: [
              'comment',
            ],
          },
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
      const topic = topicData.get({ plain: true });

      console.log(topic);
      res.render('topic', { topic, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// GET one painting
router.get('/dashboard', async (req, res) => {
  try {
    const dashboardData = await Topic.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const dashboard = dashboardData.map((topic) =>
      topic.get({ plain: true })
    );

      console.log(dashboard)
      res.render('dashboard', { dashboard, loggedIn: req.session.loggedIn });
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

module.exports = router;
