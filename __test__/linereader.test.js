import LineReader from "../src/options/logic/linereader";

test("", () => {
  let reader = new LineReader("aaa\nbbb\nccc");

  let lines = [];
  reader.eachLine(
    line => {
      lines.push(line);
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 100);
      });
    },
    () => {
      test.deepEqual(["aaa", "bbb", "ccc"], lines);
      test.done();
    }
  );
});

test("", () => {
  let reader = new LineReader("aaa\r\nbbb\r\nccc");

  let lines = [];
  reader.eachLine(
    line => {
      lines.push(line);
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 100);
      });
    },
    () => {
      test.deepEqual(["aaa", "bbb", "ccc"], lines);
      test.done();
    }
  );
});
