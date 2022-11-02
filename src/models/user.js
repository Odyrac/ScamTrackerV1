const { Schema, model } = require('mongoose');

const userSettingsSchema = new Schema({
  uid: String,
  uname: String,
  gid: String,
  lvl: { type: Number, default: 0 },
  xp: { type: Number, default: 0 },
  warns: { type: Array, default: [] },
  points: { type: Number, default: 0 }
});

module.exports = model('user_settings', userSettingsSchema);
