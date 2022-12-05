import {
  LocationClient,
  AssociateTrackerConsumerCommand,
} from '@aws-sdk/client-location';
import handler from '../../utils/handler';

const client = new LocationClient();

export const main = handler(async () => {
  const input = {
    TrackerName: 'peto-tracker',
    // Should come in response!? or created by IaC?
    ConsumerArn:
      'arn:aws:geo:us-east-1:226257844371:geofence-collection/peto-geofence-collection',
  };

  const command = new AssociateTrackerConsumerCommand(input);

  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
});
