import 'dotenv/config'
import axios from 'axios'
import linebot from 'linebot'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOK
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啓動')
})

bot.on('message', async (event) => {
  if (event.message.type === 'text') {
    if (event.message.text.startsWith('!name ')) {
      const name = event.message.text.replace('!name ', '')
      console.log(name)
      try {
        const { data } = await axios.get('https://api.holotools.app/v1/live')
        for (const info of data.live) {
          if (info.status === name) {
            console.log(info.channel.name)
            event.reply(info.channel.name)
            return
          }
        }
        event.reply('找不到')
      } catch (error) {
        console.log(error)
        event.reply('發生錯誤')
      }
    }
  }
})
