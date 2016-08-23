const fs = require('fs');

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
