var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'COMP2106 Global Food Market' });
});

/* GET about page */
router.get('/about', (req, res, next) => {
  res.render('about', {
    title: 'About Us',
    countries: [{
      name: 'Canada'
    }, {
      name: 'India'
    }, {
      name: 'Italy'
    }, {
      name: 'Barbados'
    }, {
      name: 'Iran'
    }, {
      name: 'Taiwan'
    }, {
      name: 'Korea'
    }, {
      name: 'Viet Nam'
    }]
  })
})

module.exports = router;
