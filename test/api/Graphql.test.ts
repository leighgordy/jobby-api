/* eslint-disable @typescript-eslint/ban-ts-comment */
import { enableFetchMocks } from 'jest-fetch-mock';
import 'regenerator-runtime/runtime';
import JobbyApi from '../../src/api/GraphqlApi';
// @ts-ignore
import generateJob from './helpers/generateJob';
import Job from '../../src/api/responses/Job';

const base_url = 'http://localhost';

enableFetchMocks()

const requestInit = {
  "cache": "no-cache",
  "headers": {
    "Content-Type": "application/json"
  },
  "method": "POST",
  "redirect": "manual",
  "referrerPolicy": "no-referrer"
};

describe('index.test.ts', () => {
  const api = new JobbyApi(base_url);
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.resetMocks()
  });
  describe('getJobs', () => {
    test('successful call', async () => {
      const successPayload = {
        data: {
          jobs: [
            generateJob(1),
            generateJob(2),
            generateJob(3),
            generateJob(4)
          ],
        },
      };

      // @ts-ignore
      fetch.mockResponseOnce(JSON.stringify(successPayload));
      const jobs: Array<Job> = await api.getJobs();
      // @ts-ignore
      expect(fetch.mock.calls.length).toEqual(1);
      // @ts-ignore
      expect(fetch.mock.calls[0][0]).toEqual('http://localhost/graphql');
      // @ts-ignore
      expect(fetch.mock.calls[0][1]).toStrictEqual({
        ...requestInit,
        body: "{\"query\":\"{\\n        jobs{\\n          id,\\n          title,\\n          description,\\n          email,\\n          created\\n        }\\n      }\"}",
      });
      expect(jobs).toStrictEqual(successPayload);
    });
  });
  describe('getJob', () => {
    test('successful call', async () => {
      const successPayload = {
        data: {
          job: generateJob(1),
        },
      };

      // @ts-ignore
      fetch.mockResponseOnce(JSON.stringify(successPayload));
      const job: Job = await api.getJob(1);
      // @ts-ignore
      expect(fetch.mock.calls.length).toEqual(1);
      // @ts-ignore
      expect(fetch.mock.calls[0][0]).toEqual('http://localhost/graphql');
      // @ts-ignore
      expect(fetch.mock.calls[0][1]).toStrictEqual({
        ...requestInit,
        body: "{\"query\":\"{\\n        job(id: 1){\\n          id,\\n          title,\\n          description,\\n          email,\\n          created\\n        }\\n      }\"}",
      });
      expect(job).toStrictEqual(successPayload);
    });
  });
  describe('deleteJob', () => {
    test('successful call', async () => {
      const successPayload = {
        data: {
          job: null,
        },
      };

      // @ts-ignore
      fetch.mockResponseOnce(JSON.stringify(successPayload));
      await api.deleteJob(1);
      // @ts-ignore
      expect(fetch.mock.calls.length).toEqual(1);
      // @ts-ignore
      expect(fetch.mock.calls[0][0]).toEqual('http://localhost/graphql');
      // @ts-ignore
      expect(fetch.mock.calls[0][1]).toStrictEqual({
        ...requestInit,
        body: "{\"query\":\"\\n        mutation{\\n          deleteJob(\\n            id:999, \\n          )\\n      }\"}",
      });
    });
  });
  describe('updateJob', () => {
    test('successful call', async () => {
      const job: Job = generateJob(1);
      const successPayload = {
        data: {
          job,
        },
      };

      // @ts-ignore
      fetch.mockResponseOnce(JSON.stringify(successPayload));
      const updatedJob: Job = await api.updateJob(1, {
        title: job.title,
        description: job.description,
        email: job.email,
      });
      // @ts-ignore
      expect(fetch.mock.calls.length).toEqual(1);
      // @ts-ignore
      expect(fetch.mock.calls[0][0]).toEqual('http://localhost/graphql');
      // @ts-ignore
      expect(fetch.mock.calls[0][1]).toStrictEqual({
        ...requestInit,
        body: "{\"query\":\"{\\n        mutation{\\n          updateJob(\\n              id: 1,\\n              input: {\\n                  title: \\\"Developer role 1\\\",\\n                  description: \\\"Description 1\\\",\\n                  email: \\\"developer1@developer.com\\\",\\n              }\\n          ) {\\n              id,\\n              title,\\n              description,\\n              email,\\n              created\\n          }\\n        }\"}",
      });
      expect(updatedJob).toStrictEqual(successPayload);
    });
  });
  describe('createJob', () => {
    test('successful call', async () => {
      const job: Job = generateJob(1);
      const successPayload = {
        data: {
          job,
        },
      };

      // @ts-ignore
      fetch.mockResponseOnce(JSON.stringify(successPayload));
      const createdJob: Job = await api.createJob({
        title: job.title,
        description: job.description,
        email: job.email,
      });
      // @ts-ignore
      expect(fetch.mock.calls.length).toEqual(1);
      // @ts-ignore
      expect(fetch.mock.calls[0][0]).toEqual('http://localhost/graphql');
      // @ts-ignore
      expect(fetch.mock.calls[0][1]).toStrictEqual({
        ...requestInit,
        body: "{\"query\":\"{\\n        mutation{\\n          createJob(input: {\\n              title: \\\"Developer role 1\\\",\\n              description: \\\"Description 1\\\",\\n              email: \\\"developer1@developer.com\\\",\\n              }\\n          ) {\\n              id,\\n              title,\\n              description,\\n              email,\\n              created\\n          }\\n        }\"}",
      });
      expect(createdJob).toStrictEqual(successPayload);
    });
  });
});
