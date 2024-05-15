"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBot = void 0;
const telegraf_1 = require("telegraf");
const API_1 = require("./API/API");
const usedBots_1 = require("./usedBots");
const initBot = (_a) => __awaiter(void 0, [_a], void 0, function* ({ assistant_id, tg_token }) {
    const bot = new telegraf_1.Telegraf(tg_token);
    (0, usedBots_1.addBot)({ token: tg_token, bot });
    bot.start((ctx) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(assistant_id, tg_token);
        try {
            console.log("Бот стартовал:", ctx.chat.id);
            yield API_1.API.threads.create({
                assistant_id,
                tg_chat_id: String(ctx.chat.id),
            });
            ctx.reply("Напиши первое сообщение");
        }
        catch (error) {
            console.error("Ошибка при создании нити:", error);
            ctx.reply("Произошла ошибка при создании нити.");
        }
    }));
    bot.on("text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userMessage = ctx.message.text;
            const tg_chat_id = String(ctx.chat.id);
            const message = yield API_1.API.threads.sendMessage({
                message: { role: "user", content: userMessage },
                tg_chat_id,
            });
            const waitAnswer = (tg_chat_id, message_id) => {
                return new Promise((resolve, reject) => {
                    const checkInterval = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
                        try {
                            const answer = yield API_1.API.threads.check({
                                tg_chat_id,
                                message_id,
                            });
                            console.log(answer);
                            if (answer) {
                                clearInterval(checkInterval);
                                resolve(answer);
                            }
                        }
                        catch (error) {
                            clearInterval(checkInterval);
                            reject("Ошибка при проверке ответа от ассистента");
                        }
                    }), 1000);
                });
            };
            const answer = yield waitAnswer(tg_chat_id, message.id);
            ctx.reply(answer);
        }
        catch (error) {
            console.error("Ошибка при отправке сообщения:", error);
            ctx.reply("Произошла ошибка при отправке сообщения.");
        }
    }));
    bot.launch();
    try {
        const botInfo = yield bot.telegram.getMe();
        return `https://t.me/${botInfo.username}`;
    }
    catch (error) {
        console.error("Ошибка при получении информации о боте:", error);
        throw new Error("Не удалось получить информацию о боте.");
    }
});
exports.initBot = initBot;
