const { Schema, model } = require('mongoose');

const RepSettingsSchema = new Schema({
  uuid: String,
  reppos: { type: Number, default: 0 },
  repne: { type: Number, default: 0 },
  current: {
    type: Boolean,
    required: true,
  },
});

module.exports = model('rep_settings', RepSettingsSchema);
