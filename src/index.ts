import express from "express";
import { API } from "./API/API";
import { initBot } from "./initBot";
import { sendMessage, stopBot } from "./usedBots";

API.users
  .tgTokens()
  .then((users) => {
    console.log(users);
    return users;
  })
  .then((users) => users.forEach(initBot));

const app = express();

app.use(express.json());

app.post("/api/init", async (req, res) => {
  try {
    const { assistant_id, tg_token } = req.body;

    const botLink = await initBot({ assistant_id, tg_token });

    res.status(200).json(botLink);
  } catch (error) {
    console.error("Ошибка инициализации нового бота:", error);
    res.status(500).json({ error: "Ошибка инициализации нового бота" });
  }
});

app.post("/api/stop", async (req, res) => {
  try {
    const { tg_token } = req.body;

    stopBot(tg_token);

    res.status(200).json(tg_token);
  } catch (error) {
    console.error("Ошибка инициализации нового бота:", error);
    res.status(500).json({ error: "Ошибка инициализации нового бота" });
  }
});

app.post("/api/send", async (req, res) => {
  try {
    const { bot_id, chat_id, content } = req.body;

    sendMessage({ bot_id, chat_id, content });
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error);
    res.status(500).json({ error: "Ошибка инициализации нового бота" });
  }
});

app.listen(8080, () => console.log(3333));
