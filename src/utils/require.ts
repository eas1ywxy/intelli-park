import axios, { AxiosInstance } from 'axios';
import router from '@/router';

// 定义基础地址
const baseURL = 'https://mock.apifox.com/m1/4245692-3886994-default';

// const baseURL = 'https://intellipark.2ndtool.top';

// 创建 axios 实例
const request: AxiosInstance = axios.create({
  // 设置基础地址和超时时间
  baseURL,
  timeout: 8000
});

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 摘取核心响应数据
    const res = response.data;
    if (res.code === 200) {
      return response;
    }

    // 错误的特殊情况 => 401 权限不足 或 token 过期 => 拦截到登录
    if (res.code === 401) {
      console.log('请重新登录');
      router.push('/login');
    }

    // 处理业务失败, 给错误提示，抛出错误
    console.log(res.message || '服务异常');
    return Promise.reject(res);
  },
  (error) => {
    // 错误的特殊情况 => 401 权限不足 或 token 过期 => 拦截到登录
    if (error.response?.status === 401) {
      console.log('请重新登录');
      router.push('/login');
    }

    // 错误的特殊情况404
    if (error.response?.status === 404) {
      console.log('404 请求资源不存在');
      return Promise.reject(error);
    }

    // 错误的特殊情况 => 断网或网络错误
    if (!error.response) {
      console.log('网络连接失败，请检查网络状态');
      return Promise.reject(error);
    }

    // 错误的默认情况 => 只要给提示
    console.log(error.response.data.message || '服务异常');
    console.error(Promise.reject(error));
    return Promise.reject(error);
  }
);

export default request;
export { baseURL };
