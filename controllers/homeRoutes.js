const router = require('express').Router();
const { User, Event } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', withAuth, async function (req, res) {
  try {
    const eventsData = await Event.findAll({
      attributes: ['id', 'name', 'description', 'date_scheduled', 'image'],
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },
      ],
    });
    const events = eventsData.map((post) => post.get({ plain: true }));
    res.render('homepage', {
      loggedIn: req.session.logged_in,
      events,
    });
  } catch (error) {
    res.render('homepage', {
      loggedIn: req.session.logged_in,
      error: 'Failed to load events',
    });
  }
});
router.get('/events/:id', withAuth, async function (req, res) {
  try {
    const eventData = await Event.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'name', 'description', 'date_scheduled', 'image'],
      include: [
        {
          model: User,
          attributes: ['user_name', 'email'],
        },
      ],
    });
    const event = eventData.get({ plain: true });
    console.log(event);
    res.render('eventdetails', {
      loggedIn: req.session.logged_in,
      event,
    });
  } catch (error) {
    res.render('eventdetails', {
      loggedIn: req.session.logged_in,
      error: 'Failed to load event',
    });
  }
});

router.get('/signup', function (req, res) {
  res.render('signup');
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.get('/logout', function (req, res) {
  res.render('login');
});

router.get('/event', function (req, res) {
    res.render('event');
  });

module.exports = router;
