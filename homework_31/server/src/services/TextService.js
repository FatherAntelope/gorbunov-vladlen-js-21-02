import fs from 'fs';

class TextService {
  setText(data) {
    return new Promise((res, rej) => {
      if (!fs.existsSync('./src/files')) {
        fs.mkdirSync('./src/files');
      }
      fs.writeFile('./src/files/text.txt', data, 'utf8', (err) => {
        if (err) return rej(err);
        return res(data);
      });
    });
  }

  getText() {
    return Promise((res, rej) => {
      fs.readFile('text.txt', 'utf8', (err) => {
        if (err) return rej(err);
        return res(data);
      });
    });
  }
}

export default new TextService();
