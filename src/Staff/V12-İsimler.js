const { MessageEmbed } = require('discord.js')
const Database = require('quick.db')
const kdb = new Database.table("kayıtlar")
const config = require('../config.json')
const ayarlar = require('../ayarlar.json')
const emoji = require('../emoji')

exports.run = async(client, message, args) => {

let embed = new MessageEmbed().setAuthor(message.author.tag,message.author.displayAvatarURL({ dynamic : true })).setColor("000001").setFooter(config.bots.footer)
    
if (!message.member.roles.cache.has(config.roles.register) && !message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(embed.setDescription(`${message.author} Bu komutu kullanabilmek için yeterli yetkin yok!`)).then(shewn => shewn.delete({timeout : 5000})).then(message.react(emoji.redemoj))

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!member) return message.channel.send(embed.setDescription(`${message.author} Lütfen bir kullanıcı belirtin @Shewn/ID gibi.`)).then(shewn => shewn.delete({timeout : 8000})).then(message.react(emoji.redemoj))

if (member.user.bot) return message.channel.send(embed.setDescription(`${message.author} Botların isim geçmişi olmaz !`)).then(shewn => shewn.delete({timeout : 5000})).then(message.react(emoji.redemoj))

let isimler = kdb.get(`isimler.${member.user.id}`);
if (!isimler) return message.channel.send(new MessageEmbed().setAuthor(message.author.tag,message.author.displayAvatarURL({dynamic:true})).setColor('000001').setDescription(`Bu Kullanıcının Toplam "0" Kayıtlı İsmi Bulundu`)).then(shewn => shewn.delete({timeout:10000}))
let isimlersayı = `${kdb.fetch(`isimler.${member.id}`).length} `
let isimleri = `${isimler.map((data, i) => `**${i + 1}.** ${data}`).join("\n")}`

const shewn = new MessageEmbed()
    .setColor('000001')
    .setDescription(`
     ${isimlersayı} İsimle kayıt olmuş, 
    
    ${isimleri}`)
    .setFooter(config.bots.footer)
    .setTimestamp()
message.channel.send(shewn)
}

    
    exports.conf = {
        name : 'isimler',
        enabled : true,
        guildOnly : false,
        aliases : [], 
         }
    
    exports.help = {
        help: "isimler [Shewn/ID]",
        cooldown: 3
     }
    