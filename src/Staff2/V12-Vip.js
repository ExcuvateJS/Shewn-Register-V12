const Discord = require("discord.js");
const roller = require("../Verilecek-Roller.json");
const emoji = require("../emoji");
const ayarlar = require("../ayarlar.json");
const config = require("../config.json");

exports.run = async(client, message, args) => {

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let embed = new Discord.MessageEmbed().setColor("#ff0000").setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    let embed2 = new Discord.MessageEmbed().setColor("#ffff00").setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    let embed3 = new Discord.MessageEmbed().setColor("#ffff00").setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    if (!message.member.roles.cache.has(config.roles.abality) && !message.member.hasPermission('ADMINISTRATOR'))
    return message.channel.send(embed.setDescription(`${message.author} Bu komutu kullanabilmek için yeterli yetkin yok!`)).then(shewn => shewn.delete({timeout : 5000})).then(message.react(emoji.redemoj))


if(!args[1]) {
    message.channel.send(embed.setDescription(`**[Hata] Yalnış kullanım!**  ${ayarlar.prefix}Vip **ver/al**`)).then(message.react(emoji.redemoj))
    return;    
    }

        if (args[1] == "ver") {
            if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(embed2.setDescription(`${message.author} bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!`)).then(message.react(emoji.redemoj))
            await message.guild.members.cache.get(member.id).roles.add(roller.vip)
      
            message.channel.send(embed2.setDescription(`${member} Adlı Üyeyeye <@&${roller.vip}> Rolü Verildi!`)).then(message.react(emoji.onayemoji))
         }

         if (args[1] == "al") {
            if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(embed3.setDescription(`${message.author} bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!`)).then(message.react(emoji.redemoj))
            await message.guild.members.cache.get(member.id).roles.remove(roller.vip)

            message.channel.send(embed3.setDescription(`${member} Adlı Üyeynin <@&${roller.vip}> Rolü Alındı`)).then(message.react(emoji.onayemoji))
         }
}
exports.conf = {
   name : "vip",
    enabled : true,
    guildOnly : true,
    aliases : ["Vip", "VİP", "Special", "special", "SPECİAL"], 
     }

exports.help = {
    help: "vip",
    cooldown: 3
 }