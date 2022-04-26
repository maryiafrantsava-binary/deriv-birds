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
module.exports = router;