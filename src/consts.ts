import { LanguageType, ThemeType } from "./types";
import { defaultValue } from "./utils/codeEditorHelpers";

export const initalEditorState = {
  html: defaultValue,
  css: 'p { text-align: center }',
  javascript: "console.log('Hello world')"
};

export const languageOptions: LanguageType[] = [
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
  { id: 'javascript', name: 'JavaScript' }
];

export const themeOptions: ThemeType[] = [
  { id: 'light', name: 'Light' },
  { id: 'dark', name: 'Dark' }
]