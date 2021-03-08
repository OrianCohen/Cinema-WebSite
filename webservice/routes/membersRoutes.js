var express = require('express');
var router = express.Router();
var memberBL = require ('../BL/membersBL')

/* GET all members from web serivce "subscriptions-WS". */
router.route('/').get(async function (req,res){
  //if data not exist we will add to subscriptionsDB into table MEMBERS
  let members = await memberBL.membersToDB()
  let result = await memberBL.getAllMembers()
  return res.json(result)
});

//GET member by id from DB
router.route('/:id').get(async function (req,res){
  let member = await memberBL.getMemberByID(req.params.id)
  return res.json(member)
 
})

// //Add member to DB
// router.route('/').post(async function (req,res){
//   let obj = req.body
//   let status = await memberBL.addMember(obj)
//   return res.json(status)
 
// })

// //Update existing member
// router.route('/:id').put(async function (req,res){
//   let id = req.params.id
//   let obj = req.body
//   let status = await memberBL.updateMember(id, obj)
//   return res.json(status)
 
// })

//Delete member from db
router.route('/:id').delete(async function (req,res){
  let id = req.params.id
  let status = await memberBL.deleteMember(id)
  return res.json(status)
 
})

module.exports = router;

