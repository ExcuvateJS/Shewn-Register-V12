const Discord = require("discord.js");
const client = new Discord.Client();
const Database = require('quick.db')
const tdb = new Database.table("taglılar")
const fs = require("fs");
const ms = require("ms");
const moment = require("moment");
const ayarlar = require("./src/ayarlar.json");
const chalk = require('chalk');
const config = require('./src/config.json')
const emoji = require('./src/emoji')
require("moment-duration-format");
require("./src/Util/Loader.js")(client);


var prefix = ayarlar.prefix;
client.cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./src/Admin', (err, files) => { 
  if (err) console.error(err);               
  console.log(`-----------------------------------------------------------\n${files.length} Komut Yüklenecek.\n-----------------------------------------------------------`);
  files.forEach(f => {                       
    let props = require(`./src/Admin/${f}`);   
    console.log(`${props.conf.name} Komutu Yüklendi.`);  
    client.commands.set(props.conf.name, props); 
    props.conf.aliases.forEach(alias => {          
      client.aliases.set(alias, props.conf.name);  
    });
  });
})



fs.readdir('./src/Staff', (err, files) => { 
    if (err) console.error(err);               
    console.log(`-----------------------------------------------------------\n${files.length} Komut Yüklenecek.\n-----------------------------------------------------------`);
    files.forEach(f => {                       
      let props = require(`./src/Staff/${f}`);   
      console.log(`${props.conf.name} Komutu Yüklendi.`);  
      client.commands.set(props.conf.name, props); 
      props.conf.aliases.forEach(alias => {          
        client.aliases.set(alias, props.conf.name);  
      });
    });
  })



  fs.readdir('./src/Staff2', (err, files) => { 
    if (err) console.error(err);               
    console.log(`-----------------------------------------------------------\n${files.length} Komut Yüklenecek.\n-----------------------------------------------------------`);
    files.forEach(f => {                       
      let props = require(`./src/Staff2/${f}`);   
      console.log(`${props.conf.name} Komutu Yüklendi.`);  
      client.commands.set(props.conf.name, props); 
      props.conf.aliases.forEach(alias => {          
        client.aliases.set(alias, props.conf.name);  
      });
    });
  })
  


//----------------------------------------------------------------------------
  
client.on('guildMemberAdd', async (member) => {
    member.setNickname(config.giriş.isim)
    member.roles.add(config.roles.unregisteres)
})

client.on('guildMemberAdd', async (member) => {
    member.setNickname(config.giriş.isim)
    member.roles.add(config.roles.unregisteres)
})
//----------------------------------------------------------------------------
client.on('guildMemberAdd', async (member) => {
  member.setNickname(config.giriş.isim)
  member.roles.add(config.roles.unregisteres)

require('moment-duration-format')
    var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
    var üs = üyesayısı.match(/([0-9])/g)
    üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
    if(üs) {
     üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
       return {
        '0': `0`, 
        '1': `1`,
        '2': `2`,
        '3': `3`,
        '4': `4`,
        '5': `5`,
        '6': `6`,
        '7': `7`,
        '8': `8`,
        '9': `9`}[d];})}
         let user = client.users.cache.get(member.id);
         const kurulus = new Date().getTime() - user.createdAt.getTime();  
         const gecen = moment.duration(kurulus).format(" YY [Yıl] DD [Gün] HH [Saat] mm [Dakika]") 
         var kontrol;
         if (kurulus > 1000 * 60 * 60 * 24 * 10) kontrol = `${emoji.onayemoji}`
         if (kurulus < 1000 * 60 * 60 * 24 * 10) kontrol = `${emoji.redemoj}`
           moment.locale("tr");
        
        let hgembed = new Discord.MessageEmbed()
        .setDescription(`${emoji.shewn} **Sunucumuza Hoş geldin** ${member} 

        ${emoji.shewn} **Seninle Beraber** \``+üyesayısı+`\` **Kişiyiz.**
        
        ${emoji.shewn} **Soldaki ses teyit odalarından birine girerek** <@&${config.roles.register}> **rolüne sahip yetkililerimize teyit verip kayıt ola bilirsin!**
        
        ${emoji.shewn} **${prefix}Tag yazarak bize destek olabilirsin.**

        ${emoji.shewn} **Hesabın oluşturulma tarihi:** \``+gecen+`\`
         **• Güvenilirlik Durumu:** ${kontrol}`)
        .setFooter(`${config.bots.footer} Sunucusuna Hoşgeldin`)
        .setColor("#0f0f69")
       client.channels.cache.get(config.giriş.hoşgeldinKanal).send(hgembed)
       client.channels.cache.get(config.giriş.hoşgeldinKanal).send(`${member}`).then(TekAşkShewn => TekAşkShewn.delete({ timeout : 1000 }))
})


     
//----------------------------------------------------------------------------


client.on("message", message => {
  if(message.author.bot) return;
  let taglar = [`${prefix}tag`, `${prefix}Tag`, `tag`, `Tag`]
      if (taglar.some(t => message.content.toLowerCase() === t)) {
              message.channel.send(`**${config.taglar.tag}**`)
    }
  })


//--------------------------------------------------------------------------------
      client.on("userUpdate", async (oldUser, newUser) => {
        if (oldUser.username !== newUser.username) {
        const tag = config.taglar.tag
        const sunucu = config.giriş.GuildID
        const kanal = config.giriş.taglog
        const rol = config.roles.family
    
        if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has([rol])) {
        await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol)
        await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("#ff0000").setFooter(config.bots.footer).setDescription(`**${newUser} Tagımızı Aldığı İçin Ona <@&${rol}> Rolünü Verdim.**`))
        } else {
          await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol)
          await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("#ff0000").setFooter(config.bots.footer).setDescription(`**${newUser} Tagımızı Çıkardığı İçin Ondan <@&${rol}> Rolünü Aldım.**`))
        }
    }
  });
//--------------------------------------------------------------------------------


      client.on("userUpdate", async (oldUser, newUser) => {
        if (oldUser.username !== newUser.username) {
        const tag = config.taglar.tag
        const sunucu = config.giriş.GuildID
        const kanal = config.giriş.taglog
        const rol = config.roles.femaleRoles
    
      
        let taglıalım = await tdb.fetch(`taglıalım.${sunucu}`)
        if(taglıalım === true){

        if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has([rol])) {
        await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("#ff0000").setFooter(config.bots.footer).setDescription(`**${newUser} Tagımızı Çıkardığı İçin Onu Kayıtsıza Attım.**`))
        await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);

        await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`**<@${newUser.id}>, Sunucumuzda \`${tag}\` Tagımızı Çıkardığına Göre \`@${client.guilds.cache.get(sunucu).roles.cache.get(rol).name}\` Seni Kayıtsıza Atmak Zorundayım.** `)
        }
      }
    }
  });


  client.on("userUpdate", async (oldUser, newUser) => {
    if (oldUser.username !== newUser.username) {
    const tag = config.taglar.tag
    const sunucu = config.giriş.GuildID
    const kanal = config.giriş.taglog
    const rol = config.roles.maleRoles

  
    let taglıalım = await tdb.fetch(`taglıalım.${sunucu}`)
    if(taglıalım === true){

    if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has([rol])) {
    await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("#ff0000").setFooter(config.bots.footer).setDescription(`**${newUser} Tagımızı Çıkardığı İçin Onu Kayıtsıza Attım.**`))
    await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);

    await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`**<@${newUser.id}>, Sunucumuzda \`${tag}\` Tagımızı Çıkardığına Göre \`@${client.guilds.cache.get(sunucu).roles.cache.get(rol).name}\` Seni Kayıtsıza Atmak Zorundayım.** `)
    }
  }
}
});


client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = config.taglar.tag
  const sunucu = config.giriş.GuildID
  const kanal = config.giriş.taglog
  const rol = config.roles.unregisteres


  let taglıalım = await tdb.fetch(`taglıalım.${sunucu}`)
  if(taglıalım === true){

  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has([rol])) {
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("#ff0000").setFooter(config.bots.footer).setDescription(`**${newUser} Tagımızı Çıkardığı İçin Onu Kayıtsıza Attım.**`))  
  }
}
}
});




client.on("guildMemberAdd", async (member) => {
    let sunucu = config.giriş.GuildID
    let tag = config.taglar.tag
    let rol = config.roles.family
    const kanal = config.giriş.taglog

  if(member.user.username.includes(tag)){
    await client.guilds.cache.get(sunucu).members.cache.get(member).roles.add(rol)
    await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("#ff0000").setFooter(config.bots.footer).setDescription(`**${member} Sunucuya Tagımızla Katıldığı İçin Ona <@&${rol}> Rolünü Verdim.**`))
  }
  })


  client.on("guildMemberAdd", async (member) => {
    let sunucu = config.giriş.GuildID;
    let etikettag = config.taglar.etikettag
    let rol = config.roles.family
    const kanal = config.giriş.taglog

  if(member.user.discriminator.includes(etikettag)){
    await client.guilds.cache.get(sunucu).members.cache.get(member).roles.add(rol)
    await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("#ff0000").setFooter(config.bots.footer).setDescription(`**${member} Sunucuya Etiket Tagımızla Katıldığı İçin Ona <@&${rol}> Rolünü Verdim.**`))
  }
  })


//=========================================================================================



//---------------------------- Oto Reboot Başlangıç ----------------------------\\
const shewnreboot = () => {
  process.exit(1);
  };
  
  client.on('ready', () => { 
    console.log(chalk.green`Otomatik bot başlatma sistemi botu yeniden başlattı!`)
   setInterval(() => shewnreboot(),1000 * 60 * 30); //Yeniden Başlatma Süresi
  });
//---------------------------- Oto Reboot Bitiş ----------------------------\\

client.login(ayarlar.token).then(() => console.log(chalk.green`[Shewn? Register] ${client.user.tag} olarak giriş yaptı!`)).catch(() => console.log(chalk.red`[Shewn? Register] Bot giriş yapamadı!`));