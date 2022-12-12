const { generateCollectionData } = require('../service/collection');

exports.handler = async (event, context) => {
    try {
        const collectionData = generateCollectionData();
        return {
            statusCode: 200,
            body: collectionData
        };
    } catch(err) {
        console.error('Err occurred while generating collection data', err);
        return {
            statusCode: 500,
            body: {
                "error": err
            }
        }
    }
}