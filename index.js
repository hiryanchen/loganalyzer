const FileReader = require('./src/js/fileReader');
const LogAnalyzer = reuiqre('./src/js/logAnalyzer');

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
