import parse from 'csv-parse';
import fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';
// For using with promises
import { finished } from 'stream/promises';

export class CSVService {
  // Delimiter (column separator in csv file)
  private readonly DELIMITER: string = ';'

  // Parser instance
  private readonly parserWithOptions: parse.Parser

  constructor() {
    this.parserWithOptions = parse({
      delimiter: this.DELIMITER,
      columns: true,
    });
  }

  public readAllCSV = async (pathToFile: string) => {
    const records: Array<{ [key: string]: string }> = [];
    const parser = fs
      .createReadStream(pathToFile)
      .pipe(this.parserWithOptions);
    parser.on('readable', () => {
      let record;
      while (record = parser.read()) {
        records.push(record);
      }
    });
    await finished(parser);
    return records;
  }

  public getDataByColumns = async (
    pathToFile: string,
    searchColumn: string,
    textSearch: string,
  ) => {
    const allRecords = await this.readAllCSV(pathToFile);
    try {
      return allRecords.filter((record) => {
        return record[searchColumn].includes(textSearch);
      });
    } catch (error) {
      throw new Error('A non-existent column was transferred');
    }
  }

  public generateCSVFromObj = async (
    obj: Array<{ [key: string]: string }>,
    fileName: string = Date.now().toString(),
  ) => {
    // Getting keys for header from first object of array
    const headerColumns = Object.keys(obj[0]).map((key) => {
      // Need uppercase for title
      return { id: key, title: key.charAt(0).toUpperCase() + key.slice(1) };
    });

    const csvWriter = createObjectCsvWriter({
      path: `./test-data/${fileName}.csv`,
      fieldDelimiter: this.DELIMITER,
      header: headerColumns,
    });

    await csvWriter.writeRecords(obj);
  }
}
