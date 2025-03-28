import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

interface User {
  userId: string;
  username: string;
  role: string;
}
// interface Token {
//   token: string;
// }
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: String | null;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<String | null>(null);
  React.useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);
  const fetchUserProfile = async () => {
    try {
      if (token) {
        const response = await axios.get('http://localhost:80/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setUser(response.data); // Assuming the API returns a user object
        } else {
          console.error(response.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch user profile when token changes
  React.useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token]);
  const signIn = async (username: string, password: string) => {
    try {
      axios.post('http://localhost:80/api/auth/login', { username, password })
        .then((response) => {
          console.log('response', response);
          setIsAuthenticated(true);
          setToken(response.data.accessToken); // Assuming the API returns a token
          localStorage.setItem('token', response.data.accessToken); // Store token in localStorage
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
        });
    }catch (error) {
      console.error(error);
    }
  };

  const signUp = async (username: string, email: string,password: string) => {
    axios.post('http://localhost:80/api/auth/register', { username, email, password })
      .then((response) => {
      if (response.status === 201) {
        setIsAuthenticated(true);
        console.log('token data', response.data);
        console.log('token data accessToken', response.data.accessToken);
        setToken(response.data.accessToken);
        localStorage.setItem('token', response.data.accessToken); // Store token in localStorage
      } else {
        console.error(response.data);
      }
      })
      .catch((error) => {
      console.error(error);
      });
  };

  const signOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token'); // Remove token from localStorage
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};