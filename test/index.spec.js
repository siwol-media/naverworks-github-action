import * as core from "@actions/core";
import * as webapi from "@siwol-media/naverworks-api";

export class Mock {
  constructor() {
    console.log(core, "core");

    this.sandbox = sinon.createSandbox();
    this.core = this.sandbox.stub(core);
    this.webapi = this.sandbox.stub(webapi);
  }
}

describe("index", () => {
  it("should be defined", () => {
    expect(Mock).toBeDefined();
  });
});
