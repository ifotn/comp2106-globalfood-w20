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

// GET /foods/add -> show blank add food form
router.get('/add', (req, res, next) => {
    // load the add view we are about to create
    res.render('foods/add')
})

// POST /foods/add -> process form submission
router.post('/add', (req, res, next) => {
    // create a new document in the foods collection using the Food model, we'll get an error or new food document back
    Food.create({
        name: req.body.name,
        country: req.body.country
    }, function(err, newFood) {
        if (err) {
            console.log(err)
            res.send(err)
        }
        else {
            // load the updated foods index
            res.redirect('/foods')
        }
    })
})

// GET /foods/delete/abc123 - :_id means this method expects a paramter called "_id"
router.get('/delete/:_id', (req, res, next) => {
    // use the mongoose Model to delete the selected document
    Food.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err)
            res.send(err)
        }
        else {
            res.redirect('/foods')
        }
    })
})

// GET /foods/edit/:_id -> display populated edit form
router.get('/edit/:_id', (req, res, next) => {
    Food.findById(req.params._id, (err, food) => {
        if (err) {
            console.log(err)
            res.send(err)
        }
        else {
            res.render('foods/edit', {
                food: food
            })
        }
    })
})

// POST /foods/edit/:_id -> updated selected food document
router.post('/edit/:_id', (req, res, next) => {
    Food.findOneAndUpdate({ _id: req.params._id },
    {
            name: req.body.name,
            country: req.body.country
    }, (err, food) => {
        if (err) {
            console.log(err)
            res.send(err)
        }
        else {
            res.redirect('/foods')
        }
    })
})

// make the controller public
module.exports = router
