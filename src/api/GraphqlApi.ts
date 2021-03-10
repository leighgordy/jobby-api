import ApiInterface from './ApiInterface';
import Job from './responses/Job';
import Message from './responses/Message';
import BasicFetch from './BasicFetch';

export default class implements ApiInterface {
    private readonly basicFetch: BasicFetch;
    constructor(url:string) {
        this.basicFetch = new BasicFetch(url);
    }
    getJobs(): Promise<Job[]> {
      const query = `{
        jobs{
          id,
          title,
          description,
          email,
          created
        }
      }`;
      return this.basicFetch.fetch<Job[]>(`graphql`,'POST', {query});
    }
    getJob(id: number): Promise<Job> {
      const query = `{
        job(id: ${id}){
          id,
          title,
          description,
          email,
          created
        }
      }`;
      return this.basicFetch.fetch<Job>(`graphql`,'POST', {query});
    }
    deleteJob(id: number): Promise<Message> {
      const query = `
        mutation{
          deleteJob(
            id:${id}, 
          )
      }`;
      return this.basicFetch.fetch<Message>(`graphql`,'POST', {query});
    }
    createJob(job: Job): Promise<Job> {
      const query = `{
        mutation{
          createJob(input: {
              title: "${job.title}",
              description: "${job.description}",
              email: "${job.email}",
              }
          ) {
              id,
              title,
              description,
              email,
              created
          }
        }`;
        return this.basicFetch.fetch<Job>(`graphql`,'POST', {query});
    }
    updateJob(id: number, job: Job): Promise<Job> {
      const query = `{
        mutation{
          updateJob(
              id: ${id},
              input: {
                  title: "${job.title}",
                  description: "${job.description}",
                  email: "${job.email}",
              }
          ) {
              id,
              title,
              description,
              email,
              created
          }
        }`;
      return this.basicFetch.fetch<Job>(`graphql`,'POST', {query});
    }
}
