import * as uuid from 'uuid';

import handler from '../../util/handler';
import dynamoDb from '../../util/dynamodb';

export const main = handler(async (event) => {
  return 'demo';
});
