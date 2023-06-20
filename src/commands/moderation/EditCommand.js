const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const { NameMC } = require("namemcwrapper");
const BLSettings = require('./../../models/bl');
const moment = require('moment');
const fetch = require("node-fetch");

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('edit', 'general', [], [], '{pseudo}', 1, 'Edit.');
  }

  async run(client, message, args) {

    if (message.member.roles.cache.has('827624653442252881') || message.member.roles.cache.has('828015879421820989') || message.author.id === `423545393771577345`) {

        const embedintrouvable = new MessageEmbed()
        .setTitle(`Joueur introuvable !`)
        .setColor("#ff0000")
        .setDescription(`Le joueur ne semble pas exister ou n'est pas trouvable !`)

        let pseudo = args[0];
        const mojangapi = await fetch(`https://api.mojang.com/users/profiles/minecraft/${pseudo}`);
        const data = await mojangapi.json().catch(function(error) {
          message.channel.send(embedintrouvable);
        });
        
        console.log(data);
        let uuid = data.id;

        const embedno = new MessageEmbed()
        .setTitle(`Introuvable !`)
        .setDescription(`\`${pseudo}\` n'est pas dans notre base de données. Vous ne pouvez donc pas modifier la raison pour laquelle il y est. Ajoutez le avec la commande \`)add ${pseudo} [raison]\`.`)
        .setURL(`https://sky.shiiyu.moe/stats/${pseudo}/`)
        .setThumbnail(`https://crafatar.com/renders/body/${uuid}?overlay`)
        .setFooter(`Bon jeu à tous !`)
        .setColor("#ee942e")

        const results = await BLSettings.findOne({
          uuid: uuid,
        });
        if (!results) {
          return message.channel.send(embedno);
        }

        const embed = new MessageEmbed()
        .setTitle(`Menu édition :`)
        .setColor("#35f009")
        .setDescription(`Ici, vous pourrez éditer la raison d'ajout de \`${pseudo}\` dans notre base de données. Le prochain message que vous enverrez dans ce channel sera sa nouvelle raison d'ajout.\n\n__**Attention :**__ si vous souhaitez conserver la raison précédente, pensez à la remettre dans le nouveau message. Vous pouvez la copier coller ici :\n\n\`${results.reason}\``)
        .setFooter("Bon jeu à tous !")
        .setURL(`https://sky.shiiyu.moe/stats/${pseudo}/`)
        .setThumbnail(`https://crafatar.com/renders/body/${results.uuid}?overlay`)

        const filter = msg => msg.author.id === message.author.id && msg.channel.id === message.channel.id;
        const elmsg = await message.channel.send(embed);
        message.channel.awaitMessages(filter, { max: 1 }).then(async collected => {
          const msg = collected.first();

          const newreason = msg.content
          
          msg.delete();

          await BLSettings.updateOne(
            { uuid: results.uuid },
            {
              $set: {
                reason: msg.content,
              },
            }
          )
        
          const embed2 = new MessageEmbed()
          .setTitle(`Raison changée !`)
          .setColor("#35f009")
          .setDescription(`__Nouvelle raison de \`${pseudo}\` :__\n\n\`${msg.content}\``)
          message.channel.send(embed2)

          const guild = client.guilds.cache.get('827226531226976296')
          const logsChannel = guild.channels.cache.get('827545549242368020');
          const logembed = new MessageEmbed()
          .setAuthor(`Une raison d'ajout a été changée !`)
          .setColor('#ee942e')
          .setDescription(`__**Pseudo :**__ \`${pseudo}\`\n__**Par :**__ \`${message.author.tag}\`\n__**Serveur :**__ ${message.guild.id}\n__**Ancienne raison :**__ \`${results.reason}\`\n__**Nouvelle raison :**__ \`${msg.content}\``)
          .setTimestamp()
          .setFooter(message.author.username, message.author.displayAvatarURL());
          const msg2 = await logsChannel.send(logembed);
          msg2.crosspost();

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