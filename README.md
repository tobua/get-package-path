# get-package-path

Get the path to the current package works with npx and global installations.

> :warning: Package is currently in test stage and actual API differs from description!

## Usage

```
npm install get-package-path
```

```js
import { getPackagePath } from 'get-package-path'

console.log(getPackagePath('my-package-name'))
```

Can also be used to locate other dependent packages.

## Verification

To check if the package would work with your requirements you can directly try it out.

### npx

```sh
npx --yes get-package-path
```

`npm init` would store the package in the same place as `npx`.

### global

```sh
npm install -g get-package-path
get-package-path
# Prints path to package.
npm uninstall -g get-package-path
```
