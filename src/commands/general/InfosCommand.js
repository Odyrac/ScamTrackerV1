const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const { badUsage } = require('./../../utils/functions');
const BLSettings = require('./../../models/bl');
const guildSettings = require('./../../models/guild');
const RepSettings = require('./../../models/rep');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('infos', 'general', ['info'], [], '', 0, 'Infos.');
  }

  async run(client, message, args, settings) {
    const nb = await BLSettings.find({});
    const nb2 = await guildSettings.find({});
    const nb3 = await RepSettings.find({});
    let embed = new MessageEmbed()
    .setTitle("Informations ScamTracker FR :")
    .setColor("#0b97ad")
    .setDescription(`Voici le bot <@!827226279157170236>. Il a pour but de créer une base de données commune à de nombreux serveurs Hypixel FR regroupant tous les scammers du SkyBlock ! Pour plus d'informations sur l'utilisation du bot, faites \`${settings.prefix}help\`.\n\nSi vous souhaitez __**ajouter un scammer**__ à notre ScamList ou __**report un bug**__, il vous suffit de contacter le staff de l'un de __nos serveurs partenaires :__\n\n<a:fleche:827659550710562866> <:hycommu:836655950236221510> __**HyCommunauté**__ (https://discord.gg/fRNHPAU)\n<a:fleche:827659550710562866> <:iskyz:827665576695562331> __**iSkyZ**__ (https://discord.gg/qfu5Tx5KDP)\n<a:fleche:827659550710562866> <:eternity:827814529290731521> __**Eternity**__ (https://discord.gg/4epp2J3)\n<a:fleche:827659550710562866> <:ljf:827906681136087070> __**LJF**__ (https://discord.gg/bB7Aqna)\n<a:fleche:827659550710562866> <:oblivion:843475411815104523> __**Oblivion**__ (https://discord.gg/PGW2prK)\n<a:fleche:827659550710562866> <:eynvala:828029177268797462> __**Ey'Nvala**__ (https://discord.gg/79NmTSC)\n<a:fleche:827659550710562866> <:hypixelsbfr:844256916988362832> __**Hypixel SkyBlock FR**__ (https://discord.gg/byEyE7qu3H)\n\n• contient actuellement __**${nb.length}**__ scammers\n• présent sur __**${nb2.length}**__ serveurs Discord\n• un total de __**${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)}**__ membres`)
    .setFooter("Bot développé par Odyrac#0001.")
    message.channel.send(embed)
  }
}