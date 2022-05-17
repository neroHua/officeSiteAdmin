
import axios from 'axios'

let httpService = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000
})

// 拦截请求
httpService.interceptors.request.use(config => {
  return config;
},err => {
  Promise.reject(err);
})

// 拦截响应
httpService.interceptors.response.use(response => {
  return response;
},err => {
  return Promise.reject(err);
})

// get请求的封装
export function get(url, params={}, headers = {'Content-Type':'application/json'}) {
  return new Promise((resolve,reject) => {
    httpService({
      url: url,
      method: 'get',
      params: params,
      headers: headers,
    }).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}

// post请求封装 
export function post(url, data = {}, headers = {'Content-Type':'application/json'}) {
  return new Promise((resolve,reject) => {
    httpService({
      url: url,
      method:'post',
      data: JSON.stringify(data),
      headers: headers
    }).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}

// post请求封装 
export function upload(url, data = {}) {
  return new Promise((resolve,reject) => {
    httpService({
      url: url,
      method: 'post',
      data: data,
    }).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}

export default {
  get,
  post,
  upload,
}
