const passport = require('passport');
const fetchAPI = require('../api/axios.js')


exports.sendData = async function (req, res, next) {

    const getMovieData = await fetchAPI.callAPI;

    if(req.user) {
        console.log("USER IS LOGGED IN")
        getMovieData(req,res,next);
        
    } else {
        console.log("USER IS NOT AUTHORIZED ACCESS");
        res.json({ redirectURL: "/login"})
    }
}

exports.getSpecificMovie = async function (req, res, next) {
    const getMovieData = await fetchAPI.getSpecificMovie;
    getMovieData(req,res,next);
}