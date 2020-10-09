# PWA

Pulsar is a Web App and a PWA.

## How to become a PWA

Pulsar becomes a PWA by adding the script `sw.js` and the mainfest `manifest.json` in the root folder.

The header of the HTML pages includes:

```html
<!-- PWA manifest, Web manifest -->
<link rel="manifest" href="manifest.json">
...

<!-- Place favicon.ico in the root directory -->
...

<!-- iOS support -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="{{app:title}}">
<link rel="apple-touch-icon" href="img/icons/icon-152x152.png">
```

And the file `public/src/js/main.js` starts with:

```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then((reg) => {
      console.log('Service Worker registered ...');
    })
    .catch((err) => {
      console.log('Service Worker NOT registered ...');
    });
} else {
  console.log('Service Worker NOT started ...');
}
```

## How to please Google

### Redirect HTTP to HTTPS

Google Chrome doesn't activate the `service worker` if the protocol isn't HTTPS. Thus, you need to force your web traffic to use HTTPS. In your `.htaccess` add:

```bash
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTP_HOST} ^mydomain\.com [NC]
  RewriteCond %{SERVER_PORT} 80
  RewriteRule ^(.*)$ https://www.mydomain.com/$1 [R,L]
</IfModule>
```

Besides, you need to add a canonical link in the header of your html file as this:

```HTML
<head>
  ...
  <link rel="canonical" href="https://www.mydomain.com" />
  ...
</head>
```

### Add a warning message for JavaScript

Google's lighthouse audit fails if there if there is no warning to prevents the user to turn on JavaScrit. In the body of your html file add this line:

```HTML
<noscript><p style="text-align:center;padding-top:3em;">We are sorry, but this website doesn't work properly without JavaScript enabled!</p></noscript>
```


## How to remove the PWA capability

This is pretty straightforward. You have just to remove the lines that start the `Service Worker` in the file `public/src/js/main.js` and to remove the PWA manifest from the head section of the HTML files.


## Appendix

  * [Your First Progressive Web App](https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0),
  * [Web Fundamentals
](https://developers.google.com/web/fundamentals/app-install-banners),
  * [Web Fundamentals - Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers),
  * [Workbox](https://developers.google.com/web/tools/workbox),
  * [Web App Manifest Generator](https://app-manifest.firebaseapp.com),
  * [PWA Tutorial for Beginners](https://www.youtube.com/watch?v=4XT23X0Fjfk&list=PL4cUxeGkcC9gTxqJBcDmoi5Q2pzDusSL7&index=1),
