/**
 * Mouse Dictionary (https://github.com/wtetsu/mouse-dictionary/)
 * Copyright 2018-present wtetsu
 * Licensed under MIT
 */

export default class LineReader {
  constructor(data) {
    this.data = data;
    this.lineFeedCode = this.detectLineFeedCode(data);
    this.currentIndex = 0;
  }

  detectLineFeedCode(data) {
    let code = null;
    const index = data.indexOf("\n");
    if (index >= 0) {
      if (data[index - 1] === "\r") {
        code = "\r\n";
      } else {
        code = "\n";
      }
    }
    return code;
  }

  eachLine(fnEachLine, fnFinished) {
    this.processNextLine(fnEachLine, fnFinished, 0);
  }

  processNextLine(fnEachLine, fnFinished, linenum) {
    const line = this.getNextLine();
    if (line !== null) {
      return Promise.all([fnEachLine(line, linenum)]).then(() => {
        return this.processNextLine(fnEachLine, fnFinished, linenum + 1);
      });
    } else {
      if (fnFinished) {
        fnFinished();
      }
    }
  }

  getNextLine() {
    if (this.currentIndex === -1) {
      return null;
    }
    let line = null;
    const nextLfIndex = this.data.indexOf(this.lineFeedCode, this.currentIndex);
    if (nextLfIndex >= 0) {
      line = this.data.substring(this.currentIndex, nextLfIndex);
      this.currentIndex = nextLfIndex + this.lineFeedCode.length;
    } else {
      line = this.data.substring(this.currentIndex);
      this.currentIndex = -1;
    }
    return line;
  }
}
