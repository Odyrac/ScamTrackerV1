const { Schema, model } = require('mongoose');

const VoteSettingsSchema = new Schema({
  gid: String,
  uid: String,
  expires: {
    type: String,
    required: true,
  },
  current: {
    type: Boolean,
    required: true,
  },
});

module.exports = model('vote_settings', VoteSettingsSchema);
