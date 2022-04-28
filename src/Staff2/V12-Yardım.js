const Discord = require("discord.js");
const emoji = require("../emoji");
const ayarlar = require("../ayarlar.json");
const config = require("../config.json");

exports.run = async(client, message, args) => {

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let embed5 = new Discord.MessageEmbed().setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true})).setTitle(` **${config.giriş.SunucuAdı} Register Rol Menüsüne Hoşgeldiniz** `).setColor("#ff0000").setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))

if (!message.member.roles.cache.has(config.roles.abality) && !message.member.hasPermission('ADMINISTRATOR'))
    return message.channel.send(embed5.setDescription(`${message.author} Bu komutu kullanabilmek için yeterli yetkin yok!`)).then(shewn => shewn.delete({timeout : 5000})).then(message.react(emoji.redemoj))
            
message.channel.send(embed5.setDescription(`**İşte Verebileceğin Rollerin Listesi**\n
• **${ayarlar.prefix}DenemeYT {Kullanıcı} ver/al**
• **${ayarlar.prefix}Vip {Kullanıcı} ver/al**
• **${ayarlar.prefix}Friends {Kullanıcı} ver/al**
• **${ayarlar.prefix}Musician {Kullanıcı} ver/al**
`)).then(message.react(emoji.loadingemoji))
}
exports.conf = {
   name : "destek",
    enabled : true,
    guildOnly : true,
    aliases : ["h", "help"], 
     }

exports.help = {
    help: "destek",
    cooldown: 3
 }