const express = require('express');
const router = express.Router();
const dogsCtrl = require('../controllers/dogs');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
// GET /dogs
router.get('/', dogsCtrl.index);
// GET /dogs/new
router.get('/new', ensureLoggedIn, dogsCtrl.new);
// GET /dogs/:id (show functionality) MUST be below new route
router.get('/:id', dogsCtrl.show);
// POST /dogs
router.post('/', ensureLoggedIn, dogsCtrl.create);
	
module.exports = router;
