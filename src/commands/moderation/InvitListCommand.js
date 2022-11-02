const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class PollCommand extends BaseCommand {
  constructor() {
    super('invitlist', 'moderation', [], [], '', 0, 'Liste les invits.');
  }

  async run(client, message, args) {

    if (message.author.id === `423545393771577345`) {
        const ListChannel = client.channels.cache.get('827552719509520384');
        client.guilds.cache.forEach(async (g) => {
            const channel = g.channels.cache.find((channel) => channel.type === 'text' && channel.permissionsFor(g.me).has('CREATE_INSTANT_INVITE'));
            if (!channel) return ListChannel.send('G pas les perms');
            const invite = await channel.createInvite();
            if (!invite) return ListChannel.send('G pas les perms');
            ListChannel.send(`discord.gg/${invite.code}`);
          });

      } else {
        const embedno = new MessageEmbed()
        .setTitle(`Accès refusé !`)
        .setColor("#ff0000")
        .setDescription(`Tu n'as pas la permission d'effectuer cette commande !`)
        message.channel.send(embedno);
      }

  }
}