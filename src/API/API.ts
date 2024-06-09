import axios from "axios";

// let host = "http://localhost:3000/api/";
let host = "http://147.45.239.167/api/";

const secret = "5fd49436-2965-45f3-b1a1-0bb1eef7d6bd";

export const API = {
  users: {
    login: async ({ email, password }: { email: string; password: string }) => {
      const user = (
        await axios.post(
          `${host}users/login`,
          { email, password },
          { withCredentials: false }
        )
      ).data;

      return user;
    },
    tgTokens: async () => {
      const tokens = (
        await axios.post(
          `${host}users/tgTokens`,
          { secret },
          { withCredentials: false }
        )
      ).data;

      return tokens;
    },
    sugnup: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const user = (
        await axios.post(
          `${host}users/signup`,
          { email, password },
          { withCredentials: false }
        )
      ).data;

      return user;
    },
  },
  chats: {
    get: async (thread_id: string) => {
      const thread = (await axios.post(`${host}chats/thread`, { thread_id }))
        .data;

      return thread;
    },
    check: async (data: { tg_chats_id: string; message_id: string }) => {
      const answer = (await axios.post(`${host}chats/check`, data)).data;

      return answer;
    },
    getMany: async (assistant_id: string) => {
      const chats = (await axios.post(`${host}chats`, { assistant_id })).data;

      return chats;
    },
    create: async ({
      assistant_id,
      id,
    }: {
      assistant_id: string;
      id: string;
    }) => {
      const chats = (
        await axios.post(`${host}chat/create`, {
          id,
          assistant_id,
          integration_type: "tg",
        })
      ).data;

      return chats;
    },
    delete: async (token: string, chats_ids: string[]) => {
      const ids = (
        await axios.post(`${host}chats/delete`, { token, chats_ids })
      ).data;

      return ids;
    },
    block: async (thread_id: string, blocked: boolean) => {
      const chats = (
        await axios.post(`${host}chats/block`, { thread_id, blocked })
      ).data;

      return chats;
    },
    sendMessage: async ({
      chat_id,
      message,
    }: {
      chat_id?: string;
      message: any;
    }) => {
      const chats = (
        await axios.post(`${host}chat/send`, {
          chat_id,
          message,
        })
      ).data;

      return chats;
    },
  },
  assistants: {
    get: async (token: string) => {
      const assistants = (await axios.post(`${host}assistant`, { token }))
        .data;

      return assistants;
    },
    addNotificationToken: async ({chat_id, assistant_id}: {chat_id: string, assistant_id: string}) => {
      const tokens = (
        await axios.post(
          `${host}assistant/tg/notification`,
          { secret, chat_id, assistant_id },
          { withCredentials: false }
        )
      ).data;

      return tokens;
    },
  },
};
