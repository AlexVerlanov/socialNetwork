import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../redux/redux-store";
import {
  FollowAC,
  followTC,
  getUsersTC,
  setCurrentAC,
  ToggleFeathingProherssAC,
  ufollowAC,
  unfollowTC,
  UsersType,
} from "../../redux/Users-reducer";
import { Users } from "./Users";
import { Preloader } from "../common/Prealoader/Preloader";
import { usersAPI } from "../../api/api";

export type SuperUserContainerType = mapStateToPropsType &
  mapDispatchToPropsType;

type mapStateToPropsType = {
  users: UsersType[];
  pageSize: number;
  totalUserCount: number;
  currenPage: number;
  isFetching: boolean;
  followingInProgress: number[];
};

type mapDispatchToPropsType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  /* FollowAC: (userId: number) => void;
  ufollowAC: (userId: number) => void;*/
  // setUsers: (users: UsersType[]) => void;
  setCurrenPage: (currenPage: number) => void;
  // setTotalUsersCount: (totalCount: number) => void;
  // ToggleFeathingAC: (isFetching: boolean) => void;
  ToggleFeathingProherssAC: (isFetching: boolean, userId: number) => void;
  getUsers: (currenPage: number, pageSize: number) => void;
};

class UsersAPIComponent extends React.Component<
  SuperUserContainerType,
  UsersType
> {
  componentDidMount() {
    this.props.getUsers(this.props.currenPage, this.props.pageSize);
  }

  onPageChange = (page: number) => {
    this.props.getUsers(page, this.props.pageSize);
  };

  render() {
    return (
      <>
        <Users
          users={this.props.users}
          followTC={this.props.follow}
          unfollowTC={this.props.unfollow}
          pageSize={this.props.pageSize}
          totalUserCount={this.props.totalUserCount}
          currenPage={this.props.currenPage}
          onPageChange={this.onPageChange}
          followingInProgress={this.props.followingInProgress}
          // ToggleFeathingProherssAC={this.props.ToggleFeathingAC}
        />
      </>
    );
  }
}

const mapStateToProps = (state: RootState): mapStateToPropsType => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUserCount: state.usersPage.totalUserCount,
    currenPage: state.usersPage.currenPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  };
};

export const UsersContainer = connect(mapStateToProps, {
  FollowAC,
  ufollowAC,
  setCurrenPage: setCurrentAC,
  ToggleFeathingProherssAC,
  getUsers: getUsersTC,
  follow: followTC,
  unfollow: unfollowTC,
})(UsersAPIComponent);
