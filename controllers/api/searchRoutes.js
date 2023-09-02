const router = require('express').Router();
const { Event } = require('../../models');

// Define a route to search the database
router.post('/search', async (req, res) => {

    try {
        // Find the logged in user based on the session ID
        const searchEvent = await Event.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
          include: [{ model: Event }],
        });
    
        const user = searchEvent.get({ plain: true });
    

        res.render('searchevent', {

         ...user,
          logged_in: true
        });
      } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;