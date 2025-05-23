type RunTimeEnv =
  // 微信开发工具
  | 'WX_DEVTOOLS'
  // 微信小程序
  | 'WX_MINI_PROGRAM'
  // 微信 Web
  | 'WX_WEB'
  // 企业微信
  | 'WX_WXWORK'
  // 普通的Web
  | 'WEB'

  // alo7 IOS app 里的 WEB
  | 'ALO7_APP_TEACHER_IOS'
  | 'ALO7_APP_STUDENT_IOS'
  // alo7 Android app 里的 WEB
  | 'ALO7_APP_TEACHER_ANDROID'
  | 'ALO7_APP_STUDENT_ANDROID'
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

  // Alo7Student/2.25.3 (iOS/17.2.1; Apple/iPhone SE 2nd Gen; zh_cn)
  if (
    typeof navigator !== 'undefined' &&
    navigator.userAgent &&
    navigator.userAgent.startsWith('Alo7Student')
  ) {
    return 'ALO7_APP_STUDENT_IOS';
  }

  // AXT_TEACHER/2.40.1.4705 (iPhone12,8; iOS 17.2.1)
  if (
    typeof navigator !== 'undefined' &&
    navigator.userAgent &&
    navigator.userAgent.startsWith('AXT_TEACHER')
  ) {
    return 'ALO7_APP_TEACHER_IOS';
  }

  // AXT_TEACHER/2.37.2.4687 (iPhone12,8; iOS 17.2.1)

  // 判断是否运行在普通的 Web 环境中
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    return 'WEB';
  }

  // 默认返回未知环境
  return 'UNKNOWN';
};

export default runtimeEnv;
