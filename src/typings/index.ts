export type OpenAIModel = 'gpt-3.5-turbo' | 'gpt-4'
export interface ITranslateBody {
  inputLanguage: string
  outputLanguage: string
  inputCode: string
  model: OpenAIModel
  apiKey: string
}
