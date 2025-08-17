import storageKeys from '@shared/constants/storageKeys';
import storageTool from '@shared/utils/storage';
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import routeKeys from '@/constants/routeKeys';

interface GuardRouteProps {
  isRequireUserLogin?: boolean;
  children: ReactNode;
}
const GuardRoute = (props: GuardRouteProps) => {
  const { isRequireUserLogin = true, children } = props;
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Default to ask user login if not specified
    if (isRequireUserLogin) {
      const isUserLogged = storageTool.get(storageKeys.accessToken);
      if (!isUserLogged) {
        navigate(routeKeys.login);
      } else {
        setIsChecked(true);
      }
    } else {
      setIsChecked(true);
    }
  }, [isRequireUserLogin, navigate]);

  // Render children only after authentication check is complete
  // or when authentication is not required
  if (!isChecked) {
    return null;
  }

  return children;
};

export default GuardRoute;
