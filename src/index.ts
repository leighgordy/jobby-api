const Job = require('./Job');
const Message = require('./Message');

interface JobbyApiInterface {
  getJobs(): Promise<Object>;
  getJob(id:number): Promise<Object>;
  deleteJob(id:number): Promise<Object>;
  createJob(job:Job): Promise<Object>;
  updateJob(id:number, job:Job): Promise<Object>;
}

module.exports = class implements JobbyApiInterface {
  #url:string;

  constructor(url:string) {
    this.#url = url;
  }

  private basicFetch (endPoint: string, method: string, body?: object) {
    const bodyPayload = body == null ? null : { body: JSON.stringify(body) };
    return fetch(
      `${this.#url}/${endPoint}`,
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
