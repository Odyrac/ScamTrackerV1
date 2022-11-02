const BaseEvent = require('../../utils/structures/BaseEvent');
const GuildSettings = require('../../models/guild');
const UserSettings = require('../../models/user');
const { MessageEmbed, Client, Message } = require('discord.js');
const { sendError, badUsage } = require('../../utils/functions');
const validPermissions = ['CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER', 'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'VIEW_GUILD_INSIGHTS', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS'];

module.exports = class MessageEvent extends BaseEvent {
  constructor () {
    super('message');
  }

  async run (client, message) {
    const { member, author, channel, guild } = message;
    if (author.bot) return;
    if (!guild) return;

    let storedSettings = await GuildSettings.findOne({ gid: guild.id });
    if (!storedSettings) {
      const newSettings = new GuildSettings({
        gid: guild.id
      });
      await newSettings.save().catch((error) => console.log(error));
      storedSettings = await GuildSettings.findOne({ gid: guild.id });
    }

    let storedMemberSettings = await UserSettings.findOne({
      gid: guild.id,
      uid: member.id
    });
    if (!storedMemberSettings) {
      const newUsersSettings = new UserSettings({
        uid: member.id,
        uname: author.tag,
        gid: guild.id
      });
      await newUsersSettings.save().catch((error) => console.log(error));
      storedMemberSettings = await UserSettings.findOne({
        gid: guild.id,
        uid: member.id
      });
    }
    if (storedMemberSettings.uname !== `${author.tag}`) {
      await UserSettings.updateOne(
        { gid: guild.id, uid: member.id },
        { $set: { uname: author.tag } }
      ).then();
    }

    if (message.mentions.users.first() && message.mentions.users.first().id !== client.user.id) {
      const user = guild.member(message.mentions.users.first());
      let storedUserSettings = await UserSettings.findOne({
        gid: guild.id,
        uid: user.id
      });
      if (!storedUserSettings) {
        const newUsersSettings = new UserSettings({
          uid: user.id,
          uname: user.tag,
          gid: guild.id
        });
        await newUsersSettings.save().catch((error) => console.log(error));
        storedUserSettings = await UserSettings.findOne({
          gid: guild.id,
          uid: user.id
        });
      }
      if (storedUserSettings.uname !== user.user.tag) {
        await UserSettings.updateOne(
          { gid: guild.id, uid: user.id },
          { $set: { uname: user.user.tag } }
        ).then();
      }
    }

    const prefixMention = new RegExp(`^<@!?${client.user.id}>`);
    const savedPrefix = storedSettings.prefix || client.config.bot.prefix;
    // const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : savedPrefix;

    if (message.content.startsWith(savedPrefix)) {
      const [cmdName, ...cmdArgs] = message.content.slice(savedPrefix.length).trim().split(/ +/);
      // const thecommands = [];
      // client.commands.forEach((command) => {
      //   if (command.category === 'moderation') {
      //     if (!thecommands.includes(command.name)) thecommands.push(command.name);
      //     else {
      //       command.aliases.forEach((aliase) => {
      //         if (!thecommands.includes(aliase)) thecommands.push(aliase);
      //           else return;
      //       });
      //     }
      //   }
      // });
      // console.log(thecommands)
      const command = client.commands.get(cmdName);
      if (!command) return;
      if (command.args && command.args > cmdArgs.length) return badUsage(`${savedPrefix}${cmdName} ${command.usage}`, channel);
      let permissionsBypass = false;
      if (command.rroles && command.rroles.length > 0) {
        for (const role of command.rroles) {
          if (member.roles.cache.has(role)) {
            permissionsBypass = true;
          }
        }
      }
      if (!permissionsBypass && command.permissions && command.permissions.length > 0) {
        for (const permission of command.permissions) {
          if (validPermissions.includes(permission)) {
            if (!message.member.hasPermission(permission)) {
              return sendError(`Vous n'avez pas les permissions de faire cette commande (${permission})`, channel);
            }
          } else {
            console.log(`${permission} n'est pas une permission valide`);
          }
        }
      }
      command.run(client, message, cmdArgs, storedSettings, storedMemberSettings);
    }
  }
};

function removeRole (member, roleId) {
  if (member.roles.cache.has(roleId)) {
    member.roles.remove(roleId);
  }
}

function addRole (member, roleId) {
  if (!member.roles.cache.has(roleId)) {
    member.roles.add(roleId);
  }
}