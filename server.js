const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const VAR = require('./config/variables');
const twilio = require('twilio');
const MessagingResponse = twilio.twiml.MessagingResponse;
const client = twilio(VAR.TWILIO_ACCOUNT_SID, VAR.TWILIO_AUTH_TOKEN);

const deployCron = require('./crons');
const buyFish = require('./src/buyFish');
const buyList = require('./src/buyList');
const price = require('./src/price');

const db = require('./config/db.js');
const shcedules = deployCron();

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'dist')));


app.get('*', (req, res, next)=>{
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/sms', (req, res) => {
  client.messages(req.body.SmsMessageSid)
    .fetch()
    .then((result) => {
      const message = result.body.toLowerCase();
      const buyRegx = /\bbuy\b/;
      const buyListRegx = /\bbuylist\b/;
      const priceRegx = /\bprice\b/;
      console.log(message);

      if(buyRegx.test(message)) {
        console.log('in buyFish');
        buyFish(req.body, message, res);
      } else if(buyListRegx.test(message)) {
        console.log('in buyList');
        buyList(message, res);
      } else if(priceRegx.test(message)) {
        console.log('in price');
        price(message, res);
      } else {
        // Default response... possibly add menu of features here.
        twiml.message('Sorry i don\'t understand...');
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
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
