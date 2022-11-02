const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const GuildSettings = require('./../../models/guild');

module.exports = class PrefixCommand extends BaseCommand {
  constructor() {
    super('prefix', 'moderation', ['prefixe'], ['ADMINISTRATOR'], '{nouveau prefix}', 0, 'Permet de modifier le préfixe du bot sur ce serveur.');
  }

  async run(client, message, args, settings) {
    const noargsprefixembed = new MessageEmbed()
    .setTitle(`Préfixe : \`${settings.prefix}\``)
      
    if (!args[0]) return message.channel.send(noargsprefixembed);
    const logsChannel = message.guild.channels.cache.get('765987929394511962');

    const prefixupdatedembed = new MessageEmbed()
    .setTitle(`Préfixe mis à jour !`)
    .setDescription(`**Ancien préfixe :** \`${settings.prefix}\`\n**Nouveau préfixe :**\`${args[0]}\``)

    GuildSettings.updateOne(
      { gid: message.guild.id },
      { $set: { prefix: `${args[0]}` } }
    ).then(message.channel.send(prefixupdatedembed));
    const prefixembed = new MessageEmbed()
    .setAuthor(`Préfixe mis à jour !`)
    .setColor('#35f009')
    .setDescription(`**Ancien préfixe :** ${settings.prefix}\n**Nouveau préfixe :** ${args[0]}\n**Modérateur :** ${message.author} (${message.author.tag})`)
    .setTimestamp()
    if (logsChannel) logsChannel.send(prefixembed);
  }
}