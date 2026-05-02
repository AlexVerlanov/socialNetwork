import React from "react";
import { connect } from "react-redux";
import { Header } from "./Header";
import axios from "axios";

import { RootState } from "../../redux/redux-store";
import { getMeTC, setUserAuthDataAC } from "../../redux/auth-reducer";
type MapDispatchPropsType = {
  getMeTC: (userId: null, email: null, login: any, isAuth: boolean) => void;
};

export type HeaderPropsType = MapDispatchPropsType & MapStatePropsType;

class HeaderContainer extends React.Component<any, HeaderPropsType> {
  componentDidMount() {
    this.props.getMeTC();
  }

  /* componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        withCredentials: true,
      })
      .then((res) => {
        debugger;
        if (res.data.resultCode === 0) {
          let { id, email, login } = res.data.data;
          this.props.setUserAuthDataAC(id, email, login);
        }
      });
  }*/

  render() {
    return (
      <Header
        {...this.props}
        isAuth={this.props.isAuth}
        login={this.props.login}
        logoutTC={this.props.logoutTC}
      />
    );
  }
}
export type MapStatePropsType = {
  login: string | null;
  isAuth: boolean;
  logoutTC: null;
};
const mapStateToProps = (state: RootState): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  logoutTC: state.auth.logout,
});
export default connect(mapStateToProps, { getMeTC, setUserAuthDataAC })(
  HeaderContainer,
);
