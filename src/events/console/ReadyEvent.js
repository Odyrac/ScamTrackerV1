const BaseEvent = require('../../utils/structures/BaseEvent');
const { vote, unban } = require('./../../utils/functions');
const { MessageEmbed, Client } = require('discord.js'); // eslint-disable-line no-unused-vars
const fetch = require("node-fetch");

module.exports = class ReadyEvent extends BaseEvent {
  constructor () {
    super('ready');
  }

  async run (client) {
    console.log(`Connecté en tant que ${client.user.tag} !`);
    const activities = ['créé par Odyrac#0001', `les scammers`, ')help']; let i = 0;
    setInterval(() => client.user.setPresence({ activity: { name: `${activities[i++ % activities.length]}`, type: 'WATCHING' }, status: 'online' }), 10000);
    setInterval(() => client.guilds.cache.forEach(guild => {
      vote(guild);
    }), 60 * 1000);
  }
}
;