import { useUserContext } from '../../hooks/useUserContext'
import './header.css'
import { useState } from 'react'

import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/joy';

const Header = () => {
  const { user, setUser } = useUserContext()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const logOut = () => {
    setUser(null)
    setIsOpen(false);
    navigate('/')
  }


  return (
    <header>
      <div className='logo-container'>
        <img src="/NoteCodeLogo.svg" alt="logo" />
        {user && <Dropdown open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
          >
            <img src={user?.picture} alt="user picture" />
          </MenuButton>
          <Menu>
            <MenuItem onClick={logOut}>Logout</MenuItem>
          </Menu>
        </Dropdown>}
      </div>
      <h1>Create & Share</h1>
      <h2>Your Code easily</h2>
    </header >
  )
}

export default Header