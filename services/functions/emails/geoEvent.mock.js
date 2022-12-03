const event = {
  version: '0',
  id: '830d6122-5248-8f88-b466-dc99b404e24b',
  'detail-type': 'Location Geofence Event',
  source: 'aws.geo',
  account: '226257844371',
  time: '2022-12-05T22:41:14Z',
  region: 'us-east-1',
  resources: [
    'arn:aws:geo:us-east-1:226257844371:geofence-collection/peto-geofence-collection',
    'arn:aws:geo:us-east-1:226257844371:tracker/peto-tracker',
  ],
  detail: {
    EventType: 'EXIT',
    GeofenceId: 'home-geofence',
    DeviceId: 'device-1',
    SampleTime: '2022-12-05T22:37:13Z',
    Position: [-96.77757058034359, 32.81015102892951],
  },
};

export default event;
