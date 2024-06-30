const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Initialize Pusher with environment variables
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true
});

// Route to handle incoming messages
app.post('/messages', (req, res) => {
  const { message, user, timestamp } = req.body;
  pusher.trigger('chat', 'message', { message, user, timestamp });
  res.sendStatus(200); // Respond with success status
});

// Route to handle typing indicator
app.post('/typing', (req, res) => {
  const { user } = req.body;
  pusher.trigger('chat', 'typing', { user });
  res.sendStatus(200);
});

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log('Server is listening on port', process.env.PORT || 3000);
});
