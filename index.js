const colors = require('colors');

const fileReader = require('./src/js/fileReader');
const logAnalyzer = require('./src/js/logAnalyzer');

//////////////////////////////////////////////////////////////

colorsFnMap = {
  'red'    : colors.red,
  'green'  : colors.green,
  'yellow' : colors.yellow,
  'blue'   : colors.blue,
  'magenta': colors.magenta,
  'cyan'   : colors.cyan,
  'white'  : colors.white,
  'gray'   : colors.gray,
  'grey'   : colors.grey
};

//////////////////////////////////////////////////////////////

/**
 * A line matcher that takes the extracted information json and outputs the
 * the result into the console.
 * @param {Object} extractedInfo
 */
const lineMatchHandler = (extractedInfo) => {
  let output = extractedInfo.lineNumber !== undefined ?
      colors.grey(extractedInfo.lineNumber + ':') : '';
  extractedInfo.fields.forEach((field) => {
    const colorFn = colorsFnMap[field.color];
    if (colorFn === undefined) {
      colorFn = colors.white;
    }
    output += ' ' + colorFn(field.value);
  });
  console.log(output);
};

let configJson = {};

module.exports = {
  initialize : () => {
    if (process.argv.length <3) {
      console.log(
          colors.red('Usage: node loganalyzer.js <config_file_path> <log_file_path>'));
          colors.red('       stdin | node loganalyzer.js <config_file_path>');
    } else {
      // Create Log Analyzer based on config
      const configPath = process.argv[2];
      new FileReader(configPath, configContent => {
        try {
          configJson = JSON.parse(configContent);
        } catch (e) {
          console.log(colors.red('Invalid config JSON!') + e);
        }
        if (configJson.debug) {
          console.log(colors.green(
              '___Successfully loaded configuration and creating analyzer...'));
        }
        module.exports.onLogAnalyzerReady(new LogAnalyzer(configJson), process);
      });
    }
  },

  onLogAnalyzerReady : (logAnalyzer, process) => {
    // Check whether is stream or file
    if (process.argv.length === 3) {
       process.stdin.on('data', function (chunk) {
          logAnalyzer.analyze(chunk.toString(), lineMatchHandler);
      });
    } else {
      filePath = process.argv[3];
      new FileReader(filePath, content => {
        if (configJson.debug) {
          console.log(colors.green(
              '___Successfully loaded log file and analyzing...'));
        }
        logAnalyzer.analyze(content, lineMatchHandler);
      });
    }
  }
};
