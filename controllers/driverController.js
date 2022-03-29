const pool = require('../config/db.js');
// @desc    Get all drivers
// @route   GET drivers
exports.getDrivers = (request, response) => {
  pool.query('SELECT * FROM drivers ORDER BY id ASC', (error, results) => {
    if (error) {
      return response.status(400).json({
        error: 'NO driver found',
      });
    }
    response.status(200).json(results.rows);
  });
};

// @desc    Get  driver by id
// @route   GET drivers/:id
exports.getDriverById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM drivers WHERE id = $1', [id], (error, results) => {
    if (error) {
      return response.status(400).json({
        error: 'driver not found in DB',
      });
    }
    response.status(200).json(results.rows);
  });
};

// @desc    create  driver
// @route   POST drivers/
exports.createDriver = (request, response) => {
  const { name, phone_number, identification_number } = request.body;

  pool.query(
    'INSERT INTO drivers (name, phone_number, identification_number) VALUES ($1, $2, $3) RETURNING id',
    [name, phone_number, identification_number],
    (error, results) => {
      if (error) {
        return response.status(400).json({
          error: 'NOT able to save driver in DB',
        });
      }
      // console.log(results);
      response.status(201).send(`driver added with ID: ${results.rows[0].id}`);
    }
  );
};

// @desc    udpate  driver by id
// @route   PUT drivers/:id
exports.updateDriver = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, phone_number, identification_number } = request.body;

  pool.query(
    'UPDATE drivers SET name = $1, phone_number = $2, identification_number = $3 WHERE id = $4',
    [name, phone_number, identification_number, id],
    (error, results) => {
      if (error) {
        return response.status(400).json({
          error: 'Failed to update driver',
        });
      }
      response.status(200).send(`driver modified with ID: ${id}`);
    }
  );
};

// @desc    delete  driver by id
// @route   DELETE drivers/:id
exports.deleteDriver = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM drivers WHERE id = $1', [id], (error, results) => {
    if (error) {
      return response.status(400).json({
        error: 'Failed to delete this driver',
      });
    }
    response.status(200).send(`driver deleted with ID: ${id}`);
  });
};
