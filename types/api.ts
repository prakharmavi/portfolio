export type FastmanStreamEvent = {
  type: string;
  data: unknown;
};

export type FastmanMessage = {
  role: "user" | "assistant";
  content: string;
};

export type AskPrakharRequest = {
  messages: FastmanMessage[];
};
