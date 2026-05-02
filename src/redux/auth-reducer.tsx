import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Dispatch } from "redux";
import { LoginAPI } from "../api/api";

// Типы
export type AuthStateType = {
  userId: string | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  logout: null;
  captchaUrl: null;
};
let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  logout: null,
  captchaUrl: null,
};
export type ActionTypes = ReturnType<typeof setUserAuthDataAC>;

export const authReducer = (
  state: AuthStateType = initialState,
  action: ActionTypes,
): AuthStateType => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        ...action.payload,
        isAuth: true,
      };
    default:
      return state;
  }
};

export const getMeTC = () => async (dispatch: Dispatch) => {
  let response = await LoginAPI.me();
  if (response.data.resultCode === 0) {
    let { id, email, login } = response.data.data;

    dispatch(setUserAuthDataAC(email, id, login, true));
  }
};

export const setUserAuthDataAC = (
  email: string | null,
  userId: string | null,
  login: string | null,
  isAuth: boolean,
) => {
  return {
    type: "SET_USER_DATA",
    payload: { email, userId, login, isAuth },
  } as const;
};
