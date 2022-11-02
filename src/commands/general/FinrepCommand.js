const BaseCommand = require('../../utils/structures/BaseCommand');
const { sendError } = require('./../../utils/functions');
const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
const ms = require('ms');

module.exports = class AddxpCommand extends BaseCommand {
  constructor() {
    super('addrep', 'general', ['removerep'], [], '', 0, "Fin rep.");
  }

  async run(client, message, args, settings) {

    const embed = new MessageEmbed()
    .setTitle(`Fin des réputations !`)
    .setColor("#0b97ad")
    .setDescription(`Comme je vous l'avais évoqué précédemment, le système des réputations est dorénavant __**fermé**__. C'est \`monsieurbob1\` qui termine avec le plus de réputations (204).\n\nPour l'avenir du bot, on vous prépare un nouveau gros projet qui devrait très bientôt arriver ! Si vous avez des suggestions, n'hésitez pas à utiliser \`)suggestion [votre suggeston]\`.\n\n• Odyrac`)
    message.channel.send(embed)

  }
}