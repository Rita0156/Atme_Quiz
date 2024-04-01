var allData = require("../../data/data.json");
var withoutLogin = require("../../data/first2question.json");
const { CategoryModel } = require("../../models/category");
const fs = require("fs");

const getQuizQuetionsById = (req, res) => {
  const id = req.params;
  var cricketData = allData.data.contest.find((ele) => ele._id == id.id);
  res.json(cricketData);
};

const getCategoryWiseData = (req, res) => {
  const { name } = req.params;
  
  if (name == "CONTEST") {
    const encounteredNames = new Set();

    const filteredArray = results.filter((obj) => {
      if (!encounteredNames.has(obj.name)) {
        encounteredNames.add(obj.name);
        return true;
      }
      return false;
    });

    console.log(filteredArray);
    res.status(200).json(filteredArray);
  } else {
    var cricketData = allData.data.contest.filter((ele) => {
      if (ele.name == name) {
        return true;
      } else return false;
    });

    res.json(cricketData);
  }
};

const createQuiz = (req, res) => {
  const newData = req.body;
  allData.data.contest.push(newData);
  fs.writeFile("../../data/data.json", JSON.stringify(allData), (err) => {
    if (err) {
      res.status(500).send("Error writing to file");
    } else {
      res.status(201).send("Data added successfully");
    }
  });
};

const updateQuizSet = (req, res) => {
  const id = req.params.id;

  const newData = req.body;
  allData = allData.data.contest.map((ele) => {
    if (ele._id == id) {
      ele = newData;
    }
  });
  fs.writeFile("./data.json", JSON.stringify(jsonData), (err) => {
    if (err) {
      res.status(500).send("Error writing to file");
    } else {
      res.status(200).send("Data updated successfully");
    }
  });
};

const deleteQuizSet = (req, res) => {
  const id = req.params.id;
  allData.data.contest.splice(id, 1);
  fs.writeFile("./data.json", JSON.stringify(allData), (err) => {
    if (err) {
      res.status(500).send("Error writing to file");
    } else {
      res.status(200).send("Data deleted successfully");
    }
  });
};

const getAllQuiz = (req,res) => {
    res.status(200).json(allData.data.contest)
}

module.exports = {
    deleteQuizSet,
    updateQuizSet,
    createQuiz,
    getCategoryWiseData,
    getQuizQuetionsById,
    getAllQuiz
};
