// add express for url routing
var express = require('express');
var router = express.Router();

// add mongoose & Food model reference for CRUD
var mongoose = require('mongoose')
var Country = require('../models/country')

//Get main country page
router.get('/',(req,res, next)=>{
    //use the country model & mongoose to select all the countries from MongoDB
    Country.find((err, countries)=> {
        if(err){
            console.log(err)
            res.send(err)
        }else{
            // load the main countries page
            res.render('countries/index', {
                countries: countries
            })
        }
    })
})

// Get /countries/add -> show blank add country form
router.get('/add', (req,res, next) =>{
    res.render('countries/add')
})

//Post /countries/add -> process form submission
router.post('/add', (req,res, next) =>{
    // create a new document in the countries collection using the country model, we'll get an error or new country document back
    Country.create({
        name: req.body.name
    }, function (err, newCountry) {
        if (err){
            console.log(err)
            res.send(err)
        }else{
            // load the updated countries index
            res.redirect('/about');
        }
    })
})

//Get /countries/delete/abc123 - :_id means this method expects a paramter called "_id "
router.get('/delete/:_id', (req, res, next)=>{
    Country.remove({_id: req.params._id}, (err)=> {
        if (err){
            console.log(err)
            res.send(err)
        }else{
            res.redirect('/about');
        }
    })
})

//make the controller public
module.exports = router;
