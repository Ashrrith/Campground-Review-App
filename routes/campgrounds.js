const express = require("express");
const router = express.Router({mergeParams: true});
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const Campground = require("../models/campground");
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});

router.route('/')
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createNewCampground))

router.get("/new", isLoggedIn, campgrounds.newCampgroundForm);

router.route('/:id')
  .get(isLoggedIn, catchAsync(campgrounds.displayCampground))
  .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.editCampground));


module.exports = router;
