const express = require('express');
const router = express.Router();
const dogsCtrl = require('../controllers/dogs');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	

router.get('/', dogsCtrl.index);

router.get('/new', ensureLoggedIn, dogsCtrl.new);

router.get('/:id', dogsCtrl.buddy);

router.post('/', ensureLoggedIn, dogsCtrl.create);
router.put('/:id', ensureLoggedIn, dogsCtrl.update);
router.get('/:id/edit', ensureLoggedIn, dogsCtrl.edit)


module.exports = router;
