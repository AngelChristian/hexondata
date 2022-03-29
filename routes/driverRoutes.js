const express = require('express');

const {
  getDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
} = require('../controllers/driverController');
const { isAuthenticated } = require('../controllers/authController.js');

const router = express.Router();

// read
router.get('/', getDrivers);
router.get('/:id', getDriverById);
// create
router.post('/', createDriver);
// update
router.put('/:id', updateDriver);
// delete
router.delete('/:id', isAuthenticated, deleteDriver);

module.exports = router;
