
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SignInPopup from '../Auth/SignInPopup';
import SignUpPopup from '../Auth/SignUpPopup';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SigninModal() {
  const [open, setOpen] = React.useState(false);
  const [isSignIn, setIsSignIn] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSignInClick = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        {/* Open modal */}
        <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: 'white' }}>
            login
          </Typography>
        </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isSignIn ? (
            <SignInPopup onClose={handleClose} />
          ) : (
            <SignUpPopup onClose={handleClose} />
          )}
          {
            isSignIn ?(
            <Button onClick={handleSignInClick} >Sign up</Button>)
            :
            <Button onClick={handleSignInClick}>Sign in</Button>
          }
          
        </Box>
        
      </Modal>
    </div>
  );
}