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


module.exports = router;