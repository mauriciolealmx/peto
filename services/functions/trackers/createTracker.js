import { LocationClient, CreateTrackerCommand } from '@aws-sdk/client-location';
import handler from '../../utils/handler';

const client = new LocationClient();

export const main = handler(async () => {
  const input = {
    TrackerName: 'peto-tracker',
    Description: 'Tracker created from by the peto app',
  };

  const command = new CreateTrackerCommand(input);

  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
});
