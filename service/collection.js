const randomWords = require('random-words');
const _ = require('lodash');

const {
  generateWords,
  generateSentences,
  generateUrl,
  generateHeaders,
} = require('../util/textGenerator');
const { generateRandomNumber } = require('../util/randomnessUtil');

const METHOD_TYPES = [
  {
    type: 'GET',
    name: `GET ${randomWords(2).join(' ')}`,
    url: generateUrl(true),
  },
  {
    type: 'POST',
    name: `POST ${randomWords(2).join(' ')}`,
    url: generateUrl(),
  },
  {
    type: 'PUT',
    name: `PUT ${randomWords(2).join(' ')}`,
    url: generateUrl(),
  },
  {
    type: 'DELETE',
    name: `DELETE ${randomWords(2).join(' ')}`,
    url: generateUrl(true),
  },
  {
    type: 'PATCH',
    name: `PATCH ${randomWords(2).join(' ')}`,
    url: generateUrl(),
  },
];

const generateCollectionName = () => {
  return `${generateWords(1)} Collection`;
};

const generateCollectionDescription = () => {
  return generateSentences(4, generateRandomNumber(10) < 5);
};

const generateEntityEvents = () => {
  let event = [];

  if (generateRandomNumber(10) < 3) {
    event.push({
      listen: 'prerequest',
      script: {
        exec: [generateSentences(2, generateRandomNumber(10) < 5)],
        type: 'text/javascript',
      },
    });
  }

  if (generateRandomNumber(10) < 5) {
    event.push({
      listen: 'test',
      script: {
        exec: [generateSentences(2, generateRandomNumber(10) < 5)],
        type: 'text/javascript',
      },
    });
  }
};

const generateAuthData = () => {};

const generateRequestData = () => {
  const method = _.sample(METHOD_TYPES);
  return {
    name: method.name,
    event: generateEntityEvents(),
    request: {
      url: method.url,
      method: method.type,
      header: generateHeaders(),
    },
  };
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
        item: [generateRequestData()],
      },
    };
  },
};
