const { MessageEmbed } = require('discord.js');
const VoteSettings = require('../models/vote');
const BanSettings = require('../models/ban');

async function sendError (text, channel) {
  const embed = new MessageEmbed()
  .setColor('#ff0000')
  .setDescription(text)
  .setFooter("Une erreur est survenue.");
  await channel.send(embed);
}

async function badUsage (usage, channel) {
  const embed = new MessageEmbed()
  .setTitle('Utilisation :')
  .setColor('#ee942e')
  .setDescription(usage)
  .setFooter('Vous avez mal écrit la commande.');
  await channel.send(embed);
}

async function vote (guild) {
  const membersVote = await VoteSettings.find({ gid: guild.id });
  if (membersVote) {
    membersVote.forEach(async (user) => {
      
      const elpgmos = guild.members.cache.get(user.uid);
      if (!elpgmos) {
        await VoteSettings.deleteOne({
          uid: user.uid,
          gid: guild.id
        });
        return;
      }
      if (new Date().getTime() > user.expires) {
        
        const embed = new MessageEmbed()
        .setTitle('Cooldown expiré !')
        .setColor('#1bac0a')
        .setDescription('Vous pouvez à nouveau voter pour les réputations !');
        elpgmos.send(embed);
        await VoteSettings.deleteOne({
          uid: user.uid,
          gid: guild.id
        });
      } 
    });
  }
}


async function unban (client, guild) {
  const membersBanned = await BanSettings.find({ gid: guild.id });
  if (membersBanned) {
    membersBanned.forEach(async (member) => {
      const bans = await guild.fetchBans();
      const user = bans.get(member.uid);
      async function deleteOneBan (uid, gid) {
        await BanSettings.deleteOne({
          uid: uid,
          gid: gid
        });
      }
      if (!user) return deleteOneBan(member.uid, guild.id);
      if (new Date().getTime() > member.expires) {
        deleteOneBan(member.uid, guild.id);
        guild.members.unban(member.uid, 'TempBan expiré');
      }
    });
  }
}

module.exports = {
  sendError,
  badUsage,
  vote,
  unban
};