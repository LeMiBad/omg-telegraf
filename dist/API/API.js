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
exports.API = void 0;
const axios_1 = __importDefault(require("axios"));
let host = "https://omg-server-lilac.vercel.app/api/";
// let host = "http://localhost:3000/api/";
exports.API = {
    users: {
        login: (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
            const user = (yield axios_1.default.post(`${host}users/login`, { email, password }, { withCredentials: false })).data;
            return user;
        }),
        tgTokens: () => __awaiter(void 0, void 0, void 0, function* () {
            const tokens = (yield axios_1.default.post(`${host}users/tgTokens`, { secret: "крякс" }, { withCredentials: false })).data;
            return tokens;
        }),
        sugnup: (_b) => __awaiter(void 0, [_b], void 0, function* ({ email, password, }) {
            const user = (yield axios_1.default.post(`${host}users/signup`, { email, password }, { withCredentials: false })).data;
            return user;
        }),
    },
    threads: {
        get: (thread_id) => __awaiter(void 0, void 0, void 0, function* () {
            const thread = (yield axios_1.default.post(`${host}threads/thread`, { thread_id }))
                .data;
            return thread;
        }),
        check: (data) => __awaiter(void 0, void 0, void 0, function* () {
            const answer = (yield axios_1.default.post(`${host}threads/check`, data)).data;
            return answer;
        }),
        getMany: (assistant_id) => __awaiter(void 0, void 0, void 0, function* () {
            const threads = (yield axios_1.default.post(`${host}threads`, { assistant_id }))
                .data;
            return threads;
        }),
        create: (_c) => __awaiter(void 0, [_c], void 0, function* ({ assistant_id, tg_chat_id, }) {
            const threads = (yield axios_1.default.post(`${host}threads/create`, { assistant_id, tg_chat_id })).data;
            return threads;
        }),
        delete: (token, threads_ids) => __awaiter(void 0, void 0, void 0, function* () {
            const ids = (yield axios_1.default.post(`${host}threads/delete`, { token, threads_ids })).data;
            return ids;
        }),
        block: (thread_id, blocked) => __awaiter(void 0, void 0, void 0, function* () {
            const threads = (yield axios_1.default.post(`${host}threads/block`, { thread_id, blocked })).data;
            return threads;
        }),
        sendMessage: (_d) => __awaiter(void 0, [_d], void 0, function* ({ thread_id, message, tg_chat_id, }) {
            const threads = (yield axios_1.default.post(`${host}threads/send`, {
                thread_id,
                message,
                tg_chat_id,
            })).data;
            return threads;
        }),
    },
    assistants: {
        get: (token) => __awaiter(void 0, void 0, void 0, function* () {
            const assistants = (yield axios_1.default.post(`${host}assistants`, { token }))
                .data;
            return assistants;
        }),
    },
};
