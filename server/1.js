const express = require('express');
const xendit = require('xendit-node');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const xenditAPIKey = 'YOUR_XENDIT_API_KEY';

const x = new xendit({
  secretKey: xenditAPIKey,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/create-invoice', async (req, res) => {
  const { external_id, amount, payer_email } = req.body;
  try {
    const createInvoice = await x.Invoice.create({
      externalID: external_id,
      amount,
      payerEmail: payer_email,
      description: 'Payment for X',
    });
    const invoiceID = createInvoice.id;

    const createPayment = await x.Payment.create({
      externalID: external_id,
      amount,
      payerEmail: payer_email,
      description: 'Payment for X',
      invoiceID,
      successRedirectURL: 'http://localhost:3000/success',
      failureRedirectURL: 'http://localhost:3000/failure',
    });
    const paymentURL = createPayment.payerURL;

    res.json({
      invoice_id: invoiceID,
      payment_url: paymentURL,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.get('/success', (req, res) => {
  res.send('Payment success!');
});

app.get('/failure', (req, res) => {
  res.send('Payment failed!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
