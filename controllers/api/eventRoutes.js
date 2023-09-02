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

// update an event
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedEvent = await Event.update(req.body, {
      where: {
      id: req.params.id,
      user_id: req.session.user.id, //make sure event belongs to user - maybe not necessary?
    },
  });

  if (!updatedEvent[0]) {
    res.status(404).json({ message: 'No event found with this id' });
    return;
  }

  res.status(200).json(updatedEvent);
} catch (err) {
  res.status(400).json(err);
}
});

// delete an event
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const eventData = await Event.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!eventData) {
      res.status(404).json({ message: 'No event found with this id!' });
      return;
    }

    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// subscribe to event 
// router.post('/:id', withAuth, async (req, res) => {
//   try {
//     const eventData = await Event.findAll({
//       where: {id: req.params.id}
//     });
//     if (!eventData) {
//       res.status(404).json({ message: 'No event found with this id!' });
//       return;
//     }
//     const userData = await User.findAll({
//       where: {id: req.session.user_id}
//     });
//     if (!userData) {
//       res.status(404).json({ message: 'No user found!' });
//       return;
//     }
//     await User.addEvent(eventData);
//     await Event.addUser(userData);
//     res.status(200).json({ message: 'ok' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;
