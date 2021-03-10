import LocalApi from '../../src/api/LocalApi';
const api = new LocalApi();

describe('LocalApi.test.ts', () => {
  describe('getJobs', () => {
    test('successful call', async () => {
      const jobs = await api.getJobs();
      expect(jobs).toStrictEqual([
        {
          "created": 1611254560294,
          "description": "This is a fake job",
          "email": "jobsa@jobs.com",
          "id": 123,
          "title": "job A"
        },
        {
          "created": 1611254580173,
          "description": "This is a fake job",
          "email": "jobsb@jobs.com",
          "id": 456,
          "title": "job B"
        },
        {
          "created": 1611254587496,
          "description": "This is a fake job",
          "email": "jobsc@jobs.com",
          "id": 789,
          "title": "job C"
        }
      ]);
    });
  });
  describe('getJob', () => {
    test('successful call', async () => {
      const jobs = await api.getJob(123);
      expect(jobs).toStrictEqual({
          "created": 1611254560294,
          "description": "This is a fake job",
          "email": "jobsa@jobs.com",
          "id": 123,
          "title": "job A"
        });
    });
    test('not found', async () => {
      const job = await api.getJob(999);
      expect(job).toBe(undefined);
    });
  });
  describe('createJob', () => {
    test('successful call', async () => {
      const newJob = await api.createJob({
        "description": "This is a fake job",
        "email": "jobsa@jobs.com",
        "title": "job A"
      });
      expect(newJob).toMatchObject({
        "description": "This is a fake job",
        "email": "jobsa@jobs.com",
        "title": "job A"
      });
      expect(newJob.id).not.toBeUndefined();
      expect(newJob.created).not.toBeUndefined();
    });
  });
  describe('updateJob', () => {
    test('successful call', async () => {
      const updatedJob = await api.updateJob(123, {
        "description": "This is a fake job",
        "email": "jobsa@jobs.com",
        "title": "job A"
      });
      expect(updatedJob).toMatchObject({
        "description": "This is a fake job",
        "email": "jobsa@jobs.com",
        "title": "job A"
      });
      expect(updatedJob.id).toBe(123);
      expect(updatedJob.created).not.toBeUndefined();
    });
    test('failed call', async () => {
      const updatedJob = await api.updateJob(999, {
        "description": "This is a fake job",
        "email": "jobsa@jobs.com",
        "title": "job A"
      });
      expect(updatedJob).toBeNull();
    });
  });
});
