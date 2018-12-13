/**
 * tools v0.0.1
 * https://github.com/gauseen/tools
 * 
 * Copyright (c) 2018 gauseen
 * Released under the ISC license
 */
 
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.tools = {})));
}(this, (function (exports) { 'use strict';

	/**
	 * 防抖函数
	 *
	 * @param  {Function} fn 需要防抖的函数
	 * @param  {Number} delay 设置防抖的时间间隔（单位：毫秒）
	 * @return {Function} 返回一个防抖函数，可被事件调用
	 */
	function debounce(fn, delay) {
	  var timer;

	  if (delay === undefined) {
	    delay = 150;
	  }

	  return function () {
	    var self = this;
	    var args = arguments;

	    if (timer) {
	      clearTimeout(timer);
	      timer = null;
	    }

	    timer = setTimeout(function () {
	      fn.apply(self, args);
	    }, delay);
	  };
	}

	function _typeof(obj) {
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArrayLimit(arr, i) {
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance");
	}

	// 深拷贝：日期、数组、对象

	/**
	 * @param  {Any} source 要深拷贝的数据
	 * @return {Any} 拷贝后的数据
	 * */
	function deepCopy(source) {
	  var copy; // 简单数据类型直接返回

	  if (source === null || _typeof(source) !== 'object') return source; // 日期深拷贝

	  if (source instanceof Date) {
	    copy = new Date();
	    copy.setTime(source.getTime());
	    return copy;
	  } // 数组深拷贝


	  if (source instanceof Array) {
	    copy = [];

	    for (var i = 0, len = source.length; i < len; i++) {
	      copy[i] = deepCopy(source[i]);
	    }

	    return copy;
	  } // 对象深拷贝


	  if (source instanceof Object) {
	    copy = {};

	    for (var attr in source) {
	      if (source.hasOwnProperty(attr)) copy[attr] = deepCopy(source[attr]);
	    }

	    return copy;
	  }

	  throw new Error("Unable to copy obj! Its type isn't supported.");
	}

	// 使用方式

	/*
	添加 css
	.modal-open{
		position: fixed
		width: 100%
	}
	*/

	/*
	* 加载页面先调用 const actionForbid = forbidBodyScroll ()
	* 弹出层显示和关闭时 actionForbid(isShow)
	* isShow: Boolean
	*/
	// 禁止body滚动，解决弹出蒙层滑动穿透问题
	function forbidBodyScroll() {
	  var scrollTop = 0;
	  var bodyClass = 'modal-open';

	  var afterOpen = function afterOpen() {
	    scrollTop = document.scrollingElement.scrollTop;
	    document.body.classList.add(bodyClass);
	    document.body.style.top = "-".concat(scrollTop, "px");
	  };

	  var beforeClose = function beforeClose() {
	    document.body.classList.remove(bodyClass);
	    document.scrollingElement.scrollTop = scrollTop;
	  };

	  var actionForbid = function actionForbid() {
	    var isForbid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	    isForbid ? afterOpen() : beforeClose();
	  };

	  return actionForbid;
	}

	/**
	 * 日期格式化
	 *
	 * @param {Date | Null} date 要格式化的日期
	 *
	 * @param {Pattern} 格式化类型支持：
	 * YY-MM-DD ==> 18-01-05
	 * YYYY-MM-DD ==> 2018-01-05
	 * YYYY-MM-DD HH:mm ==> 2018-01-05 15:30
	 * YYYY-MM-DD HH:mm:ss ==> 2018-01-05 15:30:11 (默认类型)
	 * YYYY-M-D H:m:s ==> 2018-1-5 8:8:8
	 *
	 *@params {String} lang(cn | en 中 | 英)
	 *
	 * @return {Date} 格式化后的日期
	 *
	 * e.g.
	 * let f = Timejs().format(Pattern, lang)
	 */
	function FormatTime(date) {
	  this.$d = this.parseConfig(date);
	  this.init();
	}

	FormatTime.prototype = {
	  parseConfig: function parseConfig(config) {
	    var reg;
	    if (!config) return new Date();
	    if (config instanceof Date) return config; // eslint-disable-next-line no-cond-assign

	    if (reg = String(config).match(/^(\d{4})-?(\d{2})-?(\d{1,2})$/)) {
	      // 2018-08-08 or 20180808
	      return new Date(reg[1], reg[2] - 1, reg[3]);
	    }

	    return new Date(config); // timestamp
	  },
	  padStart: function padStart(string, length, pad) {
	    if (!string || string.length >= length) return string;
	    return "".concat(Array(length + 1 - string.length).join(pad)).concat(string);
	  },
	  init: function init() {
	    this.$zone = this.$d.getTimezoneOffset() / 60;
	    this.$zoneStr = this.padStart(String(this.$zone * -1).replace(/^(.)?(\d)/, '$10$200'), 5, '+');
	    this.$y = this.$d.getFullYear();
	    this.$M = this.$d.getMonth();
	    this.$D = this.$d.getDate();
	    this.$W = this.$d.getDay();
	    this.$H = this.$d.getHours();
	    this.$m = this.$d.getMinutes();
	    this.$s = this.$d.getSeconds();
	    this.$ms = this.$d.getMilliseconds();
	  },
	  format: function format() {
	    var _this = this;

	    var formatStr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'YYYY-MM-DD HH:mm:ss';
	    var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'cn';
	    // 周字典
	    var weeksEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	    var weeksCN = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
	    var weeks = lang === 'en' ? weeksEN : weeksCN; // 月字典

	    var monthsEN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	    var monthsCN = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
	    var months = lang === 'en' ? monthsEN : monthsCN;
	    return formatStr.replace(/Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|m{1,2}|s{1,2}|Z{1,2}/g, function (match) {
	      switch (match) {
	        case 'YY':
	          return String(_this.$y).slice(-2);

	        case 'YYYY':
	          return String(_this.$y);

	        case 'M':
	          return String(_this.$M + 1);

	        case 'MM':
	          return _this.padStart(String(_this.$M + 1), 2, '0');

	        case 'MMM':
	          return months[_this.$M].slice(0, 3);

	        case 'MMMM':
	          return months[_this.$M];

	        case 'D':
	          return String(_this.$D);

	        case 'DD':
	          return _this.padStart(String(_this.$D), 2, '0');

	        case 'd':
	          return String(_this.$W);

	        case 'dddd':
	          return weeks[_this.$W];

	        case 'H':
	          return String(_this.$H);

	        case 'HH':
	          return _this.padStart(String(_this.$H), 2, '0');

	        case 'm':
	          return String(_this.$m);

	        case 'mm':
	          return _this.padStart(String(_this.$m), 2, '0');

	        case 's':
	          return String(_this.$s);

	        case 'ss':
	          return _this.padStart(String(_this.$s), 2, '0');

	        case 'Z':
	          return "".concat(_this.$zoneStr.slice(0, -2), ":00");

	        default:
	          // 'ZZ'
	          return _this.$zoneStr;
	      }
	    });
	  }
	};
	function Timejs(date) {
	  return function () {
	    return new FormatTime(date);
	  }();
	}

	// 获取html的字体大小
	function getFontSize() {
	  var htmlDOM = document.querySelector('html');
	  var htmlFontSize = window.getComputedStyle(htmlDOM).fontSize;
	  return +htmlFontSize.replace(/(\d+)\w+/g, '$1') || 1;
	}

	// 根据不同域名，获取不同变量

	/*
	* 调用方式:
	# 普通调用：
	const options = {
		'one.example.com': 'this is one domain',
		'two.example.com': 'this is two domain',
	}

	# 配置语言调用：
	const options = {
		'one.example.com_cn': 'this is one domain cn',
		'one.example.com_en': 'this is one domain en',
		'two.example.com_cn': 'this is two domain cn',
		'two.example.com_en': 'this is two domain en',
		lang: <'cn' OR 'en'>,
	}

	* 当前环境所用变量
	* let result = getVariableByDomain(options)
	*/
	function getVariableByDomain() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var domain = document.domain;

	  var _key = options.lang ? "".concat(domain, "_").concat(options.lang) : "".concat(domain);

	  return options[_key];
	}

	/**
	 * 获取数据具体类型
	 *
	 * @param  {Any} value 要判断的数据
	 * @return {String} 返回数据类型 'string', 'object', 'number', 'null', 'undefined', 'function'
	 */
	function typer(value) {
	  var typer = Object.prototype.toString;
	  var typeStr = typer.call(value);
	  typeStr = typeStr.replace(/.*\s(\w+)\]/g, '$1');
	  return typeStr.toLowerCase();
	}

	/**
	 * 判断所有数据类型是否为空
	 *
	 * @param  {Any} value 要判断的数据
	 * @return {Boolean} 布尔值
	 *
	 * 注：该方法依赖了 typer 方法
	 */
	function isEmpty(value) {
	  var type = typer(value);

	  switch (type) {
	    case 'object':
	      return Object.keys(value).length === 0;

	    case 'array':
	      return value.length === 0;

	    case 'number':
	      return !isNaN(value);

	    default:
	      return !!value;
	  }
	}

	/**
	 * 合并同类项
	 *
	 * @param  {Array} arr 需要合并的数据源
	 * @param  {String} standardProps 合并时参照的属性
	 * @param  {String} mergeProps 需要相加的属性
	 * @return {Array}
	 */
	function mergerOfSimilarItems(arr, standardProps, mergeProps) {
	  if (!(arr && standardProps && mergeProps)) return;
	  var faker = {};
	  var _key = 'key_';
	  arr.forEach(function (item) {
	    // 根据合并标准属性，生成唯一 __key
	    var __key = _key;
	    standardProps.forEach(function (sProp) {
	      __key = __key + item[sProp];
	    });
	    var itemValue = faker[__key];

	    if (!itemValue) {
	      faker[__key] = item;
	    } else {
	      // 根据 要合并的属性，进行合并计算
	      mergeProps.forEach(function (mProp) {
	        faker[__key][mProp] = +faker[__key][mProp] + +item[mProp];
	      });
	    }
	  }); // 加工成数组返回

	  return Object.keys(faker).map(function (key) {
	    return faker[key];
	  });
	}

	/**
	 * 对象转 form 数据
	 *
	 * @param  {Object} data 要转换的对象
	 * @return {String} 序列化后的字符串
	 *
	 * e.g.
	 * { name: 'hello', msg: 'world' } ==> name=hello&msg=world
	 *
	 * 注：依赖 typer 方法
	 */
	function obj2Params(data) {
	  var dataType = typer(data);

	  if (dataType !== 'object') {
	    console.error('function obj2Params receive a nonsupport type parameter.');
	    return;
	  }

	  return resolveObj(data).join('&');
	}
	function resolveObj(obj, parents) {
	  var result = [];
	  var parentsStr = '';
	  if (parents) parentsStr = parents.join('.') + '.';else parents = [];
	  Object.keys(obj).forEach(function (key) {
	    switch (typer(obj[key])) {
	      case 'object':
	        var insetObj = resolveObj(obj[key], parents.concat([key]));
	        result = result.concat(insetObj);
	        break;

	      case 'array':
	        result.push(parentsStr + key + '=' + obj[key].join());
	        break;

	      default:
	        result.push(parentsStr + key + '=' + obj[key]);
	        break;
	    }
	  });
	  return result;
	}

	/**
	 * 解析链接中的数据
	 *
	 * @param  {String | Null} url 需要解析的 url
	 * @return {Object} 返回解析后的对象
	 *
	 * e.g.
	 * http://example.cn/api?name=hello&msg=world => { name: 'hello', msg: 'world' }
	 */
	function parseUrl(url) {
	  url = url || window.location.href;
	  var splitUrl = url.split('?');

	  var _splitUrl = _slicedToArray(splitUrl, 2),
	      link = _splitUrl[0],
	      params = _splitUrl[1];

	  if (params) {
	    var result = {
	      url: link
	    };

	    var _params = params.split('&');

	    _params.forEach(function (item) {
	      var _item$split = item.split('='),
	          _item$split2 = _slicedToArray(_item$split, 2),
	          name = _item$split2[0],
	          key = _item$split2[1];

	      result[name] = decodeURIComponent(key);
	    });

	    return result;
	  } else {
	    return {};
	  }
	}

	// 正则

	/*
	* 正常使用:
	* regTips.verify('mobile', '17688888888') // true
	* 扩展正则:
	* 链式调用:
	* regTips.extend('addReg', /abcd/).verify('addReg', 'abcd')
	* 非链式调用
	* regTips.extend('addReg', /abcd/)
	* regTips.verify('addReg', 'abcd') // true
	*/
	var regTips = {
	  // 正则
	  _patterns: {
	    // 移动号码
	    mobile: /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57]|16[0-9])[0-9]{8}$/,
	    // 座机（固定电话）
	    tel: /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/,
	    // 密码: 8-16位数字 + 字母
	    password: /^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{8,16}$/,
	    // 邮箱 或 'noemail' 字段
	    email: /(^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$)|(^noemail$)/,
	    // 保留 2 位小数
	    save2BitPoint: /^[0-9]+(\.\d{1,2})?$/
	  },
	  // 验证
	  verify: function verify(type, str) {
	    if (!(type && str)) return false;

	    if (!this._patterns[type]) {
	      console.error('该正则不存在，可用 extend 方法扩展。');
	      return false;
	    }

	    return this._patterns[type].test(str);
	  },
	  // 扩展
	  extend: function extend(type, pattern) {
	    if (!(type && pattern)) return console.error('类型或正则不能为空');

	    if (this._patterns[type]) {
	      console.error('该正则已存在');
	      return false;
	    }

	    if (!(pattern instanceof RegExp)) return console.error('添加规则为 RegExp');
	    this._patterns[type] = pattern;
	    return this;
	  }
	};

	/**
	 * 设置页面 title，单页面应用，兼容 title 问题
	 *
	 * @param  {String} title 要设置的 title
	 */
	function setTitle(title) {
	  document.title = title;
	  var iframe = document.createElement('iframe');
	  iframe.style.display = 'none';

	  iframe.onload = function () {
	    return setTimeout(function () {
	      return iframe.remove();
	    }, 9);
	  };

	  document.body.appendChild(iframe);
	}

	// 新建 storage 对象
	function storage() {
	  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'localStorage';
	  var storageType = type;
	  return {
	    get: function get(key) {
	      var value = window[storageType].getItem(key);

	      if (value) {
	        try {
	          return JSON.parse(value);
	        } catch (e) {
	          return value;
	        }
	      } else return null;
	    },
	    set: function set(key, value) {
	      if (value && typer(value) === 'object') {
	        value = JSON.stringify(value);
	      }

	      window[storageType].setItem(key, value);
	    },
	    clearAll: function clearAll() {
	      window[storageType].clear();
	    },
	    clearItem: function clearItem(key) {
	      window[storageType].removeItem(key);
	    }
	  };
	}

	/**
	 * 禁止频繁操作函数
	 * （delay毫秒内只执行一次，第一次立即执行）
	 *
	 * @param  {Function} exec 待执行函数
	 * @param  {Number} delay=150ms 执行阀值时间（单位：毫秒）
	 * @return {Function} 返回一个函数，可被事件调用
	 */
	function threshold(exec, delay) {
	  if (!exec) return;
	  var lastExec = null;

	  if (delay === undefined) {
	    delay = 150;
	  }

	  return function () {
	    var now = +new Date();
	    var isExec = now - lastExec >= delay;
	    var args = arguments;

	    var _context = this;

	    if (!lastExec || isExec) {
	      // 防止上下文 this，参数 arguments 丢失
	      exec.apply(_context, args);
	      lastExec = +new Date();
	    }
	  };
	}

	/**
	 * 节流函数
	 *
	 * @param  {Function} fn 需要节流的函数
	 * @param  {Number} delay=150 设置节流的时间间隔（单位：毫秒）
	 * @return {Function} 返回一个节流函数，可被事件调用
	 *
	 * e.g.
	 * let fnThrottle = throttle(fun, delay)
	 * document.addEventListener('scroll', fnThrottle)
	 */
	function throttle(fn) {
	  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 150;
	  var now, lastExec, timer, context, args;

	  var execute = function execute() {
	    fn.apply(context, args);
	    lastExec = now;
	  };

	  return function () {
	    context = this;
	    args = arguments;
	    now = Date.now();

	    if (timer) {
	      clearTimeout(timer);
	      timer = null;
	    }

	    if (lastExec) {
	      var diff = delay - (now - lastExec);

	      if (diff < 0) {
	        execute();
	      } else {
	        timer = setTimeout(function () {
	          execute();
	        }, diff);
	      }
	    } else {
	      execute();
	    }
	  };
	}

	/*
	 * 判断浏览器是否为移动端
	 * @param   {boolean}   true为移动端
	*/
	function isMobile() {
	  var userAgentInfo = navigator.userAgent;

	  if (!!userAgentInfo.match(/AppleWebKit.*Mobile.*/) || !!userAgentInfo.match(/AppleWebKit/)) {
	    var temp = userAgentInfo.toLowerCase();

	    if (temp.indexOf('android') > -1 || temp.indexOf('iphone') > -1 || temp.indexOf('ipad') > -1 || temp.indexOf('windows phone') > -1 || temp.indexOf('blackberry') > -1 || temp.indexOf('hp-tablet') > -1 || temp.indexOf('symbian') > -1 || temp.indexOf('phone') > -1) {
	      return true;
	    }
	  }

	  return false;
	}

	/**
	 * 获取视口宽、高
	 *
	 * @params 无
	 *  @return {Object} 宽、高
	 */
	function viewportSize() {
	  var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
	  var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
	  return {
	    viewportH: viewportHeight,
	    viewportW: viewportWidth
	  };
	}

	/**
	 * @Author: gauseen 
	 * @Date: 2018-04-27 11:22:14 
	 * @Last Modified by: gauseen
	 * @Last Modified time: 2018-12-12 18:16:42
	 */

	exports.debounce = debounce;
	exports.deepCopy = deepCopy;
	exports.forbidBodyScroll = forbidBodyScroll;
	exports.getFontSize = getFontSize;
	exports.getVariableByDomain = getVariableByDomain;
	exports.typer = typer;
	exports.timejs = Timejs;
	exports.isEmpty = isEmpty;
	exports.mergerOfSimilarItems = mergerOfSimilarItems;
	exports.obj2Params = obj2Params;
	exports.parseUrl = parseUrl;
	exports.regTips = regTips;
	exports.setTitle = setTitle;
	exports.storage = storage;
	exports.threshold = threshold;
	exports.throttle = throttle;
	exports.isMobile = isMobile;
	exports.viewportSize = viewportSize;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
