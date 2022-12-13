const _ = require('lodash');
const randomWords = require('random-words');

const tokenGenerator = require('../util/tokenGenerator');
const { generateToken } = tokenGenerator;
const { generateRandomNumber } = require('../util/randomnessUtil');
const {
  generateWords,
  generateSentences,
  generateUrl,
} = require('../util/textGenerator');

const AUTH_TYPES = [
  function () {
    return {
      type: 'apikey',
      apikey: [
        {
          key: 'key',
          value: randomWords(1)[0],
          type: 'string',
        },
        {
          key: 'value',
          value: generateToken(_.sample(tokenGenerator.APIKeyTokens)).value,
          type: 'string',
        },
      ],
    };
  },
  function () {
    return {
      type: 'bearer',
      bearer: [
        {
          key: 'token',
          value: generateToken(tokenGenerator.BEARER_TOKEN).value,
          type: 'string',
        },
      ],
    };
  },
  function () {
    return {
      type: 'basic',
      basic: [
        {
          key: 'password',
          value: randomWords(1)[0],
          type: 'string',
        },
        {
          key: 'username',
          value: randomWords(1)[0],
          type: 'string',
        },
      ],
    };
  },
];

const headers = [
  {
    key: 'Content-Type',
    value: 'application/json',
  },
  function () {
    return {
      key: 'x-api-key',
      value: generateToken(tokenGenerator.POSTMAN_API_KEY).value,
    };
  },
  function () {
    return {
      key: 'slack-access-token',
      value: generateToken(tokenGenerator.SLACK_ACCESS_TOKEN).value,
    };
  },
  function () {
    return {
      key: 'Authorization',
      value: generateToken(tokenGenerator.BEARER_TOKEN).value,
    };
  },
];

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

const generateAuthData = () => {
  return _.sample(AUTH_TYPES)();
};

const generateHeaders = (maxCount = 4, includeToken = false) => {
  return _.shuffle(headers)
    .slice(0, generateRandomNumber(headers.length + 1, 1))
    .map((header) => (_.isFunction(header) ? header() : header));
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
      auth: generateAuthData(),
    },
  };
};

module.exports = {
  generateEntityEvents,
  generateAuthData,
  generateHeaders,
  generateRequestData,
};
