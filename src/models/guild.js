const { Schema, model } = require('mongoose');
const config = require('./../../config');

const guildSettingSchema = new Schema({
  gid: String,
  prefix: { type: String, default: config.bot.prefix },

});

module.exports = model('guild_settings', guildSettingSchema);