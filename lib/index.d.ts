import Job from './Job';
import Message from './Message';
interface JobbyApiInterface {
    getJobs(): Promise<Array<Job>>;
    getJob(id: number): Promise<Job>;
    deleteJob(id: number): Promise<Message>;
    createJob(job: Job): Promise<Job>;
    updateJob(id: number, job: Job): Promise<Job>;
}
export default class implements JobbyApiInterface {
    private url;
    constructor(url: string);
    private basicFetch;
    getJobs(): Promise<Array<Job>>;
    getJob(id: number): Promise<Job>;
    deleteJob(id: number): Promise<Message>;
    createJob(job: Job): Promise<Job>;
    updateJob(id: number, job: Job): Promise<Job>;
}
export {};
