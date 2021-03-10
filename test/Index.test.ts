import { RestApi as exportedRest } from '../src/Index';
import RestApi from '../src/api/RestApi';

describe("Index.test.ts", () => {
  test("confirm Rest API is exported", () => {
    expect(exportedRest).toBe(RestApi);
  });
});
