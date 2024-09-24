import crypto from 'crypto';
const nonce = require('nonce');
const request = require('request-promise');
const querystring = require('querystring');
const cookie = require('cookie');
const express = require('express');
const helmet = require('helmet');
const app = express(); // initialize application
const cors = require('cors');

const PORT = process.env.PORT || 3434;
const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'write_products';
const forwardingAddress =
  process.env.API_URL || 'https://95b4-38-97-79-161.ngrok-free.app'; // our ngrok url
const corsOptions = {
  origin: '*',
  methods: 'GET,POST',
  optionsSuccessStatus: 200,
};
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(cors(corsOptions));
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.post('/health', async (req: any, res: any) => {
  let vehicleData;
  console.log('Body params', req.body.registrationNumber);
  const regParam = req.body.registrationNumber;
  await fetch(
    'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles',
    {
      method: 'POST',
      headers: {
        'x-api-key': 'fXiAtWoHD8aNvakvLMQsI6qGRmaToYM24aR13op8',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        registrationNumber: regParam,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      vehicleData = data;
    })
    .catch((error) => console.error('Error:', error));
  return res.status(200).send(vehicleData);
});

app.listen(PORT, () => console.log(`Application listening on port ${PORT}`));
