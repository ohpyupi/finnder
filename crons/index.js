const schedule = require('node-schedule');
const updateFishPriceDocuments = require('./updateFishPriceDocuments.js');

module.exports = deployCron;

function deployCron() {
  let rule = new schedule.RecurrenceRule();
  rule.second = 0;
  //rule.minute = 0;
  
  let fishPriceJob = schedule.scheduleJob(rule, () => {
    updateFishPriceDocuments()
      .then(() => {
        console.log(`* Your cron job has been completed.`); 
      })
      .catch(err => {
        console.error(err); 
      });
  });

  console.log(`* Successfully deployed the cron jobs.`);

  return {
    fishPriceJob, 
  };
}
