/**
 * Created by sven on 2017/6/16.
 */
Array.prototype.distinct = function () {
  return this.reduce(function (new_array, old_array_value) {
    if (new_array.indexOf(old_array_value) == -1) new_array.push(old_array_value);
    return new_array; //最终返回的是 prev value 也就是recorder
  }, []);
};

//数组去重-使用Set+Array
function uniqueArray1(arr) {
  return Array.from(new Set(arr));
}

//数组去重-使用splice
function uniqueArray2(arr){
  for(var i = 0; i < arr.length - 1; i++){
    for(var j = i + 1; j < arr.length; j++){
      if(arr[j] === arr[i]){
        arr.splice(j--, 1);
      }
    }
  }
  return arr;
}

//数组去重-使用Array
function uniqueArray(arr){
  var retArray = [];
  for(var i = 0; i < arr.length; i++){
    if(retArray.indexOf(arr[i]) < 0){
      retArray.push(arr[i]);
    }
  }
  return retArray;
}

//数组分类
export function classifyArr (arr,key){
  let newArr = arr
    .map(item => [item[key]])
    .reduce((a,b) => a.concat(b))
    .distinct()
    .map(item => ({
      name:item,
      children:[]
    }));
  arr.map(item => {
    newArr.map(newItem => {
      newItem = clone(item);
      if(item[key] === newItem.name){
        // newItem.children.push({item});
        newItem.children[newItem.children.length] = item;
      }
    })
  });
  return newArr
}
//门办科室列表分类
export function classifyCheckArr (arr,key){
  let newArr = arr
    .map(item => [item[key]])
    .reduce((a,b) => a.concat(b))
    .distinct()
    .map(item => ({
      name:item,
      allChecked:false,
      isIndeterminate: false,
      children:[]
    }));
  arr.map(item => {
    newArr.map(newItem => {
      if(item[key] === newItem.name){
        // newItem.children.push({item});
        newItem.children[newItem.children.length] = item;
      }
    })
  });
  return newArr
}

export function clone (obj) {
  var copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}
