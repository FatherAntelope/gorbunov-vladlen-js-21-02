import fs from 'fs';
import { FILE_NAME_TEXT, FILE_PATH_TEXT } from "../constants/files.js";

class TextService {
  setText(data) {
    return new Promise((res, rej) => {
      if (!fs.existsSync(FILE_PATH_TEXT)) {
        fs.mkdirSync(FILE_PATH_TEXT);
      }
      fs.writeFile(FILE_PATH_TEXT + FILE_NAME_TEXT, data, 'utf8', (err) => {
        if (err) return rej(err);
        return res(data);
      });
    });
  }

  getText() {
    return new Promise((res, rej) => {
      fs.readFile(FILE_PATH_TEXT + FILE_NAME_TEXT, 'utf8', (err, data) => {
        if (err) return rej(err);
        return res(data);
      });
    });
  }
}

export default new TextService();
