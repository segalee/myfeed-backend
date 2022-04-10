const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getDogs, getDogById, addDog, updateDog, removeDog, updateDogGroup, removeDogGroup } = require('./dog.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getDogs)
router.get('/:id', getDogById)

// DOG REQUESTS

router.post('/', addDog)
router.put('/:id', updateDog)
router.delete('/:id', removeDog)

//GROUP REQUESTS



//TASK REQUESTS


module.exports = router

// router.post('/', requireAuth, requireAdmin, addDog)
// router.put('/:id', requireAuth, requireAdmin, updateDog)
// router.delete('/:id', requireAuth, requireAdmin, removeDog)