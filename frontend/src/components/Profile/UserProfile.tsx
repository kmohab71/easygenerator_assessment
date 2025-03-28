import { useContext } from 'react';
import AuthContext from '../Auth/AuthContext';

const UserProfile = () => {
  const authContext = useContext(AuthContext);

  if (!authContext || !authContext.user) {
    return <div>Please sign in to view your profile.</div>;
  }

  const { user } = authContext;

  if (!user) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>ID: {user.userId}</p>
      <p>Name: {user.username}</p>
      <p>Role: {user.role}</p>
      {/* <p>Email: {user.email}</p> */}
      {/* Add more user information as needed */}
    </div>
  );
};

export default UserProfile;