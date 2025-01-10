

export default class NaverWorksError extends Error {
  /**
   * @typedef Options
   * @property {Error} [cause] - The error that caused the newly created error
   */

  /**
   * @param {any} error - Error message or exception
   * @param {Options} options - Options
   */
  constructor(error, options = {}) {
    if (error instanceof Error) {
      super(error.message, { cause: options.cause });
    } else {
      super(error, { cause: options.cause });
    }
    this.name = "NaverWorksError";
    if (error.stack) {
      this.stack = error.stack;
    }
  }
}