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

router.put('/:id', withAuth, async (req, res) => {
  try {
    const eventId = req.params.id;

    // Update the event data in the database
    const updatedEvent = await Event.update(req.body, {
      where: { id: eventId },
    });

    res.json({
      message: 'Event updated successfully',
    });
  } catch (error) {
    // Handle error
    res.status(500).json({
      message: 'No event found with this id',
    });
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const eventId = req.params.id;
    //delete event
    const deletedEvent = await Event.destroy({
      where: { id: eventId },
    });
    //response
    res.json({
      message: 'Event deleted successfully',
    });
  } catch (error) {
    // Handle error
    res.status(500).json({
      message: 'Error deleting event',
    });
  }
});

    



module.exports = router;
