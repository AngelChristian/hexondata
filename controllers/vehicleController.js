const pool = require('../config/db.js');

// @desc    Get all vehicles
// @route   GET /vehicles
exports.getVehicles = (request, response) => {
  pool.query('SELECT * FROM vehicles ORDER BY id ASC', (error, results) => {
    if (error) {
      return response.status(400).json({
        error: 'NO vehicles found',
      });
    }
    response.status(200).json(results.rows);
  });
};

// @desc    Get vehicle by ID
// @route   GET vehicles/:id
exports.getVehicleById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM vehicles WHERE id = $1', [id], (error, results) => {
    if (error) {
      return response.status(400).json({
        error: 'vehicle not found in DB',
      });
    }
    response.status(200).json(results.rows);
  });
};

// @desc    create vehicle
// @route   POST vehicles/
exports.createVehicle = (request, response) => {
  const { registration_number, vehicle_model } = request.body;

  pool.query(
    'INSERT INTO vehicles (registration_number, vehicle_model) VALUES ($1, $2) RETURNING id',
    [registration_number, vehicle_model],
    (error, results) => {
      if (error) {
        return response.status(400).json({
          error: 'NOT able to save vehicle in DB',
        });
      }
      // console.log(results);
      response.status(201).send(`vehicle added with ID: ${results.rows[0].id}`);
    }
  );
};

// @desc    update vehicle by ID
// @route   PUT vehicles/:id
exports.updateVehicle = (request, response) => {
  const id = parseInt(request.params.id);
  const { registration_number, vehicle_model } = request.body;

  pool.query(
    'UPDATE vehicles SET registration_number = $1, vehicle_model = $2 WHERE id = $3',
    [registration_number, vehicle_model, id],
    (error, results) => {
      if (error) {
        return response.status(400).json({
          error: 'Failed to update vehicle',
        });
      }
      response.status(200).send(`vehicle modified with ID: ${id}`);
    }
  );
};

// @desc    delete vehicle
// @route   DELETE vehicles/:id
exports.deleteVehicle = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM vehicles WHERE id = $1', [id], (error, results) => {
    if (error) {
      return response.status(400).json({
        error: 'Failed to delete this  vehicle',
      });
    }
    response.status(200).send(`vehicle deleted with ID: ${id}`);
  });
};
