export type RoleTypes = "user" | "assistant";

export interface newChatConfig {
  context?: string;
  firstBotMessage?: string;
}

export interface CompanyDataForm {
  companyAboutInfo: {
    companyName: string;
    age?: string;
  };
  assistantName: string;
  targetAction?: string;
}

export interface UserSettings {
  company_name: string;
  company_age?: string;
  assistant_name: string;
  target_action?: string;
}

export interface CompanyData extends CompanyDataForm {
  chat_name: string;
  chat_id: string;
}

export interface Error {
  message: string;
}

export interface User {
  email: string;
  is_confirmed: boolean;
  token?: string;
  permits: string[];
}

export type OpenaiModels =
  | "gpt-4-0125-preview"
  | "gpt-4-turbo-preview"
  | "gpt-4-1106-preview"
  | "gpt-4-vision-preview"
  | "gpt-4"
  | "gpt-4-0314"
  | "gpt-4-0613"
  | "gpt-4-32k"
  | "gpt-4-32k-0314"
  | "gpt-4-32k-0613"
  | "gpt-3.5-turbo"
  | "gpt-3.5-turbo-16k"
  | "gpt-3.5-turbo-0301"
  | "gpt-3.5-turbo-0613"
  | "gpt-3.5-turbo-1106"
  | "gpt-3.5-turbo-0125"
  | "gpt-3.5-turbo-16k-0613";

export interface AssistantSettings {
  name: string;
  role: string;
  org_info: string;
  answer_length: string;
  target: string;
}

export interface Message {
  metadata: {
    role: RoleTypes;
  };
  role: RoleTypes;
  // content: MessageContentText[];
}
