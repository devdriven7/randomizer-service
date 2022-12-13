const randomWords = require('random-words');
const _ = require('lodash');

const {
  generateWords,
  generateSentences,
  generateUrl,
  generateHeaders,
} = require('../util/textGenerator');
const { generateRandomNumber } = require('../util/randomnessUtil');

const REQUEST_METHOD_TYPES = [
  function () {
    return {
      type: 'GET',
      name: `${_.startCase(randomWords(2).join(' '))}`,
      url: generateUrl(true),
    };
  },
  function () {
    return {
      type: 'POST',
      name: `${_.startCase(randomWords(2).join(' '))}`,
      url: generateUrl(),
    };
  },
  function () {
    return {
      type: 'PUT',
      name: `${_.startCase(randomWords(2).join(' '))}`,
      url: generateUrl(),
    };
  },
  function () {
    return {
      type: 'DELETE',
      name: `${_.startCase(randomWords(2).join(' '))}`,
      url: generateUrl(true),
    };
  },
  function () {
    return {
      type: 'PATCH',
      name: `${_.startCase(randomWords(2).join(' '))}`,
      url: generateUrl(),
    };
  },
];

const AUTH_TYPES = [];

const generateCollectionName = () => {
  return `${_.startCase(generateWords(1))} Collection`;
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

const generateCollectionFolder = (itemCount) => {
  const folderData = {
    name: generateCollectionName(),
    description: generateCollectionDescription(),
    item: [],
    event: generateEntityEvents(),
  };

  for (let i = 0; i < itemCount; i++) {
    folderData.item.push(generateRequestData());
  }

  return folderData;
};

const generateRequestData = () => {
  const method = _.sample(REQUEST_METHOD_TYPES)();
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

const generateCollectionItems = (itemCount) => {
  const items = [];

  for (let i = 0; i < itemCount; i++) {
    if (generateRandomNumber(10) < 4) {
      items.push(generateCollectionFolder(i));
    } else {
      items.push(generateRequestData());
    }
  }

  return items;
};

module.exports = {
  generateCollectionData: (collectionItemCount) => {
    return {
      collection: {
        info: {
          name: generateCollectionName(),
          description: generateCollectionDescription(),
          schema:
            'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
        },
        item: generateCollectionItems(collectionItemCount),
      },
    };
  },
};
