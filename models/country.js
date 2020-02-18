// include mongoose
var mongoose = require('mongoose')

//create a schema for country
var countrySchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'Name is required'
    }
})

// make this model public with the name "country"
module.exports = mongoose.model('Country', countrySchema)
