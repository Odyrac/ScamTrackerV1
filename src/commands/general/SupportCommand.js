const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const { badUsage } = require('./../../utils/functions');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('support', 'general', [], [], '', 0, 'Support.');
  }

  run(client, message, args, settings) {
    let embed = new MessageEmbed()
    .setTitle("Support du bot :")
    .setURL('https://discord.gg/fRNHPAU')
    .setColor("#0b97ad")
    .setDescription(`Si vous pensez avoir trouvé un bug dans le bot <@!827226279157170236>, rejoignez le serveur de support afin d'expliquer votre problème. Une fois dessus, ouvrez un ticket pour prendre contact avec le staff.\n\n<a:fleche:827659550710562866> https://discord.gg/fRNHPAU\n\n__**Remarque :**__ les suggestions se font avec \`${settings.prefix}suggestion [votre suggestion]\``)
    //.setFooter("Développé par Odyrac#0001.")
    message.channel.send(embed)
  }
}