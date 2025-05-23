# runtime-env
> Runtime-env is a JS library for detecting environments like Web, WeChat MiniProgram, and JSSDK.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
yarn add @jswork/runtime-env
```

## usage
```js
import runtimeEnv from '@jswork/runtime-env';

runtimeEnv(1024);

// [1000, 0, 20, 4]
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
