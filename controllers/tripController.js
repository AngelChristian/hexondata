const pool = require('../config/db.js');

// @desc    Get All trips
// @route   GET trips/
exports.getTrips = (request, response) => {
  pool.query('SELECT * FROM routes ORDER BY id ASC', (error, results) => {
    if (error) {
      return response.status(400).json({
        error: 'NO trips found',
      });
    }
    response.status(200).json(results.rows);
  });
};

// @desc    Get trip by id
// @route   GET trips/:id
exports.getTripById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM routes WHERE id = $1', [id], (error, results) => {
    if (error) {
      return response.status(400).json({
        error: 'trip not found in DB',
      });
    }
    response.status(200).json(results.rows);
  });
};

// @desc    create trip
// @route   POST trips/
exports.createTrip = (request, response) => {
  const { driver_id, vehicle_id, route_id, started_at, ended_at } =
    request.body;

  pool.query(
    'INSERT INTO trips (driver_id,vehicle_id,route_id,started_at,ended_at) VALUES ($1, $2,$3,$4,$5) RETURNING id',
    [driver_id, vehicle_id, route_id, started_at, ended_at],
    (error, results) => {
      if (error) {
        return response.status(400).json({
          error: 'NOT able to save trip in DB',
        });
      }
      response.status(201).send(`trip added with ID: ${results.rows[0].id}`);
    }
  );
};

// @desc    update trips
// @route   PUT trips/:id
exports.updateTrip = (request, response) => {
  const id = parseInt(request.params.id);
  const { driver_id, vehicle_id, route_id, started_at, ended_at } =
    request.body;

  pool.query(
    'UPDATE trips SET driver_id = $1,vehicle_id = $2,route_id = $3,started_at =$4,ended_at = $5 WHERE id = $6',
    [driver_id, vehicle_id, route_id, started_at, ended_at, id],
    (error, results) => {
      if (error) {
        return response.status(400).json({
          error: 'Failed to update trip',
        });
      }
      response.status(200).send(`trip modified with ID: ${id}`);
    }
  );
};

// @desc    delete Trip
// @route   DELETE trips/:id
exports.deleteTrip = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM trips WHERE id = $1', [id], (error, results) => {
    if (error) {
      return response.status(400).json({
        error: 'Failed to delete this trip',
      });
    }
    response.status(200).send(`trip deleted with ID: ${id}`);
  });
};
