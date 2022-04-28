const { MessageEmbed } = require('discord.js')
const config = require('../config.json')
const ayarlar = require('../ayarlar.json')
const emoji = require('../emoji')

exports.run = async(client, message, args) => {

if (!message.member.roles.cache.has(config.roles.abality) && !message.member.hasPermission('ADMINISTRATOR'))


  var ses = message.guild.members.cache.filter(x => x.voice.channel).size
  let bot = message.guild.members.cache.filter(s => s.voice.channel && s.user.bot).size
  let tag = message.guild.members.cache.filter(member => member.user.username.includes(config.taglar.tag)).size
  let üyesayısı = message.guild.members.cache.size
  let aktif = message.guild.members.cache.filter(m => m.presence.status !== "offline").size

  const embed = new MessageEmbed().setTimestamp().setColor("000001").setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true })).setFooter(`${config.bots.footer}`);
  
  message.channel.send(embed.setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
  \`❯\` Sunucuda toplam **${üyesayısı}** adet üye var (**${aktif || "0"}** aktif bulunmaktadır.)
  \`❯\` Sunucuda toplam **${ses-bot || "0"}** (**+${bot || "0"} bot**) kişi seslide bulunmaktadır.
  \`❯\` Toplamda **${tag || "0"}** kişi tagımızı alarak bizi desteklemiş.
  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`));

};


exports.conf = {
name : 'say',
enabled : true,
guildOnly : false,
aliases : [], 
 }
exports.help = {
help: "say",
cooldown: 2
}
    