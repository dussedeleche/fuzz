const Dog = require('../models/dog');
const Performer = require('../models/performer');

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
  // Populate the cast array with performer docs instead of ObjectIds
  const dog = await Dog.findById(req.params.id).populate('cast');
  // Mongoose query builder approach to retrieve performers not the dog:
    // Performer.find({}).where('_id').nin(dog.cast)
  // The native MongoDB approach uses a query object to find 
  // performer docs whose _ids are not in the dog.cast array like this:
  const performers = await Performer.find({ _id: { $nin: dog.cast } }).sort('name');
  res.render('dogs/show', { title: 'Dog Detail', dog, performers });
}

function newDog(req, res) {
  // We'll want to be able to render an  
  // errorMsg if the create action fails
  res.render('dogs/new', { title: 'Add Dog', errorMsg: '' });
}

async function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    // Update this line because now we need the _id of the new dog
    const dog = await Dog.create(req.body);
    // Redirect to the new dog's show functionality 
    res.redirect(`/dogs/${dog._id}`);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('dogs/new', { errorMsg: err.message });
  }
}