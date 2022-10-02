const express = require('express');
const router = express.Router();

router
  .route('/folders')
  .post((req, res) => {
    res.send('Create a new folder');
  })
  .get((req, res) => {
    res.send('get all folders');
  });

router
  .route('/folders/edit')
  .post((req, res) => {
    res.send('Update a folder');
  })
  .get((req, res) => {
    // takes a querystring
    // req.query.id
    res.send('Update a folder');
  });

router
  .route('/logs')
  .post((req, res) => {
    res.send('Create a new log');
  })
  .get((req, res) => {
    res.send('get all logs');
  });

router
  .route('/intervals')
  .post((req, res) => {
    res.send('Create a new interval');
  })
  .get((req, res) => {
    res.send('get an interval');
  });

router
  .route('/intervals/edit')
  .post((req, res) => {
    res.send('Update an interval');
  })
  .get((req, res) => {
    // takes a querystring
    // req.query.id
    res.send('get an interval to update');
  });

module.exports = router;
