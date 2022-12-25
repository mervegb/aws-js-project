import AWS from 'aws-sdk';
  
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const dynamoDbTableName = "messages-inventory"

  const healthPath = "/health"
  const messagePath = "/message"

  export async function handler(event) {
    let response;
    switch(true) {
        case event.httpMethod === "GET" && event.path === healthPath:
            response = buildResponse(200)
            break;
        case event.httpMethod === "GET" && event.path === messagePath:
            response = await getMessage(event.queryStringParameters.messageId)
            break;
        case event.httpMethod === "POST" && event.path === messagePath:
            response = await saveMessage(JSON.parse(event.body))
            break;  
        default:
            response = buildResponse(404,"404 Not Found")              
    }
    return response
  }

const getMessage = async (messageId) => {
  const params = {
    TableName: dynamoDbTableName,
    Key: {
        "messageId": messageId
    }
  }
  return await dynamoDb.get(params).promise().then((response) => {
    return buildResponse(200, response.Item)
  }, (error) => {
    console.log(error)
  })
}  


const saveMessage = async (requestBody) => {
  const params = {
    TableName: dynamoDbTableName,
    Item: requestBody
  }

  return await dynamoDb.put(params).promise().then(() => {
    const body = {
        Operation: "SAVE",
        Message: "SUCCESS",
        Item: requestBody
    }
    return buildResponse(200,body)
  },(error) => {
    console.log(error)
  })
}

const buildResponse = (statusCode,body) => {
   return {
    statusCode,
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify(body)
   }
}

