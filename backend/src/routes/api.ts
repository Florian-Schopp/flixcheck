import express from 'express';
export const router = express.Router();

const ipRegex = new RegExp(
  /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/
);

/**
 * @api {get} /getLocation Request location information
 * @apiName GetLocation
 * @apiGroup api
 *
 * @apiParam {String} ip IP address.
 *
 * @apiSuccess {Object} location Location information.
 */

router.get('/getLocation', (req, res) => {
  const { ip } = req.query;
  if (!ipRegex.test(ip as string)) {
    res.status(400).send('Invalid IP address');
    return;
  }
  fetch(`http://ip-api.com/json/${req.query.ip}`).then((loc) => {
    if (loc.ok) {
      return loc.json();
    } else {
      throw new Error('Failed to fetch location data');
    }
  }).then((parsedLocation) => {
    res.send(JSON.stringify(parsedLocation));
  }).catch((error) => {
    console.error(error);
    res.status(500).send('Internal Server Error');
  });
});

export default router;
