const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'general', [], [], '', 0, 'Permet de connaitre la latence du bot.');
  }

  run(client, message, args, settings, memberSettings) {
    const ping = client.ws.ping;
    const embed = new MessageEmbed()
    .setTitle(`🏓 Pong ! \`${ping}ms\``)
    if (ping < 50) embed.setColor('GREEN');
    if (ping >= 50 && ping < 100) embed.setColor('ORANGE');
    if (ping >= 100) embed.setColor('RED');
    message.channel.send(embed);
  }
}