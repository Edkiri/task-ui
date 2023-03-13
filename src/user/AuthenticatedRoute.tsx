import React, { FC, useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loading } from '../ui/loding/Loading';
import { useAuth } from './useAuth';

export const AuthenticatedRoute: FC<React.PropsWithChildren> = ({
  children,
}) => {
  const location = useLocation();
  const { loading, user } = useAuth();

  if (loading) {
    return <Loading />;
  }
  if (user) return <>{children}</>;
  return <Navigate to="/login" state={{ from: location }} replace />;
};
