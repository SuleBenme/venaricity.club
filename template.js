export default ({markup, css}) => {
    return `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          >
          <link rel="icon" type="image/png" href="https://res.cloudinary.com/difnpzowu/image/upload/v1612273632/Venari-City-Logo-2.0.png_1132_1460_ko9blx.png"/>
          <title>Venari City</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
          <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@400;700&display=swap" rel="stylesheet">
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
          <style>
              * {
                outline: none;
                box-sizing: border-box;
                font-family: 'Roboto', sans-serif;
              }
              a {
                text-decoration: none;
                color: inherit;
              }
              input::-ms-reveal,
              input::-ms-clear {
                display: none;
              }
          </style>
        </head>
        <body style="margin:0">
          <div id="root">${markup}</div>
          <style id="jss-server-side">${css}</style>
          <script type="text/javascript" src="/dist/bundle.js"></script>
        </body>
      </html>`
}
