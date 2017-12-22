function Str2Hex(s) {
  var c = '';
  var n;
  var ss = '0123456789ABCDEF';
  var digS = '';
  for (var i = 0; i < s.length; i++) {
    c = s.charAt(i);
    n = ss.indexOf(c);
    digS += Dec2Dig(utils.evil(n));
  }
  //  return value;
  return digS;
}

function Dec2Dig(n1) {
  var s = '';
  var n2 = 0;
  for (var i = 0; i < 4; i++) {
    n2 = Math.pow(2, 3 - i);
    if (n1 >= n2) {
      s += '1';
      n1 = n1 - n2;
    } else {
      s += '0';
    }
  }
  return s;
}

function Dig2Dec(s) {
  var retV = 0;
  if (s.length === 4) {
    for (var i = 0; i < 4; i++) {
      retV += utils.evil(s.charAt(i)) * Math.pow(2, 3 - i);
    }
    return retV;
  }
  return -1;
}

function Hex2Utf8(s) {
  var retS = '';
  var tempS = '';
  var ss = '';
  if (s.length === 16) {
    tempS = '1110' + s.substring(0, 4);
    tempS += '10' + s.substring(4, 10);
    tempS += '10' + s.substring(10, 16);
    var sss = '0123456789ABCDEF';
    for (var i = 0; i < 3; i++) {
      retS += '%';
      ss = tempS.substring(i * 8, (utils.evil(i) + 1) * 8);
      retS += sss.charAt(Dig2Dec(ss.substring(0, 4)));
      retS += sss.charAt(Dig2Dec(ss.substring(4, 8)));
    }
    return retS;
  }
  return '';
}
var utils = {
  //  将对象转为序列化的字符串,sp为分隔符,默认为&
  serialize: function (obj, sp, type) {
    var str = '';
    sp = sp || '&';
    for (var i in obj) {
      if (typeof obj[i] !== 'undefined' && obj[i] !== '') {
        if (type && obj[i] instanceof Array && obj[i].length > 0) {
          for (let k in obj[i]) {
            if (obj[i][k] && obj[i][k] instanceof Object) {
              for (let key in obj[i][k]) {
                str += `${i}[${k}].${key}=${encodeURIComponent(obj[i][k][key])}`;
                str += sp;
              }
            } else {
              str += i + '=' + encodeURIComponent(obj[i][k]);
              str += sp;
            }
          }
        } else {
          str += i + '=' + encodeURIComponent(obj[i]);
          str += sp;
        }
      }
    }
    if (str.length > 0) {
      str = str.substring(0, str.length - 1);
    }
    return str;
  },
  evil: function (fn) {
    var Fn = Function; //  一个变量指向Function，防止有些前端编译工具报错
    return new Fn('return ' + fn)();
  },
  //  将序列化字符串解析为对象，sp为分隔符,默认为&
  serializeObject: function (str, sp) {
    var o = {};
    sp = sp || '&';
    var arr = str.split(sp);
    for (var i = 0; i < arr.length; i++) {
      var key = arr[i].split('=')[0];
      var value = arr[i].split('=')[1];
      if (typeof value !== 'undefined') {
        o[key] = decodeURIComponent(value);
      }
    }
    return o;
  },
  //  获取UNIX时间戳
  getUNIXTimestamp: function () {
    return Math.round(new Date().getTime() / 1000);
  },
  //  获取日期
  getFormat: function (fmt, dataTime) {
    dataTime = dataTime || new Date();
    var o = {
      "M+": dataTime.getMonth() + 1,
      "d+": dataTime.getDate(),
      "h+": dataTime.getHours(),
      "m+": dataTime.getMinutes(),
      "s+": dataTime.getSeconds(),
      "q+": Math.floor((dataTime.getMonth() + 3) / 3),
      "S": dataTime.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (dataTime.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    };
    return fmt;
  },
  //  获取指定时间点的Date,参数分别为天，时，分，秒
  getExpiredays: function (d, h, m, s) {
    var nd = new Date();
    //  var day = d | 0;
    var hour = h | 0;
    var minite = m | 0;
    var second = s | 0;
    var expiresDate = new Date(nd.getTime() + (d * 24 * 3600 + (hour) * 3600 + minite * 60 + second) * 1000);
    return expiresDate;
  },
  each: function (arr, callback) {
    if (typeof arr !== 'undefined') {
      if (Object.prototype.toString.call(arr) === '[object Array]') {
        for (let i = 0; i < arr.length; i++) {
          if (callback.call(arr, i) === false) {
            break;
          }
        }
      } else {
        for (let i = 0; i < arr.length; i++) {
          if (callback.call(arr, i) === false) {
            break;
          }
        }
      }
    }
  },
  rnd: function (n, m) {
    var random = Math.floor(Math.random() * (m - n + 1) + n);
    return random;
  },
  isType: function (type, obj) {
    return {}.toString.call(obj) === '[object ' + type + ']';
  },
  isObject: function (obj) {
    return this.isType('Object', obj);
  },
  isString: function (str) {
    return this.isType('String', str);
  },
  isArray: function (arr) {
    return Array.isArray(arr) || this.isType('Array', arr);
  },
  isFunction: function (func) {
    return this.isType('Function', func);
  },
  isUndefined: function (und) {
    return this.isType('Undefined', und);
  },
  isFloat: function (str) {
    return str && /^-?\d*(\.\d+)?$/.test(str);
  },
  isInteger: function (str) {
    return str && str % 1 === 0 && str > 0;
  },
  EncodeUtf8: function (s1) {
    //   escape函数用于对除英文字母外的字符进行编码。如“Visit W3School!”->'Visit%20W3School%21'
    var s = escape(s1);
    var sa = s.split('%'); //  sa[1]=u6211
    var retV = '';
    if (sa[0] !== '') {
      retV = sa[0];
    }
    for (var i = 1; i < sa.length; i++) {
      if (sa[i].substring(0, 1) === 'u') {
        retV += Hex2Utf8(Str2Hex(sa[i].substring(1, 5)));
        if (sa[i].length >= 6) {
          retV += sa[i].substring(5);
        }
      } else retV += '%' + sa[i];
    }
    return retV;
  },
  getFileExtension: function (filename) {
    var tempArr = filename.split('.');
    var ext;
    if (tempArr.length === 1 || (tempArr[0] === '' && tempArr.length === 2)) {
      ext = '';
    } else {
      ext = tempArr.pop().toLowerCase(); //  get the extension and make it lower-case
    }
    return ext;
  },
  getFileName: function (filename) {
    var tempArr = filename.split(".");
    var name;
    if (tempArr.length === 1 || (tempArr[0] === "" && tempArr.length === 2)) {
      name = "";
    } else if (tempArr.length === 2) {
      name = tempArr.shift();
    } else {
      tempArr.pop();
      name = tempArr.join('.');
    }
    if (name.length > 10) {
      name = name.substring(0, 9) + '...';
    }
    return name;
  },
  confirmFun: function (args) {
    args.self.$confirm(args.txt, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        args.core
          .post(args.url, args.data)
          .done(function (res) {
            args.self.$message.success(args.msg);
            args.self.fullscreenLoading = false;
            args.self.fetchData();
          })
          .fail(function (code, msg) {
            args.self.$message.error(msg);
          });
      })
      .catch(_ => {});
  },
  getArea: function (args) {
    let url = '';
    if (args.type === "city") {
      if (args.data && args.data.parentId) {
        url = 'area/cityList';
      } else {
        return;
      }
    } else if (args.type === "area") {
      if (args.data && args.data.parentId) {
        url = 'area/areaList';
      } else {
        return;
      }
    } else {
      url = 'area/provinceList';
    }
    args.core.get(
      url,
      args.data
    ).done(function (res) {
      args.self[args.optionType] = res;
    }).fail(function (code, msg) {
      args.self.$message.error(msg);
    });
  },
  qiniuUpload: function (self, domain) {
    Qiniu.uploader({
      runtimes: "html5,flash,html4", // 上传模式,依次退化
      browse_button: "pickfiles", // 上传选择的点选按钮，**必需**
      // uptoken_url: "", // Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
      uptoken: self.token, // 若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
      // unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
      // save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
      domain: domain, // bucket 域名，下载资源时用到，**必需**
      get_new_uptoken: false, // 设置上传文件的时候是否每次都重新获取新的token
      container: "container", // 上传区域DOM ID，默认是browser_button的父元素，
      max_file_size: self.maxFileSize, // 最大文件体积限制
      flash_swf_url: "js/plupload/Moxie.swf", // 引入flash,相对路径
      max_retries: 3, // 上传失败最大重试次数
      dragdrop: true, // 开启可拖曳上传
      drop_element: "container", // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
      chunk_size: "4mb", // 分块上传时，每片的体积
      auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
      unique_names: false,
      save_key: false,
      filters: {
        mime_types: self.mime_types,
        prevent_duplicates: true
      },
      init: {
        FilesAdded: function (up, files) {
          self.fullscreenLoading = true;
          if (self.type === "multiple") {
            self.dialogTableVisible = true;
          }
          plupload.each(files, function (file) {
            // 文件添加进队列后,处理相关的事情
          });
        },
        BeforeUpload: function (up, file) {
          // 每个文件上传前,处理相关的事情
        },
        UploadProgress: function (up, file) {
          // 每个文件上传时,处理相关的事情
          // var name = file.name;
          // var percent = file.percent;
          // var totalPercent = up.total.percent;

          if (self.type === "multiple") {
            self.totalPercent = file.percent + '%';
          } else {
            self.filename = utils.getFileName(file.name) +
              "." +
              utils.getFileExtension(file.name);
            self.percent = file.percent;
          }
        },
        FileUploaded: function (up, file, info) {
          var fileInfo = JSON.parse(info);
          if (file.size > 1024) {
            if (file.size / 1024 > 1024) {
              file.size = (Math.floor((file.size / 1024 / 1024) * 100) / 100) + 'm';
            } else {
              file.size = (Math.floor((file.size / 1024) * 100) / 100) + 'kb';
            }
          } else {
            file.size = file.size + 'b';
          }
          self.fileList.push({
            key: fileInfo.key,
            hash: fileInfo.hash,
            file: file,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type
          });
          // 每个文件上传成功后,处理相关的事情
          // 其中 info.response 是文件上传成功后，服务端返回的json，形式如
          // {
          //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
          //    "key": "gogopher.jpg"
          //  }
          // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
          // var domain = up.getOption('domain');
          // var res = parseJSON(info.response);
          // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
        },
        Error: function (up, err, errTip) {
          // 上传出错时,处理相关的事情
          if (err.status == '401') {
            alert('文件上传的Token已经失效，请刷新页面！');
          } else if (err.code == '-601') {
            self.$message.error("文件格式不对");
          } else if (err.code == '-600') {
            self.$message.error("上传文件不能超过50M");
          } else {
            self.$message.error("errTip");
          }
        },
        UploadComplete: function () {
          if (self.type === "multiple") {
            self.totalPercent = '100%';
            self.buttondisable = false;
          }
          self.fullscreenLoading = false;
          // 队列文件处理完毕后,处理相关的事情
        },
        Key: function (up, file) {
          // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
          // 该配置必须要在 unique_names: false , save_key: false 时才生效

          // var key = "";
          // do something with key here
          // return (
          //   utils.getFormat("yyyy-MM-dd", new Date()) +
          //   '/' + utils.getFileName(file.name) + new Date().getTime() +
          //   "." +
          //   utils.getFileExtension(file.name)
          // );
        }
      }
    });
  },
  getFileRealName: function (filename) {
    //   var tempArr = filename.split('.');
    //   var name;
    //   if (tempArr.length === 1 || (tempArr[0] === '' && tempArr.length === 2)) {
    //       name = '';
    //   } else if (tempArr.length === 2) {
    //       name = tempArr.shift();
    //   } else {
    //       tempArr.pop();
    //       name = tempArr.join('.');
    //   }
    //   return window.encodeURIComponent(name);
    var guid = function () {
      var s4 = function () {
        const rand = (1 + Math.random()) * 0x10000;
        return (rand | 0).toString(16).substring(1);
      };
      //   return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
      return `${s4()}${s4()}${s4()}${s4()}`;
    };
    return (new Date()).getTime() + '_' + guid();
  },
  compareFloat: function (a, b) {
    return ~~(a * 100) > ~~(b * 100);
  }
  //   insert b(array) into a[i]...
  //   [].splice.apply(a,[i,0].concat(b))
};
module.exports = utils;
