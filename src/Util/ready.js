const config = require('../config.json')

module.exports = client => {
    client.user.setPresence({ activity: {name: config.bots.activity}, type: config.bots.type, status: config.bots.status})
    client.channels.cache.get(config.bots.VoiceChannel).join(config.bots.VoiceChannel)
  }