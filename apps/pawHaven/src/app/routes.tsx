import Loading from '@shared/components/Loading';
import NotFund from '@shared/components/NotFund';
import RootLayout from '@shared/components/RootLayout';
import { lazy, ReactNode, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useMatches,
  useNavigate,
  Outlet,
  RouteObject,
} from 'react-router-dom';

import GuardRoute from '@/components/GuardRoute';
import routePaths from '@/constants/routePaths';
import AuthLayout from '@/features/Auth/authLayout';
import Home from '@/features/Home';
import { useGlobalState } from '@/store/globalReducer';

export interface RouteMetaType {
  isRequireUserLogin?: boolean;
  children?: ReactNode;
}

const SuspenseWrapper = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

const RootLayoutWithProps = () => {
  const { menuItems } = useGlobalState();
  const navigate = useNavigate();
  const routerMatches = useMatches();
  const currentRouteMeta: RouteMetaType =
    routerMatches[routerMatches.length - 1]?.handle ?? {};
  return (
    <RootLayout
      menuItems={menuItems}
      navigate={navigate}
      routerMatches={routerMatches}
    >
      <GuardRoute {...currentRouteMeta} routerMatches={routerMatches}>
        <Outlet />
      </GuardRoute>
    </RootLayout>
  );
};
const History = lazy(() => import('@/features/History'));
const Login = lazy(() => import('@/features/Auth/Login'));
const Register = lazy(() => import('@/features/Auth/Register'));

const routeOptions: RouteObject[] = [
  {
    path: routePaths.home,
    element: (
      <SuspenseWrapper>
        <RootLayoutWithProps />
      </SuspenseWrapper>
    ),
    errorElement: <NotFund />,
    children: [
      {
        index: true,
        handle: { isRequireUserLogin: false },
        element: <Home />,
      },
      {
        path: routePaths.history,
        element: <History />,
      },
      {
        path: '*',
        element: (
          <SuspenseWrapper>
            <NotFund />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    element: (
      <SuspenseWrapper>
        <AuthLayout />
      </SuspenseWrapper>
    ),
    errorElement: (
      <SuspenseWrapper>
        <NotFund />
      </SuspenseWrapper>
    ),
    children: [
      {
        path: routePaths.login,
        handle: { isRequireUserLogin: false },
        element: <Login />,
      },
      {
        path: routePaths.register,
        handle: { isRequireUserLogin: false },
        element: <Register />,
      },
    ],
  },
];

const routes = createBrowserRouter(routeOptions);

const AppRouterProvider = () => {
  return <RouterProvider router={routes} />;
};

export default AppRouterProvider;
