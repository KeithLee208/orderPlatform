/**
 * Created by sven on 2017/6/21.
 */
const config = require('../config');
const axios = require('axios');

const baseUrl = "http://172.16.0.131:8888/api/";
const mockUrl = process.env.NODE_ENV === 'production'
  ? config.build.assetsPublicPath + config.build.assetsSubDirectory
  : config.dev.assetsPublicPath + config.dev.assetsSubDirectory;
const url = {};
url.public={};//公共服务
url.public.disease='http://rapapi.org/mockjsdata/20337/PAT.WEB.APPOINTMENT.BASEINFO.Q07';//专病病种
url.scheduling = {};//预约
// url.Scheduling.Template = mockUrl + '/mock/tpcard.json';
url.scheduling.template = 'http://rapapi.org/mockjsdata/20337/PAT.WEB.APPOINTMENT.SCHEDULE.Q00';
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
  post: function (target, params = {}, serviceVersion = "1.0") {
    return new Promise ((resolve, reject) => {
      console.time(target);
      let request = {
        Request: {
          Head: {
            Version: "1.0", //目前网络请求协议版本号暂定为1.0
            AppId: 'appointmentwebapp', //上线后可能会调整，最好写在配置里
            MessageId: 'e6df7ee3-7d2d-4310-87fa-18d8a009bb66', //建议找个插件可以直接随机生成
            ContentType: "TEXT_JSON", //固定值
            TranCode: target, //请求的方法对应的code
            ServiceVersion: serviceVersion //服务接口版本号
          },
          Body: params //具体参数，采用json形式，例如{name:'tl',age:22}
        }
      };
      if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === "development"){
          axios.post(baseUrl, request,{ headers: { "jwtToken": sessionStorage.getItem('jwtToken')}})
            .then(response => {
              let res = response.data.Response.Body;
              let resHead = response.data.Response.Head;
              if (resHead.AckCode == "100.1" || resHead.AckCode == "100.2") {
                //成功
                resolve(res);
              }
              else if(resHead.AckCode.indexOf("400")>=0){
                //业务错误
                resolve(res);
              }
              else {
                //失败
                // this.$message({
                //   message: target + ':' + resHead.AckDesc,
                //   type: 'error',
                //   duration: 5 * 1000
                // });
                reject(response);
              }
              console.timeEnd(target);
            })
            .catch(error => {
              // this.$message({
              //   message: '发生异常错误,请刷新页面重试,或联系程序员,访问地址',
              //   type: 'error',
              //   duration: 5 * 1000
              // });
              console.log(error); // for debug
              reject(error);
            });
      }
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
