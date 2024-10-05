const crypto = require('crypto');
const fs = require('fs');
const textract = require('textract');
const { scrapeDatas } = require('./scrapData');

const generateHex = () => {
  const hash = crypto.createHash('sha256').update(crypto.randomBytes(32)).digest('hex');
  return hash;
};

const createPathIfNotExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  } else {
    console.log(`Directory already exists: ${dir}`);
  }
};

const getText = async (filepath) => {
  return new Promise((resolve, reject) => {
    textract.fromFileWithPath(filepath, (err, txt) => {
      if (err) return reject(err);
      resolve(txt);
    });
  });
};

const getTextFromURL = async (url) => {
  return await scrapeDatas(url);
};

module.exports = {
  generateHex,
  createPathIfNotExists,
  getText,
  getTextFromURL,
};
