import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import LoginModal from '../components/LoginModal/LoginModal';
import AuthContext from '../components/Auth/AuthContext';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ButtonAppBar() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext is not provided.');
  }
  const { isAuthenticated, signOut } = authContext;
  console.log('is authenticated', isAuthenticated);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {isAuthenticated ? (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Button color="inherit">
          <Link to="/protected" style={{ color: 'inherit', textDecoration: 'none' }}>
            Protected
          </Link>
              </Button>
              <Button color="inherit" onClick={signOut}>
          Sign Out
              </Button>
            </Box>
        ) : (
          <Box sx={{ marginLeft: 'auto' }}>
            <LoginModal />
          </Box>
        )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
