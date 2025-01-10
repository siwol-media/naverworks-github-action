import * as core from "@actions/core";
import send from "./send.js";

try {
  send(core);
} catch (error) {
  if (error instanceof Error) {
    core.error(error.message);
    core.debug(`${error.name} cause: ${error.cause}`);
    core.debug(`${error.name} stack: ${error.stack}`);
  } else {
    core.error(`Unknown error: ${error}`);
  }
}
