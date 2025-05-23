# runtime-env
> Runtime-env is a JS library for detecting environments like Web, WeChat MiniProgram, and JSSDK.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
yarn add @jswork/runtime-env
```

## usage
```js
import runtimeEnv from '@jswork/runtime-env';

// 获取当前运行环境
const env = runtimeEnv();

// 可能的返回值：
// - 'WEB' - 普通网页环境
// - 'WX_MINI_PROGRAM' - 微信小程序
// - 'WX_DEVTOOLS' - 微信开发者工具
// - 'WX_WXWORK' - 企业微信
// - 'WX_WEB' - 微信网页
// - 'ALO7_APP_STUDENT_IOS' - ALO7 学生端 iOS App
// - 'ALO7_APP_STUDENT_ANDROID' - ALO7 学生端 Android App
// - 'ALO7_APP_TEACHER_IOS' - ALO7 教师端 iOS App
// - 'ALO7_APP_TEACHER_ANDROID' - ALO7 教师端 Android App
// - 'UNKNOWN' - 未知环境
```

## license
Code released under [the MIT license](https://github.com/afeiship/runtime-env/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/runtime-env
[version-url]: https://npmjs.org/package/@jswork/runtime-env

[license-image]: https://img.shields.io/npm/l/@jswork/runtime-env
[license-url]: https://github.com/afeiship/runtime-env/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/runtime-env
[size-url]: https://github.com/afeiship/runtime-env/blob/master/dist/runtime-env.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/runtime-env
[download-url]: https://www.npmjs.com/package/@jswork/runtime-env
