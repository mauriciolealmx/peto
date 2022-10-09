import * as uuid from 'uuid';

import handler from '../../utils/handler';
import dynamoDb from '../../utils/dynamodb';

export const main = handler(async (event) => {
  const { identityId } = event.requestContext.authorizer.iam.cognitoIdentity;
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      userId: identityId,
      postId: uuid.v1(),
      imageURL: data.imageURL,
      clickCount: 0,
      createdAt: Date.now(),
    },
  };

  await dynamoDb.put(params);
  return params.Item;
});
