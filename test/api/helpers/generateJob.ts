import Job from '../../../src/api/responses/Job';

export default (id: number):Job => ({
  id: id,
  title: `Developer role ${id}`,
  description: `Description ${id}`,
  email: `developer${id}@developer.com`,
  created: 1613938304013 + id,
});
