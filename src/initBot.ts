import { Telegraf } from "telegraf";
import { API } from "./API/API";
import { addBot } from "./usedBots";

interface BotConfig {
  assistant_id: string;
  tg_token: string;
}

export const initBot = async ({ assistant_id, tg_token }: BotConfig) => {
  const bot = new Telegraf(tg_token);

  addBot({ token: tg_token, bot });

  bot.start(async (ctx) => {
    try {
      const tg_chat_id = `${String(ctx.chat.id)}@${String(assistant_id)}`;

      await API.chats.create({
        assistant_id,
        id: tg_chat_id,
      });
      ctx.reply("Напиши первое сообщение");
    } catch (error) {
      console.error("Ошибка при создании нити:", error);
      ctx.reply("Произошла ошибка при создании нити.");
    }
  });

  bot.command('set_notification_chat', (ctx) => {
    API.assistants.addNotificationToken({ chat_id: String(ctx.chat.id), assistant_id })

    ctx.reply("Теперь я буду отправлять оповещения сюда");
  });

  bot.on("text", async (ctx) => {
    try {
      const userMessage = ctx.message.text;
      const tg_chat_id = `${String(ctx.chat.id)}@${String(assistant_id)}`;

      console.log(userMessage);
      console.log(assistant_id);

      let message;

      try {
        message = await API.chats.sendMessage({
          chat_id: tg_chat_id,
          message: { role: "USER", message: userMessage },
        });
      } catch {
        await API.chats.create({
          assistant_id,
          id: tg_chat_id,
        });

        message = await API.chats.sendMessage({
          chat_id: tg_chat_id,
          message: { role: "USER", message: userMessage },
        });
      }

      ctx.reply(message.text);
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
      ctx.reply("Произошла ошибка при отправке сообщения.");
    }
  });

  bot.launch();

  try {
    const botInfo = await bot.telegram.getMe();

    return `https://t.me/${botInfo.username}`;
  } catch (error) {
    console.error("Ошибка при получении информации о боте:", error);
    throw new Error("Не удалось получить информацию о боте.");
  }
};
