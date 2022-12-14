const { generateCollectionData } = require('../service/collection');
const _ = require('lodash');

const maxAllowedItemCount = 10;

exports.handler = async (event, context) => {
    const collectionItemCount = _.get(event, 'queryStringParameters.itemCount', 10);
    if (collectionItemCount > maxAllowedItemCount) {
        collectionItemCount = maxAllowedItemCount;
    }
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
