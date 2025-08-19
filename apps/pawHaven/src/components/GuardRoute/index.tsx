import storageKeys from '@shared/constants/storageKeys';
import storageTool from '@shared/utils/storage';
import { useEffect, useState } from 'react';
import { UIMatch, useNavigate } from 'react-router-dom';

import { RouteMetaType } from '@/app/routes';
import routePaths from '@/constants/routePaths';

interface GuardRouteProps extends RouteMetaType {
  routerMatches: UIMatch<unknown, unknown>[];
}

const GuardRoute = (props: GuardRouteProps) => {
  const { isRequireUserLogin = true, children, routerMatches } = props;
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // If no router matches, redirect to Not Found page
    // This is a fallback to ensure that if the route does not match any defined routes,
    if (!routerMatches) {
      navigate(routePaths.notFund);
    }
  }, [navigate, routerMatches]);

  useEffect(() => {
    // Default to ask user login if not specified
    if (isRequireUserLogin) {
      const isUserLogged = storageTool.get(storageKeys.accessToken);
      if (!isUserLogged) {
        // navigate(routePaths.login);
      } else {
        setIsChecked(true);
      }
    } else {
      setIsChecked(true);
    }
  }, [isRequireUserLogin, navigate]);
  if (!isChecked) {
    return null;
  }

  return children;
};

export default GuardRoute;
