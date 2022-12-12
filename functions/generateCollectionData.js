const collectionService = require('../service/collection');

exports.handler = async (event, context) => {
    try {
        const collectionData = collectionService.generateCollectionData();
        return {
            statusCode: 200,
            body: JSON.stringify(collectionData)
        };
    } catch(err) {
        console.error('Err occurred while generating collection data', err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                "error": err
            })
        }
    }
}