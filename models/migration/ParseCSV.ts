import es from 'event-stream';
import fs from 'fs';

class ParseCSV {

  filePath: string;
  lineNumber: number;
  readStream: fs.ReadStream;

  constructor(filePath: string) {
    this.filePath = filePath;
    this.lineNumber = 0;
    this.readStream = fs.createReadStream(this.filePath);
  }

  read<T>(
    mapFunction: (data: any[]) => T,
    callback: (data: T) => void
  ) {
    return this.readStream
      .pipe(es.split())
      .pipe(es.mapSync((line: string) => {
        // skip the first line
        if (this.lineNumber === 0) {
          this.lineNumber++;
          return;
        }
        // pause the stream
        this.readStream.pause();
        if (this.lineNumber === 11) {
          line = line.slice(0, -19) + '49';
        }
        let data: T = this.parseLine<T>(mapFunction, line);
        if (this.lineNumber % 100000 === 0) {
          callback(data);
        }
        this.lineNumber++;
        // resume the stream
        this.readStream.resume();
      }))
    .on('error', (err) => {
      console.log(`Error in ParseCSV at line ${this.lineNumber}:`, err);
    })
    .on('end', () => {
      console.log(`ParseCSV finished parsing ${this.filePath}`);
      console.log(`Lines parsed: ${this.lineNumber.toLocaleString()}`);
    })
  }

  parseLine<T>(
    mapFunction: (data: any[]) => T,
    line: string
  ): T {
    let array =  JSON.parse(`[${line}]`);
    return mapFunction(array);
  }
}

export default ParseCSV;