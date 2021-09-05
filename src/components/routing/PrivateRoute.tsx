import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
interface PrivateRouteProps extends RouteProps {
  component: any;
  isAuthenticated: boolean;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;

  console.log("isAutenticated=", props.isAuthenticated);
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return props.isAuthenticated ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: routeProps.location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
