import  { useContext } from 'react';
import AuthContext from '../components/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProtectedPage = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is undefined. Make sure you are using ProtectedPage within an AuthProvider.');
  }

  const { isAuthenticated } = authContext;

  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>This page is only accessible to authenticated users.</p>
    </div>
  );
};

export default ProtectedPage;