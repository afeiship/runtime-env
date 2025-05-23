type RunTimeEnv =
  // 微信小程序
  | 'WX_MINI_PROGRAM'
  // 微信 Web
  | 'WX_WEB'
  // 微信开发工具
  | 'WX_DEVTOOLS'
  // 企业微信
  | 'WX_WXWORK'
  // 普通的Web
  | 'WEB'
  // alo7 IOS app 里的 WEB
  | 'ALO7_APP_IOS'
  // alo7 Android app 里的 WEB
  | 'ALO7_APP_ANDROID'
  // 其它未知情况
  | 'UNKNOWN';

declare const wx: any;
const runtimeEnv = (): RunTimeEnv => {
  // 判断是否运行在微信小程序中
  if (typeof wx !== 'undefined' && wx.getSystemInfoSync) {
    const systemInfo = wx.getSystemInfoSync();
    if (systemInfo && systemInfo.platform === 'devtools') {
      return 'WX_DEVTOOLS';
    } else if (systemInfo && (systemInfo.platform === 'ios' || systemInfo.platform === 'android')) {
      return 'WX_MINI_PROGRAM';
    }
  }

  // 企业微信
  if (typeof wx !== 'undefined' && wx.qy) {
    return 'WX_WXWORK';
  }

  // 判断是否运行在微信 JSSDK 环境中
  if (typeof wx !== 'undefined' && typeof wx.miniProgram !== 'undefined') {
    return 'WX_WEB';
  }

  // 判断是否运行在普通的 Web 环境中
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    return 'WEB';
  }

  // 默认返回未知环境
  return 'UNKNOWN';
};

export default runtimeEnv;
