const express = require('express');
const knex = require('knex');
const db = require('../data/dbConfig');
const { validateId } = require('../middleware/validation');

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json(await db("cars").select())
  } catch (err) {
    res.status(500).json({
      err: err,
      errorMessage: 'The cars information could not be retrieved.'
    })
    next(err)
  };
});

router.get('/:id', validateId, async (req, res, next) => {
  try {
    res.status(200).json(await db('cars').first())
  } catch(err) {
    res.status(500).json({
      err: err,
      errorMessage: 'The car information could not be retrieved.'
    })
    next(err)
  };
});

router.post('/', async (req, res, next) => {
  try {
    const payload = {
      vin: req.body.VIN,
      make: req.body.make,
      model: req.body.model,
      mileage: req.body.mileage,
      transmission: req.body.transmission,
      title: req.body.title
    }
    const [id] = await db('cars').insert(payload)
    res.status(201).json(await db('cars').where('id', id).first())
  } catch (err) {
    res.status(500).json({
      err: err,
      errorMessage: 'Failed to add car to the database.'
    })
    next(err)
  };
});

router.put('/:id', validateId, async (req, res, next) => {
  try {
    const payload = {
      vin: req.body.VIN,
      make: req.body.make,
      model: req.body.model,
      mileage: req.body.mileage,
      transmission: req.body.transmission,
      title: req.body.title
    }
    await db('cars').where('id', req.params.id).update(payload)
    res.status(200).json(await db('cars').where('id', req.params.id).first())
  } catch (err) {
    res.status(500).json({
      err: err,
      errorMessage: 'Failed to update car information.'
    })
    next(err)
  };
});

router.delete('/:id', validateId, async (req, res, next) => {
  try {
    await db('cars').where('id', req.params.id).del()
    res.status(200).json({
      message: 'One car has been deleted.'
    })
  } catch (err) {
    res.status(500).json({
      err: err,
      errorMessage: 'Failed to remove one record.'
    })
    next(err)
  };
})

module.exports = router;