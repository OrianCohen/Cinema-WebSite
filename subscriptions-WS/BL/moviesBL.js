const moviesModel = require('../model/moviesModel')
var moviesAPI = require('../DAL/moviesDAL');
const { resolve } = require('path');


//This function will pull all data from WEB SERVICE, write into DB,  and will send the results to movie router
const movieToDB = async function(){
        return new Promise((result,reject) =>{
            moviesModel.find({}, async function(err,movies){
                if(err){
                    reject(err)
                }
                else{
                    //If we dont have data in DB
                        if(movies.length == 0){
                            let moviesData = await moviesAPI.getAllMoviesAPI();                
                            moviesData.data.forEach(element => {
                                let newMovie = new moviesModel({
                                    name: element.name,
                                    genres: element.genres,
                                    image: element.image,
                                    premiered : element.premiered
                                })
                                newMovie.save(function(err){
                                    if(err){
                                        reject(err)
                                    }
                                    else{
                                        result(movies)
                                    }
                                })
                            });
                        }
                        else{
                            result(movies)
                        }

                    
                }
            })
    });
}

//Get all movies from DB
const getAllMovies = function(){
    return new Promise((result,reject)=>{
        moviesModel.find({}, function(err,data){
            if(err){
                reject(err)
            }
            else{
                result(data)
            }
        })
    })
}

const getMovieByID = function(id){
    return new Promise((result,reject)=>{
        moviesModel.findById(id, function(err,data){
            if(err){
                reject(err)
            }
            else{
                result(data)
            }
        })
    })
}


const deleteMovie = function(id){
    return new Promise((result,reject)=>{
        moviesModel.findByIdAndDelete(id, function(err){
            if(err){
                reject(err)
            }
            else{
                result('deleted!')
            }
        })
    })
}


module.exports = {movieToDB, getAllMovies, getMovieByID, deleteMovie}

