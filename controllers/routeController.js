const pool = require('../config/db.js');

// @desc    Get all routes
// @route   GET routes/
exports.getRoutes = (request, response) => {
  pool.query('SELECT * FROM routes ORDER BY id ASC', (error, results) => {
    if (error) {
      return res.status(400).json({
        error: 'NO routes found',
      });
    }
    response.status(200).json(results.rows);
  });
};

// @desc    Get routes by id
// @route   GET routes/:id
exports.getRouteById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM routes WHERE id = $1', [id], (error, results) => {
    if (error) {
      return response.status(400).json({
        error: 'route not found in DB',
      });
    }
    response.status(200).json(results.rows);
  });
};

// @desc    create routes
// @route   post routes/
exports.createRoute = (request, response) => {
  const { route_name, route_short_name } = request.body;

  pool.query(
    'INSERT INTO routes (route_name, route_short_name) VALUES ($1, $2) RETURNING id',
    [route_name, route_short_name],
    (error, results) => {
      if (error) {
        return response.status(400).json({
          error: 'NOT able to save route in DB',
        });
      }
      response.status(201).send(`route added with ID: ${results.rows[0].id}`);
    }
  );
};

// @desc    update routes by id
// @route   PUT routes/:id
exports.updateRoute = (request, response) => {
  const id = parseInt(request.params.id);
  const { route_name, route_short_name } = request.body;

  pool.query(
    'UPDATE routes SET route_name = $1, route_short_name = $2 WHERE id = $3',
    [route_name, route_short_name, id],
    (error, results) => {
      if (error) {
        return response.status(400).json({
          error: 'Failed to update route',
        });
      }
      response.status(200).send(`route modified with ID: ${id}`);
    }
  );
};

// @desc    delete route
// @route   DELETE routes/:id
exports.deleteRoute = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM routes WHERE id = $1', [id], (error, results) => {
    if (error) {
      return response.status(400).json({
        error: 'Failed to delete this route',
      });
    }
    response.status(200).send(`route deleted with ID: ${id}`);
  });
};
