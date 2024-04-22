require("../models/database");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");



exports.homepage = async(req, res) => {
    try {
      const limitNumber = 5;
      const categories = await Category.find({}).limit(limitNumber);
      const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
      const travel = await Recipe.find({'category':'Travel'}).limit(limitNumber); 
      const education = await Recipe.find({'category':'Education'}).limit(limitNumber); 
      const socialmedia = await Recipe.find({'category':'SocialMedia'}).limit(limitNumber); 

      const blog = {latest,travel,education,socialmedia};





      res.render('index', { title: 'Article Blog - Home', categories,blog} );
    } catch (error) {
      res.status(500).send({message: error.message || "Error Occured" });
    }
  }
// ---



  exports.exploreCategories = async(req, res) => {
    try {
      const limitNumber = 20;
      const categories = await Category.find({}).limit(limitNumber);
       
      res.render('categories', { title: 'Article Blog - Categories', categories} );
    } catch (error) {
      res.status(500).send({message: error.message || "Error Occured" });
    }
  }

  // ------category id---------

  exports.exploreCategoriesById = async(req, res) => {
    try {

      let categoryId = req.params.id;
      const limitNumber = 20;
      const categoryById = await Recipe.find({'category':categoryId}).limit(limitNumber);
       
      res.render('categories', { title: 'Article Blog - Categories', categoryById} );
    } catch (error) {
      res.status(500).send({message: error.message || "Error Occured" });
    }
  }
  // -----/search---
  exports.searchRecipe = async(req, res) => {
    try {
      let searchTerm = req.body.searchTerm;
      let recipe = await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
      res.render('search', { title: 'Cooking Blog - Search', recipe } );
    } catch (error) {
      res.status(500).send({message: error.message || "Error Occured" });
    }
    
  }

// -------------
exports.exploreLatest = async(req, res) => {
  try {
    const limitNumber=20;
    const recipe = await Recipe.find({}).sort({_id:-1}).limit(limitNumber);
    
    res.render('explore-latest', { title: 'Article Blog - Categories', recipe} );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
}
// ----------

exports.exploreRandom = async(req, res) => {
  try {
    
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();
    res.render('explore-random', { title: 'Article Blog - Categories', recipe} );
  
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
}


  // ---------------------

  exports.exploreRecipe = async(req, res) => {
    try {
      let recipeId = req.params.id;
      
      const recipe = await Recipe.findById(recipeId);
       
      res.render('recipe', { title: 'Article Blog - Categories',recipe} );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  }

  /**
 * GET /submit-recipe
 * Submit Recipe
*/
exports.submitRecipe = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe', infoErrorsObj, infoSubmitObj  } );
}

/**
 * POST /submit-recipe
 * Submit Recipe
*/
exports.submitRecipeOnPost = async(req, res) => {
  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.satus(500).send(err);
      })

    }

    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName
    });
    
    await newRecipe.save();

    req.flash('infoSubmit', 'Recipe has been added.')
    res.redirect('/submit-recipe');
  } catch (error) {
    // res.json(error);
    req.flash('infoErrors', error);
    res.redirect('/submit-recipe');
  }
}


















 