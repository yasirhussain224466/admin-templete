import { lazy } from "react";

// import RouteAuth from "./RouteAuth";
import RouteUnauth from "./RouteUnauth";

const Login = lazy(() => import("@/containers/PageLogin"));
const RecoverPassword = lazy(() => import("@/containers/PageRecoverPassword"));
const setPassword = lazy(() => import("@/containers/SetPassword"));
const home = lazy(() => import("@/containers/Dashboard/Home"));

const InvalidScreen = lazy(() => import("@/containers/InvalidScreen"));

export const ROUTES = [
  {
    path: "/login",
    component: Login,
    routeComponent: RouteUnauth,
    exact: true,
  },
  {
    path: "/",
    component: home,
    routeComponent: RouteUnauth,
    exact: true,
  },
  {
    path: "/forgot-password/:token?",
    component: RecoverPassword,
    routeComponent: RouteUnauth,
    roles: [],
  },
  {
    path: "/set-password/:token?",
    component: setPassword,
    routeComponent: RouteUnauth,
    roles: [],
  },
  {
    path: "/operation-not-supported",
    component: InvalidScreen,
    routeComponent: RouteUnauth,
    roles: [],
  },
];
