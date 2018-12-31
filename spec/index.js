const fs = require('fs')
const jsdoc2md = require('jsdoc-to-markdown')
jsdoc2md
  .render({ files: './src/index.js' })
  .then(res => fs.writeFile('spec/config.md', res, {}, function () {}))
