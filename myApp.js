require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!")
});

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: {type: [String], unique: true}
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const andrew = new Person ({
    name: "Andrew",
    age: 26,
    favoriteFoods: ["Blood", "Steak", "More Blood"]
  })
  
  andrew.save((err, data) => err ? done(err) : done(null,data));
};


let arrayOfPeople = [
  {
    name: "Andrew",
    age: 26,
    favoriteFoods: ["Blood", "Steak", "More Blood"]
  },
  {
    name: "George",
    age: 21,
    favoriteFoods: ["Watermelon", "Mango", "Apple"]
  },
  {
    name: "Hannah",
    age: 23,
    favoriteFoods: ["Peep", "Cuok", "Pas"]
  }
  
]


const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, createdPeople) => err ? done(err) : done(null,createdPeople));
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, foundPeople) => err ? done(err) : done(null,foundPeople));
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, foundFood) => err ? done(err) : done(null,foundFood));
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, foundId) => err ? done(err) : done(null,foundId));
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, foundPerson) => {
    if(err) {
      console.log(error)
    } else {
      foundPerson.favoriteFoods.push(foodToAdd);
      foundPerson.save((err, updatedRecord) => {
        if (err){
          console.log(err)
        } else {
          done(null, updatedRecord);
        }
      })
    }
  }
  )};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedRecord) => err ? done(err) : done(null,updatedRecord));
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedRecord) => err ? done(err) : done(null,removedRecord))
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, outcome) => err ? done(err) : done(null,outcome))
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort("name").limit(2).select("-age").exec((err, updatedRecord) => err ? done(err) : done(null,updatedRecord))
  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
