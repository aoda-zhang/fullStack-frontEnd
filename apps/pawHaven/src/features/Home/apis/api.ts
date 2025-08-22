import httpService from '@shared/cores/http';

type TripViewType = {
  img: string;
  title: string;
  rows?: number;
  cols?: number;
};
export const getDefaultTripView = (): Promise<TripViewType[]> => {
  return httpService.get('document/v1/default-trip-views');
};
export const getDefaultDynamicMenu = () => {
  // return httpService.get('document/v1/default-dynamic-menu');
  // Image this data from API server side
  return [
    {
      label: 'common.record',
      to: '/trip/basic',
      classNames: ['menuItem'],
      type: 'link',
    },
    {
      label: 'common.stories',
      to: '/trip/history',
      classNames: ['menuItem'],
      type: 'link',
    },
    {
      label: 'auth.auth',
      to: '/auth/login',
      classNames: ['login'],
      type: 'link',
    },
    {
      label: 'common.language',
      component: 'LangSwitcher',
      type: 'component',
    },
  ];
};

export const getDynamicRouters = () => {
  // return httpService.get('document/v1/default-dynamic-menu');
  // Image this data from API server side
  const routes = [
    {
      element: 'rootLayout',
      errorElement: 'errorFallback',
      children: [
        {
          path: '/',
          handle: { isRequireUserLogin: false },
          element: 'home',
        },
      ],
    },
    {
      element: 'authLayout',
      errorElement: 'errorFallback',
      children: [
        {
          path: '/auth/login',
          handle: { isRequireUserLogin: false },
          element: 'auth_login',
        },
        {
          path: 'auth/register',
          handle: { isRequireUserLogin: false },
          element: 'auth_register',
        },
      ],
    },
    {
      path: '/notFund',
      element: 'notFund',
    },
  ];
  return Promise.resolve(routes);
};
