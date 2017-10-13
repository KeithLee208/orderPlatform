/**
 * Created by sven on 2017/10/11.
 */
const mystorage = (function () {
    let ms = "mystorage";
    let storage=window.sessionStorage;
    let set = function(key,value){
      //存储
      let mydata = storage.getItem(ms);
      if(!mydata){
        this.init();
        mydata = storage.getItem(ms);
      }
      mydata = JSON.parse(mydata);
      mydata.data[key] = value;
      storage.setItem(ms,JSON.stringify(mydata));
      return mydata.data;
    };

    let get = function(key){
      //读取
    let mydata = storage.getItem(ms);
      if(!mydata){
        return false;
      }
      mydata = JSON.parse(mydata);

      return mydata.data[key];
    };

    let remove = function(key){
      //读取
      let mydata = storage.getItem(ms);
      if(!mydata){
        return false;
      }

      mydata = JSON.parse(mydata);
      delete mydata.data[key];
      storage.setItem(ms,JSON.stringify(mydata));
      return mydata.data;
    };

    let clear = function(){
      //清除对象
      storage.removeItem(ms);
    };

    let init = function(){
      storage.setItem(ms,'{"data":{}}');
    };

    return {
      set : set,
      get : get,
      remove : remove,
      init : init,
      clear : clear
    };
})();

export default {
  install(Vue){
    Vue.prototype.$wnstorage = mystorage;
  }
}
