import Config from "./config.js";
import NaverWorksError from "./error.js";

export default class Client {
  /**
   * @param {Config} config - Configuration object.
   */
  async post(config) {
    const client = new config.webapi.WebClient({
      channelId: config.inputs.channelId,
      clientId: config.inputs.clientId,
      clientSecret: config.inputs.clientSecret,
      serviceAccount: config.inputs.serviceAccount,
      botNo: Number(config.inputs.botNo),
      privateKey: config.inputs.privateKey,
    });
    try {
      config.core.debug(`Sending message: ${config.content.getMessage()}`);
      const response = await client.sendMessage(config.content.getMessage());

      if (response.status === 201) {
        config.core.setOutput("ok", true);
        config.core.info("Message sent successfully");
      } else {
        config.core.setOutput("ok", false);
        config.core.error(`Failed to send message: ${response.status}`);
      }
    } catch (error) {
      config.core.error(`Failed to send message: ${error}`);
      throw new NaverWorksError(error);
    }
  }
}
