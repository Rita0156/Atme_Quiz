var allData = require("../../data/main.json");
var withoutLogin = require("../../data/first2question.json");
const path = require("path");
const pathJson = path.join(process.env.FILE_PATH);
const fs = require("fs");
const { generateJSONData } = require("../../utils/autogenerateId");

const getQuizQuetionsById = (req, res) => {
  const id = req.params.id;
  var idData = null;
  allData.data.map((ele) => {
    ele.quizzes.map((quiz) => {
      if (quiz.id == id) {
        idData = quiz;
      }
    });
  });
  res.json(idData);
};

const getCategoryWiseData = (req, res) => {
  const { name } = req.params;
  var categoryData = null;
  allData.data.map((ele) => {
    if (ele.category == name) {
      categoryData = ele;
    }
  });
  res.json(categoryData);
};

const createQuiz = (req, res) => {
  const newData = req.body;
  let id = generateJSONData(10);
  const obj = {
    id: id,
    name: newData.name,
  };
  allData.data.map((ele) => {
    if (ele.category == newData.category) {
      obj.questionSet = newData.questionSet.questionSet;
      ele.quizzes.unshift(obj);
    }
  });

  fs.writeFile(pathJson, JSON.stringify(allData), (err) => {
    if (err) {
      res.json({ message: "Error while creating quiz", err });
    } else {
      res.status(200).json({ message: "Data added successfully", obj });
    }
  });
};

const updateQuizSet = (req, res) => {
  const id = req.params.id;
  var idData = req.body;
  idData.id = id;
  allData.data = allData.data.map((ele) => {
    ele.quizzes.map((quiz) => {
      if (quiz.id == id) {
        quiz = idData;
      }
    });
  });
  fs.writeFile(pathJson, JSON.stringify(allData), (err) => {
    if (err) {
      res.json({ message: "Error while updating", err });
    } else {
      res.status(200).json({ message: "Quiz updated Successfully", idData });
    }
  });
};

const deleteQuizSet = (req, res) => {
  const id = req.params.id;
  let index = null;
  let ind = null;
  for (let i = 0; i < allData.data.length; i++) {
    let category = allData.data[i];
    for (let j = 0; j < category.quizzes.length; j++) {
      if (category.quizzes[j].id == id) {
        index = j;
        ind = i;
        break;
      }
    }
  }

  allData.data[ind].quizzes.splice(index, 1);
  fs.writeFile(pathJson, JSON.stringify(allData), (err) => {
    if (err) {
      res.status(500).send("Error writing to file");
    } else {
      res.status(200).send("Data deleted successfully");
    }
  });
};

const getAllQuiz = (req, res) => {
  var allQuizContest = [];
  allData.data.map((ele) => {
    const obj = {
      category: ele.category,
      quizImage: ele.quizImage,
    };
    ele.quizzes.map((quiz) => {
      obj.name = quiz.name;
      obj.id = quiz.id;
      obj.questionSet = quiz.questionSet;
      allQuizContest.push(obj);
    });
  });
  res.json(allQuizContest);
};

const getTwoRandomQuestions = (req, res) => {
  const indexArray = [];
  for (let i = 0; i < 2; i++) {
    let random = Math.random() * 134;
    random = Math.floor(random);
    indexArray.push(withoutLogin.Question[random]);
  }
  res.status(200).json(indexArray);
};

const updateCategoryName = (req, res) => {
  const id = req.params.name;
  const { name,entryCoins, quizImage } = req.body;
 
  for(let i=0; i<allData.data.length; i++){
    const changedata =allData.data[i]
    if(changedata.category == id){
      changedata.category=name;
      changedata.entryCoins=entryCoins;
      changedata.quizImage=quizImage;
     break;
    }
  }

  console.log(allData.data,'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  fs.writeFile(pathJson, JSON.stringify(allData), (err) => {
    if (err) {
      res.status(404).json({ message: "Error at update category", err });
    } else {
      res
        .status(200)
        .json({ message: "Category updated successfully", data: req.body });
    }
  });
};

const createNewCategory = (req, res) => {
  const newCategory = req.body;
  newCategory.quizzes = [];
  allData.data.unshift(newCategory);
  fs.writeFile(pathJson, JSON.stringify(allData), (err) => {
    if (err) {
      res.json({ message: "Error at creating category", err });
    } else {
      res
        .status(200)
        .json({ message: "Category created successfully", newCategory });
    }
  });
};

const getAllCategoryName = (req, res) => {
  res.send(allData.data);
};

module.exports = {
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
};
