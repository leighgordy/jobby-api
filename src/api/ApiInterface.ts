import Job from './responses/Job';
import Message from './responses/Message';

export default interface ApiInterface {
  getJobs(): Promise<Array<Job>>;
  getJob(id:number): Promise<Job>;
  deleteJob(id:number): Promise<Message>;
  createJob(job:Job): Promise<Job>;
  updateJob(id:number, job:Job): Promise<Job>;
}
