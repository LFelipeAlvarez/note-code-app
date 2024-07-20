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

  const ArrowDown01Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#9b9b9b"} fill={"none"} {...props}>
      <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <header>
      <div className='logo-container'>
        <img src="/NoteCodeLogo.svg" alt="logo" />
        {user && <Dropdown open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
          <MenuButton
            endDecorator={<ArrowDown01Icon />}
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