const { generateWords, generateSentences } = require('../util/textGenerator');
const { generateRandomNumber } = require('../util/randomnessUtil');

const generateCollectionName = () => {
  return `${generateWords(1)} Collection`;
};

const generateCollectionDescription = () => {
  return generateSentences(4, generateRandomNumber(10) < 5);
};

module.exports = {
  generateCollectionData: () => {
    return {
      collection: {
        info: {
          name: generateCollectionName(),
          description: generateCollectionDescription(),
          schema:
            'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
        },
        item: [
          {
            name: 'Test GET Response',
            event: [],
            request: {
              url: 'https://echo.getpostman.com/headers',
              method: 'GET',
              header: [
                {
                  key: 'Content-Type',
                  value: 'application/json',
                },
              ],
            },
          },
        ],
      },
    };
  },
};
