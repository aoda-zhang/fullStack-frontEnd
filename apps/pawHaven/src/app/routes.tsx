import ErrorFallback from '@shared/components/ErrorFallback';
import Loading from '@shared/components/Loading';
import NotFund from '@shared/components/NotFund';
import { lazy, ReactNode, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from 'react-router-dom';

import GuardRoute from '@/components/GuardRoute';
import routePaths from '@/constants/routePaths';
import AuthLayout from '@/features/Auth/authLayout';
import Home from '@/features/Home';
import RootLayout from '@/layout';

export interface RouteMetaType {
  isRequireUserLogin?: boolean;
  children?: ReactNode;
}

const SuspenseWrapper = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

const History = lazy(() => import('@/features/History'));
const Login = lazy(() => import('@/features/Auth/Login'));
const Register = lazy(() => import('@/features/Auth/Register'));

const routeOptions: RouteObject[] = [
  {
    element: (
      <SuspenseWrapper>
        <GuardRoute>
          <RootLayout />
        </GuardRoute>
      </SuspenseWrapper>
    ),
    errorElement: <ErrorFallback />,
    children: [
      {
        path: routePaths.home,
        handle: { isRequireUserLogin: false },
        element: <Home />,
      },
      {
        path: routePaths.history,
        element: <History />,
      },
      {
        path: '*',
        element: <NotFund />,
      },
    ],
  },
  {
    element: (
      <SuspenseWrapper>
        <AuthLayout />
      </SuspenseWrapper>
    ),
    errorElement: <ErrorFallback />,
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
      {
        path: '*',
        element: <NotFund />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFund />,
  },
];

const routes = createBrowserRouter(routeOptions);

const AppRouterProvider = () => {
  return <RouterProvider router={routes} />;
};

export default AppRouterProvider;
