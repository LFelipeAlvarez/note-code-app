import { CodeSnippet, LanguageType, ThemeType } from "./types";


export const codeSnippets: CodeSnippet[] = [
  {
    label: '!',
    documentation: 'Basic HTML boilerplate',
    body: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
</body>
</html>
    `
  }]

export const defaultValue = `<html>
  <head>
    <title>HTML Sample</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style type="text/css">
      h1 {
        color: #CCA3A3;
      }
    </style>
    <script type="text/javascript">
      alert("I am a sample... visit devChallengs.io for more projects");
    </script>
  </head>
  <body>
    <h1>Heading No.1</h1>
    <input disabled type="button" value="Click me" />
  </body>
</html>`

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