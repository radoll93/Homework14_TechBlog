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
          attributes: ['name'],
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

// // GET one gallery
// // TODO: Replace the logic below with the custom middleware
// router.get('/gallery/:id', withAuth, async (req, res) => {
//   // If the user is not logged in, redirect the user to the login page
//     // If the user is logged in, allow them to view the gallery
//     try {
//       const dbGalleryData = await Gallery.findByPk(req.params.id, {
//         include: [
//           {
//             model: Painting,
//             attributes: [
//               'id',
//               'title',
//               'artist',
//               'exhibition_date',
//               'filename',
//               'description',
//             ],
//           },
//         ],
//       });
//       const gallery = dbGalleryData.get({ plain: true });
//       res.render('gallery', { gallery, loggedIn: req.session.loggedIn });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
// });

// // GET one painting
// // TODO: Replace the logic below with the custom middleware
// router.get('/painting/:id', withAuth, async (req, res) => {
//   // If the user is not logged in, redirect the user to the login page
//     // If the user is logged in, allow them to view the painting
//     try {
//       const dbPaintingData = await Painting.findByPk(req.params.id);

//       const painting = dbPaintingData.get({ plain: true });

//       res.render('painting', { painting, loggedIn: req.session.loggedIn });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
// });

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
