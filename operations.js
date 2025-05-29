require("dotenv").config();
const connectDB = require("./config/connectDB");
const Person = require("./models/Person");

// 1 - Create and Save a Record
const createAndSavePerson = async () => {
  try {
    const person = new Person({
      name: "John Doe",
      age: 30,
      favoriteFoods: ["Pizza", "Tacos"],
    });
    const data = await person.save();
    console.log(" Person saved:", data);
  } catch (err) {
    console.error(" Save failed:", err);
  }
};

// 2 - Create Many People
const createManyPeople = async (arrayOfPeople) => {
  try {
    const data = await Person.create(arrayOfPeople);
    console.log(" People created:", data);
  } catch (err) {
    console.error(" Error creating people:", err);
  }
};

// 3 - Find People by Name
const findPeopleByName = async (personName) => {
  try {
    const data = await Person.find({ name: personName });
    console.log("Found people:", data);
  } catch (err) {
    console.error("Error finding people:", err);
  }
};

// 4 - Find One by Favorite Food
const findOneByFood = async (food) => {
  try {
    const data = await Person.findOne({ favoriteFoods: food });
    console.log("Found one by food:", data);
  } catch (err) {
    console.error("Error finding one by food:", err);
  }
};

// 5 - Find Person by ID
const findPersonById = async (personId) => {
  try {
    const data = await Person.findById(personId);
    console.log("Found by ID:", data);
  } catch (err) {
    console.error("Error finding by ID:", err);
  }
};

// 6 - Find, Edit, then Save
const findEditThenSave = async (personId) => {
  try {
    const person = await Person.findById(personId);
    person.favoriteFoods.push("hamburger");
    const updatedPerson = await person.save();
    console.log("Updated with hamburger:", updatedPerson);
  } catch (err) {
    console.error("Error updating person:", err);
  }
};

// 7 - Find and Update
const findAndUpdate = async (personName) => {
  try {
    const updated = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true }
    );
    console.log("Updated person:", updated);
  } catch (err) {
    console.error("Error updating:", err);
  }
};

// 8 - Remove by ID
const removeById = async (personId) => {
  try {
    const deleted = await Person.findByIdAndRemove(personId);
    console.log("Person removed:", deleted);
  } catch (err) {
    console.error("Error removing:", err);
  }
};

// 9 - Remove Many People named "Mary"
const removeManyPeople = async () => {
  try {
    const result = await Person.deleteMany({ name: "Mary" });
    console.log("Marys removed:", result);
  } catch (err) {
    console.error("Error removing Marys:", err);
  }
};

// 10 - Query Chain
const queryChain = async () => {
  try {
    const data = await Person.find({ favoriteFoods: "burritos" })
      .sort("name")
      .limit(2)
      .select("-age"); 
    console.log("Chained result:", data);
  } catch (err) {
    console.error("Error chaining query:", err);
  }
};

// EXECUTION FLOW 

const run = async () => {
  await connectDB();

  // await createAndSavePerson();

  // await createManyPeople([
  //   { name: "Alice", age: 25, favoriteFoods: ["Salad", "Burger"] },
  //   { name: "Bob", age: 40, favoriteFoods: ["Pasta"] },
  //   { name: "Mary", age: 22, favoriteFoods: ["Burritos"] },
  // ]);

  // await findPeopleByName("Alice");
  // await findOneByFood("Burritos");
  // await findPersonById("68379bd3ed51d16b5cedef6e");
  // await findEditThenSave("68379bd3ed51d16b5cedef6e");
  // await findAndUpdate("Bob");
  // await removeById("68379bd3ed51d16b5cedef6e");
  // await removeManyPeople();
  await queryChain();
};

run();
