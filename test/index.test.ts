/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { enableFetchMocks } from 'jest-fetch-mock';
import JobbyApi from '../src/index';
import Job from '../src/Job';
import Message from '../src/Message';
const base_url = 'http://localhost/api';
require("regenerator-runtime/runtime");

enableFetchMocks()

const generateJob = (id: number):Job => ({
  id: id,
  title: `Developer role ${id}`,
  description: `Description ${id}`,
  email: `developer${id}@developer.com`,
  created: 1613938304013 + id,
});

const requestInit = {
  "cache": "no-cache",
  "headers": {
    "Content-Type": "application/json"
  },
  "method": "GET",
  "redirect": "manual",
  "referrerPolicy": "no-referrer"
};

const failedPayload:Message = {
  message: 'something failed',
};


describe('index.test.ts', () => {
  const api = new JobbyApi(base_url);
  beforeEach(() => {
    // @ts-ignore
    fetch.resetMocks()
  })
  describe('getJobs', () => {
    test('successful call', async ()=>{
      const successPayload = [
        generateJob(1),
        generateJob(2),
        generateJob(3),
        generateJob(4),
      ];

      // @ts-ignore
      fetch.mockResponseOnce(JSON.stringify(successPayload));
      const jobs:Array<Job> = await api.getJobs();
      // @ts-ignore
      expect(fetch.mock.calls.length).toEqual(1);
      // @ts-ignore
      expect(fetch.mock.calls[0][0]).toEqual('http://localhost/api/jobs');
      // @ts-ignore
      expect(fetch.mock.calls[0][1]).toStrictEqual(requestInit);
      expect(jobs).toStrictEqual(successPayload);
    });
    test('failed call - 500', async (done)=>{
      try {
        // @ts-ignore
        fetch.mockResponseOnce(JSON.stringify(failedPayload), {status: 500});
        await api.getJobs();
        done.fail();
      } catch(error) {
        // @ts-ignore
        expect(fetch.mock.calls.length).toEqual(1);
        // @ts-ignore
        expect(fetch.mock.calls[0][0]).toEqual('http://localhost/api/jobs');
        // @ts-ignore
        expect(fetch.mock.calls[0][1]).toStrictEqual(requestInit);
        expect(error.message).toStrictEqual(failedPayload.message);
        done();
      }
    });
  });
  describe('getJob', () => {
    test('successful call', async ()=>{
      const successPayload = generateJob(1);
      // @ts-ignore
      fetch.mockResponseOnce(JSON.stringify(successPayload));
      const job:Job = await api.getJob(1);
      // @ts-ignore
      expect(fetch.mock.calls.length).toEqual(1);
      // @ts-ignore
      expect(fetch.mock.calls[0][0]).toEqual('http://localhost/api/jobs/1');
      // @ts-ignore
      expect(fetch.mock.calls[0][1]).toStrictEqual(requestInit);
      expect(job).toStrictEqual(successPayload);
    });
    test('failed call - 500', async (done)=>{
      try {
        // @ts-ignore
        fetch.mockResponseOnce(JSON.stringify(failedPayload), {status: 500});
        await api.getJob(1);
        done.fail();
      } catch(error) {
        // @ts-ignore
        expect(fetch.mock.calls.length).toEqual(1);
        // @ts-ignore
        expect(fetch.mock.calls[0][0]).toEqual('http://localhost/api/jobs/1');
        // @ts-ignore
        expect(fetch.mock.calls[0][1]).toStrictEqual(requestInit);
        expect(error.message).toStrictEqual(failedPayload.message);
        done();
      }
    });
    test('failed call - 404', async (done)=>{
      try {
        // @ts-ignore
        fetch.mockResponseOnce(JSON.stringify(failedPayload), {status: 404});
        await api.getJob(1);
        done.fail();
      } catch(error) {
        // @ts-ignore
        expect(fetch.mock.calls.length).toEqual(1);
        // @ts-ignore
        expect(fetch.mock.calls[0][0]).toEqual('http://localhost/api/jobs/1');
        // @ts-ignore
        expect(fetch.mock.calls[0][1]).toStrictEqual(requestInit);
        expect(error.message).toStrictEqual(failedPayload.message);
        done();
      }
    });
  });
  describe('deleteJob', () => {
    test('successful call', async ()=>{
      const successPayload = { message: 'job deleted' };
      // @ts-ignore
      fetch.mockResponseOnce(JSON.stringify(successPayload));
      const message:Message = await api.deleteJob(1);
      // @ts-ignore
      expect(fetch.mock.calls.length).toEqual(1);
      // @ts-ignore
      expect(fetch.mock.calls[0][0]).toEqual('http://localhost/api/jobs/1');
      // @ts-ignore
      expect(fetch.mock.calls[0][1]).toStrictEqual({
        ...requestInit,
        method: 'DELETE',
      });
      expect(message).toStrictEqual(successPayload);
    });
    test('failed call - 500', async (done)=>{
      try {
        // @ts-ignore
        fetch.mockResponseOnce(JSON.stringify(failedPayload), {status: 500});
        await api.deleteJob(1);
        done.fail();
      } catch(error) {
        // @ts-ignore
        expect(fetch.mock.calls.length).toEqual(1);
        // @ts-ignore
        expect(fetch.mock.calls[0][0]).toEqual('http://localhost/api/jobs/1');
        // @ts-ignore
        expect(fetch.mock.calls[0][1]).toStrictEqual({
          ...requestInit,
          method: 'DELETE',
        });
        expect(error.message).toStrictEqual(failedPayload.message);
        done();
      }
    });
    test('failed call - 404', async (done)=>{
      try {
        // @ts-ignore
        fetch.mockResponseOnce(JSON.stringify(failedPayload), {status: 404});
        await api.deleteJob(1);
        done.fail();
      } catch(error) {
        // @ts-ignore
        expect(fetch.mock.calls.length).toEqual(1);
        // @ts-ignore
        expect(fetch.mock.calls[0][0]).toEqual('http://localhost/api/jobs/1');
        // @ts-ignore
        expect(fetch.mock.calls[0][1]).toStrictEqual({
          ...requestInit,
          method: 'DELETE',
        });
        expect(error.message).toStrictEqual(failedPayload.message);
        done();
      }
    });
  });
  describe('createJob', () => {
    const newJob:Job = {
      title: `Developer role 1`,
      description: `Description 1`,
      email: `developer1@developer.com`,
    };
    test('successful call', async ()=>{
      const successPayload = generateJob(1);
      // @ts-ignore
      fetch.mockResponseOnce(JSON.stringify(successPayload));
      const job:Job = await api.createJob(newJob);
      // @ts-ignore
      expect(fetch.mock.calls.length).toEqual(1);
      // @ts-ignore
      expect(fetch.mock.calls[0][0]).toEqual('http://localhost/api/jobs');
      // @ts-ignore
      expect(fetch.mock.calls[0][1]).toStrictEqual({
        ...requestInit,
        method: 'POST',
        body: JSON.stringify(newJob),
      });

      expect(job).toStrictEqual(successPayload);
    });
    test('failed call - 500', async (done)=>{
      try {
        // @ts-ignore
        fetch.mockResponseOnce(JSON.stringify(failedPayload), {status: 500});
        await api.createJob(newJob);
        done.fail();
      } catch(error) {
        // @ts-ignore
        expect(fetch.mock.calls.length).toEqual(1);
        // @ts-ignore
        expect(fetch.mock.calls[0][0]).toEqual('http://localhost/api/jobs');
        // @ts-ignore
        expect(fetch.mock.calls[0][1]).toStrictEqual({
          ...requestInit,
          method: 'POST',
          body: JSON.stringify(newJob),
        });
        expect(error.message).toStrictEqual(failedPayload.message);
        done();
      }
    });
  });
  describe('updateJob', () => {
    const existingJob:Job = {
      title: `Developer role 1`,
      description: `Description 1`,
      email: `developer1@developer.com`,
    };
    test('successful call', async ()=>{
      const successPayload = generateJob(1);
      // @ts-ignore
      fetch.mockResponseOnce(JSON.stringify(successPayload));
      const job:Job = await api.updateJob(1,existingJob);
      // @ts-ignore
      expect(fetch.mock.calls.length).toEqual(1);
      // @ts-ignore
      expect(fetch.mock.calls[0][0]).toEqual('http://localhost/api/jobs/1');
      // @ts-ignore
      expect(fetch.mock.calls[0][1]).toStrictEqual({
        ...requestInit,
        method: 'PUT',
        body: JSON.stringify(existingJob),
      });
      expect(job).toStrictEqual(successPayload);
    });
    test('failed call - 500', async (done)=>{
      try {
        // @ts-ignore
        fetch.mockResponseOnce(JSON.stringify(failedPayload), {status: 500});
        await api.updateJob(1, existingJob);
        done.fail();
      } catch(error) {
        // @ts-ignore
        expect(fetch.mock.calls.length).toEqual(1);
        // @ts-ignore
        expect(fetch.mock.calls[0][0]).toEqual('http://localhost/api/jobs/1');
        // @ts-ignore
        expect(fetch.mock.calls[0][1]).toStrictEqual({
          ...requestInit,
          method: 'PUT',
          body: JSON.stringify(existingJob),
        });
        expect(error.message).toStrictEqual(failedPayload.message);
        done();
      }
    });
    test('failed call - 404', async (done)=>{
      try {
        // @ts-ignore
        fetch.mockResponseOnce(JSON.stringify(failedPayload), {status: 404});
        await api.updateJob(1,existingJob);
        done.fail();
      } catch(error) {
        // @ts-ignore
        expect(fetch.mock.calls.length).toEqual(1);
        // @ts-ignore
        expect(fetch.mock.calls[0][0]).toEqual('http://localhost/api/jobs/1');
        // @ts-ignore
        expect(fetch.mock.calls[0][1]).toStrictEqual({
          ...requestInit,
          method: 'PUT',
          body: JSON.stringify(existingJob),
        });
        expect(error.message).toStrictEqual(failedPayload.message);
        done();
      }
    });
  });
});
