import { LocationClient, PutGeofenceCommand } from '@aws-sdk/client-location';
import handler from '../../utils/handler';

const client = new LocationClient();

export const main = handler(async () => {
  const input = {
    CollectionName: 'peto-geofence-collection',
    GeofenceId: 'home-geofence',
    Geometry: {
      Polygon: [
        [
          [-96.77797912161412, 32.81117938899996],
          [-96.77644247393644, 32.80983069864001],
          [-96.77593214813926, 32.81022148735187],
          [-96.77750281753691, 32.81155587488061],
          [-96.77797912161412, 32.81117938899996],
        ],
      ],
    },
  };

  const command = new PutGeofenceCommand(input);

  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
});
