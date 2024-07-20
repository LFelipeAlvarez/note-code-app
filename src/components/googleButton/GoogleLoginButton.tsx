import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useUserContext } from '../../hooks/useUserContext';
import { CodeEditor, GooglePayload } from '../../types';
import { createUser, login } from '../../services/userServices';
import { useNavigate } from 'react-router-dom';
import { createNoteCode, getNoteCode } from '../../services/codeEditor';
import './google-button.css'
import { useState } from 'react';
import { CircularProgress } from '@mui/joy';

const GoogleLoginButton = ({ codeEditor }: { codeEditor: CodeEditor | null }) => {

  const [isLoading, setIsLoading] = useState(false)

  const { setUser } = useUserContext()
  const navigate = useNavigate()

  const onSuccess = async (tokenResponse: CredentialResponse) => {

    try {
      const { credential } = tokenResponse
      if (credential) {
        setIsLoading(true)
        const { sub, email, name, picture } = jwtDecode(credential) as GooglePayload
        const { user, statusResponse } = await createUser(credential)
        const { _id } = user

        const sessionToken = await login(email)
        if (statusResponse === 201 && codeEditor) { //status 201 means that a new User was created
          await createNoteCode(_id, sessionToken, codeEditor)
        }

        const noteCode = await getNoteCode('owner', _id, sessionToken)
        setUser({
          _id,
          googleId: sub,
          email,
          name,
          picture,
          sessionToken
        })
        navigate(`/notecode/${noteCode._id}`);
      }
    } catch (error) {
      console.error('Error on google login, OnSuccess callback: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const onError = () => {
    console.error('Login Failed');
  }

  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></div>

  return (
    <div className='google-button'>
      <GoogleLogin text='signin' onSuccess={onSuccess} onError={onError} />
    </div>
  )
};

export default GoogleLoginButton;