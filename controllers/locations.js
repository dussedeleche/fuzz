const location = require('../models/location');
const Dog = require('../models/dog');

module.exports = {
  new: newLocation,
  create,
  addToplaces
};

async function addToplaces(req, res) {
  const dog = await Dog.findById(req.params.id);
  // The places array holds the location's ObjectId (referencing)
  dog.places.push(req.body.locationId);
  await dog.save();
  res.redirect(`/dogs/${dog._id}`);
}

async function newLocation(req, res) {
  //Sort locations by their name
  const locations = await location.find({}).sort('name');
  res.render('locations/new', { title: 'Favorite Locations', locations });
}

async function create(req, res) {
  req.body.playDate += 'T00:00';
  try {
    await location.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/locations/new');
}