const { MessageEmbed } = require("discord.js");
const config = require('../config.json')
const ayarlar = require('../ayarlar.json')
const emoji = require('../emoji')
var prefix = ayarlar.prefix
exports.run = async(client, message, args) => {


let embed = new MessageEmbed().setAuthor(message.author.tag,message.author.displayAvatarURL({ dynamic : true })).setColor('000001').setFooter(config.bots.footer).setTimestamp()

if (!message.member.roles.cache.has(config.roles.register) && !message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(embed.setDescription(`${message.author} Bu komutu kullanabilmek için yeterli yetkin yok!`)).then(shewn => shewn.delete({timeout : 5000})).then(message.react(emoji.redemoj))

let list = client.commands
.filter((x) => x.help.help)
.sort((a, b) => b.help.help - a.help.help)
.map((x) => `\`${prefix}${x.help.help}\``)
.join("\n");


message.channel.send(embed.setDescription(list));
 }
 exports.conf = {
    name : 'yardım',
    enabled : true,
    guildOnly : false,
    aliases : ["help"], 
    permLevel : 0
}

exports.help = {
    description : '',
    cooldown: 10
}
