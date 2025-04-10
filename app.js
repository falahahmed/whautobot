const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const webversion = "2.2412.54v2";

const client = new Client({
  puppeteer: {
    args: ["--no-sandbox", "--disable-gpu"],
    headless: true,
    executablePath: "/usr/bin/firefox"
  },
  authStrategy: new LocalAuth({
    dataPath: "auth",
  }),

  webVersion: webversion,
  webVersionCache: {
    type: "remote",
    remotePath: `https://raw.githubusercontent.com/guigo613/alternative-wa-version/main/html/${webversion}.html`,
  },
  restartOnAuthFail: true,
});
console.log('WhatsApp client is starting...');

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

// Listening to all incoming messages
client.on('message_create', message => {
	console.log(message.body);
});

init();


async function init() {
    await client.initialize();
    console.log('WhatsApp client initialized.');
}
