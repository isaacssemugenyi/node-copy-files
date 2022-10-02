// Dependencies
const express = require('express');
const path = require('path');
const CronJob = require('cron').CronJob;
var Rsync = require('rsync');
const copyModel = require('./src/models');

//instantiations
const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

// Ubuntu: linux, Mac: darwin, Windows: win32
const syncProgram = process.platform === 'win32' ? 'robocopy' : 'rsync';

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.render('index'));
app.post('/', (req, res) => {
  console.log(req.body);
  //   Function manupilate the job

  res.redirect('/');
});

const rsync = new Rsync()
  .executable(syncProgram)
  // The -a flag means "archive" to say we are copying the full directory not just a file
  .flags('a')
  .source('/Users/isaacssemugenyi/Desktop/srctest/')
  .destination('/Users/isaacssemugenyi/Desktop/desttest/');

const job = new CronJob(
  '*/5 * * * * *',
  //   '0 0 * * *', // load from db
  () => {
    rsync.execute((error, code, cmd) => {
      let result;
      if (error) {
        result = `Code ${code} ${error?.message}`;
      } else {
        result = 'Backup complete';
      }

      const currentDate = new Date().toISOString();
      // Write log to the console, or will be redirected to a
      // nohup.out file if using nohup
      console.log(`Done with ${currentDate} ${result}`);
      //   process.stdout.write(`${currentDate}: ${result}\n`);
    });
  },
  null,
  true,
  'Africa/Kampala'
);

// Begin the cronjob
job.start();

// if sqlite is updated
// call job.stop()
// query the db for new folders dest and src
// set the src and dest to new variables
// call job.start()
// job.stop()
//Mising routes
app.get('*', (req, res) => {
  res.render('error');
});

//Listening to port
app.listen(35501, () => {
  console.log('Server started on port 35501');
});
