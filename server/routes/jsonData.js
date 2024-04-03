

const {
    deleteQuizSet,
    updateQuizSet,
    createQuiz,
    getCategoryWiseData,
    getQuizQuetionsById,
    getAllQuiz
} = require('../controller/jsondata/index');

const Router = require('express');

const jsonDataRouter = Router();
jsonDataRouter.put('/:id',updateQuizSet)
jsonDataRouter.post('/',createQuiz)
jsonDataRouter.get('/category/:name',getCategoryWiseData)
jsonDataRouter.delete('/:id', deleteQuizSet)
jsonDataRouter.get('/:id',getQuizQuetionsById);
jsonDataRouter.get('/',getAllQuiz)
module.exports = {
    jsonDataRouter
}