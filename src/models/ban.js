const { Schema, model } = require('mongoose');

const BanSettingsSchema = new Schema({
  gid: String,
  uid: String,
  reason: String,
  expires: {
    type: String,
    required: true,
  },
  current: {
    type: Boolean,
    required: true,
  },
});

module.exports = model('ban_settings', BanSettingsSchema);