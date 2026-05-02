import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/redux-store";

export function withAuthRedirect<P extends object>(
  Component: React.ComponentType<P>,
) {
  const RedirectComponent: React.FC<P> = (props) => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);

    if (!isAuth) return <Navigate to="/login" />;

    return <Component {...props} />;
  };

  return RedirectComponent;
}
