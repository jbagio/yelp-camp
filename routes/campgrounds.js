const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const middleware = require('../middleware');

const escapeRegex = text => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

// Index
router.get('/', (req, res) => {
  // search was used
  if (req.query.search) {
    let regex = new RegExp(escapeRegex(req.query.search), 'gi');
    Campground.find({name: regex}, (err, campgrounds) => {
      if (err || !campgrounds) {
        req.flash('error', 'There was a problem with the search.');
      }
      // if no results found, send a message to display in the view
      let message = 'Couldn\'t find any campground name matching that query.';
      campgrounds.length === 0
        ? res.render('campgrounds/index', {campgrounds: campgrounds, currentPage: 'campgrounds', searchMessage: message})
        : res.render('campgrounds/index', {campgrounds: campgrounds, currentPage: 'campgrounds'});
    });
  } else {
  // get all campgrounds from DB
    Campground.find({}, (err, campgrounds) => {
      if (err) {
        console.log(err); // TODO: refactor error
      } else {
        res.render('campgrounds/index', {campgrounds: campgrounds, currentPage: 'campgrounds'});
      }
    });
  }
});

// New
router.get('/new', middleware.ensureAuthenticated, (req, res) => res.render('campgrounds/new'));

// Create
router.post('/', middleware.ensureAuthenticated, (req, res) => {
  if (!req.body) {
    return res.sendStatus('400');
  }
  let name = req.body.name;
  let cost = req.body.cost;
  let image = req.body.image;
  let description = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username
  };
  // add new campground to the DB
  Campground.create({name, cost, image, description, author}, (err, campground) => {
    if (err) {
      req.flash('error', 'Couldn\'t add campground.');
    } else {
      req.flash('success', 'Campground added successfully.');
    }
    res.redirect('/campgrounds');
  });
});

// Show
router.get('/:id', (req, res) => {
  // get campground from db
  Campground.findById(req.params.id).populate('comments').exec((err, campground) => {
    if (err || !campground) {
      req.flash('error', 'Couldn\'t retrieve campground.');
      return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', {campground: campground});
  });
});

// Edit
router.get('/:id/edit', middleware.ensureAuthenticated, middleware.ensureCampgroundAuthor, (req, res) => {
  // ensureCampgroundAuthor places retrieved campground in req.campground so no need for 2nd db roundtrip
  res.render('campgrounds/edit', {campground: req.campground});
});

// Update
router.put('/:id', middleware.ensureAuthenticated, middleware.ensureCampgroundAuthor, (req, res) => {
  // TODO: sanitize possible html input?
  // req.body.campground.description = req.sanitize(req.body.campground.description);
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground) => {
    if (err) {
      req.flash('error', 'Couldn\'t update campground.');
    } else {
      req.flash('success', 'Campground updated successfully.');
    }
    res.redirect(`/campgrounds/${campground._id}`); // or req.params.id
  });
});

// Destroy
router.delete('/:id', middleware.ensureAuthenticated, middleware.ensureCampgroundAuthor, (req, res) => {
  // TODO: delete comments
  Campground.findByIdAndRemove(req.params.id, err => {
    if (err) {
      req.flash('error', 'Couldn\'t delete campground.');
    } else {
      req.flash('success', 'Campground deleted successfully.');
    }
    res.redirect('/campgrounds');
  });
});

module.exports = router;
