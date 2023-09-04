const router = require('express').Router();
const { User, Event } = require('../models');
const { Op } = require('sequelize');

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
router.get('/events/search', withAuth, async (req, res) => {
  try {
    const query = req.query.search; // Retrieve search query from request
    const eventsData = await Event.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } },
          // Add more attributes as needed
        ],
      },
      attributes: ['id', 'name', 'description', 'date_scheduled', 'image'],
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },
      ],
    });
    const events = eventsData.map((event) => event.get({ plain: true }));
    res.render('searchresults', {
      loggedIn: req.session.logged_in,
      events,
    });
  } catch (error) {
    res.render('searchresults', {
      loggedIn: req.session.logged_in,
      error: 'Failed to load search results',
    });
  }
});
//event details
router.get('/events/:id', withAuth, async function (req, res) {
  try {
    const eventData = await Event.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'name', 'description', 'date_scheduled', 'image', 'user_id'],
      include: [
        {
          model: User,
          attributes: ['user_name', 'email'],
        },
      ],
    });
    const event = eventData.get({ plain: true });
    console.log(event);
    const isOwner = event.user_id === req.session.user_id;
    res.render('eventdetails', {
      loggedIn: req.session.logged_in,
      event,
      isOwner,
    });
  } catch (error) {
    res.render('eventdetails', {
      loggedIn: req.session.logged_in,
      error: 'Failed to load event',
    });
  }
});

router.get('/events/edit/:id', withAuth, async (req, res) => {
  try {
    const eventId = req.params.id;
    // Fetch the event data by ID
    const eventData = await Event.findOne({
      where: { id: eventId },
     
    });
    const isOwner = eventData.user_id === req.session.user_id;
    if (!isOwner) {
      res.redirect('/events/' + eventId);
      return;
    }
    if (!eventData) {
      // Handle event not found
      res.render('error', {
        message: 'Event not found',
      });
      return;
    }

    const event = eventData.get({ plain: true });

    event.date_scheduled = eventData.date_scheduled.toISOString().split('T')[0];
    res.render('editevent', {
      loggedIn: req.session.logged_in,
      event,
    });
  } catch (error) {
    // Handle error
    res.render('error', {
      message: 'An error occurred while fetching event data',
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

router.get('/search', function (req, res) {
    res.render('search');
});

router.get('/event', function (req, res) {
    res.render('event');
  });

  router.get('/search/event', (req, res) => {
    res.render('searchresults'); // Render the search.handlebars view
});

module.exports = router;
