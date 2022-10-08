import { Bucket, Table } from '@serverless-stack/resources';

const StorageStack = ({ stack, app }) => {
  const bucket = new Bucket(stack, 'Images', {
    cors: [
      {
        maxAge: '1 day',
        allowedOrigins: ['*'],
        allowedHeaders: ['*'],
        allowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
      },
    ],
  });

  const table = new Table(stack, 'Posts', {
    fields: {
      // NOTE: App has no auth. Users are random. (Future proof)
      userId: 'string',
      postId: 'string',
      imageURL: 'string',
      clickCount: 'number',
    },
    primaryIndex: { partitionKey: 'userId', sortKey: 'postId' },
  });

  return {
    bucket,
    table,
  };
};

export default StorageStack;
