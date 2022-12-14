const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const randomWords = require('random-words');
const _ = require('lodash');
const { randomInt } = require('crypto');

const tokenGenerator = require('./tokenGenerator');
const { generateToken } = tokenGenerator;
const {
  generateRandomNumber,
  generateRandomKeyValuePairs,
} = require('./randomnessUtil');

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 5,
    min: 2,
  },
  wordsPerSentence: {
    max: 10,
    min: 4,
  },
});

const domains = ['.com', '.net', '.org', '.in', '.us', '.uk', '.co.in', '.ai'];

module.exports = {
  generateWords: (maxWords = 2, includeToken = false) => {
    let words = lorem.generateWords(maxWords);

    if (includeToken) {
      words = words.split(' ');
      words.splice(
        generateRandomNumber(words.length - 1, 1),
        0,
        generateToken().value
      );
      words = words.join(' ');
    }

    return words;
  },
  generateSentences: (maxSentences = 3, includeToken = false) => {
    let sentences = lorem.generateSentences(maxSentences);

    if (includeToken) {
      sentences = sentences.split(' ');
      sentences.splice(
        generateRandomNumber(sentences.length - 1, 1),
        0,
        generateToken().value
      );
      sentences = sentences.join(' ');
    }

    return sentences;
  },
  generateUrl: (hasQueryParams = false, maxPath = 2, includeToken = false) => {
    let host = [...randomWords(2), randomInt(100000, 999999)].join('-');
    let urlOrigin = ['https', '://', host, _.sample(domains)].join('');
    let url = [urlOrigin, ...randomWords(2)].join('/');

    if (hasQueryParams) {
      let params = generateRandomKeyValuePairs(generateRandomNumber(4, 1));
      params = params.map((pair) => `${pair.key}=${pair.value}`).join('&');
      params.length && (url += `?${params}`);
    }

    return url;
  },
};
