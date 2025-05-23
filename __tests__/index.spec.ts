import runtimeEnv from '../src';

describe('Normal test cases', () => {
  beforeEach(() => {
    // 清除全局对象
    global.wx = undefined;
    global.navigator = undefined;
    global.window = undefined;
    global.document = undefined;
  });

  test('simulte wx.qy.env', () => {
    global.wx = { qy: {} };
    expect(runtimeEnv()).toBe('WX_WXWORK');
  });

  test('simulte wx miniprogram devtools', () => {
    global.wx = {
      getSystemInfoSync: () => ({
        platform: 'devtools'
      })
    };
    expect(runtimeEnv()).toBe('WX_DEVTOOLS');
  });

  test('simulte wx miniprogram ios', () => {
    global.wx = {
      getSystemInfoSync: () => ({
        platform: 'ios'
      })
    };
    expect(runtimeEnv()).toBe('WX_MINI_PROGRAM');
  });

  test('simulte wx miniprogram android', () => {
    global.wx = {
      getSystemInfoSync: () => ({
        platform: 'android'
      })
    };
    expect(runtimeEnv()).toBe('WX_MINI_PROGRAM');
  });

  test('simulte wx web', () => {
    global.wx = { miniProgram: {} };
    expect(runtimeEnv()).toBe('WX_WEB');
  });

  test('simulte alo7 ios teacher', () => {
    global.navigator = {
      userAgent: 'AXT_TEACHER/2.37.2.4687 (iPhone12,8; iOS 17.2.1)'
    };
    expect(runtimeEnv()).toBe('ALO7_APP_TEACHER_IOS');
  });

  test('simulte alo7 ios student', () => {
    global.navigator = {
      userAgent: 'Alo7Student/2.25.3 (iOS/17.2.1; Apple/iPhone SE 2nd Gen; zh_cn)'
    };
    expect(runtimeEnv()).toBe('ALO7_APP_STUDENT_IOS');
  });

  test('simulte alo7 android teacher', () => {
    global.navigator = {
      userAgent: 'AXT_TEACHER/2.40.0 (google sdk_gphone64_arm64; Android 15)'
    };
    expect(runtimeEnv()).toBe('ALO7_APP_TEACHER_ANDROID');
  });

  test('simulte alo7 android student', () => {
    global.navigator = {
      userAgent: 'Alo7Student/2.25.2 (Android/15; google/sdk_gphone64_arm64; zh_CN)'
    };
    expect(runtimeEnv()).toBe('ALO7_APP_STUDENT_ANDROID');
  });

  test('simulte web', () => {
    global.window = {};
    global.document = {};
    expect(runtimeEnv()).toBe('WEB');
  });

  test('simulte unknown', () => {
    expect(runtimeEnv()).toBe('UNKNOWN');
  });
});

describe('Edge cases', () => {
  beforeEach(() => {
    global.wx = undefined;
    global.navigator = undefined;
    global.window = undefined;
    global.document = undefined;
  });

  test('should handle invalid wx.getSystemInfoSync', () => {
    global.wx = {
      getSystemInfoSync: () => null
    };
    expect(runtimeEnv()).toBe('UNKNOWN');
  });

  test('should handle empty platform in wx.getSystemInfoSync', () => {
    global.wx = {
      getSystemInfoSync: () => ({
        platform: ''
      })
    };
    expect(runtimeEnv()).toBe('UNKNOWN');
  });

  test('should handle empty userAgent', () => {
    global.navigator = {
      userAgent: ''
    };
    expect(runtimeEnv()).toBe('UNKNOWN');
  });

  test('should handle malformed userAgent for iOS', () => {
    global.navigator = {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS like Mac OS X)'
    };
    expect(runtimeEnv()).toBe('UNKNOWN');
  });

  test('should handle malformed userAgent for Android', () => {
    global.navigator = {
      userAgent: 'Mozilla/5.0 (Linux; Android)'
    };
    expect(runtimeEnv()).toBe('UNKNOWN');
  });

  test('should handle partial web environment (only window)', () => {
    global.window = {};
    expect(runtimeEnv()).toBe('UNKNOWN');
  });

  test('should handle partial web environment (only document)', () => {
    global.document = {};
    expect(runtimeEnv()).toBe('UNKNOWN');
  });
});
