const randomWords = require('random-words');
const _ = require('lodash');

const { generateRandomNumber } = require('../util/randomnessUtil');
const { generateWords } = require('../util/textGenerator');
const tokenGenerator = require('../util/tokenGenerator');
const { generateToken, getTokenLeakCount, resetTokenLeakCount } =
  tokenGenerator;

const generateEnvironmentName = () => {
  return `${_.startCase(generateWords(1))} Environment`;
};

const generateEnvironmentValue = () => {
  const value = {};
  if (generateRandomNumber(10) < 4) {
    return {
      key: randomWords(1)[0],
      value: randomWords(1)[0],
      type: 'default',
      enabled: true,
    };
  }
  return {
    key: randomWords(1)[0],
    value: generateToken().value,
    type: 'secret',
    enabled: true,
  };
};

const generateEnvironmentValues = () => {
  const itemCount = generateRandomNumber(15);
  const values = [];

  for (let i = 0; i < itemCount; i++) {
    values.push(generateEnvironmentValue());
  }

  return values;
};

module.exports = {
  generateEnvironmentData: () => {
    const environmentData = {
      environment: {
        name: generateEnvironmentName(),
        values: generateEnvironmentValues(),
      },
      meta: {
        totalTokenLeaks: getTokenLeakCount(),
      },
    };
    resetTokenLeakCount();

    return environmentData;
  },
};
