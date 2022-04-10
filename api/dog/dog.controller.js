const dogService = require('./dog.service.js');
const logger = require('../../services/logger.service')

// GET LIST
async function getDogs(req, res) {
  try {
    console.log('req.query:🤔😒😖🤪😵🥴🤯', req.query);

    const filterBy = {
      txt: req.query.txt || "",
      breed: req.query.breed || "",
      gender: req.query.gender || "",
      size: req.query.size || "",
      age: req.query.age || "",

    }

    const sortBy = {
      dob: req.query.dob || "",
      size: req.query.size || ""
    }

    const pageInfo = {
      skip: +req.query.skip || 0,
      limit: +req.query.limit || 5
    }


    // let { filterBy } = req.query;
    // filterBy = JSON.parse(filterBy);
    const dogs = await dogService.query(filterBy, sortBy, pageInfo)
    // console.log('the dogs in controller', dogs)
    res.json(dogs);
  } catch (err) {
    console.log(err)
    logger.error('Failed to get dogs', err)
    res.status(500).send({ err: 'Failed to get dogs' })
  }
}

// GET BY ID 
async function getDogById(req, res) {
  try {
    const dogId = req.params.id;
    console.log('dog id in controller', dogId);
    const dog = await dogService.getById(dogId)
    res.json(dog)
  } catch (err) {
    logger.error('Failed to get dog', err)
    res.status(500).send({ err: 'Failed to get dog' })
  }
}

// POST (add dog)
async function addDog(req, res) {
  try {
    const dog = req.body;
    const addedDog = await dogService.add(dog)
    res.json(addedDog)
  } catch (err) {
    logger.error('Failed to add dog', err)
    res.status(500).send({ err: 'Failed to add dog' })
  }
}

// PUT (Update dog)
async function updateDog(req, res) {
  try {
    const dog = req.body;
    await dogService.update(dog)
    console.log('Updated dog succesfuly');
    res.json(dog)
  } catch (err) {
    logger.error('Failed to update dog', err)
    res.status(500).send({ err: 'Failed to update dog' })

  }
}

// DELETE (Remove dog)
async function removeDog(req, res) {
  try {
    const dogId = req.params.id;
    const removedId = await dogService.remove(dogId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove dog', err)
    res.status(500).send({ err: 'Failed to remove dog' })
  }
}


module.exports = {
  getDogs,
  getDogById,
  addDog,
  updateDog,
  removeDog
}
