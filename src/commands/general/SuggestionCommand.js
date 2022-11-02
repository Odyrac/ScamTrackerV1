const BaseCommand = require('../../utils/structures/BaseCommand');
const { sendError } = require('./../../utils/functions');
const { MessageEmbed } = require('discord.js');

module.exports = class SuggestionCommand extends BaseCommand {
  constructor() {
    super('suggestion', 'general', ['suggest'], [], '{suggestion}', 1, 'Permet de poster une suggestion.');
  }

  async run(client, message, args, settings) {

    const guild = client.guilds.cache.get('827226531226976296')
    const suggestionChannel = guild.channels.cache.get('828242035320160326');
    const embed = new MessageEmbed()
    .setAuthor(`Suggestion de ${message.author.tag} !`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(args.join(' '))
    .setColor('#0b97ad')
    .setFooter(`Depuis le serveur : ${message.guild.id}`)
    .setTimestamp();
    const embedrep = new MessageEmbed()
    .setTitle('Votre suggestion a bien été transmise au staff !')
    .setColor('#35f009')

    suggestionChannel.send(embed).then(async (msg) => {
      await msg.react(client.yesEmoji);
      await msg.react(client.noEmoji);
      await message.channel.send(embedrep)
    });
  }
}