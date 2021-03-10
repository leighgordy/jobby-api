import Job from './responses/Job';
import Message from './responses/Message';
import GraphQlRequest from './responses/GraphQlRequest';

interface FetchInterface {
  fetch<T>(endPoint: string, method: string, body?: Job | GraphQlRequest): Promise<T>;
}

export default class implements FetchInterface {
  private url:string;
  constructor(url:string) {
    this.url = url;
  }

  fetch<T>(endPoint: string, method: string, body?: Job | GraphQlRequest): Promise<T> {
    const bodyPayload = body == null ? null : {body: JSON.stringify(body)};
    return fetch(
      `${this.url}/${endPoint}`,
      {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'no-cache',
        redirect: 'manual',
        referrerPolicy: 'no-referrer',
        ...bodyPayload,
      }).then((response) => {
      if (!response.ok) {
        return response.json().then((response: Message) => {
          throw Error(response.message);
        });
      }
      return response.json();
    });
  }
}
