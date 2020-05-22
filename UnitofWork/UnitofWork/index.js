const AWS = require("aws-sdk")

let ddb = new AWS.DynamoDB.DocumentClient()

let date = new Date()

let now = date.toISOString()

exports.handler = async (event) => {
    // Extract values from event and format as strings
    let name = JSON.stringify(`Hello from Lambda, ${event.name} ${event.role}`);
    // Create JSON object with parameters for DynamoDB and store in a variable
    let params = {
        TableName:'HelloWorldDatabase',
        Item: {
            'ID': name,
            'LatestGreetingTime': now
        }
    };
    // Using await, make sure object writes to DynamoDB table before continuing execution
    await ddb.put(params).promise();
    // Create a JSON object with our response and store it in a constant
    const response = {
        statusCode: 200,
        body: name
    };
    // Return the response constant
    return response;
};