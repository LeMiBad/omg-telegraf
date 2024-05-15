import axios from "axios";

let host = "https://omg-server-lilac.vercel.app/api/";
// let host = "http://localhost:3000/api/";

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
          { secret: "крякс" },
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
  threads: {
    get: async (thread_id: string) => {
      const thread = (await axios.post(`${host}threads/thread`, { thread_id }))
        .data;

      return thread;
    },
    check: async (data: { tg_chat_id: string; message_id: string }) => {
      const answer = (await axios.post(`${host}threads/check`, data)).data;

      return answer;
    },
    getMany: async (assistant_id: string) => {
      const threads = (await axios.post(`${host}threads`, { assistant_id }))
        .data;

      return threads;
    },
    create: async ({
      assistant_id,
      tg_chat_id,
    }: {
      assistant_id: string;
      tg_chat_id: string;
    }) => {
      const threads = (
        await axios.post(`${host}threads/create`, { assistant_id, tg_chat_id })
      ).data;

      return threads;
    },
    delete: async (token: string, threads_ids: string[]) => {
      const ids = (
        await axios.post(`${host}threads/delete`, { token, threads_ids })
      ).data;

      return ids;
    },
    block: async (thread_id: string, blocked: boolean) => {
      const threads = (
        await axios.post(`${host}threads/block`, { thread_id, blocked })
      ).data;

      return threads;
    },
    sendMessage: async ({
      thread_id,
      message,
      tg_chat_id,
    }: {
      thread_id?: string;
      message: any;
      tg_chat_id: string;
    }) => {
      const threads = (
        await axios.post(`${host}threads/send`, {
          thread_id,
          message,
          tg_chat_id,
        })
      ).data;

      return threads;
    },
  },
  assistants: {
    get: async (token: string) => {
      const assistants = (await axios.post(`${host}assistants`, { token }))
        .data;

      return assistants;
    },
  },
};
