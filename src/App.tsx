import './App.css';
import { useEffect, useState } from 'react';
import { CodeEditor, LanguageType } from './types';
import { initalEditorState, languageOptions } from './consts';
import GoogleLoginButton from './components/googleButton/GoogleLoginButton';
import { useUserContext } from './hooks/useUserContext';
import useLocalStorageState from './hooks/useLocalStorageState';
import { useNavigate } from 'react-router-dom';
import { getNoteCode } from './services/codeEditor';
import CodeEditorComponent from './components/codeEditor/CodeEditorComponent';

function App() {
  const [codeEditor, setCodeEditor] = useLocalStorageState<CodeEditor | null>('code', initalEditorState)
  const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(languageOptions[0]);
  const { user } = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.email) {
      (async () => {
        const noteCode = await getNoteCode('owner', user._id, user.sessionToken)
        navigate(`/notecode/${noteCode._id}`);
      })()
      return
    }

  }, []);


  return (
    codeEditor &&
    <>
      <GoogleLoginButton codeEditor={codeEditor} />
      <CodeEditorComponent
        code={codeEditor}
        setCode={setCodeEditor}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
      />
    </>
  );
}

export default App;
