const users = require('../models/usersModel')
const userDAL = require('../DAL/usersDAL')
var dateFormat = require('dateformat');

//Get all user data from usersDB
const validUser = function(user,pass){
    return new Promise ((result,reject)=>{
        users.find({}, function(err,allUsers){
            if(err){
                reject(err)
            }
            else{
                let valid = allUsers.filter(x=> x.userName == user && x.password == pass)
                result(valid)
            }
        })
    })
}

//Check if there is username exist in our userDB
const validByUserName = function(user){
    return new Promise ((result,reject)=>{
        users.find({}, function(err,allUsers){
            if(err){
                reject(err)
            }
            else{
                let valid = allUsers.filter(x=> x.userName == user)
                result(valid)
            }
        })
    })
}


//Find user by id from usersDB
const userById = function(id){
    return new Promise ((result,reject)=>{
        users.findById(id, function(err,allUsers){
            if(err){
                reject(err)
            }
            else{
                result(valid)
            }
        })
    })
}

//Add new user to usersDB
const createUserToDB = function(obj){
    return new Promise ((result,reject)=>{
        const newUser = new users({
            userName: obj.username,
            password: obj.pwd
        })
        newUser.save(function(err){
            if(err){
                reject(err)
            }
            else{
                result('created!')
            }
        })
    })
}


//Edit existing usr to users.json
//The main idea of this function, is to get all users from our data, take out the one we need to update,
const editUserJSON = async function(obj, id){
        
    let allUsersData = await userDAL.getAllUsers();
    let userBeforeChange = await allUsersData.filter(x=>x.id == id)
    console.log('user before' + userBeforeChange[0].creatdData)
    let allExceptOne = await allUsersData.filter(x=>x.id != id)
    let currentDate = dateFormat(new Date(), "yyy-mm-dd h:MM:ss");
    console.log('all users expt one inside user bl ' + allExceptOne)
    let userData = {
        id: id,
        firstname: obj.fname,
        lastname: obj.lname,
        creatdDate: currentDate,
        isAdmin: userBeforeChange[0].isAdmin,
        sessiontimeout: obj.sesstime
    }
    let newJsonData = {users: allExceptOne}
    //We will send the new obj and our new json file to 'updateUserJSON' function
    let results = await userDAL.updateUserJSON(userData, newJsonData)
    return results
}

// Get a list of all user data from users.json
const getAllUsersDataJSON = async function(){
    let usersData = await userDAL.getAllUsers();
    return(usersData)
}

//Find user by ID from users.json
const getUserById = async function(id){
    let allUsers = await userDAL.getAllUsers()
    let userExist = await allUsers.filter(x=> x.id == id)
    return userExist
}

const AddNewUser = async function(obj,id){
    let currentDate = dateFormat(new Date(), "yyy-mm-dd h:MM:ss");
    let newUser = {
        id: id,
        firstname: obj.fname,
        lastname: obj.lname,
        creatdDate: currentDate,
        isAdmin: false,
        sessiontimeout: obj.sesstime
    }
    let allUsers = await userDAL.createNewUser(newUser)
    return allUsers
}


module.exports = {validUser, createUserToDB, userById,getUserById ,getAllUsersDataJSON, editUserJSON, AddNewUser, validByUserName}