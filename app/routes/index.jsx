import React, { Suspense, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "antd";

import { getTokens } from "@/utils/auth";
import { getUserProfile } from "@/redux/global/actions";
import Loader from "@/components/Loader";
import NoMatch from "@/components/Error/NoMatch";

import * as S from "./styled";
import { ROUTES } from "./constants";

const { Content } = Layout;

const AppRoutes = () => {
  const dispatch = useDispatch();
  const { currentUser, key, loading } = useSelector((state) => state.global);
  useEffect(() => {
    const { access_token } = getTokens();
    if (access_token && !currentUser) {
      dispatch(getUserProfile.request());
    }
  }, [key]);

  if (loading) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      <S.Wrapper>
        <Content className="content">
          <Switch>
            {ROUTES.map(({ path, routeComponent: RouteComponent, ...rest }) => (
              <RouteComponent key={path} path={path} {...rest} />
            ))}
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Content>
      </S.Wrapper>
    </Suspense>
  );
};

export default AppRoutes;
