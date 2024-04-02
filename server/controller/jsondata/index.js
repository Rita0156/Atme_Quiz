var allData = require("../../data/data.json");
var withoutLogin = require("../../data/first2question.json");
// const cricket = require('../../images/cricket.webp');
// console.log(cricket,'image url')
const fs = require("fs");
const { generateJSONData } = require("../../utils/autogenerateId");

const getQuizQuetionsById = (req, res) => {
  const id = req.params;
  var cricketData = allData.data.contest.find((ele) => ele._id == id.id);
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
  newData._id = generateJSONData(10)
  allData.data.contest.push(newData);
  fs.writeFile("D:/Rita/Atme_Quiz/server/data/data.json", JSON.stringify(allData), (err) => {
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
 
  allData.data.contest = allData.data.contest.map((ele) => {
   return ele._id == id ? ele = newData:ele
    
  });
  
  fs.writeFile("D:/Rita/Atme_Quiz/server/data/data.json", JSON.stringify(allData), (err) => {
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
  fs.writeFile("D:/Rita/Atme_Quiz/server/data/data.json", JSON.stringify(allData), (err) => {
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

// without login random two quetions 

const getTwoRandomQuestions = (req,res) => {

  const indexArray = []

  for(let i=0; i<2; i++){
    let random = Math.random() * 134;
    random = Math.floor(random)
 
  indexArray.push(withoutLogin.Question[random])
  }

  res.status(200).json(indexArray)

}

function updateImageUrl(){
    allData.data.contest = allData.data.contest.map((ele)=>{
      if(ele.name == 'BANK PO EXAM'){
        ele.quizImage = 'https://play309.atmequiz.com/_next/image?url=https%3A%2F%2Fstatic.atmequiz.com%2Fthumbs%2Fbank-po-exams.png&w=48&q=75'
        return ele
      }
       return ele
    })

    fs.writeFile("D:/Rita/Atme_Quiz/server/data/data.json", JSON.stringify(allData), (err) => {
      if (err) {
       console.log(err,'update error image url')
      } else {
       console.log(allData.data.contest,'>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
      }
    });

}


const updateImageurlByCategory = (req,res) => {
     const name = req.params.name
     
}



module.exports = {
    deleteQuizSet,
    updateQuizSet,
    createQuiz,
    getCategoryWiseData,
    getQuizQuetionsById,
    getAllQuiz,
    getTwoRandomQuestions
};
