const { Telegraf } = require("telegraf");

// Replace 'YOUR_BOT_TOKEN' with the token from BotFather
const BOT_TOKEN = "7122549198:AAGqWggl2uLgxJpDbBWHsQdztAE9a8MVDkI";
const WEBAPP_URL = "https://web-bot-brown.vercel.app/";
const bot = new Telegraf(BOT_TOKEN);

// Handle the /start command
bot.command("start", (ctx) => {
  ctx.reply("Welcome! Click below to open the web app:", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open Web App",
            web_app: { url: WEBAPP_URL }, // Replace with your Vercel URL
          },
        ],
      ],
    },
  });
});

// Optionally, set the menu button to open the web app directly
bot.launch().then(() => {
  bot.telegram.setChatMenuButton({
    menu_button: {
      type: "web_app",
      text: "Open Web App",
      web_app: { url: WEBAPP_URL }, // Replace with your Vercel URL
    },
  });
  console.log("Bot started and menu button set.");
});

// Start the bot
bot.launch();

// Handle graceful shutdown
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
