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
exports.usedBots = exports.addBot = exports.sendMessage = exports.stopBot = void 0;
const effector_1 = require("effector");
exports.stopBot = (0, effector_1.createEvent)();
exports.sendMessage = (0, effector_1.createEffect)((_a) => __awaiter(void 0, [_a], void 0, function* ({ bot_id, chat_id, content }) {
    const bots = exports.usedBots.getState();
    const bot = bots === null || bots === void 0 ? void 0 : bots[bot_id];
    if (bot) {
        try {
            yield bot.telegram.sendMessage(chat_id, content);
        }
        catch (error) {
            console.error("Ошибка при отправке сообщения:", error);
        }
    }
}));
exports.addBot = (0, effector_1.createEvent)();
exports.usedBots = (0, effector_1.createStore)({})
    .on(exports.addBot, (bots, { token, bot }) => (Object.assign(Object.assign({}, bots), { [token]: bot })))
    .on(exports.stopBot, (bots, token) => {
    const bot = bots[token];
    console.log(token, bot);
    bot === null || bot === void 0 ? void 0 : bot.stop();
    const actualBots = {};
    Object.entries(bots).forEach(([usedToken, bot]) => {
        if (token !== usedToken) {
            actualBots[usedToken] = bot;
        }
    });
    return actualBots;
});
