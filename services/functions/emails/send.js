import sgMail from '@sendgrid/mail';
import handler from '../../utils/handler';

export const main = handler(async (event) => {
  const { EventType, GeofenceId, DeviceId } = event.detail;

  sgMail.setApiKey(process.env.SENDGRID_SECRET_KEY);

  const msg = {
    to: 'mauricio.leal@motorolasolutions.com',
    from: 'mauriciolealmx@gmail.com',
    subject: 'Geofence event',
    text: `${DeviceId} triggered an ${EventType} event for the perimeter you set for ${GeofenceId}`,
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error.response.body.errors);
    });
});
