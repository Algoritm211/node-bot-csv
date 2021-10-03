import { CSVService } from './csv-service';

describe('Testing service for working with csv', () => {
  const testDataPath = './test-data/test-data.csv';

  describe('Testing readAllCSV function', () => {
    it('Service reads csv files right', async () => {
      const service = new CSVService();
      // Path from root directory for test
      const records = await service.readAllCSV(testDataPath);
      // Getting first test user
      const firstTestUser = records[0];
      expect(firstTestUser.Username).toBe('booker12');
    });
  });

  describe('Test getDataByColumns function', () => {
    it('Service correct search data in separate column of csv', async () => {
      const service = new CSVService();
      const searchResult = await service.getDataByColumns(
        testDataPath,
        'Identifier',
        '9346',
      );
      expect(searchResult.length).toBe(1);
      expect(searchResult[0]['First name']).toBe('Mary');

      const searchNonexistentString = await service.getDataByColumns(
        testDataPath,
        'Identifier',
        '9246',
      );
      expect(searchNonexistentString.length).toBe(0);
    });

    it('Service throws correct error when user passes to the function nonexistent column', async () => {
      const service = new CSVService();
      await expect(service.getDataByColumns(
        testDataPath,
        'Non-existent-identifier',
        '9346',
      )).rejects.toThrowError('A non-existent column was transferred');
    });
  });
});
