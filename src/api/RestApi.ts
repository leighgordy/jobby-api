import Job from './responses/Job';
import Message from './responses/Message';
import ApiInterface from './ApiInterface';
import BasicFetch from './BasicFetch';

export default class implements ApiInterface {
  private readonly basicFetch: BasicFetch;
  constructor(url:string) {
    this.basicFetch = new BasicFetch(url);
  }

  public getJobs(): Promise<Array<Job>> {
    return this.basicFetch.fetch<Array<Job>>('jobs','GET');
  }

  public getJob(id:number): Promise<Job> {
    return this.basicFetch.fetch<Job>(`jobs/${id}`,'GET');
  }

  public deleteJob(id:number): Promise<Message> {
    return this.basicFetch.fetch<Message>(`jobs/${id}`,'DELETE');
  }

  public createJob(job:Job): Promise<Job> {
    return this.basicFetch.fetch<Job>(`jobs`,'POST', job);
  }

  public updateJob(id:number, job:Job): Promise<Job> {
    return this.basicFetch.fetch<Job>(`jobs/${id}`,'PUT', job);
  }
}
