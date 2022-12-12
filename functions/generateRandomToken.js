const randExp = require('randexp').randexp;

exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ token: randExp(/<([a-z]\w{0,20})>foo<\1>/) })
    }
}