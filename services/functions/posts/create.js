import * as uuid from 'uuid';

import handler from '../../utils/handler';
import dynamoDb from '../../utils/dynamodb';

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      userId: 'mvp-user',
      postId: uuid.v1(),
      imageURL: '', // TODO: Needs to come from Frontend.
      clickCount: 0,
      createdAt: Date.now(),
    },
  };

  await dynamoDb.put(params);
  return params.Item;
});
