// 1 - require mongoose
const mongoose = require("mongoose");

// 2 - create schema
const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: Number,
    favoriteFoods: [String],
});

module.exports = mongoose.model("Person", PersonSchema);
