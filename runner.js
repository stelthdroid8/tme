const fs = require('fs');
const path = require('path');

class Runner {
  constructor() {
    this.testFiles = [];
  }

  async collectFiles(targetPath) {
    const files = await fs.promises.readdir(targetPath);

    for (let file of files) {
      const filepath = path.join(targetPath, file);

      //   console.log(`filepath of current file ${file} is: ${filepath}`);

      const stats = await fs.promises.lstat(filepath);

      if (stats.isFile() && file.includes('.test.js')) {
        this.testFiles.push({ name: filepath });
      } else if (stats.isDirectory()) {
        const childFiles = await fs.promises.readdir(filepath);

        files.push(...childFiles.map(f => path.join(file, f)));
      }
    }
  }

  async runTests() {
    for (let file of this.testFiles) {
      const beforeEaches = [];
      global.beforeEach = fn => {
        beforeEaches.push(fn);
      };
      global.it = (desc, fn) => {
        // console.log(desc);
        beforeEaches.forEach(func => func());
        try {
          fn();
          console.log(`OK - ${desc}`);
        } catch (err) {
          console.log(`X -  ${desc}`);
          console.log('\t', err.message);
        }
      };
      try {
        require(file.name);
      } catch (err) {
        console.log('X -- Error Loading Files', file.name);
        console.log('\t', err.message);
      }
    }
  }
}

module.exports = Runner;
