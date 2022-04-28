const { Schema, model } = require('mongoose');

const schema = new Schema({
  userid:{ type: String, required: true},
  username:{ type: String, required: true},
  score:{ type: Number, required: true },
  iswin:{ type: Boolean, required: true },
})

module.exports = model('History', schema);