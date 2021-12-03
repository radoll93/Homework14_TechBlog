const router = require('express').Router();
const { Topic, Comment, User } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth')

// GET dashboard
router.get('/', withAuth, async (req, res) => {
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

// GET add topic form
router.get('/add', withAuth, (req, res) => {
    try{
    res.render('add-topic');
    } catch {
        console.log(err)
    }
});

// CREATE new topic
router.post('/add', withAuth, async (req, res) => {
    try {
      const topicData = await Topic.create({
        title: req.body.topic,
        content: req.body.content,
        posting_date: req.body.date,
        user_id: req.session.userId,
      });
      console.log(topicData)
        res.status(200).json(topicData);
      } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});
  
module.exports = router;
