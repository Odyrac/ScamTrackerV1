const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const { badUsage } = require('./../../utils/functions');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('invit', 'general', ['invite'], [], '', 0, 'Donne une invitation du serveur.');
  }

  run(client, message, args) {
    let embed = new MessageEmbed()
    .setTitle("Invitation du bot :")
    .setURL('https://discord.com/api/oauth2/authorize?client_id=827226279157170236&permissions=384065&scope=bot')
    .setColor("#0b97ad")
    .setDescription(`Vous aussi, vous pouvez inviter le bot <@!827226279157170236> sur votre serveur ! Vous aurez alors la possibilité de check les autres joueurs.\nIl vous suffit de l'ajouter en cliquant [ici](https://discord.com/api/oauth2/authorize?client_id=827226279157170236&permissions=384065&scope=bot).\n\n⚠️ Le bot ne demande que __**très peu**__ de permissions, pensez à bien lui donner l'accès aux channels de commandes !`)
    //.setFooter("Développé par Odyrac#0001.")
    message.channel.send(embed)
  }
}