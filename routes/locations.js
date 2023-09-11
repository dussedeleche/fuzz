const express = require('express');
const router = express.Router();
const locationsCtrl = require('../controllers/locations');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.get('/locations/new', ensureLoggedIn, locationsCtrl.new);
router.post('/locations', ensureLoggedIn, locationsCtrl.create);
router.post('/dogs/:id/locations', ensureLoggedIn, locationsCtrl.addToplaces);

module.exports = router;