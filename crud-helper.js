
require('dotenv').config();

require('./config/database');


const Dog = require('./models/dog');
const location = require('./models/location');


let dogs = await Dog.find({});
console.log(dogs);
