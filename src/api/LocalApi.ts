import {
  retrieveJob,
  retrieveJobs,
  updateJob,
  createJob,
  deleteJob,
} from 'jobby-db';
import ApiInterface from './ApiInterface';
import Job from './responses/Job';
import Message from './responses/Message';

export default class implements ApiInterface {
    getJobs(): Promise<Job[]> {
      return Promise.resolve(retrieveJobs());
    }
    getJob(id: number): Promise<Job> {
      return Promise.resolve(retrieveJob(id));
    }
    deleteJob(id: number): Promise<Message> {
      return Promise.resolve(deleteJob(id));
    }
    createJob(job: Job): Promise<Job> {
      return Promise.resolve(createJob(job));
    }
    updateJob(id: number, job: Job): Promise<Job> {
      return Promise.resolve(updateJob(id, job));
    }
}
