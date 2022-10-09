import { ReactStaticSite, use } from '@serverless-stack/resources';

import ApiStack from './ApiStack';
import StorageStack from './StorageStack';

const FrontendStack = ({ stack, app }) => {
  const { api } = use(ApiStack);
  const { bucket } = use(StorageStack);

  const site = new ReactStaticSite(stack, 'ReactSite', {
    path: 'client',
    environment: {
      REACT_APP_API_URL: api.customDomainUrl || api.url,
      REACT_APP_REGION: app.region,
      REACT_APP_BUCKET: bucket.bucketName,
      REACT_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId,
      REACT_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
      REACT_APP_USER_POOL_ID: auth.userPoolId,
    },
  });

  stack.addOutputs({
    SiteUrl: site.url,
  });
};

export default FrontendStack;
