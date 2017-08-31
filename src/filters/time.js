/**
 * Created by sven on 2017/5/5.
 */

/**
 * 时间戳转换时间格式2017-06-15
 */
export function timeFormat(time) {
  if(!time)return;
  let YYYY = time.getFullYear();
  let MM = time.getMonth()+1;
  MM = MM>9?MM:'0'+MM;
  let DD = time.getDate();
  DD = DD>9?DD:'0'+DD;
  time = YYYY + '-' + MM+ '-'+ DD;
  return time;
}

/**
 * js原生方法去重
 */
export function yearFormat(time) {
  if(!time)return;
  time = time.split('-');
  time[0] = time[0].substring(2,4);
  time = time.join('-');
  return time;
}

export function timeStampFormat(timeStamp){
  if(!timeStamp)return;
  console.log(timeStamp);
  return '2017-05-05';
}

/**
 * js原生方法去重
 */
export function removeByValue(arr,val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
}
/**
 * 时间转换指定格式08-02 20:06
 */
export function timeFormatSub(time) {
  if(!time)return;
  if(typeof(time)=="object"){
    return "";
  }else{
    return time.substr(5);
  }
}
