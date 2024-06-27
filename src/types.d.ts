export type CodeSnippet = {
  label: string;
  documentation: string;
  body: string;
};

export type CodeEditor = {
  html: string;
  css: string;
  javascript: string;
}

export type LanguageType =
  | { id: 'html', name: 'HTML' }
  | { id: 'css', name: 'CSS' }
  | { id: 'javascript', name: 'JavaScript' }

export type ThemeType =
  | { id: 'light', name: 'Light' }
  | { id: 'dark', name: 'Dark' }

export type User = {
  _id: string,
  googleId: string,
  email: string,
  name: string,
  picture: string,
  sessionToken: string
}

export type UserContextType = {
  user: User | null,
  setUser: (user: User | null) => void
}

export type GooglePayload = {
  iss: string,
  azp: string,
  aud: string,
  sub: string,
  email: string,
  email_verified: boolean,
  nbf: number,
  name: string,
  picture: string,
  given_name: string,
  family_name: string,
  iat: number,
  exp: number,
  jti: string
}

export type AllowedParams = '_id' | 'owner'


