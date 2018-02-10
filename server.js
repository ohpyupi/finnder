const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const VAR = require('./config/variables');
const twilio = require('twilio');
const MessagingResponse = twilio.twiml.MessagingResponse;
const client = twilio(VAR.TWILIO.ACCOUNT_SID, VAR.TWILIO.AUTH_TOKEN);

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
    .then((result) => console.log(result))

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
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
