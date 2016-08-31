const colors = require('colors');
const fs = require('fs');
const walk = require('walk');

if (process.argv.length < 2) {
  console.log(
      colors.red('Usage: node directoryReader.js <directory>'));
} else {
  const files = [];
  const directory = process.argv[2];
  // Walker options
  const walker  = walk.walk(directory, { followLinks: false });

  walker.on('file', (root, stat, next) => {
    const filePath = root + '/' + stat.name;
      // Add this file to the list of files
      files.push(filePath);

      // Read the contents of the file:
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          // skip this file
          return console.log(console.red(`Error reading file ${filePath}`));
        }
        const lines = data.split('\n');
        // Find a match for the line
        for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
          const line = lines[lineNumber];
          lineHandler(filePath, lineNumber, line);
        }
      })
      next();
  });

  walker.on('end', () => {
    // Give time for file reading to finish.
    setTimeout(() => {
      console.log(colors.green('Finished traversing directory.'));
    }, 200);
  });
}

const lineHandler = (filePath, lineNumber, line) => {
  const regExps = [
    '\'([a-zA-Z]+)\': ([a-zA-Z]+)',
    '([a-zA-Z]+): ([a-zA-Z]+)'
  ];
  for (regExp of regExps) {
    const found = line.match(
        new RegExp(regExp, 'i'));
    if (found) {
      // Find the ones with the same property name and value
      if (found[1] == found[2]) {
        console.log(`${filePath} ${colors.gray(lineNumber)}: ${found[0]}`);
      }
    }
  }
}
