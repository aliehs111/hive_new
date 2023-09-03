const router = require('express').Router();
const { Event } = require('../../models');

// Define a route to search the database
// router.get('/events/search', withAuth, async (req, res) => {
//   try {
//       const query = req.query.query; // Retrieve search query from request
//       const eventsData = await Event.findAll({
//           // Search logic...
//       });
//       const events = eventsData.map((event) => event.get({ plain: true }));
//       res.render('searchresults', {
//           loggedIn: req.session.logged_in,
//           events,
//       });
//   } catch (error) {
//       res.render('searchresults', {
//           loggedIn: req.session.logged_in,
//           error: 'Failed to load search results'
//       });
//   }
// });

module.exports = router;