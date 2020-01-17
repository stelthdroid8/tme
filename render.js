const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const render = async filename => {
  filePath = path.join(process.cwd(), filename);

  const dom = await JSDOM.fromFile(filePath, {
    runScripts: 'dangerously',
    resources: 'usable'
  });

  return dom;
};

module.exports = render;
