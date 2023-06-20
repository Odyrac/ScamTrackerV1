const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class PollCommand extends BaseCommand {
  constructor() {
    super('embed', 'moderation', [], [], '', 0, 'Permet de créer un embed.');
  }

  async run(client, message, args) {

    if (message.author.id === `423545393771577345`) {
        message.delete()
        const filter = msg => msg.author.id === message.author.id && msg.channel.id === message.channel.id;
        const elmsg = await message.channel.send("Donnez moi le titre le l'embed.");
        message.channel.awaitMessages(filter, { max: 1 }).then(collected => {
          const msg = collected.first();
          const embed = new MessageEmbed();
          
          embed.setTitle(msg.content);
          elmsg.edit("Donnez moi la description de l'embed.");
          msg.delete();
          message.channel.awaitMessages(filter, { max: 1 }).then(collected2 => {
            elmsg.edit("Donne moi la couleur de l'embed (en anglais/hexadécimal/rgb).");
            embed.setDescription(collected2.first().content);
            collected2.first().delete();
            message.channel.awaitMessages(filter, { max: 1 }).then(collected3 => {
              elmsg.edit("Donne moi le pied de l'embed.");
              embed.setColor(collected3.first().content.toUpperCase());
              collected3.first().delete();
              message.channel.awaitMessages(filter, { max: 1 }).then(collected4 => {
                embed.setFooter(collected4.first().content);
                collected4.first().delete();
                message.channel.send(embed);
                elmsg.delete();
              });
            });
          });
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