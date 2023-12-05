import { getUserAuthData } from 'entities/User';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserData } from 'shared/lib/hooks/useUserData/useUserData';

interface RequireAuthProps {
  children?: React.ReactNode;
  sawatzkyOnly: boolean;
}

export const RequireAuth = ({ children, sawatzkyOnly }: RequireAuthProps) => {
  const location = useLocation();
  const userAuthData = useSelector(getUserAuthData);
  const { isSawatzky } = useUserData();

  if (!userAuthData) {
    return (
      <Navigate
        to="/login"
        replace // <-- redirect
        state={{ path: location.pathname }}
      />
    );
  }

  if (sawatzkyOnly && !isSawatzky) {
    return (
      <Navigate
        to="/forbidden"
        replace // <-- redirect
        state={{ path: location.pathname }}
      />
    );
  }

  return <>{children}</>;
};
