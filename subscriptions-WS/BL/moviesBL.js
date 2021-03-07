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
                                    id: element.id,
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



module.exports = {movieToDB}

