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
     * @prviate {!Array<Object>}
     */
    this.filters_ = config.filters;
  }

  /**
   * @param {string} input
   * @param {!Function} lineHandler
   * @return {Object}
   */
  analyze(input, lineHandler) {
    const lines = input.split('\n');
    for (line of lines) {
      for (filter of this.filters_) {
        const re = new RegExp(filter.pattern, 'i');
        const found = line.match(re);
        if (found) {
          lineHandler(line);
        }
      }
    }
  }
}


/** @private @const */
LogAnalyzer.ALL_FILTER_ = {
  pattern: '',
  description: 'Filter that catches everything'
};
