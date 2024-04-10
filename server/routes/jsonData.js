const {
  deleteQuizSet,
  updateQuizSet,
  createQuiz,
  getCategoryWiseData,
  getQuizQuetionsById,
  getAllQuiz,
  getTwoRandomQuestions,
  updateCategoryName,
  createNewCategory,
  getAllCategoryName,
  deleteCategory
} = require("../controller/jsondata/index");

const Router = require("express");

const jsonDataRouter = Router();
jsonDataRouter.put("/:id", updateQuizSet);
jsonDataRouter.post("/", createQuiz);
jsonDataRouter.get("/category/:name", getCategoryWiseData);
jsonDataRouter.delete("/:id", deleteQuizSet);
jsonDataRouter.get("/:id", getQuizQuetionsById);
jsonDataRouter.get("/", getAllQuiz);
jsonDataRouter.get("/questions/quiz", getTwoRandomQuestions);
jsonDataRouter.post("/add/category", createNewCategory);
jsonDataRouter.patch("/:name", updateCategoryName);
jsonDataRouter.get("/all/category", getAllCategoryName);
jsonDataRouter.delete('/category/:name',deleteCategory)
module.exports = {
  jsonDataRouter,
};
