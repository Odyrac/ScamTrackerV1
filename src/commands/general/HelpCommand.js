const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const { badUsage } = require('./../../utils/functions');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'general', ['aide', 'h'], [], '', 0, 'Permet de connaitre toutes les commandes.');
  }

  run(client, message, args, settings) {
    let embed = new MessageEmbed()
    .setTitle("Aide ScamTracker FR :")
    .setColor("#0b97ad")
    .addField("__**Général :**__", `\`${settings.prefix}help\` -> affiche ce message d'aide\n\`${settings.prefix}invit\` -> permet d'inviter le bot sur votre serveur\n\`${settings.prefix}infos\` -> vous donne des informations sur le bot\n\`${settings.prefix}support\` -> vous explique comme report un bug\n\`${settings.prefix}suggestion [votre suggestion]\` -> permet de transmettre une suggestion au staff`)
    .addField('__**ScamList :**__', `\`${settings.prefix}check [pseudo mc]\` -> permet de voir les infos d'un joueur\n\`${settings.prefix}uuid [pseudo mc]\` -> donne l'uuid d'un joueur`)
    .addField("__**Administration :**__", `\`${settings.prefix}add [pseudo] [raison]\` -> inscrit un joueur dans la base de données\n\`${settings.prefix}edit [pseudo]\` -> vous affiche le menu d'édition, suivez les instructions du bot afin de modifier la raison d'ajout d'un scammer\n\`${settings.prefix}remove [pseudo] [raison]\` -> retire totalement un joueur de la base de données\n\`${settings.prefix}rem [pseudo]\` -> retire un joueur de la base de données et le désigne comme ayant remboursé\n\`${settings.prefix}prefix [nouveau préfixe]\` -> permet de changer le préfixe du bot`)
    //.setFooter("Développé par Odyrac#0001.")
    message.channel.send(embed)
  }
}