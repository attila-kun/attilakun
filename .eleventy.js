const fs = require('fs').promises;

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({"node_modules/bloch/dist/lib.js": "bloch/bloch.js"});
  eleventyConfig.addPassthroughCopy({"node_modules/bloch/src/index.html": "bloch/index.html"});
  eleventyConfig.on('afterBuild', async () => {
    const filePath = "public/bloch/index.html";
    const html = await fs.readFile(filePath, "utf8");
    await fs.writeFile(filePath, await injectBlochHtml(html), "utf8");
  });
  return {
    dir: {
      input: "src",
      output: "public"
    }
  };
};

async function injectBlochHtml(html) {
  const analytics = await fs.readFile("src/_includes/analytics.njk", "utf8");

  return html.replace("</head>", `
  <style>
    html, body, input, textarea, select, button {
      background-color: #17191a;
      border-color: #6d6659;
      color: #dcdbd8;
    }

    #nav {
      margin: 18px 0 0 15px;
    }

    #nav a {
      color: white;
      font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
      text-decoration: none;
    }
  </style>
  <script src="bloch.js"></script>
  <script>
    window.onload = function() {
      bloch.init(
        document.getElementById("stateContainer"),
        document.getElementById("matrixContainer"),
        document.getElementById("canvasContainer"),
        document.getElementById("buttonContainer"),
      );
    };
  </script>
  ${analytics}
  </head>
    `).replace("<body>", `
  <body>
    <div id="nav">
      <a href="/">Home</a>
    </div>
    `);
}