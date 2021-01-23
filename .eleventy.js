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
      margin: 18px 0 15px 15px;
    }

    #nav a {
      color: white;
      font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
      text-decoration: none;
      margin: 0 30px;
    }

    #nav a:first-child {
      margin: 0;
    }

    #github-fork {
      position: absolute;
      top: 0;
      right: 0;
    }
  </style>
  <script src="bloch.js"></script>
  <script>
    window.onload = function() {
      var blochInstance = bloch.init(
        document.getElementById("stateContainer"),
        document.getElementById("matrixContainer"),
        document.getElementById("canvasContainer"),
        document.getElementById("buttonContainer"),
      );

      function resizeCanvas() {
        var container = document.getElementById("container");
        var settings = document.getElementById("settings");
        var canvasRoot = document.getElementById("canvasRoot");

        var containerRect = container.getBoundingClientRect();
        var settingsRect = settings.getBoundingClientRect();
        var canvasRootRect = canvasRoot.getBoundingClientRect();

        if (settingsRect.top < canvasRootRect.top) { // wrapped
          canvasRoot.style.height = String(containerRect.height - settingsRect.height) + 'px';
        } else { // not wrapped, settings and canvas are next to each other
          canvasRoot.style.height = null;
        }

        var size = Math.min(canvasRoot.clientWidth, canvasRoot.clientHeight);
        blochInstance.resizeCanvas(size);
      }

      window.onresize = resizeCanvas;
      resizeCanvas();
    };
  </script>
  ${analytics}
  </head>
    `).replace("<body>", `
  <body>
    <div id="nav">
      <a href="/">◀ Go back</a>
      <a href="https://quantumcomputing.stackexchange.com/a/15655/12643">🤔 What is this?</a>
    </div>
    <a id="github-fork" href="https://github.com/attila-kun/bloch">
      <img loading="lazy" width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149" class="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1">
    </a>
    `);
}