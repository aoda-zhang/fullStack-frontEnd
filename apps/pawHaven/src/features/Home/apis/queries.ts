import { useQuery } from 'react-query';
import { RouteObject } from 'react-router-dom';

import * as HomeAPI from './api';

export const HomeQueryKeys = {
  GET_DEFAULT_TRIP_MENU: 'GET_DEFAULT_TRIP_MENU',
  GET_DEFAULT_TRIP_ROUTER: 'GET_DEFAULT_TRIP_ROUTER',
};

export const useFetchGlobalMenu = () => {
  return useQuery({
    queryKey: [HomeQueryKeys.GET_DEFAULT_TRIP_MENU],
    queryFn: HomeAPI.getDefaultDynamicMenu,
  });
};

export const useFetchGlobalRouters = () => {
  return useQuery<RouteObject[]>({
    queryKey: [HomeQueryKeys.GET_DEFAULT_TRIP_ROUTER],
    queryFn: HomeAPI.getDynamicRouters,
  });
};
