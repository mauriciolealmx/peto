import {
  LocationClient,
  CreateGeofenceCollectionCommand,
} from '@aws-sdk/client-location';
import handler from '../../utils/handler';

const client = new LocationClient();

export const main = handler(async () => {
  const input = {
    CollectionName: 'peto-geofence-collection',
    Description: 'Collection created from the peto app',
  };

  const command = new CreateGeofenceCollectionCommand(input);

  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
});
