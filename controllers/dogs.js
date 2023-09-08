const Dog = require("../models/dog");
const location = require("../models/location");

module.exports = {
  index,
  buddy,
  new: newDog,
  create,
  update: updatedog,
  edit,
};

async function index(req, res) {
  const dogs = await Dog.find({});
  res.render("dogs/index", { title: "All Dogs", dogs });
}

async function buddy(req, res) {
  const dog = await Dog.findById(req.params.id).populate("places");
  const locations = await location
    .find({ _id: { $nin: dog.places } })
    .sort("name");
  res.render("dogs/buddy", { title: "Dog Detail", dog, locations });
}

function newDog(req, res) {
  res.render("dogs/new", { title: "Add Dog", errorMsg: "" });
}

async function create(req, res) {
  // convert my pet's checkbox of nothing or "on" to boolean
  req.body.myPet = !!req.body.myPet;
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  try {
    const dog = await Dog.create(req.body);
    const locations = await location
      .find({ _id: { $nin: dog.places } })
      .sort("name");
    res.render("dogs/buddy", { title: "Dog Detail", dog, locations });
  } catch (err) {
    console.log(err);
    res.render("dogs/new", { errorMsg: err.message });
  }
}

async function updatedog(req, res) {
  console.log('function updatedog:', req.body);
  try {
    const dogId = req.params.id;
    const updateddogData = req.body;
    // Find and update the dog
    const updateddog = await Dog.findByIdAndUpdate(dogId, updateddogData, {
      new: true,
    });
    if (!updateddog) {
      // If the dog with the given ID is not found
      return res.status(404).send("dog not found");
    }
    // Redirect to the updated dog's page or any other desired action
    const title = 'Updated dog'
    res.redirect(`/dogs/${updateddog._id}?title=${encodeURIComponent(title)}`);
  } catch (err) {
    console.error(err);
    res.render("dogs/edit", {
      errorMsg: err.message,
      dog: req.body, // Pass the original data back to the edit form
    });
  }
}

async function edit(req, res) {
  try {
    let title = "Edit";
    const dog = await Dog.findById(req.params.id);
    res.render("dogs/edit", { dog, title });
  } catch (err) {
    console.error(err);
    res.redirect("/dogs"); // Redirect to the dogs index or handle the error appropriately
  }
}
