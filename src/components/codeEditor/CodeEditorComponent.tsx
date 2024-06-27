import { Editor, useMonaco } from '@monaco-editor/react'
import React, { useCallback, useEffect, useState } from 'react'
import { languageOptions, themeOptions } from '../../consts';
import { CodeEditor, LanguageType, ThemeType } from '../../types';
import { AspectRatio, Card, Skeleton } from '@mui/joy';
import Select from '../select/Select';
import Button from '../button/Button';
import { addCustomSnippets } from '../../utils/codeEditorHelpers';

type Props = {
  code: CodeEditor,
  setCode: React.Dispatch<React.SetStateAction<CodeEditor | null>>,
}

const CodeEditorComponent = ({ code, setCode }: Props) => {
  const [editorTheme, setEditorTheme] = useState<ThemeType>(themeOptions[0])
  const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(languageOptions[0]);

  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      addCustomSnippets(monaco);
    }
  }, [monaco]);

  const handleEditorChange = useCallback(async (value: string | undefined) => {
    const newCode = { ...code, [currentLanguage.id]: value }
    if (JSON.stringify(code) === JSON.stringify(newCode)) return
    setCode(newCode);
  }, [currentLanguage])

  return (
    <div className={editorTheme.id === 'dark' ? "editor-container editor-container--dark" : 'editor-container'}>
      <Editor
        height="100"
        theme={`vs-${editorTheme.id}`}
        className="editor"
        language={currentLanguage.id}
        value={code[currentLanguage.id]}
        onChange={handleEditorChange}
        options={{
          padding: {
            top: 20,
            bottom: 20
          },
          automaticLayout: true,
          scrollbar: {
            verticalScrollbarSize: 5,
            alwaysConsumeMouseWheel: false
          }
        }}
        loading={
          <Card className="editor" sx={{ width: '100%', overflowY: 'hidden' }}>
            <AspectRatio ratio="9/11">
              <Skeleton variant="overlay" animation={'wave'}>
                <img alt="" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" />
              </Skeleton>
            </AspectRatio>
          </Card>
        }
      />
      <div className="editor__footer">
        <div className="button-group">
          <Select options={languageOptions} value={currentLanguage} onChange={setCurrentLanguage} />
          <Select options={themeOptions} value={editorTheme} onChange={setEditorTheme} />
        </div>
        <div className="button-group">
          <Button />
        </div>

      </div>
    </div>
  )
}

export default CodeEditorComponent