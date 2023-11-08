import { getUserAuthData } from 'entities/User';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const RequireAuth = ({ children }: React.PropsWithChildren<{}>) => {
  const location = useLocation();
  const userAuthData = useSelector(getUserAuthData);

  if (!userAuthData) {
    return (
      <Navigate
        to="/login"
        replace // <-- redirect
        state={{ path: location.pathname }}
      />
    );
  }

  return <>{children}</>;
};
