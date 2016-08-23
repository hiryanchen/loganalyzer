// goog.provide('LogAnalyzer');


/**
 * Log Analyzer
 */
LogAnalyzer = class {
  /**
   * @param {Object} config LogAnalyzer configuration file
   */
  constructor(config) {
    /**
     * Whether we are in debug mode.
     * @private @const {boolean}
     */
    this.debug_ = config.debug;

    /**
     * @private {!Array<Object>}
     */
    this.filters_ = config.filters;
  }

  /**
   * @param {string} input
   * @param {!Function(Object)} lineMatchHandler
   */
  analyze(input, lineMatchHandler) {
    const lines = input.split('\n');
    for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
      const line = lines[lineNumber];
      for (const filter of this.filters_) {
        const found = line.match(new RegExp(filter.pattern, 'i'));
        if (found) {
          const lineResult = {
            lineNumber : lineNumber + 1,
            fields : []
          };
          for (let fieldIndex = 0; fieldIndex < filter.fields.length;
              fieldIndex++) {
            const newField = this.clone_(filter.fields[fieldIndex]);
            newField.value = found[fieldIndex + 1];
            lineResult.fields.push(newField);
          }
          lineMatchHandler(lineResult);
          // Don't confuse multiple filters matching a single line now.
          break;
        }
      }
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


/** @private @const */
LogAnalyzer.ALL_FILTER_ = {
  pattern: '',
  description: 'Filter that catches everything'
};
