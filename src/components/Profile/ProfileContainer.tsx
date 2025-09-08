import React from "react";
import styled from "styled-components";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import axios from "axios";
import { RootState } from "../../redux/redux-store";

import {
  getProfileTC,
  type initStateType,
  type ProfileType,
  setUserProfile,
} from "../../redux/Profile-reducer";
import { connect } from "react-redux";
import { Preloader } from "../common/Prealoader/Preloader";
import { ToggleFeathingAC, UsersType } from "../../redux/Users-reducer";
import withRouter from "../utils/withRouter";

// Стили для компонента профиля
const ProfileContaine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 1650px;
  height: auto;

  @media (max-width: 768px) {
    max-width: 100%;
    height: auto;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    height: 400px;
  }

  img {
    width: 100%;
    height: auto;
  }
`;

class ProfileContainer extends React.Component<any, initStateType> {
  componentDidMount() {
    // Получаем параметр profileId из маршрута
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = 2;
    }

    this.props.getProfileTC(userId);
  }

  render() {
    if (!this.props.profile) {
      return (
        <div>
          <Preloader />
        </div>
      ); // Показываем сообщение или компонент загрузки
    }
    return <MyPostsContainer {...this.props} profile={this.props.profile} />;
  }
}

export type mapStateToPropsType = {
  profile: ProfileType | null;
};

// mapStateToProps: если нужно подключить состояние
const mapStateToProps = (state: RootState): mapStateToPropsType => {
  return {
    profile: state.profilePage.profile,
  };
};

// mapDispatchToProps: добавляем экшен для dispatch
const mapDispatchToProps = {
  setUserProfile,
  ToggleFeathingAC,
  getProfileTC, // Теперь экшен доступен для передачи через пропсы
};

// Применяем обёртку с маршрутизатором
let WitchUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WitchUrlDataContainerComponent);
