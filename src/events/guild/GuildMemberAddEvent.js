const BaseEvent = require('./../../utils/structures/BaseEvent');
const { Guild, GuildChannel, MessageAttachment, MessageEmbed, GuildMember, Client } = require('discord.js');

module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor () {
    super('guildMemberAdd');
  }

  run(){}
};
