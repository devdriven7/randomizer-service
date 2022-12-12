const tokenGenerator = require('../util/tokenGenerator');

exports.handler = async (event, context) => {
    const randomIdx = Math.floor(Math.random() * 57);
    const randomRegex = customRegexes[randomIdx];

    return {
        statusCode: 200,
        body: JSON.stringify(tokenGenerator.generate())
    };
}