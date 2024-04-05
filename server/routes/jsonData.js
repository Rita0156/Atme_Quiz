const {
    deleteQuizSet,
    updateQuizSet,
    createQuiz,
    getCategoryWiseData,
    getQuizQuetionsById,
    getAllQuiz,
    getTwoRandomQuestions,
    readDtaJsonFile
} = require('../controller/jsondata/index');

const Router = require('express');

const jsonDataRouter = Router();
jsonDataRouter.put('/:id',updateQuizSet)
jsonDataRouter.post('/',createQuiz)
jsonDataRouter.get('/category/:name',getCategoryWiseData)
jsonDataRouter.delete('delete/:id', deleteQuizSet)
jsonDataRouter.get('/:id',getQuizQuetionsById);
jsonDataRouter.get('/',getAllQuiz)
jsonDataRouter.get('/questions/quiz',getTwoRandomQuestions)
jsonDataRouter.get('/data',readDtaJsonFile)
module.exports = {
    jsonDataRouter
}