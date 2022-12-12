const { generateToken } = require('../util/tokenGenerator');

exports.handler = async (event, context) => {
    try {
        const token = generateToken();
        return {
            statusCode: 200,
            body: JSON.stringify(token),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
        };
    } catch(err) {
        console.error('Err occurred while generating token', err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                "error": err
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
        }
    }
}