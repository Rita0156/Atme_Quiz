

const {
    getCategoryData,
    getQuizQuetionsById,
    getAllQuiz
} = require('../controller/cricket/index');

const Router = require('express');

const jsonDataRouter = Router();

jsonDataRouter.get('/:name',getCategoryData);
jsonDataRouter.get('/data/:id',getQuizQuetionsById);
jsonDataRouter.get('/',getAllQuiz)
module.exports = {
    jsonDataRouter
}