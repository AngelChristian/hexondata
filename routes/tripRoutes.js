const express = require('express');

const {
  getTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
} = require('../controllers/tripController');
const { isAuthenticated } = require('../controllers/authController.js');

const router = express.Router();

// read
router.get('/', getTrips);
router.get('/:id', getTripById);
// create
router.post('/', createTrip);
// update
router.put('/:id', updateTrip);
// delete
router.delete('/:id', isAuthenticated, deleteTrip);

module.exports = router;
