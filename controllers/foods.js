// add express for url routing
var express = require('express')
var router = express.Router()

// add mongoose & Food model references for CRUD
var mongoose = require('mongoose')
var Food = require('../models/food')

// GET main food page
router.get('/', (req, res, next) => {
    // use the Food model & mongoose to select all the foods from MongoDB
    Food.find((err, foods) => {
        if (err) {
            console.log(err)
            res.send(err)
        }
        else {
            // load the main foods page
            res.render('foods/index', {
                foods: foods
            })
        }
    })
})


// make the controller public
module.exports = router
