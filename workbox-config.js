module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.{svg,html,webp,js,css,webm}"
  ],
  "swDest": "build/sw.js",
  "swSrc": "./sw-template.js",
  "globIgnores": [
    "../workbox-config.js"
  ]
};
