const express = require('express');

const router = express.Router();
const {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require('../controllers/vehicleController.js');
const { isAuthenticated } = require('../controllers/authController.js');

// read
router.get('/', getVehicles);
router.get('/:id', getVehicleById);
// create
router.post('/', createVehicle);
// update
router.put('/:id', updateVehicle);
// delete
router.delete('/:id', isAuthenticated, deleteVehicle);

module.exports = router;
