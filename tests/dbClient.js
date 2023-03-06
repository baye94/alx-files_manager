const DBClient = require('../utils/db');

describe('DBClient', () => {
  let dbClient;

  beforeAll(() => {
    dbClient = new DBClient();
  });

  afterAll(() => {
    dbClient.client.close();
  });

  describe('isAlive', () => {
    test('returns true when connected to the database', async () => {
      expect.assertions(1);
      const result = await dbClient.isAlive();
      expect(result).toBe(true);
    });
  });

  describe('nbUsers', () => {
    test('returns the number of users in the database', async () => {
      expect.assertions(1);
      const result = await dbClient.nbUsers();
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('nbFiles', () => {
    test('returns the number of files in the database', async () => {
      expect.assertions(1);
      const result = await dbClient.nbFiles();
      expect(result).toBeGreaterThan(0);
    });
  });
});
