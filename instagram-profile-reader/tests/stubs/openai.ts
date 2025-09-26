type ChatMessage = {
  content?: string;
};

type ChatCompletionResponse = {
  choices: Array<{ message?: ChatMessage }>;
};

export default class OpenAI {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  constructor(_config?: unknown) {}

  chat = {
    completions: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      create: async (_request: unknown): Promise<ChatCompletionResponse> => ({
        choices: []
      })
    }
  };
}
