var allData = require('../../data/try.json');
var withoutLogin = require('../../data/first2question.json')

// console.log(allData.data,'*********************************')

/////////////////////////////////////////////////////////////////////////

// var cricketData = allData.data.contest.filter((ele)=>{
//     return ele.name=="CRICKET"
// }) 
// console.log(cricketData,'##########################################')

/////////////////////////////////////////////////////////////////////////
const id = '6604b30057da7d5aabd8b9bf';
var cricketData = allData.data.contest.find(ele => ele._id==id)
// var options = cricketData.questionSet.questionSet.find(ele => ele._question == "Which cricket batsman recently overtaken Virat Kohli No.1 Test ranking?")
    console.log(cricketData
        ,'&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')

//////////////////////////////////////////////////////////////////////////////////

const getCategoryData = (req,res) => {
    const category = req.params.category;
    var cricketData = allData.data.contest.filter((ele)=>{
    return ele.name==category
    //"CRICKET";
}) 

res.json(cricketData);
}

const getQuizQuetionsById = (req,res) => {
   const id = req.params.id;
// const id = '6604b30057da7d5aabd8b9bf';
var cricketData = allData.data.contest.find(ele => ele._id==id)
res.json(cricketData)
    
}

module.exports ={
    getCategoryData,
    getQuizQuetionsById
}