const { MessageEmbed } = require('discord.js')
const Database = require('quick.db')
const kdb = new Database.table("kayıtlar")
const config = require('../config.json')
const ayarlar = require('../ayarlar.json')
const emoji = require('../emoji')

exports.run = async(client, message, args) => {

let embed = new MessageEmbed().setAuthor(message.author.tag,message.author.displayAvatarURL({ dynamic : true })).setColor("000001").setFooter(config.bots.footer)
    
if (!message.member.roles.cache.has(config.roles.owner) && !message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(embed.setDescription(`${message.author} Bu komutu kullanabilmek için yeterli yetkin yok!`)).then(shewn => shewn.delete({timeout : 5000})).then(message.react(emoji.redemoj))

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!member) return message.channel.send(embed.setDescription(`${message.author} Lütfen bir kullanıcı belirtin @Shewn/ID gibi.`)).then(shewn => shewn.delete({timeout : 8000})).then(message.react(emoji.redemoj))
if (member.user.bot) return message.channel.send(embed.setDescription(`${message.author} Botların isimini değiştiremezsin!`)).then(shewn => shewn.delete({timeout : 5000})).then(message.react(emoji.redemoj))
if (member.id === message.author.id) return message.channel.send(embed.setDescription(`${message.author} Kendi ismini değiştiremezsin!`)).then(shewn => shewn.delete({timeout : 5000})).then(message.react(emoji.redemoj))
if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(embed.setDescription(`Bu Kullanıcı Senden Üst veya Aynı Pozisyonda.`)).then(shewn => shewn.delete({timeout : 7000})).then(message.react(emoji.redemoj))   

let isim = args[1]
if(!isim) return message.channel.send(embed.setDescription(`${message.author} bir isim girmelisin!`)).then(shewn => shewn.delete({timeout : 7000})).then(message.react(emoji.redemoj))



let taglı = config.taglar.taglı
let tagsız = config.taglar.tagsız 

kdb.push(`isimler.${member.id}`, `\`${isim}\` (İsim Değiştirme)`)

if (member.user.username.includes(taglı)) {
    await message.guild.members.cache.get(member.id).setNickname(`${taglı} ${isim}`)
    const shewn = new MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .setColor('000001')
    .setDescription(`${member} adlı kullanıcın ismi başarıyla \`${taglı} ${isim}\` olarak değiştirildi ${emoji.onayemoji} `)
    .setFooter(config.bots.footer)
    message.channel.send(shewn)
    message.react(emoji.onayemoji)
    } else {
    
    await message.guild.members.cache.get(member.id).setNickname(`${tagsız} ${isim}`)
    const shewn = new MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .setColor('000001')
    .setDescription(`${member} adlı kullanıcın ismi başarıyla \`${tagsız} ${isim}\` olarak değiştirildi ${emoji.onayemoji} `)
    .setFooter(config.bots.footer)
    message.channel.send(shewn)
    message.react(emoji.onayemoji)
    
 }    


}

    
    exports.conf = {
        name : 'perma-nick',
        enabled : true,
        guildOnly : false,
        aliases : ["pi","permaisim","pn", "permanick"], 
         }
    
    exports.help = {
        help: "perma-nick [Shewn/ID] [isim]",
        cooldown: 5
     }