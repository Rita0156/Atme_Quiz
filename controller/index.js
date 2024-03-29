const {CategoryModel} = require('../models/category');

const getQuizById = async(req,res) => {
  const id = req.params.id;
  try {
    const results = await CategoryModel.findById(id)
    if(results){
        res.status(200).json(results)
    }
    else{
        res.status(404).json({message : 'Quiz not found'})
    }
  }
  catch(err){
    console.error('error ---->',err)
    
  }
}

const getQuizByCategory = async(req,res) => {
      const {name} = req.params.name
      const results = await CategoryModel.find()
      if(name=='CONTEST'){
        const encounteredNames = new Set();

        // Filter the array to include only objects with unique category
        const filteredArray = results.filter(obj => {
            if (!encounteredNames.has(obj.name)) {
                encounteredNames.add(obj.name);
                return true;
            }
            return false;
        });
        
        console.log(filteredArray);
        res.status(200).json(filteredArray)
      }
      try {
        const category = await CategoryModel.find(name);
        if(category && category.name=='CONTEST'){
            
            res.status(200).json(category)
        }
        else res.status(404).json({message : "Category not found"});
      }
      catch(err){
         console.log('error ---> ',err)
      }
}

const getAllQuiz = async(req,res) => {
       try {
        const results = await CategoryModel.find();
          res.status(200).json(results)
       }
       catch(err){
         console.error('error --->  ', err)
       }
}

const addQuetions = (req,res) => {

}

const updateQuestion = (req,res) => {

}

const addCategorySet = async(req, res) => {
      const { name, category, points, entryCoins, time_for_quiz, questionSet,quizImage } = req.body;
    //   const isExist = await CategoryModel.findOne(category)
      try{

        const categoryDataCreate = new CategoryModel({
            name,
            category,
            points,
            entryCoins,
            time_for_quiz,
            questionSet,
            quizImage
        })
        if(categoryDataCreate){
           await categoryDataCreate.save();
           res.status(200).json({message : "Quiz created successfully", categoryDataCreate})
        }
        else res.json({message : 'Something went wrong'})
      }
      catch(err){
         console.log('error ------------> ',err)
      }
}




module.exports = {

    getAllQuiz,
    getQuizByCategory,
    getQuizById,
    addQuetions,
    updateQuestion,
    addCategorySet

}