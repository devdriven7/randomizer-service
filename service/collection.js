const randomWords = require('random-words');
const _ = require('lodash');

const { generateWords, generateSentences } = require('../util/textGenerator');
const {
  getTokenLeakCount,
  resetTokenLeakCount,
} = require('../util/tokenGenerator');
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

const generateFolderName = () => {
  return `${_.startCase(generateWords(1))} Folder`;
};

const generateFolderDescription = () => {
  return generateSentences(2, generateRandomNumber(10) < 5);
};

const generateCollectionFolder = (itemCount) => {
  const folderData = {
    name: generateFolderName(),
    description: generateFolderDescription(),
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
    const collectionData = {
      collection: {
        info: {
          name: generateCollectionName(),
          description: generateCollectionDescription(),
          schema:
            'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
        },
        item: generateCollectionItems(collectionItemCount),
      },
      meta: {
        totalTokenLeaks: getTokenLeakCount(),
      },
    };
    resetTokenLeakCount();

    return collectionData;
  },
};
