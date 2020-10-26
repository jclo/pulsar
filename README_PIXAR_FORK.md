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


## Update Pulsar

`Pixar` is shipped with a very basic app but `Pulsar` is delivered by a more complex app built with `@mobilabs/rview`. From the fork of `Pixar`, you must add the folder:

  * public/src/app from the old version of `Pulsar`.

And modify `src/main.js` like this:

```javascript
function Pulsar() {
  Worker.start(sw, (err, msg) => {
    if (err) {
      console.log(err);
    } else {
      console.log(msg);
    }

    // Starts the App
    App.show();
  });
}

// Attaches a constant to Pulsar that provides the version of the lib.
Pulsar.VERSION = '{{lib:version}}';


// -- Starts the App
Pulsar();


// -- Export
export default Pulsar;
```

And `public/index.html` like that:

```html
<!-- Add your site or application content here -->
<div id="app" class="container">
  <!-- Everything will fit here: header, main section, footer -->
</div><!-- /.container -->
```

and

```html
<!-- Add your scripts here -->
<script type="module">
  import Pixar from './js/wapp.mjs';
</script>
```

### Update package.json

Add the following NPM modules:

  * dependencies: @mobilabs/rview,
  * devDendencies: jsdom, node-fetch


### Update test/main.js

Add a virtual DOM:

```javascript
// Create a Virtual DOM:
const HTML = `
  <!DOCTYPE html>
  <html>
    <head></head>
    <body>
      <div id="app"></div>
    </body>
  </html>
`;
const dom = new JSDOM(HTML);
global.window = dom.window;
global.document = dom.window.document;
global.navigator = { userAgent: 'node.js' };
global.fetch = fetch;

// Pixi must be defined after the virtual DOM is declared otherwise it fails
// because it can't recognize the DOM global variables.
const Pulsar = require('../public/src/main').default;
```


That's all!
