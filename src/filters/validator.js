/**
 * Created by sven on 2017/8/25.
 */
export function Validator() {
  this.cache = [];
};
Validator.prototype.add = function (value, rules) {
  var self = this;
  for (var i = 0, rule; rule = rules[i++];) {
    (function (rule) {
      var strategyAry = rule.strategy.split(':');
      var errorMsg = rule.errorMsg;

      self.cache.push(function () {
        var strategy = strategyAry.shift();
        strategyAry.unshift(value);
        strategyAry.push(errorMsg);
        return strategies[strategy].apply(value,strategyAry);
      });
    })(rule)
  }
};
Validator.prototype.start = function () {
  for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
    var errorMsg = validatorFunc();
    if (errorMsg) {
      return errorMsg;
    }
  }
};

var strategies = {
  //判断是否为空
  isNonEmpty: function (value,errorMsg) {
    if (value === '') {
      return errorMsg;
    }
  },
  isNonSpace:function (value,errorMsg) {
    if (value.indexOf(" ") >= 0) {
      return errorMsg;
    }
  }
};

export default Validator

