import {defineStore} from "pinia";
import {reqLogin, reqUserInfo} from "@/api/user";
import {loginFormData, UserInfoEntity} from "@/api/user/types";
import {ResponseBase} from "@/api/base/types";
import constantRoutes from '@/router/routes';
import {UserState} from "./types/type";
import {reqLogout} from "../../api/user";

let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: localStorage.getItem('TOKEN'),
      menuRoutes: constantRoutes,
      nickName: '',
      avatar: '',
    };
  },
  actions: {
    async userLogin(loginForm: loginFormData) {
      const loginResponse: ResponseBase<string> = await reqLogin(loginForm);
      if (loginResponse.code == 0) {
        this.token = loginResponse.data;
        localStorage.setItem('TOKEN', this.token);
        return 'ok';
      } else {
        return Promise.reject(new Error(loginResponse.message));
      }
    },
    async userInfo() {
      const userInfoResponse: ResponseBase<UserInfoEntity> = await reqUserInfo();
      if (userInfoResponse.code == 0) {
        this.nickName = userInfoResponse.data.nickname;
        this.avatar = userInfoResponse.data.avatar;
        return 'ok';
      } else {
        return Promise.reject(new Error(userInfoResponse.message));
      }
    },
    logout() {
      this.token = null;
      this.nickName = '';
      this.avatar = '';
      localStorage.removeItem('TOKEN');

      reqLogout();
    }
  },
  getters: {}
});

export default useUserStore;

