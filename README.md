<p align="center">
  <img src="logo.png" width="100" height="100">
  <br>
  <b role="heading" aria-level="1">DarkMode</b>
  <br>
  A micro library (~350B) for handling dark mode on browsers.
  <br><br>
  <a href="https://travis-ci.com/kazzkiq/darkmode"><img src="https://travis-ci.com/kazzkiq/darkmode.svg?token=8NxvMyxN8sgafdHfeb8d&branch=master" alt="Build Status"></a>
</p>

## Instalation

You can install DarkMode via **npm**:

```
npm install --save @kazzkiq/darkmode
```

Or use it directly in browser via CDN service:

```
https://unpkg.com/@kazzkiq/darkmode/dist/darkmode.umd.js
```

<small>When using directly in browser, all functions will be available under `DarkMode` object.</small>

## Usage

```js
import { isDark, onUpdate } from '@kazzkiq/darkmode';

const isDarkMode = isDark();

onUpdate((isDark) => {
  // isDark will be true or false
});
```

### isDark()

To detect if the browser is in dark mode, simply run `isDark()`.

```js
import { isDark } from '@kazzkiq/darkmode';

const isDarkMode = isDark(); // true|false
```

### onUpdate()

To detect if the browser toggled dark mode, you can rely on `onUpdate()`.

```js
import { onUpdate } from '@kazzkiq/darkmode';

onUpdate((isDark) => {
  // isDark returns true|false
});
```

### setDark()

Sometimes you will want to let your user decide to enforce dark mode, even when their OS doesn't supports it. In these cases you can programatically set dark mode locally, and by making use of `localStorage` DarkMode can then behave accordingly.

```js
import { setDark, isDark, isDarkLocal } from '@kazzkiq/darkmode';

setDark(true); // now this user is in DarkMode

isDark(); // reads browser/OS dark mode, thus returns false
isDarkLocal(); // reads localStorage value, thus returns true
```

`setDark()` also triggers `onUpdate()` automatically.

### isDarkLocal()

`isDark()` will always returns browser/OS dark mode status. When you enforce dark mode using `setDark()`, you can then use `isDarkLocal()` to check if the user preference is for dark mode even with browser/OS not being in this mode.

```js
import { isDarkLocal } from '@kazzkiq/darkmode';

const isDarkMode = isDarkLocal(); // true|false based on localStorage, not on browser/OS configs.
```

### Browsers which doesn't support it

For any browser that doesn't supports dark mode, the `isDark()` function will always return  `false`.

Even in browsers that doesn't supports it, you can still "simulate" it by using `setDark()` and `isDarkLocal()`.


### Function conflicts

In case of any of DarkMode functions conflict with current functions in your project, you can import them under `DarkMode` object to prevent conflicts:

```js
import * as DarkMode from '@kazzkiq/darkmode';

DarkMode.isDark();
DarkMode.onUpdate();
DarkMode.setDark();
// ...
```
