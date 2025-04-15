var express = require('express');
var router = express.Router();
var HouseService = require('../services/houseService')

// display all house listings
router.get('/house', async function(req, res, next) {
  const houses = await HouseService.list();
  res.json(houses);
});

// view a specific house listing
router.get('/house/:id', async function (req, res, next) {
  const house = await HouseService.get(req.params.id);
  if(house === undefined) {
    return next();
  }
  res.json(house);
});

// create new house listings
router.put('/house', async function (req, res, next) {
  // require json body
  if(req.headers['content-type'] !== 'application/json') {
    res.status(400).send();
    return;
  }

  // create house and return json in body
  const newHouse = await HouseService.create(req.body);
  res.json(newHouse);
});

// update house listings
router.post('/house/:id', async function (req, res, next) {
  // require json body
  if(req.headers['content-type'] !== 'application/json') {
    res.status(400).send();
    return;
  }

  // update if the user set address & price
  const {address, price} = req.body
  if(address !== undefined && price !== undefined) {
    const house = await HouseService.get(req.params.id);
    house.address = address;
    house.price = price;
    await HouseService.save(house);

    res.json(house);
    return;
  }
  
  res.status(400).send();
});

// delete a specific house listing
router.delete('/house/:id', async function (req, res, next) {
  const house = await HouseService.delete(req.params.id);
  if(house === null) {
    res.status(404).send();
    return;
  }

  res.status(200).send();
});


module.exports = router;