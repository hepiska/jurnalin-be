"use strict";

var _auth = require("botcontroller/auth");

const {
  Telegraf
} = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(async ctx => {
  console.log(ctx.message.from.id);
  const data = await (0, _auth.handleStart)(ctx.message.from);
  console.log("====da", data);
  return ctx.reply(data);
});
bot.launch();