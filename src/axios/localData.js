import axios from "axios";

const instance = axios.create({
  baseURL:'http://localhost:8080',
  timeout:5000,
})


// const api = {
//   getNcov(params){
//     return axios.get(instance.baseURL + instance.ncov,{
//       params
//     })
//   }
// }
// export default api


// 请求拦截器
instance.interceptors.request.use(config=>{
  // console.log('每一次发起请求前，都会先执行这里的代码');
  // console.log(config) // 本次请求的配置信息
  // 解决无效token
  // config.headers.Authorization = window.sessionStorage.getItem('token');
  return config
},err=>{
  return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(res=>{
  // console.log("每一次收到响应，都会先执行这里的代码");
  return res.data
},err=>{
  return Promise.reject(err)
})





// instance.interceptors.request.use((config)=>{
//     // config:配置对象，header请求头
//     // 在请求拦截器里面开始进度条
//     // nprogress.start();


// // header('Access-Control-Allow-Origin:*');//允许所有来源访问
// // header('Access-Control-Allow-Method:POST,GET');//允许访问的方式

//     return config
// });
// // header('Access-Control-Allow-Origin:*');//允许所有来源访问
// // header('Access-Control-Allow-Method:POST,GET');//允许访问的方式
// // 响应拦截器,服务端响应数据回来以后，响应拦截器可以检测到，可以做一些事情
// instance.interceptors.response.use(res=>{
//     // 进度条结束
//     // nprogress.done();


//     return res.data();
// },err=>{
// // 响应失败的回调函数
// return Promise.reject(err);
// });
export default instance