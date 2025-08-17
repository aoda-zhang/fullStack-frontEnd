import Loading from '@shared/components/Loading';
import RootLayout from '@shared/components/RootLayout';
import { lazy, ReactNode, Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useMatches,
  useNavigate,
  Outlet,
} from 'react-router-dom';

import GuardRoute from '@/components/GuardRoute';
import routeKeys from '@/constants/routeKeys';
import AuthLayout from '@/features/Auth/authLayout';
import { useGlobalState } from '@/store/globalReducer';

const SuspenseWrapper = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

const RootLayoutWithProps = () => {
  const { menuItems } = useGlobalState();
  const navigate = useNavigate();
  const routerMatches = useMatches();
  return (
    <RootLayout
      menuItems={menuItems}
      navigate={navigate}
      routerMatches={routerMatches}
    >
      <Outlet />
    </RootLayout>
  );
};

const Home = lazy(() => import('@/features/Home'));
const History = lazy(() => import('@/features/History'));
const Login = lazy(() => import('@/features/Auth/Login'));
const Register = lazy(() => import('@/features/Auth/Register'));
const NotFund = lazy(() => import('@shared/components/NotFund'));

const routeOptions = [
  {
    path: routeKeys.home,
    element: <RootLayoutWithProps />,
    children: [
      {
        path: routeKeys.home,
        index: true,
        element: (
          <SuspenseWrapper>
            <Home />
          </SuspenseWrapper>
        ),
      },
      {
        path: routeKeys.history,
        element: (
          <GuardRoute>
            <SuspenseWrapper>
              <History />
            </SuspenseWrapper>
          </GuardRoute>
        ),
      },
      {
        path: '*',
        element: <Navigate to={routeKeys.notFund} replace />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: routeKeys.login,
        index: true,
        element: (
          <SuspenseWrapper>
            <Login />
          </SuspenseWrapper>
        ),
      },
      {
        path: routeKeys.register,
        element: (
          <SuspenseWrapper>
            <Register />
          </SuspenseWrapper>
        ),
      },
      {
        path: '*',
        element: <Navigate to={routeKeys.notFund} replace />,
      },
    ],
  },
  {
    path: routeKeys.notFund,
    element: (
      <SuspenseWrapper>
        <NotFund />
      </SuspenseWrapper>
    ),
  },
  {
    path: '*',
    element: <Navigate to={routeKeys.notFund} replace />,
  },
];

const routes = createBrowserRouter(routeOptions);

const AppRouterProvider = () => {
  return <RouterProvider router={routes} />;
};

export default AppRouterProvider;
