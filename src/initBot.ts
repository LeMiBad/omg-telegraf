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
    console.log(assistant_id, tg_token);
    try {
      console.log("Бот стартовал:", ctx.chat.id);
      await API.threads.create({
        assistant_id,
        tg_chat_id: String(ctx.chat.id),
      });
      ctx.reply("Напиши первое сообщение");
    } catch (error) {
      console.error("Ошибка при создании нити:", error);
      ctx.reply("Произошла ошибка при создании нити.");
    }
  });

  bot.on("text", async (ctx) => {
    try {
      const userMessage = ctx.message.text;
      const tg_chat_id = String(ctx.chat.id);

      const message = await API.threads.sendMessage({
        message: { role: "user", content: userMessage },
        tg_chat_id,
      });

      const waitAnswer = (tg_chat_id: string, message_id: string) => {
        return new Promise<string>((resolve, reject) => {
          const checkInterval = setInterval(async () => {
            try {
              const answer = await API.threads.check({
                tg_chat_id,
                message_id,
              });
              console.log(answer);

              if (answer) {
                clearInterval(checkInterval);
                resolve(answer);
              }
            } catch (error) {
              clearInterval(checkInterval);
              reject("Ошибка при проверке ответа от ассистента");
            }
          }, 1000);
        });
      };

      const answer = await waitAnswer(tg_chat_id, message.id);
      ctx.reply(answer);
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
      ctx.reply("Произошла ошибка при отправке сообщения.");
    }
  });

  bot.launch({
    webhook: {
      domain: `https://bbai9tnn5s742uoj37nf.containers.yandexcloud.net/`,
      port: 443,
      hookPath: "/webhook",
    },
  });

  try {
    const botInfo = await bot.telegram.getMe();
    return `https://t.me/${botInfo.username}`;
  } catch (error) {
    console.error("Ошибка при получении информации о боте:", error);
    throw new Error("Не удалось получить информацию о боте.");
  }
};
