import { CredentialResponse } from "@react-oauth/google";
import { User } from "../types";
import { API_URL } from "../config";

export const createUser = async (credential: CredentialResponse['credential']) => {
  let resp = await fetch(`${API_URL}api/user`, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: credential }),
    method: 'POST'
  })

  if (!resp.ok) throw new Error('Error at trying login');
  const user: User = await resp.json()
  return { user, statusResponse: resp.status }

}


export const login = async (email: string): Promise<string> => {
  const resp = await fetch(`${API_URL}api/auth/login`, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email }),
    method: 'POST'
  })

  if (!resp.ok) throw new Error('Error at trying login');

  const { sessionToken } = await resp.json()
  return sessionToken
}