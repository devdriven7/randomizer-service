const { randomInt } = require('crypto');
const randomWords = require('random-words');

const { generateToken } = require('./tokenGenerator');

module.exports = {
  generateRandomNumber: (max = 100, min = 0) => {
    return randomInt(min, max);
  },
  generateRandomKeyValuePairs: (count = 1) => {
    const pairs = [];

    for (let i = 0; i < count; i++) {
      pairs.push({
        key: randomWords(1)[0],
        value: randomInt(10) < 5 ? generateToken().value : randomWords(1)[0],
      });
    }

    return pairs;
  },
};
