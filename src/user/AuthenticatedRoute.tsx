import React, { FC, useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { getUserFromSession } from './services/api';
import { useAuth } from './useAuth';

export const AuthenticatedRoute: FC<React.PropsWithChildren> = ({
  children,
}) => {
  const location = useLocation();
  const { loading, user } = useAuth();

  if (loading) {
    return <div>loading</div>;
  }
  if (user) return <>{children}</>;
  return <Navigate to="/login" state={{ from: location }} replace />;
};
