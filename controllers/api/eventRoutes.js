const express = require('express');
const router = require('express').Router();
const { User, Event } = require('../../models');
const withAuth = require('../../utils/auth');

// create a new event
router.post('/', withAuth, async (req, res) => {
  try {
    const newEvent = await Event.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(newEvent);

    res.status(200).json(newEvent);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//get the event that the user wants to edit
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const eventId = req.params.id;
    // Fetch the event data by ID
    const eventData = await Event.findOne({
      where: { id: eventId },
     
    });

    if (!eventData) {
      // Handle event not found
      res.render('error', {
        message: 'Event not found',
      });
      return;
    }

    const event = eventData.get({ plain: true });
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

router.put('/edit/:id', withAuth, async (req, res) => {
  try {
    const eventId = req.params.id;
    const { name, description, date_scheduled, /* other attributes */ } = req.body;

    // Update the event data in the database
    const updatedEvent = await Event.update(
      {
        name,
        description,
        date_scheduled,
        // Update other attributes as needed
      },
      {
        where: { id: eventId },
      }
    );

    if (updatedEvent[0] === 0) {
      // Handle event not found or failed update
      res.render('error', {
        message: 'Event not found or update failed',
      });
      return;
    }

    // Event was successfully updated
    res.redirect('/'); // Redirect to the homepage or another relevant page
  } catch (error) {
    // Handle error
    res.render('error', {
      message: 'An error occurred while updating the event',
    });
  }
});
//////////////////
// // update an event
// router.put('/:id', withAuth, async (req, res) => {
//   try {
//     const updatedEvent = await Event.update(req.body, {
//       where: {
//       id: req.params.id,
//       user_id: req.session.user.id, //make sure event belongs to user - maybe not necessary?
//     },
//   });

//   if (!updatedEvent[0]) {
//     res.status(404).json({ message: 'No event found with this id' });
//     return;
//   }

//   res.status(200).json(updatedEvent);
// } catch (err) {
//   res.status(400).json(err);
// }
// });
//////////////////
// search for events

router.get('/events/', withAuth, async (req, res) => {
  try {
      const query = req.query.query; // Retrieve search query from request
      const eventsData = await Event.findAll({
        where: {
          $or: [
            { name: { $like: `%${query}%` } },
            { description: { $like: `%${query}%` } },
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
          error: 'Failed to load search results'
      });
  }
});





module.exports = router;
