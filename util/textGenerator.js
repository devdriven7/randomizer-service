const LoremIpsum = require('lorem-ipsum').LoremIpsum;

const { generateToken } = require('./tokenGenerator');
const { generateRandomNumber } = require('./randomnessUtil');

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
};
