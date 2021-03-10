export default class {
    constructor(url) {
        this.url = url;
    }
    basicFetch(endPoint, method, body) {
        const bodyPayload = body == null ? null : { body: JSON.stringify(body) };
        return fetch(`${this.url}/${endPoint}`, Object.assign({ method, headers: {
                'Content-Type': 'application/json'
            }, cache: 'no-cache', redirect: 'manual', referrerPolicy: 'no-referrer' }, bodyPayload)).then((response) => {
            if (!response.ok) {
                return response.json().then((response) => {
                    throw Error(response.message);
                });
            }
            return response.json();
        });
    }
    getJobs() {
        return this.basicFetch('jobs', 'GET').then((jobPayload) => jobPayload);
    }
    getJob(id) {
        return this.basicFetch(`jobs/${id}`, 'GET').then((jobPayload) => jobPayload);
    }
    deleteJob(id) {
        return this.basicFetch(`jobs/${id}`, 'DELETE');
    }
    createJob(job) {
        return this.basicFetch(`jobs`, 'POST', job).then((jobPayload) => jobPayload);
    }
    updateJob(id, job) {
        return this.basicFetch(`jobs/${id}`, 'PUT', job).then((jobPayload) => jobPayload);
    }
}
