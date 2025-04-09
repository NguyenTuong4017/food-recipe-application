export function wrapHtml(description) {
  return `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
          <style>
            body {
              font-family: 'Montserrat', sans-serif;
              font-size: 18px;
              color: #333;
              line-height: 1.5;
              background-color: "#F5F5F5"
            }
            b {
              font-weight: bold;
            }
            a {
              color: #007AFF;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          ${description}
        </body>
      </html>
    `;
}
