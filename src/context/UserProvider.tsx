import { ReactNode } from 'react'
import UserContext from './UserContext'
import { User } from '../types';
import useLocalStorageState from '../hooks/useLocalStorageState';

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorageState<User | null>('user', null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider