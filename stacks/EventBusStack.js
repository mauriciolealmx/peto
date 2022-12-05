import { EventBus } from '@serverless-stack/resources';

const EventBusStack = ({ stack, app }) => {
  const bus = new EventBus(stack, 'Bus', {
    rules: {
      ['geofence-rule']: {
        pattern: { source: ['aws.geo'] },
        targets: {
          emailSend: 'functions/emails/send.main',
        },
      },
    },
  });

  stack.addOutputs({
    Region: app.region,
  });

  return {
    bus,
  };
};

export default EventBusStack;
