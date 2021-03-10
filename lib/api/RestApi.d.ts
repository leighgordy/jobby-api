import Job from './responses/Job';
import Message from './responses/Message';
import ApiInterface from './ApiInterface';
export default class implements ApiInterface {
    private url;
    constructor(url: string);
    private basicFetch;
    getJobs(): Promise<Array<Job>>;
    getJob(id: number): Promise<Job>;
    deleteJob(id: number): Promise<Message>;
    createJob(job: Job): Promise<Job>;
    updateJob(id: number, job: Job): Promise<Job>;
}
