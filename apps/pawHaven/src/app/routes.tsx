import Loading from '@shared/components/Loading';
import { lazy, ReactNode, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from 'react-router-dom';

import ErrorFallback from '@/components/ErrorFallback';
import GuardRoute from '@/components/GuardRoute';
import NotFund from '@/components/NotFund';
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
    ],
  },
  {
    path: routePaths.notFund,
    element: <NotFund />,
  },
];

const routes = createBrowserRouter(routeOptions);

const AppRouterProvider = () => {
  return <RouterProvider router={routes} />;
};

export default AppRouterProvider;
