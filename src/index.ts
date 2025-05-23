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

  // 判断是否运行在微信 JSSDK 环境中
  if (isWX && typeof wx.miniProgram !== 'undefined') {
    return 'WX_WEB';
  }

  if (typeof navigator !== 'undefined' && navigator.userAgent) {
    const ua = navigator.userAgent.toLowerCase();
    isIOS = ua.indexOf('ios ') !== -1;
    isAndroid = ua.indexOf('android ') !== -1;
    isStudent = ua.indexOf('alo7student') !== -1;
    isTeacher = ua.indexOf('axt_teacher') !== -1;
  }

  // Alo7Student/2.25.3 (iOS/17.2.1; Apple/iPhone SE 2nd Gen; zh_cn)
  // AXT_TEACHER/2.37.2.4687 (iPhone12,8; iOS 17.2.1)

  // Alo7Student/2.25.2 (Android/15; google/sdk_gphone64_arm64; zh_CN)
  // AXT_TEACHER/2.40.0 (google sdk_gphone64_arm64; Android 15)

  if (isIOS) {
    if (isStudent) return 'ALO7_APP_STUDENT_IOS';
    if (isTeacher) return 'ALO7_APP_TEACHER_IOS';
  }

  if (isAndroid) {
    if (isStudent) return 'ALO7_APP_STUDENT_ANDROID';
    if (isTeacher) return 'ALO7_APP_TEACHER_ANDROID';
  }

  // 判断是否运行在普通的 Web 环境中
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    return 'WEB';
  }

  // 默认返回未知环境
  return 'UNKNOWN';
};

export default runtimeEnv;
