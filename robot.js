const {
  Wechaty
} = require('wechaty');
const axios = require('axios');

const bot = new Wechaty({
  name: "张玲亚丫丫丫丫！"
});

bot.on('scan', (url, code) => {
  if (!/201|200/.test(String(code))) {
    let loginUrl = url.replace(/\/qrcode\//, '/l/')
    require('qrcode-terminal').generate(loginUrl, {
      small: true
    })
  }
  console.log(`${url}\n[${code}] Scan QR Code in above url to login: `)
})
bot.on('login', user => console.log(`User ${user} logined`))
bot.on('message', send)
bot.start()

async function send(msg) {
  if (msg.self()) {
    return
  }
  const contact = msg.from()
  const text = msg.text()
  const room = msg.room()
  let json = {
    "reqType": 0,
    "perception": {
      "inputText": {
        "text": text
      }
    },
    "userInfo": {
      "apiKey": "d78796e6c234415ebb400df68516fecb",
      "userId": msg.id
    }
  }

  if (room) {
    const title = await room.topic();
    if (title === '哎呦，程序员了不起？') {
      const results = await axios.post('http://openapi.tuling123.com/openapi/api/v2', JSON.stringify(json))
      let data = results.data
      let res = data.results
      res = res[0]
      room.say(res.values.text)
    }
  } else {
    const results = await axios.post('http://openapi.tuling123.com/openapi/api/v2', JSON.stringify(json))
    let data = results.data
    let res = data.results
    res = res[0]
    console.log(res)
    contact.say(res.values.text)
  }
}