import { createEffect, createEvent, createStore } from "effector";
import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

type InstansBot = Telegraf<Context<Update>>;

interface UsedBots {
  [token: string]: InstansBot;
}

interface SendMessageProps {
  bot_id: string;
  chat_id: string;
  content: string;
}

export const stopBot = createEvent<string>();
export const sendMessage = createEffect(
  async ({ bot_id, chat_id, content }: SendMessageProps) => {
    const bots = usedBots.getState();
    const bot = bots?.[bot_id];

    if (bot) {
      try {
        await bot.telegram.sendMessage(chat_id, content);
      } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
      }
    }
  }
);

export const addBot = createEvent<{ token: string; bot: InstansBot }>();
export const usedBots = createStore<UsedBots>({})
  .on(addBot, (bots, { token, bot }) => ({ ...bots, [token]: bot }))
  .on(stopBot, (bots, token) => {
    const bot = bots[token];
    console.log(token, bot);
    bot?.stop();

    const actualBots: UsedBots = {};

    Object.entries(bots).forEach(([usedToken, bot]) => {
      if (token !== usedToken) {
        actualBots[usedToken] = bot;
      }
    });

    return actualBots;
  });
