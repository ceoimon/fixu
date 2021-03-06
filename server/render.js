const cssPath = process.env.NODE_ENV === 'production' ? '/dist/css/styles.min.css' : '/dist/css/styles.css'

const faviconDom = `
<link rel="apple-touch-icon" sizes="57x57" href="/img/icons/apple-touch-icon-57x57.png" />
<link rel="apple-touch-icon" sizes="60x60" href="/img/icons/apple-touch-icon-60x60.png" />
<link rel="apple-touch-icon" sizes="72x72" href="/img/icons/apple-touch-icon-72x72.png" />
<link rel="apple-touch-icon" sizes="76x76" href="/img/icons/apple-touch-icon-76x76.png" />
<link rel="apple-touch-icon" sizes="114x114" href="/img/icons/apple-touch-icon-114x114.png" />
<link rel="apple-touch-icon" sizes="120x120" href="/img/icons/apple-touch-icon-120x120.png" />
<link rel="apple-touch-icon" sizes="144x144" href="/img/icons/apple-touch-icon-144x144.png" />
<link rel="apple-touch-icon" sizes="152x152" href="/img/icons/apple-touch-icon-152x152.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/img/icons/apple-touch-icon-180x180.png" />
<link rel="icon" type="image/png" href="/img/icons/favicon-32x32.png" sizes="32x32" />
<link rel="icon" type="image/png" href="/img/icons/favicon-194x194.png" sizes="194x194" />
<link rel="icon" type="image/png" href="/img/icons/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/png" href="/img/icons/android-chrome-192x192.png" sizes="192x192" />
<link rel="icon" type="image/png" href="/img/icons/favicon-16x16.png" sizes="16x16" />
<link rel="manifest" href="/img/icons/manifest.json" />
<meta name="msapplication-TileColor" content="#ffc40d">
<meta name="msapplication-TileImage" content="/img/icons/mstile-144x144.png">
<meta name="theme-color" content="#ffffff">
`

const fontLink = `<link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'>`

export default (html, initialState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>FIXU</title>
        <link rel="stylesheet" href=${cssPath} />
        ${faviconDom}
        ${fontLink}
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `
}
