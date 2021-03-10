import ApiInterface from './ApiInterface';
import Job from './responses/Job';
import Message from './responses/Message';
export default class implements ApiInterface {
    getJobs(): Promise<Job[]>;
    getJob(id: number): Promise<Job>;
    deleteJob(id: number): Promise<Message>;
    createJob(job: Job): Promise<Job>;
    updateJob(id: number, job: Job): Promise<Job>;
}
