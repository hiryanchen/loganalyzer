const colors = require('colors');

const fileReader = require('./src/js/fileReader');
const logAnalyzer = require('./src/js/logAnalyzer');

//////////////////////////////////////////////////////////////

colorsFnMap = {
  'red'    : colors.red,
  'green'  : colors.green,
  'yellow' : colors.yellow,
  'blue'   : colors.blue
};

//////////////////////////////////////////////////////////////

const lineMatchHandler = (extractedInfo) => {
  let output = colors.grey(extractedInfo.lineNumber + ':');
  extractedInfo.fields.forEach((field) => {
    const colorFn = colorsFnMap[field.color];
    if (colorFn === undefined) {
      colorFn = colors.white;
    }
    output += ' ' + colorFn(field.value);
  });
  console.log(output);
};

module.exports = {
  initialize : function() {
    if (process.argv.length < 4) {
      console.log(
          colors.red('Usage: node main.js <log_file_path> <config_file_path>'));
    } else {
      process.argv.forEach((val, index, array) => {
        if (index == 2) {
          filePath = val;
        } else if (index == 3) {
          configPath = val;
        }
      });

      new FileReader(configPath, configContent => {
        new FileReader(filePath, content => {
          const la = new LogAnalyzer(JSON.parse(configContent));
          la.analyze(content, lineMatchHandler);
        });
      });
    }
  }
};
