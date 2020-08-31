
import { handleStart } from "botcontroller/auth"
const { Telegraf } = require("telegraf")
const bot = new Telegraf(process.env.BOT_TOKEN)


bot.start(async ctx => {
  console.log(ctx.message.from.id)
  const data = await handleStart(ctx.message.from)

  console.log("====da", data)

  return ctx.reply(data)
})


bot.launch()
