const cars = require('../data/dbConfig');
const db = require('../data/dbConfig');

async function validateId(req, res, next) {
  try {
    const car = await db('cars').where('id', req.params.id).first();
    (car) ? next() : res.status(404).json({ message: 'Car not found.'})
  } catch (err) {
    next(err)
  };
};

module.exports = {
  validateId
}
