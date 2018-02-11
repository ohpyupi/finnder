const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const VAR = require('./config/variables');
const twilio = require('twilio');
const MessagingResponse = twilio.twiml.MessagingResponse;
const client = twilio(VAR.TWILIO_ACCOUNT_SID, VAR.TWILIO_AUTH_TOKEN);

const buyFish = require('./src/buyFish');

mongoose.connect(VAR.MONGO_DB_URI);
const db = mongoose.connection;
db.on('open', ()=>{
  console.log('Connected to MongoDB.');
});

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res, next)=>{
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  client.messages(req.body.SmsMessageSid)
    .fetch()
    .then((result) => {
      const message = result.body.toLowerCase();
      const buyRegx = /buy/;
      console.log(message);

      if(buyRegx.test(message)) {
        buyFish(req.body, message, res);
      }
    });
});

app.use((err, req, res, next)=>{
	console.error(err);
	res.status(err.status || 500);
	res.json({
		message: `${err.message}`
	});
});

app.listen(VAR.PORT);
console.log(`Server running on ${VAR.PORT}`);
