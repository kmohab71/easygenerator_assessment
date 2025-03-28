import React, { useState, useContext } from 'react';
import AuthContext from './AuthContext';
import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ToolpadNotificationsNoSnap from '../Snackbar/Snackbar';
interface SignInPopupProps {
  onClose: () => void;
}

const SignInPopup: React.FC<SignInPopupProps> = ({ onClose }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is not provided.');
  }

  const { signIn } = authContext;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('submit');
    e.preventDefault();
    try {
      await signIn(username, password);
      setError(''); // Clear error message on successful sign in
      onClose(); // Close the popup after successful sign in
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
    }
  };

  return (

    <Stack
      component="form"
      spacing={2}
      noValidate
      autoComplete="off"
    >

      <FormControl sx={{ m: 1}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Username</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type='text'
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
        </FormControl>
      <FormControl sx={{ m: 1}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </FormControl>
        {/* <Button type="submit">Sign In</Button> */}
        <Button variant='contained' color='primary' onClick={handleSubmit}>Signin</Button>
        {error !== '' &&
        <ToolpadNotificationsNoSnap
          isError={error !== ''? true : false}
          message={error}>
          </ToolpadNotificationsNoSnap>}
    </Stack>
   );
 }


export default SignInPopup;

