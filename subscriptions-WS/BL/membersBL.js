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
                            id: element.id,
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

module.exports = {membersToDB}