// goog.provide('LogAnalyzer');


/** Log Analyzer */
LogAnalyzer = class {
  /** @param {Object} config LogAnalyzer configuration file */
  constructor(config) {
    /**
     * Whether we want the output to be JSON.
     * @private @const {boolean}
     */
    this.jsonOutput_ = config.jsonOutput;

    /** @private @const {boolean} */
    this.showLineNumbers_ = config.showLineNumbers;

    /**
     * @private {!Array<Object>}
     */
    this.filters_ = config.filters || [];

    /**
     * The final JSON string containing all filtered results
     * @prviate {string}
     */
    this.finalJsonStr_ = '';
  }

  /**
   * @param {string} input
   * @param {!Function(Object)} lineMatchHandler
   * @param {string} Final JSON string.
   */
  analyze(input, lineMatchHandler) {
    const lines = input.split('\n');
    this.finalJsonStr_ = '[';
    for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
      const line = lines[lineNumber];
      for (const filter of this.filters_) {
        const found = line.match(new RegExp(filter.pattern, 'i'));
        if (found) {
          const lineResult = {
            lineNumber : this.showLineNumbers_ ? lineNumber + 1 : undefined,
            fields : []
          };
          for (let fieldIndex = 0; fieldIndex < filter.fields.length;
              fieldIndex++) {
            const newField = this.clone_(filter.fields[fieldIndex]);
            newField.value = found[fieldIndex + 1];
            lineResult.fields.push(newField);
          }
          if (this.finalJsonStr_[this.finalJsonStr_.length-1] == '}') {
            // If the final string contains previous matches, add a comma.
            this.finalJsonStr_ += ',';
          }
          this.finalJsonStr_ += JSON.stringify(lineResult);
          if (!this.jsonOutput_) {
            lineMatchHandler(lineResult);
          }
          // Don't confuse multiple filters matching a single line now.
          break;
        }
      }
    }
    this.finalJsonStr_ += ']';
    if (this.jsonOutput_) {
      console.log(this.finalJsonStr_);
    }
  }

  /**
   * Clones a JavaScript object.
   * @param {Object} obj
   */
  clone_(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    const copy = obj.constructor();
    for (const attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }
}
