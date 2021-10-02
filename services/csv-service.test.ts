import { CSVService } from './csv-service';

describe('Testing service for working with csv', () => {
  const testDataPath = './test-data/test-data.csv';

  it('Service reads csv files right', async () => {
    const service = new CSVService();
    // Path from root directory for test
    const records = await service.readAllCSV(testDataPath);
    // Getting first test user
    const firstTestUser = records[0];
    expect(firstTestUser.Username).toBe('booker12');
  });

  // it('Service correct reads separate columns of csv', async () => {
  //   const service = new CSVService();
  //   const records = await service.getDataByColumns();
  //   console.log(records);
  // });
});
