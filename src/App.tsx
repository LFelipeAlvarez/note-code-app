import './App.css';
import { useEffect } from 'react';
import { CodeEditor } from './types';
import { initalEditorState } from './consts';
import { useUserContext } from './hooks/useUserContext';
import useLocalStorageState from './hooks/useLocalStorageState';
import { useNavigate } from 'react-router-dom';
import { getNoteCode } from './services/codeEditor';
import CodeEditorComponent from './components/codeEditor/CodeEditorComponent';
import GoogleLoginButton from './components/googleButton/GoogleLoginButton';

function App() {
  const [codeEditor, setCodeEditor] = useLocalStorageState<CodeEditor | null>('code', initalEditorState)
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
      />
    </>
  );
}

export default App;
