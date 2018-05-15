var express = require('express');
var router = express.Router();
var Laptop = require('../models/laptops');
var Pc = require('../models/pcs');
var Monitor = require('../models/monitors');
/* GET home page. */
router.get('/', function(req, res, next) {
  Laptop.find().exec(function(err, laptops) {
    Pc.find().exec(function(err, pcs) {
      Monitor.find().exec(function(err, monitors) {
      var laptopChunks = [];
      var pcChunks = [];
      var monitorChunks = [];
      var chunkSize = 3;
      for (var i = 0; i < laptops.length; i += chunkSize) {
        laptopChunks.push(laptops.slice(i, i + chunkSize));
      }
      for (var i = 0; i < pcs.length; i += chunkSize) {
        pcChunks.push(pcs.slice(i, i + chunkSize));
      }
      for (var i = 0; i < monitors.length; i += chunkSize) {
        monitorChunks.push(monitors.slice(i, i + chunkSize));
      }
        res.render('shop/index', {
          title: 'Treek',
          laptops: laptopChunks,
          pcs: pcChunks,
          monitors: monitorChunks,
        });
      });
    });
  });
});

router.get('/laptops/:model', function(req, res) {
  Laptop.findOne({'model': req.params.model}, function(err, lap) {
    if (err) return;
    res.render('shop/lap', {title: req.params.model, lap: lap});
  });
});
router.get('/pcs/:model', function(req, res) {
  Pc.findOne({'model': req.params.model}, function(err, pc) {
    if (err) return;
    res.render('shop/pcs', {title: req.params.model, pc: pc});
  });
});
router.get('/monitors/:model', function(req, res) {
  Monitor.findOne({'model': req.params.model}, function(err, monitor) {
    if (err) return;
    res.render('shop/monitor', {title: req.params.model, monitor: monitor});
  });
});
module.exports = router;
