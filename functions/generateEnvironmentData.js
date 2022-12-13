const { generateEnvironmentData } = require('../service/environment');
const _ = require('lodash');

exports.handler = async (event, context) => {
    try {
        const environmentData = generateEnvironmentData();
        return {
            statusCode: 200,
            body: JSON.stringify(environmentData),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };
    } catch(err) {
        console.error('Err occurred while generating environment data', err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                "error": err
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        }
    }
}