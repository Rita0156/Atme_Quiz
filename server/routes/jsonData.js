const {
    deleteQuizSet,
    updateQuizSet,
    createQuiz,
    getCategoryWiseData,
    getQuizQuetionsById,
    getAllQuiz,
    getTwoRandomQuestions,
    readDtaJsonFile,
    updateCategoryName
} = require('../controller/jsondata/index');

const Router = require('express');

const jsonDataRouter = Router();
jsonDataRouter.put('/:id',updateQuizSet)
jsonDataRouter.post('/',createQuiz)
jsonDataRouter.get('/category/:name',getCategoryWiseData)
jsonDataRouter.delete('/:id', deleteQuizSet)
jsonDataRouter.get('/:id',getQuizQuetionsById);
jsonDataRouter.get('/',getAllQuiz)
jsonDataRouter.get('/questions/quiz',getTwoRandomQuestions)
jsonDataRouter.get('/data',readDtaJsonFile)
jsonDataRouter.patch('/:name',updateCategoryName)
module.exports = {
    jsonDataRouter
}