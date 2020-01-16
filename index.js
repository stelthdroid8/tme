#!/usr/bin/env node
const Runner = require('./runner');

const runner = new Runner();

const run = async () => {
  results = await runner.collectFiles(process.cwd());

  console.log(results);
};

run();
