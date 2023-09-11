const Dog = require('../models/dog');

module.exports = {
  create,
  delete: deleteReview
};

async function deleteReview(req, res) {
  const dog = await Dog.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id });
  if (!dog) return res.redirect('/dogs');
  dog.reviews.remove(req.params.id);
  await dog.save();
  res.redirect(`/dogs/${dog._id}`);
}

async function create(req, res) {
  const dog = await Dog.findById(req.params.id);

  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  dog.reviews.push(req.body);
  try {
    await dog.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/dogs/${dog._id}`);
}