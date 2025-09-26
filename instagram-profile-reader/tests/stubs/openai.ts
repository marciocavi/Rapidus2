export default class OpenAI {
  chat = {
    completions: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      create: async (_request: unknown) => ({ choices: [] })
    }
  };
}
