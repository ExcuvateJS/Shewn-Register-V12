const { MessageEmbed } = require('discord.js')
const Database = require('quick.db')
const config = require('../config.json')
const ayarlar = require('../ayarlar.json')
const emoji = require('../emoji')


exports.run = async(client, message, args) => {

let embed = new MessageEmbed().setAuthor(message.author.tag,message.author.displayAvatarURL({ dynamic : true })).setColor("000001").setFooter(config.bots.footer)
    
if (!message.member.roles.cache.has(config.roles.abality) && !message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(embed.setDescription(`${message.author} Bu komutu kullanabilmek için yeterli yetkin yok!`)).then(shewn => shewn.delete({timeout : 5000})).then(message.react(emoji.redemoj))

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!member) return message.channel.send(embed.setDescription(`${message.author} Lütfen bir kullanıcı belirtin @Shewn/ID gibi.`)).then(shewn => shewn.delete({timeout : 8000})).then(message.react(emoji.redemoj))

if (member.user.bot) return message.channel.send(embed.setDescription(`${message.author} Botları kayıtsıza atamazsın!`)).then(shewn => shewn.delete({timeout : 5000})).then(message.react(emoji.redemoj))
if (member.id === message.author.id) return message.channel.send(embed.setDescription(`${message.author} Kendini kayıtsıza atamazsın!`)).then(shewn => shewn.delete({timeout : 5000})).then(message.react(emoji.redemoj))
if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(embed.setDescription(`Bu Kullanıcı Senden Üst veya Aynı Pozisyonda.`)).then(shewn => shewn.delete({timeout : 7000})).then(message.react(emoji.redemoj))   

let tagsız = config.taglar.tagsız 

await message.guild.members.cache.get(member.id).roles.add(config.roles.unregisteres)
await message.guild.members.cache.get(member.id).roles.remove(config.roles.femaleRoles)
await message.guild.members.cache.get(member.id).roles.remove(config.roles.maleRoles)

/*if (member.user.username.includes(tagsız)) {*/
await message.guild.members.cache.get(member.id).setNickname(`${tagsız} İsim | Yaş`)
const shewn = new MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setColor('000001')
.setDescription(`${member} Adlı Üye Başarıyla <@&${config.roles.unregisteres}> Rolüne Atıldı ${emoji.onayemoji}`)
message.react(emoji.onayemoji)
message.channel.send(shewn).then(TekAşk => TekAşk.delete({ timeout : 10000 }))
//}

    }
    exports.conf = {
        name : 'kayıtsız',
        enabled : true,
        guildOnly : false,
        aliases : ["kayıtsız", "unregister", "unreg"], 
         }
    
    exports.help = {
        help: "kayıtsız [Shewn/ID]",
        cooldown: 3
     }