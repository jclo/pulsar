# Pulsar

`Pulsar` is a fork of `Pixar`. Instead of relying on `Kadoo` to bundle the Javascript source files, it relies on `Pakket`.


## Create Pulsar

If you need to update `Pulsar` to keep it in line with the improvements made to `Pixar`, duplicate the `Pixar project`, then apply the following changes:


### Git

Replace the `.git` folder by the `Pulsar` one.


### Models

Replace `Pixar` by  `Pulsar` in the following files:

  * src/main.js,
  * index.html,
  * manifest.json,
  * offline.html,
  * README_PWA.md,
  * site.webmanifest,


### Public

Replace `Pixar` by  `Pulsar` in the following files:

  * src/main.js,
  * index.html,
  * manifest.json,
  * offline.html,
  * README_PWA.md,
  * site.webmanifest,


### Tasks

#### config.js

Modifiy the tile `tasks/config.js` by replacing:

```js
const libname    = 'Pixar'
    , source     = './public/src/main.js'
    , exportname = 'Pixar'
    ;
```

by:

```js
const libname    = 'Pulsar'
    , source     = './public/src/main.js'
    , exportname = 'Pulsar'
    ;
```

and:

```js
' * Built from {{boiler:name}} v{{boiler:name:version}} and ES6Kadoo v0.0.0-beta.1.',
```

by:


```js
' * Built from {{boiler:name}} v{{boiler:name:version}} and ES6Pakket vx.x.x.',
```

### makejs.js

Modifiy the file `tasks/config.js` by replacing:

```js
const { src, dest, series } = require('gulp')
    ...
    , Kadoo   = require('kadoo')
    ...
    ;
```
and:

```js
// Creates the library.
function dolib() {
  const kadoo = Kadoo(source, { type: 'generic', export: exportname });

  return kadoo.bundle()
    .pipe(replace('{{lib:version}}', version))
    .pipe(concat(`${bundle}.js`))
    .pipe(dest(destination))
  ;
}
```

by:

```js
const { src, dest, series } = require('gulp')
    ...
    , Pakket  = require('pakket')
    ;
```

and:

```js
// Creates the library.
function dolib() {
  const pakket = Pakket(source, { type: 'generic', export: exportname });

  return pakket.bundle()
    .pipe(replace('{{lib:version}}', version))
    .pipe(concat(`${bundle}.js`))
    .pipe(dest(destination))
  ;
}
```

The other Gulp tasks are identical.


### Test

Modifiy the reference to `Pixar` by `Pulsar`.


### package.json

Replace:

```js
"name": "@mobilabs/pixar",
"version": "0.0.3-alpha.1",
"description": "A boilerplate to build simple Web Apps relying on Kadoo",
```

by:

```js
"name": "@mobilabs/pulsar",
"version": "x.x.x",
"description": "A boilerplate to build complex Web Apps relying on Pakket",
```

Replace in the following link, the reference to `pixar` by `pulsar`:

```js
https://github.com/jclo/pixar.git
https://github.com/jclo/pixar/issues
https://github.com/jclo/pixar
```

Then, remove the package `kadoo` and add the package `pakket`.

### others

And finally, replace `README.md` and `CHANGELOG.md` files by `Pulsar` ones.

That'is all!
