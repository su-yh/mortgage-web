import axios from 'axios';
import {ElMessage} from "element-plus";

import useUserStore from "../store/modules/user";

let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
});

request.interceptors.request.use(config => {
  const userStore = useUserStore();
  config.headers.Authorization = userStore.token;
  return config;
});

request.interceptors.response.use(response => {
  // console.log("data: ", response)
  // console.log("data.data: ", response.data.data)
  return response.data;
}, error => {
  let msg = '';
  let status = error.response.status;
  switch (status) {
    case 400:
      msg = "请求参数不合法";
      break
    case 401:
      msg = "token过期";
      break;
    case 403:
      msg = '无权访问';
      break;
    case 404:
      msg = "请求地址错误";
      break;
    case 500:
      msg = "服务器出现问题";
      break;
    default:
      msg = "无网络";
      break
  }

  ElMessage({
    type: 'error',
    message: msg
  })
  return Promise.reject(error);
});

export default request;
