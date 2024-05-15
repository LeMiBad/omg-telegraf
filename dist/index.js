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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const API_1 = require("./API/API");
const initBot_1 = require("./initBot");
const usedBots_1 = require("./usedBots");
API_1.API.users
    .tgTokens()
    .then((users) => {
    console.log(users);
    return users;
})
    .then((users) => users.forEach(initBot_1.initBot));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/init", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { assistant_id, tg_token } = req.body;
        console.log(assistant_id, tg_token);
        const botLink = yield (0, initBot_1.initBot)({ assistant_id, tg_token });
        res.status(200).json(botLink);
    }
    catch (error) {
        console.error("Ошибка инициализации нового бота:", error);
        res.status(500).json({ error: "Ошибка инициализации нового бота" });
    }
}));
app.post("/api/stop", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tg_token } = req.body;
        (0, usedBots_1.stopBot)(tg_token);
        res.status(200).json(tg_token);
    }
    catch (error) {
        console.error("Ошибка инициализации нового бота:", error);
        res.status(500).json({ error: "Ошибка инициализации нового бота" });
    }
}));
app.post("/api/send", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bot_id, chat_id, content } = req.body;
        (0, usedBots_1.sendMessage)({ bot_id, chat_id, content });
    }
    catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
        res.status(500).json({ error: "Ошибка инициализации нового бота" });
    }
}));
app.listen(8080, () => console.log(3333));
