const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const { NameMC } = require("namemcwrapper");
const BLSettings = require('./../../models/bl');
const asSettings = require('./../../models/as');
const RepSettings = require('./../../models/rep');
const moment = require('moment');
const fetch = require("node-fetch");
const AbortController = require("abort-controller")

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('check', 'general', ['look', 'profil'], [], '{pseudo}', 1, 'Check.');
  }

  async run(client, message, args, settings) {

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
    let pseudo2 = data.name

    const hyapi = await fetch(`https://api.hypixel.net/player?uuid=${uuid}&key=${client.config.bot.key}`);
    const data2 = await hyapi.json().catch(function(error) {
      message.channel.send(`L'API d'Hypixel semble être down.`);
    });
    let pseudo3 = 'erreur 001'

    /* MOJANG A STOP L'API HISTORIQUE DES PSEUDOS
    const mojangapi2 = await fetch(`https://api.mojang.com/user/profiles/${uuid}/names`);
    const listepseudos = await mojangapi2.json().catch(function(error) {
      console.log(error)
    });
    const allpseudos1 = listepseudos.map(x => x.name)
    const allpseudos2 = allpseudos1.map(x => `\`${x}\``)
    const allpseudos = allpseudos2.join(', ')*/

    const embedno = new MessageEmbed()
    .setTitle(`✅ Informations du joueur : ✅`)
    .setDescription(`Si jamais tu te fais arnaquer, va voir le staff d'un de nos serveurs Discord partenaires (<a:fleche:827659550710562866> \`${settings.prefix}infos\`) afin d'ajouter un joueur à notre ScamList.`)
    .addField("• __**ScamList :**__", `\`${pseudo2}\` __**n'est pas**__ dans notre ScamList`)
    .setURL(`https://sky.shiiyu.moe/stats/${pseudo2}/`)
    .setThumbnail(`https://crafatar.com/renders/body/${uuid}?overlay`)
    //.setFooter(`Développé par Odyrac#0001.`)
    .setColor("#35f009")

    const embedas = new MessageEmbed()
    .setTitle(`🔸 Informations du joueur : 🔸`)
    //.setFooter("Développé par Odyrac#0001.")
    .setURL(`https://sky.shiiyu.moe/stats/${pseudo2}/`)
    .setColor("#ee942e")

    const embed = new MessageEmbed()
    .setTitle(`⛔ Informations du joueur : ⛔`)
    .setColor("#ff0000")
    //.setFooter("Développé par Odyrac#0001.")
    .setURL(`https://sky.shiiyu.moe/stats/${pseudo2}/`)

    try {
      /*var controller = new AbortController();
      const signal = controller.signal
      setTimeout(() => controller.abort(), 1000);
      */
      pseudo3 = data2.player.displayname
      const hyapi2 = await fetch(`https://api.hypixel.net/guild?key=${client.config.bot.key}&player=${uuid}`);
      const data3 = await hyapi2.json()
      var guilde = 'Aucune guilde.'
      try {
      guilde = data3.guild.name
      } catch {
        console.log("Il n'a pas de guilde.")
      }
      
      var rank = data2.player.newPackageRank
      var mvp = data2.player.monthlyPackageRank
      var xp = data2.player.networkExp
      var level2 = (Math.sqrt((2 * xp) + 30625) / 50) - 2.5
      var level = Math.round(level2 * 100) / 100
      var karma = data2.player.karma
      function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      }

      var first = data2.player.firstLogin
      var firstbis = moment(first).format('DD/MM/YYYY')
      var last = data2.player.lastLogin
      var lastbis = moment(last).format('DD/MM/YYYY')
      var last2 = data2.player.lastLogout
      var pre = 'null'
      if (last2<last) {
        pre = '🟢 Connecté sur Hypixel.'
      } else {
        pre = '🔴 Non-connecté sur Hypixel.'
      }
      var langue = data2.player.userLanguage
      var version = data2.player.mcVersionRp
      var discord = 'Aucun Discord lié.'
      try {
        discord = data2.player.socialMedia.links.DISCORD
      } catch (error) {
        console.log("Il n'a pas de Discord lié.")
      }
      if (rank ==='MVP_PLUS') {
        rank = 'MVP+'
      } else if (rank === 'VIP_PLUS') {
        rank = 'VIP+'
      } 
      if (!rank) {
        rank = 'Aucun grade.'
      }
      if (mvp === 'SUPERSTAR') {
        rank = 'MVP++'
      }
      if (!langue) {
        langue = 'Langue inconnue.'
      }
      if (langue === 'FRENCH') {
        langue = ':flag_fr: Français'
      } else if (langue === 'ENGLISH') {
        langue = ':flag_gb: Anglais'
      }
      embedno.addField("• __**Rank :**__", `${rank}`)
      embedno.addField("• __**Level :**__", `${level}`)
      embedno.addField("• __**Guilde :**__", `${guilde}`)
      embedno.addField("• __**Première connexion :**__", `${firstbis}`)
      embedno.addField("• __**Dernière connexion :**__", `${lastbis}`)
      embedno.addField("• __**Discord :**__", `${discord}`)
      //embedno.addField("• __**Derniers pseudos :**__", `${allpseudos}`)
      embedno.addField("\u200B", `${pre}`)

      embed.addField("• __**Rank :**__", `${rank}`)
      embed.addField("• __**Level :**__", `${level}`)
      embed.addField("• __**Guilde :**__", `${guilde}`)
      embed.addField("• __**Première connexion :**__", `${firstbis}`)
      embed.addField("• __**Dernière connexion :**__", `${lastbis}`)
      embed.addField("• __**Discord :**__", `${discord}`)
      //embed.addField("• __**Derniers pseudos :**__", `${allpseudos}`)
      embed.addField("\u200B", `${pre}`)

      embedas.addField("• __**Rank :**__", `${rank}`)
      embedas.addField("• __**Level :**__", `${level}`)
      embedas.addField("• __**Guilde :**__", `${guilde}`)
      embedas.addField("• __**Première connexion :**__", `${firstbis}`)
      embedas.addField("• __**Dernière connexion :**__", `${lastbis}`)
      embedas.addField("• __**Discord :**__", `${discord}`)
      //embedas.addField("• __**Derniers pseudos :**__", `${allpseudos}`)
      embedas.addField("\u200B", `${pre}`)

    } catch (error) {
      embedno.addField("• __**Remarque :**__", "De nombreuses informations ne sont pas disponibles car l'API Hypixel du joueur semble inaccessible.")
      embed.addField("• __**Remarque :**__", "De nombreuses informations ne sont pas disponibles car l'API Hypixel du joueur semble inaccessible.")
      console.log(error)
    }

    const results = await BLSettings.findOne({
      uuid: uuid,
    });
    const results2 = await asSettings.findOne({
      uuid: uuid,
    });



    if (!results) {
      if (!results2) {
        return message.channel.send(embedno)
      } else {
        embedas.setDescription(`Ce joueur a scam par le passé mais a remboursé la totalité du stuff volé. Tu peux trade avec lui mais soit vigilant !\n\n• __**ScamList :**__\n\`${pseudo2}\` __**a été**__ dans notre ScamList\n__Ajouté dans la ScamList le :__ ${moment(results2.timestampa).format('DD/MM/YYYY')}\n__A tout remboursé le :__ ${moment(results2.timestamp).format('DD/MM/YYYY')}\n__Raison de l'ancien scam :__ ${results2.reasona}`)
        embedas.setThumbnail(`https://crafatar.com/renders/body/${results2.uuid}?overlay`)
        return message.channel.send(embedas)
      }
    } else {
      let dequi = client.users.cache.get(results.author).tag
      embed.setDescription(`Nous te conseillons de ne pas trade avec lui. Si jamais tu penses que c'est une erreur, va voir le staff d'un de nos serveurs Discord partenaires (<a:fleche:827659550710562866> \`${settings.prefix}infos\`).\n\n• __**ScamList :**__\n\`${pseudo2}\` __**est**__ dans notre ScamList\n__Depuis le :__ ${moment(results.timestamp).format('DD/MM/YYYY')}\n__Raison :__ ${results.reason}\n__Ajouté par :__ ${dequi}`)
      embed.setThumbnail(`https://crafatar.com/renders/body/${results.uuid}?overlay`)
      message.channel.send(embed)
    }
  }
}