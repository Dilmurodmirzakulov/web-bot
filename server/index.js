// server/index.js
const express = require("express");
const { Telegraf } = require("telegraf");

const BOT_TOKEN = "7122549198:AAGqWggl2uLgxJpDbBWHsQdztAE9a8MVDkI";
const WEBAPP_URL = "https://web-bot-brown.vercel.app/"; // Must be HTTPS & set in BotFather

const bot = new Telegraf(BOT_TOKEN);

// Basic commands:
bot.start((ctx) => {
  return ctx.reply("Welcome! Open our WebApp below:", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Open Exchange WebApp",
            web_app: { url: WEBAPP_URL },
          },
        ],
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  });
});

bot.help((ctx) => ctx.reply("Send /start"));

// Launch the bot with long polling, then set a global Chat Menu Button
bot.launch().then(async () => {
  console.log("Bot started with long polling!");
  try {
    await bot.telegram.setChatMenuButton({
      menu_button: {
        type: "web_app",
        text: "Open Exchange WebApp",
        web_app: { url: WEBAPP_URL },
      },
    });
    console.log("Chat menu button set successfully!");
  } catch (err) {
    console.error("Error setting chat menu button:", err);
  }
});

// Express server for any extra endpoints
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server up and running");
});

app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});

// Graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
