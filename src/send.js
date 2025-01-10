import core from "@actions/core";
import Config from "./config";
import Client from "./client";
import NaverWorksError from "./error";

/**
 * Orchestrate the action job happenings from inputs to logic to outputs.
 * @param {core} core - Github Action core utilities. 
 */
export default async function send(core) {
  const config = new Config(core);
  try {
    await post(config);
    config.core.setOutput("time", Math.floor(new Date().valueOf() / 1000));
  } catch (/** @type {any} */ error) {
    core.setFailed(error.message);
    throw new NaverWorksError(error);
  }
};

/**
 * Perform the posting action
 * @param {Config} config 
 */
async function post(config) {
  return await new Client().post(config);
}