import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setUserAuthDataAC } from "./auth-reducer";
import { type Dispatch, useState } from "react";
import { usersAPI } from "../api/api";

// Типы
export type UsersType = {
  id: number;
  followed: boolean;
  name: string;
  status: string;
  photoUrl: string;
  location: UserLocation;
  photos: {
    small: string;
    large: string;
  };
};

type UserLocation = {
  city: string;
  country: string;
};
type InitialStateUserType = {
  users: UsersType[];
  pageSize: number;
  totalUserCount: number;
  currenPage: number;
  isFetching: boolean;
  followingInProgress: number[];
};
const inirialState: InitialStateUserType = {
  users: [],
  pageSize: 10,
  totalUserCount: 5,
  currenPage: 10,
  isFetching: true,
  followingInProgress: [],
};
export type ActionTypes =
  | ReturnType<typeof FollowAC>
  | ReturnType<typeof ufollowAC>
  | ReturnType<typeof setUsersAC>
  | ReturnType<typeof setCurrentAC>
  | ReturnType<typeof setUsersTotalCountAC>
  | ReturnType<typeof ToggleFeathingAC>
  | ReturnType<typeof ToggleFeathingProherssAC>;

export const userReducer = (
  state = inirialState,
  action: ActionTypes,
): InitialStateUserType => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };
    case "UNFOLLOW":
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    case "SET_USERS":
      return { ...state, users: action.users };
    case "SET_CURRENT_PAGE":
      return { ...state, currenPage: action.currenPage };
    case "SET_USER_TOTAL_COUNT":
      return { ...state, totalUserCount: action.count };
    case "TOGGLE_IS_FEATHING":
      return { ...state, isFetching: action.isFetching };
    case "TOGGLE_IS_FEATHING_PROGRESS":
      console.log("Updating followingInProgress to:", action.isFetching);
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : [...state.followingInProgress.filter((id) => id !== action.userId)],
      };

    default:
      return state;
  }
};

export const FollowAC = (userId: number) => {
  return { type: "FOLLOW", userId } as const;
};
export const ufollowAC = (userId: number) => {
  return { type: "UNFOLLOW", userId } as const;
};
export const setUsersAC = (users: UsersType[]) => {
  return { type: "SET_USERS", users } as const;
};
export const setCurrentAC = (currenPage: number) => {
  return { type: "SET_CURRENT_PAGE", currenPage } as const;
};
export const setUsersTotalCountAC = (count: number) => {
  return { type: "SET_USER_TOTAL_COUNT", count } as const;
};
export const ToggleFeathingAC = (isFetching: boolean) => {
  return { type: "TOGGLE_IS_FEATHING", isFetching } as const;
};
export const ToggleFeathingProherssAC = (
  isFetching: boolean,
  userId: number,
) => {
  return { type: "TOGGLE_IS_FEATHING_PROGRESS", isFetching, userId } as const;
};

export const getUsersTC = (page: number, pageSize: number) => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    dispatch(setCurrentAC(page));
    // dispatch(ToggleFeathingAC(true));
    let data = await usersAPI.getUsers(page, pageSize);
    // dispatch(ToggleFeathingAC(false));
    dispatch(setUsersAC(data.items));
    dispatch(setUsersTotalCountAC(data.totalCount));
  };
};
/*const [isFollowingInProgress, setIsFollowingInProgress] = useState<number[]>(
  [],
);*/
export const followTC = (userId: number) => {
  return (dispatch: Dispatch<ActionTypes>) => {
    dispatch(ToggleFeathingProherssAC(true, userId)); // Блокируем кнопку
    usersAPI.follow(userId).then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(FollowAC(userId));
      }
      dispatch(ToggleFeathingProherssAC(false, userId)); // Разблокируем кнопку
    });
  };
};
export const unfollowTC = (userId: number) => {
  return (dispatch: Dispatch<ActionTypes>) => {
    dispatch(ToggleFeathingProherssAC(true, userId)); // Блокируем кнопку
    usersAPI.unfollow(userId).then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(ufollowAC(userId));
      }
      dispatch(ToggleFeathingProherssAC(false, userId)); // Разблокируем кнопку
    });
  };
};
