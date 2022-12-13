const { generateCollectionData } = require('../service/collection');
const _ = require('lodash');

exports.handler = async (event, context) => {
    const collectionItemCount = Math.max(10, _.get(event, 'queryStringParameters.itemCount', 10));
    try {
        const collectionData = generateCollectionData(collectionItemCount);
        return {
            statusCode: 200,
            body: JSON.stringify(collectionData),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };
    } catch(err) {
        console.error('Err occurred while generating collection data', err);
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