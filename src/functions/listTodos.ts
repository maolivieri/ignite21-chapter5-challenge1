import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

export const handle: APIGatewayProxyHandler  = async (event) => {
    const { user_id } = event.pathParameters;
    
    const response = await document.query({
        TableName: "todos",
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": user_id,
        }
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify({
            todos: response.Items
        }),
        headers: {
            "content-type": "application/json"
        }
    }
}