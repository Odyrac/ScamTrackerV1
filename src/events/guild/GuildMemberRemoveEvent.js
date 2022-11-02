const BaseEvent = require('./../../utils/structures/BaseEvent');
const { Guild, GuildChannel, MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = class GuildMemberRemoveEvent extends BaseEvent {
  constructor() {
    super('guildMemberRemove');
  }

  run(){}
}