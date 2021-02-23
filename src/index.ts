import Job from './Job';
import Message from './Message';

interface JobbyApiInterface {
  getJobs(): Promise<Array<Job>>;
  getJob(id:number): Promise<Job>;
  deleteJob(id:number): Promise<Message>;
  createJob(job:Job): Promise<Job>;
  updateJob(id:number, job:Job): Promise<Job>;
}

export default class implements JobbyApiInterface {
   private url:string;
  constructor(url:string) {
    this.url = url;
  }

  private basicFetch (endPoint: string, method: string, body?: Job) {
    const bodyPayload = body == null ? null : { body: JSON.stringify(body) };
    return fetch(
      `${this.url}/${endPoint}`,
      {
        method,
        headers:{
          'Content-Type': 'application/json'
        },
        cache: 'no-cache',
        redirect: 'manual',
        referrerPolicy: 'no-referrer',
        ...bodyPayload,
      }).then((response)=>{
        if (!response.ok) {
          return response.json().then((response:Message) => {
            throw Error(response.message);
          });
        }
        return response.json();
    });
  }

  public getJobs(): Promise<Array<Job>> {
    return this.basicFetch('jobs','GET').then((jobPayload) => <Array<Job>> jobPayload);
  }

  public getJob(id:number): Promise<Job> {
    return this.basicFetch(`jobs/${id}`,'GET').then((jobPayload) => <Job> jobPayload);
  }

  public deleteJob(id:number): Promise<Message> {
    return this.basicFetch(`jobs/${id}`,'DELETE');
  }

  public createJob(job:Job): Promise<Job> {
    return this.basicFetch(`jobs`,'POST', job).then((jobPayload) => <Job> jobPayload);
  }

  public updateJob(id:number, job:Job): Promise<Job> {
    return this.basicFetch(`jobs/${id}`,'PUT', job).then((jobPayload) => <Job> jobPayload);
  }
}
