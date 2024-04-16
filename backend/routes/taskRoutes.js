const express = require('express');
const { Task } = require('../models/task');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    console.log("SDf")
    const task = await Task.create(req.body);
    res.status(201).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Task.update(req.body, { where: { id: req.params.id } });
    res.send({ message: 'Task updated' });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Task.destroy({ where: { id: req.params.id } });
    res.send({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
