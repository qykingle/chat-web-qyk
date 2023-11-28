import endent from 'endent'

export const createPrompt = (
  inputLanguage: string,
  outputLanguage: string,
  inputCode: string,
) => {
  if (inputLanguage === 'Natural Language') {
    return endent`
    You are an expert programmer in all programming languages. Translate the natural language to "${outputLanguage}" code. Do not include \`\`\`.

    Example translating from natural language to JavaScript:

    Natural language:
    Print the numbers 0 to 9.

    JavaScript code:
    for (let i = 0; i < 10; i++) {
      console.log(i);
    }

    Natural language:
    ${inputCode}

    ${outputLanguage} code (no \`\`\`):
    `
  }
  else if (outputLanguage === 'Natural Language') {
    return endent`
      You are an expert programmer in all programming languages. Translate the "${inputLanguage}" code to natural language in plain English that the average adult could understand. Respond as bullet points starting with -.

      Example translating from JavaScript to natural language:

      JavaScript code:
      for (let i = 0; i < 10; i++) {
        console.log(i);
      }

      Natural language:
      Print the numbers 0 to 9.

      ${inputLanguage} code:
      ${inputCode}

      Natural language:
     `
  }
  else {
    return endent`
      You are an expert programmer in all programming languages. Translate the "${inputLanguage}" code to "${outputLanguage}" code.请直接输出源码字符串，不需要使用markdown语言对结果进行优化。

      Example translating from JavaScript to Python:

      JavaScript code:
      for (let i = 0; i < 10; i++) {
        console.log(i);
      }

      Python code:
      for i in range(10):
        print(i)

      Output Example:
      for i in range(10):
        print(i)

      ${inputLanguage} code:
      ${inputCode}

      ${outputLanguage} code (no \`\`\`):
     `
  }
}

export function generatePrompts(sourceLang: string, targetLang: string, text: string) {
  return endent`
      You are a translator, translate directly without explanation.Translate the "${sourceLang}" language to "${targetLang}" language.请直接进行翻译，不需要解释。

      Example translating from English to Simplified Chinese:

      English:
      hello, world!

      Simplified Chinese:
      你好，世界！

      ${sourceLang}:
      ${text}

      ${targetLang} language (no \`\`\`):
     `
}
