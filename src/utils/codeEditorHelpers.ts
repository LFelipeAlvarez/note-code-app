import { codeSnippets } from "../consts";

export const addCustomSnippets = (monaco: any) => {
  monaco.languages.registerCompletionItemProvider('html', {
    provideCompletionItems: () => {
      const suggestions = codeSnippets.map((snippet) => ({
        label: snippet.label,
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: snippet.documentation,
        insertText: snippet.body,
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }));
      return { suggestions };
    }
  });
};


