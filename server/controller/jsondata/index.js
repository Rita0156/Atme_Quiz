var allData = require("../../data/data.json");
var withoutLogin = require("../../data/first2question.json");
const path = require('path')
// const cricket = require('../../images/cricket.webp');
// console.log(cricket,'image url')
const pathJson = process.env.FILE_PATH
// const filePath = path.join(__dirname, 'data', 'data.json');
// console.log(pathJson,'file namr form json')
const fs = require("fs");
const { generateJSONData } = require("../../utils/autogenerateId");

const getQuizQuetionsById = (req, res) => {
  const id = req.params;
  var cricketData = allData.data.contest.find((ele) => ele.id == id.id);
  res.json(cricketData);
};

const getCategoryWiseData = (req, res) => {
  const { name } = req.params;

  if (name == "CONTEST") {
    const encounteredNames = new Set();

    const filteredArray = allData.data.contest.filter((obj) => {
      if (!encounteredNames.has(obj.name)) {
        encounteredNames.add(obj.name);
        return true;
      }
      return false;
    });
    res.setHeader("X-Total-Count", filteredArray.length);
    res.status(200).json(filteredArray);
  } else {
    var cricketData = allData.data.contest.filter((ele) => {
      if (ele.name == name) {
        return true;
      } else return false;
    });
    res.setHeader("X-Total-Count", cricketData.length);
    res.json(cricketData);
  }
};

const createQuiz = (req, res) => {
  const newData = req.body;
  newData.id = generateJSONData(10);
  var image = "";
  var url = ''
  for (let i = 0; i < allData.data.contest.length; i++) {
    if (newData.name == allData.data.contest[i].name) {
      image = allData.data.contest[i].quizId;
      url = allData.data.contest[i].quizImage
      break;
    }
  }
  if (image != "") {
    newData.quizId = image;
    newData.quizImage = url
  } else {
    newData.quizId = generateJSONData(10);
  }
  allData.data.contest.push(newData);
  fs.writeFile(
    pathJson,
    JSON.stringify(allData),
    (err) => {
      if (err) {
        res.status(500).send("Error writing to file");
      } else {
        res.status(201).send("Data added successfully");
      }
    }
  );
};

const updateQuizSet = (req, res) => {
  const id = req.params.id;

  const newData = req.body;
  console.log(
    newData,
    "newdata&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"
  );
  allData.data.contest = allData.data.contest.map((ele) => {
    return ele.id == id ? (ele = newData) : ele;
  });

  fs.writeFile(
    pathJson,
    JSON.stringify(allData),
    (err) => {
      if (err) {
        
        res.status(500).json({ message: "Error writing to file", err });
      } else {
        res.status(200).json({ message: "Data updated successfully", newData });
      }
    }
  );
};

const deleteQuizSet = (req, res) => {
  const id = req.params.id;

  allData.data.contest.splice(id, 1);

  fs.writeFile(
    pathJson,
    JSON.stringify(allData),
    (err) => {
      if (err) {
        res.status(500).send("Error writing to file");
      } else {
        res.status(200).send("Data deleted successfully");
      }
    }
  );
};

const getAllQuiz = (req, res) => {
  res.setHeader("X-Total-Count", allData.data.contest.length);
  res.status(200).json(allData.data.contest);
};

// without login random two quetions

const getTwoRandomQuestions = (req, res) => {
  const indexArray = [];

  for (let i = 0; i < 2; i++) {
    let random = Math.random() * 134;
    random = Math.floor(random);

    indexArray.push(withoutLogin.Question[random]);
  }

  res.status(200).json(indexArray);
};

module.exports = {
  deleteQuizSet,
  updateQuizSet,
  createQuiz,
  getCategoryWiseData,
  getQuizQuetionsById,
  getAllQuiz,
  getTwoRandomQuestions,
};
