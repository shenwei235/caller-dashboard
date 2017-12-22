let baseUrl = 'http://api.internal.source3g.com:57557';

if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://api.internal.source3g.com:57557';
}

if (process.env.NODE_ENV === 'test') {
  baseUrl = 'http://dev.intra.source3g.com:57557';
}

if (process.env.NODE_ENV === 'preview') {
  baseUrl = 'http://preview.source3g.com:57557';
}

if (process.env.NODE_ENV === 'dev') {
  baseUrl = 'http://idevelop.source3g.com:57557';
}

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://idevelop.source3g.com:57557';
}

export default {
  'authFailPage': `${baseUrl}/wxb_datashift/index.html#/login`,
  // 增加子系统接口
  '/authoritySystem/add': `${baseUrl}/authoritySystem/add`,
  // 查询子系统接口
  '/authoritySystem/list': `${baseUrl}/authoritySystem/list`,
  // 获取某系统的菜单树
  '/sysmenu/querySysTree': `${baseUrl}/sysmenu/querySysTree`,
};
