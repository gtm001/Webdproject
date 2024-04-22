// const mongoose = require('mongoose');

// const recipeSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: 'This field is required.'
//   },  
//   description: {
//     type: String,
//     required: 'This field is required.'
//   },
//     email: {
//     type: String,
//     required: 'This field is required.'
//   },
//   ingredients: {
//     type: Array,
//     required: 'This field is required.'
//   },
//   category: {
//     type: String,
//     enum:['Trave','Education','Art&Culture','Food&Cooking','SocialMedia'],
//     required: 'This field is required.'
//   },
//   image:{
//     type: String,
//     required: 'This field is required.'
//   },
 
// });

// module.exports = mongoose.model('Recipe', recipeSchema);


const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required.'
  },
  description: {
    type: String,
    required: 'Description is required.'
  },
  email: {
    type: String,
    required: 'Email is required.'
  },
  // ingredients: {
  //   type: [String], // Array of strings
  //   required: 'Ingredients are required.'
  // },
  category: {
    type: String,
    enum: ['Travel', 'Education', 'Art&Culture', 'Food&Cooking', 'SocialMedia'],
    required: 'Category is required.'
  },
  image: {
    type: String,
    required: 'Image URL is required.'
  }
});

recipeSchema.index({name:'text',description:'text'});
// recipeSchema.index({"$**":'text'});

module.exports = mongoose.model('Recipe', recipeSchema);
