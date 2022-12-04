import { Api, use } from '@serverless-stack/resources';
import StorageStack from './StorageStack';

const ApiStack = ({ stack }) => {
  const { bucket, table } = use(StorageStack);

  const api = new Api(stack, 'Api', {
    defaults: {
      authorizer: 'iam',
      function: {
        permissions: [bucket, table],
        environment: {
          BUCKET_NAME: bucket.bucketName,
          TABLE_NAME: table.tableName,
        },
      },
    },
    routes: {
      'GET /posts': 'functions/posts/list.main',
      'GET /posts/{id}': 'functions/posts/get.main',
      'POST /posts': 'functions/posts/create.main',
      'POST /email': 'functions/emails/send.main',
      'POST /geofence-collection': 'functions/trackers/createGeofenceCollection.main',
      'POST /device-location': 'functions/trackers/updateDeviceLocation.main',
      'POST /tracker': 'functions/trackers/createTracker.main',
    },
  });

  api.attachPermissions(['geo']);

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
  };
};

export default ApiStack;
