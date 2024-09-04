const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const { sendEmails } = require('./mailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = process.env.PORT || 8888; 


const usersUrl = 'https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json';
const profilesUrl = 'https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json';

let pendingRequests = []; // Store requests in memory

app.post('/', async (req, res) => {
  try {
    const { userid, wish } = req.body;
    console.log('Received userid:', userid); // Check the value received from the form
    console.log('Received wish:', wish);

    if (!userid) {
      return res.status(400).send('Error: User ID is missing.');
    }

    const [usersResponse, profilesResponse] = await Promise.all([
      axios.get(usersUrl),
      axios.get(profilesUrl)
    ]);

    // Extract data from the API responses
    const users = usersResponse.data;
    const profiles = profilesResponse.data;

    console.log('Users:', users);

    // Find the user matching the 'userid' from the form
    const user = users.find(u => u.username === userid);

    if (!user) {
      console.log('User not found for userid:', userid);
      return res.status(400).send('Error: User not found.');
    }

    const profile = profiles.find(p => p.userUid === user.uid);

    if (!profile) {
      return res.status(400).send('Error: Profile not found.');
    }

    // Calculate the user's age based on their birthdate

    const birthdate = new Date(profile.birthdate);
    const age = new Date().getFullYear() - birthdate.getFullYear();

    if (age > 10) {
      return res.status(400).send('Error: You must be under 10 years old to send a wish to Santa.');
    }

    pendingRequests.push({
      username: user.username,
      address: profile.address,
      wish: wish
    });

    // Send a simple message
    res.send('Your wish has been received and will be sent to Santa soon!');
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Call sendEmails every 15 seconds
setInterval(() => sendEmails(pendingRequests), 15000);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
