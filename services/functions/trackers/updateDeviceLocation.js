import {
  LocationClient,
  BatchUpdateDevicePositionCommand,
} from '@aws-sdk/client-location';
import handler from '../../utils/handler';

const client = new LocationClient();

export const main = handler(async () => {
  const ONE_MINUTE = 60_000;
  const time = +new Date();

  const input = {
    TrackerName: 'peto-tracker',
    Updates: [
      {
        DeviceId: 'device-1',
        Position: [-96.77757058034359, 32.81015102892951],
        SampleTime: new Date(time - ONE_MINUTE * 4),
      },
      {
        DeviceId: 'device-1',
        Position: [-96.7773614819629, 32.810331519548654],
        SampleTime: new Date(time - ONE_MINUTE * 2),
      },
      {
        DeviceId: 'device-1',
        Position: [-96.77711847573751, 32.81054050822851],
        SampleTime: new Date(time - ONE_MINUTE),
      },
    ],
  };

  const command = new BatchUpdateDevicePositionCommand(input);
  try {
    const response = await client.send(command);
    console.log(response);
  } catch (e) {
    console.log(e);
  }
});
