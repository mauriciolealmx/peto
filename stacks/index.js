import { App } from '@serverless-stack/resources';

import ApiStack from './ApiStack';
import FrontendStack from './FrontendStack';
import StorageStack from './StorageStack';
import AuthStack from './AuthStack';
import EventBusStack from './EventBusStack';

/**
 * @param {App} app
 */
export default function (app) {
  app.setDefaultFunctionProps({
    runtime: 'nodejs16.x',
    srcPath: 'services',
    bundle: {
      format: 'esm',
    },
  });

  app
    .stack(StorageStack)
    .stack(ApiStack)
    .stack(AuthStack)
    .stack(FrontendStack)
    .stack(EventBusStack);
}
