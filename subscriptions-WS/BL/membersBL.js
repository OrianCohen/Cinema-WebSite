const membersModel = require('../model/membersModel')
var membersAPI = require('../DAL/membersDAL');
const { resolve } = require('path');


//This function will pull all data from WEB SERVICE, write into DB,  and will send the results to members router
const membersToDB = function(){
    return new Promise((result,reject)=>{
        membersModel.find({}, async function(err, members){
            if(err){
                reject(err)
            }
            else {
                if(members.length == 0){
                    let membersData = await membersAPI.getAllMembersAPI()
                    membersData.data.forEach(element => {
                        let data = new membersModel({
                            name: element.name,
                            email: element.email,
                            city: element.city
                        })
                        data.save(function(err){
                            if(err){
                                reject(err)
                            }
                            else{
                                result(members)
                            }
                        })
                    });
                }
                else{
                    result(members)
                }
            }
        })
    })
}

const getAllMembers = function(){
    return new Promise((result,reject)=>{
        membersModel.find({}, function(err,data){
            if(err){
                reject(err)
            }
            else{
                result(data)
            }
        })
    })
}

const getMemberByID = function(id){
    return new Promise((result,reject)=>{
        membersModel.findById(id, function(err,data){
            if(err){
                reject(err)
            }
            else{
                result(data)
            }
        })
    })
}

const deleteMember = function(id){
    return new Promise((result,reject)=>{
        membersModel.findByIdAndDelete(id, function(err){
            if(err){
                reject(err)
            }
            else{
                result('deleted!')
            }
        })
    })
}

module.exports = {membersToDB, getAllMembers, getMemberByID, deleteMember}