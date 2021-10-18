import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";
import { v4 as uuidv4 } from "uuid";

interface ICreatePost {
    title: string;
    deadline: Date;
}

export const handle: APIGatewayProxyHandler  = async (event) => {
    const { user_id } = event.pathParameters;
    const { title, deadline } = JSON.parse(event.body) as ICreatePost;


    await document.put({
        TableName: "todos",
        Item: {
            id: uuidv4(),
            userid: user_id,
            title,
            done: false,
            deadline,
        }
    }).promise();     

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "Todo created."
        }),
        headers: {
            "content-type": "application/json"
        }
    }
}