const Dog = require('../models/dog');
const location = require('../models/location');

module.exports = {
  index,
  show,
  new: newDog,
  create
};

async function index(req, res) {
  const dogs = await Dog.find({});
  res.render('dogs/index', { title: 'All Dogs', dogs });
}

async function show(req, res) {
  const dog = await Dog.findById(req.params.id).populate('places');
  const locations = await location.find({ _id: { $nin: dog.places } }).sort('name');
  res.render('dogs/show', { title: 'Dog Detail', dog, locations });  
}

function newDog(req, res) {
  res.render('dogs/new', { title: 'Add Dog', errorMsg: '' });
}

async function create(req, res) {
  // convert my pet's checkbox of nothing or "on" to boolean
  req.body.myPet = !!req.body.myPet;
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    const dog = await Dog.create(req.body);
    const locations = await location.find({ _id: { $nin: dog.places } }).sort('name');
    res.render('dogs/show', { title: 'Dog Detail', dog, locations });

  } catch (err) {
    console.log(err);
    res.render('dogs/new', { errorMsg: err.message });
  }
}