import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0",
  headers: {
    "API-KEY": "78516764-533b-423c-ba99-d0f992af4ba3",
  },
});

type CommonResponse<T = []> = {
  error: string | null;
  items: T;
  totalCount: number;
};

export type CommonResponse1<T = {}> = {
  data: T;
  fieldsErrors: string[];
  messages: string[];
  resultCode: number;
};
export const profileAPI = {
  getProfile(userId: string) {
    return instance.get("profile/" + userId);
  },
};

export const usersAPI = {
  getUsers: (currenPage = 1, pageSize = 10) => {
    // return instance.get<CommonResponse<any>>(`users?page=${currenPage}&count=${pageSize}`)
    return instance
      .get<
        CommonResponse,
        AxiosResponse<CommonResponse>
      >(`users?page=${currenPage}&count=${pageSize}`)
      .then((res) => res.data);
  },

  unfollow: (userId: number) => {
    return instance.delete<CommonResponse1, AxiosResponse<CommonResponse1>>(
      `follow/${userId}`,
    );
  },

  follow: (userId: number) => {
    return instance.post<CommonResponse1, AxiosResponse<CommonResponse1>>(
      `follow/${userId}`,
    );
  },
  getProfile(userId: string) {
    return profileAPI.getProfile(userId);
  },
  /*  getProfile(userId: string) {
      return profileAPI.getProfile(userId)
    }*/
};
export const LoginAPI = {
  me() {
    return instance.get(`/auth/me`); /*.then(response => response.data)*/
  },
  login(
    email: null,
    password: null,
    rememberMe = false,
    captcha: string | null,
  ) {
    return instance.post(`/auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    });
    /*login(email:null,password:null,rememberMe=false) {
        return instance.post(`/auth/login`,{email,password,rememberMe})*/
  },
  logout() {
    return instance.delete(`/auth/login`);
  },
};
