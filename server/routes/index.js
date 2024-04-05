
const Router = require('express')
const { getAllQuiz,
    getQuizByCategory,
    getQuizById,
    addQuetions,
    updateQuestion,
    addCategorySet, } = require('../controller/index.js')

const categoryRouter = Router();

categoryRouter.get('/',getAllQuiz);
categoryRouter.get('/:name',getQuizByCategory);
categoryRouter.get('/category/:id',getQuizById);
categoryRouter.put('/:id',addQuetions);
categoryRouter.post('/', addCategorySet);
categoryRouter.patch('/category/:id',updateQuestion);

module.exports = {categoryRouter}
