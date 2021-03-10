import { retrieveJob, retrieveJobs, updateJob, createJob, deleteJob, } from 'jobby-db';
export default class {
    getJobs() {
        return Promise.resolve(retrieveJobs());
    }
    getJob(id) {
        return Promise.resolve(retrieveJob(id));
    }
    deleteJob(id) {
        return Promise.resolve(deleteJob(id));
    }
    createJob(job) {
        return Promise.resolve(createJob(job));
    }
    updateJob(id, job) {
        return Promise.resolve(updateJob(id, job));
    }
}
