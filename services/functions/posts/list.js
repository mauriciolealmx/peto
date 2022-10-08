import handler from '../../utils/handler';
import dynamoDb from '../../utils/dynamodb';

export const main = handler(async () => {
  const params = {
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': 'mvp-user',
    },
  };

  const result = await dynamoDb.query(params);
  return result.Items;
});
