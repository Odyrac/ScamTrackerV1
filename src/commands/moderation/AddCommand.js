const BaseCommand = require('../../utils/structures/BaseCommand');
const { badUsage } = require('./../../utils/functions');
const { MessageEmbed } = require('discord.js');
const BLSettings = require('./../../models/bl');
const fetch = require("node-fetch");
const { sendError } = require('./../../utils/functions');

module.exports = class WarnCommand extends BaseCommand {
  constructor() {
    super('add', 'moderation', ['bl', 'BL'], [], '{pseudo} {raison}', 2, "Add un membre.", []);
  }

  async run(client, message, args, settings) {

    if (message.member.roles.cache.has('827624653442252881') || message.member.roles.cache.has('828015879421820989') || message.member.roles.cache.has('837644067578970143') || message.author.id === `423545393771577345`) {
      const supportserver = client.guilds.cache.get('827226531226976296')
      const logsChannel = supportserver.channels.cache.get('827545549242368020');

      const reason = args.splice(1).join(' ');
      
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
      let pseudo2 = data.name;

      if (!pseudo) return badUsage(`${settings.prefix}add {pseudo} {raison}`, message.channel);
      if (!reason) return badUsage(`${settings.prefix}add {pseudo} {raison}`, message.channel);

      const embed = new MessageEmbed()
      .setTitle(`\`${pseudo2}\` a été ajouté à la ScamList !`)
      .setThumbnail(`https://crafatar.com/renders/body/${uuid}?overlay`)
      .setColor("#ee942e")
      .setDescription(`Il est dorénavant présent dans notre base de données et pourra être détecté avec la commande \`${settings.prefix}check ${pseudo2}\`.\n\n__**Ajouté par :**__ ${message.author}\n__**Raison :**__ ${reason}`)

      const logembed = new MessageEmbed()
      .setAuthor(`Un joueur a été ajouté à la ScamList !`)
      .setColor('#ee942e')
      .setDescription(`__**Pseudo :**__ \`${pseudo2}\`\n__**Par :**__ \`${message.author.tag}\`\n__**Raison :**__ ${reason}\n__**Serveur :**__ ${message.guild.id}`)
      .setTimestamp()
      .setFooter(message.author.username, message.author.displayAvatarURL());

      const previousBL = await BLSettings.find({
        uuid: uuid,
      });
      const currentlyBL = previousBL.filter((BL) => {
        return BL.current === true;
      });
      
      if (currentlyBL.length) return sendError(`Ce joueur est déjà dans la ScamList !`, message.channel);

      const msg = await logsChannel.send(logembed);
      msg.crosspost();

      await new BLSettings({
        uuid: uuid,
        gid: message.guild.id,
        current: true,
        author: message.member.id,
        timestamp: new Date().getTime(),
        reason,
      }).save().catch((error) => console.log(error));
      
      message.channel.send(embed);

    } else {
      const embedno = new MessageEmbed()
      .setTitle(`Accès refusé !`)
      .setColor("#ff0000")
      .setDescription(`Tu n'as pas la permission d'effectuer cette commande !`)
      message.channel.send(embedno);
    }
  }
}