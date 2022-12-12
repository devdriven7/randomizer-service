const { generateToken } = require('../util/tokenGenerator');

exports.handler = async (event, context) => {
    try {
        const token = generateToken();
        return {
            statusCode: 200,
            body: token
        };
    } catch(err) {
        console.error('Err occurred while generating token', err);
        return {
            statusCode: 500,
            body: {
                "error": err
            }
        }
    }
}