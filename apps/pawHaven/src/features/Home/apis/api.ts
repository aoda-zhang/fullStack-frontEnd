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
      to: '/login',
      classNames: ['', 'login'],
      type: 'link',
    },
    {
      label: 'common.language',
      component: 'LangSwitcher',
      type: 'component',
    },
  ];
};
