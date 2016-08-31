var express = require('express');
var router = express.Router();
var CourseController = require('../controllers/CourseController.js');
var middleware = require('./middleware');

/*
* GET
*/
router.get('/', middleware.instructor, function(req, res) {
  CourseController.list(req, res);
});

/*
* GET
*/
router.get('/:id', middleware.instructor, function(req, res) {
  CourseController.show(req, res);
});

/*
* POST
*/
router.post('/', middleware.admin, function(req, res) {
  CourseController.create(req, res);
});

/*
* PUT
*/
router.put('/:id', middleware.instructor, function(req, res) {
  CourseController.update(req, res);
});

/*
* DELETE
*/
router.delete('/:id', middleware.admin, function(req, res) {
  CourseController.remove(req, res);
});

/*
* POST
*/
router.post('/screencasts', middleware.admin, function(req, res) {
  CourseController.screencasts(req, res);
});

/*
* PUT
*/
router.put('/register/:id', middleware.auth, function(req, res) {
  CourseController.register(req, res);
});


module.exports = router;
