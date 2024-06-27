import { Snackbar } from '@mui/joy';
import { useUserContext } from '../../hooks/useUserContext';
import './button.css';
import { useState } from 'react';

const Button = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUserContext()

  const handleClick = async () => {
    setOpen(true)
    if (user) {
      await navigator.clipboard.writeText(location.href)
    }
  }

  return (
    <>
      <button onClick={handleClick} className="button">
        <img src="/Share.svg" alt="" />
        Share
      </button>

      <Snackbar
        autoHideDuration={3000}
        open={open}
        variant='outlined'
        color={user ? 'success' : 'warning'}
        onClose={(_event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpen(false);
        }}
      >
        {user ? 'Link has been copied!' : 'Please log in 🙂'}
      </Snackbar>
    </>
  )
}

export default Button