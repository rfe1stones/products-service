import es from 'event-stream';
import fs from 'fs';
import process from 'process';
import { LineFixer } from '../types/MigrationPlan';

class ParseCSV {

  filePath: string;
  lineNumber: number;
  readStream: fs.ReadStream;
  lineFixer?: LineFixer;
  lineRemnant: string;

  constructor(filePath: string, lineFixer? : LineFixer) {
    this.filePath = filePath;
    this.lineNumber = 0;
    this.readStream = fs.createReadStream(this.filePath);
    this.readStream.setEncoding('utf-8');
    this.lineFixer = lineFixer;
    this.lineRemnant = '';
  }

  resumeStream() {
    this.readStream.resume();
  }

  read<T>(
    mapFunction: (data: any[]) => T,
    callback: (data: T[], resume: () => void) => void
  ) {
    const resume = this.resumeStream.bind(this);
    this.readStream.on('close', () => {
      if (this.lineRemnant) {
        let line = this.lineRemnant;
        if (this.lineFixer && this.lineFixer.select(line)) {
          line = this.lineFixer.transform(line);
        }
        let data: T = this.parseLine<T>(mapFunction, line);
        callback([data], () => {
          process.exit(0);
        });
      }
    });

    this.readStream.on('error', (error: string) => {
      console.log('Error reading data!');
      console.log(error);
    });

    this.readStream.on('data', (chunk: string) => {
      // pause the stream until we have inserted all these lines
      this.readStream.pause();
      let text = this.lineRemnant.length ? this.lineRemnant + chunk : chunk;
      let line = '';
      let dataArray: T[] = [];
      for (let i = 0; i < text.length; i++) {
        let c = text.charAt(i);
        if (c !== "\n") {
          line += c;
          continue;
        }
        // end of line reached
        if (line.charAt(0) === 'i') {
          line = '';
          continue;
        }
        if (this.lineFixer && this.lineFixer.select(line)) {
          line = this.lineFixer.transform(line);
        }
        let data: T = this.parseLine<T>(mapFunction, line);
        dataArray.push(data);
        line = '';
      }
      this.lineRemnant = line;
      callback(dataArray, resume);
    });
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