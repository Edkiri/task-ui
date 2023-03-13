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
        console.log(err);
        setTimeout(() => setLoading(false), 1000);
      });
  }, []);

  return { user, loading };
}
