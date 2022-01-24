import axios from 'axios'

export function request(config) {
  // console.log('config==>',config);
  // 1.创建axios实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/hy66',
    // baseURL:'http://123.207.32.32:8000',
    timeout:5000
  })

  // 2.axios的拦截器
  // 2.1 请求拦截器的作用
  instance.interceptors.request.use(config => {
    // console.log('config==>', config);
    // 1.比如config中的一些信息不符合服务器的要求
    // 2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标（类似转转的那个）
    // 3.某些网络请求（比如登录（token））,必须携带一些特殊字符
    // console.log(config);
    return config //必须要加这个
  },err => {
    console.log(err);
  })

  // 2.2 响应拦截器的作用
  instance.interceptors.response.use(res => {
    // console.log('res.data==>', res.data);
    return res.data
  }, err => {
    console.log(err);
  })
  // 3.发送真正的网络请求,返回promise对象
  return instance(config)
}
