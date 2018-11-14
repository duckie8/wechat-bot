const {
  Wechaty
} = require('wechaty')

const bot = new Wechaty({
  name: "张玲亚丫丫丫丫！"
});

bot.on('scan', (url, code) => {
  if (!/201|200/.test(String(code))) {
    let loginUrl = url.replace(/\/qrcode\//, '/l/')
    require('qrcode-terminal').generate(loginUrl,{small:true})
  }
  console.log(`${url}\n[${code}] Scan QR Code in above url to login: `)
})
bot.on('login', user => console.log(`User ${user} logined`))
bot.on('message',send)
bot.start()

async function send(msg){
  console.log(msg)
  if(msg.payload.text==='发送'){
    const helperContactA = await bot.Contact.find({ name: 'v.' })
    await helperContactA.say('张玲亚真可爱啊~~~')
  }
  
}