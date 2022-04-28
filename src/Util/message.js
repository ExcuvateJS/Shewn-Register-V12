const { MessageEmbed, Message } = require("discord.js");
const config = require('../config.json')
const ayarlar = require('../ayarlar.json')
const emoji = require('../emoji')
module.exports = message => {

  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(  command)) {
    cmd = client.commands.get(client.aliases.get(command));
  };

  if (cmd) {
    if (client.cooldowns.has(`${command}_${message.author.id}`)) {
        const finish = client.cooldowns.get(`${command}_${message.author.id}`)
        let embed = new MessageEmbed().setAuthor(message.author.tag,message.author.displayAvatarURL({ dynamic : true })).setColor('RANDOM').setFooter(config.bots.footer).setTimestamp()
        const date = new Date();
        const kalan = (new Date(finish - date).getTime() / 1000).toFixed(2);
        return message.channel.send(embed.setDescription(`Bu komudu tekrardan kullanabilmek için **${kalan} saniye** beklemeniz gerekmektedir.`)).then(tedoa => tedoa.delete({ timeout : 5000 })).then(message.react(emoji.redemoj))
    };
    
    const finish = new Date();
    finish.setSeconds(finish.getSeconds() + cmd.help.cooldown);
    if (cmd.help.cooldown > 0) {
        client.cooldowns.set(`${command}_${message.author.id}`, finish);
        setTimeout(() => {
          client.cooldowns.delete(`${command}_${message.author.id}`);
        }, cmd.help.cooldown * 1000);
      }
  }

  if (cmd) {
    if(!message.guild) {
      if(cmd.conf.guildOnly === true) {
        return;
      };
    };
    if (cmd.conf.permLevel) {
      if(cmd.conf.permLevel === "BOT_OWNER") {
   if(!conf.geliştiriciler.includes(message.author.id)) {
        message.channel.send(`Bu komutu kullanabilmek için \`${cmd.conf.permLevel}\` yetkisine sahip olmalısın.`).then(msg => msg.delete({timeout: 3000}));
        return;
   }
      }
        if(!message.member.hasPermission(cmd.conf.permLevel)) {
      message.channel.send(`Bu komutu kullanabilmek için \`${cmd.conf.permLevel}\` yetkisine sahip olmalısın.`).then(msg => msg.delete({timeout: 3000}));
     return;
      };
    };
    cmd.run(client, message, params);
};
}