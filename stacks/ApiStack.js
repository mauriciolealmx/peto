import { Api, use } from '@serverless-stack/resources';
import StorageStack from './StorageStack';

const ApiStack = ({ stack }) => {
  const { bucket, table } = use(StorageStack);

  const api = new Api(stack, 'Api', {
    defaults: {
      function: {
        permissions: [bucket, table],
        environment: {
          BUCKET_NAME: bucket.bucketName,
          TABLE_NAME: table.tableName,
        },
      },
    },
    routes: {
      'POST /posts': 'functions/posts/create.main',
      'GET /posts': 'functions/posts/list.main',
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
  };
};

export default ApiStack;
