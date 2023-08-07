const router = require('express').Router()

// GET /
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' })
})

module.exports = router
