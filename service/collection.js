const randomWords = require('random-words');
const _ = require('lodash');

const { generateWords, generateSentences } = require('../util/textGenerator');
const {
  generateEntityEvents,
  generateRequestData,
  generateAuthData,
} = require('./entity');
const { generateRandomNumber } = require('../util/randomnessUtil');

const generateCollectionName = () => {
  return `${_.startCase(generateWords(1))} Collection`;
};

const generateCollectionDescription = () => {
  return generateSentences(4, generateRandomNumber(10) < 5);
};

const generateCollectionFolder = (itemCount) => {
  const folderData = {
    name: generateCollectionName(),
    description: generateCollectionDescription(),
    item: [],
    event: generateEntityEvents(),
    auth: generateAuthData(),
  };

  for (let i = 0; i < itemCount; i++) {
    folderData.item.push(generateRequestData());
  }

  return folderData;
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
