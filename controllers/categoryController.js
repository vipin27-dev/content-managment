const Category = require("../models/category");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find(); 
    res.status(200).json(categories); 
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(400).json({ error: "Error fetching categories" }); 
  }
};

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = new Category({ name });
    await category.save();
    res.redirect("/categories");
  } catch (error) {
    res.status(400).send("Error creating category");
  }
};
