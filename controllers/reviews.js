const Dog = require('../models/dog');

module.exports = {
  create,
  // Add this export
  delete: deleteReview
};

async function deleteReview(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  const dog = await Dog.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id });
  // Rogue user!
  if (!dog) return res.redirect('/dogs');
  // Remove the review using the remove method available on Mongoose arrays
  dog.reviews.remove(req.params.id);
  // Save the updated dog doc
  await dog.save();
  // Redirect back to the dog's buddy view
  res.redirect(`/dogs/${dog._id}`);
}

async function create(req, res) {
  const dog = await Dog.findById(req.params.id);

  // Add the user-centric info to req.body (the new review)
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  // We can push (or unshift) subdocs into Mongoose arrays
  dog.reviews.push(req.body);
  try {
    // Save any changes made to the dog doc
    await dog.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/dogs/${dog._id}`);
}