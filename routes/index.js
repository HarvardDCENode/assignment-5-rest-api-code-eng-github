var express = require('express');
var router = express.Router();
var HouseService = require('../services/houseService');

// display all house listings
router.get('/', async function(req, res, next) {
  const houses = await HouseService.list();
  res.render('index', { houses });
});

router.get('/apiTest', function(req, res) {
  res.render('apiTest');
})

// create new house listings
router.get('/house/create', async function (req, res, next) {
  const {address, price} = req.query;
  if(address !== undefined && price !== undefined) {
    const newHouse = await HouseService.create({
      address,
      price
    });

    return res.redirect('/house/' + newHouse.id);
  }

  res.render('houseCreate');
});

// view a specific house listing
router.get('/house/:id', async function (req, res, next) {
  const house = await HouseService.get(req.params.id);
  if(house === undefined) {
    return next();
  }
  res.render('houseListing', { house });
});

// edit a listing
router.get('/house/:id/edit', async function(req, res, next) {
  const {address, price} = req.query;
  const house = await HouseService.get(req.params.id);
  if(address !== undefined && price !== undefined) {
    house.address = address;
    house.price = price;
    await HouseService.save(house);

    return res.redirect('/house/' + house.id);
  }
  
  res.render('houseEdit', { house });
});

// delete a house listing
router.get('/house/:id/delete', async function(req, res) {
  await HouseService.delete(req.params.id);
  res.redirect('/');
});

module.exports = router;
