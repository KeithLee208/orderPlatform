/**
 * Created by Mr on 2017/6/21.
 */
const baseUrl = "http://localhost:8080/";
const url = {};
url.Scheduling = {};//主页
url.Scheduling.Template = '../mock/tpcard.json';


const axios = require('axios');
// const cookie = global._VUE_SSR_CONTEXT_.cookies;

axios.interceptors.request.use( config => {
  //这里可以加一些交互动作，比如来个进度条开始效果
  return config;
},error => {
  return Promise.reject(error);
});

axios.interceptors.response.use( (res) => {
  if( res.status >= 200 && res.status <= 300) {
    return res;
  }
  //由后端抛出的错误
  return Promise.reject(res);
},(error) => {
  //由网络服务器抛出的错误
  return Promise.reject(error);
});

let catchErrorEvt = function (error) {
  switch (error.status) {
    case 404:
      console.log('接口不存在');
      break;
    case '500':
      console.log('接口报错');
      break;
    default:
      console.log('其他类型错误');
  }
};

export default {
  url,
  post: function (target, params = {}) {
    return new Promise ((resolve, reject) => {
      console.time(target);
      axios({
        url:target,
        method:'post',
        headers:{
          'X-Requested-With':'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: params,
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then(res => {
        resolve(res.data);
        console.timeEnd(target);
      }).catch(error => {
        catchErrorEvt(error);
        reject(error);
      });
    });
  },
  get: function (target) {
    return new Promise ((resolve, reject) => {
      console.time(target);
      axios({
        url:target,
        method:'get',
        headers:{
          'X-Requested-With':'XMLHttpRequest',
          'Content-Type':'application/json;charset=UTF-8'
        }
      }).then(res => {
        resolve(res.data);
        console.timeEnd(target);
      }).catch(error => {
        catchErrorEvt(error);
        reject(error);
      });
    });
  }
}
