const { MessageEmbed } = require('discord.js')
const Database = require('quick.db')
const kdb = new Database.table("kayıtlar")
const config = require('../config.json')
const ayarlar = require('../ayarlar.json')
const emoji = require('../emoji')

exports.run = async(client, message, args) => {

let embed = new MessageEmbed().setAuthor(message.author.tag,message.author.displayAvatarURL({ dynamic : true })).setColor("000001").setFooter(config.bots.footer)
    
if (!message.member.roles.cache.has(config.roles.abality) && !message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(embed.setDescription(`${message.author} Bu komutu kullanabilmek için yeterli yetkin yok!`)).then(shewn => shewn.delete({timeout : 5000})).then(message.react(emoji.redemoj))

let member = (message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member)
if (!member) return message.channel.send(embed.setDescription(`${message.author} Lütfen bir kullanıcı belirtin @Shewn/ID gibi.`)).then(shewn => shewn.delete({timeout : 8000})).then(message.react(emoji.redemoj))

let kadın = kdb.fetch(`kadın.${member.user.id}.${message.guild.id}`)  || "Bulunamadı"
let erkek = kdb.fetch(`erkek.${member.user.id}.${message.guild.id}`)  || "Bulunamadı"
let toplam = kdb.fetch(`teyit.${member.user.id}.${message.guild.id}`) || "Bulunamadı"

message.channel.send(embed.setDescription(`

${message.author}  kayıt datası aşağıda verilmiştir;

\`•\` Erkek Kayıt Sayın \`${erkek}\`
\`•\` Kadın Kayıt Sayın \`${kadın}\`
\`•\` Toplam Kayıt Sayın \`${toplam}\``))

}

    
    exports.conf = {
        name : 'stat',
        enabled : true,
        guildOnly : false,
        aliases : ["me","kayıtlarım"], 
         }
    
    exports.help = {
        help: "stat [Shewn/ID]",
        cooldown: 2
     }
    