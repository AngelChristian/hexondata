const express = require('express');

const {
  getRoutes,
  getRouteById,
  createRoute,
  updateRoute,
  deleteRoute,
} = require('../controllers/routeController');
const { isAuthenticated } = require('../controllers/authController.js');

const router = express.Router();

// read
router.get('/', getRoutes);
router.get('/:id', getRouteById);
// create
router.post('/', createRoute);
// update
router.put('/:id', updateRoute);
// delete
router.delete('/:id', isAuthenticated, deleteRoute);

module.exports = router;
