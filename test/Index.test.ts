import { RestApi as exportedRest, LocalApi as exportedLocal } from '../src/Index';
import LocalApi from '../src/api/LocalApi';
import RestApi from '../src/api/RestApi';

describe("Index.test.ts", () => {
  test("confirm Rest API is exported", () => {
    expect(exportedRest).toBe(RestApi);
  });
  test("confirm local API is exported", () => {
    expect(exportedLocal).toBe(LocalApi);
  });
});
