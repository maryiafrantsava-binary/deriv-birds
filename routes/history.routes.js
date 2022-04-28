const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const History = require('../models/History');
const router = Router();

router.post(
  '/addgamehistory',
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect values during registration'
        })
      }
      const { userid,username,score,iswin } = req.body;
      const history = new History({ userid,username,score,iswin });

      await history.save();

      res.status(201).json({ message: 'History has been created' });

    } catch (e) {
      res.status(500).json({ message: 'something is wrong, try again' });
    }
  })

router.get(
  '/getleaderboard',
  async (req, res) => {
    try {
      console.log("reached on line 41");

      var query = [{
          $group: {
            _id: "$username",
            score: {
              $sum: "$score"
            }
          }
      }];
      const aggCursor = History.aggregate(query).sort({ "score": -1 });
      const leaderboard = [];
      for await (const row of aggCursor) {
        leaderboard.push(row)
      }
      res.status(200).json({
        message: leaderboard
      });

    } catch (e) {
      res.status(500).json({ message: 'something is wrong, try again' });
    }
  })
router.get(
  '/profiledata/:id?',
  async (req, res) => {
    try {
      var query = [
        {
          $match: { userid: req.query.id }
        },{
          $limit:10
        },{
        $group: {
          _id: "$username",
          score: {
            $sum: "$score"
          }
        }
      }];
      const aggCursor = History.aggregate(query);
      const profileData =[];
      for await (const row of aggCursor) {
        profileData.push(row)
      }
      res.status(200).json({
        message: profileData
      });

    } catch (e) {
      res.status(500).json({ message: 'something is wrong, try again' });
    }
  })
module.exports = router;