import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { getUserFromSession } from './services/api';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const { user, updateAuthUser } = useContext(AuthContext);

  useEffect(() => {
    getUserFromSession()
      .then(({ data }) => {
        updateAuthUser(data);
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((err) => {
        setTimeout(() => setLoading(false), 1000);
        console.log('error geeting user profile');
      });
  }, []);

  return { user, loading };
}
