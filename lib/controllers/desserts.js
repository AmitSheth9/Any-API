const { Router } = require('express');
const Dessert = require('../models/Dessert');

module.exports = Router()
  .post('/', async (req, res) => {
    console.log('post route');
    const dessert = await Dessert.insert({ item: req.body.item, calories: req.body.calories });
    res.send(dessert);
  })
  .get('/:id', async (req, res) => {
    const dessert = await Dessert.getById(req.params.id);
    res.json(dessert);
  })
  .get('/', async (req, res) => {
    const desserts = await Dessert.getAll();
    res.json(desserts);
  })
  .patch('/:id', async (req, res) => {
    const { id } = req.params;
    const dessert = await Dessert.updateById(id, req.body);
    res.json(dessert);
  })
  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const dessert = await Dessert.deleteById(id);
    res.json(dessert);
  });
