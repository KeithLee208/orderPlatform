/**
 * Created by sven on 2017/7/13.
 */
import axios from "axios";
import mockjs from "mockjs";
const baseConfig = {
    baseUrl: 'http://172.16.0.131:8888/api/',
    rap_taobao_baseUrl: 'http://rapapi.org/mockjsdata/20337/', //建议读取mock规则，部分数据使用了 @cword(20)这种mock方法，但是rapapi官网并不识别，建议引入最新的npm mock包本地处理
    rap_baseUrl: 'http://172.16.0.131:18080/mockjs/1/' //建议读取mock规则，部分数据使用了 @cword(20)这种mock方法，但是rapapi官网并不识别，建议引入最新的npm mock包本地处理
};
/**
 * options:{
 *  mode:"dev"(开发模式，直接请求web服务)/ "mock"代表请求的是rapapi.org上面的数据
 * }
 */
export default {
    install(Vue, options = {}) {
        //是否在vue中已安装该插件
        if (this.installed) return;
        if (!options.mode) options.mode = "dev"; //默认采用dev模式
        Vue.prototype.$wnhttp = function(tranCode, body, serviceVersion = "1.0") {
            return new Promise((resolve, reject) => {
                var request = {
                    Request: {
                        Head: {
                            Version: "1.0", //目前网络请求协议版本号暂定为1.0
                            AppId: 'appointmentwebapp', //上线后可能会调整，最好写在配置里
                            MessageId: 'e6df7ee3-7d2d-4310-87fa-18d8a009bb66', //建议找个插件可以直接随机生成
                            ContentType: "TEXT_JSON", //固定值
                            TranCode: tranCode, //请求的方法对应的code
                            ServiceVersion: serviceVersion //服务接口版本号
                        },
                        Body: body //具体参数，采用json形式，例如{name:'tl',age:22}
                    }
                };
                //请求web服务
                if (options.mode === "dev") {
                    axios.post(baseConfig.baseUrl, request, {
                            headers: { "jwtToken": sessionStorage.getItem('jwtToken') }
                        })
                        .then(response => {
                            let res = response.data.Response.Body;
                            let resHead = response.data.Response.Head;
                            if (resHead.AckCode == "100.1" || resHead.AckCode == "100.2") {
                                //成功
                                resolve(res);
                            } else {
                                //失败
                                this.$message({
                                    message: resHead.AckDesc,
                                    type: 'error',
                                    duration: 5 * 1000
                                });
                                reject(response);
                            }
                        })
                        .catch(error => {
                            this.$message({
                                message: '发生异常错误,请刷新页面重试,或联系程序员,访问地址',
                                type: 'error',
                                duration: 5 * 1000
                            });
                            console.log(error); // for debug
                            reject(error);
                        });
                } else if (options.mode === "mock") {
                    //debugger;
                    axios.post(baseConfig.rap_baseUrl + tranCode, request)
                        .then(response => {
                            let data;
                            if (typeof(response.data) == 'object') {
                                data = mockjs.mock(response.data);
                            } else if (typeof(response.data) == 'string') {
                                let temp = eval("(" + response.data + ")");
                                data = mockjs.mock(temp);
                            } else {
                                console.error("response返回值无法识别！");
                            }
                            let res = data.Response.Body;
                            let resHead = data.Response.Head;
                            if (resHead.AckCode == "100.1" || resHead.AckCode == "100.2") {
                                //成功
                               this.$message(resHead.AckMessage);
                                resolve(res);
                            } else {
                                //失败
                                reject(data);
                            }
                        })
                        .catch(error => {
                            this.$message({
                                message: '发生异常错误,请刷新页面重试,或联系程序员,访问地址',
                                type: 'error',
                                duration: 5 * 1000
                            });
                            console.log(error); // for debug
                            reject(error);
                        });
                } else {
                    this.$message({
                        message: '不存在该模式！' + options.mode,
                        type: 'error',
                        duration: 5 * 1000
                    });
                    reject({
                        AckCode: '400.1'
                    }); //错误码暂定为400.1
                }
            });

        };
    }
}


/**
 * 使用如下：
 *

//一、 注册在vue中在main.js中加入如下代码
import wnhttp from "假装是路径/wnhttp";
Vue.use(wnhttp, { mode: 'mock' });

//二、 在组件中使用如下(根据科室id获取科室下医生接口)：
this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q04", { kstybm: '20000000.1.1.0320' }).then(data => {
  //data为具体数据，即：Body对象
}).catch(err => {
  //这里错误有2种错误
  //1. 服务端业务错误，错误码邮件中有
  //2. 网络错误，本地网络断开、超时等
});
 */
