require('dotenv').config();
const { Client, Collection, Intents } = require('discord.js');

const mongoose = require('mongoose');
const { registerCommands, registerEvents } = require('./utils/registry');
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], ws: { intents: Intents.ALL } });
const config = require('../config');

(async () => {
  client.commands = new Map();
  client.elcommands = new Map();
  client.events = new Map();
  client.cooldown = new Collection();
  client.queue = new Map();
  client.config = config;
  client.checkEmoji = '👌';
  client.yesEmoji = '✅';
  client.noEmoji = '❌';
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.token);
  await mongoose.connect(process.env.mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
})();
