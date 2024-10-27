const accessKey = "F8BBA842ECF85";
const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
const partnerCode = "MOMO";
const redirectUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
const ipnUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
const requestType = "payWithMethod";
const autoCapture = true;
const lang = "vi";

// Endpoint to handle MoMo payment requests
app.post('/momo-payment', (req, res) => {
  const { amount, orderInfo } = req.body;

  const orderId = partnerCode + new Date().getTime();
  const requestId = orderId;
  const extraData = "";

  const rawSignature =
    `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  const signature = crypto.createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');

  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    signature: signature,
  });

  const options = {
    hostname: 'test-payment.momo.vn',
    port: 443,
    path: '/v2/gateway/api/create',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody),
    },
  };

  const momoReq = https.request(options, (momoRes) => {
    let data = '';
    momoRes.on('data', (chunk) => {
      data += chunk;
    });
    momoRes.on('end', () => {
      res.json(JSON.parse(data));
    });
  });

  momoReq.on('error', (e) => {
    res.status(500).json({ error: e.message });
  });

  momoReq.write(requestBody);
  momoReq.end();
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});