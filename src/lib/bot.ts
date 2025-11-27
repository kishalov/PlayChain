import { Telegraf } from "telegraf";

const token = process.env.BOT_TOKEN!;
export const bot = new Telegraf(token);

// обработка принятия отзыва
bot.action(/accept_(\d+)/, async (ctx) => {
  const responseId = ctx.match[1];
  await ctx.answerCbQuery();
  await ctx.reply(`Вы приняли отклик. ID: ${responseId}`);
});

// обработка отклонения
bot.action(/reject_(\d+)/, async (ctx) => {
  const responseId = ctx.match[1];
  await ctx.answerCbQuery();
  await ctx.reply(`Вы отклонили отклик. ID: ${responseId}`);
});
