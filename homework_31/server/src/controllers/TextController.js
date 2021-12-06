import TextService from "../services/TextService.js";
import httpStatuses from "../constants/httpStatuses.js";
import fileLog from "../logger.js";

class TextController {
  async set(req, res) {
    if (req.body.text) {
      try {
        const response = await TextService.setText(req.body.text);
        fileLog.info(`OK. Body: ${JSON.stringify(req.body)}, status: ${httpStatuses.SUCCESS}`);
        res.status(httpStatuses.SUCCESS).json({
          status: httpStatuses.SUCCESS,
          data: {
            text: response
          }
        });
      } catch (e) {
        fileLog.error(`Internal server error. Status: ${httpStatuses.SERVER_ERROR}, message: ${e.message}`);
        res.status(httpStatuses.SERVER_ERROR).json({
          status: httpStatuses.SERVER_ERROR,
          error: e.message
        });
      }
    } else {
      const message = 'No \'text\' specified in the request body';
      fileLog.error(
        'Bad request. Body: ' + JSON.stringify(req.body) + ' ' +
        'status: ' + httpStatuses.BAD_REQUEST + ' ' +
        'message: ' + message
      );
      res.status(httpStatuses.BAD_REQUEST).json({
        status: httpStatuses.BAD_REQUEST,
        error: message
      });
    }
  }

  async get(req, res) {
    try {
      const response = await TextService.getText();
      fileLog.info(`OK. Body: ${JSON.stringify(req.body)}, status: ${httpStatuses.SUCCESS}`);
      res.status(httpStatuses.SUCCESS).json({
        status: httpStatuses.SUCCESS,
        data: {
          text: response
        }
      });
    } catch (e) {
      fileLog.error(`Internal server error. Status: ${httpStatuses.SERVER_ERROR}, message: ${e.message}`);
      res.status(httpStatuses.SERVER_ERROR).json({
        status: httpStatuses.SERVER_ERROR,
        error: e.message
      });
    }
  }
}

export default new TextController();

