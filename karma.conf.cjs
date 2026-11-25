const fs = require('node:fs');

if (!process.env.CHROME_BIN && process.platform === 'win32') {
  const browsers = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  ];
  const executable = browsers.find((file) => fs.existsSync(file));
  if (executable) process.env.CHROME_BIN = executable;
}

module.exports = (config) => config.set({
  frameworks: ['jasmine'],
  files: ['.karma-build/reading.store.spec.js'],
  reporters: ['progress', 'junit'],
  junitReporter: {
    outputDir: 'reports',
    outputFile: 'junit.xml',
    useBrowserName: false,
  },
  browsers: ['ChromeHeadless'],
  hostname: '127.0.0.1',
  listenAddress: '127.0.0.1',
  singleRun: true,
});
