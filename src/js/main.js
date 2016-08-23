const fs = require('fs');
const colors = require('colors');

const logAnalyzer = require('./logAnalyzer.js');

/** FileReader reads a file and calls callback for content. */
FileReader = class {
  /**
   * @param {string} filePath Path to the file.
   * @param {!Function} onContentReady Callback for when content is ready.
   */
  constructor(filePath, onContentReady) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return console.log(colors.red(err));
      }
      onContentReady(data);
    });
  }
};


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

let filePath = 'samples/logs/log1';
let configPath = 'samples/configs/log1config.json';

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
