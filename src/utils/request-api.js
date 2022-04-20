/*
 * @Description: 请输入....
 * @Author: Gavin
 * @Date: 2022-04-11 13:57:03
 * @LastEditTime: 2022-04-11 14:16:14
 * @LastEditors: Gavin
 */
import axios from 'axios'
export function request(config) {
  const instance = axios.create({
      baseURL: 'http://210.22.130.90:17080',
      timeout: 5000
  })

  //拦截器概念
  //全局拦截器
  //instance实例对象 使用拦截器
  instance.interceptors.request.use(config => {
      /*********请求拦截作用 ********/

      //1.比如config中的一些信息不符合服务器的要求

      //2.比如每次发送网络请求时,都希望在鞋面显示一个请求图标

      //3.某些网络请求(比如登录（token），必须携带一些特殊的信息)

      console.log("success请求拦截器", config);
      return config

  }, err => {
      console.log("error", err);

  })
  instance.interceptors.response.use(res => {
      console.log("拦截响应成功", res);
      return res

  }, err => {
      console.log("拦截响应失败", err);

  })

  return instance(config)

}

export function request2(config) {
  const instance = axios.create({
      baseURL: 'http://123.207.32.32:8000',
      timeout: 5000
  })

  //拦截器概念
  //全局拦截器
  //instance实例对象 使用拦截器
  instance.interceptors.request.use(config => {
      /*********请求拦截作用 ********/

      //1.比如config中的一些信息不符合服务器的要求

      //2.比如每次发送网络请求时,都希望在鞋面显示一个请求图标

      //3.某些网络请求(比如登录（token），必须携带一些特殊的信息)

      console.log("success请求拦截器", config);
      return config

  }, err => {
      console.log("error", err);

  })
  instance.interceptors.response.use(res => {
      console.log("success拦截响应成功", res);
      return res.data

  }, err => {
      console.log("拦截响应失败", err);

  })

  return instance(config)

}