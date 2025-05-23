type RunTimeEnv =
  // 微信开发工具
  | 'WX_DEVTOOLS'
  // 微信小程序
  | 'WX_MINI_PROGRAM'
  // 微信 Web
  | 'WX_WEB'
  // 微信小程序 WebView 环境
  | 'WX_MINI_PROGRAM_WEBVIEW'
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

declare global {
  interface Window {
    __wxjs_environment?: 'miniprogram' | string;
  }
}

// iOS 设备检测正则 (匹配 iPhone/iPad/iPod)
const IOS_REGEX = /(iphone|ipad|ipod)/;
// Android 设备检测正则 (匹配 Android 设备，排除 Chrome Mobile)
const ANDROID_REGEX = /android(?!.*chrome\/[.\d]* mobile)/;

const RUNTIME_CACHE = {
  value: null
};

// ----- ALO7 APP UA LIST -----
// Alo7Student/2.25.3 (iOS/17.2.1; Apple/iPhone SE 2nd Gen; zh_cn)
// AXT_TEACHER/2.37.2.4687 (iPhone12,8; iOS 17.2.1)
// Alo7Student/2.25.2 (Android/15; google/sdk_gphone64_arm64; zh_CN)
// AXT_TEACHER/2.40.0 (google sdk_gphone64_arm64; Android 15)

const runtimeEnv = (): RunTimeEnv => {
  let isIOS = false;
  let isAndroid = false;
  let isStudent = false;
  let isTeacher = false;
  let isWX = false;

  if (typeof wx !== 'undefined') isWX = true;
  if (typeof navigator !== 'undefined' && navigator.userAgent) {
    const ua = navigator.userAgent.toLowerCase();
    isIOS = IOS_REGEX.test(ua);
    isAndroid = ANDROID_REGEX.test(ua);
    isStudent = ua.indexOf('alo7student') !== -1;
    isTeacher = ua.indexOf('axt_teacher') !== -1;
  }

  if (isIOS) {
    if (isStudent) return 'ALO7_APP_STUDENT_IOS';
    if (isTeacher) return 'ALO7_APP_TEACHER_IOS';
  }

  if (isAndroid) {
    if (isStudent) return 'ALO7_APP_STUDENT_ANDROID';
    if (isTeacher) return 'ALO7_APP_TEACHER_ANDROID';
  }

  // 判断是否运行在微信小程序中
  if (isWX && wx.getSystemInfoSync) {
    const systemInfo = wx.getSystemInfoSync();
    if (systemInfo && systemInfo.platform === 'devtools') {
      return 'WX_DEVTOOLS';
    } else if (systemInfo && (systemInfo.platform === 'ios' || systemInfo.platform === 'android')) {
      return 'WX_MINI_PROGRAM';
    }
  }

  // 企业微信
  if (isWX && wx.qy) return 'WX_WXWORK';
  if (isWX && global.__wxjs_environment === 'miniprogram') return 'WX_MINI_PROGRAM_WEBVIEW';
  if (isWX && typeof wx.miniProgram !== 'undefined') return 'WX_WEB';

  // 判断是否运行在普通的 Web 环境中
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    return 'WEB';
  }

  // 默认返回未知环境
  return 'UNKNOWN';
};

export default runtimeEnv;
