import { useEffect, useRef, useState } from 'react';
import { CodeEditor, LanguageType } from '../../types';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';
import { languageOptions } from '../../consts';
import CodeEditorComponent from '../../components/codeEditor/CodeEditorComponent';
import { getNoteCode, updateNoteCode } from '../../services/codeEditor';
import useDebounce from '../../hooks/useDebounce';
import './user-logged.css';

function AppWithUserLogged() {
  const [codeEditor, setCodeEditor] = useState<CodeEditor | null>(null)
  const debouncedCodeEditor = useDebounce<CodeEditor | null>(codeEditor)
  const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(languageOptions[0]);
  const [isNoteCodeIdFound, setIsNoteCodeIdFound] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const lastEditorCodeRef = useRef()

  const { user, setUser } = useUserContext()
  const { id: noteCodeId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    if (!user?._id) {
      navigate('/')
      return
    }

    (async () => {
      const { sessionToken } = user
      setIsLoading(true)
      let noteCode = await getNoteCode('_id', noteCodeId!, sessionToken)
      if (noteCode.message === 'Not authorized') {
        setUser(null)
        navigate('/')
        return
      }
      if (!noteCode?.content) {
        setIsNoteCodeIdFound(false)
        return
      }
      setCodeEditor(noteCode.content)
      if (lastEditorCodeRef.current === undefined) lastEditorCodeRef.current = noteCode.content
      setIsLoading(false)

    })()

  }, []);

  useEffect(() => {
    (async () => {
      if (
        user && noteCodeId && debouncedCodeEditor &&
        JSON.stringify(codeEditor) !== JSON.stringify(lastEditorCodeRef.current) //This conditional avoids to make an update request on the first change, which is unnecessary
      ) {
        try {
          await updateNoteCode(noteCodeId, debouncedCodeEditor, user.sessionToken)
        } catch (error) {
          alert('Session expired')
          navigate('/')
        }
      }
    })()
  }, [debouncedCodeEditor])

  if (!isNoteCodeIdFound) return <div>404 Not found</div>

  const logOut = () => {
    setUser(null)
    navigate('/')
  }


  return (
    isLoading || codeEditor === null
      ? <p>Loading...</p>
      : <>
        <p className='user-info'>
          <img src={user?.picture} alt="user picture" />
          <button onClick={logOut}>← Log out</button>
        </p>
        <CodeEditorComponent
          code={codeEditor}
          setCode={setCodeEditor}
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
        />
      </>
  )
}

export default AppWithUserLogged;
