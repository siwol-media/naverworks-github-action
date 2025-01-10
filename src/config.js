import webapi from "@siwol-media/naverworks-api";
import Content from "./content";

/**
 * @see {@link ../action.yml}
 */
export default class Config {

  /**
   * @typedef Inputs
   * @property {string} privateKey - Private Key
   * @property {string} clientId - Client ID
   * @property {string} clientSecret - Client Secret
   * @property {string} channelId - Channel ID
   * @property {string} serviceAccount - Service Account
   * @property {string} botNo - Bot No
   */

  /**
   * @type {Inputs}
   */
  inputs;

  /**
   * @type {Content}
   */
  content;

  /**
   * Shared utilities specific to the GitHub action workflow.
   * @type {import("@actions/core")}
   */
  core;

  /**
   * @type {import("@siwol-media/naverworks-api")}
   */
  webapi;

  /**
   * @param {import("@actions/core")} core - Github Action core utilities.
   */
  constructor(core) {
    this.webapi = webapi;
    this.core = core;
    this.inputs = {
      privateKey: core.getInput("private_key"),
      clientId: core.getInput("client_id"),
      clientSecret: core.getInput("client_secret"),
      channelId: core.getInput("channel_id"),
      serviceAccount: core.getInput("service_account"),
      botNo: core.getInput("bot_no"),
    };

    core.debug(`Gathered action inputs: ${JSON.stringify(this.inputs)}`);
    this.content = new Content();
    core.debug(`Gathered content: ${JSON.stringify(this.content)}`);
  }
}
