const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const { NameMC } = require("namemcwrapper");
const BLSettings = require('./../../models/bl');
const moment = require('moment');
const fetch = require("node-fetch");

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('uuid', 'general', ['UUID'], [], '{pseudo}', 1, 'Donne les uuid.');
  }

  async run(client, message, args) {
    const embedintrouvable = new MessageEmbed()
    .setTitle(`Joueur introuvable !`)
    .setColor("#ff0000")
    .setDescription(`Le joueur ne semble pas exister ou n'est pas trouvable !`)

    let pseudo = args[0];
    const mojangapi = await fetch(`https://api.mojang.com/users/profiles/minecraft/${pseudo}`);
    const data = await mojangapi.json().catch(function(error) {
      message.channel.send(embedintrouvable);
    });
    
    console.log(data)
    let uuid = data.id;

    const regex =/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/;
    let uuid2 = uuid.replace(regex, '$1-$2-$3-$4-$5');

    const embed = new MessageEmbed()
    .setTitle(`uuid de \`${pseudo}\` :`)
    .setDescription(`__**uuid :**__ \`${uuid2}\`\n__**uuid BDD :**__ \`${uuid}\`\n__**Commande BDD :**__ \`{uuid : '${uuid}'}\``)
    .setURL(`https://sky.shiiyu.moe/stats/${pseudo}/`)
    .setThumbnail(`https://crafatar.com/renders/body/${uuid}?overlay`)
    //.setFooter(`Développé par Odyrac#0001.`)
    .setColor("#35f009")
    message.channel.send(embed)
  }
}