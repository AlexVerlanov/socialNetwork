// Тип для поста
import { usersAPI } from "../api/api";
import type { Dispatch } from "redux";
import { ToggleFeathingAC } from "./Users-reducer";

export type PostsType = {
  id: number;
  message: string;
  initialLikeCount: number;
};

// Тип для данных профиля
export type ProfileType = {
  userId: number;
  fullName: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  aboutMe: string;
  contacts: {
    github: string;
    vk: string;
    facebook: string;
    instagram: string;
    twitter: string;
    website: string;
    youtube: string;
    mainLink: string;
  };
  photos: {
    large: string;
    small: string;
  };
};

// Тип для состояния
export type ProfileReducerType = {
  profilePage: {
    posts: PostsType[];
    postText: string;
  };
  profile: ProfileType | null; // Профиль может быть null, пока не загружен
  profileUpdateStatus: boolean;
  status: string;
};
export type initStateType = typeof initialState;
// Начальное состояние
let initialState: ProfileReducerType = {
  profilePage: {
    posts: [
      { id: 1, message: "Hi, how are you", initialLikeCount: 112 },
      { id: 2, message: "It's my project", initialLikeCount: 2 },
      { id: 3, message: "Hi", initialLikeCount: 5 },
    ],
    postText: "", // Инициализация поля postText
  },
  profile: {} as ProfileType, // Изначально профиль отсутствует
  profileUpdateStatus: false,
  status: "", // Статус профиляyarn add react-router-dom
};

// Экшен-креаторы
export const addPostAC = (postMessage: string) => ({
  type: "ADD_POST" as const,
  postMessage,
});

export const updatePostTextAC = (text: string) => ({
  type: "UPDATE_POST_TEXT" as const,
  text,
});

export const setUserProfile = (profile: ProfileType) => ({
  type: "SET_USER_PROFILE" as const,
  profile,
});

export const setStatusProfileAC = (status: string) => ({
  type: "SET_STATUS_PROFILE" as const,
  status,
});

export const getProfileTC = (userId: string) => async (dispatch: Dispatch) => {
  try {
    const response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};
// Тип экшенов
type ActionTypes =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof updatePostTextAC>
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof setStatusProfileAC>;

// Редюсер
export const ProfileReducer = (
  state: ProfileReducerType = initialState,
  action: ActionTypes,
): ProfileReducerType => {
  switch (action.type) {
    case "ADD_POST":
      const newPost = {
        id: state.profilePage.posts.length + 1, // Генерация нового ID
        message: action.postMessage,
        initialLikeCount: 0,
      };
      return {
        ...state,
        profilePage: {
          posts: [newPost, ...state.profilePage.posts],
          postText: "", // Очищаем текст после добавления поста
        },
      };

    case "UPDATE_POST_TEXT":
      return {
        ...state,
        profilePage: {
          ...state.profilePage,
          postText: action.text, // Обновляем состояние текста
        },
      };

    case "SET_USER_PROFILE":
      return {
        ...state,
        profile: action.profile, // Устанавливаем профиль
      };

    case "SET_STATUS_PROFILE":
      return {
        ...state,
        status: action.status, // Устанавливаем статус
      };

    default:
      return state;
  }
};
