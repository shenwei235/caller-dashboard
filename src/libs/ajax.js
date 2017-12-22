import axios from 'axios';
// let qs = require('qs');
// import {
//   Message
// } from 'element-ui';
import utils from '@/libs/utils';
import AJAX_URL from '@/config/index';
const fetch = (options) => {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      timeout: 10000, // 超时
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      withCredentials: true
    });
    instance(options)
      .then(response => {
        let res = response.data;
        switch (res.code) {
          case '0':
          case 0:
            resolve(res.data);
            break;
          case '7':
          case 7:
          case -1001:
            window.location.href = AJAX_URL['authFailPage'];
            break;
          default:
            reject(res);
        }
      })
      .catch(error => {
        let err = error.toString();
        if (err && err.indexOf('timeout') > -1) {
          err = {
            message: '请求超时'
          };
        }
        reject(err);
      });
  });
};
export default {
  get: (url, sendData, serverType) => {
    // let data = '';
    // if (sendData && utils.serialize(sendData)) {
    //   data += utils.serialize(sendData);
    // }
    // check https://github.com/mzabriskie/axios#request-config for more details
    // use params
    return fetch({
      url: AJAX_URL[url],
      method: 'get',
      params: sendData
    });
  },
  post: (api, sendData, flag, serverType) => {
    let realSendData = '';
    realSendData = '_time=' + utils.getUNIXTimestamp();
    if (flag === 'ARRAY') {
      if (sendData) {
        for (let key in sendData) {
          realSendData += '&' + key + '=' + JSON.stringify(sendData[key]);
        }
      }
    } else {
      if (sendData) {
        realSendData += '&' + utils.serialize(sendData);
      }
    };
    return fetch({
      url: AJAX_URL[api],
      method: 'post',
      data: realSendData
    });
  },
  postArr: (api, sendData, flag, serverType) => {
    let realSendData = '';
    // realSendData = '_time=' + utils.getUNIXTimestamp();
    if (flag === 'ARRAY') {
      if (sendData) {
        // let inx = 0;
        // for (let key in sendData) {
        //   realSendData += (inx !== 0 ? '&' : '') + key + '=' + (utils.isArray(sendData[key]) || utils.isObject(sendData[key]) ? JSON.stringify(sendData[key]) : sendData[key]);
        //   inx++;
        // }
        realSendData = sendData;
      }
    } else {
      if (sendData) {
        realSendData += '&' + utils.serialize(sendData, '&', true);
      }
    }
    return fetch({
      url: AJAX_URL[api],
      method: 'post',
      data: realSendData,
      headers: {
        'Content-Type': serverType || 'application/x-www-form-urlencoded'
      }
    });
  },
  ajax: (opts) => {
    let defaults = {
      method: 'post'
    };
    let options = Object.assign({}, opts, defaults);
    if (options.data instanceof FormData) {
      // options.data.append('_time', utils.getUNIXTimestamp());
    } else {
      Object.assign(options.data, {
        '_time': utils.getUNIXTimestamp()
      });
    }
    return fetch({
      url: AJAX_URL[options.url],
      method: options.method,
      data: options.data
    });
  },
  ajaxOne: (opts) => {
    let defaults = {
      method: 'post'
    };
    let options = Object.assign({}, opts, defaults);
    return fetch({
      url: AJAX_URL[options.url],
      method: options.method,
      data: options.data
    });
  }
};
