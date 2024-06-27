import { API_URL } from "../config"
import { AllowedParams, CodeEditor } from "../types"

export const getNoteCode = async (by: AllowedParams, value: string, sessionToken: string) => {
  const resp = await fetch(`${API_URL}api/code?${by}=${value}`, {
    headers: {
      'Authorization': `Bearer ${sessionToken}`
    }
  })
  const noteCode = await resp.json()
  return noteCode

}

export const createNoteCode = async (ownerId: string, sessionToken: string, noteCode: CodeEditor) => {
  let resp = await fetch(`${API_URL}api/code`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionToken}`
    },
    body: JSON.stringify({ content: noteCode, owner: ownerId }),
    method: 'POST'
  })
  if (!resp.ok) throw new Error('Error creating a noteCode');


}


export const updateNoteCode = async (noteCodeId: string, noteCode: CodeEditor, sessionToken: string) => {
  const resp = await fetch(`${API_URL}api/code/${noteCodeId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionToken}`
    },
    body: JSON.stringify(noteCode),
    method: 'PUT'
  })

  if (!resp.ok) {
    throw new Error('Error at updating codeEditor');
  }

}