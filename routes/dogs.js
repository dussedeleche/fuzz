const express = require('express');
const router = express.Router();
const dogsCtrl = require('../controllers/dogs');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
// GET /dogs
router.get('/', dogsCtrl.index);
// GET /dogs/new
router.get('/new', ensureLoggedIn, dogsCtrl.new);
// GET /dogs/:id (buddy functionality) MUST be below new route
router.get('/:id', dogsCtrl.buddy);
// POST /dogs
router.post('/', ensureLoggedIn, dogsCtrl.create);
// router.put('/', ensureLoggedIn, dogsCtrl.update);
router.put('/:id', ensureLoggedIn, dogsCtrl.update);
router.get('/:id/edit', ensureLoggedIn, dogsCtrl.edit)


module.exports = router;
